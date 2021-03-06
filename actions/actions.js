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
  return (dispatch) => {
    dispatch(apiUpdateName(name))
    dispatch({
      type: ACTION.UPDATE_NAME,
      playerId,
      name,
    })
  }
}

export const updateEverything = (data) => {
  return {
    type: ACTION.UPDATE_EVERYTHING,
    players: data.players,
    id: data.id,
  }
}

export const toggleShowCards = (isVisible) => {
  return (dispatch) => {
    dispatch(apiToggleCardVisibility())
    dispatch({ type: ACTION.TOGGLE_SHOW_CARDS, isVisible })
  }
}

// api toggle card visibility
export const apiCardVisibilityStart = () => {
  return {
    type: ACTION.API.CARD_VISIBILITY.START,
  }
}

export const apiCardVisibilitySuccess = (id, isVisible) => {
  return {
    type: ACTION.API.CARD_VISIBILITY.SUCCESS,
    id,
    isVisible,
  }
}

export const apiCardVisibilityFailure = (error) => {
  return {
    type: ACTION.API.CARD_VISIBILITY.FAILURE,
    error,
  }
}

export const apiToggleCardVisibility = () => {
  return (dispatch) => {
    dispatch(apiCardVisibilityStart())
    _API.toggleCardVisibility()
      .then((data) => {
        dispatch(apiCardVisibilitySuccess(data.id, data.isVisible))
      })
      .catch((err) => {
        console.log(err)
        dispatch(apiCardVisibilityFailure(err))
      })
  }
}

// api open connection
export const apiOpenConnectionStart = () => {
  return {
    type: ACTION.API.OPEN_CONNECTION.START,
  }
}

export const apiOpenConnectionSuccess = (players, id, showCards) => {
  return {
    type: ACTION.API.OPEN_CONNECTION.SUCCESS,
    players,
    id,
    showCards,
  }
}

export const apiOpenConnectionFailure = (error) => {
  return {
    type: ACTION.API.OPEN_CONNECTION.FAILURE,
    error,
  }
}

export const apiOpenConnection = (name, roomName) => {
  return (dispatch) => {
    dispatch(apiOpenConnectionStart())
    _API.openConnection(name, roomName, dispatch)
      .then((data) => {
        dispatch(apiOpenConnectionSuccess(data.players, data.id, data.showCards))
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

export const apiUpdateScoreSuccess = (players, id) => {
  return {
    type: ACTION.API.UPDATE_SCORE.SUCCESS,
    players,
    id,
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
      .then((data) => {
        console.log(data)
        dispatch(apiUpdateScoreSuccess(data.players, data.id))
      })
      .catch((err) => {
        console.log(err)
        dispatch(apiUpdateScoreFailure(err))
      })
  }
}

// api update name
export const apiUpdateNameStart = () => {
  return {
    type: ACTION.API.UPDATE_NAME.START,
  }
}

export const apiUpdateNameSuccess = (players, id) => {
  return {
    type: ACTION.API.UPDATE_NAME.SUCCESS,
    players,
    id,
  }
}

export const apiUpdateNameFailure = (error) => {
  return {
    type: ACTION.API.UPDATE_NAME.FAILURE,
    error,
  }
}

export const apiUpdateName = (name) => {
  return (dispatch) => {
    dispatch(apiUpdateNameStart())
    _API.updateName(name)
      .then((data) => {
        console.log(data)
        dispatch(apiUpdateNameSuccess(data.players, data.id))
      })
      .catch((err) => {
        console.log(err)
        dispatch(apiUpdateNameFailure(err))
      })
  }
}

// api reset scores
export const resetScores = () => {
  return (dispatch) => {
    dispatch(apiResetScores())
  }
}

export const apiResetScoresStart = () => {
  return {
    type: ACTION.API.RESET_SCORES.START,
  }
}

export const apiResetScoresSuccess = (players, id) => {
  return {
    type: ACTION.API.RESET_SCORES.SUCCESS,
    players,
    id,
  }
}

export const apiResetScoresFailure = (error) => {
  return {
    type: ACTION.API.RESET_SCORES.FAILURE,
    error,
  }
}

export const apiResetScores = () => {
  return (dispatch) => {
    dispatch(apiResetScoresStart())
    _API.resetScores()
      .then((data) => {
        console.log(data)
        dispatch(apiResetScoresSuccess(data.players, data.id))
      })
      .catch((err) => {
        console.log(err)
        dispatch(apiResetScoresFailure(err))
      })
  }
}
