import * as _ACTION from '../constants/actionTypes'
// Reducer for the bootstrap of the app.

const initialState = {
  connection: {
    isConnected: false,
    isLoading: false,
    error: null,
    payload: null,
  },
  showCards: false,
  localUser: {
    id: 0,
  },
  users: [
    {
      name: 'New User',
      score: null,
    },
  ],
}

const bootstrap = (state = initialState, action) => {
  switch (action.type) {
    case _ACTION.UPDATE_SCORE:
      state.users[action.playerId].score = action.score
      return Object.assign({}, state)
    case _ACTION.TOGGLE_SHOW_CARDS:
      state.showCards = !state.showCards
      return Object.assign({}, state)
    case _ACTION.UPDATE_NAME:
      state.users[action.playerId].name = action.name
      return Object.assign({}, state)
    case _ACTION.API.OPEN_CONNECTION.START:
      state.connection.isLoading = true
      state.connection.isConnected = false
      return Object.assign({}, state)
    case _ACTION.API.OPEN_CONNECTION.SUCCESS:
      state.connection.isLoading = false
      state.connection.isConnected = true
      state.connection.error = null
      state.connection.players = action.players
      state.users = action.players
      return Object.assign({}, state)
    case _ACTION.API.OPEN_CONNECTION.FAILURE:
      state.connection.isLoading = false
      state.connection.isConnected = false
      state.connection.error = action.error
      state.connection.payload = null
      return Object.assign({}, state)
    default:
      return state
  }
}

export default bootstrap;
