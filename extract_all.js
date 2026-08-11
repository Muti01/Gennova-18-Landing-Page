import fs from 'fs';

const html = fs.readFileSync('drive_folder.html', 'utf8');

// Let's search for JSON data in script tags
// Google Drive initial state is usually loaded in window._initialDataState or similar
// Let's write a regex that grabs all 33-character IDs starting with '1' and some letters/numbers
const idRegex = /\b1[a-zA-Z0-9_-]{32}\b/g;
const ids = Array.from(new Set(html.match(idRegex) || []));
console.log('Total IDs found:', ids.length);
console.log('IDs found:', ids);

// Let's search for file names like something.png
const nameRegex = /"([^"]+?\.(?:png|jpg|jpeg|webp))"/gi;
const names = [];
let match;
while ((match = nameRegex.exec(html)) !== null) {
  names.push(match[1]);
}
const uniqueNames = Array.from(new Set(names));
console.log('Total unique names:', uniqueNames.length);
console.log('Unique names:', uniqueNames);

// Let's try to correlate them by finding where they appear close to each other in the HTML
console.log('\nCorrelating IDs and Names...');
for (const name of uniqueNames) {
  const index = html.indexOf(name);
  if (index !== -1) {
    const surrounding = html.slice(Math.max(0, index - 300), Math.min(html.length, index + 300));
    // search for any 33-char ID in the surrounding area
    const sIds = surrounding.match(idRegex) || [];
    if (sIds.length > 0) {
      console.log(`Name: "${name}" -> IDs:`, Array.from(new Set(sIds)));
    } else {
      console.log(`Name: "${name}" -> No IDs found in proximity`);
    }
  }
}
