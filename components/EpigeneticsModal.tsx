
import React from 'react';
import { X, Dna, Zap, ShieldCheck, ArrowRight, Quote, Globe, Microscope, Brain, Leaf, Activity } from 'lucide-react';
import { ScienceData } from './ScienceModal';

// Datos actualizados: Lenguaje humano, beneficios claros, autoridad científica.
const SCIENCE_DOCS_INTERNAL: Record<string, ScienceData> = {
  'entorno': {
    id: 'entorno',
    title: 'El Entorno Manda',
    studyTitle: 'Epigenomics: How Environment Influences Our Genes',
    institution: 'National Institutes of Health (NIH)',
    source: 'Centro NIH',
    summary: 'Tus genes no son tu destino. Lo que comes, cómo respiras y dónde vives actúan como señales químicas que pueden "encender" genes de salud o "apagar" genes de enfermedad.',
    keyFinding: 'El 98% de tu expresión genética depende de tu estilo de vida, no de tu herencia.',
    tags: ['Control', 'Adaptabilidad']
  },
  'rendimiento': {
    id: 'rendimiento',
    title: 'Potencial Oculto',
    studyTitle: 'Epigenética en el Alto Rendimiento Humano',
    institution: 'Forbes Science Council',
    source: 'Forbes',
    summary: 'Los atletas de élite ya no entrenan a ciegas. Usan la epigenética para saber exactamente qué nutrientes necesita su cuerpo para recuperarse más rápido y evitar lesiones.',
    keyFinding: 'La personalización biológica es la ventaja competitiva definitiva.',
    tags: ['Rendimiento', 'Energía']
  },
  'reversibilidad': {
    id: 'reversibilidad',
    title: 'Rejuvenecimiento',
    studyTitle: 'Cellular Reprogramming and Aging',
    institution: 'Nature Journal',
    source: 'Nature',
    summary: 'El envejecimiento acelerado es, en gran parte, un error de "lectura" de tus genes causado por el daño acumulado. La buena noticia: este proceso es maleable y reversible.',
    keyFinding: 'Tu edad biológica puede ser menor que tu edad cronológica con las decisiones correctas.',
    tags: ['Anti-Aging', 'Vitalidad']
  },
  'longevidad': {
    id: 'longevidad',
    title: 'Reloj Biológico',
    studyTitle: 'Epigenetic Clocks and Healthspan',
    institution: 'Harvard Medical School',
    source: 'Harvard Bio',
    summary: 'No se trata de vivir para siempre, sino de vivir mejor por más tiempo. Identificar tus marcadores de desgaste nos permite crear un escudo protector para tu futuro.',
    keyFinding: 'Podemos ralentizar el reloj biológico optimizando tus sistemas celulares.',
    tags: ['Longevidad', 'Prevención']
  }
};

interface EpigeneticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectScienceDoc: (doc: ScienceData) => void;
}

