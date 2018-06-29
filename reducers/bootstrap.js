import * as ACTION from '../constants/actionTypes'
// Reducer for the bootstrap of the app.

const initialState = {
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
      return state.users[action.playerId].score = action.score;
    default:
      return state
  }
}

export default bootstrap;
