import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import bootstrap from '../reducers/bootstrap'

const reducers = combineReducers({
  bootstrap,
})

const initialState = {
  boostrap: {
    todos: [],
  },
}

// not used yet
const enhancer = compose(
  applyMiddleware(),
)

const store = createStore(reducers, [initialState])

console.log(store.getState())

export default store
