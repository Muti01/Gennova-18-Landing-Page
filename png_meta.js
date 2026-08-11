import fs from 'fs';
import path from 'path';

const dir = './downloaded_images';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));

for (const file of files) {
  const filePath = path.join(dir, file);
  const buffer = fs.readFileSync(filePath);
  
  console.log(`\n--- File: ${file} (Size: ${buffer.length} bytes) ---`);
  
  // Parse IHDR chunk
  // PNG signature is 8 bytes
  if (buffer.readUInt32BE(0) !== 0x89504E47) {
    console.log('Not a valid PNG');
    continue;
  }
  
  // First chunk is IHDR
  const ihdrLength = buffer.readUInt32BE(8);
  const ihdrType = buffer.toString('ascii', 12, 16);
  if (ihdrType === 'IHDR') {
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    console.log(`Dimensions: ${width}x${height}`);
  }

  // Scan buffer for ASCII strings that might represent metadata or labels (e.g. system names, Photoshop, etc.)
  // We can look for printable ASCII strings of length > 4
  let asciiStr = '';
  const foundTexts = [];
  for (let i = 0; i < buffer.length; i++) {
    const char = buffer[i];
    if (char >= 32 && char <= 126) {
      asciiStr += String.fromCharCode(char);
    } else {
      if (asciiStr.length > 5) {
        // filter out noise
        if (asciiStr.includes('tEXt') || asciiStr.includes('iTXt') || asciiStr.includes('XML') || asciiStr.toLowerCase().includes('adobe') || asciiStr.toLowerCase().includes('canvas') || asciiStr.toLowerCase().includes('gennova')) {
          foundTexts.push(asciiStr);
        }
      }
      asciiStr = '';
    }
  }
  
  if (foundTexts.length > 0) {
    console.log('Metadata strings:');
    console.log(Array.from(new Set(foundTexts)).slice(0, 10));
  } else {
    console.log('No specific text metadata chunks found');
  }
}
