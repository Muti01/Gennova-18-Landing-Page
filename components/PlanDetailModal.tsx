
import React from 'react';
import { X, Check, Microscope, Zap, Shield, HeartPulse, Database, Bot, Users, ArrowRight, UserCheck, FileText, FlaskConical, Sparkles, Brain } from 'lucide-react';

interface PlanDetail {
  id: string;
  name: string;
  scope: string;
  copy: {
    idealFor: string;
    whatYouGet: string;
  };
  details: {
    icon: any;
    label: string;
    items: string[];
  }[];
}

const PLAN_DETAILS: Record<string, PlanDetail> = {
  start: {
    id: 'start',
    name: 'BIO-ESENCIAL',
    scope: 'Iniciación en Biología de Precisión',
    copy: {
        idealFor: 'Personas que buscan un punto de partida real basado en datos clínicos para optimizar su energía diaria.',
        whatYouGet: 'Un mapa de ruta biológico completo para los próximos 30 días.'
    },
    details: [
      {
        icon: Microscope,
        label: 'Evaluación Estratégica',
        items: [
          '1 Evaluación Epigenética Completa / Epixlife - Cell Wellbeing',
          'Mapeo profundo de 12 Sistemas Clave Biológicos',
          'Sesión de Interpretación (Presencial o Virtual) con Coach de Longevidad'
        ]
      },
      {
        icon: Database,
        label: 'Protocolo de Acción',
        items: [
          'Plan Epi Nutrimental Personalizado x 30 días',
          'Recomendación de Suplementación Específica',
          'Guía de Biohacks Diarios para optimización celular',
          'Acceso a Genn Coach AI x 30 días (Muy Pronto)'
        ]
      }
    ]
  },
  plus: {
    id: 'plus',
    name: 'BIO-EVOLUCIÓN',
    scope: 'Optimización de Alto Rendimiento',
    copy: {
        idealFor: 'Quienes desean no solo conocer su estado actual, sino medir su evolución y recibir guía de expertos celulares.',
        whatYouGet: 'Evidencia comparativa de mejora y soporte profesional especializado.'
    },
    details: [
      {
        icon: Zap,
        label: 'Control de Evolución',
        items: [
          'Todo lo incluido en el Plan BIO-ESENCIAL',
          '2 Evaluaciones Epigenéticas Completas (Medición de Progreso)',
          'Plan Epi Nutrimental Extendido x 60 días'
        ]
      },
      {
        icon: Users,
        label: 'Guía Especializada',
        items: [
          '1 Sesión con Especialista de Staff (Bióloga Celular, Trofóloga o Coach Ontológica)',
          'Ajustes de suplementación basados en la evolución',
          'Acceso a Genn Coach AI x 60 días (Muy Pronto)'
        ]
      }
    ]
  },
  elite: {
    id: 'elite',
    name: 'BIO-ELITE',
    scope: 'Control Total & Longevidad Estratégica',
    copy: {
        idealFor: 'Líderes y atletas que exigen el máximo rendimiento y desean blindar su salud a largo plazo.',
        whatYouGet: 'Transformación sistémica liderada por un equipo multidisciplinario.'
    },
    details: [
      {
        icon: Shield,
        label: 'Soberanía Biológica',
        items: [
          'Todo lo incluido en planes anteriores',
          '3 Evaluaciones Epigenéticas (Control Trimestral de Metilación)',
          'Plan Epi Nutrimental de Transformación x 90 días'
        ]
      },
      {
        icon: Sparkles,
        label: 'Élite Experience Staff',
        items: [
          '3 Sesiones Estratégicas con Especialistas (Staff Completo)',
          'Acceso directo a Bióloga, Coach de Longevidad y Trofóloga',
          'Acompañamiento de Coach Ontológica y Entrenador Personal',
          'Acceso a Genn Coach AI x 90 días (Muy Pronto)'
        ]
      }
    ]
  }
};

interface PlanDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  planId: string | null;
}

const PlanDetailModal: React.FC<PlanDetailModalProps> = ({ isOpen, onClose, planId }) => {
  if (!isOpen || !planId || !PLAN_DETAILS[planId]) return null;
  const detail = PLAN_DETAILS[planId];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl relative flex flex-col overflow-hidden my-auto max-h-[90vh]">
        
        {/* Header con estética de laboratorio */}
        <div className="p-8 border-b border-gray-100 flex justify-between items-start bg-gray-50/50">
            <div>
                <span className="text-gennova-gold font-mono text-[10px] font-bold uppercase tracking-[0.4em] mb-2 block">Protocol Intelligence // {detail.id}</span>
                <h2 className="text-3xl font-serif text-black leading-none">{detail.name}</h2>
                <p className="text-gray-500 text-sm font-light mt-2">{detail.scope}</p>
            </div>
            <button onClick={onClose} className="p-2 bg-black/5 rounded-full text-gray-400 hover:text-black transition-colors"><X size={20} /></button>
        </div>

        {/* Contenido Detallado */}
        <div className="p-8 md:p-12 overflow-y-auto custom-scrollbar">
            
            {/* Copy estratégico "Para quién es" */}
            <div className="mb-10 bg-gray-50 p-6 rounded-3xl border border-gray-100">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Público Objetivo:</h4>
                <p className="text-gray-800 text-sm font-medium leading-relaxed italic">
                    "{detail.copy.idealFor}"
                </p>
            </div>

            <div className="space-y-12">
                {detail.details.map((section, idx) => (
                    <div key={idx} className="group">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 rounded-2xl bg-black text-white shadow-lg group-hover:bg-gennova-gold group-hover:text-black transition-colors">
                                <section.icon size={20} />
                            </div>
                            <h3 className="text-xs font-mono font-bold text-black uppercase tracking-[0.2em]">{section.label}</h3>
                        </div>
                        <ul className="space-y-4 ml-4">
                            {section.items.map((item, i) => (
                                <li key={i} className="flex items-start gap-4 text-sm text-gray-600 font-sans font-light leading-relaxed">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gennova-gold shrink-0"></div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Insight extraído (Qué obtienes) */}
            <div className="mt-12 bg-black text-white p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <UserCheck size={40} />
                </div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-widest mb-3 text-gennova-gold">Diferencial Gennova</h4>
                <p className="text-sm font-light leading-relaxed opacity-90">
                    {detail.copy.whatYouGet}
                </p>
            </div>
        </div>

        {/* Footer CTA */}
        <div className="p-8 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
            <button 
                onClick={onClose}
                className="flex-1 bg-black text-white font-mono text-[10px] font-bold uppercase tracking-[0.4em] py-5 rounded-2xl hover:bg-gennova-gold hover:text-black transition-all shadow-xl flex items-center justify-center gap-3"
            >
                CERRAR <X size={14} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default PlanDetailModal;
