import * as ACTION from '../constants/actionTypes'
import { openConnection } from '../api/api' 

export const updateScore = (playerId, score) => {
  return {
    type: ACTION.UPDATE_SCORE,
    playerId,
    score,
  }
}

export const updateName = (playerId, name) => {
  return {
    type: ACTION.UPDATE_NAME,
    playerId,
    name,
  }
}

export const toggleShowCards = () => {
  return {
    type: ACTION.TOGGLE_SHOW_CARDS,
  }
}

export const apiOpenConnectionStart = () => {
  return {
    type: ACTION.API.OPEN_CONNECTION.START,
  }
}

export const apiOpenConnectionSuccess = (players) => {
  return {
    type: ACTION.API.OPEN_CONNECTION.SUCCESS,
    players,
  }
}

export const apiOpenConnectionFailure = (error) => {
  return {
    type: ACTION.API.OPEN_CONNECTION.FAILURE,
    error,
  }
}

export const apiOpenConnection = (name) => {
  return (dispatch) => {
    dispatch(apiOpenConnectionStart())
    openConnection(name)
      .then((players) => {
        console.log(players)
        dispatch(apiOpenConnectionSuccess(players))
      })
      .catch((err) => {
        console.log(err)
        dispatch(apiOpenConnectionFailure(err))
      })
  }
}
