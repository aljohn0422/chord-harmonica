/**
 * Generate all permutations of an array
 * @param {Array} arr - The array to permute
 * @returns {Array<Array>} - Array of all permutations
 * 
 * @example
 * permutations([1, 2, 3])
 * // Returns: [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]
 */
export function permutations(arr) {
  if (arr.length <= 1) return [arr];
  
  const result = [];
  
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    const remaining = [...arr.slice(0, i), ...arr.slice(i + 1)];
    const remainingPermutations = permutations(remaining);
    
    for (const perm of remainingPermutations) {
      result.push([current, ...perm]);
    }
  }
  
  return result;
}


const KeyNameMapping = {
    'Db': 'C#',
    'Eb': 'D#',
    'Gb': 'F#',
    'Ab': 'G#',
    'Bb': 'A#',
}
/**
 * Find if any permutation of active keys exists in the chord alignment
 * @param {Set|Array} activeKeys - The active keys to search for
 * @param {Object} chordData - The chord data from chord.json
 * @returns {Array} - Array of matches with row, chord, position info
 */
export function findChordInAlignment(activeKeys, chordData) {
  const keysArray = Array.from(activeKeys);
  const perms = permutations(keysArray);
  const matches = [];
  
  // For each row
  for (const row of chordData.rows) {
    // Build the note alignment by joining all chord notes
    const alignment = row.chords.flatMap(chord => chord.notes.map(note => KeyNameMapping[note] || note));
    
    // For each permutation
    for (const perm of perms) {
      // Search for this permutation in the alignment
      const permString = perm.join(',');
      
      for (let i = 0; i <= alignment.length - perm.length; i++) {
        const slice = alignment.slice(i, i + perm.length);
        const sliceString = slice.join(',');
        
        if (sliceString === permString) {
          // Found a match! Determine which chord(s) it spans
          const chordIndex = Math.floor(i / 4); // Each chord has 4 notes
          const positionInChord = i % 4;
          
          matches.push({
            row: row.row_index,
            chordIndex: chordIndex,
            chord: row.chords[chordIndex],
            positionInChord: positionInChord,
          });
        }
      }
    }
  }
  console.log(matches)
  return matches;
}
