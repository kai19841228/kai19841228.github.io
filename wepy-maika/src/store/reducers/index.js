import { combineReducers } from 'redux'
import counter from './counter'
import order from './order'

export default combineReducers({
  counter,
  order
})