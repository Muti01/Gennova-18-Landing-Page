import fs from 'fs';

async function run() {
  try {
    const url = 'https://drive.google.com/drive/folders/1e4-yc5GI6PFKGUVQJF0q-5-PsG67fhuv?usp=sharing';
    console.log('Fetching Google Drive folder...', url);
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
      }
    });
    const html = await res.text();
    fs.writeFileSync('drive_folder.html', html);
    console.log('Saved drive_folder.html. Length:', html.length);

    // Let's search for file IDs and names in the HTML
    // Usually Google Drive has objects like: [[id, name, mimeType, ...]] or JSON.
    // Let's do some regex matching to find file IDs.
    // Google Drive IDs are 33-character strings like 1_xYz...
    // Let's find all occurrences of 33-char patterns or search for standard JSON blocks.
    
    // We can also search for file titles in the HTML, or download-like links.
    const regex = /"([^"]{33,40})",\["([^"]+?\.(?:png|jpg|jpeg|webp))"/gi;
    let match;
    const files = [];
    while ((match = regex.exec(html)) !== null) {
      files.push({ id: match[1], name: match[2] });
    }

    console.log('Regex Match 1:', files);

    // Let's try another regex for initial data state.
    // Inside Google Drive, the file list is often in a JSON-like structure:
    // ["id", "title", "mimeType", ...]
    const regex2 = /\["([^"]{33,40})","([^"]+?)"/gi;
    const files2 = [];
    while ((match = regex2.exec(html)) !== null) {
      const id = match[1];
      const name = match[2];
      if (name.includes('.') && !files2.some(f => f.id === id)) {
        files2.push({ id, name });
      }
    }
    console.log('Regex Match 2:', files2);

    // Let's write another fallback parser that searches for any occurrences of biological names
    const terms = ['inmune', 'cardio', 'gastro', 'cerebral', 'microbiota', 'vitamina', 'mineral', 'amino', 'antiox', 'graso', 'sensib', 'metal', 'pulmo', 'muscu', 'endoc', 'renal'];
    console.log('\nScanning for system keywords in HTML:');
    const lines = html.split('\n');
    for (const line of lines) {
      for (const term of terms) {
        if (line.toLowerCase().includes(term) && line.length < 500) {
          console.log(`Match for ${term}: ${line.trim().slice(0, 200)}`);
        }
      }
    }
  } catch (err) {
    console.error('Error fetching:', err);
  }
}

run();
