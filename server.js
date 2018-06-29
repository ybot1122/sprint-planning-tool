const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const socketApp = express()
const socketServer = require('http').createServer(socketApp)
const io = require('socket.io')(socketServer)

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
io.on('connection', function(client) {  
  console.log('Client connected...')

  client.on('join', function(data) {
    console.log(data)
  })
})
socketServer.listen(4200)