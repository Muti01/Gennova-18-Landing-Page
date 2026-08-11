import fs from 'fs';

const html = fs.readFileSync('drive_folder.html', 'utf8');

// Find all image extension references
console.log('--- PNG files ---');
const pngRegex = /[^"'\s]+?\.(?:png|jpg|jpeg|webp)/gi;
const pngMatches = html.match(pngRegex) || [];
console.log('Total matches:', pngMatches.length);
console.log(Array.from(new Set(pngMatches)).slice(0, 50));

// Find Google Drive items in the folder.
// Google Drive typically loads items in a JSON structure like:
// {"id":"1_xxxxx","title":"xxxxx.png"} or similar, or inside window._initialDataState
// Let's print occurrences of "1" followed by ~32 alphanumeric characters and a file extension or name.
// Google Drive file ID is typically 33 characters (e.g. 1e4-yc5GI6PFKGUVQJF0q-5-PsG67fhuv is 33 chars).
// Let's do a search for file titles or anything related to "Sistema"
console.log('\n--- Occurrences of word "Sistema" or "Inmune" or "Cardio" ---');
const terms = ['sistema', 'inmune', 'cardio', 'gastro', 'cerebral', 'microbiota', 'vitamina', 'mineral', 'amino', 'antiox', 'graso', 'sensib', 'metal', 'pulmo', 'muscu', 'endoc', 'renal'];
for (const term of terms) {
  const regex = new RegExp(`[^"'\s]{0,50}${term}[^"'\s]{0,50}`, 'gi');
  const matches = html.match(regex) || [];
  if (matches.length > 0) {
    console.log(`Term: ${term}, Total: ${matches.length}`);
    console.log(Array.from(new Set(matches)).slice(0, 10));
  }
}
