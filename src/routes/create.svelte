<script lang="ts">
  import { name, id } from "$lib/playerData";
  import { io } from "socket.io-client"
  import Chance from "chance";
  import {goto} from "$app/navigation";

  const chance = new Chance();
  const roomId = chance.guid();

  const socket = io("http://localhost:5000")

  socket.emit("join", { roomId, name: $name, id: $id });

  goto(`/room/${roomId}`);
</script>