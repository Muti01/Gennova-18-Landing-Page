const fs = require('fs');
const file = 'components/LandingRebrandComponents.tsx';
let content = fs.readFileSync(file, 'utf8');

const startMarker = '{/* Epixlife Logo (Stylized) */}';
const targetRegex = /<section className="bg-\[#050B14\] border-t border-white\/5 py-12 px-6 lg:px-12">[\s\S]*?<\/section>/;

const replacement = `<section className="bg-white py-12 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24 transition-all duration-700">
          <img src="/logo-epixlife.png" alt="Logo de Epixlife" loading="lazy" className="h-16 md:h-24 object-contain" />
          <img src="/certificaciones.png" alt="Certificaciones de la Biotecnología" loading="lazy" className="h-16 md:h-28 object-contain" />
        </div>
      </div>
    </section>`;

if (targetRegex.test(content)) {
  content = content.replace(targetRegex, replacement);
  fs.writeFileSync(file, content);
  console.log("Success");
} else {
  console.log("Target not found.");
}
