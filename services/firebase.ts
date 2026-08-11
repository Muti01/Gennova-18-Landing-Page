import { UserProfile, EpigeneticReport, Biomarker, User, Order } from '../types';

/**
 * IMPLEMENTACIÓN MOCK (DESCONECTADA DE FIREBASE)
 * Este archivo simula el comportamiento de Firebase para que la aplicación
 * funcione localmente sin errores de carga de librerías.
 */

// Estado interno simulado
let currentMockUser: User | null = null;
const observers: ((user: User | null) => void)[] = [];

const notify = (user: User | null) => {
    observers.forEach(cb => cb(user));
};

export const auth: any = {
    get currentUser() {
        return currentMockUser;
    }
};

export const db: any = {};

const MOCK_PROFILE: UserProfile = {
    name: "",
    firstName: "",
    lastName: "",
    email: "",
    memberSince: "2024",
    plan: 'Pro',
    role: 'user',
    isActive: true
};

const MOCK_BIOMARKERS: Biomarker[] = [
    { name: 'Edad Biológica', value: '29', unit: 'años', status: 'Optimizado', trend: 'down', history: [32, 31, 30, 29] },
    { name: 'Sistema Inmune', value: '92', unit: 'Score', status: 'Optimizado', trend: 'up', history: [75, 80, 88, 92] },
    { name: 'Carga Tóxica', value: '15', unit: '%', status: 'Optimizado', trend: 'down', history: [25, 22, 18, 15] },
    { name: 'Microbioma', value: '78', unit: 'Score', status: 'Necesidad Media', trend: 'up', history: [60, 65, 70, 78] }
];

export const loginWithGoogle = async (): Promise<User> => {
    await new Promise(r => setTimeout(r, 800)); // Simular latencia
    currentMockUser = {
        uid: 'mock-user-google',
        displayName: "",
        email: "user@gennova.life",
        emailVerified: true,
        isAnonymous: false,
        photoURL: ""
    };
    notify(currentMockUser);
    return currentMockUser;
};

export const loginWithEmail = async (email: string, pass: string): Promise<User> => {
    await new Promise(r => setTimeout(r, 800));
    currentMockUser = {
        uid: 'mock-user-email',
        displayName: "",
        email: email,
        emailVerified: true,
        isAnonymous: false,
        photoURL: null
    };
    notify(currentMockUser);
    return currentMockUser;
};

export const logoutUser = async () => {
    currentMockUser = null;
    notify(null);
};

export const onAuthStateChanged = (authInstance: any, callback: (user: User | null) => void) => {
    observers.push(callback);
    // Ejecutar inmediatamente con el estado actual
    callback(currentMockUser);
    return () => {
        const index = observers.indexOf(callback);
        if (index > -1) observers.splice(index, 1);
    };
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
    return MOCK_PROFILE;
};

export const getUserReports = async (uid: string): Promise<EpigeneticReport[]> => {
    return [
        { 
            id: 'rep-001', 
            reportID: 'WELLGNVESC105', 
            clientId: uid, 
            clientName: '', 
            type: 'Wellness', 
            date: '24/10/2024', 
            score: 88, 
            status: 'Completed' 
        }
    ];
};

export const getUserBiomarkers = async (uid: string): Promise<Biomarker[]> => {
    return MOCK_BIOMARKERS;
};

export const createOrder = async (uid: string, orderData: Order): Promise<string> => {
    console.log("Mock Order Created:", orderData);
    return "mock-order-id-" + Date.now();
};

export const buyKitFlow = async (uid: string, kitId: string, paymentData: any, shippingData: any) => {
    await new Promise(r => setTimeout(r, 1000));
    return { success: true, orderId: "mock-success" };
};

export const saveFutureSelfImage = async (uid: string, imageUrl: string, timeframe: string) => {
    console.log("Saving simulation image to mock db...");
    return true;
};

export const upsertUserProfile = async (user: any, data?: any) => {};
export const saveReport = async (uid: string, report: any, biomarkers: any) => {};
export const generatePdfBiomarkers = (): Biomarker[] => MOCK_BIOMARKERS;