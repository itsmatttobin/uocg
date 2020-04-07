const app = require('express')();
const cors = require('cors');
app.use(cors());
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const blackCards = require('./data/black-cards');
const whiteCards = require('./data/white-cards');

const rooms = {};

function updateRoom(id) {
  // Emit room data to all clients in a room
  io.to(id).emit('UPDATE_ROOM', rooms[id]);
}

function initRoom(id) {
  rooms[id] = {
    id,
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
    wonCards: [],
  };

  rooms[roomId].players.push(player);
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

io.on('connection', socket => {
  // Allow a client to be in one room at a time
  let previousId;
  const safeJoin = currentId => {
    socket.leave(previousId);
    socket.join(currentId);
    previousId = currentId;
  };

  socket.on('JOIN_ROOM', (id, name) => {
    safeJoin(id);

    // Create a new room if one doesn't already exist
    if (!rooms[id]) {
      initRoom(id);
    }

    addPlayerToRoom(socket, name, id);
    updateRoom(id);
  });

  socket.on('LEAVE_ROOM', (playerId, roomId) => {
    const player = rooms[roomId] && rooms[roomId].players.find(player => player.id === playerId);

    if (player) {
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

  socket.on('DRAW_WHITE_CARD', id => {
    rooms[id].whiteCards.shift();
    updateRoom(id);
  });

  socket.on('DRAW_BLACK_CARD', id => {
    rooms[id].currentCard = rooms[id].blackCards[0];
    rooms[id].blackCards.shift();
    rooms[id].answerCards = [];
    updateRoom(id);
  });

  socket.on('PLAY_CARD', (id, card) => {
    rooms[id].answerCards.push({ text: card, revealed: false, playerId: socket.id });
    updateRoom(id);
  });

  socket.on('REVEAL_CARD', (id, cardToReveal) => {
    const foundCard = rooms[id].answerCards.find(card => card.text === cardToReveal.text);
    foundCard.revealed = !foundCard.revealed;
    updateRoom(id);
  });

  socket.on('CHOOSE_WINNING_CARD', (id, card, currentCard) => {
    const player = rooms[id].players.find(player => player.id === card.playerId);
    if (player) {
      player.wonCards.push(currentCard);
    }

    rooms[id].currentCard = null;
    rooms[id].answerCards = [];

    io.to(id).emit('END_OF_ROUND', player, currentCard, card);
    updateRoom(id);
  });

  socket.on('RESTART_GAME', id => {
    rooms[id].whiteCards = shuffleCards(JSON.parse(JSON.stringify(whiteCards)));
    rooms[id].blackCards = shuffleCards(JSON.parse(JSON.stringify(blackCards)));
    rooms[id].currentCard = null;
    rooms[id].answerCards = [];
    rooms[id].players = rooms[id].players.map(player => ({
      ...player,
      wonCards: [],
    }));

    io.to(id).emit('GAME_RESTARTED');
    updateRoom(id);
  });
});

http.listen(4000, () => {
  console.log('Listening on port 4000');
});
