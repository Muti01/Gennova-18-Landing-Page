
import React from 'react';
import { X, Building2, Quote, CheckCircle2, Microscope, FileText, Globe } from 'lucide-react';

export interface ScienceData {
  id: string;
  title: string;
  studyTitle: string;
  institution: string;
  source: string;
  summary: string;
  keyFinding: string;
  tags: string[];
}

interface ScienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ScienceData | null;
}

const ScienceModal: React.FC<ScienceModalProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/98 backdrop-blur-2xl animate-fade-in">
      <div className="w-full max-w-2xl bg-gennova-elevated border border-white/10 rounded-[3rem] shadow-2xl relative flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header - High Precision Detail */}
        <div className="p-8 border-b border-white/5 relative bg-black/40">
             <div className="absolute top-0 left-0 w-full h-1 bg-gennova-gold opacity-60"></div>
             <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-white/5 rounded-full text-gray-500 hover:text-white transition-all">
                <X size={20} />
             </button>
             
             <div className="flex items-center gap-3 mb-4">
                <div className="bg-gennova-surface border border-white/10 p-2 rounded-lg text-gennova-gold">
                    <FileText size={18} />
                </div>
                <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-gennova-gold font-bold">Protocol Validation // {data.source}</span>
             </div>
             
             <h2 className="text-2xl md:text-3xl font-serif text-white leading-tight mb-2 uppercase tracking-tighter">{data.title}</h2>
             <div className="flex flex-wrap gap-2 mt-4">
                 {data.tags.map((tag, idx) => (
                     <span key={idx} className="text-[8px] bg-white/5 border border-white/10 px-3 py-1 rounded-full text-gray-400 font-mono uppercase tracking-widest">
                         #{tag}
                     </span>
                 ))}
             </div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12 overflow-y-auto custom-scrollbar">
            
            <div className="bg-black/60 border border-white/5 rounded-[2rem] p-8 mb-8 relative group">
                <div className="absolute top-6 right-6 opacity-5">
                    <Quote size={60} className="text-white" />
                </div>
                
                <h3 className="text-white font-bold text-xl mb-6 pr-8 leading-snug italic font-serif">"{data.studyTitle}"</h3>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-6 text-[10px] text-gray-500 font-mono mb-8 border-b border-white/5 pb-6 uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                        <Building2 size={14} className="text-gennova-gold" />
                        <span>{data.institution}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Globe size={14} className="text-gennova-cyan" />
                        <span>Intelligence Network</span>
                    </div>
                </div>

                <div className="space-y-8">
                    <div>
                        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-600 font-bold block mb-3 font-mono">Dossier Context</span>
                        <p className="text-sm text-gray-300 font-light leading-relaxed">
                            {data.summary}
                        </p>
                    </div>
                    
                    <div className="bg-gennova-gold/5 border border-gennova-gold/20 rounded-2xl p-6 mt-6">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-gennova-gold font-bold block mb-3 flex items-center gap-2 font-mono">
                            <CheckCircle2 size={14} /> Performance Insight
                        </span>
                        <p className="text-md text-white font-medium leading-relaxed italic">
                            {data.keyFinding}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4 p-5 bg-white/5 rounded-2xl border border-white/5">
                <Microscope size={20} className="text-gray-500" />
                <p className="text-[9px] text-gray-500 font-mono uppercase tracking-[0.3em] leading-relaxed font-bold">
                    Data Integrity: Verified // Epigenetic Precision Standard
                </p>
            </div>
        </div>

        <div className="p-8 bg-black border-t border-white/5">
            <button onClick={onClose} className="w-full bg-white text-black font-bold text-[11px] uppercase tracking-[0.5em] py-5 rounded-2xl hover:bg-gennova-gold transition-all shadow-2xl">
                CERRAR ARCHIVO
            </button>
        </div>
      </div>
    </div>
  );
};

export default ScienceModal;
