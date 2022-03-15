import { writable } from "svelte/store";
import { Chance } from "chance";
import { browser } from "$app/env";
const chance = new Chance();

interface PlayerData {
  name: String;
  id: String;
}

export interface RoomData {
  roomId: String;
  roomOwner: PlayerData;
  roomPublic: Boolean;
  roomState: "waiting" | "playing" | "finished";
  roomMode: "speaking" | "gesturing" | "writing" | "idle";
  roomPlayers: Array<PlayerData>
}

let defaultPlayer: PlayerData = {
  name: chance.name({ prefix: true }),
  id: chance.guid()
};

let storage: PlayerData = browser
  ? JSON.parse(window.localStorage['repeakUser'] || '{}') || {}
  : {}

const storeSettings = () => {
  if (browser) {
    window.localStorage['repeakUser'] = JSON.stringify(storage);
  }
}

export const name = writable<String>(storage.name ?? defaultPlayer['name']);
export const id = writable<String>(storage.id ?? defaultPlayer['id']);

name.subscribe((val) => {
  storage.name = val;
  storeSettings()
});

id.subscribe((val) => {
  storage.id = val;
  storeSettings()
});
