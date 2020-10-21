<script>
  import socket from "../socket.js";

  let roomName = "No Room Name";
  let hideButton = false;
  function createRoom() {
    roomName = "My Room Name";
    socket.emit("create_room", roomName);
    hideButton = true;
  }
</script>

<div class="controls">
  <div class="room-info">
    <span class="room-name">{roomName}</span>
    {#if !hideButton}
      <button on:click={createRoom} class="create-room-button">
        Create room
      </button>
    {/if}
  </div>
</div>
