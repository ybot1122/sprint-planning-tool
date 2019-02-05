import openSocket from 'socket.io-client';
import * as apiEvents from '../constants/apiConstants'
import * as ACTION from '../constants/actionTypes'
import { updateEverything } from '../actions/actions'

const socketDomain = (process.env.NODE_ENV === 'development') 
  ? 'http://localhost:4200'
  : 'http://ec2-34-217-210-176.us-west-2.compute.amazonaws.com:4200'

let socket = null;

// TODO: hook up
const onRefresh = (dispatch) => {
  socket.on(apiEvents.EVENT_REFRESH, (players) => {
    dispatch(updateEverything({ players, id: socket.id }))
  })
}

export const openConnection = (name, roomName, dispatch) => {
  if (socket != null) {
    console.warn('tried to open connection that already open')
    return Promise.reject('tried to open connection that already open')
  }

  const apiPromise = new Promise((res, rej) => {
    socket = openSocket(socketDomain)
    socket.on(apiEvents.EVENT_TOGGLE_CARD_VISIBILITY, (isVisible) => {
      dispatch({ type: ACTION.TOGGLE_SHOW_CARDS, isVisible })
    })
    socket.on('connect', () => {
      socket.emit(apiEvents.EVENT_NEW_PLAYER, name, roomName, (data, err) => {
        if (err) {
          rej(err)
        } else {
          console.log('Socket Opened', data)
          onRefresh(dispatch)
          res({ players: data.players, id: socket.id, showCards: data.showCards })
        }
      })
    })
  })

  return apiPromise
}

export const updateScore = (score) => {
  if (socket == null) {
    console.warn('tried to update score before opening connection')
    return Promise.reject('tried to update score before opening connection')
  }

  const apiPromise = new Promise((res, rej) => {
    socket.emit(apiEvents.EVENT_UPDATE_SCORE, score, (players, err) => {
      if (err) {
        rej(err)
      } else {
        res({ players, id: socket.id })
      }
    })
  })

  return apiPromise
}

export const updateName = (name) => {
  if (socket == null) {
    console.warn('tried to update name before opening connection')
    return Promise.reject('tried to update name before opening connection')
  }

  const apiPromise = new Promise((res, rej) => {
    socket.emit(apiEvents.EVENT_UPDATE_NAME, name, (players, err) => {
      if (err) {
        rej(err)
      } else {
        res({ players, id: socket.id })
      }
    })
  })

  return apiPromise
}

export const toggleCardVisibility = () => {
  if (socket == null) {
    console.warn('tried to toggle cards visibility before opening connection')
    return Promise.reject('tried to toggle cards visibility before opening connection')
  }

  const apiPromise = new Promise((res, rej) => {
    socket.emit(apiEvents.EVENT_TOGGLE_CARD_VISIBILITY, (isVisible, err) => {
      if (err) {
        rej(err)
      } else {
        res({ isVisible, id: socket.id })
      }
    })
  })

  return apiPromise
}

export const resetScores = () => {
  if (socket == null) {
    console.warn('tried to reset scores before opening connection')
    return Promise.reject('tried to reset scores before opening connection')
  }
  const apiPromise = new Promise((res, rej) => {
    console.log('emit')
    socket.emit(apiEvents.EVENT_RESET, (players, err) => {
      if (err) {
        rej(err)
      } else {
        res({ players, id: socket.id })
      }
    })
  })

  return apiPromise
}
