<script lang="ts">
  import { onMount } from 'svelte';
  import { players, leftTeamIndex, rightTeamIndex, leftTeam, rightTeam } from '$lib/stores/lobby';
  import type { LobbyPlayer } from '$lib/stores/lobby';
  import type { Team } from '$lib/constants/teams';
  import { gamePhase } from '$lib/stores/game';
  import TeamPanel from './TeamPanel.svelte';
  import { CHARACTERS } from '$lib/constants/characters';

  // TEMP: simulate me() from playroomkit
  let myId = '';
  let myPlayer: LobbyPlayer | undefined;
  let leftPlayers: LobbyPlayer[] = [];
  let rightPlayers: LobbyPlayer[] = [];
  let myTeamJoined: boolean = false;

  $: leftPlayers = $players.filter((p: LobbyPlayer) => p.teamIndex === 0);
  $: rightPlayers = $players.filter((p: LobbyPlayer) => p.teamIndex === 1);
  $: myTeamJoined = !!myPlayer && myPlayer.teamIndex !== null;

  $: myPlayer = $players.find((p: LobbyPlayer) => p.id === myId);

  function takenByTeam(charId: string): boolean {
    if (!myPlayer || myPlayer.teamIndex === null) return false;
    return $players.some(p => p.teamIndex === myPlayer.teamIndex && p.characterId === charId);
  }

  onMount(() => {
    myId = Math.random().toString(36).slice(2);
    players.update((arr) => [...arr, { id: myId, name: 'Me', avatar: 'https://i.pravatar.cc/64', teamIndex: null }]);
  });

  function joinTeam(side: 'left' | 'right', slotIdx: number): void {
    const desiredTeamIdx = side === 'left' ? 0 : 1;
    players.update((arr) => {
      const copy = [...arr];
      const me = copy.find((p) => p.id === myId)!;
      // Unassign previous
      me.teamIndex = desiredTeamIdx;
      me.characterId = undefined;
      return copy;
    });
  }

  function startEnabled(playersArr: LobbyPlayer[], _left: Team, _right: Team): boolean {
    const leftHas = playersArr.some((p) => p.teamIndex === 0 && p.characterId);
    const rightHas = playersArr.some((p) => p.teamIndex === 1 && p.characterId);
    return leftHas && rightHas;
  }
</script>

<div class="h-full w-full flex flex-col justify-center items-center text-white select-none">
  <div class="flex flex-row space-x-20">
    <!-- LEFT TEAM -->
    <TeamPanel
      players={leftPlayers}
      team={$leftTeam}
      onArrow={(dir) => {
        leftTeamIndex.update((i) => (dir === 'left' ? (i + 5) % 6 : (i + 1) % 6));
      }}
      onJoin={(slot) => joinTeam('left', slot)}
    />

    <!-- RIGHT TEAM -->
    <TeamPanel
      players={rightPlayers}
      team={$rightTeam}
      onArrow={(dir) => {
        rightTeamIndex.update((i) => (dir === 'left' ? (i + 5) % 6 : (i + 1) % 6));
      }}
      onJoin={(slot) => joinTeam('right', slot)}
    />
  </div>

  <!-- characters list (simple) -->
  <div class="mt-10 grid grid-cols-3 gap-4">
    {#each CHARACTERS as c}
      <div class="flex flex-col items-center"
      class:pointer-events-none={!myTeamJoined}
      class:opacity-30={!myTeamJoined || takenByTeam(c.id)}
      on:click={() => {
        if (!myTeamJoined || takenByTeam(c.id)) return;
        players.update((arr) => {
          const meIdx = arr.findIndex((p) => p.id === myId);
          if (meIdx === -1) return arr;
          const me = arr[meIdx];
          const updated = [...arr];
          updated[meIdx] = { ...me, characterId: c.id };
          return updated;
          
        });
      }}>
        <img src={c.avatar} alt={c.name} class="h-16 w-16 rounded-full" />
        <span class="text-xs mt-1">{c.name}</span>
      </div>
    {/each}
  </div>

  <button
    class="mt-8 px-6 py-3 bg-blue-600 rounded disabled:opacity-30"
    on:click={() => gamePhase.set('playing')}
    disabled={!startEnabled($players, $leftTeam, $rightTeam)}
  >
    Start Game
  </button>
</div>
