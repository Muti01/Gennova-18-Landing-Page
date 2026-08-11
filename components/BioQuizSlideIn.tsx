import React, { useState, useEffect } from 'react';
import { ArrowRight, X, Sparkles } from 'lucide-react';

interface BioQuizSlideInProps {
  onTakeQuiz: () => void;
}

const BioQuizSlideIn: React.FC<BioQuizSlideInProps> = ({ onTakeQuiz }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasClosed, setHasClosed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show slide-in after scrolling a bit (e.g., 1000px) and if it hasn't been closed
      if (window.scrollY > 1000 && !hasClosed) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasClosed]);

  if (!isVisible && !hasClosed) return null;

  return (
    <div 
      className={`fixed bottom-24 right-4 md:right-8 z-40 transition-all duration-700 transform ${
        isVisible && !hasClosed ? 'translate-x-0 opacity-100' : 'translate-x-[120%] opacity-0'
      }`}
    >
      <div className="bg-black border border-white/20 rounded-2xl shadow-2xl p-6 w-80 relative overflow-hidden backdrop-blur-md">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gennova-gold/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gennova-cyan/10 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>
        
        <button 
          onClick={() => {
            setIsVisible(false);
            setHasClosed(true);
          }}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors z-10"
          aria-label="Cerrar"
        >
          <X size={16} />
        </button>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={16} className="text-gennova-gold" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gennova-gold">Bio Quiz</span>
          </div>
          
          <h3 className="text-lg font-serif text-white mb-2 leading-tight">
            ¿No sabes por dónde empezar?
          </h3>
          
          <p className="text-xs font-sans text-gray-400 mb-5 leading-relaxed">
            Descubre en 2 minutos qué plan necesita tu biología para optimizarse.
          </p>

          <button 
            onClick={() => {
              setIsVisible(false);
              setHasClosed(true);
              onTakeQuiz();
            }}
            className="w-full group relative inline-flex items-center justify-between gap-4 bg-white text-black px-4 py-3 rounded-full uppercase tracking-widest font-mono text-[10px] font-bold overflow-hidden transition-all duration-300 hover:bg-gray-100"
          >
            <span className="relative z-10">Comenzar</span>
            <ArrowRight size={14} className="relative z-10 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BioQuizSlideIn;
