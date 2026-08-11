
import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ShieldCheck, Microscope, Zap, Sparkles, Eye } from 'lucide-react';
import KitImage from './KitImage';

interface KitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  plan: any;
}

const KitModal: React.FC<KitModalProps> = ({ isOpen, onClose, onConfirm, plan }) => {
  const [activeViewers, setActiveViewers] = useState(18);

  // Simulación de tráfico en tiempo real (Social Proof Algorithm)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveViewers(prev => {
        const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or +1
        const newValue = prev + change;
        return Math.max(12, Math.min(34, newValue)); // Mantiene el número entre 12 y 34
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  if (!isOpen || !plan) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="w-full max-w-5xl bg-gennova-main border border-white/10 rounded-[2.5rem] shadow-2xl relative flex flex-col md:flex-row overflow-hidden my-auto">
        
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white z-50 p-2 bg-black/50 rounded-full transition-colors">
            <X size={24} />
        </button>

        {/* Left Side: 3D Visualization */}
        <div className="md:w-1/2 bg-gennova-elevated relative flex flex-col items-center justify-center p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/5">
            <div className="absolute top-8 left-8">
                <span className="text-gennova-cyan font-mono text-[10px] uppercase tracking-[0.3em] flex items-center gap-2">
                    <Sparkles size={12} className="animate-pulse" /> IA Generative Render
                </span>
            </div>
            
            <div className="w-full max-w-sm mb-8 animate-float-medium">
                <KitImage />
            </div>

            <div className="text-center max-w-xs">
                <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-2">Hardware Biológico S-Drive</h3>
                <p className="text-gray-500 text-[10px] font-mono leading-relaxed uppercase">Tu muestra se analiza en segundos mediante tecnología de frecuencia epigenética alemana.</p>
            </div>
        </div>

        {/* Right Side: Configuration & Plan Summary */}
        <div className="md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
            <div className="mb-10">
                <div className="flex justify-between items-start">
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-widest mb-2 block ${plan.color}`}>{plan.name}</span>
                    
                    {/* Social Proof Indicator */}
                    <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/5 animate-fade-in">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
                        <Eye size={10} className="text-gray-400" />
                        <span className="text-[9px] font-mono text-gray-300 font-bold tracking-wider">{activeViewers} viendo este plan</span>
                    </div>
                </div>

                <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight mb-4">Configura tu <br/> <span className="text-gennova-gold">Transformación</span></h2>
                <p className="text-gray-400 text-sm font-light leading-relaxed">
                    Estás a un paso de recibir tu kit y activar Gennova OS. La inteligencia artificial está lista para decodificar tu vitalidad.
                </p>
            </div>

            <div className="space-y-6 mb-12">
                <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 text-gennova-success">
                        <ShieldCheck size={20} />
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-xs uppercase tracking-widest">Validación Epixlife</h4>
                        <p className="text-gray-500 text-[10px] font-mono">PROTOCOLOS DE BIO-OPTIMIZACIÓN</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 text-gennova-cyan">
                        <Microscope size={20} />
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-xs uppercase tracking-widest">Mapeo de 800+ Marcadores</h4>
                        <p className="text-gray-500 text-[10px] font-mono">ANÁLISIS DE METILACIÓN</p>
                    </div>
                </div>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl mb-10 border border-white/5 flex justify-between items-center">
                <div>
                    <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest block mb-1">Inversión Total</span>
                    <span className="text-3xl font-serif text-white leading-none">S/ {plan.price}</span>
                </div>
                <div className="text-right">
                    <span className="text-[10px] text-gennova-success font-mono font-bold uppercase tracking-widest flex items-center gap-1 justify-end">
                        <Zap size={10} /> Envío Gratis
                    </span>
                    <span className="text-[10px] text-gray-500 font-mono">LIMA & REGIONES</span>
                </div>
            </div>

            <button 
                onClick={onConfirm}
                className="w-full bg-gennova-gold text-black font-bold py-5 rounded-2xl flex items-center justify-center gap-3 hover:brightness-110 transition-all duration-300 shadow-[0_0_30px_rgba(229,199,122,0.2)] uppercase text-xs tracking-[0.2em] transform hover:scale-[1.02]"
            >
                Confirmar y Activar <ArrowRight size={18} />
            </button>
            
            <p className="mt-6 text-center text-[9px] text-gray-600 font-mono uppercase tracking-widest">
                La inteligencia artificial es el núcleo. El acompañamiento humano es opcional.
            </p>
        </div>
      </div>
    </div>
  );
};

export default KitModal;
