const GAME_MODE = {
  SINGLE_PLAYER: 'single_player',
  MULTIPLAYER: 'multiplayer',
  INVITE_FRIEND: 'invite_friend'
}

const TEAM = {
  X: 'X',
  Y: 'Y'
}

const GAME_STATUS = {
  WAITING_FOR_OPPONENT: 'waiting_for_opponent',
  PLAYER_1_TURN: 'player_1_turn',
  PLAYER_2_TURN: 'player_2_turn',
  DRAW: 'draw',
  PLAYER_1_WIN: 'player_1_win',
  PLAYER_2_WIN: 'player_2_win'
}

export { GAME_MODE, GAME_STATUS, TEAM }
