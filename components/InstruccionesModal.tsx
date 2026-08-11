import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Check, Sparkles, HelpCircle, Mail, MessageSquare, ShieldAlert } from 'lucide-react';
import AnimatedGLogo from './AnimatedGLogo';

interface InstruccionesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INSTRUCTIONS_STEPS = [
  {
    number: "1",
    title: "Recolecta de 3 a 5 hebras desde la zona occipital",
    bullets: [
      "Utiliza pinzas de acero nuevas (con empaque).",
      "Es fundamental que al menos un par de hebras mantengan su raíz intacta."
    ],
    image: "https://lh3.googleusercontent.com/d/1GComdWCWWLo9z1u6ddNbHefmUt6dUObQ"
  },
  {
    number: "2",
    title: "Extrae con un solo movimiento firme",
    bullets: [
      "Realiza un solo movimiento firme para asegurar una toma de muestra consistente.",
      "Verifica que las hebras recolectadas contengan la raíz del cabello."
    ],
    image: "https://lh3.googleusercontent.com/d/1HE9DfW89v94th_l9xJtrflbyyuxn3uzW"
  },
  {
    number: "3",
    title: "Evita la contaminación y asegura la muestra",
    bullets: [
      "No toques las hebras con las manos. Utiliza guantes para manipularlas.",
      "Colócalas en la bolsa hermética (bio empaque dorado).",
      "Cierra la bolsa herméticamente para mantener la integridad de la muestra."
    ],
    image: "https://lh3.googleusercontent.com/d/1vzGasKEUjf5qXe1XF3OcPiuX3SElv-1N"
  },
  {
    number: "4",
    title: "Empaca y prepara para el envío",
    bullets: [
      "Coloca el Biopack (bolsa dorada hermética con la muestra) dentro del sobre de devolución (sobre extra de Olva Courier).",
      "Y habrás concluido el proceso de extracción de la muestra."
    ],
    image: "https://lh3.googleusercontent.com/d/1mym8tpoKqBG-SFvwJp202_7Q-s6En7F2"
  }
];

const READY_STEP = {
  title: "¡LISTO!",
  subtitle: "Tu muestra está lista para ser enviada.",
  bullets: [
    "Gracias por confiar en Gennova Labs.",
    "Tu bienestar empieza desde la raíz."
  ],
  image: "https://lh3.googleusercontent.com/d/1nbNnMePLDa2hQKVwCWJaAS9zko_K122Z"
};

const RESOURCES = [
  {
    name: "Pinzas de acero",
    spec: "(nuevas con empaque)",
    svgPath: "M7 2c0-1.1-.9-2-2-2h4c1.1 0 2 .9 2 2v20c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V2z"
  },
  {
    name: "Guantes quirúrgicos",
    spec: "antisépticos incluidos",
    svgPath: "M12 2a3 3 0 0 0-3 3v5.5a.5.5 0 0 1-1 0V7a2 2 0 0 0-4 0v10a6 6 0 0 0 12 0V9a2 2 0 0 0-4 0V7.5a.5.5 0 0 1-1 0V5a3 3 0 0 0-3-3z"
  },
  {
    name: "Sobre dorado",
    spec: "de bioseguridad hermético",
    svgPath: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"
  },
  {
    name: "Sobre de devolución",
    spec: "(Olva Courier pre-pagado)",
    svgPath: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
  }
];

