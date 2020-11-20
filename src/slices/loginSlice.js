import {createSlice} from '@reduxjs/toolkit'
import { loginInWithEmailPassword } from '../utils/firebase/auth'
import { getCurrentUserInfo, getUserInfo } from '../utils/firebase/database'
import { Actions } from 'react-native-router-flux'
import { showRootToast } from '../utils/misc'
import { appSlice } from './appSlice'

export const initialState = {
  isAuthenticated: false,
  isFetching: false,
  statusMessage: null,
  credential: null,
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    tryLogin: state => {
      state.isFetching = true
    },
    loginSuccess: (state, { payload }) => {
      state.isAuthenticated = true
      state.isFetching = false
      state.credential = payload.credential
    },
    loginFailure: (state, { payload }) => {
      state.isFetching = false
      state.statusMessage = payload.statusMessage
    },
  },
})

export const { tryLogin, loginSuccess, loginFailure } = loginSlice.actions
export const loginSelector = state => state.login
export default loginSlice.reducer

export function authWithEmail(email, password) {
  const { appLoginSuccess } = appSlice.actions
  return async dispatch => {
    dispatch(tryLogin())
    showRootToast('Connectez-vous...')
    const res = await loginInWithEmailPassword({email, password})
    if (res.error) {
      dispatch(loginFailure({statusMessage: res.error}))
      showRootToast(res.error)
      return
    }

    const _user = await getCurrentUserInfo()
    dispatch(loginSuccess({credential: _user}))
    dispatch(appLoginSuccess({credential: _user}))
    console.log("User Info: " + _user)
    Actions.reset("mainTab")
  }
}

export function loginFailed(message) {
  return async dispatch => {
    dispatch(loginFailure({statusMessage: message}))
  }
}
