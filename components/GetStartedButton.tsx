
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const GetStartedButton: React.FC = () => {
  const [theme, setTheme] = useState<'gold' | 'cyan' | 'black' | 'white'>('gold');

  useEffect(() => {
    const sections = ['hero', 'dashboard', 'reports', 'planes', 'footer'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Detecta cuando el centro de la sección cruza el centro de la pantalla
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id === 'hero' || id === 'reports') setTheme('gold');
          else if (id === 'dashboard') setTheme('cyan');
          else if (id === 'planes') setTheme('black'); // Botón negro sobre fondo blanco
          else if (id === 'footer') setTheme('gold');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToPlanes = () => {
    const el = document.getElementById('planes');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Configuración de estilos según el tema
  const styles = {
    gold: {
      bg: 'bg-gennova-gold',
      text: 'text-black',
      iconBg: 'bg-black',
      icon: 'text-gennova-gold',
      shadow: 'shadow-[0_0_40px_rgba(229,199,122,0.3)]',
      pulse: 'border-gennova-gold'
    },
    cyan: {
      bg: 'bg-gennova-cyan',
      text: 'text-black',
      iconBg: 'bg-black',
      icon: 'text-gennova-cyan',
      shadow: 'shadow-[0_0_40px_rgba(56,232,248,0.3)]',
      pulse: 'border-gennova-cyan'
    },
    black: {
      bg: 'bg-black',
      text: 'text-white',
      iconBg: 'bg-gennova-gold',
      icon: 'text-black',
      shadow: 'shadow-[0_0_40px_rgba(0,0,0,0.2)]',
      pulse: 'border-black'
    },
    white: {
      bg: 'bg-white',
      text: 'text-black',
      iconBg: 'bg-black',
      icon: 'text-white',
      shadow: 'shadow-[0_0_40px_rgba(255,255,255,0.2)]',
      pulse: 'border-white'
    }
  };

  const currentStyle = styles[theme as keyof typeof styles] || styles.gold;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[90] transition-all duration-1000">
      <button 
        onClick={scrollToPlanes}
        className={`flex items-center gap-4 ${currentStyle.bg} ${currentStyle.text} pl-8 pr-2 py-2 rounded-full font-mono text-[11px] font-bold uppercase tracking-[0.3em] ${currentStyle.shadow} transition-all duration-700 hover:scale-105 active:scale-95 group select-none`}
      >
        <span>EMPEZAR</span>
        
        {/* Contenedor de Icono Dinámico */}
        <div className={`w-10 h-10 ${currentStyle.iconBg} rounded-full flex items-center justify-center transition-all duration-500 group-hover:rotate-[-45deg] group-hover:bg-white`}>
          <ArrowRight size={18} className={`${currentStyle.icon} group-hover:text-black transition-colors`} />
        </div>

        {/* Efecto de Pulso Ambiental */}
        <div className={`absolute inset-0 rounded-full border ${currentStyle.pulse} animate-ping opacity-10 duration-[3000ms] pointer-events-none`}></div>
      </button>
    </div>
  );
};

export default GetStartedButton;
