
import React, { useState, useEffect, useRef } from 'react';
import { User } from './types';
import { 
  auth,
  onAuthStateChanged, 
  logoutUser, 
  getUserProfile, 
  getUserReports, 
  getUserBiomarkers 
} from './services/firebase';
import { UserProfile, EpigeneticReport, Biomarker } from './types';
import Dashboard from './components/Dashboard';
import GennovaCoach from './components/GennovaCoach';
import ReportImage from './components/ReportImage';
import CheckoutFlow from './components/CheckoutFlow';
import KitModal from './components/KitModal';
import LoginModal from './components/LoginModal';
import OnboardingTour from './components/OnboardingTour';
import AboutModal from './components/AboutModal';
import HowItWorksModal from './components/HowItWorksModal';
import NutritionLab from './components/NutritionLab';
import AnimatedGLogo from './components/AnimatedGLogo';
import Testimonials from './components/Testimonials';
import GetStartedButton from './components/GetStartedButton';
import BiotechAuthority from './components/BiotechAuthority';
import EpigeneticsModal from './components/EpigeneticsModal';
import ScienceModal, { ScienceData } from './components/ScienceModal';
import PlanDetailModal from './components/PlanDetailModal';
import HeroSlideshow from './components/HeroSlideshow';
import FooterContentModal from './components/FooterContentModal';
import BioAgeSection from './components/BioAgeSection';
import GennovaLabsModal from './components/GennovaLabsModal';
import QuizModal from './components/QuizModal'; 
import BioQuizSlideIn from './components/BioQuizSlideIn';
import RespuestasCienciaModal from './components/RespuestasCienciaModal';
import ContactModal from './components/ContactModal';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton';
import { 
  Menu, X, ChevronLeft, ChevronRight, User as UserIcon, ArrowRight, Heart, Zap, Activity, Hourglass, Baby, Sprout, Target, Microscope, Sparkles, Cpu, Gem, Users, Instagram, Linkedin, Facebook, Twitter, FileText, CheckCircle2, ShieldCheck, Check, Smartphone, BarChart3, Fingerprint, Package, Dna, BrainCircuit, TrendingUp, ScanLine
} from 'lucide-react';
import { ReportDetail, TelemetryArea } from './components/ReportModal';
import ReportModal from './components/ReportModal';

const generateFullTelemetry = (focusAreas: string[]): TelemetryArea[] => {
    const allAreas: { label: string, category: 'Sistemas' | 'Nutrientes' | 'Entorno' }[] = [
        { label: "Energía Metabólica", category: 'Sistemas' },
        { label: "Defensas", category: 'Sistemas' },
        { label: "Digestión", category: 'Sistemas' },
        { label: "Corazón", category: 'Sistemas' },
        { label: "Vitaminas", category: 'Nutrientes' },
        { label: "Minerales", category: 'Nutrientes' },
        { label: "Antioxidantes", category: 'Nutrientes' },
        { label: "Músculos", category: 'Nutrientes' },
        { label: "Grasas Buenas", category: 'Nutrientes' },
        { label: "Bacterias Amigas", category: 'Entorno' },
        { label: "Tóxicos Ambientales", category: 'Entorno' },
        { label: "Radiación Electrónica", category: 'Entorno' },
        { label: "Químicos Comunes", category: 'Entorno' },
        { label: "Sensibilidad Comida", category: 'Entorno' }
    ];

    return allAreas.map(area => {
        const isFocus = focusAreas.includes(area.label);
        const statusPool: ('Optimizado' | 'Necesidad Baja' | 'Necesidad Media' | 'Necesidad Alta')[] = isFocus 
            ? ['Necesidad Media', 'Necesidad Alta'] 
            : ['Optimizado', 'Necesidad Baja'];
        const status = statusPool[Math.floor(Math.random() * statusPool.length)];
        const value = status === 'Optimizado' ? Math.floor(Math.random() * 20) + 80 : Math.floor(Math.random() * 60) + 20;
        return { label: area.label, value, status, category: area.category };
    });
};

