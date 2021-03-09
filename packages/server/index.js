import { createServer } from 'http'
import { Server } from 'socket.io'
import { GAME_MODE, TEAM, GAME_STATUS, EVENT } from '@tic-tac-toe/common'

const getOppositeTeam = team => (team === TEAM.X ? TEAM.O : TEAM.X)

class Game {
  constructor(mode, p1) {
    this.mode = mode
    this.room = Date.now()
    this.board = []
    this.playerTurn = p1
    this.p1 = p1
    this.p2 = null
    this.status = GAME_STATUS.WAITING_FOR_OPPONENT
    if (mode === GAME_MODE.SINGLE_PLAYER) {
      this.setP2(new Player('AI', getOppositeTeam(p1.team)))
      this.status = GAME_STATUS.PLAYER_1_TURN
    }
    this.spectators = []
    this._moveCount = 0
  }

  setP2(player) {
    this.p2 = player
  }

  play(player, x, y) {
    this._move++
  }

  getGameState() {
    const { mode, room, board, playerTurn, p1, p2, status, spectators } = this
    return { mode, room, board, playerTurn, p1, p2, status, spectators }
  }
}

class User {
  constructor(name) {
    this.name = name
  }
}

class Player extends User {
  constructor(name, team) {
    super(name)
    this.team = team
  }
}

class Spectator extends User {}

function socketOnEvents(socket, names, fn) {
  names.forEach(name => {
    socket.on(name, fn)
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

  socketOnEvents(socket, [EVENT.CREATE_SINGLE, EVENT.CREATE_ONLINE], (payload, cb) => {
    const { gameMode, p1Name, p1Team } = payload
    if (!gameMode || !p1Name || !p1Team) {
      return cb({ success: false, message: 'Payload incorrect' })
    }

    const p1 = new Player(p1Name, p1Team)
    const newGame = new Game(gameMode, p1)
    games.push(newGame)
    socket.join(newGame.room)
    cb({ success: true, game: newGame.getGameState() })
  })

  socket.on(EVENT.CREATE_MULTIPLAYER, (payload, cb) => {
    const { gameMode, p1Name, p1Team, p2Name } = payload
    if (!gameMode || !p1Name || !p1Team || !p2Name) {
      return cb({ success: false, message: 'Payload incorrect' })
    }
    if (gameMode !== GAME_MODE.MULTIPLAYER) {
      return cb({ success: false, message: 'Incorrect game mode' })
    }
    const p1 = new Player(p1Name, p1Team)
    const p2 = new Player(p2Name, getOppositeTeam(p1Team))
    const newGame = new Game(gameMode, p1)
    newGame.setP2(p2)
    games.push(newGame)
    socket.join(newGame.room)
    cb({ success: true, game: newGame.getGameState() })
  })

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
