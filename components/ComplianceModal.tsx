
import React from 'react';
import { X, ShieldCheck, Zap, Globe, Cpu, CheckCircle2, Lock } from 'lucide-react';

export interface ComplianceDetail {
  id: string;
  label: string;
  region: string;
  fullTitle: string;
  engineeringFocus: string;
  narrative: string;
  specs: string[];
  videoId?: string;
}

const DETAILS: Record<string, ComplianceDetail> = {
  'fcc': {
    id: 'fcc',
    label: 'FCC // INTEGRIDAD DE SEÑAL',
    region: 'USA',
    fullTitle: 'Protocolo de Blindaje Electromagnético',
    engineeringFocus: 'Precisión de la Data',
    narrative: 'Para capturar los insights biológicos más profundos, el ruido electrónico debe ser inexistente. Esta certificación garantiza que tu bio-data se mantenga pura y libre de interferencias externas durante el proceso de decodificación.',
    specs: ['Blindaje de RF de Grado Aeroespacial', 'Aislamiento de Señales Parásitas', 'Validación de Pureza de Frecuencia']
  },
  'ce': {
    id: 'ce',
    label: 'CE MARK // SEGURIDAD BIO',
    region: 'EU',
    fullTitle: 'Estándar de Seguridad Biotecnológica',
    engineeringFocus: 'Bio-Compatibilidad',
    narrative: 'El sello CE valida que el hardware S-Drive cumple con los estándares más rigurosos de la Unión Europea para dispositivos de optimización humana. Seguridad total para protocolos de uso diario y profesional.',
    specs: ['Cumplimiento de Directivas 2014/30/EU', 'Materiales Clínicamente Neutros', 'Ingeniería de Seguridad Europea']
  },
  'fda': {
    id: 'fda',
    label: 'FDA REGISTERED // MANUFACTURE',
    region: 'USA',
    fullTitle: 'Registro de Instalaciones de Bio-Hardware',
    engineeringFocus: 'Rigor de Producción',
    narrative: 'La consistencia en la data depende de una manufactura impecable. Nuestras instalaciones de producción están registradas bajo los protocolos de control de calidad más exigentes del mercado biotecnológico global.',
    specs: ['Estándares GMP (Good Manufacturing Practices)', 'Trazabilidad de Componentes Críticos', 'Control de Calidad de Grado Médico']
  },
  'iso': {
    id: 'iso',
    label: 'ISO 9001 // CALIDAD ANALÍTICA',
    region: 'Global',
    fullTitle: 'Gestión de Excelencia Epigenética',
    engineeringFocus: 'Rendimiento Sostenido',
    narrative: 'La bio-optimización requiere procesos repetibles y precisos. ISO 9001 certifica que cada etapa, desde la recolección de la muestra hasta el análisis en Alemania, cumple con un estándar de excelencia inquebrantable.',
    specs: ['Auditorías de Precisión Algorítmica', 'Protocolos de Mitigación de Error', 'Evolución Continua del Sistema']
  },
  'intertek': {
    id: 'intertek',
    label: 'INTERTEK ETL // RESILIENCIA',
    region: 'Global',
    fullTitle: 'Validación de Resistencia de Hardware',
    engineeringFocus: 'Fiabilidad Operativa',
    narrative: 'Sometemos nuestra tecnología a condiciones extremas para asegurar que la digitalización de tu vitalidad sea estable y segura. Fiabilidad total para un monitoreo biológico sin fallos técnicos.',
    specs: ['Certificación ETL de Seguridad Eléctrica', 'Pruebas de Estrés Térmico y Mecánico', 'Rendimiento de Hardware Validado']
  },
  'sdrive': {
    id: 'sdrive',
    label: 'S-DRIVE // 14 VECTORES DE OPTIMIZACIÓN',
    region: 'Alemania',
    fullTitle: 'Decodificación Epigenética de Espectro Completo',
    engineeringFocus: 'Biología de Sistemas',
    narrative: 'Tu cuerpo es un sistema interconectado. El test no busca enfermedades, mapea las 14 áreas críticas donde tu entorno impacta tu expresión genética. Desde la absorción celular hasta la carga tóxica, obtenemos la "bio-telemetría" exacta para priorizar tu recuperación.',
    specs: [
      '1. Perfil de Vitaminas (Celular)',
      '2. Minerales & Oligoelementos',
      '3. Ácidos Grasos Esenciales (Omega 3/6/9)',
      '4. Espectro de Antioxidantes',
      '5. Aminoácidos & Construcción',
      '6. Retos Ambientales (Metales Pesados)',
      '7. Carga de Radiación (EMF/ELF)',
      '8. Microbiota & Salud Intestinal',
      '9. Sistema Inmune & Resistencia',
      '10. Aditivos Alimentarios & Químicos',
      '11. Sensibilidades Alimentarias (90 días)',
      '12. Metabolismo de Azúcar',
      '13. Salud Cardiovascular',
      '14. Hidratación & Oxigenación'
    ],
    videoId: 'olOanaPivMw'
  }
};

