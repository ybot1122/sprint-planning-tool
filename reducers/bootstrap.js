import * as _ACTION from '../constants/actionTypes'
// Reducer for the bootstrap of the app.

const initialState = {
  connection: {
    isConnected: false,
    isLoading: false,
    error: null,
    payload: null,
  },
  name: '(name)',
  userId: 0,
  currentScore: null,
  showCards: false,
  users: [],
}

const bootstrap = (state = initialState, action) => {
  switch (action.type) {
    case _ACTION.UPDATE_EVERYTHING:
      state.users = action.players
      state.userId = action.id
      return Object.assign({}, state)
    case _ACTION.UPDATE_SCORE:
      state.currentScore = action.score
      return Object.assign({}, state)
    case _ACTION.TOGGLE_SHOW_CARDS:
      state.showCards = action.isVisible
      return Object.assign({}, state)
    case _ACTION.UPDATE_NAME:
      state.name = action.name
      return Object.assign({}, state)
    case _ACTION.API.OPEN_CONNECTION.START:
      state.connection.isLoading = true
      state.connection.isConnected = false
      return Object.assign({}, state)
    case _ACTION.API.OPEN_CONNECTION.SUCCESS:
      state.connection.isLoading = false
      state.connection.isConnected = true
      state.connection.error = null
      console.log(action)
      state.users = action.players
      state.userId = action.id
      state.showCards = action.showCards
      return Object.assign({}, state)
    case _ACTION.API.OPEN_CONNECTION.FAILURE:
      state.connection.isLoading = false
      state.connection.isConnected = false
      state.connection.error = action.error
      state.connection.payload = null
      return Object.assign({}, state)
    case _ACTION.API.UPDATE_SCORE.START:
      // no-op
      return Object.assign({}, state)
    case _ACTION.API.RESET_SCORES.SUCCESS:
    case _ACTION.API.UPDATE_SCORE.SUCCESS:
      state.users = action.players
      state.userId = action.id
      return Object.assign({}, state)
    case _ACTION.API.UPDATE_SCORE.FAILURE:
      // retry?
      return Object.assign({}, state)
    default:
      return state
  }
}

export default bootstrap;
