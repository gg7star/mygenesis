import auth from '@react-native-firebase/auth';

export async function attempSignup({email, password}) {
  try {
    const credential = await auth().createUserWithEmailAndPassword(email, password);
    console.log('====== createUserWithEmailAndPassword: credential: ', credential);
    return { credential, error: null, errorType: null };
  } catch (e) {
    var errorMessage = 'Failed user creation.';
    var errorType = e.code;
    switch (e.code) {
      case 'auth/invalid-email':
        // 'Please enter a valid email address.';
        errorMessage = "S'il vous plaît, mettez une adresse email valide.";
        break;
      case 'auth/user-disabled':
        // 'This account has been disabled.';
        errorMessage = 'Ce compte a été désactivé.';
        break;
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        // 'No user found or wrong password.
        errorMessage = 'Aucun utilisateur trouvé ou mot de passe incorrect.';
        break;
      case 'auth/email-already-in-use':
        // 'The email address is already in use by another account.'
        errorMessage = "L'adresse e - mail est déjà utilisée par un autre compte.";
        break;
      default:
        console.log('==== error: ', e);
        break;
    }
    return { credential: null, error: errorMessage, errorType };
  }
}
