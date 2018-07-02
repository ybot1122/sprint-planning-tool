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
const players = []
io.on('connection', (socket) => {
  console.log(socket.id + ' connected...')
  console.log('emitting refresh')

  socket.on(apiEvents.EVENT_NEW_PLAYER, (name, callback) => {
    if (name) {
      players.push({ id: socket.id, score: null, name })
      callback(players)
      console.log('emitting refresh')
      socket.broadcast.emit(apiEvents.EVENT_REFRESH, players)
    } else {
      callback('failed because name must be valid')
    }
    console.log(players)
  })

  socket.on(apiEvents.EVENT_UPDATE_SCORE, (score, callback) => {
    if (score) {
      const ind = players.findIndex((el) => el.id === socket.id)
      players[ind].score = score
      callback(players)
      console.log('emitting refresh')
      socket.broadcast.emit(apiEvents.EVENT_REFRESH, players)
    } else {
      callback('callback failed because score must be valid')
    }
    console.log(players)
  })

  socket.on(apiEvents.EVENT_UPDATE_NAME, (name, callback) => {
    if (name) {
      const ind = players.findIndex((el) => el.id === socket.id)
      players[ind].name = name
      callback(players)
      console.log('emitting refresh')
      socket.broadcast.emit(apiEvents.EVENT_REFRESH, players)
    } else {
      callback('callback failed because score must be valid')
    }
    console.log(players)
  })

  socket.on('disconnect', (reason) => {
    const ind = players.findIndex((el) => el.id === socket.id)
    players.splice(ind, 1)
    console.log(socket.id + ' disconnected because ' + reason)
  })
})

socketServer.listen(4200)
