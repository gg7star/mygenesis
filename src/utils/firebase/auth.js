import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'

export const AUTH_PROVIDER = 'password'

export async function loginInWithEmailPassword({email, password}) {
  try {
    console.log('===== signInWithEmailAndPassword: ', email, password);
    const firebaseUserCredential = await firebase.auth()
      .signInWithEmailAndPassword(email, password);
    console.log('===== signInWithEmailAndPassword: credential: ', firebaseUserCredential);
    return { credential: firebaseUserCredential, error: null, errorType: null};
  } catch (e) {
    console.log('====== error: ', e);
    var errorMessage = 'Firebase auth failed.';
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
      case 'auth/internal-error':
        errorMessage = 'An internal error has occurred, please try again.'
        break;
      default:
        break;
    }
    return {credential: null, error: errorMessage, errorType };
  }

  // var res = await {credential: {"-MBC5lHoTRfthA545U7Y":{
  //             "email":"alex@gmail.com",
  //             "firstname":"Alex",
  //             "lastname":"Hong",
  //             "zipcode":"391029"
  //           }}, error: null, errorType: null }
  // return res
}

export async function attemptSignInWithPhone(phoneNumber) {
  var confirmation = null;
  var error = null;
  try {
    confirmation = await firebase.auth().signInWithPhoneNumber(phoneNumber);
    console.log('===== confirmation: ', confirmation);
  } catch (e) {
    console.log('===== error: ', e);
    error = 'Failed to signin with phone number.';
    switch (e.code) {
      case 'auth/invalid-phone-number':
          error = 'Please enter a valid phone number.';
        break;
      case 'auth/too-many-requests':
          error = 'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
      default:
        console.error(e);
        break;
    }
  } finally {
    console.log('===== finally')
  }
  return {confirmation, error};
}

export async function resetPasswordWithEmail(email) {
  try {
    const result = await firebase.auth().sendPasswordResetEmail(email);
    console.log('==== resetPasswordWithEmail: result: ', result);
    return {token: result, error: null, errorMessage: null};
  } catch (error) {
    console.log('==== resetPasswordWithEmail: ', resetPasswordWithEmail);
    var errorMessage = 'Failed to reste password.';
    switch(error.code) {
      case 'auth/invalid-email':
        errorMessage = 'You inputed invalid email. Please input an email with correct format.';
        break;
      case 'auth/user-not-found':
        errorMessage = 'Can not find user.';
        break;

    }
    return {token: null, errorType: error.code, errorMessage};
  }
}

export async function logout(){
  try{
    return firebase.auth().signOut().then(() => console.log('User signed out!'));
  }catch (error){
    console.log("===== logout error", error);
  }
}

export async function updateUserEmail(email){
  try{
    //let credential = await firebase.auth().signInWithEmailAndPassword(email, password);
    await firebase.auth().currentUser.updateEmail(email);
    return true;
  }catch(error){
    console.log("===== update user info error", error);
    return false;
  }
}
