import fs from 'fs';

const html = fs.readFileSync('drive_folder.html', 'utf8');

// Parse rows
const trRegex = /<tr[^>]*?data-id="([^"]+?)"[^>]*?>([\s\S]+?)<\/tr>/gi;
let match;
const results = [];
while ((match = trRegex.exec(html)) !== null) {
  const id = match[1];
  const trContent = match[2];
  
  // Search for the file name in trContent.
  // The name is typically inside an aria-label, title, or text containing .png
  const nameMatch = trContent.match(/aria-label="([^"]+?)"/i) || 
                    trContent.match(/title="([^"]+?)"/i) ||
                    trContent.match(/[^"'\s>]+?\.png/gi);
                    
  let name = nameMatch ? nameMatch[1] || nameMatch[0] : 'Unknown';
  if (name.includes('More actions')) {
    // try to find any .png inside the row
    const pngMatch = trContent.match(/[^"'\s>]+?\.png/gi);
    if (pngMatch) {
      name = pngMatch[0];
    }
  }
  
  results.push({ id, name });
}

console.log('Parsed Rows from Table:', results);
