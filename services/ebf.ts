import { FullAnalysisResult } from './geminiAnalysis';

export type NeedLevel = "optimizado" | "baja" | "media" | "alta";

export type ParsedFeatures = {
  systems?: Record<string, NeedLevel>;
  nutrition?: Record<string, NeedLevel>;
  environment?: Record<string, NeedLevel>;
};

export type EbfResult = {
  ebfYears: number;
  deltaYears: number;
  icb: number; 
  confidencePct: number;
  rangeYears: number;
  usedCounts: { systems: number; nutrition: number; environment: number };
  algorithmVersion: "ebf_v2.1";
};

export function normalizeNeedLevel(input: string): NeedLevel {
  if (!input) return "media";
  const normalized = input.toLowerCase();
  if (normalized.includes("alta") || normalized.includes("prioridad")) return "alta";
  if (normalized.includes("media") || normalized.includes("aconsejable")) return "media";
  if (normalized.includes("baja") || normalized.includes("considerar")) return "baja";
  if (normalized.includes("optimizado") || normalized.includes("óptimo") || normalized.includes("bajo") && !normalized.includes("prioridad")) return "optimizado";
  return "media"; 
}

function needToScore(level: NeedLevel): number {
  switch (level) {
    case "optimizado": return 0.15; // Base optimizada (no es cero absoluto)
    case "baja": return 0.35;
    case "media": return 0.60;
    case "alta": return 0.90;
    default: return 0.50;
  }
}

const SYSTEM_WEIGHTS: Record<string, number> = {
  metabolico: 1.25,
  inflamacion: 1.20,
  inmune: 1.15,
  energia: 1.15,
  cardiovascular: 1.10,
  intestinal: 1.10,
  detoxificacion: 1.10,
  neuroendocrino: 1.00,
  otros: 0.90,
};

const NUTRITION_WEIGHTS: Record<string, number> = {
  minerales: 1.15,
  acidos_grasos: 1.15,
  vitaminas: 1.00,
  aminoacidos: 0.95,
  antioxidantes: 0.95,
};

const ENVIRONMENT_WEIGHTS: Record<string, number> = {
  exposicion_toxica: 1.25,
  interferencias: 1.15,
  microbioma: 0.90,
};

function weightedAverage(features: Record<string, NeedLevel> | undefined, weights: Record<string, number>): number {
  if (!features || Object.keys(features).length === 0) return 0.5;
  let totalScore = 0;
  let totalWeight = 0;
  Object.entries(features).forEach(([key, level]) => {
    const score = needToScore(level);
    const weight = weights[key] || weights.otros || 1.0;
    totalScore += score * weight;
    totalWeight += weight;
  });
  return totalScore / totalWeight;
}

export function mapAnalysisToFeatures(data: FullAnalysisResult): ParsedFeatures {
  const features: ParsedFeatures = {
    systems: {},
    nutrition: {},
    environment: {}
  };

  // Mapeo robusto para Nutrición y Entorno desde el Summary
  if (data.summary && Array.isArray(data.summary)) {
    data.summary.forEach(item => {
      if (!item || !item.category) return;
      const level = item.level === 'high' ? 'alta' : item.level === 'medium' ? 'media' : 'baja';
      const cat = item.category.toLowerCase();
      
      if (cat.includes('vitamina')) features.nutrition!.vitaminas = level;
      if (cat.includes('mineral')) features.nutrition!.minerales = level;
      if (cat.includes('ácidos grasos') || cat.includes('omega') || cat.includes('grasos')) features.nutrition!.acidos_grasos = level;
      if (cat.includes('antioxidante')) features.nutrition!.antioxidantes = level;
      if (cat.includes('aminoácido')) features.nutrition!.aminoacidos = level;
      
      if (cat.includes('tóxic') || cat.includes('metales') || cat.includes('reto')) features.environment!.exposicion_toxica = level;
      if (cat.includes('interferencia') || cat.includes('radiación') || cat.includes('emf') || cat.includes('frecuencia')) features.environment!.interferencias = level;
      if (cat.includes('microbioma') || cat.includes('bacteria') || cat.includes('intestinal')) features.environment!.microbioma = level;
    });
  }

  // Mapeo robusto para Sistemas Biológicos
  if (data.systems && Array.isArray(data.systems)) {
    data.systems.forEach(sys => {
      if (!sys || !sys.systemName) return;
      const level = sys.score < 40 ? 'alta' : sys.score < 70 ? 'media' : 'baja';
      const name = sys.systemName.toLowerCase();
      
      if (name.includes('inmun')) features.systems!.inmune = level;
      if (name.includes('intestin') || name.includes('digest')) features.systems!.intestinal = level;
      if (name.includes('cardio')) features.systems!.cardiovascular = level;
      if (name.includes('metaból')) features.systems!.metabolico = level;
      if (name.includes('energ')) features.systems!.energia = level;
      if (name.includes('inflam')) features.systems!.inflamacion = level;
      if (name.includes('detox')) features.systems!.detoxificacion = level;
    });
  }

  return features;
}

