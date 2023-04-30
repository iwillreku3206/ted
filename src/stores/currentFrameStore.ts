import { writable } from "svelte/store";

export const currentFrameStore = writable({x: 0, y: 0});
