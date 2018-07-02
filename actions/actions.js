import * as ACTION from '../constants/actionTypes'
import * as _API from '../api/api' 

export const updateScore = (playerId, score) => {
  return (dispatch) => {
    dispatch(apiUpdateScore(score))
    dispatch({
      type: ACTION.UPDATE_SCORE,
      playerId,
      score,
    })
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

// api open connection
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
    _API.openConnection(name)
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

// api update score
export const apiUpdateScoreStart = () => {
  return {
    type: ACTION.API.UPDATE_SCORE.START,
  }
}

export const apiUpdateScoreSuccess = (players) => {
  return {
    type: ACTION.API.UPDATE_SCORE.SUCCESS,
    players,
  }
}

export const apiUpdateScoreFailure = (error) => {
  return {
    type: ACTION.API.UPDATE_SCORE.FAILURE,
    error,
  }
}

export const apiUpdateScore = (score) => {
  return (dispatch) => {
    dispatch(apiUpdateScoreStart())
    _API.updateScore(score)
      .then((players) => {
        console.log(players)
        dispatch(apiUpdateScoreSuccess(players))
      })
      .catch((err) => {
        console.log(err)
        dispatch(apiUpdateScoreFailure(err))
      })
  }
}
