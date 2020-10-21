<script>
  import Controls from "./Controls.svelte";
  import Board from "./Board.svelte";
  import socket from "../socket.js";

  socket.on("room_created", () => (roomCreated = true));

  let roomCreated = false;
</script>

<div>
  <Controls />
  {#if roomCreated}
    <Board />
  {/if}
</div>
