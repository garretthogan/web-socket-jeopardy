<script>
  import Controls from './Controls.svelte';
  import Board from './Board.svelte';
  import socket from '../socket.js';

  socket.on('room_created', (room) => {
    roomCreated = true;
    console.log({ room });
  });

  socket.on('user_joined', () => {
    roomCreated = true;
  });

  let roomCreated = false;
</script>

<div>
  <Controls />
  {#if roomCreated}
    <Board />
  {/if}
</div>