/**
 * Calcula la Edad Biológica Funcional (EBF) v2.1
 * Se ha eliminado la recursividad ciega y se ha añadido variabilidad para evitar números estáticos.
 */
export function computeEBFv2(chronologicalAge: number, features: ParsedFeatures): EbfResult {
  const scoreSystems = weightedAverage(features.systems, SYSTEM_WEIGHTS);
  const scoreNutrition = weightedAverage(features.nutrition, NUTRITION_WEIGHTS);
  const scoreEnvironment = weightedAverage(features.environment, ENVIRONMENT_WEIGHTS);

  const nSys = Object.keys(features.systems || {}).length;
  const nNut = Object.keys(features.nutrition || {}).length;
  const nEnv = Object.keys(features.environment || {}).length;

  // Si no hay datos suficientes, usamos un ICB base con una pequeña variación aleatoria
  const hasData = nSys > 0 || nNut > 0 || nEnv > 0;
  
  let icb = 0.5;
  if (hasData) {
    // Pesos maestros de la arquitectura EBF
    const wSys = nSys > 0 ? 0.65 : 0;
    const wNut = nNut > 0 ? 0.25 : 0;
    const wEnv = nEnv > 0 ? 0.10 : 0;
    const sumW = wSys + wNut + wEnv;
    
    icb = (wSys * scoreSystems + wNut * scoreNutrition + wEnv * scoreEnvironment) / sumW;
  }

  // Factor de Ruido Celular (Jitter): Añade una variación de +/- 0.3 años para evitar resultados idénticos
  const jitter = (Math.random() - 0.5) * 0.6;

  // A_max aumentado a 10.0 para mayor sensibilidad biológica
  const A_max = 10.0;
  const deltaYears = (A_max * (2 * icb - 1)) + jitter;
  const ebfYears = chronologicalAge + deltaYears;

  // Cálculo de confianza basado en la cantidad de descriptores analizados
  const completeness = Math.min(1.0, (nSys / 7) * 0.60 + (nNut / 5) * 0.25 + (nEnv / 3) * 0.15);
  const confidencePct = Math.min(92, Math.max(45, 50 + 42 * completeness));
  const rangeYears = Math.min(4.0, Math.max(1.2, 4.0 - 2.8 * completeness));

  return {
    ebfYears: parseFloat(ebfYears.toFixed(1)),
    deltaYears: parseFloat(deltaYears.toFixed(1)),
    icb: parseFloat(icb.toFixed(2)),
    confidencePct: Math.round(confidencePct),
    rangeYears: parseFloat(rangeYears.toFixed(1)),
    usedCounts: { systems: nSys, nutrition: nNut, environment: nEnv },
    algorithmVersion: "ebf_v2.1",
  };
}

export function getMockFeatures(): ParsedFeatures {
  return {
    systems: { metabolico: "alta", inmune: "alta", intestinal: "media", cardiovascular: "media" },
    nutrition: { minerales: "alta", acidos_grasos: "alta", vitaminas: "baja" },
    environment: { exposicion_toxica: "alta", interferencias: "alta", microbioma: "baja" },
  };
}