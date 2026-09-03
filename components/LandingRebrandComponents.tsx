import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, Phone, CheckCircle2, ShieldCheck, 
  ChevronDown, Activity, Zap, Heart, BrainCircuit, Sprout, Info, BookOpen
} from 'lucide-react';

const WHATSAPP_URL = "https://wa.me/51932818432?text=Hola%20Gennova,%20acabo%20de%20conocer%20la%20evaluaci%C3%B3n%20de%20bienestar%20y%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20c%C3%B3mo%20funciona%20y%20c%C3%B3mo%20puedo%20agendar.";

// --- 1. HERO SECTION ---
export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[95vh] flex items-center justify-center pt-24 pb-16 px-6 lg:px-12 bg-[#050B14] overflow-hidden">
      {/* Premium Dark Tech Background */}
      <div className="absolute inset-0 z-0">
        {/* Soft glowing orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-[#009E9E]/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50rem] h-[50rem] bg-[#1e293b]/80 rounded-full blur-[150px]"></div>
        {/* Subtle texture */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 shadow-[0_0_30px_rgba(0,158,158,0.15)]"
        >
          <span className="w-2 h-2 rounded-full bg-[#009E9E] animate-pulse"></span>
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-stone-300 font-bold">Bienestar Preventivo & Optimización</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-[5rem] font-serif text-white leading-[1.05] tracking-tight mb-8"
        >
          Conoce mejor tu biología.<br />
          <span className="italic text-[#009E9E] font-light">Toma mejores decisiones.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-stone-400 text-lg md:text-xl font-light leading-relaxed max-w-3xl mb-12 font-sans"
        >
          Descubre el test epigenético en Lima más avanzado. Una evaluación personalizada de bienestar que te ayuda a comprender indicadores relacionados con nutrición, metabolismo y factores ambientales para construir hábitos más conscientes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto"
        >
          <a 
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#009E9E] text-white font-semibold text-sm tracking-wider hover:bg-[#007A7A] transition-all duration-300 shadow-[0_0_40px_rgba(0,158,158,0.3)] hover:shadow-[0_0_60px_rgba(0,158,158,0.5)] flex items-center justify-center gap-2"
          >
            Quiero conocer mi evaluación
          </a>
          <a 
            href="#que-evalua-test-bienestar"
            className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 text-stone-300 font-semibold text-sm tracking-wider hover:bg-white/10 backdrop-blur-sm transition-colors duration-300 flex items-center justify-center gap-2"
          >
            ¿Qué evalúa?
          </a>
        </motion.div>
      </div>
    </section>
  );
};

