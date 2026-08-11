import fs from 'fs';
import path from 'path';

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
        walkDir(filePath);
      }
    } else {
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('AIza')) {
        console.log(`Found "AIza" in: ${filePath}`);
        // print line with AIza
        const lines = content.split('\n');
        for (const line of lines) {
          if (line.includes('AIza')) {
            console.log('Line:', line.trim().slice(0, 100));
          }
        }
      }
    }
  }
}

walkDir('.');
