enum EVENTS {
  START_ROOM = 'START_ROOM',
  ROOM_CREATED = 'ROOM_CREATED',
  JOIN_ROOM = 'JOIN_ROOM',
  LEAVE_ROOM = 'LEAVE_ROOM',
  DRAW_WHITE_CARD = 'DRAW_WHITE_CARD',
  DRAW_BLACK_CARD = 'DRAW_BLACK_CARD',
  ROUND_START = 'ROUND_START',
  ROUND_END = 'ROUND_END',
  PLAY_CARD = 'PLAY_CARD',
  REVEAL_CARD = 'REVEAL_CARD',
  UPDATE_ROOM = 'UPDATE_ROOM',
  CHOOSE_WINNING_CARD = 'CHOOSE_WINNING_CARD',
  END_OF_ROUND = 'END_OF_ROUND',
  RESTART_GAME = 'RESTART_GAME',
  GAME_RESTARTED = 'GAME_RESTARTED',
  NO_ROOM_EXISTS = 'NO_ROOM_EXISTS',
}

export default EVENTS;
