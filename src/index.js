import socket from './socket.js';
import './index.css';
import App from './components/App.svelte';

const app = new App({ target: document.querySelector('.app') });

function start() {
  socket();
}
export default start();
