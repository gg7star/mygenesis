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
        errorMessage = 'Please enter a valid email address.';
        break;
      case 'auth/user-disabled':
        errorMessage = 'This account has been disabled.';
        break;
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        errorMessage = 'No user found or wrong password.';
        break;
      case 'auth/email-already-in-use':
        errorMessage = 'The email address is already in use by another account.';
        break;
      default:
        console.log('==== error: ', e);
        break;
    }
    return { credential: null, error: errorMessage, errorType };
  }
}
