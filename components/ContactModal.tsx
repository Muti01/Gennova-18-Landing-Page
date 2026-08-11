import React from 'react';
import { X, MapPin, Phone, Mail, Globe, ArrowRight } from 'lucide-react';
import AnimatedGLogo from './AnimatedGLogo';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="bg-gennova-card border border-white/10 rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Content */}
        <div className="relative h-[40vh] sm:h-[45vh] w-full overflow-hidden rounded-t-3xl border-b border-white/10 group bg-black">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
          <img 
            src="/regenerated_image_1777386539439.png" 
            alt="Gennova Sedes" 
            className="absolute inset-0 w-full h-full object-cover object-center opacity-50 mix-blend-luminosity transform group-hover:scale-105 transition-transform duration-[10s]"
          />

          <div className="absolute top-6 right-6 z-30">
            <button 
              onClick={onClose}
              className="p-3 bg-white/5 border border-white/10 rounded-none text-white/50 hover:bg-white/10 hover:text-white transition backdrop-blur-md flex items-center justify-center group/close"
            >
              <X size={20} className="transform group-hover/close:rotate-90 transition-transform duration-300" />
            </button>
          </div>

          <div className="absolute bottom-8 sm:bottom-12 left-8 sm:left-12 right-8 sm:right-12 z-20 flex flex-col items-start pt-10">
            <div className="mb-6">
              <AnimatedGLogo className="w-10 h-10" />
            </div>
            
            <div className="relative">
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-sans font-light text-white tracking-tight leading-none mb-4 opacity-90 drop-shadow-lg">
                Sedes Gennova
              </h2>
            </div>
            
            <p className="text-sm text-white/80 font-light max-w-xl leading-relaxed mt-2">
              Espacios diseñados para tu bienestar preventivo. Conecta con nuestros especialistas globales en un entorno pensado para optimizar tu salud integral.
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            
            {/* San Isidro */}
            <div className="group relative overflow-hidden h-[450px] bg-[#1a1a1a] rounded-2xl">
              <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800" alt="Sede San Isidro" className="absolute inset-0 w-full h-full object-cover opacity-60 transform group-hover:scale-105 transition-transform duration-[8s]" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80 z-10" />
              
              <div className="absolute inset-0 z-20 p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-white text-[9px] font-mono font-medium tracking-[0.2em] border border-white/20">Sede Principal</div>
                </div>
                
                <div className="flex flex-col gap-4">
                    <div>
                      <h3 className="text-3xl sm:text-4xl font-sans font-medium text-white tracking-tight leading-none">San Isidro</h3>
                      <h4 className="text-xs text-gennova-gold font-light mt-2 tracking-wide">Lima, Perú</h4>
                    </div>
                    
                    <div className="h-[1px] w-full bg-white/10 my-1"></div>
                    
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                          <p className="text-[10px] text-white/50 mb-1 font-light">Ubicación</p>
                          <p className="text-xs text-white/90 font-light leading-relaxed">Atención exclusiva previa cita</p>
                       </div>
                       <div>
                          <p className="text-[10px] text-white/50 mb-1 font-light">Contacto</p>
                          <p className="text-xs text-white/90 font-light mb-1">+51 982 026 165</p>
                          <p className="text-xs text-white/90 font-light">info@gennova.life</p>
                       </div>
                    </div>
                </div>
              </div>
            </div>

            {/* Barranco */}
            <div className="group relative overflow-hidden h-[450px] bg-[#1a1a1a] rounded-2xl">
              <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800" alt="Sede Barranco" className="absolute inset-0 w-full h-full object-cover opacity-60 transform group-hover:scale-105 transition-transform duration-[8s]" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80 z-10" />
              
              <div className="absolute inset-0 z-20 p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-white text-[9px] font-mono font-medium tracking-[0.2em] border border-white/20">Studio 02</div>
                </div>
                
                <div className="flex flex-col gap-4">
                    <div>
                      <h3 className="text-3xl sm:text-4xl font-sans font-medium text-white tracking-tight leading-none">Barranco</h3>
                      <h4 className="text-xs text-white/70 font-light mt-2 tracking-wide">Lima, Perú</h4>
                    </div>
                    
                    <div className="h-[1px] w-full bg-white/10 my-1"></div>
                    
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                          <p className="text-[10px] text-white/50 mb-1 font-light">Ubicación</p>
                          <p className="text-xs text-white/90 font-light leading-relaxed">Atención exclusiva previa cita</p>
                       </div>
                       <div>
                          <p className="text-[10px] text-white/50 mb-1 font-light">Contacto</p>
                          <p className="text-xs text-white/90 font-light mb-1">+51 932 818 432</p>
                          <p className="text-xs text-white/90 font-light">info@gennova.life</p>
                       </div>
                    </div>
                </div>
              </div>
            </div>

            {/* Washington / Virginia / Maryland */}
            <div className="group relative overflow-hidden h-[450px] bg-[#1a1a1a] rounded-2xl">
              <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" alt="Sede USA" className="absolute inset-0 w-full h-full object-cover opacity-60 transform group-hover:scale-105 transition-transform duration-[8s]" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80 z-10" />
              
              <div className="absolute inset-0 z-20 p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-white text-[9px] font-mono font-medium tracking-[0.2em] border border-white/20">Sede Norteamérica</div>
                </div>
                
                <div className="flex flex-col gap-4">
                    <div>
                      <h3 className="text-3xl sm:text-4xl font-sans font-medium text-white tracking-tight leading-none mb-1">Washington DC</h3>
                      <h4 className="text-xs text-white/70 font-light mt-1 tracking-wide">Estados Unidos</h4>
                    </div>
                    
                    <div className="h-[1px] w-full bg-white/10 my-1"></div>
                    
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                          <p className="text-[10px] text-white/50 mb-1 font-light">Ubicación</p>
                          <p className="text-[11px] sm:text-xs text-white/90 font-light leading-relaxed">Atención exclusiva previa cita</p>
                       </div>
                       <div>
                          <p className="text-[10px] text-white/50 mb-1 font-light">Contacto</p>
                          <p className="text-[11px] sm:text-xs text-white/90 font-light mb-1">+1 703 554 9089</p>
                          <p className="text-[11px] sm:text-xs text-white/90 font-light">info@gennova.life</p>
                       </div>
                    </div>
                </div>
              </div>
            </div>

          </div>

          {/* Próxima Apertura: Miami */}
          <div className="mt-6 relative overflow-hidden h-[400px] flex flex-col justify-between bg-[#1a1a1a] rounded-2xl p-8 md:p-12 group">
            <img 
              src="https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&q=80&w=2000" 
              alt="Miami Edition" 
              className="absolute inset-0 w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[10s] opacity-50 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 z-10" />

            <div className="relative z-20 flex justify-between items-start w-full">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <span className="text-[9px] font-mono font-medium text-white tracking-[0.2em] uppercase">Próxima Apertura</span>
              </div>
            </div>

            <div className="relative z-20 flex flex-col md:flex-row items-end justify-between w-full mt-auto gap-6 border-t border-white/20 pt-6">
               <div>
                  <h3 className="text-5xl md:text-7xl font-sans font-light text-white tracking-tight leading-none drop-shadow-2xl">
                    Miami
                  </h3>
                  <h4 className="text-sm md:text-base font-mono text-gennova-gold tracking-wide mt-2 font-light">
                    West Kendall, Florida
                  </h4>
               </div>
               
               <p className="text-xs md:text-sm font-light text-white/80 max-w-sm leading-relaxed text-left md:text-right">
                  Nuestra próxima sede para acercar el bienestar integral a más personas. Espacios de calma y optimización en el sur de Florida.
               </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-6 bg-[#f8f8f8] rounded-2xl text-black p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden group border border-black/5">
            <div className="relative z-10 max-w-2xl w-full">
              <h4 className="text-3xl sm:text-4xl font-light text-black mb-4 font-sans tracking-tight">Toma el control de tu bienestar.</h4>
              <p className="text-black/70 text-sm font-light leading-relaxed max-w-xl">
                Nuestro equipo está listo para guiarte en cada paso. Agenda una sesión hoy mismo y descubre cómo la prevención y la ciencia se unen para mejorar tu calidad de vida.
              </p>
            </div>
            <div className="relative z-10 flex flex-col w-full lg:w-auto h-full justify-center shrink-0">
              <a 
                href="https://wa.me/51932818432"
                target="_blank"
                rel="noopener noreferrer" 
                className="relative px-8 py-4 bg-black text-white font-medium rounded-full tracking-wide text-sm hover:bg-gennova-gold transition-colors duration-500 flex items-center justify-center gap-4 whitespace-nowrap w-full"
              >
                Agendar asesoría <ArrowRight size={18} className="transform group-hover:translate-x-2 transition-transform" />
              </a>
              <p className="text-[10px] text-black/50 text-center tracking-wide mt-4 font-medium uppercase min-w-[250px]">Comunícate con nuestros especialistas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
