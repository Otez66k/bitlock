<script lang="ts">
  import { TEAMS, type Team } from '$lib/constants/teams';
  import type { LobbyPlayer } from '$lib/stores/lobby';
  export let team: Team;
  export let players: LobbyPlayer[]; // filtered list for this team (max 4)
  export let onArrow: (dir: 'left' | 'right') => void;
export let onJoin: (slotIdx: number) => void;
</script>

<div class="flex flex-col items-center w-56">
  <!-- team header with arrows -->
  <div class="flex items-center mb-2 space-x-2">
    <button class="text-white/60 hover:text-white" on:click={() => onArrow('left')}>&lt;</button>
    <img src={team.flag} alt={team.name} class="h-6"/>
    <button class="text-white/60 hover:text-white" on:click={() => onArrow('right')}>&gt;</button>
  </div>
  <h3 class="text-white font-bold text-sm text-center mb-3">{team.name}</h3>

  <!-- 4 player slots -->
  <div class="flex flex-row gap-2">
    {#each Array(4) as _, idx}
      {#if players[idx]}
        <div class="relative h-16 w-16 rounded bg-gray-800/40 flex items-center justify-center overflow-hidden">
          <img src={players[idx].avatar} alt={players[idx].name} class="absolute inset-0 object-cover" />
          <img src={team.flag} alt="flag" class="absolute bottom-0 left-0 h-5 w-5 object-cover" />
        </div>
      {:else}
        <div class="h-16 w-16 rounded bg-gray-700/30 flex items-center justify-center text-white/40 text-xs cursor-pointer hover:bg-gray-600/40" on:click={() => onJoin(idx)}>Open</div>
      {/if}
    {/each}
  </div>
</div>
