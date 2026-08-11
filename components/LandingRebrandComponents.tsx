import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Fingerprint, Activity, Zap, Sprout, Heart, BrainCircuit, Hourglass, 
  ArrowRight, ShieldCheck, Cpu, Database, Flame, Smile, Layers, HelpCircle, AlertCircle, Check, HelpCircle as HelpIcon, Phone, Settings
} from 'lucide-react';

// --- TS INTERFACES ---
interface SectionProps {
  onStartQuiz: () => void;
  onSelectPlan: (planId: string) => void;
  onOpenHowItWorks: () => void;
  onContact: () => void;
}

// --- SECCIÓN 1: HERO ---
export const HeroWidescreen: React.FC<{ onStartQuiz: () => void }> = ({ onStartQuiz }) => {
  return (
    <section id="hero" className="relative h-screen bg-[#FAFAF9] overflow-hidden flex flex-col justify-center px-4 md:px-12 pt-20">
      {/* Container aspect-ratio 21:9 para la imagen principal */}
      <div className="w-full h-[85vh] max-w-7xl mx-auto rounded-[2rem] overflow-hidden border border-stone-200 relative group bg-[#FAFAF9] shadow-[0_30px_100px_rgba(0,0,0,0.06)]">
        {/* Cinematic background image - High-Fidelity Active Wellness & Precision Health */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2000&auto=format&fit=crop" 
            alt="High-Fidelity active wellness, precision health, and luxury longevity" 
            className="w-full h-full object-cover opacity-[0.7] scale-100 group-hover:scale-105 transition-transform duration-[12000ms] ease-out select-none"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-900/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-transparent to-stone-900/30"></div>
        </div>

        {/* Floating golden and turquoise ambient glow elements */}
        <div className="absolute top-1/4 left-1/3 w-40 h-40 bg-[#009E9E]/10 rounded-full blur-[90px] animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-[#C5A862]/8 rounded-full blur-[110px] animate-pulse"></div>

        {/* Dynamic Biometric Cyber-HUD (Señales Biológicas del Cuerpo) */}
        <div className="absolute top-8 right-8 z-30 hidden lg:flex flex-col gap-3 max-w-xs p-6 bg-white/95 backdrop-blur-xl rounded-2xl border border-stone-200/80 shadow-xl">
          <div className="flex items-center justify-between border-b border-stone-100 pb-2">
            <div className="flex items-center gap-2">
              <Fingerprint size={14} className="text-[#009E9E]" />
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-stone-700">BIOMETRÍA EN VIVO</span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-[#009E9E] animate-pulse"></span>
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-[9px] font-mono text-stone-500 mb-1">
                <span>VITALIDAD MITOCONDRIAL</span>
                <span className="text-[#009E9E] font-bold">98.5%</span>
              </div>
              <div className="w-full h-[3px] bg-stone-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "98.5%" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-[#009E9E] to-[#C5A862]"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[9px] font-mono text-stone-500 mb-1">
                <span>ESTRÉS EXTRACELULAR</span>
                <span className="text-stone-800 font-bold">12.4% (BAJO)</span>
              </div>
              <div className="w-full h-[3px] bg-stone-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "12.4%" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-emerald-600"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[9px] font-mono text-stone-500 mb-1">
                <span>ASIMILACIÓN MINERAL</span>
                <span className="text-[#C5A862] font-bold">ÓPTIMA</span>
              </div>
              <div className="w-full h-[3px] bg-stone-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "85%" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-[#C5A862]"
                />
              </div>
            </div>
          </div>

          <div className="text-[8px] font-mono text-stone-400 uppercase tracking-widest text-center mt-1 border-t border-stone-100 pt-2">
            Mapeo Epigenético Activo x5 Hebras
          </div>
        </div>

        {/* DNA subtle outline animations */}
        <div className="absolute inset-0 pointer-events-none z-10 opacity-30">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* Animated wave path representations of DNA */}
            <motion.path 
              d="M0 300 Q150 250 300 300 T600 300 T900 300 T1200 300 T1500 300"
              fill="none" 
              stroke="#00D8D8" 
              strokeWidth="1.5"
              strokeDasharray="8,8"
              animate={{ strokeDashoffset: [0, -40] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 8 }}
            />
            <motion.path 
              d="M0 305 Q150 355 300 305 T600 305 T900 305 T1200 305 T1500 305"
              fill="none" 
              stroke="#D8B56A" 
              strokeWidth="1"
              strokeDasharray="6,6"
              animate={{ strokeDashoffset: [0, 40] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 10 }}
            />
          </svg>
        </div>

        {/* Hero Narrative Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 z-20 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900/40 backdrop-blur-md border border-white/10 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#009E9E] animate-ping"></span>
              <span className="text-[9px] md:text-[10px] font-mono tracking-[0.4em] uppercase text-[#F8F8F8]">BIOLOGÍA DE PRECISIÓN</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-6xl md:text-7xl font-serif text-white leading-[1.05] tracking-tight mb-6"
            >
              Tu cuerpo está hablando.<br />
              <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#C5A862] via-[#F8F8F8] to-[#00D8D8]">
                Por primera vez puedes escucharlo.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-white/90 text-base md:text-xl font-light leading-relaxed max-w-2xl mb-10 font-sans"
            >
              Miles de decisiones ocurren dentro de ti cada segundo. Tu energía, descanso, enfoque y bienestar son el resultado de cómo responde tu biología a tu estilo de vida. Gennova te ayuda a comprender esas respuestas.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <button 
                onClick={onStartQuiz}
                className="group relative px-8 py-4 rounded-full overflow-hidden bg-[#00D8D8] text-black font-semibold text-xs tracking-[0.2em] uppercase hover:bg-[#C5A862] hover:text-white transition-all duration-300 shadow-xl shadow-[#009E9E]/20 flex items-center justify-center gap-3"
              >
                <span>Descubrir mi biología (Quiz)</span>
                <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
              </button>

              <a 
                href="https://wa.me/51932818432?text=Hola%20Gennova%2C%20me%20gustar%C3%ADa%20agendar%20una%20cita%20o%20consultar%20sobre%20el%20procedimiento%20de%20evaluaci%C3%B3n%20epigen%C3%A9tica%20para%20optimizar%20mi%20biolog%C3%ADa."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/40 text-white font-mono text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-stone-900 hover:border-white transition-all duration-300"
              >
                <Phone size={14} className="fill-current" />
                Agendar por WhatsApp
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- SECCIÓN 2: LO QUE NO PUEDES VER TAMBIÉN IMPORTA ---
export const InvisibleCellUniverse: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [dnaAngle, setDnaAngle] = useState<number>(0);

  // Default Google Drive IDs matching chronological order
  const DEFAULT_DRIVE_IDS: Record<string, string> = {
    immune: '1ghIzE2ixToe_CRzvkN0Qwl4jS1RmD08K',
    cardiovascular: '1_rDe15__9j0yz6Ptpyo7PItzqM32bdY-',
    gastrointestinal: '1uMPtRCjPwJt0P8t1B3WNlylbcnSXJe0G',
    cerebral: '1amYqDt3lxpIYIfrsQafAw8bPijVHG4na',
    microbiome: '1Y9FmgW7SIRmIwzHUGI96K0igEDfsL7ks',
    vitamins: '1vskadXl8Nf983LTW4sfuD0nrQyeFmyzS',
    minerals: '1D2T54iLyaUfZq5QhaY_DQcKLw-kR9kRJ',
    aminoacids: '1pN88Git57AkPcirpXbzkKQzY_uQKkQM2',
    antioxidants: '1JF3GFIMII8DOW8XX7iJh2Gzy4yvHPcvz',
    fattyacids: '',
    allergies: '',
    heavymetals: ''
  };

  const DRIVE_CATALOG = [
    { id: '', label: 'Original (Imagen Unsplash de Alta Definición)' },
    { id: '1ghIzE2ixToe_CRzvkN0Qwl4jS1RmD08K', label: 'Silueta Inmune (Rayo de luz protector)' },
    { id: '1_rDe15__9j0yz6Ptpyo7PItzqM32bdY-', label: 'Cardiovascular 3D (Corazón y arterias)' },
    { id: '1uMPtRCjPwJt0P8t1B3WNlylbcnSXJe0G', label: 'Gastrointestinal (Figura y sistema intestinal)' },
    { id: '1amYqDt3lxpIYIfrsQafAw8bPijVHG4na', label: 'Cerebral (Resistencia neural y foco)' },
    { id: '1Y9FmgW7SIRmIwzHUGI96K0igEDfsL7ks', label: 'Microbiota & Microbioma (Bacterias)' },
    { id: '1vskadXl8Nf983LTW4sfuD0nrQyeFmyzS', label: 'Vitaminas (Reserva metabólica)' },
    { id: '1D2T54iLyaUfZq5QhaY_DQcKLw-kR9kRJ', label: 'Minerales (Conducción eléctrica)' },
    { id: '1pN88Git57AkPcirpXbzkKQzY_uQKkQM2', label: 'Aminoácidos (Bloques de construcción)' },
    { id: '1JF3GFIMII8DOW8XX7iJh2Gzy4yvHPcvz', label: 'Antioxidantes (Escudo protector)' }
  ];

  const [imageMappings, setImageMappings] = useState<Record<string, string>>(() => {
    const stored = localStorage.getItem('gennova_image_mappings');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {}
    }
    return DEFAULT_DRIVE_IDS;
  });

  const [showConfigModal, setShowConfigModal] = useState<boolean>(false);

  const systems = [
    {
      id: 'immune',
      name: 'Sistema Inmune',
      tagline: 'DEFENSA BIOLÓGICA & INMUNIDAD',
      image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=1200&auto=format&fit=crop',
      color: '#00D8D8',
      metric: 'Índice de Resiliencia: 88%',
      details: 'Mapea tu capacidad inmunológica y de defensa celular frente a bacterias, virus y estresores ambientales para prevenir inflamaciones crónicas silenciosas.',
      biomarkers: ['Barrera Mucosa Epitelial', 'Capacidad Enzimática de Defensa', 'Inmunoglobulinas Activas'],
      icon: ShieldCheck
    },
    {
      id: 'cardiovascular',
      name: 'Sistema Cardiovascular',
      tagline: 'FLUJO VITAL & TRANSPORTE',
      image: 'https://images.unsplash.com/photo-1505151828126-6e3e506d860e?q=80&w=1200&auto=format&fit=crop',
      color: '#EF4444',
      metric: 'Elasticidad Vascular: 94%',
      details: 'Evalúa la elasticidad de tus micro-capilares sanguíneos, regulando la oxigenación celular y la correcta distribución de nutrientes esenciales.',
      biomarkers: ['Elasticidad Capilar', 'Balance Omega-3 / Omega-6', 'Presión de Oxígeno Tisular'],
      icon: Heart
    },
    {
      id: 'gastrointestinal',
      name: 'Sistema Gastrointestinal',
      tagline: 'DIGESTIÓN ENZIMÁTICA & INTEGRIDAD',
      image: 'https://images.unsplash.com/photo-1613243555988-441166d4d6fd?q=80&w=1200&auto=format&fit=crop',
      color: '#10B981',
      metric: 'Asimilación Nutricional: 82%',
      details: 'Identifica la eficacia en la digestión de péptidos y la absorción de nutrientes esenciales, detectando si la barrera intestinal presenta microinflamación.',
      biomarkers: ['Asimilación Proteica', 'Acidez Gástrica Funcional', 'Integridad de la Mucosa'],
      icon: Flame
    },
    {
      id: 'cerebral',
      name: 'Sistema Cerebral',
      tagline: 'VIGILANCIA COGNITIVA & SUEÑO',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop',
      color: '#D8B56A',
      metric: 'Foco & Claridad: 79%',
      details: 'Mide la adaptabilidad del sistema nervioso autonómico, el nivel de fatiga cerebral y la profundidad del sueño regenerativo delta.',
      biomarkers: ['Resistencia al Estrés Neural', 'Regeneración Nocturna', 'Foco Cognitivo Activo'],
      icon: BrainCircuit
    },
    {
      id: 'microbiome',
      name: 'Microbiota & Microbioma',
      tagline: 'SIMBIOSIS BACTERIANA INTEGRAL',
      image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=1200&auto=format&fit=crop',
      color: '#8B5CF6',
      metric: 'Diversidad Bacteriana: 85%',
      details: 'Analiza el equilibrio del ecosistema de bacterias aliadas y levaduras que comandan la síntesis de serotonina y el 70% de tu inmunidad.',
      biomarkers: ['Poblaciones Probióticas', 'Control de Levaduras/Cándidas', 'Biodiversidad de la Flora'],
      icon: Database
    },
    {
      id: 'vitamins',
      name: 'Vitaminas',
      tagline: 'RESERVA & ABSORCIÓN COENZIMÁTICA',
      image: 'https://images.unsplash.com/photo-1616671289311-dfabfa27c52d?q=80&w=1200&auto=format&fit=crop',
      color: '#F59E0B',
      metric: 'Eficiencia Metabólica: 91%',
      details: 'Establece el aprovechamiento real a nivel mitocondrial de las vitaminas esenciales (como el Complejo B metilado y D3) indispensables para generar energía.',
      biomarkers: ['Metilación (Fólico/B12)', 'Captación de Vitamina D3', 'Ácido Ascórbico Celular'],
      icon: Zap
    },
    {
      id: 'minerals',
      name: 'Minerales',
      tagline: 'CONDUCCIÓN ELÉCTRICA & EQUILIBRIO',
      image: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?q=80&w=1200&auto=format&fit=crop',
      color: '#06B6D4',
      metric: 'Saturación Electrolítica: 87%',
      details: 'Evalúa las reservas de minerales intracelulares de alta conductividad encargados de la relajación muscular, cardíaca y la transmisión de impulsos.',
      biomarkers: ['Magnesio Intracelular', 'Zinc Enzimático Activo', 'Relación Sodio / Potasio'],
      icon: Layers
    },
    {
      id: 'aminoacids',
      name: 'Aminoácidos',
      tagline: 'ESTRUCTURA & SÍNTESIS DE PROTEÍNAS',
      image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=1200&auto=format&fit=crop',
      color: '#EC4899',
      metric: 'Tasa de Síntesis: 84%',
      details: 'Mapea la disponibilidad de los 7 aminoácidos fundamentales que actúan como bloques de construcción indispensables para tejidos orgánicos, hormonas y síntesis de neurotransmisores.',
      biomarkers: ['Aminoácidos Esenciales', 'Precursores de Neurotransmisores', 'Soporte de Recuperación Muscular'],
      icon: Cpu
    },
    {
      id: 'antioxidants',
      name: 'Antioxidantes',
      tagline: 'ESCUDO CONTRA EL ENVEJECIMIENTO',
      image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1200&auto=format&fit=crop',
      color: '#F43F5E',
      metric: 'Protección Oxidativa: 89%',
      details: 'Establece tu nivel de defensa activa contra radicales libres, contaminantes ambientales y el estrés de pantallas, deteniendo el desgaste del ADN celular.',
      biomarkers: ['Súperoxido Dismutasa', 'Eficacia de Catalasa', 'Reservas de Glutatión'],
      icon: Sparkles
    },
    {
      id: 'fattyacids',
      name: 'Ácidos Grasos',
      tagline: 'FLEXIBILIDAD DE MEMBRANA CELULAR',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1200&auto=format&fit=crop',
      color: '#EAB308',
      metric: 'Permeabilidad Membranosa: 92%',
      details: 'Evalúa la proporción ideal entre Omega-3 y Omega-6. Un balance óptimo flexibiliza las membranas celulares, facilitando la asimilación de micronutrientes esenciales.',
      biomarkers: ['Ácidos Grasos Esenciales', 'Lípidos de Membrana', 'Índice de Anti-inflamación'],
      icon: Activity
    },
    {
      id: 'allergies',
      name: 'Sensibilidades Alimentarias',
      tagline: 'DETECCIÓN DE RESPUESTAS SILENCIOSAS',
      image: 'https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?q=80&w=1200&auto=format&fit=crop',
      color: '#A855F7',
      metric: 'Nivel Inflamatorio: Muy Bajo',
      details: 'Identifica sensibilidades latentes del organismo a ciertos alimentos comunes que podrían estar provocando inflamaciones digestivas o letargo cognitivo sin ser detectados por pruebas tradicionales.',
      biomarkers: ['Sensibilidad al Gluten/Lácteos', 'Resonancia Alergénica', 'Tolerancia de Histamina'],
      icon: AlertCircle
    },
    {
      id: 'heavymetals',
      name: 'Metales Pesados',
      tagline: 'DETOXIFICACIÓN & CARGA AMBIENTAL',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
      color: '#6B7280',
      metric: 'Pureza Tisular: 96%',
      details: 'Mide la acumulación de metales pesados y toxinas industriales (plomo, mercurio, aluminio) en tu bulbo capilar para estructurar protocolos de detoxificación celular de precisión.',
      biomarkers: ['Acumulación de Plomo/Mercurio', 'Eficiencia de Quelación', 'Metales de Transición'],
      icon: Layers
    }
  ];

  const mappedSystems = systems.map(sys => {
    const driveId = imageMappings[sys.id];
    const imageUrl = driveId 
      ? `https://lh3.googleusercontent.com/d/${driveId}` 
      : sys.image;
    return { ...sys, image: imageUrl };
  });

  const currentSystem = mappedSystems[activeIndex];

  const handleUpdateMapping = (systemId: string, driveId: string) => {
    const updated = { ...imageMappings, [systemId]: driveId };
    setImageMappings(updated);
    localStorage.setItem('gennova_image_mappings', JSON.stringify(updated));
  };

  const handleResetMappings = () => {
    setImageMappings(DEFAULT_DRIVE_IDS);
    localStorage.setItem('gennova_image_mappings', JSON.stringify(DEFAULT_DRIVE_IDS));
  };

  const handleClearAllMappings = () => {
    const cleared = {
      immune: '', cardiovascular: '', gastrointestinal: '', cerebral: '',
      microbiome: '', vitamins: '', minerals: '', aminoacids: '',
      antioxidants: '', fattyacids: '', allergies: '', heavymetals: ''
    };
    setImageMappings(cleared);
    localStorage.setItem('gennova_image_mappings', JSON.stringify(cleared));
  };

  // Auto-play interval
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % mappedSystems.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPlaying, mappedSystems.length]);

  // DNA 3D Simulation Angle Loop
  useEffect(() => {
    let animationFrameId: number;
    const updateDna = () => {
      setDnaAngle((prev) => (prev + 0.02) % (2 * Math.PI));
      animationFrameId = requestAnimationFrame(updateDna);
    };
    animationFrameId = requestAnimationFrame(updateDna);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handlePrev = () => {
    setIsPlaying(false);
    setActiveIndex((prev) => (prev === 0 ? mappedSystems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsPlaying(false);
    setActiveIndex((prev) => (prev + 1) % mappedSystems.length);
  };

  // Generate 12 elegant rungs for the 3D double helix overlay
  const renderDnaHelix = () => {
    const rungs = [];
    const height = 320;
    const spacing = height / 14;
    const width = 120;
    const cx = width / 2;

    for (let i = 0; i < 14; i++) {
      const y = 15 + i * spacing;
      // Calculate phase shift for rotation
      const theta = dnaAngle + i * 0.45;
      const cosVal = Math.cos(theta);
      const sinVal = Math.sin(theta);

      // Map 3D projection coordinates
      const xLeft = cx + 42 * cosVal;
      const xRight = cx - 42 * cosVal;

      // Color intensity based on depth (sinVal representing z-depth)
      const isForegroundLeft = sinVal > 0;
      const isForegroundRight = !isForegroundLeft;

      const rLeft = isForegroundLeft ? 5.5 : 3;
      const rRight = isForegroundRight ? 5.5 : 3;

      const opLeft = isForegroundLeft ? 1 : 0.4;
      const opRight = isForegroundRight ? 1 : 0.4;

      rungs.push(
        <g key={i} className="transition-all duration-300">
          {/* Connection rung line */}
          <line
            x1={xLeft}
            y1={y}
            x2={xRight}
            y2={y}
            stroke={currentSystem.color}
            strokeWidth={isForegroundLeft ? "2" : "0.8"}
            strokeOpacity={isForegroundLeft ? "0.7" : "0.3"}
          />
          {/* Left node */}
          <circle
            cx={xLeft}
            cy={y}
            r={rLeft}
            fill={currentSystem.color}
            fillOpacity={opLeft}
            stroke={isForegroundLeft ? "#FFFFFF" : "none"}
            strokeWidth="1"
          />
          {/* Right node */}
          <circle
            cx={xRight}
            cy={y}
            r={rRight}
            fill={currentSystem.color}
            fillOpacity={opRight}
            stroke={isForegroundRight ? "#FFFFFF" : "none"}
            strokeWidth="1"
          />
        </g>
      );
    }
    return rungs;
  };

  return (
    <section id="concepto" className="py-24 bg-[#FAF9F6] relative overflow-hidden px-4 md:px-12 border-t border-stone-200">
      {/* Absolute ambient lights */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#009E9E]/2 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#C5A862]/2 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        
        {/* Head of Section */}
        <div className="mb-16 text-center max-w-4xl mx-auto">
          <span className="text-[#C5A862] font-mono text-[10px] uppercase tracking-[0.5em] mb-4 block font-bold">
            TECNOLOGÍA DE ANÁLISIS CELULAR DE PRECISIÓN • 96 BIOMARCADORES
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-stone-900 mb-6 leading-[1.1] tracking-tight">
            Lo que no puedes ver<br/>
            <span className="italic text-[#009E9E]">también importa.</span>
          </h2>
          <p className="text-stone-600 font-sans text-sm md:text-base leading-relaxed font-light max-w-2xl mx-auto">
            Decodificamos tu bulbo capilar analizando con precisión <strong className="text-stone-900 font-semibold">96 biomarcadores celulares</strong> distribuidos en <strong className="text-stone-900 font-semibold">12 sistemas biológicos clave</strong>. Mapeamos desajustes y respuestas silenciosas antes de que se manifiesten físicamente.
          </p>
        </div>

        {/* Master Grid Slider Container */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: Luxurious CINEMATIC Full-Bleed Image/Copy Slide Overlay (7 columns) */}
          <div 
            className="lg:col-span-7 rounded-[2.5rem] overflow-hidden border border-stone-200 bg-stone-900 relative shadow-2xl min-h-[520px] md:min-h-[580px] flex flex-col justify-end p-6 md:p-10 group"
            onMouseEnter={() => setIsPlaying(false)}
            onMouseLeave={() => setIsPlaying(true)}
          >
            {/* Cinematic Slide Background Image with smooth crossfade */}
            <div className="absolute inset-0 z-0">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSystem.id}
                  src={currentSystem.image}
                  alt={currentSystem.name}
                  className="absolute inset-0 w-full h-full object-cover select-none"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 0.65, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.7 }}
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              
              {/* Luxury gradient overlay designed to keep typography readable with ultra-premium feel */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-stone-950/70 via-transparent to-transparent z-10"></div>
            </div>

            {/* Glowing Scan laser line sweep */}
            <div className="absolute top-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#009E9E]/70 to-transparent shadow-[0_0_12px_rgba(0,158,158,0.5)] animate-biometric-scan pointer-events-none z-20"></div>

            {/* 3D DOUBLE HELIX ROTATING SVG OVERLAY (Genuinely Simulated 3D in Real-Time) */}
            <div className="absolute top-12 right-6 md:right-10 z-20 bg-stone-950/75 backdrop-blur-md rounded-3xl border border-white/10 p-4 shadow-xl pointer-events-none hidden sm:flex flex-col items-center gap-2">
              <span className="text-[7.5px] font-mono text-stone-400 uppercase tracking-widest text-center">3D HELIX SCAN</span>
              <svg className="w-[120px] h-[350px] overflow-visible" viewBox="0 0 120 350">
                {renderDnaHelix()}
              </svg>
              <span className="text-[7px] font-mono text-[#009E9E] uppercase tracking-widest text-center animate-pulse">DNA ANALYZER</span>
            </div>

            {/* Overlaid UI Narrative & Statistics (Z-index 20) */}
            <div className="relative z-20 max-w-lg space-y-4">
              
              {/* Index counter & Tagline */}
              <div className="flex items-center gap-2">
                <span className="text-white/60 font-mono text-[10px] uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm border border-white/5">
                  MÓDULO {String(activeIndex + 1).padStart(2, '0')} / 12
                </span>
                <span className="text-[10px] font-mono tracking-[0.25em] font-bold" style={{ color: currentSystem.color }}>
                  {currentSystem.tagline}
                </span>
              </div>

              {/* Title & Diagnostic Rating */}
              <div className="space-y-1">
                <h3 className="text-3xl md:text-5xl font-serif text-white font-bold leading-tight">
                  {currentSystem.name}
                </h3>
                <div className="flex items-center gap-2 text-xs font-mono text-[#C5A862] font-semibold">
                  <Sparkles size={12} />
                  <span>{currentSystem.metric}</span>
                </div>
              </div>

              {/* Descriptive details */}
              <p className="text-stone-300 font-sans text-xs md:text-sm leading-relaxed font-light">
                {currentSystem.details}
              </p>

              {/* Associated biomarkers indicators */}
              <div className="pt-2">
                <span className="text-[8px] font-mono text-stone-400 uppercase tracking-[0.2em] block mb-2 font-bold">
                  BIOMARCADORES DETECTADOS EN REPORTE
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentSystem.biomarkers.map((bio, idx) => (
                    <span 
                      key={idx} 
                      className="text-[9px] font-sans text-white/90 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md backdrop-blur-sm flex items-center gap-1.5"
                    >
                      <span className="w-1 h-1 rounded-full" style={{ backgroundColor: currentSystem.color }}></span>
                      {bio}
                    </span>
                  ))}
                </div>
              </div>

              {/* Prev / Next & Autoplay indicators line */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                
                {/* Arrows */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handlePrev}
                    className="p-2.5 rounded-full border border-white/15 text-white/80 hover:text-white hover:bg-white/10 transition-colors bg-white/5 backdrop-blur-sm"
                    title="Anterior"
                  >
                    <motion.span whileTap={{ scale: 0.9 }} className="block">
                      <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                    </motion.span>
                  </button>
                  <button 
                    onClick={handleNext}
                    className="p-2.5 rounded-full border border-white/15 text-white/80 hover:text-white hover:bg-white/10 transition-colors bg-white/5 backdrop-blur-sm"
                    title="Siguiente"
                  >
                    <motion.span whileTap={{ scale: 0.9 }} className="block">
                      <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </motion.span>
                  </button>
                </div>

                {/* Progress bar representing slide auto rotation */}
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-white/50">
                    {isPlaying ? 'AUTO-EXPLORANDO' : 'PAUSADO'}
                  </span>
                  <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden relative">
                    {isPlaying && (
                      <motion.div 
                        key={activeIndex}
                        className="h-full bg-white rounded-full"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 7, ease: 'linear' }}
                      />
                    )}
                    {!isPlaying && (
                      <div className="h-full bg-white/30 rounded-full w-full" />
                    )}
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* RIGHT: High-Definition Scannable Selector Grid (5 columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between z-10 space-y-6">
            
            {/* Grid Header */}
            <div className="bg-white/50 backdrop-blur-md p-4 rounded-3xl border border-stone-200/80 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <span className="text-[8.5px] font-mono text-[#C5A862] uppercase tracking-[0.25em] block mb-1 font-bold">
                  PANEL DE INTEGRACIÓN GENNOVA • 96 BIOMARCADORES
                </span>
                <h3 className="text-stone-900 font-serif text-lg md:text-xl font-bold leading-tight">
                  Los 12 Sistemas Clave
                </h3>
                <p className="text-stone-500 font-sans text-xs mt-1 leading-relaxed font-light">
                  Haz clic en cualquier sistema para explorar cómo decodificamos cada uno de los 96 indicadores celulares integrales en tu reporte.
                </p>
              </div>
              <button
                onClick={() => setShowConfigModal(true)}
                className="self-start md:self-center px-4 py-2 bg-[#C5A862] text-white text-[10px] font-mono font-bold rounded-xl hover:bg-[#b09350] transition-all shadow-md flex items-center gap-1.5 shrink-0"
              >
                <Settings size={12} />
                <span>AJUSTAR FOTOS</span>
              </button>
            </div>

            {/* List of 12 Biomarkers with scrollbar and beautiful micro interactions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 max-h-[460px] overflow-y-auto pr-2 custom-scrollbar">
              {mappedSystems.map((sys, idx) => {
                const isActive = activeIndex === idx;
                const IconComponent = sys.icon;
                return (
                  <button
                    key={sys.id}
                    onClick={() => {
                      setIsPlaying(false);
                      setActiveIndex(idx);
                    }}
                    onMouseEnter={() => {
                      // Soft hover to trigger visualization on desktop but doesn't pause permanently
                      setActiveIndex(idx);
                    }}
                    className={`text-left relative p-3.5 rounded-2xl border transition-all duration-300 flex items-center gap-3.5 ${
                      isActive
                        ? 'bg-white border-stone-300 shadow-md translate-x-1.5'
                        : 'bg-[#FAFAF9] border-stone-200/60 hover:bg-white hover:border-stone-300 hover:translate-x-1'
                    }`}
                  >
                    {/* Color code dot side indicator */}
                    <div 
                      className="absolute left-0 top-1/4 bottom-1/4 w-1 rounded-r-md transition-all duration-300"
                      style={{ 
                        backgroundColor: sys.color, 
                        opacity: isActive ? 1 : 0,
                        boxShadow: isActive ? `0 0 10px ${sys.color}` : 'none'
                      }}
                    ></div>

                    {/* Compact Circle Icon */}
                    <div 
                      className="p-2.5 rounded-xl border transition-colors duration-300 flex-shrink-0"
                      style={{
                        backgroundColor: isActive ? `${sys.color}15` : 'rgba(230,225,220,0.25)',
                        borderColor: isActive ? `${sys.color}35` : 'rgba(230,225,220,0.5)',
                        color: isActive ? sys.color : '#6B7280'
                      }}
                    >
                      <IconComponent size={16} strokeWidth={1.8} />
                    </div>

                    {/* Body Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-xs md:text-sm font-serif font-bold text-stone-900 truncate">
                          {sys.name}
                        </h4>
                        <span className="text-[7.5px] font-mono text-stone-400 uppercase tracking-wider shrink-0 font-bold">
                          {isActive ? 'MOSTRANDO' : 'EXPLORAR'}
                        </span>
                      </div>
                      <p className="text-[10px] text-stone-500 font-sans leading-tight truncate font-light mt-0.5">
                        {sys.tagline.split('&')[0]}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Premium action Call To Action */}
            <div className="p-4 bg-[#FAF9F6] border border-stone-200 rounded-3xl flex items-center justify-between gap-4">
              <div className="min-w-0">
                <span className="text-[8px] font-mono text-stone-400 uppercase tracking-widest block font-bold">
                  ¿LISTO PARA TU ANÁLISIS?
                </span>
                <span className="text-xs text-stone-700 font-sans font-medium block truncate">
                  Kit Epigenético con envío nacional gratis.
                </span>
              </div>
              <a 
                href="https://wa.me/51932818432?text=Hola%20Gennova,%20quiero%20solicitar%20mi%20kit%20epigenetico%20para%20analizar%20mis%20biomarcadores"
                target="_blank"
                rel="noreferrer"
                className="bg-stone-950 hover:bg-[#009E9E] text-white text-xs font-bold font-mono uppercase tracking-wider py-2.5 px-4 rounded-xl transition-all duration-300 shrink-0 flex items-center gap-1.5 shadow-sm"
              >
                Solicitar Kit <ArrowRight size={12} />
              </a>
            </div>

          </div>

        </div>

      </div>

      {/* Dynamic Image Customization Slider Modal */}
      <AnimatePresence>
        {showConfigModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-[2.5rem] border border-stone-200 shadow-2xl max-w-2xl w-full p-6 md:p-8 relative"
            >
              <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-6">
                <div>
                  <h3 className="text-xl font-serif font-bold text-stone-900">
                    Ajustar Fotos del Reporte Epigenético
                  </h3>
                  <p className="text-stone-500 font-sans text-xs mt-0.5">
                    Vincula tus imágenes de Google Drive a cada uno de los 12 sistemas biológicos clave.
                  </p>
                </div>
                <button
                  onClick={() => setShowConfigModal(false)}
                  className="p-2 rounded-full hover:bg-stone-100 transition-colors text-stone-400 hover:text-stone-700"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Scrollable list of systems and their selections */}
              <div className="max-h-[380px] overflow-y-auto space-y-4 pr-1 custom-scrollbar">
                {systems.map((sys) => {
                  const currentMapping = imageMappings[sys.id] || '';
                  
                  return (
                    <div key={sys.id} className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: sys.color }} />
                        <div>
                          <span className="text-xs font-serif font-bold text-stone-900 block leading-tight">{sys.name}</span>
                          <span className="text-[10px] font-mono text-stone-400 block mt-0.5">{sys.tagline}</span>
                        </div>
                      </div>

                      <div className="w-full sm:w-72 shrink-0">
                        <select
                          value={currentMapping}
                          onChange={(e) => handleUpdateMapping(sys.id, e.target.value)}
                          className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 text-stone-700 focus:outline-none focus:ring-1 focus:ring-[#C5A862] shadow-sm font-sans"
                        >
                          {DRIVE_CATALOG.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Actions Footer */}
              <div className="border-t border-stone-100 pt-5 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleResetMappings}
                    className="px-3 py-1.5 text-stone-600 hover:text-stone-900 text-[10px] font-mono font-bold hover:bg-stone-50 rounded-xl transition-all"
                    title="Restablecer a las fotos vinculadas automáticamente"
                  >
                    VINCULAR EN ORDEN
                  </button>
                  <button
                    onClick={handleClearAllMappings}
                    className="px-3 py-1.5 text-stone-500 hover:text-stone-800 text-[10px] font-mono hover:bg-stone-50 rounded-xl transition-all"
                    title="Volver a las fotos originales de Unsplash"
                  >
                    USAR ORIGINALES (UNSPLASH)
                  </button>
                </div>
                <button
                  onClick={() => setShowConfigModal(false)}
                  className="w-full sm:w-auto px-6 py-2.5 bg-stone-950 text-white text-xs font-mono font-bold rounded-xl hover:bg-stone-850 transition-all shadow-md"
                >
                  GUARDAR & APLICAR
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

// --- SECCIÓN 3: TU BIOLOGÍA ES ÚNICA ---
export const UniqueBiologies: React.FC = () => {
  const [activeBio, setActiveBio] = useState<'mateo' | 'sofia' | 'juan'>('mateo');
  const [viewMode, setViewMode] = useState<'invisible' | 'visible'>('invisible');

  const profiles = {
    mateo: {
      name: 'Mateo, 35 años',
      tag: 'ESTRÉS ADRENAL & FOCUS',
      lifestyle: 'Fundador de startup. Trabaja 12 horas diarias, entrena con pesas, toma 4 cafés.',
      visiblePremise: "Ante el mundo: Atlético, hiper-productivo, asintomático, vitalidad inquebrable.",
      invisibleReality: "En su biología: Sensibilidad sutil a campos electromagnéticos urbanos, asimilación subóptima de folatos y niveles de reserva de magnesio disminuidos asociados al consumo de café.",
      score: '63',
      system: 'Sistema Autonómico',
      color: '#D8B56A',
      accentColor: 'text-[#D8B56A]',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
      biomarkers: [
        { name: 'Magnesio Intracelular', value: 'Umbral de Reserva Bajo', level: 25 },
        { name: 'Tolerancia Adrenal', value: 'Respuesta Adrenal en Alerta de Adaptación', level: 40 },
        { name: 'Metilación & Desintoxicación', value: 'Demanda Enzimática Elevada', level: 30 },
      ],
      pillars: [
        { name: "Foco Mental", value: 45, col: "bg-[#D8B56A]" },
        { name: "Control Cortisol", value: 20, col: "bg-red-400" },
        { name: "Reserva de Minerales", value: 35, col: "bg-orange-400" },
        { name: "Sueño Profundo", value: 50, col: "bg-blue-400" },
        { name: "Asimilación Vitaminas", value: 38, col: "bg-[#00D8D8]" }
      ]
    },
    sofia: {
      name: 'Sofía, 28 años',
      tag: 'METABOLISMO & RESPUESTA INFLAMATORIA',
      lifestyle: 'Profesora de yoga y diseñadora. Dieta orgánica predominantemente vegetariana.',
      visiblePremise: "Ante el mundo: Balanceada, activa, experta en nutrición limpia, cero toxinas.",
      invisibleReality: "En su biología: Sensibilidad digestiva potencial a ciertos cereales, asimilación folicular moderada de Vitamina B12 y requerimiento elevado de aminoácidos esenciales.",
      score: '74',
      system: 'Sistema Gastroinmunitario',
      color: '#00D8D8',
      accentColor: 'text-[#00D8D8]',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop',
      biomarkers: [
        { name: 'Vitamina B12 Coenzimatizada', value: 'Reserva Folicular Acotada', level: 22 },
        { name: 'Permeabilidad Epitelial', value: 'Sensibilidad Digestiva', level: 45 },
        { name: 'Metabolización de Proteínas', value: 'Nivel de Aprovechamiento Moderado', level: 60 },
      ],
      pillars: [
        { name: "Foco Mental", value: 78, col: "bg-[#00D8D8]" },
        { name: "Control Cortisol", value: 82, col: "bg-[#00D8D8]" },
        { name: "Reserva de Minerales", value: 54, col: "bg-orange-400" },
        { name: "Sueño Profundo", value: 88, col: "bg-[#00D8D8]" },
        { name: "Asimilación Vitaminas", value: 30, col: "bg-red-400" }
      ]
    },
    juan: {
      name: 'Juan, 42 años',
      tag: 'RESILENCIA METABÓLICA & DETOX',
      lifestyle: 'Inversionista y padre de familia. Vive en Lima, viaja constantemente.',
      visiblePremise: "Ante el mundo: Enérgico, viaja por placer, alimentación libre de grasas procesadas.",
      invisibleReality: "En su biología: Presencia acumulativa de elementos ambientales en el bulbo folicular por polución urbana y requerimiento de optimización en su sistema de defensa antioxidante mitocondrial.",
      score: '52',
      system: 'Sistema de Limpieza Hepática',
      color: '#10B981',
      accentColor: 'text-emerald-400',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop',
      biomarkers: [
        { name: 'Defensa Antioxidación', value: 'Capacidad Antioxidante a Optimizar', level: 18 },
        { name: 'Plomo & Xenobióticos', value: 'Presencia Ambiental Registrada', level: 75 },
        { name: 'Asimilación Lípidos Omega-3', value: 'Estabilidad Cardiovascular Óptima', level: 90 },
      ],
      pillars: [
        { name: "Foco Mental", value: 60, col: "bg-[#10B981]" },
        { name: "Control Cortisol", value: 55, col: "bg-[#10B981]" },
        { name: "Reserva de Minerales", value: 48, col: "bg-orange-400" },
        { name: "Sueño Profundo", value: 72, col: "bg-[#10B981]" },
        { name: "Asimilación Vitaminas", value: 40, col: "bg-red-400" }
      ]
    }
  };

  const current = profiles[activeBio];

  return (
    <section id="biologia-unica" className="py-32 bg-white relative overflow-hidden px-6 md:px-12 border-t border-stone-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#C5A862] font-mono text-[10px] uppercase tracking-[0.5em] mb-4 block">MISMA EDAD, DIFERENTE MAPA</span>
          <h2 className="text-4xl md:text-6xl font-serif text-stone-900 tracking-tight leading-none mb-6">
            Tu biología es única.
          </h2>
          <p className="text-stone-600 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Tres personas. Misma edad, idéntico estilo de vida idealizado. Pero respuestas biológicas internas radicalmente opuestas.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {Object.keys(profiles).map((key) => (
            <button
              key={key}
              onClick={() => setActiveBio(key as any)}
              className={`px-6 py-3 rounded-full font-mono text-[10px] uppercase tracking-wider font-bold border transition-all duration-300 ${
                activeBio === key 
                  ? 'bg-stone-900 text-white border-stone-900' 
                  : 'bg-transparent text-stone-600 border-stone-200 hover:border-stone-400 hover:text-stone-900'
              }`}
            >
              {profiles[key as keyof typeof profiles].name}
            </button>
          ))}
        </div>

        {/* Selected Profile Presentation */}
        <div className="grid lg:grid-cols-12 gap-12 bg-[#FAFAF9] rounded-[2.5rem] border border-stone-200/80 overflow-hidden p-8 md:p-12 relative items-stretch">
          
          {/* Left Area (4 cols on widescreen): Portrait image and quick viewMode toggle */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-stone-200 mb-6">
                <img 
                  src={current.image} 
                  alt={current.name} 
                  className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Score Floating Badge */}
                <div className="absolute top-6 left-6 p-4 bg-white/95 backdrop-blur-md rounded-2xl border border-stone-200 shadow-md">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-stone-500 block">EFICACIA BIOLÓGICA</span>
                  <span className="text-3xl font-bold font-mono text-[#009E9E]">{current.score}%</span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-md rounded-xl border border-stone-200/60 text-[10px] font-mono text-stone-800 shadow-sm">
                  <span className="block text-stone-500 uppercase mb-1">FOCO SISTÉMICO:</span>
                  <span className={`font-semibold uppercase ${current.accentColor}`}>{current.system}</span>
                </div>
              </div>

              {/* Toggle to compare visible vs invisible */}
              <div className="bg-stone-200/50 p-1 rounded-full border border-stone-200 flex items-center mb-6">
                <button 
                  onClick={() => setViewMode('invisible')}
                  className={`flex-1 py-2 text-center rounded-full text-[9px] font-mono uppercase tracking-wider transition-all ${
                    viewMode === 'invisible' 
                      ? 'bg-[#009E9E] text-white font-semibold' 
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  🧬 Biología Oculta (Epigenética)
                </button>
                <button 
                  onClick={() => setViewMode('visible')}
                  className={`flex-1 py-2 text-center rounded-full text-[9px] font-mono uppercase tracking-wider transition-all ${
                    viewMode === 'visible' 
                      ? 'bg-white text-stone-900 font-semibold shadow-sm' 
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  🏃‍♂️ Estilo de Vida Visible
                </button>
              </div>
            </div>

            <div className="p-5 rounded-2xl border bg-white border-stone-200/80">
              <span className="text-[10px] font-mono text-[#C5A862] block uppercase mb-1">COMENTARIO MÉDICO-EPIGENÉTICO</span>
              <p className="text-stone-600 text-xs font-sans leading-relaxed">
                {viewMode === 'invisible' ? current.invisibleReality : current.visiblePremise}
              </p>
            </div>
          </div>

          {/* Right Area (7 cols on widescreen): Biological Insights & Comparative Pillars */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <span className={`text-xs font-mono tracking-widest uppercase font-bold ${current.accentColor}`}>{current.tag}</span>
              <h3 className="text-4xl font-serif text-stone-900 mt-4 mb-2">{current.name}</h3>
              <p className="text-stone-700 font-mono text-[10px] font-semibold uppercase tracking-widest mb-6 border-b border-stone-200/80 pb-4">
                Hábitos Diarios: <span className="text-stone-600 font-sans font-light normal-case text-xs">{current.lifestyle}</span>
              </p>
            </div>

            {/* Micro Biomarkers Grid with live bar meters */}
            <div className="space-y-6 mb-8">
              <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C5A862]">MARCADORES EPIGENÉTICOS OBTENIDOS DE CABELLO</h4>
              <div className="grid gap-3">
                {current.biomarkers.map((bm, idx) => (
                  <div key={idx} className="bg-white px-5 py-4 rounded-xl border border-stone-200 shadow-sm">
                    <div className="flex justify-between items-center mb-2 text-xs font-mono">
                      <span className="text-stone-800 font-semibold">{bm.name}</span>
                      <span className="text-[#009E9E] text-[10px] font-bold">{bm.value}</span>
                    </div>
                    {/* Visual meter */}
                    <div className="w-full h-1 bg-stone-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#009E9E] to-[#C5A862] transition-all duration-1000"
                        style={{ width: `${bm.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Biological Pillars Chart (Tailwind driven interactive bars) */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/80 shadow-inner">
              <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-500 mb-4 block">PERFIL DE 5 PILARES CELULARES</h4>
              <div className="space-y-3">
                {current.pillars.map((pillar, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <span className="w-28 text-[11px] font-mono text-stone-700 truncate">{pillar.name}</span>
                    <div className="flex-1 h-3 bg-stone-200 rounded-full overflow-hidden relative">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${pillar.value}%` }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                        className={`h-full rounded-full ${pillar.col}`}
                      ></motion.div>
                    </div>
                    <span className="text-xs font-mono w-8 text-right text-stone-600">{pillar.value}%</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-4 mt-4 text-[9px] font-mono text-stone-500">
                <span>Crítico: &lt; 40%</span>
                <span>Alerta: 40% - 60%</span>
                <span>Óptimo: &gt; 60%</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

// --- SECCIÓN 4: COMPRENDER ES EL PRIMER PASO ---
export const KeynoteTransformation: React.FC = () => {
  const [step, setStep] = useState<'confusion' | 'comprension' | 'claridad'>('confusion');

  return (
    <section id="keynote" className="py-32 bg-[#FAFAF9] relative overflow-hidden px-6 md:px-12 border-t border-stone-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#C5A862] font-mono text-[10px] uppercase tracking-[0.5em] mb-4 block">KEYNOTE PRESENTACIÓN</span>
          <h2 className="text-4xl md:text-6xl font-serif text-stone-900 tracking-tight leading-none mb-6">
            Comprender es el primer paso.
          </h2>
          <p className="text-stone-600 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            La transformación molecular requiere un método. Del caos de adivinar a la certeza absoluta de la claridad celular.
          </p>
        </div>

        {/* Progression Stepper */}
        <div className="flex justify-center items-center gap-3 md:gap-8 max-w-2xl mx-auto mb-16 relative">
          <div className="absolute h-[1px] bg-stone-200 left-12 right-12 top-1/2 -translate-y-1/2 z-0 hidden md:block"></div>
          
          <button 
            onClick={() => setStep('confusion')} 
            className="relative z-10 flex flex-col items-center group focus:outline-none"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 ${
              step === 'confusion' 
                ? 'bg-red-500/10 text-red-600 border-red-500 shadow-lg shadow-red-500/10 scale-110' 
                : 'bg-white text-stone-400 border-stone-200 hover:border-stone-400 hover:text-stone-700'
            }`}>
              <AlertCircle size={18} />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider mt-3 text-stone-500 group-hover:text-stone-800 transition-colors">1. Confusión</span>
          </button>

          <button 
            onClick={() => setStep('comprension')} 
            className="relative z-10 flex flex-col items-center group focus:outline-none"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 ${
              step === 'comprension' 
                ? 'bg-[#009E9E]/10 text-[#009E9E] border-[#009E9E] shadow-lg shadow-[#009E9E]/10 scale-110' 
                : 'bg-white text-stone-400 border-stone-200 hover:border-stone-400 hover:text-stone-700'
            }`}>
              <Layers size={18} />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider mt-3 text-stone-500 group-hover:text-stone-800 transition-colors">2. Comprensión</span>
          </button>

          <button 
            onClick={() => setStep('claridad')} 
            className="relative z-10 flex flex-col items-center group focus:outline-none"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 ${
              step === 'claridad' 
                ? 'bg-[#C5A862]/10 text-[#C5A862] border-[#C5A862] shadow-lg shadow-[#C5A862]/10 scale-110' 
                : 'bg-white text-stone-400 border-stone-200 hover:border-stone-400 hover:text-stone-700'
            }`}>
              <Check size={18} strokeWidth={3} />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider mt-3 text-stone-500 group-hover:text-stone-800 transition-colors">3. Claridad</span>
          </button>
        </div>

        {/* Dynamic Display area of Keynote content - Split View with Widescreen Visuals */}
        <div className="bg-white rounded-[2.5rem] border border-stone-200/80 min-h-[480px] overflow-hidden relative shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
          <AnimatePresence mode="wait">
            {step === 'confusion' && (
              <motion.div 
                key="confusion"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="grid lg:grid-cols-2 h-full min-h-[480px] items-stretch"
              >
                {/* Left: Text & Info */}
                <div className="p-8 md:p-12 flex flex-col justify-center z-10 w-full">
                  <div className="inline-flex max-w-max items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 border border-red-200 mb-6 font-mono text-[9px] uppercase tracking-widest">
                    EL ESTADO DE INCERTIDUMBRE
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4 leading-tight">Adivinar no es una estrategia de vida</h3>
                  <p className="text-stone-600 text-sm md:text-base leading-relaxed mb-8 max-w-lg">
                    Vives gastando dinero en suplementos recomendados por influencers, eliminando alimentos al azar o forzando dietas genéricas. Tus marcadores moleculares sufren un caos invisible y tu energía sigue cayendo.
                  </p>
                  
                  {/* Chaotic tags */}
                  <div className="flex flex-wrap gap-2 max-w-md opacity-90">
                    <span className="text-[9px] font-mono border border-red-200 bg-red-50/50 text-red-700 px-3 py-1.5 rounded-full uppercase font-medium">Suplementación ciega</span>
                    <span className="text-[9px] font-mono border border-red-200 bg-red-50/50 text-red-700 px-3 py-1.5 rounded-full uppercase font-medium">Letargo post-almuerzo</span>
                    <span className="text-[9px] font-mono border border-red-200 bg-red-50/50 text-red-700 px-3 py-1.5 rounded-full uppercase font-medium">Sueño interrumpido</span>
                  </div>
                </div>

                {/* Right: Graphic Card with Authentic Image and Overlaid Chaos Stats */}
                <div className="relative min-h-[300px] lg:min-h-full overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=800&auto=format&fit=crop" 
                    alt="Persona cansada en luz natural filtrada" 
                    className="absolute inset-0 w-full h-full object-cover opacity-75 grayscale"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-white via-transparent to-transparent"></div>
                  
                  {/* HUD chaotic chart widget */}
                  <div className="absolute bottom-6 left-6 p-4 bg-white/95 backdrop-blur-md rounded-2xl border border-stone-200 shadow-md max-w-xs">
                    <span className="text-[8px] font-mono text-red-600 block uppercase mb-2">● DESREGULACIÓN CELULAR</span>
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-mono text-stone-600">
                        <span>Lípidos Oxidados</span>
                        <span className="font-bold">Alto</span>
                      </div>
                      <div className="w-full h-1 bg-red-100 rounded-full overflow-hidden">
                        <div className="w-[85%] h-full bg-red-500"></div>
                      </div>
                      <div className="flex justify-between text-[10px] font-mono text-stone-500">
                        <span>Eficiencia Mitocondrial</span>
                        <span>42%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 'comprension' && (
              <motion.div 
                key="comprension"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="grid lg:grid-cols-2 h-full min-h-[480px] items-stretch"
              >
                {/* Left: Text & Info */}
                <div className="p-8 md:p-12 flex flex-col justify-center z-10 w-full">
                  <div className="inline-flex max-w-max items-center gap-2 px-3 py-1 rounded-full bg-[#009E9E]/8 text-[#009E9E] border border-[#009E9E]/20 mb-6 font-mono text-[9px] uppercase tracking-widest">
                    DECODIFICACIÓN COMPUTACIONAL
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4 leading-tight">Mapeo del código biológico</h3>
                  <p className="text-stone-600 text-sm md:text-base leading-relaxed mb-8 max-w-lg">
                    Mediante espectrografía de bio-resonancia de tecnología avanzada internacional, decodificamos señales foliculares de 5 hebras de cabello con raíz. Tu metabolismo deja de ser una caja negra y converge en una base de datos estructurada.
                  </p>
                  
                  {/* Compilation progress indicator */}
                  <div className="relative h-16 max-w-md w-full flex justify-between items-center bg-stone-50 px-6 rounded-2xl border border-stone-200/80 shadow-sm">
                    <Activity size={16} className="text-[#009E9E] animate-pulse" />
                    <motion.div 
                      animate={{ width: ['0%', '100%'] }} 
                      transition={{ repeat: Infinity, duration: 2.5 }} 
                      className="h-[1px] bg-[#009E9E] flex-1 mx-4"
                    />
                    <Cpu size={16} className="text-[#C5A862]" />
                  </div>
                </div>

                {/* Right: Graphic Card with pristine hydration/sampling hands */}
                <div className="relative min-h-[300px] lg:min-h-full overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=800&auto=format&fit=crop" 
                    alt="Manos sosteniendo elemento cristalino saludable" 
                    className="absolute inset-0 w-full h-full object-cover opacity-80 grayscale-[30%]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-white via-transparent to-transparent"></div>
                  
                  {/* Scientific scanner widget */}
                  <div className="absolute top-6 left-6 p-4 bg-white/95 backdrop-blur-md rounded-2xl border border-stone-200 shadow-md text-[9px] font-mono">
                    <span className="text-[#009E9E] uppercase tracking-widest font-bold block mb-1">SCANNER STATUS: ONLINE</span>
                    <span className="text-stone-500">Análisis espectrográfico: 800hz</span>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 'claridad' && (
              <motion.div 
                key="claridad"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="grid lg:grid-cols-2 h-full min-h-[480px] items-stretch"
              >
                {/* Left: Text & Info */}
                <div className="p-8 md:p-12 flex flex-col justify-center z-10 w-full">
                  <div className="inline-flex max-w-max items-center gap-2 px-3 py-1 rounded-full bg-[#C5A862]/8 text-[#C5A862] border border-[#C5A862]/20 mb-6 font-mono text-[9px] uppercase tracking-widest">
                    CONTROL BIOLÓGICO TOTAL
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4 leading-tight">Planificación precisa en tus manos</h3>
                  <p className="text-stone-600 text-sm md:text-base leading-relaxed mb-8 max-w-lg">
                    Desbloqueas un protocolo de hábitos de 30 o 90 días adaptado a tu asimilación celular real. Sabes con certeza qué suplemento comprar, qué alimentos restringir metabólicamente, y visualizas la reducción en tu edad biológica acumulada.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <div className="bg-emerald-50 px-4 py-2 border border-emerald-200 rounded-xl text-emerald-700 font-mono text-xs flex items-center gap-2">
                      <Check size={12} strokeWidth={3} /> Vitalidad Optimizada
                    </div>
                    <div className="bg-[#C5A862]/10 px-4 py-2 border border-[#C5A862]/25 rounded-xl text-[#C5A862] font-mono text-xs flex items-center gap-2">
                      <Hourglass size={12} /> -3.5 Años Edad Biológica
                    </div>
                  </div>
                </div>

                {/* Right: Graphic Card with meditating person under rich morning sun */}
                <div className="relative min-h-[300px] lg:min-h-full overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop" 
                    alt="Normal biological success" 
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-white via-transparent to-transparent"></div>
                  
                  <div className="absolute bottom-6 left-6 p-4 bg-white/95 backdrop-blur-md rounded-2xl border border-stone-200 text-emerald-700 font-mono text-[10px] shadow-sm font-bold">
                    🛡️ ESCUDO EPIGENÉTICO ROBUSTO
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

// --- SECCIÓN 5: CIENCIA EPIGENÉTICA / INTERPRETACIÓN HUMANA ---
export const ScienceCertifications: React.FC = () => {
  const [activeCert, setActiveCert] = useState<string | null>(null);

  const certs = [
    { name: 'FDA', desc: 'Administración de Alimentos y Medicamentos de EE.UU. Tecnologías complementadas cuentan con componentes fabricados bajo directrices reguladas de registro internacional de dispositivos de laboratorio de salud general en EE.UU.' },
    { name: 'CE', desc: 'Certificación de Conformidad Europea. Cumplimiento absoluto de las regulaciones europeas en seguridad, salud y protección ambiental de dispositivos espectrográficos.' },
    { name: 'FCC', desc: 'Comisión Federal de Comunicaciones de EE.UU. Asegura que los dispositivos no emitan radiofrecuencias dañinas o interferencias con el medio biológico.' },
    { name: 'ETL Intertek', desc: 'Estándar riguroso de seguridad eléctrica y mecánica internacional para laboratorios de alta fidelidad tecnológica en el espectro biológico.' },
    { name: 'ANVISA', desc: 'Agencia Nacional de Vigilancia Sanitaria brasileña. Auditoría y habilitación técnica internacional de sistemas de mapeo y bio-análisis.' },
    { name: 'INVIMA', desc: 'Instituto Nacional de Vigilancia de Medicamentos y Alimentos. Respaldo de idoneidad técnica de los dispositivos utilizados en la región.' },
    { name: 'CCC', desc: 'Certificado Obligatorio de China. Valida la calidad y control en los procesos primarios de manufactura de alta tecnología física.' },
    { name: 'HS Codes', desc: 'Códigos del Sistema Armonizado para el tránsito internacional aduanero legalizado de tecnologías científicas especializadas.' }
  ];

  const pipeline = [
    {
      step: "01",
      title: "Extracción del Bulbo",
      desc: "Se toman 4 hebras de cabello con raíz viva. El bulbo capilar actúa como un disco duro biológico de los últimos 90 días.",
      icon: <Fingerprint className="text-[#009E9E]" size={20} />
    },
    {
      step: "02",
      title: "Bio-Resonancia S-Drive",
      desc: "La bobina de inducción espectrográfica digitaliza la firma electromagnética del cabello en menos de 15 minutos.",
      icon: <Cpu className="text-[#C5A862]" size={20} />
    },
    {
      step: "03",
      title: "Cómputo en Hamburgo",
      desc: "Las firmas digitalizadas se envían con cifrado cuántico a los servidores centrales de Alemania para el mapeo biológico.",
      icon: <Database className="text-purple-500" size={20} />
    },
    {
      step: "04",
      title: "Traducción y Reporte",
      desc: "Especialistas de Gennova adaptan los 96 biomarcadores en un reporte accionable de hábitos y suplementación exacta.",
      icon: <Activity className="text-emerald-500" size={20} />
    }
  ];

  return (
    <section id="ciencia" className="py-28 bg-white relative overflow-hidden px-6 md:px-12 border-t border-stone-200">
      {/* Subtle background graphics */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#009E9E]/2 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto">
        {/* Top Header */}
        <div className="mb-20 text-center md:text-left max-w-3xl">
          <span className="text-[#009E9E] font-mono text-[10px] uppercase tracking-[0.5em] mb-4 block font-bold">PRECISIÓN CIENTÍFICA</span>
          <h2 className="text-4xl md:text-6xl font-serif text-stone-900 leading-tight tracking-tight">
            Ciencia Epigenética &<br/>
            <span className="italic text-[#C5A862]">Interpretación Humana.</span>
          </h2>
          <p className="mt-6 text-stone-600 font-light text-base md:text-lg leading-relaxed">
            Gennova integra bio-tecnología de espectrografía de vanguardia de Alemania con la interpretación de especialistas clínicos para diseñar una ruta de suplementación y hábitos verdaderamente inteligente y libre de adivinanzas.
          </p>
        </div>

        {/* Graphical Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Stunning Visual Pipeline Diagram */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-stone-900 font-serif text-lg tracking-wider mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#009E9E]"></span>
              Ruta del Análisis Epigenético Gennova
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {pipeline.map((item, index) => (
                <div 
                  key={index}
                  className="bg-[#FAFAF9] border border-stone-200/80 p-6 rounded-[2rem] hover:border-stone-400 hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                >
                  {/* Subtle watermarked step number */}
                  <span className="absolute -right-2 -bottom-4 text-7xl font-serif text-stone-200/40 select-none group-hover:text-stone-300/40 transition-colors">
                    {item.step}
                  </span>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center shadow-sm">
                      {item.icon}
                    </div>
                    <h4 className="text-sm font-semibold text-stone-800 font-sans tracking-wide">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-stone-500 text-xs leading-relaxed font-light font-sans relative z-10">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-5 bg-stone-900 rounded-3xl text-white flex flex-col md:flex-row gap-4 items-center justify-between border border-stone-800 shadow-md">
              <div className="flex gap-3 items-center">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
                <p className="text-[11px] font-mono tracking-widest text-stone-400 uppercase">
                  TECNOLOGÍA EN CONEXIÓN DIRECTA CON HAMBURGO, ALEMANIA
                </p>
              </div>
              <span className="text-[9px] font-mono text-[#C5A862] bg-[#C5A862]/10 border border-[#C5A862]/20 px-3 py-1 rounded-full uppercase tracking-wider font-bold">
                Cell Wellbeing Certified
              </span>
            </div>
          </div>

          {/* RIGHT: Interactive Certs Matrix Panel */}
          <div className="lg:col-span-5 bg-stone-50 border border-stone-200/80 rounded-[2.5rem] p-8 space-y-6">
            <div>
              <span className="text-stone-400 font-mono text-[9px] uppercase tracking-widest block font-bold mb-1">CUMPLIMIENTO LEGAL & RESPALDO</span>
              <h4 className="text-stone-900 font-serif text-xl">Certificaciones de Compatibilidad</h4>
              <p className="text-stone-500 text-xs mt-2 leading-relaxed">
                Nuestros dispositivos y sistemas cumplen con estrictas normativas y auditorías sanitarias y de espectrografía global para garantizar precisión e inocuidad biológica. Haz clic en cada sigla para ver su alcance:
              </p>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {certs.map((cert) => (
                <button
                  key={cert.name}
                  onClick={() => setActiveCert(activeCert === cert.name ? null : cert.name)}
                  className={`h-12 rounded-xl flex flex-col items-center justify-center font-sans text-xs font-bold border transition-all duration-300 relative ${
                    activeCert === cert.name 
                      ? 'bg-[#C5A862] text-white border-[#C5A862] shadow-md shadow-[#C5A862]/10' 
                      : 'bg-white text-stone-600 border-stone-200/80 hover:border-stone-400 hover:text-stone-900 shadow-sm'
                  }`}
                >
                  <span>{cert.name}</span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeCert ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-5 bg-white border border-stone-200 rounded-2xl shadow-sm"
                >
                  <span className="text-[9px] uppercase font-mono tracking-widest text-[#C5A862] block mb-2 font-bold">
                    Respaldo Regulatorio {activeCert}
                  </span>
                  <p className="text-stone-600 font-sans text-xs leading-relaxed font-light">
                    {certs.find(c => c.name === activeCert)?.desc}
                  </p>
                </motion.div>
              ) : (
                <div className="p-5 bg-stone-100/60 rounded-2xl border border-dashed border-stone-200 text-center">
                  <p className="text-stone-400 text-xs font-sans">
                    Haz clic en una de las certificaciones para ver su descripción de cumplimiento y seguridad.
                  </p>
                </div>
              )}
            </AnimatePresence>

            <div className="p-4 bg-white rounded-2xl border border-stone-200/60 flex gap-4 items-start shadow-sm">
              <ShieldCheck className="text-[#009E9E] shrink-0 mt-0.5" size={18} />
              <p className="text-stone-500 text-[11px] leading-relaxed font-sans">
                <strong>Nota informativa:</strong> Gennova ofrece mapeo de bienestar y análisis epigenético preventivo. No realizamos diagnósticos clínicos, médicos o curas de patologías específicas.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// --- SECCIÓN 6: CONSTELLACIÓN BIOMARCADORES ---
export const BiomarkersConstellation: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'vitamins' | 'minerals' | 'systems' | 'environment'>('vitamins');
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const biologicalSystems12 = [
    { name: "Sistema Inmunológico", count: 9, icon: <Activity className="text-red-500" size={16} />, desc: "Análisis de defensas celulares y respuesta inmunogénica." },
    { name: "Sistema Gastrointestinal", count: 10, icon: <Sprout className="text-amber-600" size={16} />, desc: "Mapeo de permeabilidad y equilibrio de la microbiota." },
    { name: "Sistema Cardiovascular", count: 8, icon: <Heart className="text-rose-500" size={16} />, desc: "Eficiencia circulatoria, lípidos y salud vascular." },
    { name: "Sistema Renal & Depuración", count: 7, icon: <Layers className="text-blue-500" size={16} />, desc: "Filtración celular y drenaje de toxinas solubles." },
    { name: "Sistema Endocrino & Hormonas", count: 8, icon: <Zap className="text-indigo-500" size={16} />, desc: "Regulación de glándulas y señalización hormonal." },
    { name: "Sistema Músculo-Esquelético", count: 8, icon: <Hourglass className="text-emerald-600" size={16} />, desc: "Asimilación de colágeno y soporte estructural celular." },
    { name: "Metabolismo de Vitaminas", count: 9, icon: <Sparkles className="text-yellow-500" size={16} />, desc: "Impronta de absorción de complejos vitamínicos clave." },
    { name: "Mapeo de Minerales", count: 9, icon: <Database className="text-stone-500" size={16} />, desc: "Disponibilidad de oligoelementos y electrolitos de energía." },
    { name: "Resistencia a Ácidos Grasos", count: 6, icon: <Flame className="text-orange-500" size={16} />, desc: "Equilibrio celular de omegas 3, 6 y 9 esenciales." },
    { name: "Campos EMF & Radiación", count: 8, icon: <Cpu className="text-violet-500" size={16} />, desc: "Sensibilidad al estrés oxidativo por wifi y redes móviles." },
    { name: "Metales Pesados & Toxicidad", count: 7, icon: <AlertCircle className="text-red-400" size={16} />, desc: "Mapeo de acumulación de plomo, aluminio o mercurio." },
    { name: "Aditivos & Alérgenos", count: 7, icon: <Smile className="text-teal-600" size={16} />, desc: "Sensibilidades a químicos sintéticos urbanos cotidianos." }
  ];

  const data = {
    vitamins: {
      name: 'Vitaminas Celulares',
      desc: 'Medición de la impronta epigenética de asimilación vitamínica esencial. Clave para el metabolismo de grasas, absorción ósea y metilación óptima.',
      nodes: [
        { name: 'Vitamina D3', x: '25%', y: '35%', role: 'Absorción mineral e inmunidad' },
        { name: 'Vitamina B12', x: '60%', y: '25%', role: 'Síntesis de energía mitocondrial' },
        { name: 'Vitamina C', x: '45%', y: '65%', role: 'Síntesis de colágeno y neuro-defensa' },
        { name: 'Ácido Fólico', x: '75%', y: '55%', role: 'Metilación y renovación de ADN' }
      ]
    },
    minerals: {
      name: 'Minerales y Electrólitos',
      desc: 'Mapeo de disponibilidad celular de elementos químicos vitales que comandan el descanso muscular, la contracción cardíaca y la lucidez.',
      nodes: [
        { name: 'Magnesio', x: '30%', y: '60%', role: 'Regulación del estrés y descanso biológico' },
        { name: 'Zinc', x: '65%', y: '45%', role: 'Regeneración celular y síntesis hormonal' },
        { name: 'Selenio', x: '20%', y: '20%', role: 'Protección de tiroides y antioxidantes' },
        { name: 'Potasio', x: '80%', y: '30%', role: 'Metabolización hídrica y presión neural' }
      ]
    },
    systems: {
      name: 'Sistemas Biológicos Primarios',
      desc: 'La salud celular dictaminada por la eficiencia de tus sistemas de filtración, asimilación y defensa ante agresores cotidianos.',
      nodes: [
        { name: 'Salud Intestinal', x: '40%', y: '30%', role: 'Permeabilidad y flora microbiotica' },
        { name: 'Salud Cardiovascular', x: '70%', y: '40%', role: 'Elasticidad arterial y lípidos' },
        { name: 'Salud Inmune', x: '15%', y: '50%', role: 'Respuesta celular frente a virus' },
        { name: 'Salud Hepática', x: '55%', y: '75%', role: 'Depuración de elementos residuales' }
      ]
    },
    environment: {
      name: 'Entorno & Factores Invisibles',
      desc: 'Interferencias externas cotidianas en las grandes metrópolis que causan cansancio agudo y letargo mitocondrial metabólico silencioso.',
      nodes: [
        { name: 'Campos EMF (Wifi)', x: '50%', y: '50%', role: 'Estrés oxidativo inducido por electromagnetismo' },
        { name: 'Metales Pesados', x: '20%', y: '70%', role: 'Bloqueo enzimático por plomo o mercurio' },
        { name: 'Radiación Lumínica', x: '80%', y: '20%', role: 'Supresión de melatonina y descanso' },
        { name: 'Químicos Ambientales', x: '35%', y: '15%', role: 'Sensibilidades metabólicas urbanas' }
      ]
    }
  };

  const current = data[activeCategory];

  return (
    <section id="biomercadores" className="py-28 bg-[#FAFAF9] relative overflow-hidden px-6 md:px-12 border-t border-stone-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-[#C5A862] font-mono text-[10px] uppercase tracking-[0.5em] mb-4 block font-bold">ANÁLISIS BIOLÓGICO INTEGRAL</span>
          <h2 className="text-4xl md:text-6xl font-serif text-stone-900 tracking-tight leading-none mb-6">
            Mapeo de Biomarcadores
          </h2>
          <p className="text-stone-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Nuestro test evalúa exactamente <strong className="text-[#009E9E] font-semibold">96 biomarcadores</strong> celulares en tiempo real, distribuidos en <strong className="text-stone-950 font-semibold">12 sistemas clave biológicos</strong> fundamentales para revelar tu estado de optimización.
          </p>
        </div>

        {/* SECTION A: THE 12 SYSTEMS GRID (SUPER GRAPHICAL & ATTRACTIVE) */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-10 justify-center">
            <span className="h-[1px] w-12 bg-stone-300"></span>
            <h3 className="font-serif text-xs uppercase tracking-[0.25em] text-stone-500 font-bold">Mapeo de los 12 Sistemas Clave</h3>
            <span className="h-[1px] w-12 bg-stone-300"></span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {biologicalSystems12.map((sys, idx) => (
              <div 
                key={idx}
                className="bg-white border border-stone-200/80 rounded-[1.8rem] p-5 shadow-sm hover:border-[#009E9E]/40 hover:shadow-md transition-all duration-300 group flex flex-col justify-between min-h-[160px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-center group-hover:bg-[#009E9E]/5 group-hover:border-[#009E9E]/20 transition-all duration-300">
                      {sys.icon}
                    </div>
                    <span className="font-mono text-[10px] font-bold text-[#C5A862] bg-[#C5A862]/5 px-2 py-0.5 rounded-full">
                      {sys.count} Bios
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-stone-800 font-sans tracking-wide mb-1.5 group-hover:text-[#009E9E] transition-colors">
                    {sys.name}
                  </h4>
                  <p className="text-[10.5px] leading-relaxed text-stone-400 font-sans font-light">
                    {sys.desc}
                  </p>
                </div>
                
                {/* Visual biomarker bar */}
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-2">
                  <div className="h-1 bg-stone-100 rounded-full flex-1 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#C5A862] to-[#009E9E] rounded-full transition-all duration-500" 
                      style={{ width: `${(sys.count / 10) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-[9px] font-mono text-stone-400">{(sys.count / 10 * 100).toFixed(0)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION B: QUANTUM CELLULAR INTERACTIVE SIMULATOR */}
        <div>
          <div className="flex items-center gap-3 mb-10 justify-center">
            <span className="h-[1px] w-12 bg-stone-300"></span>
            <h3 className="font-serif text-xs uppercase tracking-[0.25em] text-stone-500 font-bold">Vista Cuántica de Variables Epigenéticas</h3>
            <span className="h-[1px] w-12 bg-stone-300"></span>
          </div>

          {/* Selector Panel */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            {Object.keys(data).map((key) => (
              <button
                key={key}
                onClick={() => { setActiveCategory(key as any); setHoveredNode(null); }}
                className={`px-5 py-4 rounded-2xl font-mono text-[10px] uppercase tracking-wider font-bold border transition-all duration-300 text-center ${
                  activeCategory === key 
                    ? 'bg-stone-900 text-[#009E9E] border-stone-900 shadow-md shadow-[#009E9E]/10' 
                    : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400 hover:text-stone-900 shadow-sm'
                }`}
              >
                {data[key as keyof typeof data].name}
              </button>
            ))}
          </div>

          {/* Interactive Constellation Screen */}
          <div className="bg-white rounded-[2.5rem] border border-stone-200/80 p-8 md:p-12 relative h-[500px] flex md:flex-row flex-col gap-8 items-center justify-between overflow-hidden shadow-md">
            
            {/* Left panel explaining current category */}
            <div className="w-full md:w-1/3 z-10 flex flex-col justify-between h-full md:py-8">
              <div>
                <span className="text-xs font-mono text-[#C5A862] uppercase tracking-widest block mb-4">MAPA ELECTROMAGNÉTICO</span>
                <h3 className="text-3xl font-serif text-stone-900 mb-4 leading-none">{current.name}</h3>
                <p className="text-stone-600 font-sans text-xs leading-relaxed">
                  {current.desc}
                </p>
              </div>
              
              <div className="mt-8 bg-stone-50 p-4 rounded-xl border border-stone-200 text-stone-700 font-mono shadow-inner">
                {hoveredNode ? (
                  <div>
                    <span className="text-[#009E9E] font-bold block mb-1">{hoveredNode}</span>
                    <p className="text-[11px] leading-snug text-stone-500">{current.nodes.find(n => n.name === hoveredNode)?.role}</p>
                  </div>
                ) : (
                  <div className="flex gap-2 items-center text-[#C5A862]">
                    <Sparkles size={14} className="animate-spin-slow" />
                    <span className="text-[11px] font-semibold">Posa el cursor en un nodo celestial</span>
                  </div>
                )}
              </div>
            </div>

            {/* Celestial map canvas representing nodes */}
            <div className="w-full md:w-2/3 h-full relative border border-stone-200/80 bg-stone-50 rounded-[1.5rem] overflow-hidden">
              {/* Glowing connecting lines */}
              <svg className="w-full h-full absolute inset-0">
                <line x1="25%" y1="35%" x2="60%" y2="25%" stroke="#a8a29e" strokeWidth="0.5" strokeOpacity="0.4" />
                <line x1="60%" y1="25%" x2="45%" y2="65%" stroke="#a8a29e" strokeWidth="0.5" strokeOpacity="0.4" />
                <line x1="45%" y1="65%" x2="75%" y2="55%" stroke="#a8a29e" strokeWidth="0.5" strokeOpacity="0.4" />
                <line x1="25%" y1="35%" x2="45%" y2="65%" stroke="#a8a29e" strokeWidth="0.5" strokeOpacity="0.4" />
                <line x1="60%" y1="25%" x2="75%" y2="55%" stroke="#a8a29e" strokeWidth="0.5" strokeOpacity="0.4" />
              </svg>

              {current.nodes.map((node) => (
                <button
                  key={node.name}
                  onMouseEnter={() => setHoveredNode(node.name)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="absolute flex flex-col items-center group focus:outline-none focus:ring-0"
                  style={{ left: node.x, top: node.y }}
                >
                  <div className="relative">
                    {/* Glowing background circle */}
                    <motion.div 
                      animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.7, 0.3] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                      className="w-8 h-8 rounded-full bg-[#009E9E]/10 flex items-center justify-center absolute -top-2"
                    ></motion.div>
                    <div className={`w-4 h-4 rounded-full border transition-transform duration-300 group-hover:scale-125 z-10 relative ${
                      hoveredNode === node.name ? 'bg-[#009E9E] border-white shadow-md' : 'bg-white border-stone-300 shadow-sm'
                    }`}></div>
                  </div>
                  <span className="text-[9px] font-mono mt-1 text-stone-500 opacity-60 group-hover:opacity-100 transition-opacity">
                    {node.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

// --- SECCIÓN 7: CÓMO FUNCIONA ---
export const FollicularTimeline: React.FC<{ onOpenHowItWorks: () => void }> = ({ onOpenHowItWorks }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [scannerAngle, setScannerAngle] = useState<number>(0);

  const steps = [
    {
      num: "01",
      title: "Reserva tu cita o solicita tu kit epigenético",
      desc: "Inicia el proceso de forma rápida a través del canal oficial de WhatsApp de Gennova.",
      detail: "Conversa directamente con nosotros. Te explicamos los alcances del test, resolvemos todas tus dudas de forma personalizada y coordinamos tu cita de acuerdo a tus horarios.",
      badge: "Paso 1: Inicio de Canal Oficial",
      badgeColor: "text-[#009E9E] bg-[#009E9E]/8 border-[#009E9E]/15",
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop",
      tagline: "CONEXIÓN INICIAL • ASESORÍA PERSONALIZADA",
      biomarkers: ["Canal Privado", "Agendamiento Ágil", "Explicación Técnica"]
    },
    {
      num: "02",
      title: "Realiza tu evaluación epigenética",
      desc: "De forma presencial en nuestras instalaciones o mediante el kit epigenético en la comodidad de tu casa.",
      detail: "Tomamos una muestra limpia e indolora de solo 5 hebras de cabello con raíz (bulbo intacto). Sin agujas, sin extracciones de sangre, rápido e higiénico.",
      badge: "Paso 2: Mapeo Folicular",
      badgeColor: "text-[#C5A862] bg-[#C5A862]/8 border-[#C5A862]/15",
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=1200&auto=format&fit=crop",
      tagline: "ESCÁNER BIO-ESPECTROGRÁFICO • 15 MINUTOS",
      biomarkers: ["Bulbo Capilar Intacto", "Cero Agujas", "Espectrografía S9"]
    },
    {
      num: "03",
      title: "Orientación e interpretación de resultados",
      desc: "Sesión presencial o virtual de 60 minutos con nuestros especialistas para descifrar tus marcadores.",
      detail: "Te entregamos un reporte claro, detallado y sin rodeos técnicos complicados, explicando exactamente qué sistemas y nutrientes requieren tu atención inmediata.",
      badge: "Paso 3: Claridad Científica",
      badgeColor: "text-purple-700 bg-purple-50 border-purple-200",
      image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=1200&auto=format&fit=crop",
      tagline: "INTERPRETACIÓN CLÍNICA • TRANSPARENCIA TOTAL",
      biomarkers: ["Explicación Sencilla", "Sistemas en Alerta", "Mapeo de Nutrientes"]
    },
    {
      num: "04",
      title: "Elaboración de plan epi nutrimental 90 días",
      desc: "Diseño de un protocolo personalizado a cargo de un nutricionista funcional.",
      detail: "Un plan de alimentación celular y hábitos diseñado a la medida de tu capacidad de asimilación real. Sabrás exactamente qué suplementos comprar y qué alimentos evitar.",
      badge: "Paso 4: Protocolo Personalizado",
      badgeColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop",
      tagline: "ALIMENTACIÓN DE PRECISIÓN • BIO-SUPLEMENTOS",
      biomarkers: ["Inmunonutrición", "Micronutrientes S9", "Hábitos de Sueño"]
    },
    {
      num: "05",
      title: "Accede a tu dashboard personalizado",
      desc: "Visualiza tus métricas vitales y protocolo digital en tiempo real (Muy pronto).",
      detail: "Tendrás todas tus métricas de vitalidad, asimilación y tu plan de 90 días digitalizado en tu bolsillo para consultarlo cuando desees de forma rápida.",
      badge: "Paso 5: Control Digital Completo",
      badgeColor: "text-blue-700 bg-blue-50 border-blue-200",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
      tagline: "EXPEDIENTE DIGITAL • ACCESO 24/7",
      biomarkers: ["Métricas en Bolsillo", "Evolución Histórica", "Genn Coach AI"]
    },
    {
      num: "06",
      title: "Seguimiento cada 30 días",
      desc: "Monitoreo continuo de tu evolución biológica y ajuste de metas (Disponible en el Plan Elite).",
      detail: "Ajustamos tus hábitos de acuerdo a tu respuesta celular para asegurar que tu inversión y esfuerzo sigan optimizando tu energía y reduciendo tu edad biológica.",
      badge: "Paso 6: Optimización Evolutiva",
      badgeColor: "text-rose-700 bg-rose-50 border-rose-200",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop",
      tagline: "RE-EVALUACIÓN ENZIMÁTICA • REDUCCIÓN EDAD BIO",
      biomarkers: ["Ajuste Fisiológico", "Historial Comparativo", "Longevidad Activa"]
    }
  ];

  const currentStep = steps[activeIndex];
  const phoneNumber = "51932818432";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent("Hola Gennova, me gustaría agendar una cita o consultar sobre el procedimiento de evaluación epigenética para optimizar mi biología.")}`;

  // Continuous loop animation for holographic telemetry
  useEffect(() => {
    let animationFrameId: number;
    const updateHologram = () => {
      setScannerAngle((prev) => (prev + 0.02) % (2 * Math.PI));
      animationFrameId = requestAnimationFrame(updateHologram);
    };
    animationFrameId = requestAnimationFrame(updateHologram);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Auto-play interval
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % steps.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  const handlePrev = () => {
    setIsPlaying(false);
    setActiveIndex((prev) => (prev === 0 ? steps.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsPlaying(false);
    setActiveIndex((prev) => (prev + 1) % steps.length);
  };

  // Dedicated holographic SVG generator for steps
  const renderHolographicWidget = () => {
    const cx = 60;
    const cy = 60;
    const r = 45;
    const activeColor = activeIndex % 2 === 0 ? "#009E9E" : "#C5A862";

    // Dynamic wave values
    const angle1 = scannerAngle;
    const angle2 = scannerAngle + Math.PI * 0.66;
    const angle3 = scannerAngle + Math.PI * 1.33;

    const x1 = cx + r * Math.cos(angle1);
    const y1 = cy + r * Math.sin(angle1);
    const x2 = cx + r * Math.cos(angle2);
    const y2 = cy + r * Math.sin(angle2);
    const x3 = cx + r * Math.cos(angle3);
    const y3 = cy + r * Math.sin(angle3);

    return (
      <g>
        {/* Outer orbital radar */}
        <circle 
          cx={cx} 
          cy={cy} 
          r={r + 8} 
          fill="none" 
          stroke={activeColor} 
          strokeWidth="0.5" 
          strokeDasharray="4,4" 
          strokeOpacity="0.25"
        />
        {/* Main boundary circle */}
        <circle 
          cx={cx} 
          cy={cy} 
          r={r} 
          fill="none" 
          stroke={activeColor} 
          strokeWidth="1" 
          strokeOpacity="0.6" 
        />
        {/* Radar sweep lines */}
        <line 
          x1={cx} 
          y1={cy} 
          x2={cx + r * Math.cos(scannerAngle * 1.5)} 
          y2={cy + r * Math.sin(scannerAngle * 1.5)} 
          stroke={activeColor} 
          strokeWidth="1.2" 
          strokeOpacity="0.8" 
        />

        {/* Step-specific visual simulation */}
        {activeIndex === 0 && (
          // Connection Nodes (Booking)
          <g>
            <circle cx={cx} cy={cy} r="5" fill={activeColor} fillOpacity="0.8" />
            <line x1={cx} y1={cy} x2={x1} y2={y1} stroke={activeColor} strokeWidth="0.8" strokeDasharray="2,2" />
            <line x1={cx} y1={cy} x2={x2} y2={y2} stroke={activeColor} strokeWidth="0.8" strokeDasharray="2,2" />
            <line x1={cx} y1={cy} x2={x3} y2={y3} stroke={activeColor} strokeWidth="0.8" strokeDasharray="2,2" />
            <circle cx={x1} cy={y1} r="3" fill="#FFFFFF" stroke={activeColor} strokeWidth="1" />
            <circle cx={x2} cy={y2} r="3" fill="#FFFFFF" stroke={activeColor} strokeWidth="1" />
            <circle cx={x3} cy={y3} r="3" fill="#FFFFFF" stroke={activeColor} strokeWidth="1" />
          </g>
        )}

        {activeIndex === 1 && (
          // Hair strand follicle being scanned by bio-spectrograph
          <g>
            <path d={`M ${cx},18 Q ${cx - 6},40 ${cx + 6},65 T ${cx},102`} fill="none" stroke={activeColor} strokeWidth="2.5" strokeOpacity="0.85" />
            <line x1={cx - 18} y1={cy} x2={cx + 18} y2={cy} stroke="#FFFFFF" strokeWidth="1.5" className="animate-pulse" />
            <circle cx={cx} cy={cy} r="14" fill="none" stroke={activeColor} strokeWidth="0.5" strokeDasharray="2,1" />
            <circle cx={cx} cy={cy} r="8" fill="none" stroke={activeColor} strokeWidth="0.8" />
          </g>
        )}

        {activeIndex === 2 && (
          // Resonance Wave interpretation
          <g>
            <path 
              d={`M ${cx - 25},${cy} Q ${cx - 12},${cy - 18 * Math.sin(scannerAngle * 2)} ${cx},${cy} T ${cx + 25},${cy}`} 
              fill="none" 
              stroke={activeColor} 
              strokeWidth="2" 
            />
            <path 
              d={`M ${cx - 25},${cy} Q ${cx - 12},${cy + 12 * Math.cos(scannerAngle * 2)} ${cx},${cy} T ${cx + 25},${cy}`} 
              fill="none" 
              stroke="#FFFFFF" 
              strokeWidth="1" 
              strokeOpacity="0.65" 
            />
            <circle cx={cx - 25} cy={cy} r="2.5" fill={activeColor} />
            <circle cx={cx + 25} cy={cy} r="2.5" fill={activeColor} />
          </g>
        )}

        {activeIndex === 3 && (
          // Personalized Plan Hexagon Blueprint
          <g>
            <polygon 
              points={`${cx},${cy-18} ${cx+16},${cy-9} ${cx+16},${cy+9} ${cx},${cy+18} ${cx-16},${cy+9} ${cx-16},${cy-9}`} 
              fill="none" 
              stroke={activeColor} 
              strokeWidth="1" 
              strokeDasharray="2,2" 
            />
            <circle cx={cx} cy={cy-18} r="2.5" fill="#FFFFFF" stroke={activeColor} strokeWidth="1" />
            <circle cx={cx+16} cy={cy-9} r="2.5" fill={activeColor} />
            <circle cx={cx+16} cy={cy+9} r="2.5" fill="#FFFFFF" stroke={activeColor} strokeWidth="1" />
            <circle cx={cx} cy={cy+18} r="2.5" fill={activeColor} />
            <circle cx={cx-16} cy={cy+9} r="2.5" fill="#FFFFFF" stroke={activeColor} strokeWidth="1" />
            <circle cx={cx-16} cy={cy-9} r="2.5" fill={activeColor} />
            <circle cx={cx} cy={cy} r="6" fill={activeColor} fillOpacity="0.2" />
          </g>
        )}

        {activeIndex === 4 && (
          // Smartphone UI representation (Dashboard)
          <g>
            <rect x={cx-12} y={cy-20} width="24" height="40" rx="5" fill="none" stroke={activeColor} strokeWidth="1.5" />
            <line x1={cx-8} y1={cy-12} x2={cx+8} y2={cy-12} stroke={activeColor} strokeWidth="0.8" />
            <line x1={cx-8} y1={cy-6} x2={cx+4} y2={cy-6} stroke={activeColor} strokeWidth="0.8" />
            <circle cx={cx} cy={cy+6} r="2.5" fill={activeColor} className="animate-ping" />
            <circle cx={cx} cy={cy+6} r="2" fill="#FFFFFF" stroke={activeColor} strokeWidth="0.5" />
          </g>
        )}

        {activeIndex === 5 && (
          // Closed loop feedback loop
          <g>
            <circle cx={cx} cy={cy} r="16" fill="none" stroke={activeColor} strokeWidth="1.5" strokeDasharray="5,3" className="animate-spin-slow" />
            <circle cx={cx} cy={cy} r="8" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="2,2" />
            <circle cx={cx} cy={cy} r="3.5" fill={activeColor} />
          </g>
        )}
      </g>
    );
  };

  return (
    <section id="proceso" className="py-24 bg-[#FAF9F6] relative overflow-hidden px-4 md:px-12 border-t border-stone-200">
      {/* Absolute high-end lights and blurs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#009E9E]/2 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#C5A862]/2 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        
        {/* Head of Section */}
        <div className="mb-16 text-center max-w-4xl mx-auto">
          <span className="text-[#009E9E] font-mono text-[10px] uppercase tracking-[0.5em] mb-4 block font-bold">
            MÉTODO PROACTIVO & BIOMARCADORES DE PRECISIÓN
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-stone-900 mb-6 leading-[1.1] tracking-tight">
            Procedimiento Gennova Labs
          </h2>
          <p className="text-stone-600 font-sans text-sm md:text-base leading-relaxed font-light max-w-2xl mx-auto">
            Un camino interactivo e integral diseñado para mapear tu bienestar sin rodeos clínicos. Enfocado 100% en la prevención y optimización celular diaria.
          </p>
        </div>

        {/* Master Slider & Selector Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: Cinematic Image / Action Card Overlay (7 columns) */}
          <div 
            className="lg:col-span-7 rounded-[2.5rem] overflow-hidden border border-stone-200 bg-stone-900 relative shadow-2xl min-h-[520px] md:min-h-[580px] flex flex-col justify-end p-6 md:p-10 group"
            onMouseEnter={() => setIsPlaying(false)}
            onMouseLeave={() => setIsPlaying(true)}
          >
            {/* Slide Image Background with luxury crossfade */}
            <div className="absolute inset-0 z-0">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIndex}
                  src={currentStep.image}
                  alt={currentStep.title}
                  className="absolute inset-0 w-full h-full object-cover select-none"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 0.65, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.7 }}
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/45 to-transparent z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-stone-950/70 via-transparent to-transparent z-10"></div>
            </div>

            {/* Scanning Laser bar sweep */}
            <div className="absolute top-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#C5A862]/70 to-transparent shadow-[0_0_12px_rgba(197,168,98,0.5)] animate-biometric-scan pointer-events-none z-20"></div>

            {/* Holographic scanning telemetry SVG overlay */}
            <div className="absolute top-12 right-6 md:right-10 z-20 bg-stone-950/80 backdrop-blur-md rounded-3xl border border-white/10 p-5 shadow-xl pointer-events-none hidden sm:flex flex-col items-center gap-2">
              <span className="text-[7.5px] font-mono text-stone-400 uppercase tracking-widest text-center">BIOMETRIC TRACK</span>
              <svg className="w-[120px] h-[120px] overflow-visible" viewBox="0 0 120 120">
                {renderHolographicWidget()}
              </svg>
              <span className="text-[7px] font-mono text-[#C5A862] uppercase tracking-widest text-center animate-pulse">S9 SPECTRO UNIT</span>
            </div>

            {/* Overlaid Copy Narrative & Indicators */}
            <div className="relative z-20 max-w-lg space-y-4">
              
              {/* Category Step Badge */}
              <div className="flex items-center gap-2">
                <span className="text-white/60 font-mono text-[10px] uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm border border-white/5">
                  PASO {String(activeIndex + 1).padStart(2, '0')} / 06
                </span>
                <span className="text-[10px] font-mono tracking-[0.25em] font-bold text-[#009E9E]">
                  {currentStep.tagline}
                </span>
              </div>

              {/* Title & Badge */}
              <div className="space-y-1">
                <h3 className="text-2xl md:text-4xl font-serif text-white font-bold leading-tight">
                  {currentStep.title}
                </h3>
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[8.5px] font-mono uppercase tracking-widest border font-bold ${currentStep.badgeColor}`}>
                  {currentStep.badge}
                </span>
              </div>

              {/* Detailed Explanation */}
              <p className="text-stone-300 font-sans text-xs md:text-sm leading-relaxed font-light">
                {currentStep.detail}
              </p>

              {/* Step Key Features Tags */}
              <div className="pt-2">
                <span className="text-[8px] font-mono text-stone-400 uppercase tracking-[0.2em] block mb-2 font-bold">
                  ELEMENTOS CLAVE DEL PROCESO
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentStep.biomarkers.map((bio, idx) => (
                    <span 
                      key={idx} 
                      className="text-[9px] font-sans text-white/90 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md backdrop-blur-sm flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeIndex % 2 === 0 ? "#009E9E" : "#C5A862" }}></span>
                      {bio}
                    </span>
                  ))}
                </div>
              </div>

              {/* Navigation and Rotation Controls */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                
                {/* Arrow buttons */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handlePrev}
                    className="p-2.5 rounded-full border border-white/15 text-white/80 hover:text-white hover:bg-white/10 transition-colors bg-white/5 backdrop-blur-sm"
                    title="Anterior"
                  >
                    <motion.span whileTap={{ scale: 0.9 }} className="block">
                      <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                    </motion.span>
                  </button>
                  <button 
                    onClick={handleNext}
                    className="p-2.5 rounded-full border border-white/15 text-white/80 hover:text-white hover:bg-white/10 transition-colors bg-white/5 backdrop-blur-sm"
                    title="Siguiente"
                  >
                    <motion.span whileTap={{ scale: 0.9 }} className="block">
                      <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </motion.span>
                  </button>
                </div>

                {/* Autoplay visual loading bar */}
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-white/50">
                    {isPlaying ? 'SIGUIENTE EN MARCHA' : 'PAUSADO'}
                  </span>
                  <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden relative">
                    {isPlaying && (
                      <motion.div 
                        key={activeIndex}
                        className="h-full bg-white rounded-full"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 7, ease: 'linear' }}
                      />
                    )}
                    {!isPlaying && (
                      <div className="h-full bg-white/30 rounded-full w-full" />
                    )}
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* RIGHT: High-Definition Scannable Selector Grid (5 columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between z-10 space-y-6">
            
            {/* Quick Informational Panel */}
            <div className="bg-white/50 backdrop-blur-md p-4 rounded-3xl border border-stone-200/80">
              <span className="text-[8.5px] font-mono text-[#009E9E] uppercase tracking-[0.25em] block mb-1 font-bold">
                ESTRATEGIAS DE LONGEVIDAD
              </span>
              <h3 className="text-stone-900 font-serif text-lg md:text-xl font-bold leading-tight">
                Flujo del Procedimiento
              </h3>
              <p className="text-stone-500 font-sans text-xs mt-1 leading-relaxed font-light">
                Haz clic en cualquier fase para explorar los requisitos, tiempos y entregables diseñados para optimizar tu metabolismo de forma práctica.
              </p>
            </div>

            {/* List of 6 steps with neat click interactions and hover effects */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
              {steps.map((step, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={step.num}
                    onClick={() => {
                      setIsPlaying(false);
                      setActiveIndex(idx);
                    }}
                    onMouseEnter={() => {
                      setActiveIndex(idx);
                    }}
                    className={`text-left relative p-3.5 rounded-2xl border transition-all duration-300 flex items-center gap-3.5 ${
                      isActive
                        ? 'bg-white border-stone-300 shadow-md translate-x-1.5'
                        : 'bg-[#FAFAF9] border-stone-200/60 hover:bg-white hover:border-stone-300 hover:translate-x-1'
                    }`}
                  >
                    {/* Lateral indicator color line */}
                    <div 
                      className="absolute left-0 top-1/4 bottom-1/4 w-1 rounded-r-md transition-all duration-300"
                      style={{ 
                        backgroundColor: isActive 
                          ? (idx % 2 === 0 ? '#009E9E' : '#C5A862') 
                          : 'transparent' 
                      }}
                    ></div>

                    {/* Compact Number Ring */}
                    <div 
                      className="w-9 h-9 rounded-xl border flex items-center justify-center font-serif text-xs font-bold transition-colors duration-300 flex-shrink-0"
                      style={{
                        backgroundColor: isActive 
                          ? (idx % 2 === 0 ? 'rgba(0,158,158,0.1)' : 'rgba(197,168,98,0.1)') 
                          : 'rgba(230,225,220,0.25)',
                        borderColor: isActive 
                          ? (idx % 2 === 0 ? 'rgba(0,158,158,0.3)' : 'rgba(197,168,98,0.3)') 
                          : 'rgba(230,225,220,0.5)',
                        color: isActive 
                          ? (idx % 2 === 0 ? '#009E9E' : '#C5A862') 
                          : '#6B7280'
                      }}
                    >
                      {step.num}
                    </div>

                    {/* Step Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-xs md:text-sm font-serif font-bold text-stone-900 truncate">
                          {step.title}
                        </h4>
                        <span className="text-[7px] font-mono text-stone-400 uppercase tracking-wider shrink-0 font-bold">
                          {isActive ? 'PASO ACTUAL' : 'EXPLORAR'}
                        </span>
                      </div>
                      <p className="text-[10px] text-stone-500 font-sans leading-tight truncate font-light mt-0.5">
                        {step.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Sticky/Neat premium Call to Action */}
            <div className="p-4 bg-white/60 rounded-3xl border border-stone-200/80 space-y-3">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#009E9E] hover:bg-[#C5A862] text-white font-mono text-[10px] uppercase tracking-[0.15em] font-bold transition-all duration-300 shadow-md shadow-[#009E9E]/10"
              >
                <Phone size={11} className="fill-current" />
                Agendar Cita por WhatsApp
              </a>
              <p className="text-[8px] font-mono text-center text-stone-400 uppercase tracking-widest">
                ● Citas presenciales en Lima o kits a nivel nacional
              </p>
            </div>

          </div>

        </div>

        {/* Bottom row with Sci Standards Button */}
        <div className="mt-20 border-t border-stone-200 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3 text-stone-500 text-[9px] font-mono uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
            Tecnología alemana certificada para optimización epigenética
          </div>
          <button 
            onClick={onOpenHowItWorks}
            className="inline-flex items-center gap-2.5 text-xs font-bold font-mono uppercase tracking-[0.2em] text-stone-700 hover:text-[#C5A862] transition-colors border-b border-stone-200 pb-1"
          >
            Ver estándares científicos de precisión <ArrowRight size={11} />
          </button>
        </div>

      </div>
    </section>
  );
};

// --- SECCIÓN 8: GENN COACH COMPANION ---
export const GennCoachCompanion: React.FC<{ onOpenCoach: () => void }> = ({ onOpenCoach }) => {
  const [activePrompt, setActivePrompt] = useState<number | null>(null);
  const [typedResponse, setTypedResponse] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const prompts = [
    {
      q: '¿Qué cenar en un restaurante peruano si mi mitocondria tiene fatiga digestiva hoy?',
      a: 'Pide una porción de anticuchos de corazón de res con un mix de espinacas. El corazón de res contiene altos depósitos de Coenzima Q10 (vital para restaurar tus ciclos energéticos mitocondriales) y el magnesio de la espinaca aliviará tu carga metabólica.'
    },
    {
      q: 'Siento letargia y dolor de cabeza a las 4 PM. ¿Qué biomarcador puede explicarlo?',
      a: 'Basado en perfiles metabólicos altos, la letargia post-almuerzo a las 4 PM suele sugerir una supresión de absorción de Zinc o saturación de glándulas adrenales por ingesta tardía de cafeína. Te sugiero descansar 10 minutos de pantallas y tomar infusión de albahaca santa (Tulsi).'
    },
    {
      q: '¿Qué tipo de suplemento de Magnesio absorbe mejor mi perfil epigenético?',
      a: 'Si tu análisis folicular detectó alta sensibilidad electromagnética y tensión neural, el Glicinato de Magnesio es la combinación óptima. Si sufres de fatiga celular muscular, prefiere el Malato de Magnesio. Evita el Óxido común, ya que tu digestión posee baja receptividad intestinal.'
    }
  ];

  useEffect(() => {
    if (activePrompt !== null) {
      setIsTyping(true);
      setTypedResponse('');
      let fullText = prompts[activePrompt].a;
      let i = 0;
      let interval = setInterval(() => {
        setTypedResponse((prev) => prev + fullText.charAt(i));
        i++;
        if (i >= fullText.length) {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 15);
      return () => clearInterval(interval);
    }
  }, [activePrompt]);

  return (
    <section id="coach" className="py-32 bg-white relative overflow-hidden px-6 md:px-12 border-t border-stone-200">
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-[#009E9E]/3 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-[#009E9E] font-mono text-[10px] uppercase tracking-[0.5em] mb-4 block font-bold">ACOMPAÑANTE COGNITIVO</span>
          <h2 className="text-4xl md:text-6xl font-serif text-stone-900 tracking-tight leading-none mb-6">
            Genn Coach AI<br/>
            <span className="italic text-[#C5A862]">Tu guía personal.</span>
          </h2>
          <p className="text-stone-600 font-sans font-light text-base leading-relaxed mb-6">
            Entregar un reporte en PDF de 30 páginas es la forma tradicional de asustar. En Gennova, creamos un ecosistema de acompañamiento diario inspirado en la proximidad humana.
          </p>
          <p className="text-stone-600 font-sans font-light text-base leading-relaxed mb-8">
            Genn Coach AI es tu co-piloto biológico de acceso continuo. Como característica exclusiva de nuestra futura Web App, te guiará las 24 horas del día de acuerdo a tus resultados foliculares.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href="https://wa.me/51982026165?text=Hola%20Gennova%2C%20me%20gustar%C3%ADa%20agendar%20una%20cita%20o%20consultar%20sobre%20el%20procedimiento%20de%20evaluaci%C3%B3n%20epigen%C3%A9tica%20para%20optimizar%20mi%20biolog%C3%ADa."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#009E9E] text-white font-semibold text-xs tracking-[0.2em] uppercase hover:bg-[#C5A862] transition-colors shadow-md shadow-[#009E9E]/10"
            >
              <Phone size={14} className="fill-current" />
              Agendar Evaluación por WhatsApp
            </a>
            <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest text-center sm:text-left">
              ● Próximamente en Web App
            </span>
          </div>
        </div>

        {/* AI Sim Dialog Card - Netflix / Her vibe */}
        <div className="p-1 bg-gradient-to-b from-stone-200 to-transparent rounded-[2.5rem] border border-stone-200 relative bg-[#FAFAF9] shadow-md">
          <div className="p-6 md:p-8 flex flex-col justify-between h-[450px]">
            {/* Header: Breathing Orb */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full flex items-center justify-center">
                  <motion.div 
                    animate={{ scale: [1, 1.25, 1], rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-tr from-[#009E9E] via-transparent to-[#C5A862] rounded-full opacity-40 blur-[4px]"
                  ></motion.div>
                  <Sparkles size={16} className="text-[#009E9E] z-10" />
                </div>
                <div>
                  <h4 className="text-stone-900 font-mono text-xs font-bold">GENN COACH AI</h4>
                  <span className="text-[10px] text-[#009E9E] font-mono uppercase tracking-widest font-semibold">Acompañante Activo</span>
                </div>
              </div>
              <span className="text-[9px] text-[#C5A862] font-mono uppercase font-bold">Vibe: Her / Apple Intelligence</span>
            </div>

            {/* Questions to Simulate */}
            <div className="my-6 flex-grow overflow-y-auto pr-2 flex flex-col justify-center gap-4">
              {activePrompt === null ? (
                <div className="space-y-3">
                  <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block mb-1 font-bold">SELECCIONA UNA CONSULTA PARA PROBAR</span>
                  {prompts.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePrompt(idx)}
                      className="w-full text-left bg-white p-4 rounded-xl border border-stone-200 hover:border-stone-400 hover:shadow-sm transition-all text-xs text-stone-700 hover:text-stone-950 shadow-sm"
                    >
                      "{p.q}"
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-[#009E9E]/10 p-4 rounded-xl border border-[#009E9E]/15 self-end max-w-[90%] ml-auto text-xs text-stone-800">
                    "{prompts[activePrompt].q}"
                  </div>
                  
                  <div className="bg-white p-4 rounded-xl border border-stone-200 self-start max-w-[90%] text-xs text-stone-700 font-light flex items-start gap-2 h-36 overflow-y-auto no-scrollbar shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A862] shrink-0 mt-1"></span>
                    <div>
                      {typedResponse}
                      {isTyping && <span className="inline-block w-1.5 h-3 bg-[#C5A862] ml-1 animate-pulse" />}
                    </div>
                  </div>

                  <button 
                    onClick={() => setActivePrompt(null)} 
                    className="text-[9px] font-mono text-stone-500 hover:text-stone-800 uppercase tracking-widest block underline text-right"
                  >
                    Hacer otra pregunta
                  </button>
                </div>
              )}
            </div>

            {/* Simulated Chat Input */}
            <div className="p-1 px-4 bg-white border border-stone-200 rounded-2xl flex items-center justify-between text-xs text-stone-400 h-11 shadow-inner">
              <span>Escribe tu pregunta folicular...</span>
              <ArrowRight size={14} className="text-stone-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- SECCIÓN 9: HISTORIAS REALES ---
export const EditorialStories: React.FC = () => {
  return (
    <section id="historias" className="py-32 bg-[#FAFAF9] relative overflow-hidden px-6 md:px-12 border-t border-stone-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-[#C5A862] font-mono text-[10px] uppercase tracking-[0.5em] mb-4 block font-bold">TRANSFORMACIONES DOCUMENTADAS</span>
          <h2 className="text-4xl md:text-6xl font-serif text-stone-900 tracking-tight leading-none mb-6">
            Historias Reales.
          </h2>
          <p className="text-stone-600 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Relatos editoriales de personas excepcionales que decidieron eliminar el "guessing" y descifrar su código epigenético.
          </p>
        </div>

        {/* 4 Cards grid editorial style */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* USER 1 */}
          <div className="relative h-[480px] rounded-[2.5rem] overflow-hidden border border-stone-200 group bg-white cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop" 
                alt="Elena" 
                className="w-full h-full object-cover opacity-70 grayscale group-hover:scale-105 group-hover:opacity-90 group-hover:grayscale-0 transition-all duration-700 select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent"></div>
            </div>
            <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
              <span className="text-[9px] font-mono tracking-widest text-[#C5A862] uppercase mb-2 font-bold">01. ENERGÍA MITOCONDRIAL</span>
              <h4 className="text-2xl font-serif text-white mb-3">Elena, 34 años</h4>
              <p className="text-white/80 text-xs font-sans leading-relaxed line-clamp-4">
                "Solía arrastrarme a las 4 de la tarde y dependía de tres espressos dobles. Decodificar mi asimilación de Magnesio de los folículos eliminó la fatiga cerebral profunda en solo dos semanas."
              </p>
            </div>
          </div>

          {/* USER 2 */}
          <div className="relative h-[480px] rounded-[2.5rem] overflow-hidden border border-stone-200 group bg-white cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop" 
                alt="Juan Carlos" 
                className="w-full h-full object-cover opacity-70 grayscale group-hover:scale-105 group-hover:opacity-90 group-hover:grayscale-0 transition-all duration-700 select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent"></div>
            </div>
            <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
              <span className="text-[9px] font-mono tracking-widest text-[#009E9E] uppercase mb-2 font-bold">02. DESINFLAMACIÓN METABÓLICA</span>
              <h4 className="text-2xl font-serif text-white mb-3">Juan Carlos, 42 años</h4>
              <p className="text-white/80 text-xs font-sans leading-relaxed line-clamp-4">
                "Eliminé gluten y lácteos tradicionales pensando que estaba curando mi digestión, pero seguía inflamado. Gennova documentó que mi verdadera sensibilidad secundaria era a la levadura y espárragos. Hoy vivo plano y desinflamado."
              </p>
            </div>
          </div>

          {/* USER 3 */}
          <div className="relative h-[480px] rounded-[2.5rem] overflow-hidden border border-stone-200 group bg-white cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop" 
                alt="Sofía" 
                className="w-full h-full object-cover opacity-70 grayscale group-hover:scale-105 group-hover:opacity-90 group-hover:grayscale-0 transition-all duration-700 select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent"></div>
            </div>
            <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
              <span className="text-[9px] font-mono tracking-widest text-emerald-300 uppercase mb-2 font-bold">03. RECUPERACIÓN DEPORTIVA</span>
              <h4 className="text-2xl font-serif text-white mb-3">Sofía, 28 años</h4>
              <p className="text-white/80 text-xs font-sans leading-relaxed line-clamp-4">
                "Entrenaba para una maratón y mis piernas dolían crónicamente. Gennova evidenció acumulación de metales livianos por polución de la ciudad donde corro. Sincronizar mis antioxidantes limpió mis tiempos."
              </p>
            </div>
          </div>

          {/* USER 4 */}
          <div className="relative h-[480px] rounded-[2.5rem] overflow-hidden border border-stone-200 group bg-white cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop" 
                alt="Patricia" 
                className="w-full h-full object-cover opacity-70 grayscale group-hover:scale-105 group-hover:opacity-90 group-hover:grayscale-0 transition-all duration-700 select-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent"></div>
            </div>
            <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
              <span className="text-[9px] font-mono tracking-widest text-purple-300 uppercase mb-2 font-bold">04. DISMINUCIÓN EDAD BIOLÓGICA</span>
              <h4 className="text-2xl font-serif text-white mb-3">Patricia, 51 años</h4>
              <p className="text-white/80 text-xs font-sans leading-relaxed line-clamp-4">
                "A los 51 sentía que perdía agilidad celular. Tras 90 días con recomendaciones de metilación folicular que obtuve de mi muestra de cabello, mi score epigenético aumentó y mi edad biológica bajó en 4.2 años."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- SECCIÓN 10: ¿QUÉ NIVEL DE ACOMPAÑAMIENTO BUSCAS? ---
export const AcompanamientoSelector: React.FC<SectionProps> = ({ onSelectPlan, onStartQuiz, onContact }) => {
  const [level, setLevel] = useState<'esencial' | 'evolucion' | 'elite'>('esencial');

  const levelsDetails = {
    esencial: {
      id: 'start',
      name: 'BIO-ESENCIAL',
      description: 'Claridad biológica inmediata para quienes se inician en la longevidad celular.',
      price: '729',
      duration: '30 días',
      coverage: 'Mapeo completo de 12 sistemas biológicos primarios',
      support: 'Sesión de interpretación profunda folicular de resultados con especialista (90 minutos)',
      tech: 'Test Epigenético Folicular de Epixlife y Cell Wellbeing',
      action: 'Adquirir Bio-Esencial',
      visualScan: 'Métricas Epigenéticas Esenciales'
    },
    evolucion: {
      id: 'plus',
      name: 'BIO-EVOLUCIÓN',
      description: 'Evolución biológica guiada de mediano plazo para medir el impacto real de los hábitos.',
      price: '1,299',
      duration: '60 días',
      coverage: 'Mapeo completo de 12 sistemas biológicos y plan epigenético integral x 60 días',
      support: '2 Sesiones personalizadas con asesores especializados (Bióloga/Trofóloga)',
      tech: 'Test Epigenético Folicular de Epixlife y Cell Wellbeing',
      action: 'Adquirir Bio-Evolución',
      visualScan: 'Edad Biológica Progresiva (-3.2 Años)'
    },
    elite: {
      id: 'elite',
      name: 'BIO-ELITE',
      description: 'Control biológico supremo y absoluto para bio-optimización con staff integral de expertos.',
      price: '2,599',
      duration: '90 días',
      coverage: 'Doble Evaluación Epigenética de entrada/salida para contrastar evolución celular',
      support: '3 Sesiones profundas con el staff de doctores de Gennova más acceso premium',
      tech: 'Doble Test Epigenético de Epixlife y Cell Wellbeing',
      action: 'Adquirir Bio-Elite',
      visualScan: 'Control de Metilación 98% Completo'
    }
  };

  const current = levelsDetails[level];

  return (
    <section id="planes" className="py-32 bg-white relative overflow-hidden px-6 md:px-12 border-t border-stone-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#C5A862] font-mono text-[10px] uppercase tracking-[0.5em] mb-4 block font-bold">TU NIVEL DE COMPRENSIÓN</span>
          <h2 className="text-4xl md:text-6xl font-serif text-stone-900 tracking-tight leading-none mb-6">
            Membresía & Acompañamiento
          </h2>
          <p className="text-stone-600 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            No vendemos exámenes. Ofrecemos planes dirigidos de transformación epigenética. Elige el nivel de acompañamiento e interacción que buscas.
          </p>
        </div>

        {/* Level tabs (Apple style - choice first, transformation first) */}
        <div className="flex justify-center gap-4 max-w-2xl mx-auto mb-16 border-b border-stone-200 pb-6">
          {(['esencial', 'evolucion', 'elite'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevel(lvl)}
              className={`flex-1 py-4 font-mono text-xs uppercase tracking-wider font-bold border-b-2 transition-all duration-300 ${
                level === lvl 
                  ? 'text-[#009E9E] border-[#009E9E]' 
                  : 'text-stone-400 border-transparent hover:text-stone-900'
              }`}
            >
              {lvl === 'esencial' ? 'BIO-ESENCIAL' : lvl === 'evolucion' ? 'BIO-EVOLUCIÓN' : 'BIO-ELITE'}
            </button>
          ))}
        </div>

        {/* Level Transformation Presentation Grid */}
        <div className="grid md:grid-cols-2 gap-12 bg-[#FAFAF9] rounded-[3rem] border border-stone-200/80 p-8 md:p-12 items-center relative shadow-sm">
          
          {/* Left: Transformation Visuals of the level */}
          <div className="bg-white rounded-[2rem] p-8 border border-stone-200 h-[340px] flex flex-col justify-between relative overflow-hidden group shadow-sm">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,158,158,0.02),transparent_60%)]"></div>
            
            {/* Minimalist chart vector syncing with chosen level */}
            <div className="flex justify-between items-center border-b border-stone-200 pb-4">
              <span className="text-[10px] font-mono text-[#C5A862] uppercase tracking-wider font-bold">REPRESENTACIÓN BIOLÓGICA</span>
              <Activity size={16} className="text-stone-400 animate-pulse" />
            </div>

            <div className="flex-grow flex items-center justify-center py-6">
              {level === 'esencial' && (
                <div className="flex items-end gap-3 h-24">
                  <div className="w-1.5 h-12 bg-[#009E9E]/20 rounded-full"></div>
                  <div className="w-1.5 h-16 bg-[#009E9E]/40 rounded-full"></div>
                  <div className="w-1.5 h-20 bg-[#009E9E]/70 rounded-full"></div>
                  <div className="w-1.5 h-24 bg-[#009E9E] rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest pl-2 font-bold">Energía Celular</span>
                </div>
              )}
              {level === 'evolucion' && (
                <div className="relative h-24 w-32 flex items-center justify-center">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                    className="w-20 h-20 border border-dashed border-[#C5A862]/60 rounded-full absolute"
                  />
                  <span className="text-[10px] font-mono text-stone-600 tracking-widest uppercase font-bold">Edad Bio</span>
                </div>
              )}
              {level === 'elite' && (
                <div className="flex flex-col items-center gap-2">
                  <Sparkles size={28} className="text-[#009E9E] animate-pulse" />
                  <span className="text-[9px] font-mono text-[#C5A862] tracking-[0.3em] uppercase font-bold">Control Supremo</span>
                </div>
              )}
            </div>

            <div className="bg-stone-900 px-4 py-2.5 rounded-xl border border-stone-800 text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2 shadow-md">
              <Check size={12} strokeWidth={3} className="text-[#009E9E]" /> {current.visualScan}
            </div>
          </div>

          {/* Right: Technical specifications and pricing inside card */}
          <div className="flex flex-col justify-between h-full">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#C5A862] bg-[#C5A862]/8 px-3 py-1 rounded-full border border-[#C5A862]/15 font-bold">{current.duration} de Cobertura</span>
              <h3 className="text-3xl md:text-4xl font-serif text-stone-900 mt-4 mb-2">{current.name}</h3>
              <p className="text-stone-600 text-xs leading-relaxed mb-6 font-sans">
                {current.description}
              </p>

              {/* Specs Table */}
              <div className="space-y-4 border-t border-stone-200 pt-6 mb-8 font-sans">
                <div className="flex justify-between text-xs pb-3 border-b border-stone-200">
                  <span className="text-stone-500">Tecnología de Evaluación:</span>
                  <span className="text-stone-900 font-medium text-right max-w-[200px]">{current.tech}</span>
                </div>
                <div className="flex justify-between text-xs pb-3 border-b border-stone-200">
                  <span className="text-stone-500">Sistemas Analizados:</span>
                  <span className="text-stone-900 font-medium text-right max-w-[200px]">{current.coverage}</span>
                </div>
                <div className="flex justify-between text-xs pb-3">
                  <span className="text-stone-500">Asesoría Médica:</span>
                  <span className="text-[#C5A862] font-medium text-right max-w-[200px] font-semibold">{current.support}</span>
                </div>
              </div>
            </div>

            {/* Price block and Admissions CTA */}
            <div>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="font-mono text-3xl font-bold text-stone-900">S/. {current.price}</span>
                <span className="text-stone-500 text-xs font-mono uppercase font-semibold">Pago Único</span>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <button
                  onClick={() => onSelectPlan(current.id)}
                  className="w-full py-4 rounded-full bg-[#009E9E] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#C5A862] transition-all shadow-md shadow-[#009E9E]/10"
                >
                  {current.action}
                </button>
                <button
                  onClick={onContact}
                  className="w-full py-4 rounded-full bg-transparent border border-stone-300 text-stone-700 font-semibold text-xs uppercase tracking-wider hover:bg-stone-50 transition-all flex items-center justify-center gap-2 font-mono"
                >
                  <Phone size={12} /> Contactar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- SECCIÓN 10: SIMULADOR INTERACTIVO S-DRIVE CELL WELLBEING ---
export const SDriveSimulatorSection: React.FC = () => {
  const [stage, setStage] = useState<'ready' | 'scanning' | 'analyzing' | 'completed'>('ready');
  const [progress, setProgress] = useState(0);
  const [logText, setLogText] = useState('Listo para iniciar espectrografía capilar S-Drive...');
  const [age, setAge] = useState(35);
  const [gender, setGender] = useState<'masculino' | 'femenino'>('femenino');
  const [healthGoal, setHealthGoal] = useState<'longevity' | 'sport' | 'brain' | 'gut'>('longevity');

  useEffect(() => {
    if (stage !== 'scanning') return;
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (next >= 100) {
          clearInterval(interval);
          setStage('analyzing');
          return 100;
        }
        // Custom logs based on progress and selected goal
        if (next < 20) {
          setLogText(`Estableciendo frecuencia base para perfil ${gender === 'femenino' ? 'Femenino' : 'Masculino'} de ${age} años...`);
        } else if (next < 45) {
          setLogText('Iniciando calibración espectrográfica de las 4 hebras foliculares capilares...');
        } else if (next < 70) {
          if (healthGoal === 'longevity') {
            setLogText('Buscando biomarcadores de metilación celular, estrés oxidativo y telómeros...');
          } else if (healthGoal === 'sport') {
            setLogText('Analizando firmas de síntesis de ATP mitocondrial, lactato y absorción mineral...');
          } else if (healthGoal === 'brain') {
            setLogText('Mapeando neurotransmisores, interferencias EMF y ácidos grasos cerebrales...');
          } else {
            setLogText('Evaluando permeabilidad digestiva, microbioma y aditivos sintéticos...');
          }
        } else if (next < 90) {
          setLogText('Cifrando firmas de oscilación electromagnética con algoritmo cuántico...');
        } else {
          setLogText('Transmitiendo datos via canal cifrado a Hamburgo, Alemania...');
        }
        return next;
      });
    }, 55);
    return () => clearInterval(interval);
  }, [stage, age, gender, healthGoal]);

  useEffect(() => {
    if (stage !== 'analyzing') return;
    const timeout = setTimeout(() => {
      setStage('completed');
    }, 2200);
    return () => clearTimeout(timeout);
  }, [stage]);

  const handleStartScan = () => {
    setStage('scanning');
    setProgress(0);
    setLogText('Estableciendo conexión con el S-Drive...');
  };

  const handleReset = () => {
    setStage('ready');
    setProgress(0);
    setLogText('Listo para iniciar espectrografía capilar S-Drive...');
  };

  // Tailored recommendation output based on selection
  const getGoalData = () => {
    switch (healthGoal) {
      case 'sport':
        return {
          title: "Protocolo de Optimización Deportiva",
          desc: "Se detectó demanda crítica de asimilación de minerales clave y síntesis energética mitocondrial. Se sugiere priorizar un plan alimentario rico en electrolitos orgánicos y suplementación limpia de alta absorción.",
          supps: ["Magnesio Malato", "Coenzima Q10 Liposomada", "Creatina Monohidratada Pura"],
          loads: { emf: "MEDIA", metals: "BAJA", additives: "ALTA" },
          bioAgeDiff: 2
        };
      case 'brain':
        return {
          title: "Protocolo de Neuro-Enfoque y Descanso",
          desc: "El mapa espectrográfico refleja una alta exposición a campos electromagnéticos que alteran la secreción de melatonina y la plasticidad sináptica. Clave para restaurar enfoque y balance cognitivo.",
          supps: ["L-Teanina", "Hongo Melena de León (Lion's Mane)", "Metilcobalamina B12"],
          loads: { emf: "CRÍTICA", metals: "MEDIA", additives: "BAJA" },
          bioAgeDiff: 3
        };
      case 'gut':
        return {
          title: "Protocolo de Restauración Intestinal",
          desc: "Muestra sobrecarga por aditivos alimentarios y sensibilidad epigenética en vellosidades digestivas. Se sugiere excluir temporalmente colorantes y preservantes para desinflamar.",
          supps: ["Probióticos Humanos Cepas Clínicas", "L-Glutamina Pura", "Zinc Carnosina"],
          loads: { emf: "BAJA", metals: "MEDIA", additives: "CRÍTICA" },
          bioAgeDiff: 1
        };
      case 'longevity':
      default:
        return {
          title: "Protocolo de Longevidad Celular & Anti-Edad",
          desc: "Metilación en rango moderado. Se sugiere suplementar para modular los telómeros y potenciar la renovación mitocondrial frente al daño oxidativo diario acumulado.",
          supps: ["Precursores de NAD+", "Vitamina D3+K2 Gotas", "Omega 3 Ultra Filtrado (EPA/DHA)"],
          loads: { emf: "ALTA", metals: "MEDIA", additives: "ALTA" },
          bioAgeDiff: 4
        };
    }
  };

  const currentGoalData = getGoalData();
  const simulatedBioAge = Math.max(18, age - currentGoalData.bioAgeDiff);

  const whatsappText = `Hola Gennova, he realizado la simulación S-Drive (Meta: ${healthGoal === 'longevity' ? 'Longevidad' : healthGoal === 'sport' ? 'Deportes' : healthGoal === 'brain' ? 'Cerebro' : 'Intestinal'}, Edad: ${age} años, Género: ${gender === 'femenino' ? 'Femenino' : 'Masculino'}). Deseo agendar una prueba real de mis 4 hebras de cabello con el S-Drive para mapear mis 96 biomarcadores reales.`;
  const whatsappUrl = `https://wa.me/51932818432?text=${encodeURIComponent(whatsappText)}`;

  return (
    <section id="s-drive-simulador" className="py-24 bg-white border-t border-stone-200 px-6 md:px-12 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[#009E9E]/5 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#C5A862]/3 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>

      <div className="max-w-7xl mx-auto">
        {/* Head of Section */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <span className="text-[#009E9E] font-mono text-[10px] uppercase tracking-[0.5em] mb-4 block font-bold">
            TECNOLOGÍA S-DRIVE • CELL WELLBEING ALEMANIA
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-stone-900 mb-6 leading-tight tracking-tight">
            Escáner S-Drive <span className="italic text-[#C5A862]">en Acción</span>
          </h2>
          <p className="text-stone-600 font-sans text-sm md:text-base leading-relaxed font-light">
            El S-Drive es un dispositivo de bio-resonancia de última generación. En lugar de extraer sangre o usar métodos invasivos, analiza <strong className="text-stone-900 font-semibold">4 hebras de cabello con raíz</strong>. Experimenta nuestro simulador interactivo para ver cómo tu biología se digitaliza y se procesa en el laboratorio central de Hamburgo.
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-stretch">
          {/* LEFT: Technical Info & Physics Explanation */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#009E9E]/10 border border-[#009E9E]/20 text-[#009E9E] text-[10px] font-mono font-bold uppercase tracking-wider">
                <Settings size={12} className="animate-spin-slow" />
                Ingeniería de Precisión
              </div>
              <h3 className="text-2xl md:text-3xl font-serif text-stone-900 leading-tight">
                ¿Por qué el bulbo capilar?
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed font-light">
                El folículo capilar es un sensor biológico altamente sensible. Al crecer, absorbe nutrientes, toxinas y ondas electromagnéticas del entorno. Al escanearlo, extraemos una firma de oscilación electromagnética que representa el historial epigenético de tus últimos 90 días.
              </p>
            </div>

            {/* Steps list */}
            <div className="space-y-4 my-8">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-[#C5A862]/10 text-[#C5A862] border border-[#C5A862]/20 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-1">
                  1
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-stone-800">Recolección de 4 Hebras</h4>
                  <p className="text-stone-500 text-xs mt-1 font-light">
                    Se extraen suavemente 4 hebras con su bulbo intacto (donde se concentra la información biológica).
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-[#009E9E]/10 text-[#009E9E] border border-[#009E9E]/20 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-1">
                  2
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-stone-800">Mapeo Espectrográfico S-Drive</h4>
                  <p className="text-stone-500 text-xs mt-1 font-light">
                    Las muestras se colocan en la bobina espectrográfica del S-Drive, que mide firmas bio-frecuenciales en minutos.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 border border-purple-200 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-1">
                  3
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-stone-800">Cómputo en Hamburgo, Alemania</h4>
                  <p className="text-stone-500 text-xs mt-1 font-light">
                    Los datos digitalizados viajan de forma cifrada a los servidores de alta fidelidad alemanes para un desglose de 96 biomarcadores.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl text-[11px] leading-relaxed text-stone-500 font-sans">
              <strong>Simulador S-Drive:</strong> Completa los datos en la cabina digital de la derecha para calibrar el análisis preventivo simulado.
            </div>
          </div>

          {/* RIGHT: High-Fidelity Interactive Simulator Sandbox */}
          <div className="lg:col-span-7 bg-stone-950 rounded-[2.5rem] border border-stone-850 p-8 md:p-10 shadow-2xl relative overflow-hidden min-h-[580px] flex flex-col justify-between text-white">
            {/* Holographic background mesh */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(56,232,248,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(56,232,248,0.015)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40"></div>
            
            <div className="flex justify-between items-center relative z-10 border-b border-stone-800 pb-4 mb-4">
              <span className="text-[9px] font-mono text-[#009E9E] uppercase tracking-widest font-bold">
                MÓDULO DE SIMULACIÓN CUÁNTICA S-DRIVE
              </span>
              <span className="text-[8px] font-mono text-stone-500 tracking-widest uppercase">
                S-DRIVE DE-ENG S/N: 489-K2
              </span>
            </div>

            {/* STAGE: READY */}
            {stage === 'ready' && (
              <div className="relative z-10 flex flex-col justify-between flex-grow space-y-6">
                <div className="flex flex-col items-center justify-center py-4 text-center space-y-4">
                  {/* Visual Hair Induction Loop */}
                  <div className="relative w-40 h-40 flex items-center justify-center">
                    <div className="absolute inset-0 bg-[#009E9E]/10 rounded-full border border-[#009E9E]/20 animate-pulse"></div>
                    <div className="absolute inset-4 bg-stone-900 rounded-full border border-stone-800 flex items-center justify-center shadow-xl">
                      <Fingerprint size={48} className="text-[#009E9E]/40" strokeWidth={1} />
                    </div>
                    
                    {/* Hair Strands Vector */}
                    <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" viewBox="0 0 200 200">
                      <path d="M75,45 Q90,90 100,100" fill="none" stroke="#C5A862" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
                      <path d="M125,45 Q110,90 101,100" fill="none" stroke="#C5A862" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
                      <path d="M85,35 Q95,85 99,101" fill="none" stroke="#C5A862" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
                      <path d="M115,35 Q105,85 101,101" fill="none" stroke="#C5A862" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
                      <circle cx="100" cy="100" r="4" fill="#C5A862" className="animate-ping" />
                    </svg>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-white font-serif text-lg">Muestra Capilar Simulada</h4>
                    <p className="text-stone-400 text-xs max-w-sm">
                      Configura las variables bio-referenciales de tu perfil:
                    </p>
                  </div>
                </div>

                {/* Form Controls inside the simulator */}
                <div className="grid md:grid-cols-3 gap-4 bg-stone-900/60 p-5 rounded-2xl border border-stone-800/80">
                  {/* Control 1: Age */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-mono text-stone-400 uppercase tracking-wider">Edad Biológica</label>
                    <div className="flex items-center justify-between bg-stone-950 border border-stone-800 px-3 py-1.5 rounded-xl">
                      <button 
                        onClick={() => setAge(Math.max(18, age - 1))}
                        className="text-stone-400 hover:text-white font-mono text-sm font-bold px-1"
                      >
                        -
                      </button>
                      <span className="text-white font-mono text-xs font-bold">{age} Años</span>
                      <button 
                        onClick={() => setAge(Math.min(99, age + 1))}
                        className="text-stone-400 hover:text-white font-mono text-sm font-bold px-1"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Control 2: Gender */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-mono text-stone-400 uppercase tracking-wider">Género Referencial</label>
                    <div className="grid grid-cols-2 gap-1 bg-stone-950 border border-stone-800 p-0.5 rounded-xl">
                      <button
                        onClick={() => setGender('femenino')}
                        className={`py-1 text-[10px] font-bold rounded-lg transition-all ${
                          gender === 'femenino' ? 'bg-[#009E9E] text-white' : 'text-stone-400 hover:text-white'
                        }`}
                      >
                        FEM
                      </button>
                      <button
                        onClick={() => setGender('masculino')}
                        className={`py-1 text-[10px] font-bold rounded-lg transition-all ${
                          gender === 'masculino' ? 'bg-[#009E9E] text-white' : 'text-stone-400 hover:text-white'
                        }`}
                      >
                        MASC
                      </button>
                    </div>
                  </div>

                  {/* Control 3: Health Goal */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-mono text-stone-400 uppercase tracking-wider">Objetivo de Enfoque</label>
                    <select
                      value={healthGoal}
                      onChange={(e) => setHealthGoal(e.target.value as any)}
                      className="bg-stone-950 border border-stone-800 p-1.5 rounded-xl text-[10px] font-bold text-stone-300 focus:outline-none focus:border-[#009E9E] cursor-pointer"
                    >
                      <option value="longevity">Antienvejecimiento</option>
                      <option value="sport">Rendimiento Físico</option>
                      <option value="brain">Optimización Cerebral</option>
                      <option value="gut">Salud Digestiva</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleStartScan}
                  className="w-full py-4 rounded-full bg-[#009E9E] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#C5A862] transition-all duration-300 shadow-lg shadow-[#009E9E]/20"
                >
                  Colocar Hebras & Iniciar Escaneo
                </button>
              </div>
            )}

            {/* STAGE: SCANNING */}
            {stage === 'scanning' && (
              <div className="relative z-10 flex flex-col items-center justify-center py-8 text-center space-y-8 flex-grow">
                <div className="relative w-48 h-48 flex items-center justify-center">
                  {/* Rotating Scanning ring */}
                  <div className="absolute inset-0 bg-[#009E9E]/5 rounded-full border border-dashed border-[#009E9E]/40 animate-pulse"></div>
                  <div className="absolute inset-4 bg-stone-900 rounded-full border border-[#009E9E]/30 flex flex-col items-center justify-center relative overflow-hidden">
                    {/* Pulsing laser sweeps */}
                    <div className="absolute top-0 w-full h-[2px] bg-[#009E9E] shadow-[0_0_15px_#009E9E] animate-bounce"></div>
                    <Fingerprint size={48} className="text-[#009E9E] animate-pulse" strokeWidth={1} />
                    <span className="text-[10px] font-mono text-[#009E9E] mt-2 font-bold animate-pulse">{progress}%</span>
                  </div>
                </div>

                <div className="space-y-4 w-full max-w-md">
                  <div className="h-1 bg-stone-900 rounded-full overflow-hidden w-full border border-stone-800">
                    <div 
                      className="h-full bg-gradient-to-r from-[#009E9E] to-[#C5A862] transition-all duration-75"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="p-4 bg-stone-900/40 rounded-xl border border-stone-800/60 min-h-[50px] flex items-center justify-center">
                    <p className="text-[10.5px] font-mono text-[#009E9E] uppercase tracking-wider text-center">
                      {logText}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE: ANALYZING */}
            {stage === 'analyzing' && (
              <div className="relative z-10 flex flex-col items-center justify-center py-8 text-center space-y-8 flex-grow">
                <div className="relative w-40 h-40">
                  {/* Double helix pulsing overlay */}
                  <div className="absolute inset-0 bg-purple-900/10 rounded-full blur-2xl animate-pulse"></div>
                  <div className="absolute inset-4 border border-purple-500/30 rounded-full flex items-center justify-center">
                    <Activity size={32} className="text-purple-500 animate-bounce" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-white font-serif text-lg animate-pulse">Servidor Hamburgo Decodificando</h4>
                  <p className="text-stone-400 text-xs font-mono uppercase tracking-widest text-purple-500">
                    Analizando 96 firmas biológicas reales...
                  </p>
                </div>
              </div>
            )}

            {/* STAGE: COMPLETED */}
            {stage === 'completed' && (
              <div className="relative z-10 flex flex-col justify-between py-2 flex-grow space-y-6">
                <div>
                  <div className="flex justify-between items-center border-b border-stone-800 pb-4 mb-4">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
                      REPORTE DE PRE-ANÁLISIS COMPLETADO ✓
                    </span>
                    <span className="text-[9px] font-mono text-stone-500 uppercase">S-DRIVE SIM-V2.1</span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Bio Age comparison */}
                    <div className="bg-stone-900/60 p-4 rounded-2xl border border-stone-800 flex flex-col justify-center">
                      <span className="text-[9px] font-mono text-stone-500 uppercase tracking-wider block">Edad Celular Simulada</span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-4xl font-serif text-white font-bold">{simulatedBioAge}</span>
                        <span className="text-xs text-emerald-400 font-mono font-semibold">-{currentGoalData.bioAgeDiff} Años</span>
                      </div>
                      <p className="text-[9.5px] text-stone-500 mt-2 leading-relaxed">
                        Optimización capilar detectada con base en perfil {gender === 'femenino' ? 'Femenino' : 'Masculino'}.
                      </p>
                    </div>

                    {/* Stressors details */}
                    <div className="bg-stone-900/60 p-4 rounded-2xl border border-stone-800 space-y-2 text-left">
                      <span className="text-[9px] font-mono text-stone-400 uppercase tracking-widest block mb-1">Cargas Críticas Detectadas</span>
                      <div className="flex justify-between text-[10px] border-b border-stone-800/80 pb-1.5">
                        <span className="text-stone-400">Radiación Electromagnética:</span>
                        <span className={`font-bold font-mono ${currentGoalData.loads.emf === 'CRÍTICA' ? 'text-red-500' : currentGoalData.loads.emf === 'ALTA' ? 'text-red-400' : 'text-stone-500'}`}>
                          {currentGoalData.loads.emf}
                        </span>
                      </div>
                      <div className="flex justify-between text-[10px] border-b border-stone-800/80 pb-1.5">
                        <span className="text-stone-400">Traces de Metales Pesados:</span>
                        <span className={`font-bold font-mono ${currentGoalData.loads.metals === 'MEDIA' ? 'text-yellow-400' : 'text-green-400'}`}>
                          {currentGoalData.loads.metals}
                        </span>
                      </div>
                      <div className="flex justify-between text-[10px] pb-0.5">
                        <span className="text-stone-400">Aditivos & Químicos:</span>
                        <span className={`font-bold font-mono ${currentGoalData.loads.additives === 'CRÍTICA' ? 'text-red-500' : 'text-red-400'}`}>
                          {currentGoalData.loads.additives}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tailored Report Text */}
                  <div className="mt-4 bg-stone-900/40 p-4 rounded-2xl border border-stone-800/50 text-left">
                    <span className="text-[9.5px] font-mono text-[#C5A862] uppercase tracking-widest block mb-1.5 font-bold">
                      {currentGoalData.title}
                    </span>
                    <p className="text-xs text-stone-300 font-light leading-relaxed mb-3">
                      {currentGoalData.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {currentGoalData.supps.map((supp, index) => (
                        <span 
                          key={index}
                          className="text-[9.5px] font-mono bg-[#C5A862]/10 border border-[#C5A862]/20 text-[#C5A862] px-2.5 py-1 rounded-lg"
                        >
                          + {supp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-800 flex flex-col sm:flex-row gap-4 relative z-10">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3.5 rounded-full bg-[#009E9E] text-white text-center font-bold text-xs uppercase tracking-widest hover:bg-[#C5A862] transition-all flex items-center justify-center gap-2"
                  >
                    <Phone size={12} className="fill-current" /> Agendar Mi Prueba Real
                  </a>
                  <button
                    onClick={handleReset}
                    className="px-6 py-3.5 rounded-full bg-stone-900 border border-stone-800 text-stone-400 font-bold text-xs uppercase tracking-widest hover:text-white hover:border-stone-700 transition-all"
                  >
                    Escanear de Nuevo
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- SECCIÓN 11: DECLARACIÓN DE BIENESTAR PREVENTIVO ---
export const PreventiveWellnessDisclaimer: React.FC = () => {
  return (
    <section className="py-24 bg-[#FAFAF9] border-t border-stone-200/80 px-6 md:px-12 relative overflow-hidden">
      {/* Background radial soft light to make it premium */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,168,98,0.02),transparent_70%)] pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-white border border-stone-200/60 shadow-sm mb-6 text-[#009E9E]">
          <ShieldCheck size={28} strokeWidth={1.5} />
        </div>
        
        <span className="block text-[10px] font-mono uppercase tracking-[0.4em] text-[#C5A862] mb-3 font-semibold">
          Declaración de Bienestar Preventivo
        </span>
        
        <h3 className="text-2xl md:text-3xl font-serif text-stone-900 mb-6 leading-tight max-w-2xl mx-auto">
          Optimización biológica consciente, <span className="italic text-[#009E9E]">libre de diagnósticos clínicos.</span>
        </h3>
        
        <div className="space-y-4 max-w-3xl mx-auto text-stone-500 font-light text-sm font-sans leading-relaxed">
          <p>
            En Gennova Labs, <strong className="text-stone-800 font-medium">no brindamos diagnósticos médicos, ni prescribimos tratamientos para enfermedades.</strong> Toda la información, reportes espectrográficos y recomendaciones personalizadas proporcionadas están diseñadas con un enfoque estrictamente preventivo, educativo y proactivo.
          </p>
          <p>
            Creemos que el bienestar integral se construye conociendo en profundidad tus propios <span className="text-[#009E9E] font-medium font-mono">BIOMARCADORES</span>. Al mapear las respuestas de tus folículos capilares ante factores nutricionales y ambientales, te proporcionamos una guía de hábitos de precisión y alimentación personalizada. Nuestro propósito es complementar tu cuidado de la salud general para que alcances un rendimiento y vitalidad óptimos en cada etapa de tu vida.
          </p>
        </div>

        {/* Elegant structural line */}
        <div className="w-16 h-[1px] bg-stone-300 mx-auto mt-8 mb-6"></div>
        
        <span className="text-[9px] font-mono uppercase tracking-widest text-stone-400">
          Gennova Labs Perú • Bienestar Activo & Longevidad Epigenética
        </span>
      </div>
    </section>
  );
};

