import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import bootstrap from '../reducers/bootstrap'

const rootReducer = combineReducers({
  bootstrap,
})

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

console.log('Store Initialized: ', store.getState())

export default store
