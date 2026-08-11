
import React, { useState, useEffect } from 'react';
import { ArrowRight, Dna, Sparkles, ScanFace, FileText, Utensils, Zap, Target, Quote, Package, BrainCircuit, Microscope } from 'lucide-react';

interface OnboardingTourProps {
  onClose: () => void;
}

const STEPS = [
  {
    id: 1,
    title: "EL PODER DE TUS DECISIONES",
    subtitle: "POR QUÉ IMPORTA",
    description: "Tus genes no son tu destino. Tu estilo de vida actúa como un interruptor maestro que enciende salud o apaga enfermedad.",
    icon: Microscope,
    color: "text-gennova-gold",
    borderColor: "border-gennova-gold"
  },
  {
    id: 2,
    title: "SISTEMA TRI-DIMENSIONAL",
    subtitle: "PRECISIÓN BIOLÓGICA",
    description: "Un ecosistema que integra decodificación de ADN, inteligencia artificial y planes de acción personalizados.",
    icon: Dna,
    color: "text-gennova-cyan",
    borderColor: "border-gennova-cyan"
  },
  {
    id: 3,
    title: "CIENCIA SIN FRICCIÓN",
    subtitle: "ACCESO SIMPLE",
    description: "Tecnología de laboratorio avanzada desde la comodidad de tu hogar. Sin agujas, sin dolor, solo resultados.",
    icon: Package,
    color: "text-white",
    borderColor: "border-white"
  },
  {
    id: 4,
    title: "VALIDACIÓN REAL",
    subtitle: "HISTORIAS DE ÉXITO",
    description: "Descubre cómo otros usuarios han optimizado su energía, sueño y rendimiento con nuestra tecnología.",
    icon: Quote,
    color: "text-gennova-success",
    borderColor: "border-gennova-success"
  },
  {
    id: 5,
    title: "AUTO-IDENTIFICACIÓN",
    subtitle: "¿ES PARA TI?",
    description: "Si buscas optimizar tu biología, prevenir el envejecimiento o maximizar tu rendimiento, estás en el lugar correcto.",
    icon: Target,
    color: "text-violet-400",
    borderColor: "border-violet-400"
  },
  {
    id: 6,
    title: "OBJETIVOS CLAROS",
    subtitle: "CATÁLOGO DE INFORMES",
    description: "Selecciona el informe específico para tu momento vital: Wellness, Sport, Age Management y más.",
    icon: FileText,
    color: "text-gennova-gold",
    borderColor: "border-gennova-gold"
  },
  {
    id: 7,
    title: "NUTRICIÓN CELULAR",
    subtitle: "LABORATORIO INTERACTIVO",
    description: "Protocolos nutricionales diseñados molecularmente para reducir inflamación y potenciar tus mitocondrias.",
    icon: Utensils,
    color: "text-gennova-cyan",
    borderColor: "border-gennova-cyan"
  },
  {
    id: 8,
    title: "TODO CONECTADO",
    subtitle: "ECOSISTEMA INTEGRAL",
    description: "Análisis, Coach IA, Dashboard y Nutrición. Todo lo que necesitas para tu bienestar en una sola plataforma.",
    icon: BrainCircuit,
    color: "text-white",
    borderColor: "border-white"
  },
  {
    id: 9,
    title: "TU YO DEL FUTURO",
    subtitle: "SIMULACIÓN BIOMÉTRICA",
    description: "Visualiza con IA generativa cómo la optimización epigenética transformará tu apariencia en 12 meses.",
    icon: ScanFace,
    color: "text-violet-400",
    borderColor: "border-violet-400"
  },
  {
    id: 10,
    title: "TU PUNTO DE PARTIDA",
    subtitle: "NIVEL DE OPTIMIZACIÓN",
    description: "Elige el plan que se adapta a tu ambición: Essential para empezar, Sport para rendir, Age Management para durar.",
    icon: Zap,
    color: "text-gennova-gold",
    borderColor: "border-gennova-gold"
  }
];

const OnboardingTour: React.FC<OnboardingTourProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep(prev => prev + 1);
    else handleFinish();
  };

  const handleFinish = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
      localStorage.setItem('gennova_tour_seen', 'true');
    }, 500);
  };

  const stepData = STEPS[currentStep];
  const Icon = stepData.icon;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-700 bg-black/95 backdrop-blur-xl ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="w-full max-w-sm bg-gennova-surface border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative flex flex-col min-h-[480px]">
        
        {/* Progress Bar */}
        <div className="flex gap-1 p-6 pb-0">
          {STEPS.map((_, idx) => (
            <div key={idx} className={`h-1 flex-1 rounded-full transition-all duration-500 ${idx <= currentStep ? 'bg-white' : 'bg-white/10'}`}></div>
          ))}
        </div>
        
        <button onClick={handleFinish} className="absolute top-6 right-6 text-[10px] text-gray-500 hover:text-white font-mono uppercase tracking-widest z-20">Saltar</button>

        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative">
          <div key={currentStep} className="relative mb-8 animate-fade-in-up">
            <div className={`w-20 h-20 rounded-full border ${stepData.borderColor} flex items-center justify-center bg-black relative z-10 shadow-lg`}>
               <Icon className={`w-8 h-8 ${stepData.color}`} />
            </div>
            <div className={`absolute inset-0 rounded-full border ${stepData.borderColor} animate-ping opacity-20 duration-[2000ms]`}></div>
          </div>

          <div key={`text-${currentStep}`} className="animate-fade-in relative z-10">
            <h4 className={`font-mono text-[10px] font-bold uppercase tracking-[0.2em] mb-3 ${stepData.color}`}>{stepData.subtitle}</h4>
            <h2 className="text-2xl font-serif font-bold text-white mb-4 leading-tight">{stepData.title}</h2>
            <p className="text-gray-400 text-sm leading-relaxed font-light">{stepData.description}</p>
          </div>
        </div>

        <div className="p-8 border-t border-white/5 bg-black/30 z-20">
          <button onClick={handleNext} className={`w-full py-4 rounded-xl font-bold font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 group ${currentStep === STEPS.length - 1 ? 'bg-gennova-gold text-black hover:bg-white' : 'bg-white text-black hover:bg-gray-200'}`}>
            {currentStep === STEPS.length - 1 ? 'Comenzar Experiencia' : 'Siguiente'} <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingTour;
