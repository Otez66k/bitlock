import { writable, derived } from 'svelte/store';
import type { Character } from '$lib/constants/characters';
import { TEAMS } from '$lib/constants/teams';

export interface LobbyPlayer {
  id: string; // playroom / discord id
  name: string;
  avatar: string; // avatar url
  teamIndex: 0 | 1 | null; // 0 = left, 1 = right
  characterId?: Character['id'];
}

export const players = writable<LobbyPlayer[]>([]);

export const leftTeamIndex = writable(0);
export const rightTeamIndex = writable(1);

export const leftTeam = derived(leftTeamIndex, ($i) => TEAMS[$i]);
export const rightTeam = derived(rightTeamIndex, ($i) => TEAMS[$i]);

// computed helpers
afterJoinCleanup();

function afterJoinCleanup() {
  // ensure players are removed if duplicate etc – placeholder
}