// --- 1.5 SOCIAL PROOF SECTION ---
export const SocialProofSection: React.FC = () => {
  return (
    <section className="bg-[#050B14] border-t border-white/5 py-12 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <p className="text-center text-stone-500 text-[10px] font-mono tracking-[0.2em] uppercase mb-8">
          Tecnología y metodología oficial respaldada por
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-700">
          {/* Epixlife Logo (Stylized) */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-gradient-to-tr from-stone-800 to-stone-600 flex items-center justify-center shadow-lg">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <span className="text-xl font-serif text-white tracking-wide">Epixlife</span>
          </div>
          
          {/* Cell Wellbeing Logo (Stylized) */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-[#009E9E] flex items-center justify-center">
              <div className="w-2 h-2 bg-[#009E9E] rounded-full"></div>
            </div>
            <span className="text-lg font-sans font-medium text-white tracking-widest uppercase">Cell Wellbeing</span>
          </div>
          
          {/* S-Drive / CE Certifications */}
          <div className="flex items-center gap-4">
             <div className="flex flex-col items-center justify-center border border-stone-600/50 px-4 py-2 rounded-lg bg-white/5 backdrop-blur-sm">
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">Tecnología</span>
                <span className="text-sm font-bold text-white tracking-wider">S-DRIVE</span>
             </div>
             <div className="w-10 h-10 rounded-full border border-stone-600/50 flex items-center justify-center bg-white/5 backdrop-blur-sm">
                <span className="text-xs font-bold text-white">CE</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- 2. QUÉ ES LA EPIGENÉTICA ---
export const WhatIsEpigeneticsSection: React.FC = () => {
  return (
    <section className="py-32 px-6 lg:px-12 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#009E9E] font-bold block mb-4">
              LA CIENCIA DETRÁS
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1e293b] mb-6 leading-tight">
              Tu ADN es el punto de partida.<br />
              <span className="text-stone-400 italic">Tu entorno también importa.</span>
            </h2>
            <p className="text-stone-600 text-lg font-light leading-relaxed mb-6">
              Imagina que tu ADN es el libro de instrucciones. La epigenética estudia parte de los mecanismos que ayudan a determinar qué instrucciones se activan o silencian en determinados contextos.
            </p>
            <p className="text-sm text-stone-500 font-light flex items-center gap-3 bg-stone-50 p-5 rounded-2xl border border-stone-100">
              <Info size={24} className="text-[#009E9E] shrink-0" /> 
              <span>La epigenética no significa "reescribir nuestro ADN", sino modular cómo se expresa a través de nuestros hábitos diarios.</span>
            </p>
          </div>
          
          <div className="relative">
            {/* Visual Glassmorphism Flow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#009E9E]/10 to-transparent rounded-[3rem] transform rotate-3 scale-105 blur-xl"></div>
            <div className="relative bg-white/80 backdrop-blur-2xl border border-white shadow-2xl rounded-[3rem] p-8 md:p-10 flex flex-col gap-6">
              {[
                { label: 'Información Heredada', title: 'ADN', icon: <Activity size={24} />, active: false },
                { label: 'Factores Externos', title: 'SEÑALES DEL ENTORNO', icon: <Sprout size={24} />, active: true },
                { label: 'Decisiones Diarias', title: 'ESTILO DE VIDA', icon: <Heart size={24} />, active: true },
                { label: 'Respuesta Biológica', title: 'EXPRESIÓN GÉNICA', icon: <Zap size={24} />, active: false },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-6 group">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors duration-500 ${item.active ? 'bg-[#009E9E] text-white shadow-lg shadow-[#009E9E]/30' : 'bg-stone-100 text-stone-400 group-hover:bg-stone-200'}`}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-mono tracking-widest text-stone-400 uppercase mb-1">{item.label}</p>
                    <p className={`font-bold tracking-wide ${item.active ? 'text-[#1e293b]' : 'text-stone-500'}`}>{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- 3. QUÉ ES LA EVALUACIÓN GENNOVA ---
export const WhatIsGennovaEvaluationSection: React.FC = () => {
  return (
    <section id="evaluacion" className="py-24 px-6 lg:px-12 bg-stone-50">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/2 space-y-6">
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#009E9E] font-bold block">
            EVALUACIÓN GENNOVA
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#1e293b] leading-tight">
            No buscamos darte un diagnóstico.<br />Buscamos darte información.
          </h2>
          <p className="text-stone-600 text-lg font-light leading-relaxed">
            Una herramienta de autoconocimiento y optimización del bienestar basada en la tecnología de nuestros partners (Cell Wellbeing, Epixlife).
          </p>
          <p className="text-stone-500 font-light leading-relaxed">
            El informe puede proporcionar información sobre diferentes indicadores relacionados con: nutrientes, vitaminas, minerales, aminoácidos, antioxidantes, ácidos grasos, sistemas metabólicos, sistema intestinal, sistema cardiovascular, sistema inmunológico, factores ambientales, interacciones metabólicas y hábitos relacionados con el bienestar.
          </p>
          <div className="pt-4">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#009E9E] font-semibold text-sm uppercase tracking-wider hover:text-[#1e293b] transition-colors">
              Hablar con un especialista <ArrowRight size={16} />
            </a>
          </div>
        </div>
        <div className="lg:w-1/2 w-full">
          {/* Conceptual Image of Report */}
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-stone-200 bg-white aspect-[4/3]">
            <img 
              src="https://lh3.googleusercontent.com/d/1fmoH13hdLzzmJvzfv9XsWOxgdoETPMw4" 
              alt="Reporte de bienestar conceptual biomarcadores" 
              className="w-full h-full object-cover opacity-90"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#1e293b]/40 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-stone-100 shadow-sm flex items-center justify-between">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-[#009E9E]">
                   <Activity size={20} />
                 </div>
                 <div>
                   <p className="text-xs font-mono text-stone-400 font-bold uppercase tracking-wider">Reporte Generado</p>
                   <p className="text-sm font-serif font-bold text-stone-800">Mapeo de Bienestar</p>
                 </div>
               </div>
               <ShieldCheck size={24} className="text-stone-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- 4. QUÉ EVALUAMOS (Tarjetas Visuales) ---
export const WhatWeEvaluateSection: React.FC = () => {
  const categories = [
    { title: "NUTRICIÓN", desc: "Conoce indicadores relacionados con vitaminas, minerales, aminoácidos, antioxidantes y ácidos grasos." },
    { title: "METABOLISMO", desc: "Comprende mejor algunos indicadores relacionados con los procesos metabólicos y la producción de energía." },
    { title: "SISTEMA INTESTINAL", desc: "Obtén información sobre indicadores nutricionales y ambientales relacionados con el bienestar intestinal." },
    { title: "SISTEMA INMUNE", desc: "Explora indicadores nutricionales y ambientales asociados al equilibrio inmunológico." },
    { title: "SISTEMA CARDIOVASCULAR", desc: "Conoce indicadores nutricionales relacionados con el soporte cardiovascular." },
    { title: "ENTORNO", desc: "Identifica factores ambientales incluidos dentro de la evaluación." },
    { title: "HÁBITOS", desc: "Utiliza la información como punto de partida para revisar alimentación, descanso, movimiento y otros hábitos." }
  ];

  return (
    <section id="que-evalua-test-bienestar" className="py-32 px-6 lg:px-12 bg-stone-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#009E9E] font-bold block mb-4">
              MAPEO INTEGRAL
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1e293b] mb-4">¿Qué puedes conocer?</h2>
            <p className="text-stone-500 text-lg font-light">Explora las dimensiones de tu biología a través de 96 marcadores clave agrupados en áreas fundamentales.</p>
          </div>
        </div>
        
        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[220px]">
          {categories.map((cat, idx) => (
            <div 
              key={idx} 
              className={`p-8 rounded-[2rem] bg-white border border-stone-200 hover:border-[#009E9E]/30 hover:shadow-2xl hover:shadow-[#009E9E]/5 transition-all duration-500 flex flex-col justify-between relative overflow-hidden group ${
                idx === 0 || idx === 3 || idx === 6 ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
              }`}
            >
              {/* Subtle hover gradient orb */}
              <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-[#009E9E]/0 rounded-full blur-3xl group-hover:bg-[#009E9E]/10 transition-colors duration-700"></div>
              
              <div className="w-10 h-10 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center mb-6 z-10 relative">
                <div className="w-2 h-2 rounded-full bg-[#009E9E]"></div>
              </div>
              
              {/* Gamification / Micro-interaction Visuals */}
              <div className="absolute top-8 right-8 z-10 opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                {idx === 0 && (
                  <div className="relative w-16 h-16">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f5f5f4" strokeWidth="2" />
                      <path strokeDasharray="85, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#009E9E" strokeWidth="2" className="animate-[spin_2s_ease-out]" />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[9px] font-mono font-bold text-[#009E9E]">85%</span>
                  </div>
                )}
                {idx === 1 && (
                  <div className="flex items-end gap-1 h-12 w-12">
                    <div className="w-2 bg-[#009E9E]/40 h-4 rounded-t-sm group-hover:bg-[#009E9E] transition-colors duration-300"></div>
                    <div className="w-2 bg-[#009E9E]/60 h-8 rounded-t-sm group-hover:bg-[#009E9E] transition-colors duration-500 delay-75"></div>
                    <div className="w-2 bg-[#009E9E]/80 h-6 rounded-t-sm group-hover:bg-[#009E9E] transition-colors duration-700 delay-150"></div>
                    <div className="w-2 bg-[#009E9E] h-10 rounded-t-sm"></div>
                  </div>
                )}
                {idx === 2 && (
                   <div className="flex items-center gap-1 h-12 w-12">
                      <div className="w-1.5 h-3 bg-[#009E9E] rounded-full animate-[pulse_1s_ease-in-out_infinite]"></div>
                      <div className="w-1.5 h-8 bg-[#009E9E] rounded-full animate-[pulse_1.2s_ease-in-out_infinite_0.2s]"></div>
                      <div className="w-1.5 h-5 bg-[#009E9E] rounded-full animate-[pulse_1s_ease-in-out_infinite_0.4s]"></div>
                      <div className="w-1.5 h-10 bg-[#009E9E] rounded-full animate-[pulse_1.5s_ease-in-out_infinite_0.1s]"></div>
                   </div>
                )}
                {idx > 2 && (
                  <div className="w-12 h-12 rounded-full border-2 border-dashed border-[#009E9E]/30 group-hover:border-[#009E9E] group-hover:rotate-180 transition-all duration-1000 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#009E9E]"></div>
                  </div>
                )}
              </div>
              
              <div className="relative z-10">
                <h3 className="text-sm font-mono tracking-[0.1em] font-bold text-[#1e293b] mb-3">{cat.title}</h3>
                <p className="text-stone-500 font-light text-sm leading-relaxed max-w-sm">{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 4.5 EL MOMENTO AJÁ (Visualización del Reporte) ---
export const AhaMomentSection: React.FC = () => {
  return (
    <section className="py-32 px-6 lg:px-12 bg-[#050B14] overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-[#009E9E]/10 rounded-full blur-[150px] pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
           <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#009E9E] font-bold block mb-4">
              TU INFORME PERSONALIZADO
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6">Así se ve tu biología</h2>
            <p className="text-stone-400 text-lg font-light max-w-2xl mx-auto">
              Un vistazo a los paneles de resultados que recibirás. Más de 30 páginas de información detallada de tu cuerpo, transformada en gráficos visuales fáciles de entender.
            </p>
        </div>
        
        {/* Mockup Container (Uses placeholders, ready for Drive Images) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative">
          
          {/* Main Large Mockup */}
          <div className="md:col-span-8 bg-white/5 border border-white/10 rounded-3xl p-2 backdrop-blur-md shadow-2xl relative group overflow-hidden h-fit">
             <div className="absolute top-6 left-6 z-20 bg-black/80 backdrop-blur-md px-4 py-2 rounded-lg text-xs font-mono text-white/90 uppercase shadow-lg border border-white/10">
                Resumen de Resultados
             </div>
             <figure className="m-0">
               <img src="/informe-resumen.png" alt="Resumen de resultados del test epigenético mostrando niveles de optimización de bienestar" loading="lazy" className="w-full h-auto rounded-2xl opacity-90 group-hover:opacity-100 transition-opacity duration-700 bg-white" />
               <figcaption className="sr-only">
                 Gráfico de barras que ilustra el resumen de resultados del test epigenético y evaluación de bienestar preventivo de Gennova. Muestra indicadores nutricionales (minerales, aminoácidos, vitaminas, antioxidantes, ácidos grasos) y factores ambientales (microbioma, interferencias, exposición tóxica) clasificados por necesidad de optimización (alta, media, baja). Herramienta de nutrición de precisión y longevidad en Lima, Perú.
               </figcaption>
             </figure>
             <div className="absolute inset-0 rounded-2xl border border-white/5 pointer-events-none"></div>
          </div>

          {/* Secondary Mockups */}
          <div className="md:col-span-4 flex flex-col gap-6 h-fit">
             <div className="bg-white/5 border border-white/10 rounded-3xl p-2 backdrop-blur-md shadow-2xl relative group overflow-hidden">
               <div className="absolute top-4 left-4 z-20 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-mono text-white/90 uppercase border border-white/10">
                  Sistema Inmune
               </div>
               <figure className="m-0 h-full">
                 <img src="/informe-inmune.png" alt="Indicadores del sistema inmunológico en el informe de bienestar epigenético" loading="lazy" className="w-full h-auto rounded-2xl opacity-90 group-hover:opacity-100 transition-opacity duration-700 bg-white" />
                 <figcaption className="sr-only">
                   Tabla de evaluación epigenética del sistema inmune que destaca nutrientes clave (Vitamina C, Selenio, Zinc) y estresores ambientales para la optimización del sistema inmunológico preventivo y soporte celular.
                 </figcaption>
               </figure>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-3xl p-2 backdrop-blur-md shadow-2xl relative group overflow-hidden">
               <div className="absolute top-4 left-4 z-20 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-mono text-white/90 uppercase border border-white/10">
                  Sistema Cardiovascular
               </div>
               <figure className="m-0 h-full">
                 <img src="/informe-cardiovascular.png" alt="Indicadores del sistema cardiovascular y apoyo circulatorio mediante evaluación epigenética" loading="lazy" className="w-full h-auto rounded-2xl opacity-90 group-hover:opacity-100 transition-opacity duration-700 bg-white" />
                 <figcaption className="sr-only">
                   Detalle del test de bienestar para el sistema cardiovascular, analizando indicadores de apoyo circulatorio, vitaminas, minerales, antioxidantes, aminoácidos y ácidos grasos (Omega 3, DHA, EPA) para promover la longevidad y el bienestar vascular.
                 </figcaption>
               </figure>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// --- 5. QUÉ PUEDE APORTAR A TU VIDA (Decisiones Diarias) ---
export const DailyLifeImpactSection: React.FC = () => {
  const examples = [
    { title: "ALIMENTACIÓN", q: "¿Cómo puedo mejorar la calidad de mi alimentación?" },
    { title: "EJERCICIO", q: "¿Cómo puedo adaptar mejor mi rutina a mis objetivos?" },
    { title: "DESCANSO", q: "¿Qué hábitos puedo revisar para cuidar mejor mi recuperación?" },
    { title: "ESTRÉS", q: "¿Qué papel tienen mis hábitos y mi gestión del estrés?" },
    { title: "LONGEVIDAD", q: "¿Qué puedo empezar a hacer hoy para cuidar mi bienestar a largo plazo?" },
    { title: "ENERGÍA", q: "¿Cómo puedo construir hábitos que favorezcan un mejor funcionamiento cotidiano?" }
  ];

  return (
    <section className="py-24 px-6 lg:px-12 bg-[#1e293b] text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6">De la información a tus decisiones diarias.</h2>
          <p className="text-stone-400 text-lg font-light max-w-2xl mx-auto">El valor de los datos reside en cómo los aplicas en tu día a día.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {examples.map((ex, idx) => (
            <div key={idx} className="flex gap-4 items-start border-b border-stone-700/50 pb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-[#009E9E] mt-2 shrink-0"></div>
              <div>
                <span className="text-[10px] font-mono tracking-widest text-stone-400 uppercase font-bold block mb-1">{ex.title}</span>
                <p className="text-lg font-serif font-light text-white">{ex.q}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-stone-400 font-light italic opacity-80">
            * Estas recomendaciones forman parte de un proceso de acompañamiento y no sustituyen una evaluación médica.
          </p>
        </div>
      </div>
    </section>
  );
};

// --- 6. NUESTRO PROCESO ---
export const OurProcessSection: React.FC = () => {
  const steps = [
    { num: "01", title: "CONVERSAMOS", desc: "Agendamos una cita presencial en nuestra oficina de Barranco, Lima." },
    { num: "02", title: "TOMAMOS LA MUESTRA", desc: "Realizamos el proceso de toma de muestra siguiendo el protocolo correspondiente." },
    { num: "03", title: "INTERPRETAMOS", desc: "Recibes una sesión con un coach especializado en longevidad para comprender el informe." },
    { num: "04", title: "PERSONALIZAMOS", desc: "Nuestra nutricionista y trofóloga desarrolla un protocolo epi-nutrimental de 30 días." },
    { num: "05", title: "ACOMPAÑAMOS", desc: "Realizamos seguimiento durante los siguientes 90 días." }
  ];

  return (
    <section id="proceso-evaluacion-gennova" className="py-32 px-6 lg:px-12 bg-white overflow-hidden border-t border-stone-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-24 relative z-10">
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#009E9E] font-bold block mb-4">
            PASO A PASO
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1e293b] mb-6">Nuestro Proceso</h2>
          <p className="text-stone-500 font-light text-lg">Un camino estructurado desde la información hasta la optimización.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-6 relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-[40px] left-10 right-10 h-px bg-stone-100 z-0"></div>
          
          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
               {/* Massive Background Number */}
               <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 text-[8rem] font-serif font-bold text-stone-50 select-none z-[-1] transition-colors duration-500 group-hover:text-stone-100">
                 {step.num}
               </div>
               
              <div className="w-20 h-20 rounded-full bg-white border border-stone-200 shadow-sm flex items-center justify-center mb-8 text-[#009E9E] group-hover:scale-110 group-hover:bg-[#1e293b] group-hover:text-white transition-all duration-500">
                <span className="font-mono text-lg font-bold">{step.num}</span>
              </div>
              
              <h3 className="text-sm font-mono tracking-widest text-[#1e293b] font-bold uppercase mb-4">{step.title}</h3>
              <p className="text-stone-500 font-light text-sm leading-relaxed max-w-[220px]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 7. NO TE ENTREGAMOS SOLO UN INFORME ---
export const NotJustAReportSection: React.FC = () => {
  return (
    <section className="py-24 px-6 lg:px-12 bg-stone-50 border-y border-stone-200 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#1e293b] mb-6">
          El informe es el comienzo.<br />El acompañamiento es lo que importa.
        </h2>
        <p className="text-stone-600 text-lg font-light mb-12">
          En Gennova no queremos que recibas un documento y tengas que interpretarlo solo.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm md:text-base font-mono uppercase tracking-wider text-stone-700 font-bold">
          <div className="px-4 py-2 bg-white rounded-lg border border-stone-200 shadow-sm">Evaluación</div>
          <span className="text-stone-400 font-sans">+</span>
          <div className="px-4 py-2 bg-white rounded-lg border border-stone-200 shadow-sm">Interpretación</div>
          <span className="text-stone-400 font-sans">+</span>
          <div className="px-4 py-2 bg-white rounded-lg border border-stone-200 shadow-sm text-center">Protocolo personalizado</div>
          <span className="text-stone-400 font-sans">+</span>
          <div className="px-4 py-2 bg-white rounded-lg border border-stone-200 shadow-sm">Seguimiento</div>
        </div>
        
        <div className="mt-8 text-xl md:text-2xl font-serif text-[#009E9E] font-bold">
          = EXPERIENCIA GENNOVA
        </div>
      </div>
    </section>
  );
};

// --- 8. QUÉ RECIBES ---
export const WhatYouGetSection: React.FC = () => {
  const items = [
    "Evaluación personalizada presencial",
    "Informe de bienestar de 96 biomarcadores",
    "Sesión de interpretación de resultados (60 min)",
    "Orientación personalizada con coach",
    "Protocolo epi-nutrimental de 30 días",
    "Seguimiento activo durante 90 días"
  ];

  return (
    <section className="py-32 px-6 lg:px-12 bg-[#050B14] relative overflow-hidden">
      {/* Dark premium background effects */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-[#009E9E]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-[#1e293b]/50 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <div>
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#009E9E] font-bold block mb-4">
            TU PLAN DE ACCIÓN
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">¿Qué recibes?</h2>
          <p className="text-stone-400 text-lg font-light mb-10">Todo lo necesario para comprender tu biología y comenzar a optimizar tus hábitos con el respaldo de nuestro equipo.</p>
          
          <ul className="space-y-6">
            {items.map((item, idx) => (
              <li key={idx} className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#009E9E] group-hover:border-[#009E9E] transition-colors duration-300">
                  <CheckCircle2 size={16} className="text-[#009E9E] group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-stone-300 font-light text-lg group-hover:text-white transition-colors duration-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Glassmorphism Card Element */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#009E9E]/20 to-transparent rounded-[2rem] transform -rotate-3 scale-105 blur-xl"></div>
          <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-[2rem] p-10 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#009E9E] to-[#1e293b]"></div>
            <Activity size={32} className="text-[#009E9E] mb-6" />
            <h3 className="text-2xl font-serif text-white mb-2">Empieza tu optimización</h3>
            <p className="text-stone-400 font-light mb-8">Escríbenos para conocer más detalles sobre el proceso y agendar tu primera sesión.</p>
            <a 
              href={WHATSAPP_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center w-full gap-2 bg-[#009E9E] text-white px-6 py-4 rounded-xl font-semibold text-sm uppercase tracking-wider hover:bg-[#007A7A] transition-colors shadow-[0_0_20px_rgba(0,158,158,0.2)]"
            >
              Resolver mis dudas <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- 9. PARA QUIÉN ES & TRANSPARENCIA ---
export const WhoIsItForAndTransparency: React.FC = () => {
  return (
    <section className="py-24 px-6 lg:px-12 bg-stone-50 border-t border-stone-200">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* Para quién es */}
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#009E9E] font-bold block mb-4">
            AUDIENCIA
          </span>
          <h2 className="text-3xl font-serif text-[#1e293b] mb-8">¿Para quién es?</h2>
          <ul className="space-y-4 text-stone-600 font-light">
            <li className="flex items-start gap-3"><span className="text-[#009E9E] font-bold mt-1">•</span> Personas que quieren comprender mejor su bienestar.</li>
            <li className="flex items-start gap-3"><span className="text-[#009E9E] font-bold mt-1">•</span> Desean mejorar sus hábitos y personalizar su alimentación.</li>
            <li className="flex items-start gap-3"><span className="text-[#009E9E] font-bold mt-1">•</span> Buscan un enfoque preventivo hacia la longevidad.</li>
            <li className="flex items-start gap-3"><span className="text-[#009E9E] font-bold mt-1">•</span> Desean mejorar su relación con el ejercicio y trabajar en sus rutinas.</li>
            <li className="flex items-start gap-3"><span className="text-[#009E9E] font-bold mt-1">•</span> Quieren pasar de recomendaciones genéricas a información más personalizada.</li>
          </ul>
        </div>

        {/* Para quién no es / Transparencia */}
        <div className="bg-white p-8 md:p-10 rounded-3xl border border-stone-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Info size={24} className="text-stone-400" />
            <h2 className="text-2xl font-serif text-[#1e293b]">Transparencia</h2>
          </div>
          <p className="text-stone-500 font-light mb-6">Nuestra evaluación está diseñada para empoderarte con información, no para diagnosticar.</p>
          <ul className="space-y-4 text-sm text-stone-600 font-light">
            <li className="pb-3 border-b border-stone-100">No reemplaza una consulta médica.</li>
            <li className="pb-3 border-b border-stone-100">No es una herramienta de diagnóstico.</li>
            <li className="pb-3 border-b border-stone-100">No debe utilizarse para suspender medicamentos o tratamientos.</li>
            <li className="pb-3 border-b border-stone-100">No sustituye análisis clínicos convencionales.</li>
            <li className="pb-1">Si tienes una condición médica, debes consultar con un profesional de salud cualificado.</li>
          </ul>
        </div>

      </div>
    </section>
  );
};

// --- 10. PRECIO ---
export const PricingSection: React.FC = () => {
  return (
    <section id="precio-test-epigenetico-lima" className="py-32 px-6 lg:px-12 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-[10px] font-mono tracking-[0.3em] font-bold text-[#009E9E] uppercase mb-4 block">INVERSIÓN EN TU BIENESTAR</span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1e293b] mb-16">Planes Gennova</h2>
        
        <div className="bg-stone-50 border border-stone-200 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-stone-200/50 relative overflow-hidden max-w-2xl mx-auto">
          {/* Decorative Corner */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#009E9E]/10 rounded-full blur-2xl"></div>
          
          <div className="text-4xl md:text-5xl font-light text-[#1e293b] mb-6">
            <span className="text-2xl text-stone-400 font-serif mr-2">Desde</span>
            S/ 680 <span className="text-2xl text-stone-400 font-serif mx-2">hasta</span> S/ 2,600
          </div>
          
          <p className="text-stone-500 font-light mb-10 text-lg leading-relaxed">
            Ofrecemos planes anuales que varían según el número de evaluaciones epigenéticas que desees realizarte durante el año. Todos incluyen la toma de muestra, informe detallado de 96 biomarcadores, sesión de interpretación, protocolo personalizado y seguimiento de 90 días.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href={WHATSAPP_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#1e293b] text-white font-semibold text-sm uppercase tracking-wider hover:bg-[#009E9E] transition-colors shadow-lg shadow-[#1e293b]/10"
            >
              Quiero conocer más
            </a>
            <a 
              href={WHATSAPP_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl border border-stone-300 text-stone-600 font-semibold text-sm uppercase tracking-wider hover:bg-white hover:shadow-sm transition-all"
            >
              Hablar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- 11. PREGUNTAS FRECUENTES ---
export const FAQSection: React.FC = () => {
  const faqs = [
    { q: "¿Qué es una evaluación epigenética?", a: "Es un análisis que identifica cómo factores ambientales, nutricionales y de estilo de vida pueden estar influyendo en la expresión de tu biología." },
    { q: "¿Es lo mismo que un test genético?", a: "No. Un test genético lee tu ADN heredado (que no cambia). La evaluación epigenética observa la expresión actual basada en tu entorno, la cual es dinámica y modificable mediante hábitos." },
    { q: "¿Qué muestra se utiliza y es invasiva?", a: "Utilizamos una muestra de la raíz del cabello (bulbo folicular). Es un proceso completamente indoloro y no invasivo." },
    { q: "¿Qué información recibiré?", a: "Recibirás un informe detallado con indicadores de vitaminas, minerales, aminoácidos, factores ambientales, y el estado de diferentes sistemas corporales." },
    { q: "¿El informe es un diagnóstico médico?", a: "No. Es una herramienta de información sobre bienestar y optimización, no diagnostica, trata ni cura enfermedades." },
    { q: "¿Puedo utilizarlo para mejorar mi alimentación?", a: "Sí, la información proporcionada es un excelente punto de partida para que nuestra nutricionista diseñe un protocolo alimenticio personalizado a tus requerimientos actuales." },
    { q: "¿Necesito ser deportista o puedo hacerlo si soy una persona sana?", a: "Es para cualquier persona que desee comprender mejor su biología, mejorar sus hábitos de manera proactiva o tener un enfoque preventivo hacia el bienestar." },
    { q: "¿Cuánto dura el proceso y dónde se realiza?", a: "La toma de muestra dura unos minutos y se realiza presencialmente en nuestra oficina en Barranco, Lima. Los resultados y la sesión de interpretación se agendan posteriormente." },
    { q: "¿Qué sucede después de recibir el informe? ¿Incluye seguimiento?", a: "Recibes una sesión de interpretación de 60 minutos, un protocolo personalizado de 30 días, y realizamos seguimiento durante los siguientes 90 días para acompañar tu proceso." }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-6 lg:px-12 bg-stone-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-serif text-[#1e293b] mb-12 text-center">Preguntas Frecuentes</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border border-stone-200 rounded-2xl overflow-hidden transition-all duration-300">
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-serif text-lg text-stone-800 pr-4">{faq.q}</span>
                <ChevronDown size={20} className={`text-stone-400 transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-stone-600 font-light">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 12. FINAL CTA ---
export const FinalCTASection: React.FC = () => {
  return (
    <section className="py-32 px-6 lg:px-12 bg-[#1e293b] text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 leading-tight">
          Tu bienestar empieza con una<br />mejor comprensión de ti mismo.
        </h2>
        <p className="text-stone-300 text-lg md:text-xl font-light mb-12">
          No se trata de adivinar tu futuro. Se trata de contar con más información para tomar mejores decisiones hoy.
        </p>
        <a 
          href={WHATSAPP_URL} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-[#009E9E] text-white font-semibold text-sm uppercase tracking-wider hover:bg-white hover:text-[#1e293b] transition-colors duration-300 shadow-xl"
        >
          Quiero conocer mi evaluación
        </a>
      </div>
    </section>
  );
};

// --- 13. NUESTROS ESPECIALISTAS ---
export const OurSpecialistsSection: React.FC = () => {
  const specialists = [
    { 
      title: "Coach Epigenético", 
      desc: "Especialista enfocado en guiarte en el diseño de hábitos sostenibles, biohacking y optimización a largo plazo, acompañándote a lo largo de tu proceso de 90 días.",
      image: "https://lh3.googleusercontent.com/d/157AZxW83w_xDpk5ZKiZ-EI1_5RfP9ji0"
    },
    { 
      title: "Nutricionista Funcional", 
      desc: "Profesional encargado de traducir los 96 biomarcadores de tu informe en un protocolo alimenticio real, adaptado a tu metabolismo, carencias y objetivos específicos.",
      image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?q=80&w=800&auto=format&fit=crop"
    },
    { 
      title: "Trofóloga", 
      desc: "Experta en la correcta combinación de alimentos (trofología) para maximizar la absorción de nutrientes, mejorar tu digestión y potenciar el bienestar intestinal.",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-24 px-6 lg:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#009E9E] font-bold block mb-4">
            ACOMPAÑAMIENTO HUMANO
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#1e293b] mb-6">
            Nuestros especialistas
          </h2>
          <p className="text-stone-500 text-lg font-light max-w-2xl mx-auto">
            Un equipo multidisciplinario listo para interpretar tus resultados y guiarte en cada paso.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {specialists.map((spec, idx) => (
            <div key={idx} className="flex flex-col group">
              <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 border border-stone-200">
                <img 
                  src={spec.image} 
                  alt={spec.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[30%]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b]/50 to-transparent"></div>
              </div>
              <h3 className="text-lg font-serif font-bold text-[#1e293b] mb-2">{spec.title}</h3>
              <div className="w-8 h-px bg-[#009E9E] mb-4"></div>
              <p className="text-stone-500 font-light text-sm leading-relaxed">
                {spec.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 14. DESCARGA DE APP / DASHBOARD DIGITAL ---
export const AppDownloadSection: React.FC = () => {
  const qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://gennova-labs-demo.web.app/&color=1e293b&bgcolor=ffffff&margin=0";

  return (
    <section className="py-24 px-6 lg:px-12 bg-stone-50 border-t border-stone-100">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-[10px] font-mono tracking-widest uppercase text-[#009E9E] font-bold block mb-4">
          EXPERIENCIA DIGITAL
        </span>
        <h2 className="text-3xl md:text-4xl font-serif text-[#1e293b] mb-6">
          Lleva tu bienestar en el bolsillo
        </h2>
        <p className="text-stone-500 text-lg font-light mb-16 max-w-2xl mx-auto">
          Complementa tu evaluación con nuestra plataforma web interactiva. Explora tu dashboard personalizado, comprende en detalle cada biomarcador y descubre cómo optimizar tus hábitos desde cualquier dispositivo.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-12 md:gap-20">
          {/* iOS / App Store QR */}
          <a href="https://gennova-labs-demo.web.app/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group cursor-pointer">
            <div className="bg-[#1e293b] text-white flex items-center justify-center px-6 py-3 rounded-full mb-6 w-52 group-hover:bg-[#009E9E] transition-colors shadow-sm">
              <span className="font-semibold text-sm tracking-wider">APP STORE</span>
            </div>
            <div className="p-5 border border-stone-200 rounded-[2rem] bg-white shadow-sm group-hover:shadow-lg transition-all duration-300">
              <img src={qrUrl} alt="QR Code iOS" className="w-36 h-36 opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>
          </a>

          {/* Android / Google Play QR */}
          <a href="https://gennova-labs-demo.web.app/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group cursor-pointer">
            <div className="bg-[#1e293b] text-white flex items-center justify-center px-6 py-3 rounded-full mb-6 w-52 group-hover:bg-[#009E9E] transition-colors shadow-sm">
              <span className="font-semibold text-sm tracking-wider">GOOGLE PLAY</span>
            </div>
            <div className="p-5 border border-stone-200 rounded-[2rem] bg-white shadow-sm group-hover:shadow-lg transition-all duration-300">
              <img src={qrUrl} alt="QR Code Android" className="w-36 h-36 opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
