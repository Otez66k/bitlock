<script lang="ts">
  import { onMount } from 'svelte';
  import { players, leftTeamIndex, rightTeamIndex, leftTeam, rightTeam } from '$lib/stores/lobby';
  import { gamePhase } from '$lib/stores/game';
  import TeamPanel from './TeamPanel.svelte';
  import { CHARACTERS } from '$lib/constants/characters';
  import type { LobbyPlayer } from '$lib/stores/lobby';

  // TEMP: simulate me() from playroomkit
  let myId = '';
  onMount(() => {
    myId = Math.random().toString(36).slice(2);
    players.update((arr) => [...arr, { id: myId, name: 'Me', avatar: 'https://i.pravatar.cc/64', teamIndex: null }]);
  });

  function joinTeam(side: 'left' | 'right', slotIdx: number) {
    players.update((arr) => {
      const copy = [...arr];
      const me = copy.find((p) => p.id === myId)!;
      // Unassign previous
      me.teamIndex = side === 'left' ? 0 : 1;
      return copy;
    });
  }

  function startEnabled($players, $leftTeam, $rightTeam) {
    const leftHas = $players.some((p) => p.teamIndex === 0 && p.characterId);
    const rightHas = $players.some((p) => p.teamIndex === 1 && p.characterId);
    return leftHas && rightHas;
  }
</script>

<div class="h-full w-full flex flex-col justify-center items-center text-white select-none">
  <div class="flex flex-row space-x-20">
    <!-- LEFT TEAM -->
    <TeamPanel
      {players}
      team={$leftTeam}
      onArrow={(dir) => {
        leftTeamIndex.update((i) => (dir === 'left' ? (i + 5) % 6 : (i + 1) % 6));
      }}
    />

    <!-- RIGHT TEAM -->
    <TeamPanel
      {players}
      team={$rightTeam}
      onArrow={(dir) => {
        rightTeamIndex.update((i) => (dir === 'left' ? (i + 5) % 6 : (i + 1) % 6));
      }}
    />
  </div>

  <!-- characters list (simple) -->
  <div class="mt-10 grid grid-cols-3 gap-4">
    {#each CHARACTERS as c}
      <div class="cursor-pointer flex flex-col items-center" on:click={() => {
        players.update((arr) => {
          const me = arr.find((p) => p.id === myId)!;
          // ensure character not taken by same team
          const already = arr.find((p) => p.teamIndex === me.teamIndex && p.characterId === c.id);
          if (!already) me.characterId = c.id;
          return [...arr];
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
