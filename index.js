const static = require('node-static');

const file = new static.Server('./client');

const httpServer = require('http').createServer((req, res) => {
  req
    .addListener('end', () => {
      file.serve(req, res);
    })
    .resume();
});

const io = require('socket.io')(httpServer);

io.on('connect', (socket) => {
  console.log('connect');

  socket.on('create_room', (roomName) => {
    console.log('ROOM NAME ', roomName);
    socket.join(roomName);
    io.to(roomName).emit('room_created', roomName);
  });

  socket.on('join_room', (roomName) => {
    console.log('JOIN ROOM ', roomName);
    socket.join(roomName);
    io.to(roomName).emit('user_joined');
  });
});

httpServer.listen(3000, () => {
  console.log('go to http://localhost:3000');
});
