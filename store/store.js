import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import bootstrap from '../reducers/bootstrap'

const rootReducer = combineReducers({
  bootstrap,
})

const enhancers = (() => {
  if (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
    return compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    )
  } else {
    return compose(
      applyMiddleware(thunk)
    )
  }
})()

const store = createStore(
  rootReducer,
  enhancers,
)

console.log('Store Initialized: ', store.getState())

export default store
