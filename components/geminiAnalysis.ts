
import { GoogleGenAI } from '@google/genai';
import { Biomarker } from '../types';

// Updated to the latest recommended model for text tasks
const MODEL_NAME = 'gemini-3-flash-preview';
const IMAGE_MODEL_NAME = 'gemini-2.5-flash-image';

// Helper to convert File to Base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data url prefix (e.g. "data:application/pdf;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const analyzeEpigeneticReport = async (file: File): Promise<Biomarker[]> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) throw new Error("API Key missing");

    const ai = new GoogleGenAI({ apiKey });
    const base64Data = await fileToBase64(file);

    const prompt = `
      You are Gennova Coach AI, an expert in epigenetic data analysis.
      
      TASK: Analyze the attached PDF report (specifically focusing on PAGE 3 "Resumen del Programa de Optimización").
      This page usually contains a circular chart divided into categories like:
      - Minerales
      - Vitaminas
      - Ácidos Grasos
      - Antioxidantes
      - Microbioma (Gut Health)
      - Frecuencias (EMF/Interference)
      - Retos Ambientales (Toxins)

      LOGIC FOR SCORING:
      - If a category has a LARGE segment in the chart or is marked "Prioridad" (Priority), assign a LOW score (20-50) and status "Necesidad Alta".
      - If a category is "Aconsejable" (Advisable), assign a MEDIUM score (50-75) and status "Necesidad Media".
      - If a category is small or "A Considerar", assign a HIGH score (75-98) and status "Optimizado".
      
      OUTPUT:
      Return a JSON array of 'Biomarker' objects.
      
      GENERATE REALISTIC HISTORY:
      For the 'history' array, generate 4 previous data points that show a trend leading to the current value. 
      - If Critical (Necesidad Alta), show a downward trend.
      - If Optimal (Optimizado), show an upward or stable high trend.
      
      REQUIRED JSON STRUCTURE:
      [
        {
          "name": "Microbioma",
          "value": "45",
          "unit": "Score",
          "status": "Necesidad Alta",
          "trend": "down",
          "history": [60, 55, 50, 45]
        },
        ...
      ]

      Extract at least these 6 key metrics:
      1. Microbioma (Gut Health)
      2. Sistema Inmune (Immune System - infer from antioxidants/nutrients if not explicit)
      3. Carga Tóxica (Environmental Challenges/Metales)
      4. Vitaminas (Overall Status)
      5. Minerales (Overall Status)
      6. Edad Biológica (If found, else estimate based on overall health 0-100)

      Return ONLY the raw JSON. No markdown.
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          { inlineData: { mimeType: file.type, data: base64Data } },
          { text: prompt }
        ]
      }
    });

    const text = response.text || "[]";
    // Clean up markdown if present
    const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const data: Biomarker[] = JSON.parse(jsonStr);
    return data;

  } catch (error) {
    console.error("Error analyzing PDF:", error);
    // Return mock data fallback if AI fails (for demo purposes)
    return [
        {
            name: 'Microbioma',
            value: '42',
            unit: 'Score',
            status: 'Necesidad Alta',
            trend: 'down',
            history: [55, 50, 48, 42]
        },
        {
            name: 'Sistema Inmune',
            value: '68',
            unit: 'Score',
            status: 'Necesidad Media',
            trend: 'stable',
            history: [65, 66, 67, 68]
        },
        {
            name: 'Carga Tóxica',
            value: '85',
            unit: '% Libre',
            status: 'Optimizado',
            trend: 'up',
            history: [75, 78, 82, 85]
        }
    ];
  }
};

export const generateReportCoverImage = async (type: string = 'Wellness'): Promise<string | null> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) throw new Error("API Key missing");

    const ai = new GoogleGenAI({ apiKey });
    
    // Dynamic Prompt based on Type
    let specificContext = "";
    if (type.includes("Wellness")) specificContext = "DNA double helix, immune cells, detox pathways, calm blue-green gradients";
    else if (type.includes("Sport")) specificContext = "dynamic motion blur, muscle fibers, energy mitochondria, neon green and electric blue";
    else if (type.includes("Age")) specificContext = "telomeres, cellular clock, time concepts, violet and gold elegance";
    else specificContext = "biological visualization of cells, high tech medical data, epigenetics";

    const prompt = `Generate an ultra-realistic, cinematic 3D cover art for a "${type}" epigenetic report. 
    Style: WHOOP / Apple Health luxury dark mode. 
    Visuals: ${specificContext}.
    High contrast, glowing neon accents on deep black background. 4k render, photorealistic medical art.`;

    const response = await ai.models.generateContent({
      model: IMAGE_MODEL_NAME,
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: "3:4"
        }
      }
    });

    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (e) {
    console.error("Error generating cover image:", e);
    return null;
  }
};
