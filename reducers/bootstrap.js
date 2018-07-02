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
      id: 0,
    },
  ],
}

const bootstrap = (state = initialState, action) => {
  switch (action.type) {
    case _ACTION.UPDATE_EVERYTHING:
      state.users = action.players
      return Object.assign({}, state)
    case _ACTION.UPDATE_SCORE:
      state.users.find((el) => el.id === action.playerId).score = action.score
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
      state.users = action.players
      state.localUser.id = action.id
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
    case _ACTION.API.UPDATE_SCORE.SUCCESS:
      // no-op
      state.users = action.players
      return Object.assign({}, state)
    case _ACTION.API.UPDATE_SCORE.FAILURE:
      // retry?
      return Object.assign({}, state)
    default:
      return state
  }
}

export default bootstrap;
