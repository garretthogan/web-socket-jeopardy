const content = require('fs').readFileSync(__dirname + '/client' + '/index.html', 'utf8');

const httpServer = require('http').createServer((req, res) => {
  // serve the index.html file
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(content));
  res.end(content);
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
