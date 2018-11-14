import { combineReducers } from 'redux'
import reducer from './sampleReducer'
import auth from './auth'
import layout from './layout'
import user from './user'

const rootReducer = combineReducers({
  sample: reducer,
  auth: auth,
  user: user,
  layout: layout
})

export default rootReducer