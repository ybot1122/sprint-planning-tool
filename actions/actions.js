import * as ACTION from '../constants/actionTypes'

export const updateScore = (playerId, score) => {
  return {
    type: ACTION.UPDATE_SCORE,
    playerId,
    score,
  }
}

export const toggleShowCards = () => {
  return {
    type: ACTION.TOGGLE_SHOW_CARDS,
  }
}
