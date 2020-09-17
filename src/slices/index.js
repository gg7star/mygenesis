import { combineReducers } from 'redux'

import appReducer from './appSlice'
import loginReducer from './loginSlice'
import signupReducer from './signupSlice'
import jobReducer from './jobSlice'

const rootReducer = combineReducers({
  app: appReducer,
  login: loginReducer,
  signup: signupReducer,
  job: jobReducer,
})

export default rootReducer
