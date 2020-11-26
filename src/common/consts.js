import { Dimensions } from 'react-native';

export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;
export const em = WIDTH / 375;

// export const WIDTH = 720;
// export const HEIGHT = 1480;
// export const em = WIDTH / HEIGHT * 2;
