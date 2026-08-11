import React from 'react';
import { X, ArrowRight, Dna, CheckCircle2 } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    title: string;
    subtitle: string;
    description: string;
    points: string[];
    icon?: React.ElementType;
    ctaText?: string; 
  } | null;
  onCtaClick: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, data, onCtaClick }) => {
  if (!isOpen || !data) return null;

  const Icon = data.icon || Dna;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
      <div className="bg-gennova-elevated border border-white/10 w-full max-w-2xl rounded-3xl shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden relative flex flex-col max-h-[90vh]">
        
        <div className="relative p-8 pb-0">
            <button 
                onClick={onClose} 
                className="absolute top-6 right-6 p-2 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors z-10"
            >
                <X size={20} />
            </button>
            
            <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gennova-surface rounded-2xl flex items-center justify-center border border-white/5 shadow-lg shrink-0">
                    <Icon className="text-gennova-gold w-8 h-8" />
                </div>
                <div>
                    <h4 className="text-gennova-cyan font-mono text-[10px] font-bold uppercase tracking-widest mb-2">{data.subtitle}</h4>
                    <h2 className="text-3xl md:text-4xl font-serif text-white leading-none tracking-tight">{data.title}</h2>
                </div>
            </div>
        </div>

        <div className="p-8 overflow-y-auto custom-scrollbar">
            <p className="text-gray-300 text-lg leading-relaxed mb-10 border-l-2 border-gennova-gold/50 pl-6 font-light">
                {data.description}
            </p>

            <div className="bg-black/30 rounded-2xl p-8 border border-white/5">
                <h3 className="text-white font-mono text-xs uppercase mb-6 tracking-widest font-bold">Análisis & Beneficios</h3>
                <ul className="space-y-4">
                    {data.points.map((point, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <CheckCircle2 className="text-gennova-success w-5 h-5 shrink-0 mt-0.5" />
                            <span className="text-gray-400 text-sm font-light">{point}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        <div className="p-6 border-t border-white/5 bg-black/20">
            <button 
                onClick={() => {
                    onClose();
                    onCtaClick();
                }}
                className="w-full bg-gennova-gold text-black font-bold text-xs uppercase tracking-widest py-4 rounded-xl hover:brightness-110 transition-all transform hover:scale-[1.01] flex items-center justify-center gap-3 shadow-lg"
            >
                {data.ctaText || 'Obtener mi Kit Epigenético'} <ArrowRight size={16} />
            </button>
        </div>

      </div>
    </div>
  );
};

export default InfoModal;