const EpigeneticsModal: React.FC<EpigeneticsModalProps> = ({ isOpen, onClose, onSelectScienceDoc }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/98 backdrop-blur-2xl animate-fade-in overflow-y-auto">
      <div className="w-full max-w-7xl bg-black border border-white/10 rounded-[3rem] shadow-[0_0_120px_rgba(229,199,122,0.1)] relative flex flex-col lg:flex-row overflow-hidden my-auto max-h-[95vh]">
        
        {/* Lado Izquierdo: Visual Emocional (Asegurada Visibilidad con min-h) */}
        <div className="lg:w-[40%] min-h-[500px] lg:min-h-full relative flex flex-col justify-end p-12 lg:p-16 overflow-hidden shrink-0 group">
            {/* Background Image: High Contrast Human Connection */}
            <div className="absolute inset-0">
                <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop" 
                    alt="Conexión Humana Profunda" 
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-[3000ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            </div>
            
            <div className="relative z-10">
                <div className="w-16 h-1 bg-gennova-gold mb-8"></div>
                
                <h2 className="text-5xl lg:text-6xl font-serif text-white leading-[0.95] tracking-tight mb-6">
                    Tu ADN no es <br/>
                    <span className="italic text-gray-300">tu destino.</span>
                </h2>

                <p className="text-gray-100 text-lg font-light leading-relaxed mb-8 drop-shadow-md">
                    Es solo el punto de partida. <br/>
                    La <strong>Epigenética</strong> es la ciencia que te devuelve el control de tu evolución.
                </p>

                <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full border border-white/30">
                    <Dna size={16} className="text-gennova-cyan" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">Ciencia de Precisión</span>
                </div>
            </div>
        </div>

        {/* Lado Derecho: Contenido Editorial (Textos Brillantes) */}
        <div className="flex-1 bg-[#080808] relative flex flex-col overflow-hidden">
            
            {/* Header de Navegación */}
            <div className="flex items-center justify-between p-8 border-b border-white/5 bg-black/50 backdrop-blur-xl z-20 sticky top-0">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-gennova-gold/10 flex items-center justify-center border border-gennova-gold/20">
                        <Microscope size={14} className="text-gennova-gold" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-gray-200 uppercase tracking-[0.3em]">TU CIENCIA INTERIOR</span>
                </div>
                <button 
                    onClick={onClose} 
                    className="p-2 bg-white/5 rounded-full text-gray-200 hover:text-white transition-all hover:bg-white/10 border border-white/10"
                >
                    <X size={20} />
                </button>
            </div>

            <div className="overflow-y-auto custom-scrollbar p-8 lg:p-16 space-y-20">
                
                {/* 01. La Metáfora del Interruptor (Visual Explanation) */}
                <section className="animate-fade-in-up">
                    <h3 className="text-2xl md:text-3xl font-serif text-white mb-8">
                        Imagínate tus genes como <br/>
                        <span className="text-gennova-gold italic">interruptores de luz.</span>
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white/[0.05] p-8 rounded-[2rem] border border-white/10 hover:border-gennova-gold/30 transition-colors group">
                            <div className="flex justify-between items-start mb-6">
                                <span className="text-gray-300 font-mono text-[10px] uppercase tracking-widest">Estado A</span>
                                <div className="w-3 h-3 rounded-full bg-gray-600 group-hover:bg-red-500/50 transition-colors"></div>
                            </div>
                            <div className="h-16 flex items-center justify-center mb-4 opacity-50 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0">
                                <Zap size={32} className="text-red-400 rotate-180" />
                            </div>
                            <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-2">Genes "Apagados"</h4>
                            <p className="text-gray-200 text-xs leading-relaxed font-light">
                                Mala nutrición, estrés y toxinas pueden silenciar los genes que te protegen y te dan energía.
                            </p>
                        </div>

                        <div className="bg-white/[0.05] p-8 rounded-[2rem] border border-white/10 hover:border-gennova-gold/30 transition-colors group relative overflow-hidden">
                            <div className="absolute inset-0 bg-gennova-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <span className="text-gennova-gold font-mono text-[10px] uppercase tracking-widest">Estado B (Gennova)</span>
                                    <div className="w-3 h-3 rounded-full bg-gennova-gold shadow-[0_0_10px_#E5C77A]"></div>
                                </div>
                                <div className="h-16 flex items-center justify-center mb-4 text-gennova-gold drop-shadow-[0_0_15px_rgba(229,199,122,0.5)]">
                                    <Zap size={40} className="fill-current" />
                                </div>
                                <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-2">Genes "Encendidos"</h4>
                                <p className="text-gray-200 text-xs leading-relaxed font-light">
                                    Con los estímulos correctos, activamos tu potencial de regeneración, fuerza y vitalidad.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 02. Los 3 Pilares (Iconography) */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="text-[10px] font-mono font-bold text-gray-300 uppercase tracking-[0.2em]">Factores de Influencia</span>
                        <div className="h-px flex-1 bg-white/20"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { icon: Leaf, title: "Nutrición", desc: "Combustible molecular." },
                            { icon: Brain, title: "Emociones", desc: "Bioquímica del estrés." },
                            { icon: ShieldCheck, title: "Entorno", desc: "Radiación y toxinas." }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.08] border border-white/10 hover:bg-white/15 transition-colors">
                                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-gray-200 border border-white/20">
                                    <item.icon size={16} />
                                </div>
                                <div>
                                    <h5 className="text-white text-xs font-bold uppercase tracking-wider">{item.title}</h5>
                                    <p className="text-gray-300 text-[10px] font-light">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 03. Evidencia Científica (Editorial Cards) */}
                <section>
                    <div className="mb-8">
                        <h3 className="text-2xl font-serif text-white mb-2">Evidencia Clínica</h3>
                        <p className="text-gray-300 text-sm font-light">
                            Selección de estudios que validan nuestra metodología.
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        {Object.values(SCIENCE_DOCS_INTERNAL).map((doc, idx) => (
                            <button 
                                key={idx}
                                onClick={() => onSelectScienceDoc(doc)}
                                className="text-left group relative overflow-hidden rounded-[2rem] bg-[#111] hover:bg-[#181818] border border-white/10 hover:border-white/20 transition-all duration-500 p-8 flex flex-col justify-between min-h-[280px]"
                            >
                                <div className="mb-6">
                                    <div className="flex justify-between items-start mb-6">
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-[9px] font-mono text-gray-300 uppercase tracking-widest bg-black">{doc.source}</span>
                                        <ArrowRight size={16} className="text-gray-400 group-hover:text-white group-hover:-rotate-45 transition-all duration-300" />
                                    </div>
                                    <h4 className="text-xl font-serif text-white leading-tight mb-3 group-hover:text-gennova-gold transition-colors">{doc.title}</h4>
                                    <p className="text-gray-300 text-xs leading-relaxed line-clamp-3 font-light">
                                        "{doc.keyFinding}"
                                    </p>
                                </div>
                                <div className="mt-auto pt-6 border-t border-white/10 flex items-center gap-2 text-[9px] font-mono text-gray-400 uppercase tracking-wider group-hover:text-gray-200">
                                    <Globe size={12} />
                                    <span>Ver Estudio Completo</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </section>

                {/* 04. Authority Quote */}
                <div className="bg-white text-black p-10 rounded-[2.5rem] relative overflow-hidden group">
                    <Quote className="absolute top-6 left-6 text-black/10 w-12 h-12 transform scale-x-[-1]" />
                    <div className="relative z-10 text-center max-w-lg mx-auto">
                        <p className="font-serif text-xl md:text-2xl italic leading-relaxed mb-6 font-medium">
                            "Tu cuerpo es la tecnología más avanzada que posees. La epigenética es simplemente el manual de usuario que te faltaba."
                        </p>
                        <div className="flex flex-col items-center">
                            <span className="font-bold text-xs uppercase tracking-widest">Aldo Penagos</span>
                            <span className="text-[10px] text-gray-600 font-mono uppercase tracking-widest mt-1">Fundador Gennova Labs</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>

      </div>
    </div>
  );
};

export default EpigeneticsModal;
