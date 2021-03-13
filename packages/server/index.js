import { createServer } from 'http'
import { Server } from 'socket.io'
import { Game, Player, Spectator, getOppositeTeam } from './utils.js'
import { GAME_MODE, EVENT } from '@tic-tac-toe/common'

function socketOnEvents(socket, names, fn) {
  names.forEach(name => {
    socket.on(name, fn(name))
  })
}

const games = []
const PORT = process.env.PORT || 8080

const httpServer = createServer()
const io = new Server(httpServer, {
  serveClient: false
})

io.on('connection', socket => {
  console.log(`connect socket ${socket.id}`)

  socket.onAny((event, ...args) => {
    console.log(event, args)
  })

  socketOnEvents(
    socket,
    [EVENT.CREATE_SINGLE, EVENT.CREATE_ONLINE, EVENT.CREATE_MULTIPLAYER],
    eventName => (payload, cb) => {
      let newGame = null
      if ([EVENT.CREATE_SINGLE, EVENT.CREATE_ONLINE].includes(eventName)) {
        const { p1Name, p1Team } = payload
        if (!p1Name || !p1Team) return cb({ success: false, message: 'Payload incorrect' })

        const p1 = new Player(p1Name, p1Team)
        if (eventName === EVENT.CREATE_SINGLE) {
          const p2 = new Player('AI', getOppositeTeam(p1.team))
          newGame = new Game(GAME_MODE.CREATE_SINGLE, p1, p2)
        } else {
          newGame = new Game(GAME_MODE.CREATE_ONLINE, p1)
        }
      } else {
        // Create multiplayer
        const { p1Name, p1Team, p2Name } = payload
        if (!p1Name || !p1Team || !p2Name) {
          return cb({ success: false, message: 'Payload incorrect' })
        }
        const p1 = new Player(p1Name, p1Team)
        const p2 = new Player(p2Name, getOppositeTeam(p1Team))
        newGame = new Game(GAME_MODE.MULTIPLAYER, p1, p2)
      }
      games.push(newGame)
      socket.join(newGame.room)
      cb({ success: true, game: newGame.getGameState() })
    }
  )

  socket.on(EVENT.JOIN_ONLINE, (payload, cb) => {
    const { room, name } = payload
    if (!room || !name) {
      return cb({ success: false, message: 'Payload incorrect' })
    }
    const game = games.find(g => g.room === room)
    if (!game) return cb({ success: false, message: 'Game not found' })
    if (game.mode !== GAME_MODE.ONLINE) {
      return cb({ success: false, message: 'This is not an online game' })
    }

    if (game.p2 === null) {
      // p1 is waiting for opponent
      this.setP2(new Player(name, getOppositeTeam(game.p1.team)))
    } else {
      game.spectators.push(new Spectator(name))
    }

    socket.join(game.room)
    io.in(game.room).emit(EVENT.BOARD_UPDATE, game.getGameState())
    cb({ success: true, game: game.getGameState() })
  })

  socket.on(EVENT.PLAY_MOVE, (payload, errCb) => {
    const { room, team, posX, posY } = payload
    const game = games.find(g => g.room === room)
    const success = game.play(team, posX, posY)
    if (!success) return errCb({ status: 'ERROR', message: 'Move incorrect' })
    io.in(game.room).emit(EVENT.BOARD_UPDATE, game.getGameState())
  })

  socket.on('disconnect', () => {
    console.log(`disconnect socket ${socket.id}`)
  })
})

httpServer.listen(8080, () => {
  console.log('server listening on port', PORT)
})
