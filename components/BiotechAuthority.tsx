
import React, { useState } from 'react';
import { ShieldCheck, ChevronRight, Sparkles, Microscope, Dna, Activity, ScanLine } from 'lucide-react';
import ComplianceModal from './ComplianceModal';

const BiotechAuthority: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  return (
    <section className="py-12 bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Banner de Autoridad - Estilo Estratégico Whoop */}
        <div className="relative bg-gennova-surface border border-white/10 rounded-[2.5rem] p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 overflow-hidden shadow-2xl">
          
          {/* Luz de fondo sutil */}
          <div className="absolute -left-20 -top-20 w-64 h-64 bg-gennova-gold/10 blur-[100px] rounded-full pointer-events-none"></div>

          {/* Imagen del Kit / Producto (Izquierda) con Animaciones */}
          <div className="w-full md:w-64 h-64 rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-[#05070A] border border-white/10 shrink-0 relative flex items-center justify-center group animate-float-medium shadow-[0_0_30px_rgba(56,232,248,0.1)]">
            
            {/* Animación de S-Drive / Metilación de ADN */}
            <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:scale-110 transition-transform duration-700">
                {/* Halo brillante central */}
                <div className="absolute w-32 h-32 bg-gennova-cyan/20 blur-[30px] rounded-full animate-pulse-slow"></div>
                
                {/* Estructura central simulando la bobina del S-Drive */}
                <div className="absolute w-28 h-28 border-[1px] border-gennova-cyan/40 rounded-full animate-spin-slow"></div>
                <div className="absolute w-20 h-20 border-[1px] border-gennova-gold/30 rounded-full animate-[spin_8s_linear_infinite_reverse]"></div>
                
                {/* Ícono Principal de ADN */}
                <Dna size={48} className="text-gennova-cyan animate-pulse drop-shadow-[0_0_8px_rgba(56,232,248,0.8)]" />
            </div>

            {/* Partículas / Puntos de metilación abstractos */}
            <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-gennova-gold rounded-full animate-ping opacity-60"></div>
            <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-gennova-cyan rounded-full animate-ping opacity-60" style={{ animationDelay: '1s' }}></div>
            
            {/* Capa de Escaneo Biométrico Láser */}
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden rounded-3xl">
                <div className="absolute left-0 w-full h-[2px] bg-gennova-cyan/60 shadow-[0_0_15px_rgba(56,232,248,0.8)] animate-biometric-scan mix-blend-screen"></div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10"></div>
            
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20">
                <div className="flex items-center gap-1.5">
                    <div className="flex gap-[1px]">
                        <div className="w-1 h-3 bg-red-500 animate-pulse"></div>
                        <div className="w-1 h-2 bg-yellow-500"></div>
                        <div className="w-1 h-4 bg-gennova-success animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    </div>
                    <span className="text-[9px] font-mono text-gennova-cyan font-bold uppercase tracking-[0.2em] ml-1">S-Drive Scanner</span>
                </div>
                <Activity size={12} className="text-white/40" />
            </div>
          </div>

          {/* Contenido Central */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <span className="bg-gennova-gold/10 text-gennova-gold text-[10px] font-mono font-bold px-3 py-1 rounded-full border border-gennova-gold/20 uppercase tracking-widest">
                TECNOLOGÍA Y CIENCIA ALEMANA
              </span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-4 leading-[1.1] tracking-tight">
              La ciencia que respalda <span className="text-gennova-gold italic">tu bienestar.</span>
            </h2>
            
            <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
              Con casi 10 años como pioneros de la epigenética en Perú y respaldados por Epixlife y Cell Wellbeing, decodificamos tus biomarcadores celulares a través del escáner S-Drive. Ingeniería alemana de máxima certificación para optimizar tu biología.
            </p>

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-[10px] font-mono text-gray-400 mb-4 uppercase tracking-[0.2em] text-center md:text-left">
                La tecnología S-Drive está certificada por
              </p>
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-8 gap-y-6 opacity-60">
                  <span className="font-sans font-black text-2xl text-white tracking-widest">FCC</span>
                  <span className="font-sans font-black text-2xl text-white tracking-widest">CE</span>
                  <span className="font-sans font-black text-2xl text-white border-[3px] border-white px-2 py-0.5 rounded-sm tracking-tight leading-none">FDA</span>
                  <div className="flex flex-col items-center leading-none">
                    <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center mb-1">
                      <span className="font-sans font-bold text-sm text-white">ETL</span>
                    </div>
                    <span className="text-[9px] font-bold text-white uppercase tracking-wider">Intertek</span>
                  </div>
                  <div className="flex flex-col items-center leading-none">
                    <span className="font-sans font-black text-2xl text-white tracking-tighter">HS</span>
                    <span className="text-[10px] font-bold text-white font-mono uppercase">Codes</span>
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="font-sans italic font-bold text-sm text-white">CCC</span>
                  </div>
                  <div className="flex flex-col items-center leading-none">
                    <ShieldCheck size={18} className="text-white mb-1" />
                    <span className="font-sans font-black text-sm text-white uppercase tracking-wider">ANVISA</span>
                  </div>
                  <span className="font-sans font-bold text-2xl text-white tracking-tighter lowercase">invima</span>
              </div>
            </div>
          </div>

          {/* Botón de Acción (Derecha) */}
          <div className="shrink-0 w-full md:w-auto">
            <button 
              onClick={() => setSelectedCert('sdrive')}
              className="w-full md:w-auto bg-white text-black px-10 py-5 rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:bg-gennova-gold transition-all duration-300 shadow-xl flex items-center justify-center gap-2 group font-mono"
            >
              EXPLORAR
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>

      <ComplianceModal 
        isOpen={!!selectedCert} 
        onClose={() => setSelectedCert(null)} 
        certId={selectedCert} 
      />
    </section>
  );
};

export default BiotechAuthority;
