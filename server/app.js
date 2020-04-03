const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const rooms = {
  abc: ['a', 'b', 'c'],
  def: ['d', 'e', 'f'],
}

function updateRoom(id) {
  io.to(id).emit('update room', rooms[id]);
}

io.on('connection', (socket) => {
  let previousId;
  const safeJoin = currentId => {
    socket.leave(previousId);
    socket.join(currentId);
    previousId = currentId;
  };

  socket.on('join room', id => {
    safeJoin(id);

    // Create a new room if one doesn't already exist
    if (!rooms[id]) {
      rooms[id] = [];
    }
  });
});

http.listen(4000, () => {
  console.log('Listening on port 4000');
});
