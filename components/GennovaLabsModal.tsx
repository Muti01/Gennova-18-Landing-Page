
import React, { useState, useEffect } from 'react';
import { X, ChevronRight, Activity, ArrowRight, TrendingUp, CheckCircle2, Smartphone, BarChart3, Zap } from 'lucide-react';

interface LabsSystem {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  image: string;
  biomarkers: string[];
}

const SYSTEMS: LabsSystem[] = [
  {
    id: 'longevity',
    label: 'Longevidad',
    title: 'Longevidad Celular',
    subtitle: 'Tu edad cronológica es fija. Tu edad biológica es una decisión.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2500&auto=format&fit=crop', 
    biomarkers: ['Longitud Telómeros', 'Metilación ADN', 'Sirtuinas', 'Daño Oxidativo']
  },
  {
    id: 'stress',
    label: 'Estrés Biológico',
    title: 'Carga Alostática',
    subtitle: 'El estrés deja una huella química. Aprende a borrarla.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2500&auto=format&fit=crop',
    biomarkers: ['Cortisol', 'Magnesio', 'Adrenalina', 'Variabilidad Cardíaca']
  },
  {
    id: 'metabolism',
    label: 'Metabolismo',
    title: 'Eficiencia Metabólica',
    subtitle: 'Convierte alimento en potencia, no en almacenamiento.',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2500&auto=format&fit=crop',
    biomarkers: ['Insulina', 'Glucosa', 'Vitaminas B', 'Ácidos Grasos']
  },
  {
    id: 'inflammation',
    label: 'Inflamación',
    title: 'Control Inflamatorio',
    subtitle: 'Apaga el fuego silencioso que acelera tu envejecimiento.',
    image: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=2500&auto=format&fit=crop',
    biomarkers: ['Homocisteína', 'Omega 6/3 Ratio', 'Proteína C Reactiva', 'Histamina']
  },
  {
    id: 'immune',
    label: 'Sistema Inmune',
    title: 'Escudo Biológico',
    subtitle: 'Una defensa proactiva construida desde el intestino.',
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=2500&auto=format&fit=crop', 
    biomarkers: ['Zinc', 'Vitamina D3', 'Flora Intestinal', 'Selenio']
  },
  {
    id: 'detox',
    label: 'Detoxificación',
    title: 'Pureza Sistémica',
    subtitle: 'Elimina las interferencias ambientales que bloquean tu energía.',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=2500&auto=format&fit=crop',
    biomarkers: ['Metales Pesados', 'Radiación EMF', 'Hígado', 'Hidratación']
  },
  {
    id: 'performance',
    label: 'Rendimiento',
    title: 'Potencia Física',
    subtitle: 'Conecta los puntos para un rendimiento cardiovascular superior.',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=2500&auto=format&fit=crop',
    biomarkers: ['Recuperación Muscular', 'Aminoácidos', 'CoQ10', 'Hierro']
  }
];

const VISION_SLIDES = [
    'https://images.unsplash.com/photo-1576091160550-217358c7e618?q=80&w=2500&auto=format&fit=crop', 
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2500&auto=format&fit=crop', 
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2500&auto=format&fit=crop', 
    'https://images.unsplash.com/photo-1579126038374-6064e9370f0f?q=80&w=2500&auto=format&fit=crop'
];

const DASHBOARD_SCREENS = [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop', // Charts/Data
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop', // Bio/Science dark
    'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=800&auto=format&fit=crop', // Molecular
    'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=800&auto=format&fit=crop'  // Analytics
];

