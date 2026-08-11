
import React from 'react';

const SDriveVisual: React.FC<{ className?: string }> = ({ className = "w-64 h-64" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className} group`}>
      {/* Halo de Inducción Magnética */}
      <div className="absolute inset-0 bg-gennova-cyan/10 rounded-full blur-3xl animate-breathe-slow"></div>
      
      {/* El Dispositivo S-Drive (Estilizado) */}
      <svg viewBox="0 0 200 200" className="w-full h-full relative z-10 drop-shadow-[0_0_20px_rgba(56,232,248,0.2)]">
        <defs>
          <linearGradient id="metal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A1F2B" />
            <stop offset="100%" stopColor="#05070A" />
          </linearGradient>
          <radialGradient id="ring-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38E8F8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#38E8F8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Chasis Circular Exterior */}
        <circle cx="100" cy="100" r="85" fill="url(#metal-grad)" stroke="#ffffff" strokeOpacity="0.05" strokeWidth="1" />
        
        {/* Anillo de Inducción Animado */}
        <circle cx="100" cy="100" r="70" fill="none" stroke="#38E8F8" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.3">
          <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="20s" repeatCount="indefinite" />
        </circle>

        {/* Sensor Plate (El corazón del S-Drive) */}
        <circle cx="100" cy="100" r="50" fill="#0B0F16" stroke="#ffffff" strokeOpacity="0.1" />
        
        {/* Efecto de Escaneo (Scanline) */}
        <rect x="50" y="50" width="100" height="2" fill="url(#ring-glow)" opacity="0.8">
          <animate attributeName="y" values="60;140;60" dur="3s" repeatCount="indefinite" />
        </rect>

        {/* Nodos de Conexión Bio-Digital */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = 100 + Math.cos(rad) * 60;
          const y = 100 + Math.sin(rad) * 60;
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="3" fill="#38E8F8" opacity="0.4">
                <animate attributeName="r" values="2;4;2" dur={`${2 + i/2}s`} repeatCount="indefinite" />
              </circle>
            </g>
          );
        })}

        {/* Logo Central Epixlife/Gennova Mix */}
        <path d="M90 100 C 90 85, 110 85, 110 100 S 90 115, 90 100" stroke="#E5C77A" strokeWidth="2" fill="none" opacity="0.8" />
      </svg>
      
      {/* Etiqueta de Origen */}
      <div className="absolute -bottom-4 bg-black/80 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full flex items-center gap-2">
        <div className="flex gap-0.5">
          <div className="w-1.5 h-1.5 bg-black"></div>
          <div className="w-1.5 h-1.5 bg-red-600"></div>
          <div className="w-1.5 h-1.5 bg-yellow-400"></div>
        </div>
        <span className="text-[8px] font-mono font-bold text-white uppercase tracking-[0.2em]">Precision Engineering (DE)</span>
      </div>
    </div>
  );
};

export default SDriveVisual;
