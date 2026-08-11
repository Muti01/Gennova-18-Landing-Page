import React from 'react';
import { X, ShieldCheck, Scale, FileSignature } from 'lucide-react';

export type LegalDocType = 'privacy' | 'terms' | 'consent';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: LegalDocType | null;
}

const LEGAL_CONTENT: Record<LegalDocType, { title: string; icon: React.ElementType; content: React.ReactNode }> = {
  'privacy': {
    title: "PRIVACIDAD DE DATOS",
    icon: ShieldCheck,
    content: (
      <div className="space-y-4 text-sm text-gray-400 leading-relaxed font-light">
        <p><strong>1. Cumplimiento Normativo:</strong> Conforme a la Ley N° 29733 (Perú), protegemos sus datos biométricos con encriptación militar.</p>
        <p><strong>2. Anonimización:</strong> Sus resultados genéticos son disociados de su identidad personal antes del análisis por IA.</p>
        <p><strong>3. Soberanía:</strong> Usted posee sus datos. No vendemos información a terceros.</p>
      </div>
    )
  },
  'terms': {
    title: "TÉRMINOS DE SERVICIO",
    icon: Scale,
    content: (
      <div className="space-y-4 text-sm text-gray-400 leading-relaxed font-light">
        <p><strong>1. No Diagnóstico:</strong> Gennova es una herramienta de bienestar, no reemplaza consejo médico profesional.</p>
        <p><strong>2. Protocolos:</strong> El usuario debe seguir las instrucciones del kit para garantizar la viabilidad de la muestra.</p>
      </div>
    )
  },
  'consent': {
    title: "CONSENTIMIENTO INFORMADO",
    icon: FileSignature,
    content: (
      <div className="space-y-4 text-sm text-gray-400 leading-relaxed font-light">
        <p><strong>1. Autorización:</strong> Autorizo el procesamiento de mi muestra biológica para análisis epigenético.</p>
        <p><strong>2. Alcance:</strong> Entiendo que los resultados reflejan probabilidades biológicas, no sentencias deterministas.</p>
      </div>
    )
  }
};

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen || !type) return null;
  const data = LEGAL_CONTENT[type];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fade-in">
      <div className="bg-gennova-surface border border-white/10 w-full max-w-lg rounded-2xl shadow-2xl relative flex flex-col max-h-[80vh]">
        <div className="p-6 border-b border-white/5 flex items-center gap-4">
             <div className="bg-gennova-elevated p-2 rounded-lg text-gennova-gold border border-white/5"><data.icon size={20} /></div>
             <h3 className="text-white font-bold font-mono text-xs uppercase tracking-widest">{data.title}</h3>
             <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white"><X size={20} /></button>
        </div>
        <div className="p-8 overflow-y-auto custom-scrollbar">{data.content}</div>
        <div className="p-6 border-t border-white/5 bg-black/30">
            <button onClick={onClose} className="w-full bg-white text-black font-bold text-xs uppercase tracking-widest py-3 rounded-lg hover:bg-gray-200 transition">Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;