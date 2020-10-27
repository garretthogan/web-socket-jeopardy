<script>
  import socket from '../socket.js';

  let roomName = 'No Room Name';
  function createRoom() {
    socket.emit('create_room', roomName);
  }

  function joinRoom() {
    socket.emit('join_room', roomId);
  }

  function updateRoomName(event) {
    roomName = event.target.value;
  }

  let roomId;
  function updateRoomId(event) {
    roomId = event.target.value;
  }
</script>

<div class="controls">
  <div class="room-info">
    <span class="room-name">{roomName}</span>
    <input placeholder="Room to create" on:change={updateRoomName} />
    <button on:click={createRoom} class="create-room-button"> Create room </button>
    <input placeholder="Put the full room ID here" on:change={updateRoomId} />
    <button on:click={joinRoom}>Join room</button>
  </div>
</div>
