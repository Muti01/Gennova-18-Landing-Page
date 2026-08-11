
import React, { useRef } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star, Activity } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: "Andrea R.",
    role: "Ejecutiva, 39 años",
    category: "Energía",
    color: "text-gennova-cyan",
    bg: "bg-gennova-cyan/10",
    border: "border-gennova-cyan/20",
    quote: "Sentía una fatiga crónica que ningún café solucionaba. El test reveló una intolerancia metabólica oculta y una alta carga de radiación electromagnética en mi rutina. Al ajustar mi alimentación y desactivar interferencias, mi vitalidad se duplicó en 3 semanas.",
    metric: "+45% Energía Percibida"
  },
  {
    id: 2,
    name: "Luis M.",
    role: "Emprendedor, 42 años",
    category: "Peso Saludable",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    quote: "Hacía dietas y caminaba a diario pero no lograba bajar de peso ni desinflamarme. Gennova identificó los micronutrientes específicos que mi sistema requería para reactivarse. Mi digestión se restauró y logré mi peso ideal de forma natural.",
    metric: "-8kg Peso Regulado"
  },
  {
    id: 3,
    name: "Elena B.",
    role: "Empresaria, 65 años",
    category: "Longevidad",
    color: "text-gennova-gold",
    bg: "bg-gennova-gold/10",
    border: "border-gennova-gold/20",
    quote: "No busco ser joven, busco vivir plenamente. El informe me enseñó a proteger mis células y optimizar mi metilación celular. Mi médico de cabecera está sorprendido con mis análisis biológicos actuales; me siento con la fuerza de hace 15 años.",
    metric: "-4.2 Años Edad Bio"
  },
  {
    id: 4,
    name: "Diego F.",
    role: "Triatleta Amateur, 33 años",
    category: "Rendimiento",
    color: "text-gennova-success",
    bg: "bg-gennova-success/10",
    border: "border-gennova-success/20",
    quote: "Mis tiempos durante los entrenamientos se habían estancado por completo. Con Gennova descubrimos que mi cuerpo no asimilaba correctamente los ácidos grasos esenciales. Ajustamos mis comidas y logré romper mi récord personal.",
    metric: "Nuevo Récord Personal"
  }
];

const Testimonials: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 400;
      current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-32 bg-white relative border-t border-gray-100 overflow-hidden">
        {/* Subtle Background Gradients on White */}
        <div className="absolute left-0 top-1/2 w-96 h-96 bg-gray-50 rounded-full blur-[80px] pointer-events-none -translate-x-1/2"></div>
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-gennova-gold/5 blur-[100px] rounded-full pointer-events-none translate-x-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <div>
                    <span className="text-black font-mono text-[10px] uppercase tracking-[0.4em] mb-4 block flex items-center gap-2 font-bold">
                        <span className="w-2 h-2 rounded-full bg-gennova-gold animate-pulse"></span>
                        EVIDENCIA TANGIBLE
                    </span>
                    <h2 className="text-4xl md:text-6xl font-serif text-black mb-4 leading-[0.95] tracking-tighter">
                        Lo que sucede cuando <br/>
                        <span className="italic text-gennova-gold">dejas de adivinar.</span>
                    </h2>
                    <p className="text-gray-500 text-sm font-sans font-light max-w-md leading-relaxed">
                        Resultados reales de personas que dejaron de adivinar y empezaron a optimizar. Esto es lo que sucede cuando tomas el control.
                    </p>
                </div>
                
                {/* Navigation Controls (Dark on White) */}
                <div className="flex gap-3">
                    <button onClick={() => scroll('left')} className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all active:scale-95 shadow-sm">
                        <ChevronLeft size={20} />
                    </button>
                    <button onClick={() => scroll('right')} className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all active:scale-95 shadow-sm">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            {/* Scrollable Container with Harmonic Spacing */}
            <div 
                ref={scrollRef}
                className="flex gap-8 overflow-x-auto pb-12 pt-4 snap-x snap-mandatory no-scrollbar px-4 sm:px-6 lg:px-8 -mx-4 sm:-mx-6 lg:-mx-8"
            >
                {REVIEWS.map((t, i) => (
                    <div 
                        key={i}
                        className="min-w-[340px] md:min-w-[420px] bg-[#0B0F16] p-10 rounded-[2.5rem] snap-center relative group transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl border border-white/5 flex flex-col justify-between h-[380px] animate-fade-in-up"
                        style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}
                    >
                        {/* Header: User Profile */}
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-sm font-bold text-white shadow-sm">
                                    {t.name.charAt(0)}
                                </div>
                                <div>
                                    <h5 className="text-white font-bold text-base">{t.name}</h5>
                                    <span className="text-gray-500 text-[10px] font-mono uppercase tracking-widest">{t.role}</span>
                                </div>
                            </div>
                            <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${t.bg} ${t.color}`}>
                                {t.category}
                            </div>
                        </div>

                        {/* Quote */}
                        <div className="relative flex-grow">
                             <Quote className="absolute -top-2 -left-2 text-white/5 w-8 h-8 transform -scale-x-100" />
                             <p className="text-gray-300 text-sm leading-7 font-light relative z-10 pl-2">
                                "{t.quote}"
                             </p>
                        </div>

                        {/* Footer: Metrics */}
                        <div className="border-t border-white/5 pt-6 mt-auto flex items-center justify-between">
                             <div className="flex gap-1">
                                {[1,2,3,4,5].map(s => <Star key={s} size={12} className="text-gennova-gold fill-current" />)}
                             </div>
                             <div className="flex items-center gap-2">
                                <Activity size={14} className={t.color} />
                                <span className={`text-[10px] font-mono font-bold uppercase tracking-widest ${t.color}`}>
                                    {t.metric}
                                </span>
                             </div>
                        </div>
                    </div>
                ))}
                
                {/* Spacer */}
                <div className="min-w-[20px]"></div>
            </div>
        </div>
    </section>
  );
};

export default Testimonials;