const REPORTS_CATALOG: ReportDetail[] = [
  { 
    id: 'wellness', 
    title: 'Equilibrio & Bienestar Integral', 
    subtitle: 'Equilibrio 360',
    description: 'Una visión integral del estado actual de tus células. Entiende por qué te sientes cansado y cómo blindar tus defensas.',
    problem: 'Sientes que tu cuerpo no rinde al 100%, tienes inflamación o fatiga que no sabes de dónde viene.',
    science: 'Con tecnología de Cell Wellbeing, analizamos cómo tu entorno afecta tu expresión biológica.',
    benefit: 'Sabrás exactamente qué comer y qué evitar para recuperar tu energía natural.',
    targetAudience: 'Personas que quieren dejar de adivinar y empezar a controlar su bienestar.',
    indicators: ['Energía Real', 'Defensas Fortalecidas', 'Digestión Ligera', 'Corazón Sano'],
    telemetry: generateFullTelemetry(["Energía Metabólica", "Defensas", "Digestión", "Corazón"]),
    color: 'text-gennova-cyan',
    icon: Heart
  },
  { 
    id: 'sport', 
    title: 'Rendimiento Deportivo', 
    subtitle: 'Nivel Atleta',
    description: 'Entrena con inteligencia. Descubre cómo recuperarte más rápido y evitar lesiones.',
    problem: 'Te esfuerzas mucho pero no ves resultados, o terminas agotado después de cada sesión.',
    science: 'Basado en los protocolos de Epixlife para la optimización metabólica en el deporte.',
    benefit: 'Entrenarás menos horas pero con mejores resultados al saber qué necesita tu cuerpo para repararse.',
    targetAudience: 'Deportistas y personas activas que buscan su mejor versión física.',
    indicators: ['Potencia Celular', 'Recuperación Veloz', 'Menos Inflamación', 'Músculos Inteligentes'],
    telemetry: generateFullTelemetry(["Energía Metabólica", "Corazón", "Músculos", "Antioxidantes"]),
    color: 'text-gennova-success',
    icon: Zap
  },
  { 
    id: 'slim', 
    title: 'Metabolismo & Peso', 
    subtitle: 'Cuerpo en Balance',
    description: 'Desbloquea tu metabolismo. Descubre qué alimentos están frenando tu pérdida de grasa.',
    problem: 'Haces dieta pero no bajas de peso, o sientes que todo lo que comes te inflama.',
    science: 'Identificamos las señales químicas que le dicen a tu cuerpo que guarde grasa en lugar de quemarla.',
    benefit: 'Un plan de alimentación que trabaja a favor de tu genética, no en su contra.',
    targetAudience: 'Personas que buscan resultados reales y duraderos a través del bienestar celular.',
    indicators: ['Quema de Grasa', 'Azúcar en Control', 'Adiós Ansiedad', 'Metabolismo Ágil'],
    telemetry: generateFullTelemetry(["Energía Metabólica", "Digestión", "Químicos Comunes", "Grasas Buenas"]),
    color: 'text-rose-400',
    icon: Activity
  },
  { 
    id: 'age', 
    title: 'Longevidad & Vitalidad', 
    subtitle: 'Longevidad Activa',
    description: 'Detén el reloj biológico. Protege tus células y mantente joven por dentro y por fuera.',
    problem: 'Te preocupa el paso del tiempo y quieres prevenir el desgaste antes de que aparezca.',
    science: 'Análisis de protección de ADN validado por los estándares de biotecnología de Epixlife.',
    benefit: 'Estrategias claras para mantener tu vitalidad y lucir joven por mucho más tiempo.',
    targetAudience: 'Hombres y mujeres que invierten en su futuro y quieren envejecer con bienestar.',
    indicators: ['Protección ADN', 'Balance Hormonal', 'Piel Radiante', 'Células Jóvenes'],
    telemetry: generateFullTelemetry(["Antioxidantes", "Energía Metabólica", "Tóxicos Ambientales", "Minerales"]),
    color: 'text-gennova-violet',
    icon: Hourglass
  },
  { 
    id: 'vegan', 
    title: 'Nutrición Vegana', 
    subtitle: 'Nutrición Plant-Based',
    description: 'Optimiza tu dieta vegana. Asegura la absorción de nutrientes críticos y evita carencias.',
    problem: 'Sigues una dieta basada en plantas pero te sientes sin energía o te preocupa no estar cubriendo tus necesidades.',
    science: 'Detectamos la eficiencia en la metilación de folatos y absorción de minerales clave.',
    benefit: 'Un perfil nutricional exacto para maximizar tu rendimiento ético y biológico.',
    targetAudience: 'Veganos y vegetarianos que buscan excelencia biológica.',
    indicators: ['Balance B12', 'Metilación Folatos', 'Energía Vegetal', 'Minerales Cruciales'],
    telemetry: generateFullTelemetry(["Vitaminas", "Minerales", "Digestión", "Protección ADN"]),
    color: 'text-emerald-400',
    icon: Sprout
  },
  { 
    id: 'kids', 
    title: 'Potencial Infantil', 
    subtitle: 'Desarrollo Bio',
    description: 'El mejor inicio biológico. Identifica sensibilidades y potencia el crecimiento de tus hijos.',
    problem: 'Problemas de enfoque, alergias inexplicables o dudas sobre la nutrición infantil ideal.',
    science: 'Mapeo no invasivo de interferencias ambientales y necesidades celulares para el crecimiento.',
    benefit: 'Claridad total para padres sobre el entorno y nutrición que permitirá el máximo desarrollo potencial.',
    targetAudience: 'Padres que priorizan la bio-optimización desde la infancia.',
    indicators: ['Foco Mental', 'Crecimiento Sano', 'Carga Ambiental', 'Balance Nutritivo'],
    telemetry: generateFullTelemetry(["Bacterias Amigas", "Sensibilidad Comida", "Radiación Electrónica", "Vitaminas"]),
    color: 'text-gennova-gold',
    icon: Baby
  }
];

const PLANES_DATA = [
  {
    id: 'start',
    name: 'START',
    description: 'Claridad biológica inmediata. El punto de partida perfecto.',
    price: '679',
    features: [
      '1 Evaluación Epigenética Completa / Epixlife',
      'Evaluación de 12 Sistemas Clave Biológico',
      'Interpretación de Evaluación Epigenética',
      'Plan Epi Nutrimental x 14 días',
      'Acceso a Genn Coach x 90 días (Muy Pronto)'
    ]
  },
  {
    id: 'plus',
    name: 'PLUS',
    description: 'Evolución guiada. Mide el impacto real de tus cambios.',
    price: '1,299',
    features: [
      'Todo incluido en Start',
      '2 Evaluaciones Epigenéticas Completas / Epixlife',
      'Plan Epi Nutrimental x 30 días',
      '1 Sesión Virtual con Especialista',
      'Acceso a Genn Coach x 180 días (Muy Pronto)'
    ]
  },
  {
    id: 'elite',
    name: 'ELITE',
    description: 'Control absoluto. La máxima expresión de longevidad y rendimiento.',
    price: '2,599',
    features: [
      'Todo lo incluido en Plus',
      '4 Tests Epigenéticos (Trimestral)',
      'Acompañamiento Continuo 12 Meses',
      'Acceso a Protocolos Avanzados',
      'Consultoría Prioritaria'
    ]
  }
];

const VisualStart = () => (
    <div className="relative w-full h-[240px] flex items-center justify-center bg-black/5 rounded-3xl overflow-hidden group">
        <div className="flex gap-4 items-end">
            <div className="flex flex-col items-center gap-2 group-hover:-translate-y-2 transition-transform duration-500">
                <div className="relative w-16 h-16">
                    <svg className="w-full h-full -rotate-90"><circle cx="32" cy="32" r="28" stroke="#1c1c1e" strokeWidth="4" fill="none"/><circle cx="32" cy="32" r="28" stroke="#38E8F8" strokeWidth="4" fill="none" strokeDasharray="175" strokeDashoffset="40" strokeLinecap="round"/></svg>
                    <Activity size={16} className="absolute inset-0 m-auto text-white" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Energía</span>
            </div>
            <div className="flex flex-col items-center gap-2 group-hover:-translate-y-4 transition-transform duration-500 delay-75">
                <div className="relative w-24 h-24">
                    <svg className="w-full h-full -rotate-90"><circle cx="48" cy="48" r="42" stroke="#1c1c1e" strokeWidth="5" fill="none"/><circle cx="48" cy="48" r="42" stroke="#E5C77A" strokeWidth="5" fill="none" strokeDasharray="263" strokeDashoffset="60" strokeLinecap="round"/></svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-2xl font-bold text-white">85</span>
                        <span className="text-[8px] text-gray-400">SCORE</span>
                    </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-black">Vitalidad</span>
            </div>
            <div className="flex flex-col items-center gap-2 group-hover:-translate-y-2 transition-transform duration-500 delay-100">
                <div className="relative w-16 h-16">
                    <svg className="w-full h-full -rotate-90"><circle cx="32" cy="32" r="28" stroke="#1c1c1e" strokeWidth="4" fill="none"/><circle cx="32" cy="32" r="28" stroke="#22C55E" strokeWidth="4" fill="none" strokeDasharray="175" strokeDashoffset="90" strokeLinecap="round"/></svg>
                    <Zap size={16} className="absolute inset-0 m-auto text-white" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Recarga</span>
            </div>
        </div>
        <div className="absolute bottom-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/50 text-[10px] font-mono font-bold text-gray-800 uppercase tracking-widest flex items-center gap-2 animate-fade-in-up">
            <CheckCircle2 size={12} className="text-black" /> Métricas Esenciales
        </div>
    </div>
  );

