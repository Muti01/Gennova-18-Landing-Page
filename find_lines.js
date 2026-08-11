import fs from 'fs';

const html = fs.readFileSync('drive_folder.html', 'utf8');
const lines = html.split('\n');

const terms = ['(1).png', 'AM.png', '(2).png'];
for (const term of terms) {
  console.log(`--- Lines containing: ${term} ---`);
  let count = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(term)) {
      console.log(`Line ${i}:`, lines[i].slice(0, 1000));
      count++;
      if (count > 5) break;
    }
  }
}
