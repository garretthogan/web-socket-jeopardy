import io from 'socket.io-client';

export default function () {
  const roomInfo = { name: null };

  const createButton = document.querySelector('.create-room-button');
  const roomNameContainer = document.querySelector('.room-name');

  const socket = io();

  socket.on('connect', () => {
    console.log('Connected');
    createButton.addEventListener('click', createRoom);
  });

  socket.on('room_created', () => {
    console.log('Room created');
    roomNameContainer.innerText = roomInfo.name;
    createButton.remove();
  });

  function createRoom() {
    console.log('Creating a room');
    const roomName = 'My Room Name';
    socket.emit('create_room', roomName);
    roomInfo.name = roomName;
  }
}
