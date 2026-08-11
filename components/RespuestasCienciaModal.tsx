import React, { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import AnimatedGLogo from './AnimatedGLogo';

interface RespuestasCienciaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RespuestasCienciaModal: React.FC<RespuestasCienciaModalProps> = ({ isOpen, onClose }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Escuchar el scroll del contenedor principal para el efecto del header
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (e.currentTarget.scrollTop > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-white animate-fade-in flex flex-col overflow-hidden font-sans">
      
      {/* Header Minimalista (WHOOP/Apple Style) */}
      <div className={`h-24 flex items-center justify-between px-6 md:px-12 sticky top-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-xl border-b border-gray-100' : 'bg-transparent'}`}>
        <div className="flex items-center gap-3">
            <AnimatedGLogo className="w-8 h-8" />
            <span className="text-black font-serif font-light text-2xl tracking-tight">Gennova <span className="font-bold text-gray-500">Ciencia</span></span>
        </div>
        <button 
            onClick={onClose}
            className="w-12 h-12 rounded-full flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-100 backdrop-blur-md transition-all border border-transparent"
        >
            <X size={20} strokeWidth={1.5} />
        </button>
      </div>

      {/* Scrollable Container */}
      <div 
        className="flex-1 overflow-y-auto w-full pb-24 custom-scrollbar"
        onScroll={handleScroll}
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 space-y-8 md:space-y-12">
          
          {/* SECCIÓN 1: HERO CINEMÁTICO */}
          <div className="relative w-full h-[85vh] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden group bg-black mt-8 shadow-2xl">
            <img 
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2500&auto=format&fit=crop" 
                alt="Mindfulness y Ciencia" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[15000ms] ease-out scale-105 group-hover:scale-100 opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/40 to-transparent"></div>
            
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-20 z-20">
                <div className="max-w-4xl">
                   <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-serif text-white mb-8 leading-[0.9] tracking-tighter drop-shadow-2xl">
                     La ciencia de vivir mejor. <br />
                     <span className="text-gray-400 italic">Explicada.</span>
                   </h1>
                   <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl leading-relaxed">
                     Tu genética es el código. La epigenética es cómo lo escribes cada día. Descubre cómo tus decisiones y entorno pueden silenciar el envejecimiento y reactivar tu biología hacia su máxima vitalidad.
                   </p>
                </div>
            </div>
          </div>

          {/* SECCIÓN 2: EPIGENÉTICA SIMPLE (Tu ADN no es tu destino) */}
          <div className="relative w-full rounded-[2.5rem] md:rounded-[3rem] bg-gray-50 border border-gray-100 overflow-hidden flex flex-col md:flex-row items-stretch shadow-xl">
            <div className="p-10 md:p-20 flex-1 flex flex-col justify-center relative z-10">
              <h2 className="text-4xl md:text-6xl font-serif text-black mb-6 leading-[0.95] tracking-tight">
                Tu ADN no es tu destino.
              </h2>
              <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed max-w-lg">
                Tu código genético es solo el punto de partida. La epigenética nos demuestra que tu biología está en constante evolución y escucha cada una de tus decisiones, dándote el poder de apagar predisposiciones heredadas y despertar una vitalidad profunda.
              </p>
            </div>
            <div className="w-full md:w-5/12 h-[400px] md:h-auto relative">
              <img 
                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1500&auto=format&fit=crop" 
                alt="Enfoque Corporal" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-transparent hidden md:block"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-50 to-transparent md:hidden"></div>
            </div>
          </div>

          {/* SECCIÓN 3: BIENESTAR BIOLÓGICO (Contexto Local) */}
          <div className="relative w-full h-[70vh] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden group shadow-xl">
            <img 
                src="https://images.unsplash.com/photo-1594882645126-14020914d58d?q=80&w=2500&auto=format&fit=crop" 
                alt="Movimiento Fuerte" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10000ms] scale-100 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>
            
            <div className="absolute inset-0 flex items-center justify-center p-8 md:p-24 text-center z-20">
                <div className="max-w-4xl bg-white/90 backdrop-blur-md p-8 md:p-16 rounded-[2rem] border border-white/50 shadow-2xl">
                   <h2 className="text-4xl md:text-6xl font-serif text-black mb-6 leading-[0.95] tracking-tight">
                     Tu cuerpo habla. <br className="hidden md:block" />
                     La mayoría no sabe escucharlo.
                   </h2>
                   <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed mx-auto max-w-2xl">
                     Nuestra biología se adapta constantemente. El 80% de tu bienestar depende de cómo vives hoy. Al medir lo invisible, convertimos la incertidumbre en un plan claro.
                   </p>
                </div>
            </div>
          </div>

          {/* SECCIÓN 4: IA + HUMANOS (Genn Coach) */}
          <div className="relative w-full rounded-[2.5rem] md:rounded-[3rem] bg-white border border-gray-100 overflow-hidden flex flex-col md:flex-row-reverse items-stretch shadow-xl">
            <div className="p-10 md:p-20 flex-1 flex flex-col justify-center relative z-10">
              <h2 className="text-4xl md:text-5xl font-serif text-black mb-8 leading-[0.95] tracking-tight">
                Ciencia extraordinaria. <br />
                Acompañamiento humano.
              </h2>
              <div className="space-y-6 text-lg md:text-[20px] text-gray-600 font-light leading-relaxed max-w-xl mb-10">
                <p>
                  Todo comienza con <strong className="text-black font-medium">cuatro hebras de tu cabello</strong>. A través de la biotecnología líder de <strong className="text-gennova-gold font-medium">Epixlife</strong> y <strong className="text-gennova-gold font-medium">Cell Wellbeing</strong>, mapeamos los indicadores epigenéticos de tu cuerpo en minutos, revelando lo que a simple vista es invisible.
                </p>
                <p>
                  Sin embargo, los datos por sí solos carecen de vida. El verdadero valor diferencial de <strong className="text-black font-medium">Gennova</strong> es la profunda <span className="text-black italic">interpretación y el seguimiento continuo</span>. Nuestros especialistas traducen esa ciencia con calidez y claridad, acompañándote para que cada decisión de salud se sienta poderosa y genuinamente tuya.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-8 md:gap-16 border-t border-gray-100 pt-8 mt-2">
                <div>
                  <div className="text-2xl font-serif text-black mb-1">Cell Wellbeing / Epixlife</div>
                  <div className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Extracción & Biotecnología</div>
                </div>
                <div>
                  <div className="text-2xl font-serif text-black mb-1">Gennova</div>
                  <div className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Interpretación & Mentoría Real</div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-5/12 h-[400px] md:h-auto relative overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1500&auto=format&fit=crop" 
                alt="Biotecnología y Humanidad en la Epigenética" 
                className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-[10000ms] ease-out mix-blend-multiply"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-white via-white/40 to-transparent hidden md:block"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent md:hidden"></div>
            </div>
          </div>

          {/* CTA FINAL ASPIRACIONAL */}
          <div className="relative w-full rounded-[2.5rem] md:rounded-[3rem] bg-gray-50 p-10 md:p-24 text-center overflow-hidden border border-gray-100 shadow-xl">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gennova-gold/10 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-serif text-black mb-8 tracking-tight">Comprende cómo responde tu cuerpo.</h2>
              <button 
                onClick={onClose}
                className="group inline-flex items-center gap-4 bg-black text-white px-10 py-5 rounded-full font-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-gennova-gold hover:text-black transition-all duration-300 shadow-2xl"
              >
                  Explora tu biología <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RespuestasCienciaModal;