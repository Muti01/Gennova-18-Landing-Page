
import React from 'react';
import { X, Cpu, Dna, Activity, Zap, ShieldCheck, ArrowRight, Sparkles, HeartPulse, Target } from 'lucide-react';
import AnimatedGLogo from './AnimatedGLogo';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-fade-in">
      <div className="bg-gennova-main border border-white/10 w-full max-w-4xl rounded-3xl shadow-2xl relative flex flex-col md:flex-row overflow-hidden max-h-[90vh]">
        
        {/* Left Visual Side: Identity & Heritage */}
        <div className="md:w-2/5 bg-black relative flex flex-col justify-between p-8 border-r border-white/5 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(229,199,122,0.15),transparent_50%)]"></div>
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-gennova-elevated to-transparent opacity-50"></div>
            
            <div className="relative z-10">
                <AnimatedGLogo className="w-12 h-12 mb-6" />
                <h2 className="text-3xl font-serif text-white leading-none mb-2">
                    GENNOVA <br/>
                    <span className="text-gennova-gold">LABS</span>
                </h2>
                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em]">Bio-Optimization Intelligence</p>
            </div>

            <div className="relative z-10 mt-12 space-y-6">
                <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 text-gennova-cyan group-hover:bg-gennova-cyan/20 transition-colors">
                        <Dna size={18} />
                    </div>
                    <div>
                        <span className="block text-white text-[11px] font-bold uppercase tracking-widest">Precisión</span>
                        <span className="text-[9px] font-mono text-gray-500 uppercase">Tecnología Alemana</span>
                    </div>
                </div>
                <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 text-gennova-gold group-hover:bg-gennova-gold/20 transition-colors">
                        <Cpu size={18} />
                    </div>
                    <div>
                        <span className="block text-white text-[11px] font-bold uppercase tracking-widest">Predicción</span>
                        <span className="text-[9px] font-mono text-gray-500 uppercase">Inteligencia Artificial</span>
                    </div>
                </div>
                <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 text-gennova-success group-hover:bg-gennova-success/20 transition-colors">
                        <HeartPulse size={18} />
                    </div>
                    <div>
                        <span className="block text-white text-[11px] font-bold uppercase tracking-widest">Bienestar</span>
                        <span className="text-[9px] font-mono text-gray-500 uppercase">Impacto Sistémico</span>
                    </div>
                </div>
            </div>
            
            <div className="relative z-10 mt-12 pt-6 border-t border-white/5">
                <p className="text-[9px] text-gray-600 font-mono uppercase tracking-[0.3em] leading-relaxed">
                    Sede Central Lima, Perú <br/>
                    Validación Epixlife EU
                </p>
            </div>
        </div>

        {/* Right Content Side: Strategic Narrative */}
        <div className="md:w-3/5 bg-gennova-surface p-8 md:p-14 overflow-y-auto custom-scrollbar relative">
            <button 
                onClick={onClose} 
                className="absolute top-8 right-8 p-2 text-gray-500 hover:text-white transition-all z-20 hover:rotate-90"
            >
                <X size={24} />
            </button>

            <div className="space-y-12">
                <div className="animate-fade-in">
                    <span className="text-gennova-gold font-mono text-[10px] uppercase tracking-[0.4em] mb-4 block">Nuestra Misión</span>
                    <h3 className="text-white text-3xl md:text-4xl font-serif leading-tight mb-6">
                        Desbloqueamos el <span className="text-gennova-gold italic">potencial</span> que tus genes ya poseen.
                    </h3>
                    <p className="text-gray-400 text-base leading-relaxed font-light">
                        En <span className="text-white font-medium">Gennova Labs</span>, no estamos aquí para decirte qué está mal, sino para mostrarte qué tan bien puedes estar. Creemos que la salud no es la ausencia de enfermedad, sino el pico máximo de tu rendimiento biológico.
                    </p>
                </div>

                <div className="space-y-8">
                    <div className="flex gap-6 items-start group">
                        <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center border border-white/5 text-gennova-cyan shrink-0">
                            <Zap size={20} />
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-2">Soberanía de tu Data</h4>
                            <p className="text-gray-500 text-xs leading-relaxed font-light">
                                Deja de adivinar con suplementos genéricos. Traducimos tus biomarcadores en una estrategia única. Tú tomas el control de tu propia química.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-6 items-start group">
                        <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center border border-white/5 text-gennova-gold shrink-0">
                            <Sparkles size={20} />
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-2">Prevención como Estilo de Vida</h4>
                            <p className="text-gray-500 text-xs leading-relaxed font-light">
                                La mejor defensa es una ofensiva inteligente. Identificamos desequilibrios antes de que se manifiesten, permitiéndote envejecer con vitalidad y fuerza.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-6 items-start group">
                        <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center border border-white/5 text-gennova-success shrink-0">
                            <Target size={20} />
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-2">Transformación Medible</h4>
                            <p className="text-gray-500 text-xs leading-relaxed font-light">
                                Si no puedes medirlo, no puedes mejorarlo. Gennova te ofrece un tablero vivo de tu bienestar, donde cada hábito cuenta y cada mejora se celebra.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <ShieldCheck size={60} className="text-white" />
                    </div>
                    <p className="text-white text-lg font-serif italic leading-relaxed mb-4 relative z-10">
                        "Eres un sistema biológico complejo, no un promedio estadístico. Mereces una ciencia diseñada exclusivamente para ti."
                    </p>
                    <span className="text-[10px] font-mono text-gennova-gold uppercase tracking-[0.3em]">Equipo de Innovación // Gennova Labs</span>
                </div>

                <div className="pt-6 border-t border-white/5">
                     <p className="text-xs text-gray-500 mb-8 font-light italic">
                        Somos el puente entre la biotecnología avanzada y tu vida diaria. Bienvenidos al futuro de la optimización humana.
                     </p>
                     
                     <button 
                        onClick={onClose}
                        className="w-full bg-white text-black py-5 rounded-2xl font-bold text-[10px] uppercase tracking-[0.4em] hover:bg-gennova-gold transition-all duration-300 shadow-xl flex items-center justify-center gap-3 group"
                     >
                        CERRAR <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                     </button>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default AboutModal;