interface GennovaLabsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GennovaLabsModal: React.FC<GennovaLabsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('performance'); 
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentDashboardSlide, setCurrentDashboardSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % VISION_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Efecto para rotar las pantallas del teléfono cada segundo
  useEffect(() => {
    const dashboardTimer = setInterval(() => {
        setCurrentDashboardSlide((prev) => (prev + 1) % DASHBOARD_SCREENS.length);
    }, 1000);
    return () => clearInterval(dashboardTimer);
  }, []);

  const handleJoin = () => {
    onClose();
    setTimeout(() => {
        const planesSection = document.getElementById('planes');
        if (planesSection) {
            planesSection.scrollIntoView({ behavior: 'smooth' });
        }
    }, 300);
  };

  if (!isOpen) return null;

  const currentSystem = SYSTEMS.find(s => s.id === activeTab) || SYSTEMS[0];

  return (
    <div className="fixed inset-0 z-[200] bg-white animate-fade-in flex flex-col overflow-hidden">
      
      {/* Navbar Minimalista */}
      <div className="h-20 flex items-center justify-between px-6 md:px-12 bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="flex items-center gap-3">
            <span className="text-black font-serif font-bold text-xl tracking-tight">Gennova <span className="text-gennova-gold">Labs</span></span>
        </div>
        <button 
            onClick={onClose}
            className="p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-black hover:text-white transition-all"
        >
            <X size={20} />
        </button>
      </div>

      {/* Área de Contenido Principal (Scrollable) */}
      <div className="flex-1 px-4 md:px-8 pb-8 overflow-y-auto custom-scrollbar bg-white">
          
          {/* SECCIÓN 1: Visión Clara (Full Screen Slideshow) */}
          <div className="relative w-full h-[80vh] rounded-[2.5rem] overflow-hidden mb-24 group bg-black mt-8">
              {VISION_SLIDES.map((slide, index) => (
                <div key={index} className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                   <img 
                    src={slide} 
                    alt={`Visión ${index}`} 
                    className="w-full h-full object-cover transition-transform duration-[10000ms] ease-linear scale-105" 
                    style={{ transform: index === currentSlide ? 'scale(1.1)' : 'scale(1)' }}
                   />
                   <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
                </div>
              ))}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-20 px-4 md:px-20">
                 <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-serif text-white mb-10 max-w-5xl leading-[0.95] tracking-tighter drop-shadow-2xl">
                    Obtén una visión más clara <br/>
                    <span className="italic text-gray-300">de tu cuerpo</span>
                 </h2>
                 <p className="text-lg md:text-2xl text-gray-200 font-light max-w-3xl leading-relaxed font-sans drop-shadow-lg">
                    Gennova Labs integra tus resultados epigenéticos con indicadores biológicos clave para ofrecerte una visión profunda, precisa y accionable de tu bienestar.
                 </p>
                 <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gennova-gold to-transparent mt-12 rounded-full"></div>
              </div>
          </div>

          {/* SECCIÓN 2: Transformación Real */}
          <div className="bg-black rounded-[3rem] p-8 md:p-16 mb-24 text-white relative overflow-hidden">
                <div className="max-w-5xl mb-16 relative z-10">
                    <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-sans font-medium text-white mb-8 leading-[0.95] tracking-tight">
                        De tus resultados epigenéticos a <br className="hidden md:block"/>
                        <span className="text-gray-500">cambios reales y duraderos.</span>
                    </h2>
                    <p className="text-lg md:text-2xl text-gray-400 font-light leading-relaxed max-w-3xl">
                        Gennova Labs transforma tus resultados epigenéticos en un plan de acción claro, personalizado y respaldado por ciencia, para optimizarlos.
                    </p>
                </div>
                <div className="relative w-full h-[500px] md:h-[700px] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl group">
                    <img 
                        src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2500&auto=format&fit=crop" 
                        alt="Transformación Real" 
                        className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-[2000ms]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 bg-white/10 backdrop-blur-xl border border-white/20 p-6 md:p-8 rounded-[2rem] flex flex-col md:flex-row items-center gap-8 md:gap-12 max-w-[90%] md:max-w-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-fade-in-up">
                        <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center shrink-0">
                            <svg className="w-full h-full -rotate-90">
                                <circle cx="50%" cy="50%" r="45%" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
                                <circle cx="50%" cy="50%" r="45%" stroke="#22C55E" strokeWidth="8" fill="none" strokeDasharray="283" strokeDashoffset="80" strokeLinecap="round" className="animate-[dash_2s_ease-out_forwards]" />
                                <circle cx="50%" cy="50%" r="38%" stroke="white" strokeWidth="1" fill="none" strokeDasharray="2 10" opacity="0.3" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                                <span className="text-4xl md:text-5xl font-sans font-bold tracking-tighter">65</span>
                                <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-gray-300 font-mono mt-1">Biomarkers</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 w-full">
                            <div className="flex items-center justify-between gap-6 pb-4 border-b border-white/10">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22C55E]"></div>
                                    <span className="text-sm font-bold text-green-400 uppercase tracking-wider">Optimal</span>
                                </div>
                                <span className="text-2xl font-mono text-white font-bold">52</span>
                            </div>
                            <div className="flex items-center justify-between gap-6 pb-4 border-b border-white/10">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                                    <span className="text-sm font-bold text-blue-300 uppercase tracking-wider">Sufficient</span>
                                </div>
                                <span className="text-2xl font-mono text-white font-bold">10</span>
                            </div>
                            <div className="flex items-center justify-between gap-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                                    <span className="text-sm font-bold text-orange-400 uppercase tracking-wider">Out of Range</span>
                                </div>
                                <span className="text-2xl font-mono text-white font-bold">3</span>
                            </div>
                        </div>
                    </div>
                </div>
          </div>

          {/* SECCIÓN 3: Sistemas Clave + Menú */}
          <div className="mb-24">
              {/* Tabs Integration directly in section */}
              <div className="overflow-x-auto scrollbar-hide mb-8">
                <div className="flex gap-8 border-b border-gray-100 pb-1 min-w-max">
                    {SYSTEMS.map((sys) => (
                        <button
                            key={sys.id}
                            onClick={() => setActiveTab(sys.id)}
                            className={`text-sm font-bold uppercase tracking-widest pb-4 transition-all relative ${activeTab === sys.id ? 'text-black' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            {sys.label}
                            {activeTab === sys.id && (
                                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></div>
                            )}
                        </button>
                    ))}
                </div>
              </div>

              {/* Active Card */}
              <div className="relative w-full h-[75vh] md:h-[80vh] rounded-[2.5rem] overflow-hidden shadow-2xl group cursor-pointer">
                  <img 
                    src={currentSystem.image} 
                    alt={currentSystem.title} 
                    className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end">
                      <div className="max-w-3xl mb-12 animate-fade-in-up">
                          <h2 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-[0.9] tracking-tight">
                              {currentSystem.title}
                          </h2>
                          <p className="text-lg md:text-2xl text-gray-200 font-light leading-snug">
                              {currentSystem.subtitle}
                          </p>
                      </div>
                      <div className="space-y-4 animate-fade-in-up delay-100">
                          <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-[0.2em] block mb-3">
                              KEY BIOMARKERS
                          </span>
                          <div className="flex flex-wrap gap-3">
                              {currentSystem.biomarkers.map((marker, idx) => (
                                  <div key={idx} className="bg-white/20 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-full text-white text-xs font-bold font-mono uppercase tracking-wide hover:bg-white hover:text-black transition-colors">
                                      {marker}
                                  </div>
                              ))}
                              <div className="bg-gennova-gold/20 backdrop-blur-md border border-gennova-gold/40 px-5 py-2.5 rounded-full text-gennova-gold text-xs font-bold font-mono uppercase tracking-wide flex items-center gap-2">
                                  + More
                              </div>
                          </div>
                      </div>
                      <div className="absolute top-8 right-8 md:top-12 md:right-12 w-16 h-16 rounded-full border border-white/20 flex items-center justify-center bg-black/20 backdrop-blur-md">
                          <Activity className="text-white" size={24} />
                      </div>
                  </div>
              </div>
          </div>

          {/* SECCIÓN 4: Cómo Funciona */}
          <div className="bg-white rounded-[3rem] p-8 md:p-20 flex flex-col lg:flex-row-reverse items-center gap-16 relative overflow-hidden shadow-xl mb-24">
              <div className="lg:w-1/2 relative z-10">
                  <h2 className="text-5xl md:text-6xl font-serif text-black mb-10 leading-[0.95] tracking-tighter">
                      Cómo funciona <br/>
                      Gennova Labs
                  </h2>
                  <div className="space-y-0 relative border-l border-gray-200 ml-3 pl-8 py-2">
                      {[
                          { title: "Elige tu plan", desc: "Selecciona el nivel de profundidad analítica para tu objetivo." },
                          { title: "Realiza tu test epigenético", desc: "Recolecta tu muestra capilar en casa de forma sencilla." },
                          { title: "Recibe interpretación experta + IA", desc: "Decodificación en laboratorio y análisis por Genn Coach AI." },
                          { title: "Accede a tu dashboard personalizado", desc: "Visualiza tus métricas vitales en tiempo real." },
                          { title: "Sigue tu evolución biológica", desc: "Monitorea tu progreso y ajusta tu protocolo." }
                      ].map((step, i) => (
                          <div key={i} className="relative mb-10 last:mb-0 group">
                              <div className="absolute -left-[41px] top-1 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold font-mono z-10 border-4 border-white transition-transform group-hover:scale-110">
                                  {i + 1}
                              </div>
                              <h3 className="text-xl font-bold text-black mb-1 group-hover:text-gennova-gold transition-colors font-serif">{step.title}</h3>
                              <p className="text-sm text-gray-500 font-light">{step.desc}</p>
                          </div>
                      ))}
                  </div>
              </div>

              <div className="lg:w-1/2 w-full h-[600px] relative flex items-center justify-center bg-gray-50 rounded-[2.5rem]">
                  <div className="relative w-[300px] h-[580px] bg-black rounded-[3rem] border-8 border-gray-900 shadow-2xl overflow-hidden transform rotate-[-5deg] hover:rotate-0 transition-transform duration-700">
                      
                      {/* DYNAMIC DASHBOARD SLIDESHOW IN PHONE */}
                      {DASHBOARD_SCREENS.map((screen, idx) => (
                          <img 
                              key={idx}
                              src={screen} 
                              alt="App Dashboard" 
                              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${idx === currentDashboardSlide ? 'opacity-80' : 'opacity-0'}`}
                          />
                      ))}

                      {/* Overlay UI (Always Visible) */}
                      <div className="absolute top-12 left-4 right-4 space-y-4 z-20">
                          <div className="flex justify-between items-center text-white">
                              <div>
                                  <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Bienestar Hoy</div>
                                  <div className="text-lg font-serif">Hola, Ana</div>
                              </div>
                              <div className="w-8 h-8 rounded-full bg-gray-800 border border-white/10"></div>
                          </div>
                          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex flex-col items-center">
                              <div className="relative w-32 h-32 flex items-center justify-center">
                                   <svg className="w-full h-full -rotate-90">
                                      <circle cx="50%" cy="50%" r="45%" stroke="#333" strokeWidth="8" fill="none" />
                                      <circle cx="50%" cy="50%" r="45%" stroke="#E5C77A" strokeWidth="8" fill="none" strokeDasharray="283" strokeDashoffset="40" strokeLinecap="round" />
                                   </svg>
                                   <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                                       <span className="text-3xl font-bold">85</span>
                                       <span className="text-[8px] uppercase tracking-widest">Vitalidad</span>
                                   </div>
                              </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                              <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
                                  <div className="text-[9px] text-gray-400 uppercase mb-1 font-mono">Edad Bio</div>
                                  <div className="text-xl text-white font-bold">28.4</div>
                              </div>
                              <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
                                  <div className="text-[9px] text-gray-400 uppercase mb-1 font-mono">Inmunidad</div>
                                  <div className="text-xl text-gennova-cyan font-bold">Alta</div>
                              </div>
                          </div>
                      </div>
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-black rounded-b-xl z-30"></div>
                  </div>
              </div>
          </div>

          {/* SECCIÓN 5: Únete a Gennova Labs */}
          <div className="bg-white rounded-[3rem] p-8 md:p-20 flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden shadow-xl mb-8">
              <div className="lg:w-1/2 relative z-10 order-2 lg:order-1">
                  <h2 className="text-5xl md:text-7xl font-serif text-black mb-8 leading-[0.95] tracking-tighter">
                      Únete a <br/>
                      Gennova Labs
                  </h2>
                  <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed mb-10 max-w-md">
                      Comienza con nuestra opción más elegida: dos evaluaciones epigenéticas al año por <span className="text-black font-bold">S/. 1,299</span> y obten claridad real sobre tu cuerpo y genética.
                  </p>
                  <button 
                    onClick={handleJoin}
                    className="group bg-black text-white px-10 py-5 rounded-full font-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-gennova-gold hover:text-black transition-all duration-300 flex items-center gap-4 shadow-2xl"
                  >
                      UNIRME A ESTE PLAN <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
              </div>
              <div className="lg:w-1/2 w-full h-[500px] lg:h-[600px] relative order-1 lg:order-2">
                  <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=2500&auto=format&fit=crop" 
                        alt="Claridad Real" 
                        className="w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-105"
                      />
                      <div className="absolute bottom-10 left-10 right-10 md:right-auto md:w-80 bg-black/40 backdrop-blur-xl border border-white/20 p-6 rounded-3xl text-white shadow-2xl animate-float-medium">
                          <div className="flex justify-between items-start mb-4">
                              <div>
                                  <span className="text-[10px] font-mono font-bold text-white uppercase tracking-widest block mb-1">Cortisol (Stress)</span>
                                  <div className="flex items-baseline gap-1">
                                      <span className="text-3xl font-serif font-bold">12.5</span>
                                      <span className="text-[10px] text-gray-300">µg/dL</span>
                                  </div>
                              </div>
                              <ChevronRight size={16} className="text-white/50" />
                          </div>
                          <div className="h-1.5 w-full bg-white/10 rounded-full mb-3 overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-gennova-success to-gennova-cyan w-[60%] rounded-full relative">
                                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg"></div>
                              </div>
                          </div>
                          <div className="flex items-center gap-2">
                              <div className="bg-gennova-success text-black p-0.5 rounded-full">
                                  <CheckCircle2 size={10} />
                              </div>
                              <span className="text-[10px] font-bold text-gennova-success uppercase tracking-wider">Nivel Optimizado</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

      </div>

    </div>
  );
};

// Fixed the export name to match the component name GennovaLabsModal
export default GennovaLabsModal;
