
export interface EpigeneticReport {
  id: string;
  reportID: string;
  clientId: string;
  clientName: string;
  type: string;
  date: string;
  score: number;
  status: 'Completed' | 'Processing' | 'Pending';
  coverUrl?: string;
  createdAt?: any;
}

// --- DASHBOARD MVP TYPES ---

export interface ReportSummaryItem {
  id: string;
  reportID: string;
  level: 'high' | 'medium' | 'low';
  category: string; // e.g. 'Vitaminas', 'Microbioma'
  itemName: string; // e.g. 'Vitamina C', 'Virus'
  score: number; // 0-100 placeholder
}

export interface SystemFactor {
  name: string;
  type: 'microbiome' | 'toxins' | 'interference' | 'other';
  priority: 'high' | 'medium' | 'low';
}

export interface BioSystem {
  id: string;
  reportID: string;
  systemName: 'Inmunitario' | 'Intestinal' | 'Cardiovascular' | 'Metabólico';
  score: number;
  statusText: string;
  keyNutrients: { name: string; priority: 'high' | 'medium' | 'low'; rationale: string }[];
  factors: SystemFactor[];
}

export interface FoodToAvoid {
  id: string;
  reportID: string;
  foodName: string;
  reason: string;
  durationDays: number;
}

export interface AdditiveToAvoid {
  id: string;
  reportID: string;
  additiveName: string;
  description: string;
}

export interface RecommendedFood {
  id: string;
  reportID: string;
  category: 'Verduras' | 'Frutas' | 'Proteínas' | 'Grasas' | 'Bebidas' | 'Semillas';
  foodName: string;
  priority: 'high' | 'medium';
  rationale?: string;
}

export interface PdfNote {
  id: string;
  reportID: string;
  title: string;
  body: string;
  systemName?: string;
  createdAt: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  tags: string[];
  matchScore: number; // 0-100 relevance to report
}

export interface EmailLog {
  id: string;
  reportID: string;
  toEmail: string;
  subject: string;
  message: string;
  timestamp: number;
}

// Existing Types...
export interface Biomarker {
  name: string;
  value: string;
  unit: string;
  status: 'Optimizado' | 'Necesidad Baja' | 'Necesidad Media' | 'Necesidad Alta';
  trend: 'up' | 'down' | 'stable';
  history: number[]; 
  category?: 'Vital' | 'Nutrición' | 'Entorno' | 'Maestro';
}

export interface UserAddress {
  street: string;
  district: string;
  province: string;
  department: string;
  country: string;
}

export interface UserProfile {
  name: string; 
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  address?: string; // Legacy simple string
  city?: string; // Legacy
  
  // Extended Profile Data
  birthDate?: string; // ISO Date YYYY-MM-DD
  gender?: 'Masculino' | 'Femenino' | 'Otro';
  weight?: string; // kg
  height?: string; // cm
  fullAddress?: UserAddress;
  
  memberSince: string;
  plan: 'Basic' | 'Pro' | 'Elite';
  role?: 'user' | 'admin';
  isActive?: boolean;
}

export interface Order {
  id?: string;
  amount: number;
  currency: string;
  status: 'Paid' | 'Pending' | 'Failed';
  paymentMethod: string;
  transactionId?: string;
  shippingDetails: {
    address: string;
    city: string;
    district: string;
    phone: string;
    dni: string;
  };
  createdAt: any;
}

export interface EpigeneticTest {
  id?: string;
  kitId: string;
  status: 'ordered' | 'sample_received' | 'analyzing' | 'completed';
  createdAt: any;
}

export type LiveStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

export interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  isAnonymous: boolean;
  photoURL: string | null;
}

// EBE Calculation Result
export interface BioAgeResult {
  chronologicalAge: number;
  estimatedBioAge: number;
  ageDifference: number; // Delta
  biologicalLoad: number; // 0 to 1
  interpretation: string;
  lastUpdated: string;
}

// --- NEW MODULES ---

export interface Meal {
    name: string;
    description: string; // Ingredients list essentially
    portion: string;
    type: 'Desayuno' | 'Almuerzo' | 'Cena';
    isPeruvian: boolean;
    contributions: {
        vitamins: string[];
        minerals: string[];
        fattyAcids: string[];
        aminoAcids: string[];
    };
    biohack: string;
}

export interface DayPlan {
    day: number;
    label: string; // "Lunes", "Día 1", etc.
    meals: {
        breakfast: Meal;
        lunch: Meal;
        dinner: Meal;
    };
}

export interface EmotionalTrait {
    trait: string;
    bioOrigin: string; // e.g., "Deficiencia de Magnesio"
    implication: string; // e.g., "Menor tolerancia al estrés"
    score: number; // 0-10 intensity
}

export interface EmotionalProfileData {
    primaryState: string; // e.g., "Alerta Ansiosa", "Fatiga Cognitiva"
    description: string;
    traits: EmotionalTrait[];
    neurotransmitters: {
        dopamine: 'Bajo' | 'Equilibrado' | 'Alto';
        serotonin: 'Bajo' | 'Equilibrado' | 'Alto';
        gaba: 'Bajo' | 'Equilibrado' | 'Alto';
    };
}
