const fs = require('fs');
const file = 'components/LandingRebrandComponents.tsx';
let content = fs.readFileSync(file, 'utf8');

const target = `<section className="bg-[#050B14] border-t border-white/5 py-12 px-6 lg:px-12">
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
    </section>`;

const replacement = `<section className="bg-white py-12 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24 transition-all duration-700">
          <img src="/logo-epixlife.png" alt="Logo de Epixlife" className="h-16 md:h-24 object-contain" />
          <img src="/certificaciones.png" alt="Certificaciones de la Biotecnología" className="h-20 md:h-32 object-contain" />
        </div>
      </div>
    </section>`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync(file, content);
  console.log("Success");
} else {
  console.log("Target not found. Finding close match...");
}