const VisualPlus = () => (
    <div className="relative w-full h-[240px] flex items-center justify-center bg-black rounded-3xl overflow-hidden group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,232,248,0.15),transparent_70%)]"></div>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        <div className="relative z-10 w-3/4 h-32 flex items-end justify-between px-2 pb-2 border-b border-white/20 border-l border-white/20">
            <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                <path d="M0,80 Q60,80 100,60 T200,20" fill="none" stroke="#E5C77A" strokeWidth="3" className="drop-shadow-[0_0_10px_#E5C77A]" />
                <circle cx="200" cy="20" r="6" fill="#E5C77A" className="animate-pulse" />
            </svg>
            <div className="absolute -bottom-6 left-0 text-[9px] text-gray-500 font-mono">INICIO</div>
            <div className="absolute -bottom-6 right-0 text-[9px] text-gray-500 font-mono">AHORA</div>
        </div>
        <div className="absolute top-6 right-6 bg-[#1c1c1e] border border-white/10 p-3 rounded-xl shadow-2xl flex flex-col items-end animate-float-medium">
            <span className="text-[9px] text-gray-400 font-mono uppercase tracking-widest mb-1">Edad Biológica</span>
            <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-white">28.4</span>
                <span className="text-[10px] text-gennova-success font-bold flex items-center"><ArrowRight size={10} className="rotate-45" /> -3.2</span>
            </div>
        </div>
    </div>
  );

const VisualElite = () => (
    <div className="relative w-full h-[240px] flex items-center justify-center bg-black rounded-3xl overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0B0F16] to-black"></div>
        <div className="relative h-full w-32 opacity-60">
             <img src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1000&auto=format&fit=crop" className="h-full w-full object-cover opacity-40 mix-blend-screen grayscale" alt="Body Scan" />
        </div>
        <div className="absolute top-0 w-full h-1 bg-gennova-cyan/50 shadow-[0_0_20px_#38E8F8] animate-biometric-scan"></div>
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-gennova-cyan rounded-full animate-ping"></div>
        <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-gennova-gold rounded-full animate-ping delay-300"></div>
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full animate-ping delay-700"></div>
        <div className="absolute inset-4 border border-white/10 rounded-2xl pointer-events-none flex flex-col justify-between p-4">
            <div className="flex justify-between items-start">
                <div className="flex gap-1">
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                </div>
                <Fingerprint size={16} className="text-gennova-cyan opacity-80" />
            </div>
            <div className="flex items-end justify-between">
                <div className="bg-black/60 backdrop-blur-md px-2 py-1 rounded border border-white/10">
                    <span className="text-[8px] font-mono text-gennova-gold uppercase tracking-widest block">Metilación</span>
                    <span className="text-xs text-white font-bold">98% COMPLETA</span>
                </div>
                <Activity size={16} className="text-white opacity-50" />
            </div>
        </div>
    </div>
  );

