
import React from 'react';

const AnimatedGLogo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className} group select-none shrink-0`}>
      {/* 1. Borde de Seguimiento "DNA-Trace" (Estilo Whoop Buttons) */}
      <div className="absolute inset-0 rounded-full p-[1.5px] overflow-hidden">
        {/* El gradiente cónico que gira */}
        <div className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_120deg,#38E8F8_180deg,#E5C77A_240deg,transparent_300deg)] animate-dna-trace opacity-100 group-hover:duration-2000"></div>
        {/* Fondo interno para crear el efecto de anillo delgado */}
        <div className="absolute inset-[1.5px] bg-[#05070A] rounded-full z-10"></div>
      </div>

      {/* 2. Contenedor de la Letra G */}
      <div className="relative z-20 w-full h-full p-[12%] flex items-center justify-center">
        <svg 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-full drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
        >
          {/* Geometría de la G coincidiendo con la tipografía serif de Gennova */}
          <text 
            x="50" 
            y="75" 
            fill="white" 
            fontSize="82" 
            fontFamily="'Playfair Display', serif" 
            fontWeight="bold" 
            textAnchor="middle"
          >
            G
          </text>
          {/* Punto de Pulso Central (Bio-Active) */}
          <circle cx="68" cy="45" r="4.5" fill="#38E8F8" className="animate-pulse shadow-[0_0_10px_#38E8F8]">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
      
      {/* 3. Halo de Profundidad Ambiental */}
      <div className="absolute inset-0 bg-gennova-cyan/5 blur-[20px] rounded-full group-hover:bg-gennova-gold/10 transition-colors duration-1000"></div>
    </div>
  );
};

export default AnimatedGLogo;
