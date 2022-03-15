<script lang="ts">
  import {goto} from "$app/navigation";

  let roomId: string;
</script>

<div class="main-container">
  <div class="flex flex-col gap-6">
    <div class="flex flex-col items-center">
      <h1>
        REPEAK
      </h1>
      <h2 class="subtitle">
        A multiplayer party game that you can play with your friends.
      </h2>
    </div>
    <div class="flex flex-col gap-2">
      <div class="flex flex-row gap-2">
        <input type="text" name="roomId" id="roomId" placeholder="Enter room id..." bind:value={roomId}>
        <button class="bg-gradient-to-r from-violet-500 to-blue-500 text-white text-md text-white font-bold px-4 py-2 rounded-lg" on:click={() => roomId ? goto(`/room/${roomId}`) : goto("/create")}>
          Join
        </button>
      </div>
      <div class="flex flex-row gap-2">
        <button class="basis-full" on:click={() => goto("/discover")}>
          Discover
        </button>
        <button class="from-green-500 to-yellow-500 basis-full" on:click={() => goto("/create")}>
          Create
        </button>
        <button class="basis-full" on:click={() => goto("/settings")}>
          Settings
        </button>
      </div>
    </div>
  </div>
</div>