const InstruccionesModal: React.FC<InstruccionesModalProps> = ({ isOpen, onClose }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById('instrucciones-scroll-container');
      if (el) {
        setIsScrolled(el.scrollTop > 30);
      }
    };
    const el = document.getElementById('instrucciones-scroll-container');
    if (el) {
      el.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (el) {
        el.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-white text-slate-800 animate-fade-in flex flex-col overflow-hidden font-sans select-none referrer-no-referrer">
      
      {/* Header Fijo Premium - Estilo Gennova White */}
      <div className={`h-24 flex items-center justify-between px-6 md:px-12 sticky top-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-xl border-b border-gray-100' : 'bg-transparent'}`}>
        <div className="flex items-center gap-3">
          <AnimatedGLogo className="w-8 h-8" />
          <span className="text-slate-900 font-serif font-light text-2xl tracking-tight">Gennova <span className="font-bold text-[#C49A45]">Protocolo</span></span>
        </div>
        
        <div className="hidden lg:flex items-center gap-2">
          <span className="text-[10px] tracking-[0.3em] uppercase text-gray-500 font-mono">CIENCIA EPIGENÉTICA PERSONALIZADA</span>
        </div>

        <button 
          onClick={onClose}
          className="w-12 h-12 rounded-full flex items-center justify-center text-slate-500 hover:text-white hover:bg-slate-900 backdrop-blur-md transition-all border border-gray-200"
        >
          <X size={20} strokeWidth={1.5} />
        </button>
      </div>

      {/* Contenedor Principal con Scroll */}
      <div 
        id="instrucciones-scroll-container"
        className="flex-1 overflow-y-auto no-scrollbar pb-32"
      >
        <div className="max-w-[1500px] mx-auto px-4 md:px-8 space-y-12 md:space-y-16">
          
          {/* BANNER REPLICA DE INFOGRAFÍA EXPRESADA EN REAC FRONT-END */}
          <div className="relative w-full rounded-[2.5rem] bg-black border border-white/5 overflow-hidden p-8 md:p-14 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 min-h-[160px]">
            {/* Background Image abstract wrapper */}
            <div className="absolute inset-0 opacity-40 mix-blend-luminosity">
              <img 
                src="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2500&auto=format&fit=crop" 
                alt="Laboratorio Epigenético" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent"></div>
            </div>

            <div className="relative z-10 space-y-3 max-w-3xl">
              <span className="font-mono text-[10px] text-[#E5C77A] tracking-[0.4em] uppercase font-bold block">GENNOVA LABS</span>
              <h1 className="text-3xl md:text-5xl font-serif text-white tracking-tight font-medium leading-tight">
                Toma de muestra epigenética a través del cabello
              </h1>
              <p className="text-xs md:text-sm text-gray-400 font-light leading-relaxed max-w-2xl">
                Un proceso simple, seguro y no invasivo para conocer tu bienestar desde la raíz.
              </p>
            </div>

            <div className="relative z-10 shrink-0 border-l border-white/10 pl-6 space-y-1 hidden md:block">
              <span className="text-white text-xs font-serif italic block font-bold text-[#E5C77A]">Gennova Experience</span>
              <span className="text-[10px] text-gray-400 font-mono tracking-widest uppercase block">Ciencia de Precisión</span>
            </div>
          </div>

          {/* PARTE GRÁFICA: CARDS INTERACTIVAS - REPLICA EXACTA DE LA INFOGRAFÍA */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            
            {/* CARD STEP 1 */}
            {INSTRUCTIONS_STEPS.map((step, index) => (
              <div 
                key={index} 
                className="group relative rounded-3xl bg-white border border-gray-100 hover:border-[#E5C77A]/40 p-6 flex flex-col justify-between overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:translate-y-[-4px]"
              >
                <div className="space-y-6">
                  {/* Image container inside card */}
                  <div className="w-full aspect-square rounded-2xl overflow-hidden relative bg-slate-50 border border-gray-100">
                    <img 
                      src={step.image} 
                      alt={step.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Gold counter bubble replica exactly like image */}
                    <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-[#E5C77A] text-black font-semibold text-sm flex items-center justify-center font-serif shadow-lg">
                      {step.number}
                    </div>
                  </div>

                  {/* Title & bullets stack */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-serif text-slate-900 leading-tight min-h-[50px]">
                      {step.title}
                    </h3>
                    
                    <ul className="space-y-3 pt-2">
                      {step.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 font-light leading-relaxed">
                          <Check strokeWidth={3} className="text-[#C49A45] w-3.5 h-3.5 mt-0.5 shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}

            {/* CARD STEPS: ¡LISTO! */}
            <div className="group relative rounded-3xl bg-white border border-[#E5C77A]/30 p-6 flex flex-col justify-between overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:translate-y-[-4px]">
              <div className="space-y-6">
                
                {/* Image standard replica inside card */}
                <div className="w-full aspect-square rounded-2xl overflow-hidden relative bg-slate-50 border border-gray-100">
                  <img 
                    src={READY_STEP.image} 
                    alt={READY_STEP.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-serif text-[#C49A45] font-bold block">{READY_STEP.title}</span>
                  </div>
                  
                  <p className="text-sm font-medium text-slate-800 leading-tight">
                    {READY_STEP.subtitle}
                  </p>

                  <ul className="space-y-3 pt-2">
                    {READY_STEP.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 font-light leading-relaxed">
                        <Check strokeWidth={3} className="text-[#C49A45] w-3.5 h-3.5 mt-0.5 shrink-0" />
                        <span className={idx === READY_STEP.bullets.length - 1 ? "text-[#C49A45] italic font-medium" : ""}>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

          </div>

          {/* LOWER SECTION 1: ¿QUÉ NECESITAS? */}
          <div className="rounded-[2rem] bg-slate-50 border border-gray-100 p-6 md:p-8 space-y-6 md:space-y-0 md:flex md:items-center md:justify-between md:gap-8">
            <div className="space-y-2 max-w-sm">
              <h3 className="font-mono text-xs text-[#C49A45] tracking-[0.2em] uppercase font-bold">¿QUÉ NECESITAS?</h3>
              <p className="text-xs text-slate-500 font-light">
                Todo lo necesario para una toma de muestra segura y efectiva.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1 max-w-4xl">
              {RESOURCES.map((resource, idx) => (
                <div key={idx} className="flex items-center gap-3.5 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#C49A45] shrink-0 border border-gray-150">
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#C49A45]" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d={resource.svgPath} />
                    </svg>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-xs text-slate-800 block leading-tight font-medium">{resource.name}</span>
                    <span className="text-[10px] text-slate-400 block leading-none font-light">{resource.spec}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* LOWER SECTION 2: SOPORTE EXCLUSIVO Y CONSEJOS (NO DOCTORS, NO MEDICAL MOCKUP) */}
          <div className="relative w-full rounded-[2rem] md:rounded-[2.5rem] bg-[#0D0D0E] p-8 md:p-14 border border-white/5 flex flex-col md:flex-row items-center gap-10 overflow-hidden shadow-xl text-white">
             <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-[#E5C77A]/5 rounded-full blur-[80px] pointer-events-none"></div>
             
             <div className="flex-1 space-y-5 relative z-10">
               <h2 className="text-2xl md:text-4xl font-serif text-white leading-tight tracking-tight">
                 ¿Tienes dudas durante el proceso?
               </h2>
               <p className="text-xs md:text-sm text-gray-400 font-light leading-relaxed max-w-xl">
                 Nuestro equipo técnico especializado está listo para guiarte en tiempo real para asegurar que la toma de tu muestra epigenética sea impecable y fidedigna. 
               </p>
               
               <div className="flex flex-wrap gap-4 items-center pt-2">
                 <a 
                   href="https://wa.me/51932818432?text=Hola%20Gennova,%20tengo%20una%20duda%20sobre%20la%20toma%20de%20muestra%20de%20mi%20kit%20epigen%C3%A9tico."
                   target="_blank"
                   rel="noopener noreferrer"
                   className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-white text-black hover:bg-[#E5C77A] transition-all duration-300 font-mono text-[9px] font-bold uppercase tracking-widest shadow-md"
                 >
                   <span>Soporte Gennova WhatsApp</span>
                   <ArrowRight size={14} />
                 </a>
                 <div className="px-5 py-3.5 rounded-full bg-white/5 border border-white/5 text-gray-400 font-mono text-[9px] uppercase tracking-widest">
                   Atención de Lunes a Sábado (8AM - 8PM)
                 </div>
               </div>
             </div>

             <div className="w-full md:w-1/3 flex justify-center relative shrink-0">
                <div className="p-6 bg-[#121214] border border-white/5 rounded-2xl shadow-2xl text-center space-y-3.5 max-w-xs relative z-10">
                  <div className="w-10 h-10 rounded-full bg-[#E5C77A]/10 border border-[#E5C77A]/20 text-[#E5C77A] flex items-center justify-center mx-auto">
                    <Sparkles size={18} />
                  </div>
                  <h4 className="font-serif text-base text-white">Muestra Fiel</h4>
                  <p className="text-[11px] text-gray-400 leading-relaxed font-light">
                    Evita el contacto manual descubierto o la contaminación externa, resguardando la fidelidad molecular de la queratina y el bulbo capilar.
                  </p>
                </div>
             </div>
          </div>

          {/* LOWER SECTION 3: CIERRE CON ACCIÓN */}
          <div className="bg-slate-50 text-slate-900 rounded-[2rem] md:rounded-[2.5rem] border border-gray-150 p-8 md:p-14 text-center overflow-hidden relative shadow-sm">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#E5C77A]/5 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-5xl font-serif text-slate-900 tracking-tight leading-tight">
                ¿Todo listo para recolectar tu muestra?
              </h2>
              <p className="text-xs md:text-sm text-slate-500 font-light max-w-lg mx-auto leading-relaxed">
                Prepara tu kit, desinfecta las pinzas, colócate los guantes y toma el control de tu bienestar.
              </p>
              <button 
                onClick={onClose}
                className="group inline-flex items-center gap-3 bg-[#E5C77A] text-black px-8 py-4 rounded-full font-mono text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-900 hover:text-white transition-all duration-300"
              >
                Entendido, iniciar protocolo <Check strokeWidth={3} size={14} className="text-black transition-transform group-hover:scale-110 group-hover:text-white" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default InstruccionesModal;
