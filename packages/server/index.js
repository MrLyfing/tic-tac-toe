import { createServer } from 'http'
import { Server } from 'socket.io'

const PORT = process.env.PORT || 8080

const httpServer = createServer()
const io = new Server(httpServer, {
  serveClient: false
})

io.on('connection', socket => {
  console.log('connected!')
})

httpServer.listen(8080, () => {
  console.log('server listening on port', PORT)
})
