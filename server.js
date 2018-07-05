const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const socketApp = express()
const socketServer = require('http').createServer(socketApp)
const io = require('socket.io')(socketServer)

const apiEvents = require('./constants/apiConstants')

// nextjs backend
app.prepare()
.then(() => {
  const server = express()

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  const port = (process.env.NODE_ENV === 'dev') ? 3000 : 80
  server.listen(port, (err) => {
    if (err) throw err
    console.log('> Ready on port ' + port)
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})

// socket.io backend
const activeSessions = {}
io.on('connection', (socket) => {
  console.log(socket.id + ' connected...')
  console.log('emitting refresh')

  socket.on(apiEvents.EVENT_NEW_PLAYER, (name, roomName, callback) => {
    if (name && roomName) {
      if (!activeSessions[roomName]) {
        activeSessions[roomName] = []
      }
      activeSessions[roomName].push({ id: socket.id, score: null, name })
      socket.join(roomName)
      callback(activeSessions[roomName])
      console.log('added player : ' + name + ' to ' + roomName)
      socket.to(roomName).broadcast.emit(apiEvents.EVENT_REFRESH, activeSessions[roomName])
    } else {
      callback(null, 'failed because name and roomName must be valid')
    }
  })

  socket.on(apiEvents.EVENT_UPDATE_SCORE, (score, callback) => {
    if (score) {
      const roomName = Object.keys(socket.rooms).find((roomName) => !!activeSessions[roomName])
      const players = activeSessions[roomName]
      const ind = players.findIndex((el) => el.id === socket.id)
      players[ind].score = score
      callback(players)
      console.log('updated score : ' + players[ind].name + ': ' + score)
      socket.to(roomName).broadcast.emit(apiEvents.EVENT_REFRESH, players)
    } else {
      callback(null, 'callback failed because score must be valid')
    }
  })

  socket.on(apiEvents.EVENT_UPDATE_NAME, (name, callback) => {
    if (name) {
      const roomName = Object.keys(socket.rooms).find((roomName) => !!activeSessions[roomName])
      const players = activeSessions[roomName]
      const ind = players.findIndex((el) => el.id === socket.id)
      players[ind].name = name
      callback(players)
      console.log('updated name : ' + name)
      socket.broadcast.emit(apiEvents.EVENT_REFRESH, players)
    } else {
      callback(null, 'callback failed because score must be valid')
    }
  })

  socket.on('disconnecting', (reason) => {
    const roomName = Object.keys(socket.rooms).find((roomName) => !!activeSessions[roomName])
    if (roomName) {
      const ind = activeSessions[roomName].findIndex((el) => el.id === socket.id)
      activeSessions[roomName].splice(ind, 1)
      socket.to(roomName).broadcast.emit(apiEvents.EVENT_REFRESH, activeSessions[roomName])
      console.log(socket.id + ' disconnected because ' + reason)
      if (activeSessions[roomName].length === 0) {
        delete activeSessions[roomName]
        console.log(socket.id + ' wass the last user in room ' + roomName)
      }
    }
  })
})

socketServer.listen(4200)
