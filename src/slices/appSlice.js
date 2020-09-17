import {createSlice} from '@reduxjs/toolkit'

export const initialState = {
  credential: null,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    appLoginSuccess: (state, { payload }) => {
      state.credential = payload.credential
    },
  },
})

export const { appLoginSuccess } = appSlice.actions
export const appSelector = state => state.app
export default appSlice.reducer
