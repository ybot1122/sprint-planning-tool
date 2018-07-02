import openSocket from 'socket.io-client';
import * as apiEvents from '../constants/apiConstants'
import { updateEverything } from '../actions/actions'

let socket = null;

// TODO: hook up
const onRefresh = (dispatch) => {
  socket.on(apiEvents.EVENT_REFRESH, (players) => {
    console.log('toby, received a socket emit')
    dispatch(updateEverything({ players, id: socket.id }))
  })
}

export const openConnection = (name, dispatch) => {
  if (socket != null) {
    console.warn('tried to open connection that already open')
    return
  }

  const apiPromise = new Promise((res, rej) => {
    socket = openSocket('http://localhost:4200')
    socket.on('connect', () => {
      socket.emit(apiEvents.EVENT_NEW_PLAYER, name, (players, err) => {
        if (err) {
          rej(err)
        } else {
          onRefresh(dispatch)
          res({ players, id: socket.id })
        }
      })
    })
  })

  return apiPromise
}

export const updateScore = (score) => {
  if (socket == null) {
    console.warn('tried to update score before opening connection')
    return
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
