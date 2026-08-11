
import React, { useState, useRef, useEffect } from 'react';
import { X, Zap, Sparkles, Fingerprint, ShieldCheck, ChevronRight, Activity, Globe, Cpu, UserCheck, Package, ClipboardCheck, LayoutDashboard, ScanLine, ArrowDown, ChevronLeft, Quote, Star, CheckCircle2, TrendingUp } from 'lucide-react';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderKit: () => void;
}

interface Step {
  id: string;
  number: string;
  title: string;
  description: string;
}

interface Phase {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  steps: Step[];
  visualComponent: React.ReactNode;
}

const PHASES: Phase[] = [
  {
    id: 'access',
    title: 'EL INICIO',
    subtitle: 'TU COMPROMISO',
    color: 'text-gennova-gold',
    steps: [
      { id: '1', number: '01', title: 'Decisión Consciente', description: 'Eliges tomar el control. Seleccionas el plan (Core, Plus o Elite) que se alinea con tu ambición de vida.' },
      { id: '2', number: '02', title: 'Hardware a tu Puerta', description: 'Recibes el Kit Gennova de recolección. Diseño premium, instrucciones simples, logística prioritaria.' }
    ],
    visualComponent: (
      <div className="relative w-[90vw] md:w-[500px] h-[640px] rounded-[2.5rem] overflow-hidden shadow-2xl group border border-white/10 bg-black mx-auto">
        {/* Imagen Humana: Manos/Tactilidad/Premium */}
        <img 
            src="https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=1000&auto=format&fit=crop" 
            alt="Unboxing Experience" 
            className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-[2000ms]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
        
        {/* UI Overlay: Notificación de Envío */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[85%] bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-2xl animate-fade-in-up">
            <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 rounded-full bg-gennova-gold flex items-center justify-center text-black shadow-lg shadow-gennova-gold/20">
                    <Package size={20} />
                </div>
                <div>
                    <p className="text-white text-sm font-bold uppercase tracking-wide">Envío Iniciado</p>
                    <p className="text-gray-400 text-[10px] font-mono">Llegada estimada: 24h</p>
                </div>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gennova-gold w-2/3 animate-pulse"></div>
            </div>
        </div>
      </div>
    )
  },
  {
    id: 'biorecord',
    title: 'TU HUELLA',
    subtitle: 'SIN AGUJAS, SIN DOLOR',
    color: 'text-gennova-cyan',
    steps: [
      { id: '3', number: '03', title: 'Muestra Biológica', description: 'Solo necesitas 4 hebras de cabello. Tu bulbo capilar contiene el historial epigenético de los últimos 90 días.' },
      { id: '4', number: '04', title: 'Digitalización', description: 'Escaneamos tu muestra en laboratorio. Convertimos tu biología en datos puros y seguros.' }
    ],
    visualComponent: (
      <div className="relative w-[90vw] md:w-[500px] h-[640px] rounded-[2.5rem] overflow-hidden shadow-2xl group border border-white/10 bg-black mx-auto">
        {/* Imagen Humana: Primer plano artístico, piel, naturalidad */}
        <img 
            src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop" 
            alt="Human Bio Connection" 
            className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-[2000ms]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gennova-cyan/5 to-black"></div>
        
        {/* UI Overlay: Escaneo de ADN */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
            <div className="relative w-48 h-48 mx-auto border border-gennova-cyan/30 rounded-full flex items-center justify-center animate-spin-slow">
                <div className="w-3 h-3 bg-gennova-cyan rounded-full absolute top-0 left-1/2 -translate-x-1/2 shadow-[0_0_20px_#38E8F8]"></div>
            </div>
            <Fingerprint size={80} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gennova-cyan/80" strokeWidth={0.5} />
        </div>
        
        <div className="absolute bottom-10 w-full text-center">
            <span className="inline-block bg-black/60 backdrop-blur-md px-5 py-2 rounded-full text-gennova-cyan text-[10px] font-mono font-bold uppercase tracking-[0.2em] border border-gennova-cyan/20">
                Secuenciando...
            </span>
        </div>
      </div>
    )
  },
  {
    id: 'intelligence',
    title: 'LA VERDAD',
    subtitle: 'DECODIFICACIÓN PROFUNDA',
    color: 'text-gennova-violet',
    steps: [
      { id: '5', number: '05', title: 'Análisis Alemania', description: 'Tus datos viajan a Hamburgo (Epixlife) para ser contrastados con miles de marcadores clínicos.' },
      { id: '6', number: '06', title: 'Inteligencia Artificial', description: 'Genn Coach detecta patrones invisibles: ¿Por qué te cansas? ¿Qué nutriente te falta hoy?' }
    ],
    visualComponent: (
      <div className="relative w-[90vw] md:w-[500px] h-[640px] rounded-[2.5rem] overflow-hidden shadow-2xl group border border-white/10 bg-black mx-auto">
        {/* Imagen High-Tech Bio-Analysis Human */}
        <img 
            src="https://images.unsplash.com/photo-1620912189865-1e8a33da4c5e?q=80&w=1000&auto=format&fit=crop" 
            alt="Genn Coach Analysis" 
            className="w-full h-full object-cover opacity-70 mix-blend-screen group-hover:scale-105 transition-transform duration-[2000ms]"
        />
        <div className="absolute inset-0 bg-gennova-violet/20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

        {/* UI Overlay: Nodos de Datos Conectando */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end">
            <div className="grid grid-cols-2 gap-3 mb-6">
                {[1,2,3,4,5,6].map(i => (
                    <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-3 rounded-xl flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${i===1?'bg-red-500':i===2?'bg-yellow-500':'bg-green-500'} shadow-[0_0_5px_currentColor]`}></div>
                        <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                            <div className="h-full bg-white/40 w-[60%] animate-pulse"></div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-3 text-gennova-violet bg-black/60 backdrop-blur-xl px-4 py-3 rounded-full border border-gennova-violet/20 w-max mx-auto">
                <Sparkles size={16} className="animate-pulse" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Genn Coach Activado</span>
            </div>
        </div>
      </div>
    )
  },
  {
    id: 'evolution',
    title: 'TU MEJOR VERSIÓN',
    subtitle: 'RESULTADOS TANGIBLES',
    color: 'text-white',
    steps: [
      { id: '7', number: '07', title: 'Plan de Acción', description: 'Recibes tu informe con los alimentos exactos que debes comer y los que debes evitar por 90 días.' },
      { id: '8', number: '08', title: 'Transformación', description: 'Más energía, mejor sueño, piel radiante. No es magia, es tu biología optimizada.' }
    ],
    visualComponent: (
      <div className="relative w-[90vw] md:w-[500px] h-[640px] rounded-[2.5rem] overflow-hidden shadow-2xl group border border-white/10 bg-black mx-auto">
        {/* Imagen Humana: Vitalidad/Deporte/Éxito/Energía */}
        <img 
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop" 
            alt="Peak Performance" 
            className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-[2000ms]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        
        {/* UI Overlay: Battery/Energy Indicator */}
        <div className="absolute top-8 right-8">
            <div className="flex flex-col items-end">
                <span className="text-5xl font-serif font-bold text-white italic drop-shadow-lg">98%</span>
                <span className="text-[10px] font-mono text-gennova-gold uppercase tracking-widest bg-black/50 px-2 py-1 rounded backdrop-blur">Vitalidad</span>
            </div>
        </div>

        <div className="absolute bottom-10 left-8 right-8">
             <div className="bg-black/60 backdrop-blur-xl border border-white/20 p-5 rounded-[2rem] flex items-center gap-5 shadow-2xl">
                 <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black shrink-0">
                     <Activity size={24} />
                 </div>
                 <div>
                     <p className="text-white text-sm font-bold uppercase tracking-wide">Optimización</p>
                     <p className="text-gray-300 text-[10px] font-light font-mono mt-1">Ciclo Completado</p>
                 </div>
             </div>
        </div>
      </div>
    )
  }
];

const TESTIMONIALS = [
    { 
        name: "Carlos M.", 
        role: "Triatleta", 
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
        text: "Creí que mi fatiga era normal. El test mostró que mi mitocondria no recibía CoQ10. Ajusté la suplementación y bajé mis tiempos.", 
        tag: "Energía",
        metric: "+15% Rendimiento",
        color: "text-gennova-gold",
        border: "border-gennova-gold/20"
    },
    { 
        name: "Lucía F.", 
        role: "CEO", 
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
        text: "La niebla mental desapareció en 10 días al retirar los alimentos que me inflamaban. Ahora tengo claridad estratégica todo el día.", 
        tag: "Enfoque", 
        metric: "Claridad Total",
        color: "text-gennova-cyan",
        border: "border-gennova-cyan/20"
    },
    { 
        name: "Diego R.", 
        role: "Ingeniero", 
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
        text: "Dormía 8 horas y despertaba cansado. Era radiación EMF en mi cuarto. Corregí el entorno y ahora descanso de verdad.", 
        tag: "Sueño",
        metric: "Sueño Profundo", 
        color: "text-gennova-violet",
        border: "border-gennova-violet/20"
    },
    { 
        name: "Ana P.", 
        role: "Madre", 
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
        text: "Mi digestión era un caos. Descubrí sensibilidad a conservantes específicos que comía diario. Hoy me siento ligera.", 
        tag: "Digestión",
        metric: "Sin Inflamación", 
        color: "text-green-400",
        border: "border-green-400/20"
    },
    { 
        name: "Jorge V.", 
        role: "Abogado", 
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
        text: "Bajé la inflamación celular y mi dolor de espalda crónico se fue sin medicación. Solo comida real y precisa.", 
        tag: "Vitalidad",
        metric: "Dolor Reducido",
        color: "text-gennova-gold",
        border: "border-gennova-gold/20"
    }
];

const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ isOpen, onClose, onOrderKit }) => {
  const [activePhase, setActivePhase] = useState(PHASES[0].id);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);

  // Intersection Observer para actualizar la navegación sticky
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      
      const container = scrollContainerRef.current;
      const scrollPosition = container.scrollTop + container.clientHeight / 3; 
      
      const sections = container.querySelectorAll('section[data-phase]');
      
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('data-phase');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            if (sectionId && sectionId !== activePhase) {
                setActivePhase(sectionId);
            }
        }
      });
    };

    const container = scrollContainerRef.current;
    if (container) container.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, [activePhase]);

  if (!isOpen) return null;

  const scrollToPhase = (id: string) => {
      const el = document.getElementById(`phase-${id}`);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollTestimonials = (direction: 'left' | 'right') => {
      if (testimonialRef.current) {
          const scrollAmount = 320;
          testimonialRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
      }
  };

  const handleGoToPlanes = () => {
      onClose();
      setTimeout(() => {
          const planesSection = document.getElementById('planes');
          if (planesSection) planesSection.scrollIntoView({ behavior: 'smooth' });
      }, 300);
  };

  const handleGoToReports = () => {
      onClose();
      setTimeout(() => {
          const reportsSection = document.getElementById('reports');
          if (reportsSection) reportsSection.scrollIntoView({ behavior: 'smooth' });
      }, 300);
  };

  return (
    <div className="fixed inset-0 z-[150] bg-black animate-fade-in flex flex-col overflow-hidden font-sans">
      
      {/* 1. Header de Navegación Sticky */}
      <header className="h-20 border-b border-white/5 flex items-center justify-between px-6 md:px-12 bg-black/90 backdrop-blur-xl z-50 shrink-0">
        <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                <ScanLine size={16} className="text-white" />
            </div>
            <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-[0.3em] hidden sm:block">Protocolo Gennova</span>
        </div>

        {/* Timeline Nav */}
        <nav className="flex items-center gap-4 md:gap-12 overflow-x-auto no-scrollbar">
            {PHASES.map((p) => (
                <button 
                    key={p.id}
                    onClick={() => scrollToPhase(p.id)}
                    className={`relative py-2 px-1 md:px-0 transition-all duration-500 group shrink-0`}
                >
                    <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] font-mono transition-colors ${activePhase === p.id ? p.color : 'text-gray-600 group-hover:text-gray-400'}`}>
                        {p.title}
                    </span>
                    {activePhase === p.id && (
                        <div className={`absolute -bottom-[21px] left-0 right-0 h-[2px] ${p.color.replace('text-', 'bg-')} shadow-[0_0_10px_currentColor]`}></div>
                    )}
                </button>
            ))}
        </nav>

        <button 
            onClick={onClose}
            className="p-2 bg-white/5 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all shrink-0"
        >
            <X size={20} />
        </button>
      </header>

      {/* 2. Contenedor de Scrollytelling */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto custom-scrollbar bg-black scroll-smooth relative"
      >
          <div className="max-w-7xl mx-auto px-6 md:px-12 pb-32">
              
              {PHASES.map((phase, idx) => (
                  <section 
                    key={phase.id} 
                    id={`phase-${phase.id}`}
                    data-phase={phase.id}
                    className="min-h-[90vh] flex flex-col justify-center py-20 relative"
                  >
                      {/* Timeline Line Connector */}
                      <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block"></div>
                      
                      {/* Fase Activa Dot Central */}
                      <div className={`absolute left-1/2 -translate-x-1/2 top-1/2 w-4 h-4 rounded-full border-2 border-black transition-all duration-500 hidden md:block z-10 ${activePhase === phase.id ? phase.color.replace('text-', 'bg-') : 'bg-gray-800'}`}></div>

                      <div className="grid md:grid-cols-2 gap-12 md:gap-32 items-center">
                          
                          {/* Columna Texto */}
                          <div className={`order-2 ${idx % 2 === 0 ? 'md:order-1 md:text-right' : 'md:order-2 md:text-left'} space-y-8`}>
                              <div className="space-y-4">
                                  <span className={`text-[10px] font-mono font-bold uppercase tracking-[0.4em] block ${phase.color}`}>{phase.subtitle}</span>
                                  <h2 className="text-5xl md:text-7xl font-serif text-white leading-[0.9] tracking-tighter">{phase.title}</h2>
                              </div>

                              <div className={`space-y-8 ${idx % 2 === 0 ? 'md:flex md:flex-col md:items-end' : ''}`}>
                                  {phase.steps.map((step) => (
                                      <div key={step.id} className={`group max-w-sm ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                          <div className={`flex items-center gap-3 mb-2 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                              <span className="text-xs font-mono font-bold text-gray-500 border border-white/10 px-2 py-1 rounded">{step.number}</span>
                                              <h4 className="text-white font-bold text-lg">{step.title}</h4>
                                          </div>
                                          <p className="text-gray-400 text-sm font-light leading-relaxed">
                                              {step.description}
                                          </p>
                                      </div>
                                  ))}
                              </div>
                          </div>

                          {/* Columna Visual */}
                          <div className={`order-1 flex justify-center ${idx % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                              <div className="relative transform transition-transform duration-700 hover:scale-105">
                                  {/* Background Glow */}
                                  <div className={`absolute inset-0 blur-[80px] opacity-20 ${phase.color.replace('text-', 'bg-')}`}></div>
                                  <div className="relative z-10">
                                      {phase.visualComponent}
                                  </div>
                              </div>
                          </div>

                      </div>
                  </section>
              ))}

              {/* Seccion Testimonios (Entre Ultima Fase y Footer) */}
              <section className="py-24 border-t border-white/10">
                  <div className="flex justify-between items-end mb-16">
                      <div>
                          <span className="text-gennova-gold font-mono text-[10px] uppercase tracking-[0.4em] mb-3 block flex items-center gap-2">
                              <Activity size={12} className="animate-pulse"/> EL IMPACTO MEDIBLE
                          </span>
                          <h3 className="text-3xl md:text-5xl font-serif text-white">VITALIDAD DESBLOQUEADA</h3>
                      </div>
                      <div className="flex gap-2">
                          <button onClick={() => scrollTestimonials('left')} className="p-3 border border-white/10 rounded-full text-white hover:bg-white hover:text-black transition"><ChevronLeft size={18} /></button>
                          <button onClick={() => scrollTestimonials('right')} className="p-3 border border-white/10 rounded-full text-white hover:bg-white hover:text-black transition"><ChevronRight size={18} /></button>
                      </div>
                  </div>
                  
                  <div ref={testimonialRef} className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar">
                      {TESTIMONIALS.map((t, i) => (
                          <div key={i} className={`min-w-[340px] bg-white/[0.03] backdrop-blur-sm border ${t.border} p-8 rounded-[2rem] snap-start relative group transition-all hover:bg-white/[0.06] flex flex-col justify-between h-[320px]`}>
                              
                              {/* Header: User Profile */}
                              <div className="flex items-center gap-4 mb-6">
                                  <div className="relative">
                                      <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10">
                                          <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                                      </div>
                                      <div className="absolute -bottom-1 -right-1 bg-black rounded-full p-0.5">
                                          <CheckCircle2 size={12} className="text-gennova-cyan fill-current" />
                                      </div>
                                  </div>
                                  <div>
                                      <h5 className="text-white font-bold text-sm">{t.name}</h5>
                                      <span className="text-gray-500 text-[10px] font-mono uppercase tracking-widest">{t.role}</span>
                                  </div>
                              </div>

                              {/* Quote */}
                              <div className="relative flex-grow">
                                  <p className="text-gray-300 text-sm font-light leading-relaxed italic relative z-10">
                                      "{t.text}"
                                  </p>
                              </div>

                              {/* Footer: Tags & Metrics */}
                              <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                                  <div className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider border ${t.border} bg-white/5 ${t.color}`}>
                                      {t.tag}
                                  </div>
                                  <div className="flex items-center gap-2">
                                      <TrendingUp size={12} className="text-gennova-success" />
                                      <span className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">{t.metric}</span>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
              </section>

              {/* Final CTA Strategic */}
              <section className="py-32 text-center border-t border-white/10 mt-12 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,199,122,0.1),transparent_70%)]"></div>
                  <div className="relative z-10 max-w-2xl mx-auto">
                      <h2 className="text-4xl md:text-6xl font-serif text-white mb-8 leading-tight tracking-tight">
                          La duda termina hoy. <br/>
                          <span className="text-gennova-gold italic">El control real empieza ahora.</span>
                      </h2>
                      
                      <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                          <button 
                            onClick={handleGoToPlanes}
                            className="w-full md:w-auto bg-white text-black px-10 py-5 rounded-full font-bold font-mono text-xs uppercase tracking-[0.3em] hover:bg-gennova-gold transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.1)] flex items-center justify-center gap-3 group"
                          >
                              ELEGIR MI NIVEL DE ACCESO <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                          </button>
                          
                          <button 
                            onClick={handleGoToReports}
                            className="w-full md:w-auto bg-transparent border border-white/20 text-white px-10 py-5 rounded-full font-bold font-mono text-xs uppercase tracking-[0.3em] hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-3"
                          >
                              VER EL PODER DE LA DATA
                          </button>
                      </div>
                      
                      <div className="mt-12 flex justify-center gap-8 text-[9px] font-mono text-gray-500 uppercase tracking-widest opacity-60">
                          <span className="flex items-center gap-2"><ShieldCheck size={12} className="text-gennova-success"/> Garantía de Satisfacción</span>
                          <span className="flex items-center gap-2"><Zap size={12} className="text-gennova-gold"/> Envío Prioritario</span>
                      </div>
                  </div>
              </section>

          </div>
      </div>

      <style>{`
        .animate-spin-slow {
            animation: spin 15s linear infinite;
        }
        @keyframes loadBar {
            0% { width: 0%; }
            100% { width: 70%; }
        }
      `}</style>
    </div>
  );
};

export default HowItWorksModal;
