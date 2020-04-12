import * as express from 'express';
import * as cors from 'cors';
import * as http from 'http';
import * as socketio from 'socket.io';
import blackCards from './data/black-cards';
import whiteCards from './data/white-cards';
import IRoom from './definitions/room';
import IPlayer from './definitions/player';
import IBlackCard from './definitions/black-card';
import EVENTS from './definitions/events';
import IAnswerCard from './definitions/answer-card';

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketio(server, { serveClient: false });

const rooms: { [x: string]: IRoom } = {};

function updateRoom(roomId: string) {
  // Emit room data to all clients in a room
  io.to(roomId).emit(EVENTS.UPDATE_ROOM, rooms[roomId]);
}

function initRoom(roomId: string) {
  rooms[roomId] = {
    id: roomId,
    blackCards: shuffleCards(JSON.parse(JSON.stringify(blackCards))) as IBlackCard[],
    whiteCards: shuffleCards(JSON.parse(JSON.stringify(whiteCards))) as string[],
    players: [],
    currentCard: null,
    answerCards: [],
  };
}

function addPlayerToRoom(socket: SocketIO.Socket, name: string, roomId: string) {
  const player: IPlayer = {
    id: socket.id,
    name,
    hand: [],
    wonCards: [],
  };

  if (rooms[roomId]) {
    rooms[roomId].players.push(player);
  }
}

function shuffleCards(cards: IBlackCard[] | string[]) {
  let currentIndex = cards.length;
  let temporaryValue;
  let randomIndex;

  // While there cards left to shuffle
  while (0 !== currentIndex) {
    // Pick a remaining card
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current card
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }

  return cards;
}

function getRandomId() {
  const length = 6;
  const characters = 'abcdefghijklmnopqrstuvwxyz123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
     result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

io.on('connection', socket => {
  // Allow a client to be in one room at a time
  let previousId: string;
  const safeJoin = (currentId: string) => {
    socket.leave(previousId);
    socket.join(currentId);
    previousId = currentId;
  };

  socket.on(EVENTS.JOIN_ROOM, (roomId: string, name: string) => {
    if (!rooms[roomId]) {
      socket.emit(EVENTS.NO_ROOM_EXISTS);
      return;
    }

    safeJoin(roomId);
    addPlayerToRoom(socket, name, roomId);
    updateRoom(roomId);
    socket.emit(EVENTS.PLAYER_JOINED_ROOM);
  });

  socket.on(EVENTS.START_ROOM, (name: string) => {
    const roomId = getRandomId();

    // Create a new room if one doesn't already exist
    if (!rooms[roomId]) {
      initRoom(roomId);
    }

    safeJoin(roomId);
    addPlayerToRoom(socket, name, roomId);
    updateRoom(roomId);
    socket.emit(EVENTS.ROOM_CREATED, roomId);
    socket.emit(EVENTS.PLAYER_JOINED_ROOM);
  });

  socket.on(EVENTS.LEAVE_ROOM, (playerId: string, roomId: string) => {
    const player = rooms[roomId] && rooms[roomId].players.find(_player => _player.id === playerId);

    if (player && rooms[roomId]) {
      const index = rooms[roomId].players.indexOf(player);
      rooms[roomId].players.splice(index, 1);
    }

    socket.leave(roomId);
    updateRoom(roomId);

    // Delete room data if room is empty
    if (rooms[roomId] && !rooms[roomId].players.length) {
      delete rooms[roomId];
    }
  });

  socket.on(EVENTS.DRAW_WHITE_CARD, (roomId: string, playerId: string) => {
    const player = rooms[roomId] && rooms[roomId].players.find(_player => _player.id === playerId);

    // Remove card from deck
    const card = rooms[roomId] && rooms[roomId].whiteCards.shift();

    // Add to player hand
    if (player) {
      player.hand.push(card);
    }

    updateRoom(roomId);
  });

  socket.on(EVENTS.DRAW_BLACK_CARD, (roomId: string) => {
    if (rooms[roomId]) {
      rooms[roomId].currentCard = rooms[roomId].blackCards[0];
      rooms[roomId].blackCards.shift();
      rooms[roomId].answerCards = [];
    }

    updateRoom(roomId);
    socket.emit(EVENTS.ROUND_START);
  });

  socket.on(EVENTS.PLAY_CARD, (roomId: string, card: string, playerId: string) => {
    // Remove card from player hand
    const player = rooms[roomId] && rooms[roomId].players.find(_player => _player.id === playerId);
    const index = player && player.hand.indexOf(card);

    if (player) {
      player.hand.splice(index, 1);
    }

    // Add card to played answer cards
    if (rooms[roomId]) {
      rooms[roomId].answerCards.push({ text: card, revealed: false, playerId });
    }

    updateRoom(roomId);
  });

  socket.on(EVENTS.REVEAL_CARD, (roomId: string, cardToReveal: IAnswerCard) => {
    const foundCard = rooms[roomId] && rooms[roomId].answerCards.find(card => card.text === cardToReveal.text);

    if (foundCard) {
      foundCard.revealed = !foundCard.revealed;
    }

    updateRoom(roomId);
  });

  socket.on(EVENTS.CHOOSE_WINNING_CARD, (roomId: string, card: IAnswerCard, currentCard: IBlackCard) => {
    const player = rooms[roomId] && rooms[roomId].players.find(_player => _player.id === card.playerId);

    if (player) {
      player.wonCards.push(currentCard);
    }

    if (rooms[roomId]) {
      rooms[roomId].currentCard = null;
      rooms[roomId].answerCards = [];
    }

    io.to(roomId).emit(EVENTS.END_OF_ROUND, player, currentCard, card);
    updateRoom(roomId);
    socket.emit(EVENTS.ROUND_END, currentCard, card);
  });

  socket.on(EVENTS.RESTART_GAME, (roomId: string) => {
    if (rooms[roomId]) {
      rooms[roomId].blackCards = shuffleCards(JSON.parse(JSON.stringify(blackCards))) as IBlackCard[];
      rooms[roomId].whiteCards = shuffleCards(JSON.parse(JSON.stringify(whiteCards))) as string[];
      rooms[roomId].currentCard = null;
      rooms[roomId].answerCards = [];
      rooms[roomId].players = rooms[roomId].players.map(player => ({
        ...player,
        hand: [],
        wonCards: [],
      }));
    }

    io.to(roomId).emit(EVENTS.GAME_RESTARTED);
    updateRoom(roomId);
  });
});

app.get('/', (_req, res) => {
  res.send('ok');
});

server.listen(4000, () => {
  // tslint:disable-next-line
  console.log('Listening on port 4000');
});
