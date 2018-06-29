import * as ACTION from '../constants/actionTypes'
// Reducer for the bootstrap of the app.

const initialState = {
  showCards: false,
  localUser: {
    id: 0,
  },
  users: [
    {
      name: 'Toby',
      score: 3,
    },
    {
      name: 'Other Toby',
      score: 3,
    },
    {
      name: 'Evil Toby',
      score: 3,
    },
    {
      name: 'Good Toby',
      score: null,
    },
  ],
}

const bootstrap = (state = initialState, action) => {
  switch (action.type) {
    case ACTION.UPDATE_SCORE:
      state.users[action.playerId].score = action.score
      return Object.assign({}, state)
    case ACTION.TOGGLE_SHOW_CARDS:
      state.showCards = !state.showCards
      return Object.assign({}, state)
    case ACTION.UPDATE_NAME:
      state.users[action.playerId].name = action.name
      return Object.assign({}, state)
    default:
      return state
  }
}

export default bootstrap;
