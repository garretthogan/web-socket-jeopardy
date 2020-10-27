const static = require('node-static');
const nanoid = require('nanoid').nanoid;

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
    const id = nanoid(4);
    const name = `${roomName}#${id}`;
    socket.join(name);
    console.log(`Creating room ${name}`);
    io.to(name).emit('room_created', name);
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
