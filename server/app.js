const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('new message', msg);
  });
});

http.listen(4000, () => {
  console.log('Listening on port 4000');
});
