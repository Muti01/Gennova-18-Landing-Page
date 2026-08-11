import fs from 'fs';

const html = fs.readFileSync('drive_folder.html', 'utf8');
const id = '1Y9FmgW7SIRmIwzHUGI96K0igEDfsL7ks';
const idx = html.indexOf(id);
if (idx !== -1) {
  // search for a file name within 2000 characters before or after
  const slice = html.slice(Math.max(0, idx - 4000), Math.min(html.length, idx + 4000));
  console.log('Search in slice around ID:');
  const pngs = slice.match(/[^"'\s]+?\.png/gi) || [];
  console.log('PNG files nearby:', pngs);
  
  // also print any words or filenames
  console.log('More text around:');
  console.log(html.slice(idx - 1000, idx + 200));
}
