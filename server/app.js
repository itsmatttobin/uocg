const app = require('express')();
const cors = require('cors');
app.use(cors());
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const blackCards = require('./data/black-cards');
const whiteCards = require('./data/white-cards');

const rooms = {};

function updateRoom(roomId) {
  // Emit room data to all clients in a room
  io.to(roomId).emit('UPDATE_ROOM', rooms[roomId]);
}

function initRoom(roomId) {
  rooms[roomId] = {
    id: roomId,
    blackCards: shuffleCards(JSON.parse(JSON.stringify(blackCards))),
    whiteCards: shuffleCards(JSON.parse(JSON.stringify(whiteCards))),
    players: [],
    currentCard: null,
    answerCards: [],
  };
}

function addPlayerToRoom(socket, name, roomId) {
  const player = {
    id: socket.id,
    name,
    hand: [],
    wonCards: [],
  };

  if (rooms[roomId]) {
    rooms[roomId].players.push(player);
  }  
}

function shuffleCards(cards) {
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
  let previousId;
  const safeJoin = currentId => {
    socket.leave(previousId);
    socket.join(currentId);
    previousId = currentId;
  };

  socket.on('JOIN_ROOM', (roomId, name) => {
    if (!rooms[roomId]) {
      socket.emit('NO_ROOM_EXISTS');
      return;
    }

    safeJoin(roomId);
    addPlayerToRoom(socket, name, roomId);
    updateRoom(roomId);
    socket.emit('PLAYER_JOINED_ROOM');
  });

  socket.on('START_ROOM', name => {
    const roomId = getRandomId();

    // Create a new room if one doesn't already exist
    if (!rooms[roomId]) {
      initRoom(roomId);
    }

    safeJoin(roomId);
    addPlayerToRoom(socket, name, roomId);
    updateRoom(roomId);
    socket.emit('ROOM_CREATED', roomId);
    socket.emit('PLAYER_JOINED_ROOM');
  });

  socket.on('LEAVE_ROOM', (playerId, roomId) => {
    const player = rooms[roomId] && rooms[roomId].players.find(player => player.id === playerId);

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

  socket.on('DRAW_WHITE_CARD', (roomId, playerId) => {
    const player = rooms[roomId] && rooms[roomId].players.find(player => player.id === playerId);
    
    // Remove card from deck
    const card = rooms[roomId] && rooms[roomId].whiteCards.shift();
    
    // Add to player hand
    if (player) {
      player.hand.push(card);    
    }

    updateRoom(roomId);
  });

  socket.on('DRAW_BLACK_CARD', roomId => {
    if (rooms[roomId]) {
      rooms[roomId].currentCard = rooms[roomId].blackCards[0];
      rooms[roomId].blackCards.shift();
      rooms[roomId].answerCards = [];
    }

    updateRoom(roomId);
    socket.emit('ROUND_START');
  });

  socket.on('PLAY_CARD', (roomId, card, playerId) => {
    // Remove card from player hand
    const player = rooms[roomId] && rooms[roomId].players.find(player => player.id === playerId);
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

  socket.on('REVEAL_CARD', (roomId, cardToReveal) => {
    const foundCard = rooms[roomId] && rooms[roomId].answerCards.find(card => card.text === cardToReveal.text);

    if (foundCard) {
      foundCard.revealed = !foundCard.revealed;
    }

    updateRoom(roomId);
  });

  socket.on('CHOOSE_WINNING_CARD', (roomId, card, currentCard) => {
    const player = rooms[roomId] && rooms[roomId].players.find(player => player.id === card.playerId);

    if (player) {
      player.wonCards.push(currentCard);
    }

    if (rooms[roomId]) {
      rooms[roomId].currentCard = null;
      rooms[roomId].answerCards = [];
    }

    io.to(roomId).emit('END_OF_ROUND', player, currentCard, card);
    updateRoom(roomId);
    socket.emit('ROUND_END', currentCard, card);
  });

  socket.on('RESTART_GAME', roomId => {
    if (rooms[roomId]) {
      rooms[roomId].whiteCards = shuffleCards(JSON.parse(JSON.stringify(whiteCards)));
      rooms[roomId].blackCards = shuffleCards(JSON.parse(JSON.stringify(blackCards)));
      rooms[roomId].currentCard = null;
      rooms[roomId].answerCards = [];
      rooms[roomId].players = rooms[roomId].players.map(player => ({
        ...player,
        hand: [],
        wonCards: [],
      }));
    }

    io.to(roomId).emit('GAME_RESTARTED');
    updateRoom(roomId);
  });
});

http.listen(4000, () => {
  console.log('Listening on port 4000');
});
