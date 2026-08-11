
import React from 'react';
import { Activity, Clock, Dna } from 'lucide-react';

const BioAgeSection: React.FC = () => {
  return (
    <section className="bg-white py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. Encabezado Limpio y Directo (Narrativa Whoop) */}
        <div className="max-w-3xl mx-auto text-center mb-20">
            <span className="text-gennova-gold font-mono text-[10px] font-bold uppercase tracking-[0.4em] mb-6 block">
                Biología vs Cronología
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-black leading-[1.1] tracking-tight mb-8">
                Tu salud no empieza en los hábitos. <br className="hidden md:block" />
                <span className="italic text-gennova-gold">Empieza en tus células.</span>
            </h2>
            <p className="text-gray-600 text-lg font-light leading-relaxed font-sans mx-auto max-w-2xl">
                El análisis epigenético de Gennova ayuda a entender cómo responden tus células a lo que haces cada día: cómo descansas, cómo te mueves y cómo gestionas el estrés.
                <br/><br/>
                <span className="text-black font-medium">Cuando tus decisiones se alinean con tu biología celular, los hábitos se vuelven sostenibles y el cuerpo responde mejor con el paso del tiempo.</span>
            </p>
        </div>

        {/* 2. Imagen Dominante (77% Width Look) */}
        <div className="relative w-full max-w-[85%] md:max-w-[77%] mx-auto h-[600px] md:h-[700px] rounded-[3rem] overflow-hidden shadow-2xl group">
            
            {/* Imagen Principal: Runner Premium */}
            <img 
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2500&auto=format&fit=crop" 
                alt="Optimización Biológica Running" 
                className="w-full h-full object-cover transform transition-transform duration-[2000ms] group-hover:scale-105"
            />

            {/* Gradiente sutil para legibilidad del UI */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

            {/* 3. UI Overlay: Bio-Data Bubble (Recreación del concepto visual) */}
            <div className="absolute top-10 right-6 md:top-16 md:right-16 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] animate-float-medium max-w-xs">
                {/* Inner Glow Circle */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-[2.5rem] pointer-events-none"></div>
                
                <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="flex items-center gap-2 mb-2">
                        <Clock size={14} className="text-white" />
                        <span className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">Genn Edad</span>
                    </div>
                    
                    <div className="text-6xl font-serif font-bold text-white mb-1 tracking-tighter">
                        45.8
                    </div>
                    
                    <div className="bg-gennova-success/20 border border-gennova-success/30 px-3 py-1 rounded-full flex items-center gap-2 mb-4">
                        <Activity size={12} className="text-gennova-success" />
                        <span className="text-[10px] font-bold text-white uppercase tracking-wider">4.7 Años Menor</span>
                    </div>

                    {/* Molecular Connections Decoration */}
                    <div className="flex justify-center gap-2 mt-2 opacity-80">
                        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center bg-black/20 text-[8px] text-white font-bold backdrop-blur-sm">Vit D</div>
                        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center bg-black/20 text-[8px] text-white font-bold backdrop-blur-sm">Mg</div>
                        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center bg-black/20 text-[8px] text-white font-bold backdrop-blur-sm">Ca</div>
                    </div>
                </div>
            </div>

            {/* Decorative Label Bottom Left */}
            <div className="absolute bottom-8 left-8 flex items-center gap-3">
                <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center">
                    <Dna size={20} />
                </div>
                <div>
                    <p className="text-white text-xs font-bold uppercase tracking-widest">Metilación Activa</p>
                    <p className="text-white/70 text-[10px] font-mono">Zona de Optimización</p>
                </div>
            </div>

        </div>

      </div>
    </section>
  );
};

export default BioAgeSection;