interface ComplianceModalProps {
  isOpen: boolean;
  onClose: () => void;
  certId: string | null;
}

const ComplianceModal: React.FC<ComplianceModalProps> = ({ isOpen, onClose, certId }) => {
  if (!isOpen || !certId || !DETAILS[certId]) return null;
  const data = DETAILS[certId];

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-fade-in">
      <div className="bg-gennova-surface border border-white/10 w-full max-w-2xl rounded-[2.5rem] shadow-2xl relative flex flex-col overflow-hidden max-h-[90vh]">
        
        {/* Progress header bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gennova-gold via-gennova-cyan to-gennova-violet opacity-30"></div>

        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-black/20">
            <div>
                <span className="text-gennova-gold font-mono text-[9px] uppercase tracking-[0.3em] mb-1 block">TECNOLOGÍA Y CIENCIA ALEMANA</span>
                <h3 className="text-white font-bold text-lg uppercase tracking-tight">{data.label}</h3>
            </div>
            <button onClick={onClose} className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-white transition-all"><X size={18} /></button>
        </div>

        <div className="p-8 space-y-8 overflow-y-auto custom-scrollbar">
            <div>
                <h4 className="text-white font-serif text-xl mb-4 leading-tight">{data.fullTitle}</h4>
                <p className="text-gray-400 text-sm font-light leading-relaxed">
                    {data.narrative}
                </p>
            </div>

            <div className="bg-black/40 rounded-2xl p-6 border border-white/5">
                <div className="flex items-center gap-2 mb-6">
                    <Cpu size={14} className="text-gennova-cyan" />
                    <span className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">Enfoque: {data.engineeringFocus}</span>
                </div>
                {/* Updated Layout for 14 items */}
                <ul className="grid md:grid-cols-2 gap-x-6 gap-y-3">
                    {data.specs.map((spec, i) => (
                        <li key={i} className="flex items-center gap-3">
                            <CheckCircle2 size={12} className="text-gennova-success shrink-0" />
                            <span className="text-[10px] text-gray-300 font-mono tracking-tight uppercase">{spec}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {data.videoId && (
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black relative w-full aspect-video">
                  <iframe 
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${data.videoId}?autoplay=0&rel=0&modestbranding=1`} 
                      title="Cell Wellbeing S-Drive Video Oficial" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                  ></iframe>
              </div>
            )}

            <div className="flex items-center gap-4 py-4 px-5 bg-white/5 rounded-xl border border-white/5">
                <Lock size={14} className="text-gray-500" />
                <p className="text-[9px] text-gray-500 font-mono uppercase tracking-[0.2em] leading-relaxed">
                    Tus datos están protegidos con estándares de seguridad de nivel internacional. Solo tú decides cómo y cuándo usarlos.
                </p>
            </div>
        </div>

        <div className="p-6 bg-black border-t border-white/5">
            <a 
                href="https://www.cell-wellbeing.es/ciencia-epigenetica/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="w-full bg-white text-black font-bold text-[10px] uppercase tracking-[0.3em] py-4 rounded-xl hover:bg-gennova-gold transition-all flex items-center justify-center cursor-pointer"
            >
                CIENCIA EPIGENÉTICA
            </a>
        </div>
      </div>
    </div>
  );
};

export default ComplianceModal;
