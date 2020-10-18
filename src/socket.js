import io from 'socket.io-client';
import board from './templates/board.html';

function initBoard() {
  const boardContainer = document.querySelector('.jeopardy-board-container');
  // boardContainer.setAttribute('style', 'display: inherit;');
  boardContainer.innerHTML = board;

  const prices = [100, 200, 300, 400];

  const categories = Array.from(document.querySelectorAll('.category'));
  categories.forEach((category) => {
    const cards = Array.from(category.children).map((question) => question.children[0].children[0]);
    prices.map((price, i) => (cards[i].innerText = `$${price}`));
  });
}

export default function () {
  const createButton = document.querySelector('.create-room-button');
  const roomNameContainer = document.querySelector('.room-name');
  const roomInfo = { name: null };

  const socket = io();

  socket.on('connect', () => {
    console.log('Connected');
    createButton.addEventListener('click', createRoom);
  });

  socket.on('room_created', () => {
    console.log('Room created');
    roomNameContainer.innerText = roomInfo.name;
    createButton.remove();
    initBoard();
  });

  function createRoom() {
    console.log('Creating a room');
    const roomName = 'My Room Name';
    socket.emit('create_room', roomName);
    roomInfo.name = roomName;
  }
}
