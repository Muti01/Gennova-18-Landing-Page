
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
import { 
  HeroWidescreen, 
  InvisibleCellUniverse, 
  ScienceCertifications, 
  BiomarkersConstellation, 
  FollicularTimeline, 
  SDriveSimulatorSection,
  PreventiveWellnessDisclaimer
} from './components/LandingRebrandComponents';
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
import InstruccionesModal from './components/InstruccionesModal';
import WhyGennova from './components/WhyGennova';
import GennovaStaff from './components/GennovaStaff';
import ContactModal from './components/ContactModal';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton';
import { 
  Menu, X, ChevronLeft, ChevronRight, User as UserIcon, ArrowRight, Heart, Zap, Activity, Hourglass, Baby, Sprout, Target, Microscope, Sparkles, Cpu, Gem, Users, Instagram, Linkedin, Facebook, Twitter, FileText, CheckCircle2, ShieldCheck, Check, Smartphone, BarChart3, Fingerprint, Package, Dna, BrainCircuit, TrendingUp, ScanLine, Phone
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
    title: 'Más Energía Celular', 
    subtitle: 'Energía Real',
    description: 'Una visión integral del estado actual de tus células. Descubre cómo potenciar tu vitalidad diaria desde el núcleo celular.',
    problem: 'Sientes fatiga constante, falta de concentración o que tu rendimiento diario ya no es el mismo.',
    science: 'Análisis de bio-resonancia de Cell Wellbeing para mapear tu potencial energético mitocondrial.',
    benefit: 'Sabrás qué micronutrientes necesitas para reactivar tu energía física y mental de forma natural.',
    targetAudience: 'Miembros que desean eliminar el cansancio y recuperar el control sobre su rendimiento diario.',
    indicators: ['Vitalidad Activa', 'Claridad Mental', 'Nutrición Mitocondrial', 'Células Despiertas'],
    telemetry: generateFullTelemetry(["Energía Metabólica", "Defensas", "Digestión", "Corazón"]),
    color: 'text-gennova-cyan',
    icon: Heart
  },
  { 
    id: 'sport', 
    title: 'Rendimiento Deportivo', 
    subtitle: 'Fuerza y Recuperación',
    description: 'Entrena con precisión biológica. Maximiza tu potencia celular, acelera tu recuperación y previene el desgaste oxidativo.',
    problem: 'Sientes estancamiento físico, entrenas demasiado sin progresar o sufres fatiga muscular excesiva.',
    science: 'Evaluaciones avanzadas Epixlife orientadas a la optimización metabólica aplicable al ejercicio.',
    benefit: 'Consigue mejores marcas físicas guiando tu alimentación y descanso según tus necesidades biológicas reales.',
    targetAudience: 'Deportistas y personas activas que buscan optimizar su recuperación post-esfuerzo.',
    indicators: ['Potencia Celular', 'Recuperación Veloz', 'Menos Inflamación', 'Músculos Inteligentes'],
    telemetry: generateFullTelemetry(["Energía Metabólica", "Corazón", "Músculos", "Antioxidantes"]),
    color: 'text-gennova-success',
    icon: Zap
  },
  { 
    id: 'slim', 
    title: 'Peso Saludable & Digestión', 
    subtitle: 'Metabolismo Activo',
    description: 'Desbloquea tu peso ideal optimizando tu biometabolismo secundario y armonizando la asimilación digestiva.',
    problem: 'Sometes tu cuerpo a dietas restrictivas sin cambios reales en tu inflamación o peso corporal.',
    science: 'Identificación de factores epigenéticos y toxinas que ralentizan tus procesos de quema energética.',
    benefit: 'Activa un metabolismo limpio con un protocolo nutricional personalizado a tu absorción celular.',
    targetAudience: 'Personas que buscan desinflamar su organismo y alcanzar un balance de peso duradero.',
    indicators: ['Peso Sostenible', 'Azúcar Estable', 'Cero Digestión Pesada', 'Metabolismo Limpio'],
    telemetry: generateFullTelemetry(["Energía Metabólica", "Digestión", "Químicos Comunes", "Grasas Buenas"]),
    color: 'text-rose-400',
    icon: Activity
  },
  { 
    id: 'age', 
    title: 'Longevidad Activa', 
    subtitle: 'Evolución Celular',
    description: 'Protege tu ADN celular y retarda el desgaste de tus sistemas biológicos para mantenerte vital a través de los años.',
    problem: 'Te preocupa el desgaste prematuro, la pérdida gradual de vitalidad o desbalances a futuro.',
    science: 'Mapeo de antioxidación y protectores de ADN validados bajo rigurosos estándares biotecnológicos.',
    benefit: 'Aplica biohacking celular dirigido para resguardar tu bienestar y mantener activos tus sistemas clave.',
    targetAudience: 'Adultos maduros enfocados en vivir con plenitud, lucidez y vigor prolongado.',
    indicators: ['Protección ADN', 'Balance Hormonal', 'Piel Radiante', 'Células Jóvenes'],
    telemetry: generateFullTelemetry(["Antioxidantes", "Energía Metabólica", "Tóxicos Ambientales", "Minerales"]),
    color: 'text-gennova-violet',
    icon: Hourglass
  },
  { 
    id: 'vegan', 
    title: 'Bienestar Integral', 
    subtitle: 'Nutrición y Balance',
    description: 'Lleva tu alimentación a un nivel de eficiencia biológica óptima, asegurando balances minerales impecables.',
    problem: 'Incomodidad por posibles faltas de asimilación o buscando un nivel de bienestar limpio de toxinas de origen.',
    science: 'Mapeo metabólico de la absorción de nutrientes críticos y eficiencia de metilación.',
    benefit: 'Un mapa preciso para maximizar tu vitalidad cotidiana basándote en tu perfil biológico actual.',
    targetAudience: 'Personas interesadas en máxima pureza nutricional y eficiencia metabólica continua.',
    indicators: ['Síntesis B12', 'Metilación Folatos', 'Energía Vegetal', 'Minerales Cruciales'],
    telemetry: generateFullTelemetry(["Vitaminas", "Minerales", "Digestión", "Protección ADN"]),
    color: 'text-emerald-400',
    icon: Sprout
  },
  { 
    id: 'kids', 
    title: 'Mejor Descanso & Regulación', 
    subtitle: 'Descanso Profundo',
    description: 'Identifica los factores de estrés físico e interferencias invisibles que interrumpen tu sueño y descanso restaurador.',
    problem: 'Sufres de insomnio o mala calidad de sueño y te despiertas con cansancio y falta de claridad.',
    science: 'Mapeo biológico de ritmos circadianos, asimilación de magnesio y carga de contaminación electromagnética.',
    benefit: 'Alinea tus biorritmos con recomendaciones prácticas para crear un santuario de descanso en tu hogar.',
    targetAudience: 'Miembros bajo estrés constante que necesitan un descanso reparador y equilibrado.',
    indicators: ['Sueño Sólido', 'Ritmo Regulado', 'Foco Reparado', 'Cero Interrupción'],
    telemetry: generateFullTelemetry(["Bacterias Amigas", "Sensibilidad Comida", "Radiación Electrónica", "Vitaminas"]),
    color: 'text-gennova-gold',
    icon: BrainCircuit
  }
];

