import Toast from 'react-native-root-toast';
import {em} from '../common/consts'
import {Linking} from 'react-native';

export const delay = ms =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms || 1000);
  });

export const stripeDoubleLineBreak = str => str.replace(/\n{2,}/g, '\n');

export const showRootToast = (text, position = 'bottom') => {
  const toastStyle = {
    height: 35*em,
    borderRadius: 15*em,
    paddingHorizontal: 10*em,
    backgroundColor: 'rgba(34, 34, 34, 0.7)',
    bottom: 40*em,
  };
  let toastPosition;
  switch (position) {
    case 'center':
      toastPosition = Toast.positions.CENTER;
      break;
    case 'top':
      toastPosition = Toast.positions.TOP;
      break;
    case 'bottom':
    default:
      toastPosition = Toast.positions.BOTTOM;
      break;
  }
  const toastOption = { containerStyle: toastStyle, shadow: false, position: toastPosition };
  Toast.show(text, toastOption);
};

export const goToWebBrowser = (url) => {
  console.log("URL", url);
  Linking.canOpenURL(url).then(supported => {
    if (supported){
      Linking.openURL(url);
    }else{
      console.log("Don't know how to open URI: " + url);
    }
  })
}
