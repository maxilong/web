import { combineReducers, createStore } from 'redux'
import venueId from './venueId'
import venueData from './venueData'
import menu from './menu'
import preCode from './preCode'
const rootReducer = combineReducers({
  venueId,
  menu,
  venueData,
  preCode
})
const store = createStore(rootReducer)
export default store