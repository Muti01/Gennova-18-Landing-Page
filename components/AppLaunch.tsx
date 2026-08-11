
import React, { useState } from 'react';
import { ChevronRight, Zap, Activity, Moon, BarChart3, ScanFace, Apple, Play, Heart, CheckCircle2 } from 'lucide-react';

const AppLaunch: React.FC = () => {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if(email) {
        setJoined(true);
        setTimeout(() => setJoined(false), 3000);
        setEmail('');
    }
  };

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gray-50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
            
            {/* Left: Copy & CTA */}
            <div className="order-2 lg:order-1">
                <div className="flex items-center gap-3 mb-8">
                    <span className="bg-black text-white px-3 py-1 rounded-sm text-[10px] font-mono font-bold uppercase tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-gennova-gold animate-pulse"></span>
                        Beta Access
                    </span>
                    <span className="text-gray-400 text-[10px] font-mono uppercase tracking-widest font-bold">LAUNCH Q2 2026</span>
                </div>

                <h2 className="text-5xl md:text-7xl font-serif text-black mb-6 leading-[0.9] tracking-tighter">
                    TU CUERPO <br/>
                    <span className="text-gray-400">HABLA.</span><br/>
                    NOSOTROS <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-600">TRADUCIMOS.</span>
                </h2>

                <p className="text-gray-600 text-lg mb-10 leading-relaxed font-light max-w-md">
                    Gennova OS es el primer sistema operativo biológico. Sincroniza tu Kit Epigenético con tus wearables para entregarte métricas de recuperación y alertas en tiempo real.
                </p>

                {/* Feature Grid */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-8 mb-12 border-t border-gray-100 pt-8">
                    <div className="group">
                        <div className="flex items-center gap-2 mb-2">
                            <Moon size={18} className="text-black" />
                            <h4 className="font-bold text-black text-xs uppercase tracking-widest">Sueño & Recuperación</h4>
                        </div>
                        <p className="text-gray-500 text-xs leading-snug">Correlación entre tu calidad de sueño y tus niveles de vitaminas actuales.</p>
                    </div>
                    <div className="group">
                        <div className="flex items-center gap-2 mb-2">
                            <Zap size={18} className="text-black" />
                            <h4 className="font-bold text-black text-xs uppercase tracking-widest">Carga de Esfuerzo</h4>
                        </div>
                        <p className="text-gray-500 text-xs leading-snug">Recomendaciones de intensidad diaria basadas en tu inflamación celular.</p>
                    </div>
                    <div className="group">
                        <div className="flex items-center gap-2 mb-2">
                            <ScanFace size={18} className="text-black" />
                            <h4 className="font-bold text-black text-xs uppercase tracking-widest">Bio-Edad Diaria</h4>
                        </div>
                        <p className="text-gray-500 text-xs leading-snug">Monitorea cómo tus hábitos aceleran o revierten tu envejecimiento.</p>
                    </div>
                    <div className="group">
                        <div className="flex items-center gap-2 mb-2">
                            <BarChart3 size={18} className="text-black" />
                            <h4 className="font-bold text-black text-xs uppercase tracking-widest">Tendencias 30 Días</h4>
                        </div>
                        <p className="text-gray-500 text-xs leading-snug">Visualiza el impacto real de tu nutrición en gráficas simples.</p>
                    </div>
                </div>

                {/* Input Field */}
                <form onSubmit={handleJoin} className="relative max-w-sm mb-8">
                    <div className="relative group">
                        <input 
                            type="email" 
                            placeholder="Tu correo electrónico" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-gray-50 border-b-2 border-gray-200 text-black text-sm py-4 pl-0 pr-36 focus:outline-none focus:border-black transition-colors placeholder-gray-400 font-medium rounded-none"
                        />
                        <button 
                            type="submit"
                            className="absolute right-0 top-2 bottom-2 bg-black text-white hover:bg-gennova-gold hover:text-black transition-all rounded-full px-6 text-xs font-bold uppercase tracking-widest flex items-center gap-2"
                        >
                            {joined ? 'Estás dentro' : 'Unirme'}
                            {!joined && <ChevronRight size={12} />}
                        </button>
                    </div>
                </form>

                <div className="flex gap-6 opacity-60 grayscale transition-all duration-500">
                    <div className="flex items-center gap-2">
                        <Apple size={20} className="text-black" />
                        <span className="text-xs font-bold text-black">iOS App Store</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <Play size={20} className="text-black fill-current" />
                        <span className="text-xs font-bold text-black">Google Play</span>
                    </div>
                </div>
            </div>

            {/* Right: Static High-Fidelity CSS Mockup */}
            <div className="order-1 lg:order-2 flex justify-center relative perspective-1000">
                 
                 {/* Shadow Blob */}
                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-black/20 blur-[40px] rounded-full"></div>

                 {/* THE PHONE FRAME */}
                 <div className="relative w-[320px] h-[640px] bg-black rounded-[45px] border-[8px] border-gray-900 shadow-2xl overflow-hidden transform rotate-y-[-5deg] rotate-x-[5deg] transition-transform duration-700 hover:rotate-0 hover:scale-[1.02]">
                     
                     {/* Dynamic Island / Notch Area */}
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-7 bg-black rounded-b-2xl z-30"></div>
                     
                     {/* SCREEN CONTENT (Gennova OS UI) */}
                     <div className="w-full h-full bg-black text-white relative flex flex-col pt-12 px-6 pb-8">
                         
                         {/* Header */}
                         <div className="flex justify-between items-center mb-8">
                            <div>
                                <h3 className="text-xs font-mono uppercase text-gray-400 tracking-widest mb-1">Tu Bio-Data</h3>
                                <p className="text-lg font-bold font-serif">Hoy, 24 Oct</p>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                                <Activity size={14} className="text-gennova-gold" />
                            </div>
                         </div>

                         {/* MAIN RING VISUALIZER */}
                         <div className="relative w-56 h-56 mx-auto mb-8 flex items-center justify-center">
                             {/* Outer Glow */}
                             <div className="absolute inset-0 bg-gennova-gold/10 blur-[40px] rounded-full animate-pulse-slow"></div>
                             
                             <svg className="w-full h-full transform -rotate-90">
                                 {/* Track */}
                                 <circle cx="112" cy="112" r="100" stroke="#1A1A1A" strokeWidth="12" fill="none" />
                                 {/* Value Ring - Recovery */}
                                 <circle cx="112" cy="112" r="100" stroke="#E5C77A" strokeWidth="12" fill="none" strokeDasharray="628" strokeDashoffset="60" strokeLinecap="round" className="animate-[dash_2s_ease-out_forwards]" />
                                 {/* Inner Ring - Strain */}
                                 <circle cx="112" cy="112" r="80" stroke="#1A1A1A" strokeWidth="8" fill="none" />
                                 <circle cx="112" cy="112" r="80" stroke="#38E8F8" strokeWidth="8" fill="none" strokeDasharray="502" strokeDashoffset="180" strokeLinecap="round" className="animate-[dash_2.5s_ease-out_forwards]" />
                             </svg>
                             
                             {/* Center Data */}
                             <div className="absolute inset-0 flex flex-col items-center justify-center">
                                 <span className="text-5xl font-bold font-mono tracking-tighter">98<span className="text-lg">%</span></span>
                                 <span className="text-[10px] uppercase tracking-widest text-gennova-gold font-bold mt-1">Recuperación</span>
                             </div>
                         </div>

                         {/* Metrics Grid */}
                         <div className="grid grid-cols-2 gap-4 mb-6">
                             <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                 <div className="flex items-center gap-2 mb-2 text-gray-400 text-[10px] uppercase font-mono">
                                     <Heart size={12} className="text-red-500" /> VHR
                                 </div>
                                 <span className="text-xl font-bold font-mono">42 <span className="text-xs text-gray-500">bpm</span></span>
                             </div>
                             <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                 <div className="flex items-center gap-2 mb-2 text-gray-400 text-[10px] uppercase font-mono">
                                     <Moon size={12} className="text-gennova-cyan" /> Sueño
                                 </div>
                                 <span className="text-xl font-bold font-mono">7h 45m</span>
                             </div>
                         </div>

                         {/* Insight Card */}
                         <div className="mt-auto bg-gradient-to-r from-white/10 to-transparent p-4 rounded-xl border-l-2 border-gennova-gold">
                             <p className="text-xs font-light text-gray-300 leading-relaxed">
                                 <span className="text-gennova-gold font-bold">Insight:</span> Tu VHR está en su pico mensual. Hoy es ideal para entrenamiento de alta intensidad.
                             </p>
                         </div>

                     </div>

                     {/* Screen Gloss Reflection */}
                     <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-white/5 to-transparent skew-x-12 pointer-events-none"></div>
                 </div>

                 {/* Decorative Graphic Element - Minimalist */}
                 <div className="absolute -right-16 top-20 hidden lg:block">
                     <svg width="120" height="120" viewBox="0 0 100 100" className="animate-spin-slow opacity-20">
                         <circle cx="50" cy="50" r="48" fill="none" stroke="#000" strokeWidth="0.5" strokeDasharray="4 4" />
                         <circle cx="50" cy="50" r="30" fill="none" stroke="#000" strokeWidth="1" strokeDasharray="20 60" />
                     </svg>
                 </div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default AppLaunch;
