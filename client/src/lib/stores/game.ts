import { writable } from 'svelte/store';

export type Phase = 'lobby' | 'playing';

export const gamePhase = writable<Phase>('lobby');
