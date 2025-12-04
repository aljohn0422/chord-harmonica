<script>
  const notes = [
    { name: 'C', type: 'white' },
    { name: 'C#', type: 'black', left: '2.2rem' },
    { name: 'D', type: 'white' },
    { name: 'D#', type: 'black', left: '5.6rem' },
    { name: 'E', type: 'white' },
    { name: 'F', type: 'white' },
    { name: 'F#', type: 'black', left: '11.1rem' },
    { name: 'G', type: 'white' },
    { name: 'G#', type: 'black', left: '14.3rem' },
    { name: 'A', type: 'white' },
    { name: 'A#', type: 'black', left: '17.7rem' },
    { name: 'B', type: 'white' },
  ];

  let { activeKeys = new Set(), onToggle = () => {} } = $props();
</script>

<div class="relative flex select-none bg-gray-100 p-2 rounded-xl shadow border border-gray-200 w-fit mx-auto">
  {#each notes.filter(n => n.type === 'white') as note}
    <button
      class="
        relative w-12 h-36 border border-gray-300 bg-white rounded-b-lg shadow-sm
        {activeKeys.has(note.name) ? '!bg-violet-200 !border-violet-300' : ''}
      "
      onclick={() => onToggle(note.name)}
    >
      <span class="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-500 font-bold">{note.name}</span>
    </button>
  {/each}

  {#each notes.filter(n => n.type === 'black') as note}
    <button
      class="absolute top-2 w-9 h-22 border border-gray-800 bg-gray-900 rounded-b-lg z-10 shadow-md
             {activeKeys.has(note.name) ? '!bg-violet-200 !border-violet-300' : ''}"
      style="left: {note.left}"
      onclick={() => onToggle(note.name)}
    ></button>
  {/each}
</div>
