// import { appActionTypes } from '../actions/types';
import { LOAD, SAVE } from 'redux-storage';

export const initialState = {
  isFirstOpen: true,
  globalNotification: {
    message: null,
    type: 'success',
    duration: 4000
  },
  loaded: false,
  lat:"",
  lng:"",
};

export default function AppStateReducer(
  state = initialState,
  action,
) {
  // switch (action.type) {
  //   case appActionTypes.SET_FIRST_OPEN:
  //     return {
  //       ...state,
  //       isFirstOpen: false,
  //     };
  //   case appActionTypes.SET_GLOBAL_NOTIFICATION:
  //     return {
  //       ...state,
  //       globalNotification: {
  //         message: action.payload.message,
  //         type: action.payload.type,
  //         duration: action.payload.duration ? action.payload.duration : 4000
  //       }
  //     }
  //   case appActionTypes.SET_GEOLOCATION:
  //     return{
  //       ...state,
  //       lat: action.payload.lat,
  //       lng: action.payload.lng
  //     }
  //   case LOAD:
  //     console.log('==== LOAD: ', state);
  //     return { ...state, loaded: true };
  //   default:
  //     return state;
  // }
  return state
}
