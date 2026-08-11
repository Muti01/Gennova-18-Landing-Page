import React, { useState } from 'react';
import { Flame, Moon, Zap, Brain, ShieldCheck, Hourglass, Activity, Sprout, CheckCircle2, ArrowRight, Database, Bot, Lock, ChevronRight, X } from 'lucide-react';

interface NutritionLabProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES = [
  { 
    id: 1, 
    title: 'Desinflamar', 
    desc: 'Bajar hinchazón celular', 
    icon: Flame, 
    color: 'text-blue-400', 
    border: 'border-blue-400',
    bg: 'bg-blue-400',
    protocol: {
        title: "Protocolo Antiinflamatorio",
        objective: "Reducir la pesadez y recuperar la ligereza de tu cuerpo.",
        ingredients: ['Arándanos', 'Cúrcuma', 'Omega 3', 'Grasas Sanas'],
        icon: Flame
    }
  },
  { 
    id: 2, 
    title: 'Calma & Sueño', 
    desc: 'Bajar el estrés', 
    icon: Moon, 
    color: 'text-violet-400', 
    border: 'border-violet-400',
    bg: 'bg-violet-400',
    protocol: {
        title: "Protocolo Calma Total",
        objective: "Dormir profundamente y apagar la ansiedad nocturna.",
        ingredients: ['Magnesio', 'Infusiones', 'Kiwi', 'Cena Ligera'],
        icon: Moon
    }
  },
  { 
    id: 3, 
    title: 'Energía Real', 
    desc: 'Poder para tu día', 
    icon: Zap, 
    color: 'text-yellow-400', 
    border: 'border-yellow-400',
    bg: 'bg-yellow-400',
    protocol: {
        title: "Recarga de Batería PM",
        objective: "Mantenerte despierto y enfocado sin bajones de azúcar.",
        ingredients: ['Aceite MCT', 'Té Verde', 'Nueces', 'Proteína'],
        icon: Zap
    }
  },
  { 
    id: 4, 
    title: 'Foco Mental', 
    desc: 'Claridad y memoria', 
    icon: Brain, 
    color: 'text-cyan-400', 
    border: 'border-cyan-400',
    bg: 'bg-cyan-400',
    protocol: {
        title: "Alimento para tu Mente",
        objective: "Pensar más rápido y eliminar la niebla mental.",
        ingredients: ['Huevo', 'Cacao Puro', 'Melena de León', 'Palta'],
        icon: Brain
    }
  },
  { 
    id: 5, 
    title: 'Defensas', 
    desc: 'Escudo protector', 
    icon: ShieldCheck, 
    color: 'text-green-400', 
    border: 'border-green-400',
    bg: 'bg-green-400',
    protocol: {
        title: "Escudo Biológico AM",
        objective: "Evitar enfermarte y fortalecer tu respuesta inmune.",
        ingredients: ['Vitamina C', 'Zinc', 'Jengibre', 'Ajo'],
        icon: ShieldCheck
    }
  },
  { 
    id: 6, 
    title: 'Longevidad', 
    desc: 'Mantenerme joven', 
    icon: Hourglass, 
    color: 'text-gennova-gold', 
    border: 'border-gennova-gold',
    bg: 'bg-gennova-gold',
    protocol: {
        title: "Reparación Celular",
        objective: "Ayudar a tus células a regenerarse cada noche.",
        ingredients: ['Resveratrol', 'Aceite de Oliva', 'Ayuno', 'Agua Pura'],
        icon: Hourglass
    }
  },
  { 
    id: 7, 
    title: 'Rendimiento', 
    desc: 'Poder físico', 
    icon: Activity, 
    color: 'text-red-400', 
    border: 'border-red-400',
    bg: 'bg-red-400',
    protocol: {
        title: "Fuel para el Esfuerzo",
        objective: "Darle a tus músculos la gasolina exacta que necesitan.",
        ingredients: ['Plátano', 'Proteína', 'Creatina', 'Hidratación'],
        icon: Activity
    }
  },
  { 
    id: 8, 
    title: 'Digestión', 
    desc: 'Vientre plano', 
    icon: Sprout, 
    color: 'text-emerald-400', 
    border: 'border-emerald-400',
    bg: 'bg-emerald-400',
    protocol: {
        title: "Limpieza Intestinal",
        objective: "Eliminar la hinchazón y digerir todo perfectamente.",
        ingredients: ['Kéfir', 'Fibra', 'Probióticos', 'Kombucha'],
        icon: Sprout
    }
  },
];

