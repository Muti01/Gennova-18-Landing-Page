
import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import AnimatedGLogo from './AnimatedGLogo';

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  isLast?: boolean;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop',
    title: 'No seguimos tendencias.\nDiseñamos longevidad.',
    subtitle: 'Detrás de Gennova hay ciencia, experiencia y estrategia.'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop',
    title: 'Coach en Longevidad',
    subtitle: 'Especialista en optimización celular, rendimiento biológico y envejecimiento estratégico.'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2000&auto=format&fit=crop',
    title: 'Trofóloga',
    subtitle: 'Nutrición terapéutica basada en biología individual.'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2000&auto=format&fit=crop',
    title: 'Nutrición + Mentalidad',
    subtitle: 'La biología cambia cuando cambia tu percepción.'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop',
    title: 'Movimiento con propósito.',
    subtitle: 'Entrenamiento adaptado a tu respuesta biológica.'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2000&auto=format&fit=crop',
    title: 'Genn Coach',
    subtitle: 'Tu copiloto biológico personal. Disponible 24/7.',
    isLast: true
  }
];

interface GennovaStaffProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: () => void;
}

const GennovaStaff: React.FC<GennovaStaffProps> = ({ isOpen, onClose, onStart }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, onClose]);

  if (!isOpen) return null;

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    setTouchStart(null);
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black animate-fade-in overflow-hidden select-none">
      {/* Controles superiores */}
      <div className="absolute top-0 left-0 w-full z-50 p-8 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <AnimatedGLogo className="w-10 h-10" />
          <span className="text-white font-mono text-[10px] font-bold uppercase tracking-[0.4em]">Gennova Staff</span>
        </div>
        <button 
          onClick={onClose}
          className="p-3 bg-white/5 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all border border-white/10 backdrop-blur-md"
        >
          <X size={20} />
        </button>
      </div>

      {/* Carrusel de Slides */}
      <div 
        className="relative w-full h-full"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div 
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              {/* Imagen de fondo */}
              <div className="absolute inset-0 h-full w-full">
                <img 
                  src={slide.image} 
                  alt="" 
                  className="w-full h-full object-cover transition-transform duration-[10s] ease-linear scale-100"
                  style={{ transform: isActive ? 'scale(1.1)' : 'scale(1)' }}
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>
              </div>

              {/* Contenido de Texto */}
              <div className="relative h-full w-full flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto">
                <h1 className={`text-4xl md:text-7xl font-serif text-white mb-6 leading-[1.1] tracking-tight whitespace-pre-line transition-all duration-1000 delay-300 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  {slide.title}
                </h1>
                
                <p className={`text-lg md:text-2xl text-white/70 font-light max-w-2xl transition-all duration-1000 delay-500 whitespace-pre-line ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  {slide.subtitle}
                </p>

                <div className={`mt-16 transition-all duration-1000 delay-700 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                  {slide.isLast ? (
                    <button 
                      onClick={onStart}
                      className="bg-white text-black px-12 py-5 rounded-full font-bold text-xs uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                    >
                      Conocer más
                    </button>
                  ) : (
                    <button 
                      onClick={nextSlide}
                      className="group flex items-center gap-3 text-white/50 hover:text-white transition-all border border-white/20 hover:border-white/40 px-8 py-3 rounded-full text-[10px] uppercase tracking-widest font-mono"
                    >
                      Explorar equipo <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navegación lateral (Desktop) */}
      <div className="hidden md:flex absolute bottom-12 left-1/2 -translate-x-1/2 z-50 items-center gap-8">
        <button 
          onClick={prevSlide}
          className="p-2 text-white/30 hover:text-white transition-colors"
        >
          <ChevronLeft size={32} />
        </button>
        <div className="flex gap-3">
          {SLIDES.map((_, i) => (
            <div 
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-12 h-1 rounded-full transition-all duration-500 cursor-pointer ${i === currentSlide ? 'bg-white' : 'bg-white/20'}`}
            ></div>
          ))}
        </div>
        <button 
          onClick={nextSlide}
          className="p-2 text-white/30 hover:text-white transition-colors"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      {/* Indicador de progreso (Mobile) */}
      <div className="md:hidden absolute bottom-10 w-full flex justify-center gap-2 z-50 px-8">
         {SLIDES.map((_, i) => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${i === currentSlide ? 'bg-white' : 'bg-white/10'}`}></div>
          ))}
      </div>
    </div>
  );
};

export default GennovaStaff;
