<script lang="ts">
  import { gamePhase } from '$lib/stores/game';
  import Scene from '$lib/components/Scene.svelte';
  import UI from '$lib/components/UI.svelte';
  import Lobby from '$lib/components/Lobby.svelte';
</script>

<!-- Main container -->
{#if $gamePhase === 'lobby'}
  <Lobby />
{:else}
  <div class="h-screen w-screen overflow-hidden">
    <Scene />
    <UI />
  </div>
{/if}
