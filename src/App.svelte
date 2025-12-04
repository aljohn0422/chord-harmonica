<script>
    import ChordFinder from './lib/ChordFinder.svelte';
</script>

<main class="flex flex-col items-center gap-y-4 min-h-screen bg-white py-4">
  <ChordFinder />
</main>

<style>
  :global(body) {
    margin: 0;
    background-color: #ffffff; /* white */
    color: #37352f; /* Notion text color */
    min-height: 100vh;
  }
</style>
