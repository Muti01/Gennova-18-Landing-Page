import fs from 'fs';

const html = fs.readFileSync('drive_folder.html', 'utf8');
const id = '1Y9FmgW7SIRmIwzHUGI96K0igEDfsL7ks';
const idx = html.indexOf(id);
if (idx !== -1) {
  console.log('Found ID:', id);
  console.log(html.slice(Math.max(0, idx - 400), Math.min(html.length, idx + 400)));
} else {
  console.log('ID not found');
}
