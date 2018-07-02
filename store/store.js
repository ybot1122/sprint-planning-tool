import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import bootstrap from '../reducers/bootstrap'

const rootReducer = combineReducers({
  bootstrap,
})

const enhancers = compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const store = createStore(
  rootReducer,
  enhancers,
)

console.log('Store Initialized: ', store.getState())

export default store