const NutritionLab: React.FC<NutritionLabProps> = ({ isOpen, onClose }) => {
  const [activeId, setActiveId] = useState(1);
  
  if (!isOpen) return null;

  const activeCategory = CATEGORIES.find(c => c.id === activeId) || CATEGORIES[0];
  const ActiveIcon = activeCategory.protocol.icon;

  return (
    <div className="fixed inset-0 z-[160] bg-black animate-fade-in flex flex-col overflow-hidden">
      <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 md:px-16 bg-black/80 backdrop-blur-xl z-50">
          <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg bg-gennova-gold/10 border border-gennova-gold/20 flex items-center justify-center">
                  <Database size={16} className="text-gennova-gold" />
              </div>
              <div>
                  <h2 className="text-sm font-bold text-white uppercase tracking-widest leading-none">Gennova Biohacks</h2>
                  <span className="text-[9px] text-gray-600 font-mono uppercase tracking-[0.3em]">Protocolo de Combustible Inteligente</span>
              </div>
          </div>
          <button 
              onClick={onClose}
              className="p-3 bg-white/5 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all border border-white/10"
          >
              <X size={20} />
          </button>
      </header>

      <main className="flex-1 overflow-y-auto custom-scrollbar bg-black">
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <div className="max-w-2xl text-left">
                    <span className="text-gennova-cyan font-mono text-xs uppercase tracking-[0.3em] mb-4 block flex items-center gap-2">
                        <Database size={12} /> Tu Manual Personalizado
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-tight">
                        TU COMBUSTIBLE <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gennova-gold to-white">INTELIGENTE</span>
                    </h2>
                    <p className="text-white text-lg font-light leading-relaxed border-l-2 border-white/10 pl-6">
                        No hagas dieta, optimiza tus hábitos. Elige tu meta y descubre qué necesita tu cuerpo hoy.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                {CATEGORIES.map((cat) => (
                    <button 
                        key={cat.id} 
                        onClick={() => setActiveId(cat.id)}
                        className={`
                            group p-6 rounded-2xl transition-all duration-300 text-left relative overflow-hidden border
                            ${activeId === cat.id 
                                ? `bg-white/10 ${cat.border} scale-[1.02]` 
                                : 'bg-gennova-surface border-white/5 hover:bg-white/5'
                            }
                        `}
                    >
                        <div className="flex justify-between items-start mb-4 text-left">
                            <cat.icon className={`w-6 h-6 ${activeId === cat.id ? cat.color : 'text-gray-500'}`} />
                            <ArrowRight size={12} className={`transition-all ${activeId === cat.id ? 'text-white rotate-0' : 'text-gray-600 -rotate-45'}`} />
                        </div>
                        <h3 className={`font-bold text-sm uppercase tracking-wide mb-1 ${activeId === cat.id ? 'text-white' : 'text-gray-300'}`}>{cat.title}</h3>
                        <p className="text-gray-500 text-[10px] font-mono uppercase tracking-wider">{cat.desc}</p>
                    </button>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div key={activeId} className="relative bg-gennova-elevated border border-white/10 rounded-3xl p-8 animate-fade-in shadow-2xl text-left">
                    <div className="flex justify-between items-start mb-6 border-b border-white/5 pb-6">
                        <div>
                            <span className={`text-[10px] font-mono uppercase tracking-widest mb-1 block ${activeCategory.color}`}>Acción Diaria</span>
                            <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">{activeCategory.protocol.title}</h3>
                        </div>
                        <div className="bg-gennova-surface p-3 rounded-xl border border-white/10">
                            <ActiveIcon size={24} className={activeCategory.color} />
                        </div>
                    </div>

                    <div className="mb-8">
                        <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-2">Tu Beneficio</p>
                        <p className="text-white text-sm font-light leading-relaxed">{activeCategory.protocol.objective}</p>
                    </div>

                    <div className="mb-8">
                        <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-3">Qué sumar a tu día</p>
                        <div className="flex flex-wrap gap-2">
                            {activeCategory.protocol.ingredients.map((item, i) => (
                                <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-white">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                         <div className="flex items-center gap-2">
                            <CheckCircle2 size={14} className="text-gennova-success" />
                            <span className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">Protocolo de Precisión</span>
                         </div>
                    </div>
                </div>

                <div className="space-y-10 text-left">
                    <h3 className="text-2xl font-serif text-white">No es una dieta, es tu código.</h3>
                    <div className="space-y-4">
                        <p className="flex items-center gap-4 text-white font-light">
                            <span className={`w-1.5 h-1.5 rounded-full ${activeCategory.bg}`}></span>
                            Fácil de seguir, sin complicaciones.
                        </p>
                        <p className="flex items-center gap-4 text-white font-light">
                            <span className={`w-1.5 h-1.5 rounded-full ${activeCategory.bg}`}></span>
                            Basado en lo que tu cuerpo pide hoy.
                        </p>
                        <p className="flex items-center gap-4 text-white font-light">
                            <span className={`w-1.5 h-1.5 rounded-full ${activeCategory.bg}`}></span>
                            Actualizado en tiempo real por tu Coach AI.
                        </p>
                    </div>
                    <div className="bg-gennova-surface border border-white/10 rounded-2xl p-6">
                        <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
                            <Lock size={14} className="text-gennova-cyan" /> Bloqueado para Miembros
                        </h4>
                        <p className="text-xs text-white leading-relaxed">
                            Al obtener tu Kit, este manual se sincroniza con tus biomarcadores para darte la receta exacta de tu vitalidad.
                        </p>
                    </div>
                </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default NutritionLab;