const MainApp: React.FC = () => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [reports, setReports] = useState<EpigeneticReport[]>([]);
  const [biomarkers, setBiomarkers] = useState<Biomarker[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showKitModal, setShowKitModal] = useState(false);
  const [selectedPlanForKit, setSelectedPlanForKit] = useState<any>(null);
  const [showCoach, setShowCoach] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showRespuestasCiencia, setShowRespuestasCiencia] = useState(false);
  const [showNutriTips, setShowNutriTips] = useState(false);
  const [showEpigeneticsInfo, setShowEpigeneticsInfo] = useState(false);
  const [showLabsModal, setShowLabsModal] = useState(false); 
  const [showQuiz, setShowQuiz] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeReportDetail, setActiveReportDetail] = useState<ReportDetail | null>(null);
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [selectedScienceDoc, setSelectedScienceDoc] = useState<ScienceData | null>(null);
  const [selectedPlanForDetail, setSelectedPlanForDetail] = useState<string | null>(null);
  const [activeFooterLink, setActiveFooterLink] = useState<string | null>(null);
  const [showContact, setShowContact] = useState(false);
  
  const reportCarouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      if (user) {
        const tourSeen = localStorage.getItem('gennova_tour_seen');
        if (!tourSeen) setTimeout(() => setShowTour(true), 1000);
        
        setLoading(true);
        try {
            const [profile, userReports, userBiomarkers] = await Promise.all([
                getUserProfile(user.uid),
                getUserReports(user.uid),
                getUserBiomarkers(user.uid)
            ]);
            setUserProfile(profile);
            setReports(userReports);
            setBiomarkers(userBiomarkers);
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setLoading(false);
        }
      } else {
        setUserProfile(null);
        setReports([]);
        setBiomarkers([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
      await logoutUser();
      setMobileMenuOpen(false);
  };

  const scrollToSection = (id: string) => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
  };

  const scrollReports = (direction: 'left' | 'right') => {
      if (reportCarouselRef.current) {
          const scrollAmount = 400;
          reportCarouselRef.current.scrollBy({
              left: direction === 'left' ? -scrollAmount : scrollAmount,
              behavior: 'smooth'
          });
      }
  };

  const openKitForm = (plan: any) => {
    setSelectedPlanForKit(plan);
    setShowKitModal(true);
  };

  const handleQuizRecommendation = (recommendedAction: string) => {
      setShowQuiz(false); 
      if (recommendedAction.startsWith('OPEN_REPORT_')) {
          const reportId = recommendedAction.replace('OPEN_REPORT_', '').toLowerCase();
          const targetReport = REPORTS_CATALOG.find(r => r.id === reportId);
          if (targetReport) {
              setTimeout(() => setActiveReportDetail(targetReport), 300);
          }
      } else if (recommendedAction === 'OPEN_WELLNESS') {
          const wellnessReport = REPORTS_CATALOG.find(r => r.id === 'wellness');
          if (wellnessReport) {
              setTimeout(() => setActiveReportDetail(wellnessReport), 300);
          }
      } else {
          const plan = PLANES_DATA.find(p => p.id === recommendedAction) || PLANES_DATA[0];
          setSelectedPlanForKit(plan);
          setTimeout(() => setShowKitModal(true), 300);
      }
  };

  const handleSubscribe = (e: React.FormEvent) => {
      e.preventDefault();
      if (subscribeEmail) {
          alert("¡Gracias por suscribirte a Gennova Labs!");
          setSubscribeEmail('');
      }
  };

  if (firebaseUser && userProfile) {
      return (
          <Dashboard 
            user={userProfile} 
            currentUser={firebaseUser} 
            reports={reports} 
            biomarkers={biomarkers} 
            onLogout={handleLogout}
            onOrderKit={() => openKitForm(PLANES_DATA[0])}
          />
      );
  }

  return (
    <div className="min-h-screen bg-gennova-main text-gennova-text-primary font-sans selection:bg-gennova-gold selection:text-black overflow-x-hidden">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 bg-gennova-main/80 backdrop-blur-md border-b border-white/5 transition-all duration-300">
        <div className="w-full px-6 md:px-12">
            <div className="flex justify-between items-center h-24 relative">
                
                {/* 1. IZQUIERDA: MARCA */}
                <div className="flex items-center gap-4 cursor-pointer group" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
                    <AnimatedGLogo className="w-16 h-16" />
                    <span className="text-3xl font-serif font-bold text-white tracking-tighter group-hover:text-gennova-gold transition-colors">GENNOVA</span>
                </div>

                {/* 2. CENTRO: MENÚ */}
                <div className="hidden md:flex items-center gap-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <button onClick={() => setShowLabsModal(true)} className="text-[13px] font-medium text-white hover:text-gennova-text-secondary transition tracking-wide font-sans">Gennova Labs</button>
                    <button onClick={() => setShowQuiz(true)} className="text-[13px] font-medium text-gennova-gold hover:text-white transition tracking-wide font-sans flex items-center gap-1 border-b border-gennova-gold/30 pb-0.5"><ScanLine size={14}/> Bio-Quiz</button>
                    <button onClick={() => setShowHowItWorks(true)} className="text-[13px] font-medium text-white hover:text-gennova-text-secondary transition tracking-wide font-sans">Cómo funciona</button>
                    <button onClick={() => setShowRespuestasCiencia(true)} className="text-[13px] font-medium text-white hover:text-gennova-gold transition tracking-wide font-sans">Respuestas & Ciencia</button>
                    <button onClick={() => setShowNutriTips(true)} className="text-[13px] font-medium text-white hover:text-gennova-text-secondary transition tracking-wide font-sans">Gennova Biohacks</button>
                    <button onClick={() => setShowContact(true)} className="text-[13px] font-medium text-white hover:text-gennova-text-secondary transition tracking-wide font-sans">Contacto</button>
                </div>

                {/* 3. DERECHA: ACCIONES */}
                <div className="hidden md:flex items-center gap-6">
                    <button onClick={() => setShowLogin(true)} className="hidden text-[13px] font-medium text-white hover:text-gennova-text-secondary transition tracking-wide flex items-center gap-2 font-sans">
                            <UserIcon size={16} />
                            Ingresar
                    </button>

                    <button 
                        onClick={() => setShowLogin(true)} 
                        className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-gennova-cyan via-gennova-violet to-gennova-gold animate-spin-slow opacity-70 group-hover:opacity-100 transition-opacity"></span>
                        <div className="relative bg-black px-4 py-2 rounded-full flex items-center gap-2 transition-transform group-active:scale-95">
                            <Sparkles size={14} className="text-gennova-cyan animate-pulse" />
                            <span className="text-xs font-bold text-white uppercase tracking-[0.3em] font-mono">GENN COACH</span>
                        </div>
                    </button>
                </div>

                <div className="md:hidden">
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white p-2">
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gennova-main border-t border-white/5 p-8 flex flex-col gap-6 animate-fade-in">
              <button onClick={() => { setShowLabsModal(true); setMobileMenuOpen(false); }} className="text-base font-medium text-white text-left tracking-wide font-sans">Gennova Labs</button>
              <button onClick={() => { setShowQuiz(true); setMobileMenuOpen(false); }} className="text-base font-medium text-gennova-gold text-left tracking-wide font-sans flex items-center gap-2"><ScanLine size={16}/> Bio-Quiz</button>
              <button onClick={() => { setShowHowItWorks(true); setMobileMenuOpen(false); }} className="text-base font-medium text-white text-left tracking-wide font-sans">Cómo funciona</button>
              <button onClick={() => { setShowRespuestasCiencia(true); setMobileMenuOpen(false); }} className="text-base font-medium text-gennova-gold text-left tracking-wide font-sans">Respuestas & Ciencia</button>
              <button onClick={() => { setShowNutriTips(true); setMobileMenuOpen(false); }} className="text-base font-medium text-white text-left tracking-wide font-sans">Gennova Biohacks</button>
              <button onClick={() => { setShowContact(true); setMobileMenuOpen(false); }} className="text-base font-medium text-white text-left tracking-wide font-sans">Contacto</button>
              <button onClick={() => { setShowCoach(true); setMobileMenuOpen(false); }} className="text-base font-medium text-gennova-cyan text-left tracking-wide font-sans">Genn Coach</button>
              {!firebaseUser ? (
                <button onClick={() => { setShowLogin(true); setMobileMenuOpen(false); }} className="hidden text-base font-medium text-white text-left tracking-wide font-sans flex items-center gap-2"><UserIcon size={16}/> Ingresar</button>
              ) : (
                <button onClick={handleLogout} className="text-base font-medium text-red-500 text-left tracking-wide font-sans">Salir</button>
              )}
          </div>
        )}
      </nav>

      {/* --- SECCIÓN 1: HERO --- */}
      <section id="hero" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        <HeroSlideshow />
        <div className="relative z-20 text-center px-4 w-full pt-20">
            <div className="mb-6 flex justify-center animate-fade-in-up">
                <span className="text-gennova-cyan font-mono text-[9px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.5em] bg-gennova-cyan/10 px-4 py-1.5 rounded-full border border-gennova-cyan/20 backdrop-blur-md">Ciencia Epigenética Personalizada</span>
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-[8vw] lg:text-[7.5vw] font-serif text-white mb-6 md:mb-8 animate-text-reveal leading-[1.1] md:leading-[0.9] tracking-[-0.05em] drop-shadow-2xl whitespace-normal md:whitespace-nowrap overflow-visible">
                Tu cuerpo <span className="inline-block text-transparent bg-clip-text bg-[linear-gradient(90deg,#E5C77A,#FFFFFF,#E5C77A)] bg-[length:200%_auto] animate-shimmer-slow italic">tiene el manual.</span>
            </h1>
            <p className="text-white text-base md:text-2xl font-light tracking-tight mb-10 md:mb-12 max-w-4xl mx-auto animate-fade-in-up delay-200 leading-relaxed md:leading-snug font-sans">
                Gennova te ayuda a entenderlo, optimizarlo y transformar tu bienestar desde adentro, con precisión e inteligencia.
            </p>
        </div>
      </section>

      {/* --- SECCIÓN 2: AUTORIDAD BIOTECNOLÓGICA --- */}
      <BiotechAuthority />

      {/* --- SECCIÓN 3: REPORTES --- */}
      <section id="reports" className="py-32 bg-gennova-main relative border-t border-white/5 overflow-hidden">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                   <div className="max-w-2xl">
                       <span className="text-gennova-cyan font-mono text-[10px] uppercase tracking-[0.5em] mb-4 block">Resultados Tangibles</span>
                       <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 tracking-tighter leading-none">
                           El poder de <span className="italic text-gennova-gold">conocerte.</span>
                       </h2>
                       <p className="text-gennova-text-secondary leading-relaxed text-lg font-light font-sans">Conocer tu cuerpo no es vanidad, es inteligencia biológica. Estos son los activos que desbloqueas al tomar el control.</p>
                   </div>
                   <div className="flex gap-3 mb-2">
                       <button onClick={() => scrollReports('left')} className="p-4 rounded-full border border-white/10 text-white hover:bg-white hover:text-black transition-all active:scale-95 shadow-lg"><ChevronLeft size={24} /></button>
                       <button onClick={() => scrollReports('right')} className="p-4 rounded-full border border-white/10 text-white hover:bg-white hover:text-black transition-all active:scale-95 shadow-lg"><ChevronRight size={24} /></button>
                   </div>
               </div>
               <div ref={reportCarouselRef} className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory no-scrollbar">
                   {REPORTS_CATALOG.map((report) => (
                       <div key={report.id} onClick={() => setActiveReportDetail(report)} className="min-w-[320px] md:min-w-[420px] snap-start bg-gennova-elevated border border-white/5 rounded-[3rem] overflow-hidden group hover:border-white/20 transition-all duration-500 cursor-pointer relative shadow-2xl flex flex-col h-[580px]">
                           <div className="absolute inset-0 z-0">
                               <ReportImage type={report.title} />
                               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-700"></div>
                           </div>
                           <div className="relative z-10 p-10 mt-auto flex flex-col h-full justify-end">
                               <div className="mb-6">
                                   <div className={`text-[10px] font-bold font-mono uppercase tracking-[0.4em] mb-3 px-4 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10 inline-block ${report.color}`}>{report.subtitle}</div>
                                   <h3 className="text-3xl md:text-4xl font-serif text-white tracking-tighter mb-4 group-hover:text-gennova-gold transition-colors duration-500">{report.title}</h3>
                                   <p className="text-gray-300 text-sm leading-relaxed font-light mb-8 line-clamp-2 group-hover:line-clamp-none transition-all duration-500 font-sans">{report.description}</p>
                               </div>
                               <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                                   <div className="flex flex-wrap gap-2">
                                       {report.indicators.slice(0, 2).map((ind, i) => (
                                           <span key={i} className="text-[8px] uppercase bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg text-gray-400 font-mono border border-white/10 tracking-[0.2em]">{ind}</span>
                                       ))}
                                   </div>
                                   <div className={`w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-black/40 backdrop-blur-md group-hover:bg-white group-hover:text-black transition-all duration-500 ${report.color}`}><ArrowRight size={20} /></div>
                               </div>
                           </div>
                       </div>
                   ))}
               </div>
           </div>
      </section>

      {/* --- SECCIÓN 4: BIO-EDAD --- */}
      <BioAgeSection />
      
      {/* --- SECCIÓN 5: TESTIMONIOS --- */}
      <Testimonials />

      {/* --- SECCIÓN 6: CÓMO FUNCIONA (REDISEÑADO ESTILO WHOOP) --- */}
      <section className="py-32 bg-black relative overflow-hidden border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
              
              {/* Header de Sección */}
              <div className="mb-32 max-w-3xl">
                  <h2 className="text-5xl md:text-8xl font-serif text-white tracking-tighter leading-[0.9] mb-8">
                      Así funciona tu <br/>
                      ruta <span className="text-gennova-gold">Gennova.</span>
                  </h2>
                  <p className="text-xl text-gray-400 font-light leading-relaxed max-w-xl font-sans">
                      De tu muestra a decisiones reales basadas en tu biología.
                  </p>
              </div>

              {/* Steps Container: Zig-Zag Layout with Huge Imagery */}
              <div className="space-y-32 md:space-y-48">
                  
                  {/* STEP 01: ELIGE TU PLAN */}
                  <div className="group flex flex-col md:flex-row gap-12 md:gap-24 items-center">
                      <div className="w-full md:w-3/5 relative order-2 md:order-1">
                          <div className="aspect-[4/3] rounded-[3rem] overflow-hidden border border-white/10 relative shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                              <img 
                                src="https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=1200&auto=format&fit=crop" 
                                alt="El Kit Gennova" 
                                className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-700" 
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          </div>
                          {/* Giant Number */}
                          <div className="absolute -top-12 -left-4 md:-left-12 text-[12rem] font-serif font-bold text-white/5 select-none z-0 leading-none pointer-events-none">01</div>
                      </div>
                      <div className="w-full md:w-2/5 relative z-10 order-1 md:order-2">
                          <h3 className="text-4xl md:text-5xl font-serif text-white mb-6">Elige tu plan</h3>
                          <p className="text-lg text-gray-400 font-light leading-relaxed mb-8">
                              Selecciona el nivel de profundidad analítica para tu objetivo. El primer paso para tomar el control real de tu biología.
                          </p>
                          <div className="flex flex-col gap-3 max-w-sm">
                              <button onClick={() => setSelectedPlanForDetail('start')} className="px-6 py-4 rounded-2xl border border-white/10 bg-[#1a1a1a] hover:bg-[#222] hover:border-gennova-gold text-white font-mono text-[11px] md:text-xs uppercase tracking-[0.2em] w-full text-left flex justify-between items-center transition-all group duration-300">
                                  <span>Start</span>
                                  <div className="w-8 h-8 rounded-full border border-white/10 group-hover:border-gennova-gold flex items-center justify-center transition-colors">
                                      <ArrowRight size={14} className="text-gray-500 group-hover:text-gennova-gold group-hover:-rotate-45 transition-all duration-300" />
                                  </div>
                              </button>
                              <button onClick={() => setSelectedPlanForDetail('plus')} className="px-6 py-4 rounded-2xl border border-white/10 bg-[#1a1a1a] hover:bg-[#222] hover:border-gennova-gold text-white font-mono text-[11px] md:text-xs uppercase tracking-[0.2em] w-full text-left flex justify-between items-center transition-all group duration-300">
                                  <span>Plus</span>
                                  <div className="w-8 h-8 rounded-full border border-white/10 group-hover:border-gennova-gold flex items-center justify-center transition-colors">
                                      <ArrowRight size={14} className="text-gray-500 group-hover:text-gennova-gold group-hover:-rotate-45 transition-all duration-300" />
                                  </div>
                              </button>
                              <button onClick={() => setSelectedPlanForDetail('elite')} className="px-6 py-4 rounded-2xl border border-white/10 bg-[#1a1a1a] hover:bg-[#222] hover:border-gennova-gold text-white font-mono text-[11px] md:text-xs uppercase tracking-[0.2em] w-full text-left flex justify-between items-center transition-all group duration-300">
                                  <span>Elite</span>
                                  <div className="w-8 h-8 rounded-full border border-white/10 group-hover:border-gennova-gold flex items-center justify-center transition-colors">
                                      <ArrowRight size={14} className="text-gray-500 group-hover:text-gennova-gold group-hover:-rotate-45 transition-all duration-300" />
                                  </div>
                              </button>
                          </div>
                      </div>
                  </div>

                  {/* STEP 02: REALIZA TU TEST */}
                  <div className="group flex flex-col md:flex-row gap-12 md:gap-24 items-center">
                      <div className="w-full md:w-2/5 relative z-10 order-1 md:text-right">
                          <h3 className="text-4xl md:text-5xl font-serif text-white mb-6">Realiza tu test epigenético</h3>
                          <p className="text-lg text-gray-400 font-light leading-relaxed mb-8">
                              Toma de muestra capilar (no invasiva) en cualquiera de nuestras sedes o solicita tu Kit Epigenetico.
                          </p>
                          <div className="flex justify-start md:justify-end">
                              <button onClick={() => setShowContact(true)} className="px-8 py-4 rounded-full border border-white/10 bg-[#1a1a1a] hover:bg-[#222] hover:border-gennova-gold text-white font-mono text-[11px] uppercase tracking-[0.2em] transition-all duration-300">
                                  Sedes
                              </button>
                          </div>
                      </div>
                      <div className="w-full md:w-3/5 relative order-2">
                          <div className="aspect-[4/3] rounded-[3rem] overflow-hidden border border-white/10 relative shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                              <img 
                                src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1200&auto=format&fit=crop" 
                                alt="Muestra Biológica" 
                                className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-700 grayscale group-hover:grayscale-0" 
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          </div>
                          <div className="absolute -top-12 -right-4 md:-right-12 text-[12rem] font-serif font-bold text-white/5 select-none z-0 leading-none pointer-events-none">02</div>
                      </div>
                  </div>

                  {/* STEP 03: INTERPRETACION */}
                  <div className="group flex flex-col md:flex-row gap-12 md:gap-24 items-center">
                      <div className="w-full md:w-3/5 relative order-2 md:order-1">
                          <div className="aspect-[4/3] rounded-[3rem] overflow-hidden border border-white/10 relative shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                              <img 
                                src="https://images.unsplash.com/photo-1620912189865-1e8a33da4c5e?q=80&w=1200&auto=format&fit=crop" 
                                alt="Inteligencia Artificial" 
                                className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-700" 
                              />
                              <div className="absolute inset-0 bg-gennova-cyan/10 mix-blend-overlay"></div>
                          </div>
                          <div className="absolute -top-12 -left-4 md:-left-12 text-[12rem] font-serif font-bold text-white/5 select-none z-0 leading-none pointer-events-none">03</div>
                      </div>
                      <div className="w-full md:w-2/5 relative z-10 order-1 md:order-2">
                          <h3 className="text-4xl md:text-5xl font-serif text-white mb-6">De datos complejos a decisiones claras</h3>
                          <p className="text-lg text-gray-400 font-light leading-relaxed mb-4">
                              Tu muestra es evaluada en los laboratorios Cell Wellbeing / Epixlife en Alemania. Convertimos esa información en claridad a través de nuestro equipo experto y Genn Coach.
                          </p>
                          <p className="text-lg text-gray-400 font-light leading-relaxed">
                              Recibes un protocolo personalizado diseñado para tu biología.
                          </p>
                      </div>
                  </div>

                  {/* STEP 04: DASHBOARD */}
                  <div className="group flex flex-col md:flex-row gap-12 md:gap-24 items-center">
                      <div className="w-full md:w-2/5 relative z-10 order-1 md:text-right">
                          <h3 className="text-4xl md:text-5xl font-serif text-white mb-6">Accede a tu panel personalizado</h3>
                          <p className="text-lg text-gray-400 font-light leading-relaxed mb-6">
                              Accede a tu información biológica en un entorno diseñado para entender, seguir, optimizar tu evolución.
                          </p>
                          <div className="flex justify-start md:justify-end">
                              <div className="inline-flex items-center gap-3 px-4 py-3 rounded-2xl border border-gennova-gold/30 bg-gennova-gold/5 text-gennova-gold">
                                  <span className="relative flex h-2 w-2 shrink-0">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gennova-gold opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-2 w-2 bg-gennova-gold"></span>
                                  </span>
                                  <span className="text-[10px] md:text-xs uppercase tracking-widest font-mono font-medium text-left">
                                      Próximamente Genn Coach APP tu app de seguimiento y evolución
                                  </span>
                              </div>
                          </div>
                      </div>
                      <div className="w-full md:w-3/5 relative order-2">
                          <div className="aspect-[4/3] rounded-[3rem] overflow-hidden border border-white/10 relative shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                              <img 
                                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop" 
                                alt="Resultados Reales" 
                                className="object-cover w-full h-full opacity-90 group-hover:opacity-100 transition-opacity duration-700" 
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          </div>
                          <div className="absolute -top-12 -right-4 md:-right-12 text-[12rem] font-serif font-bold text-white/5 select-none z-0 leading-none pointer-events-none">04</div>
                      </div>
                  </div>

              </div>

              {/* CTA Final de Sección */}
              <div className="mt-32 text-center">
                  <button 
                    onClick={() => setShowHowItWorks(true)}
                    className="inline-flex items-center gap-4 text-sm font-bold uppercase tracking-[0.2em] text-white hover:text-gennova-gold transition-colors group border-b border-white/20 pb-1 hover:border-gennova-gold"
                  >
                      Ver Detalles del Proceso <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform"/>
                  </button>
              </div>
          </div>
      </section>

      {/* --- SECCIÓN PUENTE: BIO QUIZ --- */}
      <section className="relative py-40 bg-black overflow-hidden border-y border-white/10">
          <div className="absolute inset-0">
               <img 
                 src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2000&auto=format&fit=crop" 
                 alt="Bio Quiz background" 
                 className="w-full h-full object-cover opacity-40 grayscale" 
               />
               <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
          </div>
          
          <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex items-center min-h-[40vh]">
              <div className="max-w-3xl">
                  <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 tracking-tighter leading-none">
                      ¿No sabes por dónde empezar?<br/>
                      <span className="italic text-gennova-gold">Descubre qué pide tu biología.</span>
                  </h2>
                  <p className="text-gray-400 text-lg md:text-xl font-sans mb-10 max-w-2xl font-light">
                      Responde unas simples preguntas sobre tu estilo de vida actual, 
                      y nuestro algoritmo te recomendará la ruta de optimización exacta.
                  </p>
                  
                  <button 
                    onClick={() => setShowQuiz(true)}
                    className="group relative inline-flex items-center gap-4 bg-white text-black px-10 py-5 rounded-full uppercase tracking-[0.2em] font-mono text-xs font-bold overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                  >
                      <span className="relative z-10">Tomar el Bio Quiz</span>
                      <ArrowRight size={16} className="relative z-10 group-hover:translate-x-2 transition-transform" />
                  </button>
              </div>
          </div>
      </section>

      {/* --- SECCIÓN 7: PRECIOS --- */}
      <section id="planes" className="py-32 bg-black relative overflow-hidden">
          <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-20 animate-fade-in-up">
                  <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 tracking-tighter leading-none">
                      No eliges un plan. <br/>
                      Eliges cuánto control <span className="italic text-gennova-gold">quieres sobre tu biología.</span>
                  </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6 items-stretch relative">
                  {PLANES_DATA.map((plan, idx) => (
                      <div 
                        key={plan.id} 
                        className="bg-[#F5F5F7] rounded-[2rem] p-8 flex flex-col items-center text-center relative group hover:scale-[1.01] transition-transform duration-500 overflow-hidden"
                        style={{ animationDelay: `${idx * 200}ms` }}
                      >
                          {/* 1. Header Area */}
                          <div className="mb-4">
                              <h3 className="text-4xl font-serif font-bold uppercase tracking-wide mb-2 text-black">{plan.name}</h3>
                              <p className="text-xs text-gray-600 font-sans leading-relaxed px-4 max-w-xs mx-auto">{plan.description}</p>
                          </div>

                          {/* 2. Visual / Product Representation (Custom Data Viz) */}
                          <div className="relative mb-8 w-full flex justify-center py-6">
                              {plan.id === 'start' && <VisualStart />}
                              {plan.id === 'plus' && <VisualPlus />}
                              {plan.id === 'elite' && <VisualElite />}
                          </div>

                          {/* 3. Features & Buttons */}
                          <div className="w-full flex-1 flex flex-col">
                              <div className="text-left mb-8 px-4">
                                  <p className="text-xs font-bold text-black mb-4 uppercase tracking-widest">Incluye:</p>
                                  <ul className="space-y-3">
                                      {plan.features.map((feature, i) => (
                                          <li key={i} className="flex items-start gap-3 text-xs font-medium text-gray-800">
                                              <div className="w-4 h-4 rounded-full bg-black flex items-center justify-center shrink-0 mt-0.5">
                                                  <Check size={10} className="text-white" strokeWidth={3} />
                                              </div>
                                              {feature}
                                          </li>
                                      ))}
                                  </ul>
                              </div>
                              
                              <div className="mt-auto flex flex-col gap-3 px-2">
                                  <button 
                                    onClick={() => window.open(`https://wa.me/51932818432?text=${encodeURIComponent(`Hola Gennova, quiero iniciar mi optimización con el ${plan.name}. ¿Me pueden ayudar?`)}`, '_blank')} 
                                    className="w-full py-4 rounded-full font-mono text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-xl bg-black text-white hover:bg-gray-800"
                                  >
                                      HABLAR CON ESPECIALISTA
                                  </button>
                                  
                                  <button 
                                    onClick={() => setSelectedPlanForDetail(plan.id)}
                                    className="w-full py-4 rounded-full font-mono text-[10px] font-bold uppercase tracking-[0.2em] transition-all border border-black text-black hover:bg-white bg-transparent"
                                  >
                                    ¿QUÉ OBTIENES?
                                  </button>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* --- SECCIÓN 8: FOOTER --- */}
      <footer id="footer" className="bg-black text-white pt-32 pb-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-16 mb-32">
                <div className="space-y-6">
                    <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] text-white">SOPORTE</h4>
                    <ul className="space-y-3 text-gray-500 font-sans font-light text-[13px]">
                        <li><button onClick={() => setActiveFooterLink('help')} className="hover:text-white transition text-left">Centro de Ayuda</button></li>
                        <li><button onClick={() => setActiveFooterLink('order')} className="hover:text-white transition text-left">Estado del Pedido</button></li>
                        <li><button onClick={() => setActiveFooterLink('reinc')} className="hover:text-white transition text-left">Reincorporación</button></li>
                        <li><button onClick={() => setActiveFooterLink('members')} className="hover:text-white transition text-left">Ingreso Miembros</button></li>
                        <li><button onClick={() => setActiveFooterLink('glabs')} className="hover:text-white transition text-left">Gennova Labs</button></li>
                        <li><button onClick={() => setActiveFooterLink('community')} className="hover:text-white transition text-left">Comunidad</button></li>
                    </ul>
                </div>
                <div className="space-y-6">
                    <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] text-white">EMPRESA</h4>
                    <ul className="space-y-3 text-gray-500 font-sans font-light text-[13px]">
                        <li><button onClick={() => setActiveFooterLink('about_support')} className="hover:text-white transition text-left">Soporte</button></li>
                        <li><button onClick={() => setActiveFooterLink('devs')} className="hover:text-white transition text-left">Desarrolladores</button></li>
                        <li><button onClick={() => setActiveFooterLink('engineering')} className="hover:text-white transition text-left">Ingeniería</button></li>
                        <li><button onClick={() => setActiveFooterLink('careers')} className="hover:text-white transition text-left">Carreras</button></li>
                        <li><button onClick={() => setActiveFooterLink('mission')} className="hover:text-white transition text-left">Nuestra Misión</button></li>
                        <li><button onClick={() => setShowContact(true)} className="hover:text-white transition text-left">Contacto</button></li>
                    </ul>
                </div>
                <div className="space-y-6">
                    <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] text-white">LEGAL</h4>
                    <ul className="space-y-3 text-gray-500 font-sans font-light text-[13px]">
                        <li><button onClick={() => setActiveFooterLink('terms_use')} className="hover:text-white transition text-left">Términos de Uso</button></li>
                        <li><button onClick={() => setActiveFooterLink('terms_sale')} className="hover:text-white transition text-left">Términos de Venta</button></li>
                        <li><button onClick={() => setActiveFooterLink('privacy')} className="hover:text-white transition text-left">Privacidad</button></li>
                        <li><button onClick={() => setActiveFooterLink('security')} className="hover:text-white transition text-left">Seguridad</button></li>
                        <li><button onClick={() => setActiveFooterLink('patents')} className="hover:text-white transition text-left">Patentes</button></li>
                    </ul>
                </div>
                <div className="space-y-6">
                    <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] text-white">PARTNERS</h4>
                    <ul className="space-y-3 text-gray-500 font-sans font-light text-[13px]">
                        <li><button onClick={() => setActiveFooterLink('affiliate')} className="hover:text-white transition text-left">Sé un Afiliado</button></li>
                        <li><button onClick={() => setActiveFooterLink('devs')} className="hover:text-white transition text-left">Desarrolladores</button></li>
                    </ul>
                </div>
                <div className="space-y-6">
                    <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] text-white">ÚNETE A GENNOVA</h4>
                    <ul className="space-y-3 text-gray-500 font-sans font-light text-[13px]">
                        <li><button onClick={() => setActiveFooterLink('get_kit')} className="hover:text-white transition text-left">Obtener Kit</button></li>
                        <li><button onClick={() => setActiveFooterLink('refer')} className="hover:text-white transition text-left">Referir Amigo</button></li>
                        <li><button onClick={() => setActiveFooterLink('gift')} className="hover:text-white transition text-left">Regalar Gennova</button></li>
                        <li><button onClick={() => setActiveFooterLink('corp')} className="hover:text-white transition text-left">Ventas Corporativas</button></li>
                        <li><button onClick={() => setActiveFooterLink('accessories')} className="hover:text-white transition text-left">Accesorios</button></li>
                    </ul>
                </div>
                <div className="space-y-6">
                    <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] text-white">THE LAB</h4>
                    <ul className="space-y-3 text-gray-500 font-sans font-light text-[13px]">
                        <li><button onClick={() => setActiveFooterLink('blog')} className="hover:text-white transition text-left">El Blog</button></li>
                        <li><button onClick={() => setActiveFooterLink('press')} className="hover:text-white transition text-left">Centro de Prensa</button></li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-16 border-t border-white/5 pt-16">
                <div className="space-y-8 max-w-xl">
                    <div className="flex items-center gap-4">
                        <span className="text-4xl font-serif font-bold text-white tracking-tighter">GENNOVA</span>
                    </div>
                    <p className="text-gray-500 text-sm font-light leading-relaxed font-sans">
                        Nuestra misión en Gennova es desbloquear el rendimiento humano y la longevidad mediante la decodificación epigenética precisa. Ayudamos a personas excepcionales a tomar el control de su propia biología.
                    </p>
                    <div className="flex gap-6 pt-4">
                        <button className="text-gray-500 hover:text-gennova-gold transition-colors duration-300"><Instagram size={20} /></button>
                        <button className="text-gray-500 hover:text-gennova-gold transition-colors duration-300"><Linkedin size={20} /></button>
                        <button className="text-gray-500 hover:text-gennova-gold transition-colors duration-300"><Facebook size={20} /></button>
                        <button className="text-gray-500 hover:text-gennova-gold transition-colors duration-300"><Twitter size={20} /></button>
                    </div>
                </div>
                <div className="w-full lg:max-w-md space-y-6">
                    <form onSubmit={handleSubscribe} className="relative group">
                        <input 
                            type="email" 
                            placeholder="Ingresa tu email" 
                            value={subscribeEmail}
                            onChange={(e) => setSubscribeEmail(e.target.value)}
                            className="w-full bg-transparent border-b border-white/20 text-white text-lg py-4 focus:outline-none focus:border-gennova-gold transition-colors placeholder-gray-700 font-sans"
                            required
                        />
                        <button 
                            type="submit"
                            className="absolute right-0 top-1/2 -translate-x-1/2 text-white font-mono text-[10px] uppercase tracking-widest font-bold hover:text-gennova-gold transition-colors"
                        >
                            ENVIAR
                        </button>
                    </form>
                    <p className="text-gray-600 text-[11px] font-sans leading-relaxed">
                        Al suscribirte, aceptas nuestra política de protección de datos y te unes a nuestra comunidad de bio-optimización.
                    </p>
                </div>
            </div>
            <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono text-gray-700 uppercase tracking-[0.5em]">
                <p>&copy; {new Date().getFullYear()} GENNOVA LABS PERÚ. ALL RIGHTS RESERVED.</p>
                <div className="flex gap-8">
                    <span>BIO-TECH PRD 3.2</span>
                    <span>AI DRIVEN OS</span>
                </div>
            </div>
        </div>
    </footer>

      <GetStartedButton />

      {showLogin && <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} onLogin={(u) => { setShowLogin(false); setFirebaseUser(u); }} />}
      {showCheckout && <CheckoutFlow isOpen={showCheckout} onClose={() => setShowCheckout(false)} currentUser={firebaseUser} initialPlan={selectedPlanForKit?.id} />}
      {showKitModal && <KitModal isOpen={showKitModal} onClose={() => setShowKitModal(false)} plan={selectedPlanForKit} onConfirm={() => { setShowKitModal(false); setShowCheckout(true); }} />}
      {showCoach && <GennovaCoach onClose={() => setShowCoach(false)} userName={userProfile?.name || "Gennover"} />}
      {showTour && <OnboardingTour onClose={() => setShowTour(false)} />}
      {showAbout && <AboutModal isOpen={showAbout} onClose={() => setShowAbout(false)} />}
      {showHowItWorks && <HowItWorksModal isOpen={showHowItWorks} onClose={() => setShowHowItWorks(false)} onOrderKit={() => { setShowHowItWorks(false); openKitForm(PLANES_DATA[0]); }} />}
      {showNutriTips && <NutritionLab isOpen={showNutriTips} onClose={() => setShowNutriTips(false)} />}
      {activeReportDetail && <ReportModal isOpen={!!activeReportDetail} onClose={() => setActiveReportDetail(null)} report={activeReportDetail} onSelect={() => { setActiveReportDetail(null); scrollToSection('planes'); }} />}
      {showEpigeneticsInfo && <EpigeneticsModal isOpen={showEpigeneticsInfo} onClose={() => setShowEpigeneticsInfo(false)} onSelectScienceDoc={(doc) => setSelectedScienceDoc(doc)} />}
      {selectedScienceDoc && <ScienceModal isOpen={!!selectedScienceDoc} onClose={() => setSelectedScienceDoc(null)} data={selectedScienceDoc} />}
      {selectedPlanForDetail && <PlanDetailModal isOpen={!!selectedPlanForDetail} onClose={() => setSelectedPlanForDetail(null)} planId={selectedPlanForDetail} />}
      {showLabsModal && <GennovaLabsModal isOpen={showLabsModal} onClose={() => setShowLabsModal(false)} />}
      {showQuiz && <QuizModal isOpen={showQuiz} onClose={() => setShowQuiz(false)} onPlanRecommend={handleQuizRecommendation} />}
      {activeFooterLink && <FooterContentModal contentKey={activeFooterLink} onClose={() => setActiveFooterLink(null)} />}
      {showRespuestasCiencia && <RespuestasCienciaModal isOpen={showRespuestasCiencia} onClose={() => setShowRespuestasCiencia(false)} />}
      {showContact && <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />}
      <BioQuizSlideIn onTakeQuiz={() => setShowQuiz(true)} />
      <FloatingWhatsAppButton />
    </div>
  );
};

export default MainApp;
