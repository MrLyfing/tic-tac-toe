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
  PLAYER_1_WIN: 'player_1_win',
  PLAYER_2_WIN: 'player_2_win',
  DRAW: 'draw'
}

const EVENT = {
  CREATE_SINGLE: 'create_single',
  CREATE_MULTIPLAYER: 'create_multiplayer',
  CREATE_ONLINE: 'create_online',
  JOIN_ONLINE: 'join_online',
  PLAY_MOVE: 'play_move',
  BOARD_UPDATE: 'board_update'
}

export { GAME_MODE, GAME_STATUS, TEAM, EVENT }
