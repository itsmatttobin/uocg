const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const blackCards = require('./data/black-cards');
const whiteCards = require('./data/white-cards');

const rooms = {};

function updateRoom(id) {
  io.to(id).emit('update room', rooms[id]);
}

function initRoom(id) {
  rooms[id] = {
    blackCards,
    whiteCards,
    players: [],
  };
}

function addPlayerToRoom(socket, name, roomId) {
  const player = {
    id: socket.id,
    name,
    hand: []
  };

  rooms[roomId].players.push(player);
}

io.on('connection', (socket) => {
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

  // TODO: Remove player from room
  // TODO: Delete room data on disconnect of all clients
});

http.listen(4000, () => {
  console.log('Listening on port 4000');
});
