<script>
  import chordData from './chord.json';
  
  let { activeKeys, match } = $props();


</script>

<div class="inline-flex bg-white rounded-lg shadow overflow-hidden border border-gray-200 select-none">
  <!-- First Chord -->
  <div class="flex flex-col">
    <div class="py-1.5 text-center text-sm font-bold text-violet-600 bg-gray-50 border-b border-gray-200 music">
      {match.chord.name}
    </div>
    <div class="flex">
      {#each match.chord.notes as note, index}
        <div class="w-8 h-10 flex items-center justify-center text-xs border-r border-gray-200 last:border-r-0
          {index >= match.positionInChord && index < match.positionInChord + activeKeys.size ? 'bg-violet-200 font-bold shadow-inner' : 'text-gray-500'}">
          {note}
        </div>
      {/each}
    </div>
  </div>

  <!-- Second Chord (if spanning) -->
  {#if match.positionInChord > 0 && match.positionInChord + activeKeys.size > 4}
    <div class="flex flex-col border-l border-gray-200">
      <div class="py-1.5 text-center text-sm font-bold text-violet-600 bg-gray-50 border-b border-gray-200 music">
        {chordData.rows[match.row].chords[match.chordIndex + 1].name}
      </div>
      <div class="flex">
        {#each chordData.rows[match.row].chords[match.chordIndex + 1].notes as note, index}
          <div class="w-8 h-10 flex items-center justify-center text-xs border-r border-gray-200 last:border-r-0
            {index < match.positionInChord + activeKeys.size - 4 ? 'bg-violet-200 font-bold shadow-inner' : 'text-gray-500'}">
            {note}
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>
