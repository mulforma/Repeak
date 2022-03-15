<script lang="ts">
  import { page } from "$app/stores";
  import { io } from "socket.io-client"
  import { name, id, RoomData } from "$lib/playerData";
  import { onMount } from "svelte";

  const socket = io("http://localhost:5000")
  let roomPlayers = [];
  let roomData;
  let roomId = $page.params.roomId;

  onMount(() => {
    socket.emit("join", { roomId, name: $name, id: $id });
    socket.emit("getRoom", { roomId })

    socket.on("updateRoom", (data: RoomData) => {
      roomPlayers = data.roomPlayers
      roomData = data
    })

    socket.on("disconnect", () => {
      socket.emit("leave", { roomId, id: $id })
    })
  })
</script>

<div class="main-container">
  <div class="flex flex-col items-center justify-center gap-8">
    <h1>
      Awaiting
    </h1>
    <div class="grid grid-cols-2 gap-8">
      <div class="flex flex-col gap-4">
        <h2 class="text-3xl font-bold text-center">Users</h2>
        <div class="flex flex-col">
          {#if roomPlayers.length > 0}
            {#each roomPlayers as player, idx}
              <p class="text-xl"><span class="text-blue-500">{idx+1}.</span> {player.name} {player.id === roomData?.roomOwner.id ? "(Host)" : ""} {player.id === $id ? "(Me)" : ""}</p>
            {/each}
          {/if}
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <h2 class="text-3xl font-bold text-center">Room Config</h2>
        <div class="flex flex-col">
          <div class="flex flex-row items-center justify-center">
            <p class="subtitle w-full">Public room? </p>
            <p class="{roomData?.roomPublic ? 'text-green-500' : 'text-red-500'} font-bold {roomData?.roomOwner.id === $id ? 'cursor-pointer' : ''}" on:click={() => { if(roomData?.roomOwner.id === $id) { roomData.roomPublic = !(roomData.roomPublic); socket.emit("modifyRoomConfig", { roomData }) }}}>{roomData?.roomPublic ? "Yes" : "No"}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>