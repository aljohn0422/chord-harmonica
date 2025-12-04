<script>
  import * as Chord from '@tonaljs/chord';
  import Keyboard from './Keyboard.svelte';
  import AlignmentMatch from './AlignmentMatch.svelte';
  import { findChordInAlignment } from './utils.js';
  import chordData from './chord.json';

  let activeKeys = $state(new Set(['C', 'E', 'G', 'B']));
  const MIN_ACTIVE = 2;
  const MAX_ACTIVE = 4;

  function toggleKey(note) {
    const newKeys = new Set(activeKeys);
    if (newKeys.has(note)) {
      newKeys.delete(note);
    } else {
      if (newKeys.size >= MAX_ACTIVE) {
        const firstKey = newKeys.values().next().value;
        newKeys.delete(firstKey);
      }
      newKeys.add(note);
    }
    activeKeys = newKeys;
  }

  function resetKeys() {
    activeKeys = new Set();
  }

  let detectedChordNames = $derived(Chord.detect(Array.from(activeKeys)));
  let chordDetails = $derived(detectedChordNames.map(name => Chord.get(name)));
  let alignmentMatches = $derived(
    activeKeys.size >= MIN_ACTIVE ? findChordInAlignment(activeKeys, chordData) : []
  );
</script>

<h1 class="text-2xl font-bold text-center">Chord Finder</h1>
<div class="flex flex-col items-end">
  <Keyboard {activeKeys} onToggle={toggleKey} />
  
  {#if activeKeys.size > 0}
    <button 
      onclick={resetKeys}
      class="px-1 py-1 text-sm text-violet-500 font-medium rounded"
    >
      Reset
    </button>
  {/if}
</div>

<div class="text-center">
  {#if chordDetails.length > 0}
    <div class="flex flex-col gap-1">
      {#each chordDetails as chord}
      <div class="flex items-center gap-2 music">
        <p class="text-violet-600 font-bold text-xl">{chord.symbol}</p>
        <p class="text-gray-600">{chord.notes.join(', ')}</p>
      </div>
      {/each}
    </div>
  {/if}
</div>

{#if alignmentMatches.length > 0}
  <div class="text-center">
    <div class="flex flex-col gap-3 items-center">
      {#each alignmentMatches as match}
        <AlignmentMatch {activeKeys} {match} />
      {/each}
    </div>
  </div>
{/if}
