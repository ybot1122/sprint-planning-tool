import openSocket from 'socket.io-client';
import * as apiEvents from '../constants/apiConstants'

let socket = null;

export const openConnection = (name) => {
  if (socket != null) {
    console.warn('tried to open connection that already open')
    return
  }

  const apiPromise = new Promise((res, rej) => {
    socket = openSocket('http://localhost:4200')
    socket.on('connect', (data) => {
      socket.emit(apiEvents.EVENT_NEW_PLAYER, name, (players, err) => {
        if (err) {
          rej(err)
        } else {
          res(players)
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
    socket.emit(apiEvents.EVENT_UPDATE_NAME, score, (players, err) => {
      if (err) {
        rej(err)
      } else {
        res(players)
      }
    })
  })

  return apiPromise
}
