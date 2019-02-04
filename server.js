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

  server.get('/room/:roomId', (req, res) => {
    const actualPage = '/room'
    const queryParams = { roomId: req.params.roomId }
    app.render(req, res, actualPage, queryParams)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})

// socket.io backend
const activeSessions = {}
io.on('connect', (socket) => {
  console.log(socket.id + ' connected...')
  console.log('emitting refresh')
  console.log(activeSessions)

  socket.on(apiEvents.EVENT_NEW_PLAYER, (name, roomName, callback) => {
    console.log('received')
    if (name && roomName) {
      let isMod = false
      if (!activeSessions[roomName]) {
        activeSessions[roomName] = {
          showCards: false,
          players: [],
        }
        isMod = true
      }
      activeSessions[roomName].players.push({ id: socket.id, score: null, name, isMod })
      socket.join(roomName)
      callback(activeSessions[roomName])
      console.log('added player : ' + name + '(id: ' + socket.id + ') to ' + roomName)
      socket.to(roomName).broadcast.emit(apiEvents.EVENT_REFRESH, activeSessions[roomName].players)
    } else {
      callback(null, 'failed because name and roomName must be valid')
    }
  })

  socket.on(apiEvents.EVENT_UPDATE_SCORE, (score, callback) => {
    if (score || score === null) {
      const roomName = Object.keys(socket.rooms).find((roomName) => !!activeSessions[roomName])
      console.log(roomName)
      const players = activeSessions[roomName].players
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
      const players = activeSessions[roomName].players
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
      const ind = activeSessions[roomName].players.findIndex((el) => el.id === socket.id)
      const player = activeSessions[roomName].players.splice(ind, 1)[0]
      console.log(socket.id + ' disconnected because ' + reason)

      // delete the room if that was the last user
      if (activeSessions[roomName].players.length === 0) {
        delete activeSessions[roomName]
        console.log(socket.id + ' was the last user in room ' + roomName)
        return
      }

      if (player.isMod) {
        activeSessions[roomName].players[0].isMod = true
      }
      socket.to(roomName).broadcast.emit(apiEvents.EVENT_REFRESH, activeSessions[roomName].players)
    }
  })
})

socketServer.listen(4200)
