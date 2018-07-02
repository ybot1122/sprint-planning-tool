import openSocket from 'socket.io-client';

let socket = null;

export const openConnection = () => {
  if (socket != null) {
    console.warn('tried to open connection that already open')
    return
  }

  const apiPromise = new Promise((res, rej) => {
    socket = openSocket('http://localhost:4200')
    socket.on('connect', (data) => {
      console.log(data.id)
      socket.emit('join')
      res(data)
    })
  })

  return apiPromise
}
