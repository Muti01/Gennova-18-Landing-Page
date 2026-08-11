import { GoogleGenAI } from '@google/genai';
import { ReportSummaryItem, BioSystem, FoodToAvoid, AdditiveToAvoid, RecommendedFood, DayPlan, EmotionalProfileData, UserProfile } from '../types';

const MODEL_NAME = 'gemini-3-flash-preview'; 

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.includes(',') ? result.split(',')[1] : result;
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export interface FullAnalysisResult {
  summary: ReportSummaryItem[];
  systems: BioSystem[];
  foodsToAvoid: FoodToAvoid[];
  additives: AdditiveToAvoid[];
  recommendedFoods: RecommendedFood[];
  mealPlan: DayPlan[];
  emotionalProfile: EmotionalProfileData;
}

export const analyzeFullReport = async (file: File, reportId: string, profile: UserProfile): Promise<FullAnalysisResult> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) throw new Error("API Key missing");

    const ai = new GoogleGenAI({ apiKey });
    const base64Data = await fileToBase64(file);

    const age = profile.birthDate ? (new Date().getFullYear() - new Date(profile.birthDate).getFullYear()) : 40;

    const prompt = `
      Eres GENN COACH AI. Actúas como Nutriólogo Funcional y Experto en Epigenética.
      Analiza el reporte adjunto para un cliente de ${profile.gender}, ${profile.weight}kg, ${profile.height}cm, ${age} años.

      *** REQUERIMIENTO DE ESTRUCTURA JSON (OBLIGATORIO) ***
      Debes extraer y generar datos para CADA UNO de estos campos siguiendo este esquema exacto:

      1. "summary": Lista completa de { "category": string, "itemName": string, "level": "high"|"medium"|"low", "score": number }. 
         IMPORTANTE PARA EBF: Usa estas categorías exactas cuando sea posible: "Vitaminas", "Minerales", "Ácidos Grasos", "Antioxidantes", "Aminoácidos", "Exposición Tóxica", "Interferencias", "Microbioma".
         DEBES EXTRAER:
         - Resumen General (Pág 3).
         - Detalle de Vitaminas (Pág 4): Incluye cada vitamina mencionada.
         - Detalle de Minerales (Pág 5): Incluye cada mineral mencionado.
         - Detalle de Ácidos Grasos (Pág 6): Incluye Omega 3, 6, 9, etc.
         - Detalle de Antioxidantes (Pág 7): Incluye cada antioxidante.
      
      2. "systems": Lista de 4 sistemas { "systemName": "Inmunitario"|"Intestinal"|"Cardiovascular"|"Metabólico"|"Energía"|"Inflamación"|"Detoxificación", "score": number, "statusText": string, "keyNutrients": [{ "name": string, "priority": "high"|"medium", "rationale": string }], "factors": [{ "name": string, "type": "toxins"|"microbiome"|"interference", "priority": "high" }] }.
      3. "foodsToAvoid": Alimentos PROHIBIDOS (Pág 18) { "foodName": string, "reason": string, "durationDays": 90 }.
      4. "additives": Aditivos a evitar { "additiveName": string, "description": string }.
      5. "recommendedFoods": Despensa Epigenética (Págs 20-22) { "category": "Verduras"|"Proteínas"|"Grasas"|"Frutas", "foodName": string, "priority": "high" }.
      6. "mealPlan": Plan de 7 días basado en GASTRONOMÍA PERUANA. Cada día es { "day": number, "label": string, "meals": { "breakfast": Meal, "lunch": Meal, "dinner": Meal } }. 
         Cada "Meal" debe tener: { "name": string, "description": string, "portion": string, "type": string, "isPeruvian": true, "contributions": { "vitamins": string[], "minerals": string[], "fattyAcids": string[], "aminoAcids": string[] }, "biohack": string }.
      7. "emotionalProfile": { "primaryState": string, "description": string, "traits": [{ "trait": string, "bioOrigin": string, "implication": string, "score": number }], "neurotransmitters": { "dopamine": "Bajo"|"Equilibrado"|"Alto", "serotonin": "Bajo"|"Equilibrado", "gaba": "Bajo"|"Equilibrado" } }.

      *** IMPORTANTE ***: 
      - Las porciones deben ser calculadas para el peso de ${profile.weight}kg.
      - Retorna SOLO el objeto JSON puro. No uses markdown.
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          { inlineData: { mimeType: file.type, data: base64Data } },
          { text: prompt }
        ]
      },
      config: { responseMimeType: 'application/json' }
    });

    const text = response.text || "{}";
    let rawData = JSON.parse(text);

    const processedData: FullAnalysisResult = {
        summary: (rawData.summary || []).map((i: any, idx: number) => ({ ...i, id: `sum-${idx}`, reportID: reportId })),
        systems: (rawData.systems || []).map((i: any, idx: number) => ({ ...i, id: `sys-${idx}`, reportID: reportId })),
        foodsToAvoid: (rawData.foodsToAvoid || []).map((i: any, idx: number) => ({ ...i, id: `food-${idx}`, reportID: reportId })),
        additives: (rawData.additives || []).map((i: any, idx: number) => ({ ...i, id: `add-${idx}`, reportID: reportId })),
        recommendedFoods: (rawData.recommendedFoods || []).map((i: any, idx: number) => ({ ...i, id: `rec-${idx}`, reportID: reportId })),
        mealPlan: rawData.mealPlan || [],
        emotionalProfile: rawData.emotionalProfile || { 
            primaryState: "En análisis", description: "Procesando...", traits: [], neurotransmitters: { dopamine: 'Equilibrado', serotonin: 'Equilibrado', gaba: 'Equilibrado' } 
        }
    };

    return processedData;
  } catch (error) {
    console.error("AI Analysis Error:", error);
    throw new Error("Genn Coach no pudo procesar el PDF correctamente. Revisa el formato.");
  }
};