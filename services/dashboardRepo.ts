import { 
    ReportSummaryItem, BioSystem, FoodToAvoid, AdditiveToAvoid, 
    RecommendedFood, PdfNote, Product, EmailLog, UserProfile, BioAgeResult,
    DayPlan, EmotionalProfileData
  } from '../types';
  import { FullAnalysisResult } from './geminiAnalysis';
  import { computeEBFv2, getMockFeatures, EbfResult, mapAnalysisToFeatures, ParsedFeatures } from './ebf';
  
  class MockDatabase {
    userProfile: Partial<UserProfile> = {}; 
    summaryItems: ReportSummaryItem[] = [];
    systems: BioSystem[] = [];
    foodsToAvoid: FoodToAvoid[] = [];
    additivesToAvoid: AdditiveToAvoid[] = [];
    recommendedFoods: RecommendedFood[] = [];
    pdfNotes: PdfNote[] = [];
    products: Product[] = [];
    selectedProducts: Record<string, string[]> = {}; 
    emailLogs: EmailLog[] = [];
    mealPlan: DayPlan[] = [];
    emotionalProfile: EmotionalProfileData | null = null;

    private initialized = false;
  
    constructor() {
      this.seedData();
    }
  
    private seedData() {
      if (this.initialized) return;

      const cachedProfile = localStorage.getItem("gennova:profile");
      if (cachedProfile) {
          try {
              this.userProfile = JSON.parse(cachedProfile);
          } catch (e) {
              console.error(e);
          }
      }
      if (!this.userProfile || Object.keys(this.userProfile).length === 0) {
          this.userProfile = {
              name: "",
              firstName: "",
              lastName: "",
              email: "",
              birthDate: "", 
              gender: "",
              weight: "",
              height: "",
              phone: "",
              fullAddress: { street: "", district: "", province: "", department: "", country: "" }
          };
      }

      this.products = [
          { id: 'p1', name: 'Magnesium L-Threonate', category: 'Neuro-Optimización', description: 'Alta biodisponibilidad para cruzar la barrera hematoencefálica.', price: 145, tags: ['Sueño', 'Foco'], matchScore: 95 },
          { id: 'p2', name: 'Omega 3 Ultra Pure', category: 'Inflamación', description: 'Aceite de pescado destilado molecularmente.', price: 120, tags: ['Corazón', 'Cerebro'], matchScore: 88 },
          { id: 'p3', name: 'Vitamin D3 + K2', category: 'Inmunidad', description: 'Soporte óseo e inmunitario optimizado.', price: 95, tags: ['Huesos', 'Inmune'], matchScore: 92 },
          { id: 'p4', name: 'Probiotic Multi-Strain', category: 'Digestión', description: '15 cepas vivas para restaurar la flora intestinal.', price: 160, tags: ['Gut Health'], matchScore: 85 }
      ];

      this.initialized = true;
    }

    public overwriteData(reportId: string, data: FullAnalysisResult) {
        this.summaryItems = data.summary;
        this.systems = data.systems;
        this.foodsToAvoid = data.foodsToAvoid;
        this.additivesToAvoid = data.additives;
        this.recommendedFoods = data.recommendedFoods;
        this.mealPlan = data.mealPlan;
        this.emotionalProfile = data.emotionalProfile;
    }

    public updateProfileData(data: Partial<UserProfile>) {
        this.userProfile = { ...this.userProfile, ...data };
        this.userProfile.name = `${this.userProfile.firstName || ''} ${this.userProfile.lastName || ''}`.trim();
        localStorage.setItem("gennova:profile", JSON.stringify(this.userProfile));
    }

    public getProfileData() {
        return this.userProfile;
    }
  }
  
  export const db = new MockDatabase();
  
  export const ReportRepo = {
    loadAnalysisResults: async (reportId: string, data: FullAnalysisResult) => {
        db.overwriteData(reportId, data);
        const features = mapAnalysisToFeatures(data);
        await ReportRepo.calculateBioAge(reportId, true, features);
        return true;
    },

    getSummary: async (reportID: string) => db.summaryItems,
    getSystems: async (reportID: string) => db.systems,
    getFoodsToAvoid: async (reportID: string) => db.foodsToAvoid,
    getAdditivesToAvoid: async (reportID: string) => db.additivesToAvoid,
    getRecommendedFoods: async (reportID: string) => db.recommendedFoods,
    
    getPdfNotes: async (reportID: string) => db.pdfNotes.filter(i => i.reportID === reportID).sort((a,b) => b.createdAt - a.createdAt),
    addPdfNote: async (note: Omit<PdfNote, 'id' | 'createdAt'>) => {
        const newNote: PdfNote = { ...note, id: Date.now().toString(), createdAt: Date.now() };
        db.pdfNotes.push(newNote);
        return newNote;
    },
    deletePdfNote: async (id: string) => {
        db.pdfNotes = db.pdfNotes.filter(n => n.id !== id);
    },
  
    getProducts: async (queryStr: string = '') => {
        if (!queryStr) return db.products;
        return db.products.filter(p => p.name?.toLowerCase().includes(queryStr.toLowerCase()));
    },
    getSelectedProductIds: async (reportID: string) => db.selectedProducts[reportID] || [],
    saveSelectedProducts: async (reportID: string, productIds: string[]) => {
        db.selectedProducts[reportID] = productIds;
        return productIds;
    },
  
    logEmail: async (log: Omit<EmailLog, 'id' | 'timestamp'>) => {
        const newLog = { ...log, id: Date.now().toString(), timestamp: Date.now() };
        db.emailLogs.push(newLog);
        return { success: true };
    },

    updateProfile: async (data: Partial<UserProfile>) => {
        db.updateProfileData(data);
        localStorage.removeItem("gennova:ebf:last");
        return db.getProfileData();
    },

    getExtendedProfile: async () => db.getProfileData(),

    calculateBioAge: async (reportID: string, forceRecalculate: boolean = false, injectedFeatures?: ParsedFeatures): Promise<BioAgeResult & { storageStatus?: string }> => {
        const LOCAL_STORAGE_KEY = "gennova:ebf:last";
        
        if (!forceRecalculate && !injectedFeatures) {
            const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (cached) {
                const payload = JSON.parse(cached);
                if (payload.algorithmVersion === "ebf_v2.1" && payload.reportId === reportID) {
                    return { ...payload.result, storageStatus: "Sincronizado ✓" };
                }
            }
        }

        const profile = db.getProfileData();
        let chronologicalAge = 40; 
        
        if (profile.birthDate) {
            const birthDate = new Date(profile.birthDate + 'T00:00:00');
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            chronologicalAge = age;
        }

        const features = injectedFeatures || getMockFeatures();
        const ebf = computeEBFv2(chronologicalAge, features);

        const interpretation = ebf.deltaYears < -2 
            ? "Tu biología muestra un rendimiento celular superior a tu edad cronológica."
            : ebf.deltaYears > 2 
                ? "Carga biológica elevada detectada. Se recomienda iniciar protocolo de optimización."
                : "Tu vitalidad actual es coherente con tu edad cronológica.";

        const result: BioAgeResult = {
            chronologicalAge,
            estimatedBioAge: ebf.ebfYears,
            ageDifference: ebf.deltaYears,
            biologicalLoad: ebf.icb,
            interpretation,
            lastUpdated: new Date().toLocaleDateString()
        };

        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ 
            reportId: reportID, computedAt: new Date().toISOString(), algorithmVersion: "ebf_v2.1", result 
        }));

        return { ...result, storageStatus: "Actualizado desde Reporte ✓" };
    },

    getMealPlan: async () => db.mealPlan,
    getEmotionalProfile: async () => db.emotionalProfile
  };