const PLANES_DATA = [
  {
    id: 'start',
    name: 'BIO-ESENCIAL',
    description: 'Claridad biológica inmediata. Tu primer paso hacia la longevidad.',
    price: '729',
    features: [
      '1 Evaluación Epigenética Completa / Epixlife',
      'Mapeo de 12 Sistemas Clave Biológicos',
      'Sesión de Interpretación de resultados con especialista (Coach 90 Minutos)',
      'Plan Epi Nutrimental x 30 días (Biohacks incl.)',
      'Acceso a Genn Coach AI x 30 días (Muy Pronto)'
    ]
  },
  {
    id: 'plus',
    name: 'BIO-EVOLUCIÓN',
    description: 'Evolución guiada. Mide el impacto real de tu transformación.',
    price: '1,299',
    features: [
      'Todo lo incluido en el Plan BIO-ESENCIAL',
      'Plan Epi Nutrimental x 60 días',
      '1 Sesión con Especialista (Bióloga o Trofóloga)',
      'Acceso a Genn Coach AI x 60 días (Muy Pronto)'
    ]
  },
  {
    id: 'elite',
    name: 'BIO-ELITE',
    description: 'Control absoluto. La máxima expresión de bio-optimización.',
    price: '2,599',
    features: [
      'Todo lo incluido en el Plan BIO-EVOLUCIÓN',
      '2 Evaluaciones Epigenéticas Completas / Epixlife',
      'Plan Epi Nutrimental x 90 días',
      '3 Sesiones con el Staff Completo de Expertos',
      'Acceso a Genn Coach AI x 90 días (Muy Pronto)'
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
        <div className="absolute bottom-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/5 text-[10px] font-mono font-bold text-gray-800 uppercase tracking-widest flex items-center gap-2 animate-fade-in-up">
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
  const [showWhyGennova, setShowWhyGennova] = useState(false);
  const [showStaff, setShowStaff] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeReportDetail, setActiveReportDetail] = useState<ReportDetail | null>(null);
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [selectedScienceDoc, setSelectedScienceDoc] = useState<ScienceData | null>(null);
  const [selectedPlanForDetail, setSelectedPlanForDetail] = useState<string | null>(null);
  const [activeFooterLink, setActiveFooterLink] = useState<string | null>(null);
  const [showContact, setShowContact] = useState(false);
  const [showInstrucciones, setShowInstrucciones] = useState(false);

  // Brand Rebrand Landing Interactive States
  const [activeUniqueBio, setActiveUniqueBio] = useState<'mateo' | 'sofia' | 'juan'>('mateo');
  const [keynoteStep, setKeynoteStep] = useState<'confusion' | 'comprension' | 'claridad'>('confusion');
  const [activeAcompamiento, setActiveAcompamiento] = useState<'esencial' | 'evolucion' | 'elite'>('esencial');
  const [coachSimPrompt, setCoachSimPrompt] = useState<number | null>(null);
  const [hoveredCert, setHoveredCert] = useState<string | null>(null);
  const [selectedBiomarkerCategory, setSelectedBiomarkerCategory] = useState<'vitamins' | 'minerals' | 'systems' | 'environment'>('vitamins');
  const [selectedBioConst, setSelectedBioConst] = useState<string | null>("Vitamin D3");
  
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
    <div className="min-h-screen bg-gennova-main text-[#1C1917] font-sans selection:bg-gennova-gold selection:text-black overflow-x-hidden">
      
      {/* --- FLOATING EXQUISITE NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-stone-200/80 transition-all duration-300 shadow-sm">
        <div className="w-full px-6 md:px-12">
            <div className="flex justify-between items-center h-20 relative">
                
                {/* 1. BRAND MARCA */}
                <div className="flex items-center gap-4 cursor-pointer group" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
                    <AnimatedGLogo className="w-10 h-10" />
                    <span className="text-2xl font-serif font-bold text-stone-900 tracking-widest hover:text-[#009E9E] transition-colors leading-none">GENNOVA</span>
                </div>
                
                {/* 2. CENTRO: MENÚ NAVEGACIÓN */}
                <div className="hidden lg:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[9px] uppercase tracking-[0.25em] text-stone-500 font-bold">
                    <a href="#concepto" className="hover:text-stone-900 transition">Lo Invisible</a>
                    <a href="#ciencia" className="hover:text-stone-900 transition">Ciencia Epigenética</a>
                    <a href="#biomercadores" className="hover:text-stone-900 transition">Mapeo Celular</a>
                    <a href="#proceso" className="hover:text-stone-900 transition">Procedimiento</a>
                    <a href="#s-drive-simulador" className="hover:text-stone-900 transition">Simulador S-Drive</a>
                </div>

                {/* 3. ACCIONES PREMIUM */}
                <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setShowQuiz(true)} 
                      className="hidden sm:inline-flex px-5 py-2.5 rounded-full border border-[#C5A862]/60 text-[#C5A862] font-bold text-[10px] uppercase font-mono tracking-wider hover:bg-[#C5A862] hover:text-white hover:border-[#C5A862] transition-all duration-300"
                    >
                      Bio-Quiz
                    </button>
                    
                    <a 
                      href="https://wa.me/51932818432?text=Hola%20Gennova%2C%20me%20gustar%C3%ADa%20agendar%20una%20cita%20o%20consultar%20sobre%20el%20procedimiento%20de%20evaluaci%C3%B3n%20epigen%C3%A9tica%20para%20optimizar%20mi%20biolog%C3%ADa."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full bg-[#009E9E] text-white font-bold text-[10px] uppercase font-mono tracking-wider hover:bg-[#C5A862] transition-all duration-300 shadow-md shadow-[#009E9E]/10 flex items-center gap-2"
                    >
                      <Phone size={10} className="fill-current" />
                      Agendar Cita
                    </a>
                    
                    <button 
                      className="lg:hidden text-stone-800 hover:text-stone-900" 
                      onClick={() => setShowContact(true)}
                    >
                      <Menu size={20} />
                    </button>
                </div>
            </div>
        </div>
      </nav>

      {/* --- RENDER SPECIFIC REBRANDED INFORMATIVE SECTIONS --- */}
      <HeroWidescreen onStartQuiz={() => setShowQuiz(true)} />
      <InvisibleCellUniverse />
      <ScienceCertifications />
      <BiomarkersConstellation />
      <FollicularTimeline onOpenHowItWorks={() => setShowHowItWorks(true)} />
      <SDriveSimulatorSection />
      <PreventiveWellnessDisclaimer />



















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
                        <li><button onClick={() => setShowInstrucciones(true)} className="hover:text-white transition text-left">Instrucciones</button></li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-16 border-t border-white/5 pt-16">
                <div className="space-y-8 max-w-xl">
                    <div className="flex items-center gap-4 group">
                        <AnimatedGLogo className="w-14 h-14" />
                        <span className="text-4xl font-serif font-bold text-white tracking-tighter group-hover:text-gennova-gold transition-colors">GENNOVA</span>
                    </div>
                    <p className="text-gray-500 text-sm font-light leading-relaxed font-sans">
                        Nuestra misión en Gennova es desbloquear el rendimiento humano y la longevidad mediante la decodificación epigenética precisa. Ayudamos a personas excepcionales a tomar el control de su propia biología.
                    </p>
                    <div className="flex gap-6 pt-4">
                        <a href="https://www.instagram.com/gennova.pe/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gennova-gold transition-colors duration-300"><Instagram size={20} /></a>
                        <a href="https://www.linkedin.com/company/gennova-ia/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gennova-gold transition-colors duration-300"><Linkedin size={20} /></a>
                        <a href="https://www.facebook.com/profile.php?id=61575113528390" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gennova-gold transition-colors duration-300"><Facebook size={20} /></a>
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
      {showWhyGennova && <WhyGennova isOpen={showWhyGennova} onClose={() => setShowWhyGennova(false)} onStart={() => { setShowWhyGennova(false); scrollToSection('planes'); }} />}
      {showStaff && <GennovaStaff isOpen={showStaff} onClose={() => setShowStaff(false)} onStart={() => { setShowStaff(false); setShowLabsModal(true); }} />}
      {showRespuestasCiencia && <RespuestasCienciaModal isOpen={showRespuestasCiencia} onClose={() => setShowRespuestasCiencia(false)} />}
      {showContact && <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />}
      {showInstrucciones && <InstruccionesModal isOpen={showInstrucciones} onClose={() => setShowInstrucciones(false)} />}
      <BioQuizSlideIn onTakeQuiz={() => setShowQuiz(true)} />
      <FloatingWhatsAppButton />
    </div>
  );
};

export default MainApp;
