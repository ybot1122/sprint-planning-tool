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
      socket.emit(apiEvents.EVENT_NEW_PLAYER, name)
      res(data)
    })
    console.log(socket)
  })

  return apiPromise
}
