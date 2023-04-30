import { writable } from 'svelte/store';
import Color from '../drawing/color';

export const primaryColorStore = writable(Color.fromRGB(0, 0, 0));
export const secondaryColorStore = writable(Color.fromRGB(255, 255, 255));
