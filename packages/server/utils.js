import { GAME_MODE, TEAM, GAME_STATUS } from '@tic-tac-toe/common'

const getOppositeTeam = team => (team === TEAM.X ? TEAM.O : TEAM.X)

class Game {
  constructor(mode, p1, p2 = null) {
    this.mode = mode
    this.room = Date.now()
    this.board = []
    this.playerTurn = p1
    this.p1 = p1
    this.p2 = null
    this.status = mode === GAME_MODE.ONLINE ? GAME_STATUS.WAITING_FOR_OPPONENT : GAME_STATUS.PLAYER_1_TURN
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

export { Game, Player, Spectator, getOppositeTeam }
