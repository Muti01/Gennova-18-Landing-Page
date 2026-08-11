import React from 'react';

const FloatingWhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/51932818432"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-[100] group flex justify-center items-center"
      aria-label="Contactar soporte por WhatsApp"
    >
      <div className="relative flex items-center justify-center p-4 bg-black border border-white/20 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:border-white/50 transition-all duration-500 overflow-hidden">
        {/* Glow behind */}
        <div className="absolute inset-0 bg-gradient-to-tr from-gennova-gold/20 via-transparent to-gennova-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        {/* Carbon fiber texture overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30 pointer-events-none mix-blend-overlay"></div>
        
        {/* SVG WhatsApp icon */}
        <svg
          className="w-7 h-7 text-white relative z-10 group-hover:scale-110 transition-transform duration-500 will-change-transform"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
      </div>

      {/* Ping indicator - Online status */}
      <div className="absolute top-0 right-0 flex h-3 w-3 -mt-1 -mr-1">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-black"></span>
      </div>

      <div className="absolute right-full mr-5 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0 whitespace-nowrap pointer-events-none hidden sm:block">
        <div className="bg-black/90 backdrop-blur-md border border-gennova-gold/30 text-white text-[10px] uppercase tracking-[0.3em] px-4 py-2 font-mono shadow-[0_0_20px_rgba(229,199,122,0.15)] relative">
           AGENDA TU ASESORÍA AQUI
           {/* Tooltip triangle */}
           <div className="absolute w-2 h-2 border-r border-b border-gennova-gold/30 bg-black/90 right-[-5px] top-1/2 -mt-1 transform rotate-[-45deg]"></div>
        </div>
      </div>
    </a>
  );
};

export default FloatingWhatsAppButton;
