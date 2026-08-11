import fs from 'fs';
import path from 'path';
import { GoogleGenAI } from '@google/genai';

// Manually load .env file if exists
if (fs.existsSync('.env')) {
  const envContent = fs.readFileSync('.env', 'utf8');
  for (const line of envContent.split('\n')) {
    const parts = line.split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const value = parts.slice(1).join('=').trim();
      process.env[key] = value;
    }
  }
}

const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('Error: Neither API_KEY nor GEMINI_API_KEY is defined in environment variables.');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

const files = [
  { id: '1ghIzE2ixToe_CRzvkN0Qwl4jS1RmD08K', name: 'Image_9_11_AM_1.png' },
  { id: '1_rDe15__9j0yz6Ptpyo7PItzqM32bdY-', name: 'Image_9_11_AM.png' },
  { id: '1uMPtRCjPwJt0P8t1B3WNlylbcnSXJe0G', name: 'Image_9_12_AM_1.png' },
  { id: '1amYqDt3lxpIYIfrsQafAw8bPijVHG4na', name: 'Image_9_12_AM.png' },
  { id: '1Y9FmgW7SIRmIwzHUGI96K0igEDfsL7ks', name: 'Image_9_12_AM_dup.png' },
  { id: '1vskadXl8Nf983LTW4sfuD0nrQyeFmyzS', name: 'Image_9_13_AM_1.png' },
  { id: '1D2T54iLyaUfZq5QhaY_DQcKLw-kR9kRJ', name: 'Image_9_13_AM_2.png' },
  { id: '1pN88Git57AkPcirpXbzkKQzY_uQKkQM2', name: 'Image_9_13_AM.png' },
  { id: '1JF3GFIMII8DOW8XX7iJh2Gzy4yvHPcvz', name: 'Image_9_14_AM.png' }
];

const downloadDir = './downloaded_images';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function classifyImage(filePath) {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const base64Data = fileBuffer.toString('base64');
    
    const prompt = `
Analyze this image from a functional epigenetics laboratory and classify which of the following 12 biological systems/components it represents.
Systems:
1. "immune" (Sistema Inmune) - often a silhouette with a shield, protective light/glow or immune cells
2. "cardiovascular" (Sistema Cardiovascular) - often a heart, blood vessels, red blood cells or circulatory system
3. "gastrointestinal" (Sistema Gastrointestinal) - human digestive tract, stomach, intestines
4. "cerebral" (Sistema Cerebral) - brain, neurons, synaptic connections or head profile with brain highlighted
5. "microbiome" (Microbiota & Microbioma) - bacteria, colonies, gut flora microscopic view or cartoon gut bacteria
6. "vitamins" (Vitaminas) - molecular structures, colorful pills, fruits, vitamin symbols (A, B, C, D)
7. "minerals" (Minerales) - crystal lattices, elements (Mg, Zn, Ca), stones, mineral structures
8. "aminoacids" (Aminoácidos) - peptide bonds, helical proteins, molecular representations of protein building blocks
9. "antioxidants" (Antioxidantes) - protection shield against circles, oxidative species, glowing protective layers, cell defense
10. "fattyacids" (Ácidos Grasos) - oil droplets, lipid bilayer, lipid structures (Omega 3/6 chains)
11. "allergies" (Sensibilidades Alimentarias / Alergias) - allergen elements, warning signs on food (wheat, dairy), glowing warning areas on body, histamines
12. "heavymetals" (Metales Pesados) - heavy metal elements (Pb, Hg, Cd, Al), toxic barrels, skull, dense metallic crystalline structures, or gray toxic accumulation indicators

Return ONLY a JSON object in this format:
{
  "system_key": "one of the keys listed above (immune, cardiovascular, gastrointestinal, cerebral, microbiome, vitamins, minerals, aminoacids, antioxidants, fattyacids, allergies, heavymetals)",
  "confidence": 0.0 to 1.0,
  "description": "Short explanation of why it fits this system based on visual elements"
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash', // Use standard compliant gemini-3.6-flash
      contents: [
        {
          inlineData: {
            mimeType: 'image/png',
            data: base64Data
          }
        },
        prompt
      ],
      config: {
        responseMimeType: 'application/json'
      }
    });

    return JSON.parse(response.text);
  } catch (err) {
    console.error(`Error classifying ${filePath}:`, err);
    return null;
  }
}

async function main() {
  const mappings = [];
  
  // Load existing if any
  if (fs.existsSync('classified_mappings.json')) {
    try {
      const data = JSON.parse(fs.readFileSync('classified_mappings.json', 'utf8'));
      if (Array.isArray(data)) {
        mappings.push(...data);
      }
    } catch (e) {}
  }

  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const destPath = path.join(downloadDir, f.name);
    
    // Check if already classified
    if (mappings.some(m => m.id === f.id)) {
      console.log(`Already classified: ${f.name}`);
      continue;
    }

    console.log(`\nProcessing ${i+1}/${files.length}: ${f.name}`);
    const classification = await classifyImage(destPath);
    if (classification) {
      console.log(`Result:`, classification);
      mappings.push({
        id: f.id,
        name: f.name,
        system_key: classification.system_key,
        description: classification.description,
        confidence: classification.confidence
      });
      // Save progressively
      fs.writeFileSync('classified_mappings.json', JSON.stringify(mappings, null, 2));
    }
    
    if (i < files.length - 1) {
      console.log('Sleeping 15 seconds to avoid free tier rate limit...');
      await delay(15000);
    }
  }

  console.log('\nAll done! Final mappings:', mappings);
}

main();
