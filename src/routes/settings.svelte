<script lang="ts">
  import { goto } from "$app/navigation";
  import { name, id } from "$lib/playerData";
  import { Chance } from "chance";

  const chance = new Chance();

  function checkValidInput() {
    if ($name?.length < 1) {
      $name = chance.name({ prefix: true });
    }
  }

  $: {
    if ($name?.length > 32) {
      $name = $name.substring(0, 32);
    }
  }
</script>

<div class="main-container">
  <div class="flex flex-col gap-4">
    <div class="flex flex-col items-center">
      <h1>
        SETTINGS
      </h1>
      <h2 class="subtitle">
        Edit your preferences and settings at here!
      </h2>
    </div>
    <div class="flex flex-col gap-2">
      <div class="flex flex-col">
        <p class="subtitle">Username</p>
        <input type="text" placeholder="Enter your username..." bind:value={$name}>
        <p class="text-sm text-gray-500">{$id}</p>
      </div>
    </div>
    <div class="flex flex-row gap-2">
      <button class="basis-full" on:click={() => {checkValidInput(); goto("/")}}>
        Back
      </button>
    </div>
  </div>
</div>