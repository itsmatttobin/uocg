const cors = require('cors');
const app = require('express')();

app.use(cors());

const http = require('http').createServer(app);
const io = require('socket.io')(http);
const blackCards = require('./data/black-cards');
const whiteCards = require('./data/white-cards');

const rooms = {};

function updateRoom(id) {
  // Emit to all clients in a room
  io.to(id).emit('update room', rooms[id]);
}

function initRoom(id) {
  rooms[id] = {
    blackCards,
    whiteCards,
    players: [],
    currentCard: null,
    playedCards: []
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

io.on('connection', (socket) => {
  // Allow a client to be in one room at a time
  let previousId;
  const safeJoin = currentId => {
    socket.leave(previousId);
    socket.join(currentId);
    previousId = currentId;
  };

  socket.on('join room', (id, name) => {
    safeJoin(id);

    // Create a new room if one doesn't already exist
    if (!rooms[id]) {
      initRoom(id);
    }

    addPlayerToRoom(socket, name, id);
    updateRoom(id);
  });

  socket.on('shuffle white cards', id => {
    rooms[id].whiteCards = shuffleCards(rooms[id].whiteCards);
    updateRoom(id);
  });

  socket.on('shuffle black cards', id => {
    rooms[id].blackCards = shuffleCards(rooms[id].blackCards);
    updateRoom(id);
  });

  socket.on('draw white card', id => {
    rooms[id].whiteCards.shift();
    updateRoom(id);
  });

  socket.on('draw black card', id => {
    rooms[id].currentCard = rooms[id].blackCards[0];
    rooms[id].blackCards.shift();
    rooms[id].playedCards = [];
    updateRoom(id);
  });

  socket.on('play card', (id, card) => {
    rooms[id].playedCards.push({ text: card, revealed: false });
    updateRoom(id);
  });

  socket.on('reveal card', (id, cardToReveal) => {
    const foundCard = rooms[id].playedCards.find(card => card.text === cardToReveal.text);
    foundCard.revealed = !foundCard.revealed;
    updateRoom(id);
  })

  // TODO: Remove player from room
  // TODO: Delete room data on disconnect of all clients
});

http.listen(4000, () => {
  console.log('Listening on port 4000');
});
