
import React, { useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Clock, Activity, Zap, Brain, Heart, Shield, Smile } from 'lucide-react';

const BENEFITS = [
  {
    id: 1,
    title: "Bio-Edad",
    subtitle: "TIEMPO BIOLÓGICO",
    desc: "Tu fecha de nacimiento es fija. Tu edad biológica es reversible. Mide qué tan rápido envejecen tus células.",
    img: "https://images.unsplash.com/photo-1581093458891-95b247a5d1b8?q=80&w=1000&auto=format&fit=crop", // Lab/DNA Abstract
    icon: Clock
  },
  {
    id: 2,
    title: "Calma Mental",
    subtitle: "NEURO-QUÍMICA",
    desc: "El estrés tiene una huella química. Identifica los detonantes nutricionales que bloquean tu paz mental.",
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000&auto=format&fit=crop", // Yoga/Calm atmosphere
    icon: Brain
  },
  {
    id: 3,
    title: "Energía Real",
    subtitle: "POTENCIA MITOCONDRIAL",
    desc: "Despierta sin necesidad de estimulantes. Optimiza la producción de ATP para energía constante todo el día.",
    img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop", // Athlete/Intense Focus
    icon: Zap
  },
  {
    id: 4,
    title: "Rendimiento",
    subtitle: "RECUPERACIÓN",
    desc: "Entrena inteligente. Conoce tu capacidad de recuperación sistémica para evitar lesiones y fatiga.",
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop", // Male Athlete/Muscles
    icon: Activity
  },
  {
    id: 5,
    title: "Circulación",
    subtitle: "FLUJO VITAL",
    desc: "Mejora la oxigenación de cada tejido. Un sistema circulatorio limpio es la autopista de tu nutrición.",
    img: "https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=1000&auto=format&fit=crop", // Abstract Red Cells
    icon: Heart
  },
  {
    id: 6,
    title: "Inmunidad",
    subtitle: "ESCUDO ACTIVO",
    desc: "No esperes a enfermarte. Fortalece tus defensas naturales eliminando las interferencias ambientales.",
    img: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=1000&auto=format&fit=crop", // Molecular/Virus Shield
    icon: Shield
  },
  {
    id: 7,
    title: "Longevidad",
    subtitle: "FUTURO EXPANDIDO",
    desc: "Vivir más es bueno. Vivir mejor es esencial. Diseña una vejez llena de vitalidad y lucidez.",
    img: "https://images.unsplash.com/photo-1552674605-469523170d9e?q=80&w=1000&auto=format&fit=crop", // Runner Motion Blur
    icon: Smile
  }
];

const BenefitsCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 340;
      current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-white py-24 border-b border-gray-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-black font-mono text-[10px] uppercase tracking-[0.4em] mb-4 block flex items-center gap-2">
              <span className="w-2 h-2 bg-gennova-gold rounded-full animate-pulse"></span>
              Resultados Tangibles
            </span>
            {/* Typography Standardized */}
            <h2 className="text-4xl md:text-6xl font-serif text-black leading-[0.95] tracking-tighter uppercase">
              El Poder de Conocerte.
            </h2>
            <p className="text-gray-500 mt-6 text-lg font-light leading-relaxed max-w-lg">
              Conocer tu cuerpo no es vanidad, es inteligencia biológica. Estos son los activos que desbloqueas al tomar el control.
            </p>
          </div>

          {/* Controls */}
          <div className="flex gap-4">
            <button onClick={() => scroll('left')} className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all active:scale-95">
              <ChevronLeft size={20} />
            </button>
            <button onClick={() => scroll('right')} className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all active:scale-95">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel - Immersive Card Layout */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory no-scrollbar"
        >
          {BENEFITS.map((item) => (
            <div 
              key={item.id} 
              className="min-w-[280px] md:min-w-[340px] h-[500px] snap-center group relative cursor-pointer rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img 
                        src={item.img} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                </div>

                {/* Card Content (Inside) */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end relative z-10">
                    {/* Icon Badge */}
                    <div className="absolute top-6 left-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                        <item.icon size={18} className="text-white" />
                    </div>

                    <div className="transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
                        <span className="text-gennova-gold font-mono text-[9px] font-bold uppercase tracking-[0.2em] mb-3 block">
                            {item.subtitle}
                        </span>
                        <h3 className="text-2xl font-serif text-white font-bold mb-4 uppercase tracking-tight leading-none">
                            {item.title}
                        </h3>
                        <p className="text-gray-300 text-xs font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 h-0 group-hover:h-auto overflow-hidden">
                            {item.desc}
                        </p>
                        
                        {/* Call to action arrow appearing on hover */}
                        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                            <div className="flex items-center gap-2 text-[10px] font-bold text-white uppercase tracking-widest">
                                Ver Detalle <ArrowRight size={12} className="text-gennova-gold" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          ))}
          
          {/* Padding Right */}
          <div className="min-w-[5vw]"></div>
        </div>

      </div>
    </section>
  );
};

export default BenefitsCarousel;
