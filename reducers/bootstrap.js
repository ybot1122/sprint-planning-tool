// Reducer for the bootstrap of the app.

const initialState = {
  todos: [],
}

const bootstrap = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return state.todos.concat([action.text])
    default:
      return state
  }
}

export default bootstrap;
