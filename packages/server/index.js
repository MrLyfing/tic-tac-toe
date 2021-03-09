import { createServer } from 'http'
import { Server } from 'socket.io'
import { GAME_MODE, TEAM, GAME_STATUS } from '@tic-tac-toe/common'

const getOppositeTeam = team => (team === TEAM.X ? TEAM.Y : TEAM.X)

class Game {
  constructor(mode, p1) {
    this.mode = mode
    this.room = Date.now()
    this.board = []
    this.playerTurn = p1
    this.p1 = p1
    this.p2 = null
    this.status = GAME_STATUS.WAITING_FOR_OPPONENT
    if (mode === this.GAME_MODE.SINGLE_PLAYER) {
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
    const { room, board, playerTurn, p1, p2, spectators } = this
    return { room, board, playerTurn, p1, p2, spectators }
  }
}

class Player {
  constructor(name, team) {
    this.name = name
    this.team = team
  }
}

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
  socketOnEvents(socket, ['game:createSingle', 'game:createOnline'], (payload, cb) => {
    const { gameMode, p1Name, p1Team } = payload
    if (!gameMode || !p1Name || !p1Team) {
      return cb({ status: 'ERROR', message: 'Payload incorrect' })
    }
    if (![GAME_MODE.SINGLE_PLAYER, GAME_MODE.ONLINE].includes(gameMode)) {
      return cb({ status: 'ERROR', message: 'Incorrect game mode' })
    }
    const p1 = new Player(p1Name, p1Team)
    const newGame = new Game(p1, gameMode)
    games.push(newGame)
    socket.join(newGame.room)
    cb({ status: 'OK', game: newGame.getGameState() })
  })

  socket.on('game:createMulti', (payload, cb) => {
    const { gameMode, p1Name, p1Team, p2Name } = payload
    if (!gameMode || !p1Name || !p1Team || !p2Name) {
      return cb({ status: 'ERROR', message: 'Payload incorrect' })
    }
    if (gameMode !== GAME_MODE.MULTIPLAYER) {
      return cb({ status: 'ERROR', message: 'Incorrect game mode' })
    }
    const p1 = new Player(p1Name, p1Team)
    const p2 = new Player(p2Name, getOppositeTeam(p1Team))
    const newGame = new Game(p1, gameMode)
    newGame.setP2(p2)
    games.push(newGame)
    socket.join(newGame.room)
    cb({ status: 'OK', game: newGame.getGameState() })
  })

  socket.on('game:joinOnline', (payload, cb) => {
    const { room, p2Name } = payload
    if (!room || !p2Name) {
      return cb({ status: 'ERROR', message: 'Payload incorrect' })
    }
    const game = games.find(g => g.room === room)
    if (!game) return cb({ status: 'ERROR', message: 'Game not found' })
    if (game.mode !== GAME_MODE.ONLINE) return cb({ status: 'ERROR', message: 'This is not an online game' })
    // TODO: Join as spectator if game in progress...
    this.setP2(p2Name, getOppositeTeam(game.p1.team))
    socket.join(game.room)

    io.in(game.room).emit('game:update', game.getGameState())
    cb({ status: 'OK', game: game.getGameState() })
  })

  socket.on('game:play', (payload, errCb) => {
    const { room, team, posX, posY } = payload
    const game = games.find(g => g.room === room)
    const success = game.play(team, posX, posY)
    if (!success) return errCb({ status: 'ERROR', message: 'Move incorrect' })
    io.in(game.room).emit('game:update', game.getGameState())
  })

  socket.on('disconnect', () => {})
})

httpServer.listen(8080, () => {
  console.log('server listening on port', PORT)
})
