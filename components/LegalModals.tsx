import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldAlert, FileText, Lock } from 'lucide-react';

export type ModalType = 'privacy' | 'terms' | 'disclaimer' | null;

interface LegalModalsProps {
  activeModal: ModalType;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalsProps> = ({ activeModal, onClose }) => {
  if (!activeModal) return null;

  const content = {
    privacy: {
      icon: <Lock className="text-[#009E9E] w-6 h-6" />,
      title: "Política de Privacidad",
      body: (
        <div className="space-y-4 text-sm text-stone-600 font-light leading-relaxed">
          <p>
            En <strong>GENNOVA LABS PERÚ</strong>, respetamos su privacidad y nos comprometemos a proteger su información personal en cumplimiento con la <strong>Ley N° 29733, Ley de Protección de Datos Personales</strong> de la República del Perú, y su respectivo reglamento.
          </p>
          <h3 className="text-[#1e293b] font-bold mt-6 mb-2 text-base">1. Recopilación y Uso de Datos</h3>
          <p>
            Los datos personales y la información biológica (obtenida a través de la muestra capilar) son recopilados con el único fin de generar su evaluación epigenética y desarrollar su protocolo epi-nutrimental personalizado. Esta información es estrictamente confidencial.
          </p>
          <h3 className="text-[#1e293b] font-bold mt-6 mb-2 text-base">2. Almacenamiento y Protección</h3>
          <p>
            Utilizamos medidas de seguridad de nivel técnico, organizativo y legal para evitar la pérdida, mal uso, alteración, acceso no autorizado y robo de los datos personales facilitados. Los resultados son procesados de forma anonimizada a través de las plataformas de nuestros socios tecnológicos europeos.
          </p>
          <h3 className="text-[#1e293b] font-bold mt-6 mb-2 text-base">3. Derechos ARCO</h3>
          <p>
            Usted tiene el derecho de Acceso, Rectificación, Cancelación y Oposición (Derechos ARCO) sobre sus datos personales. Para ejercerlos, puede ponerse en contacto directo con nosotros a través de nuestros canales oficiales de atención al cliente.
          </p>
        </div>
      )
    },
    terms: {
      icon: <FileText className="text-[#009E9E] w-6 h-6" />,
      title: "Términos y Condiciones",
      body: (
        <div className="space-y-4 text-sm text-stone-600 font-light leading-relaxed">
          <p>
            Al utilizar los servicios de <strong>GENNOVA LABS PERÚ</strong>, usted acepta los siguientes Términos y Condiciones, los cuales regulan la provisión de nuestras evaluaciones y programas de bienestar.
          </p>
          <h3 className="text-[#1e293b] font-bold mt-6 mb-2 text-base">1. Naturaleza del Servicio</h3>
          <p>
            Gennova Labs actúa como un proveedor de servicios de optimización de bienestar. Utilizamos la recolección de muestras de cabello y el análisis tecnológico de terceros para proporcionar reportes orientativos de biomarcadores nutricionales y de estilo de vida.
          </p>
          <h3 className="text-[#1e293b] font-bold mt-6 mb-2 text-base">2. Proceso y Tiempos</h3>
          <p>
            El tiempo estimado desde la toma de muestra presencial hasta la entrega del informe y la programación de la sesión de interpretación se notificará al usuario al momento de la compra. Este tiempo puede variar según la disponibilidad.
          </p>
          <h3 className="text-[#1e293b] font-bold mt-6 mb-2 text-base">3. Limitación de Responsabilidad</h3>
          <p>
            Gennova Labs no se hace responsable por las decisiones alimenticias, suplementarias o de estilo de vida que el cliente decida tomar (o dejar de tomar) a partir de la interpretación de la evaluación. El usuario asume total responsabilidad sobre su bienestar.
          </p>
          <h3 className="text-[#1e293b] font-bold mt-6 mb-2 text-base">4. Pagos y Reembolsos</h3>
          <p>
            Todos los pagos son procesados de forma segura. Dada la naturaleza personalizada del análisis de muestras biológicas, una vez procesada la muestra en la plataforma, no se emiten reembolsos.
          </p>
        </div>
      )
    },
    disclaimer: {
      icon: <ShieldAlert className="text-[#009E9E] w-6 h-6" />,
      title: "Disclaimer Médico y Legal",
      body: (
        <div className="space-y-4 text-sm text-stone-600 font-light leading-relaxed">
          <p className="font-semibold text-[#1e293b] p-4 bg-stone-100 rounded-lg border border-stone-200">
            IMPORTANTE: La información proporcionada por GENNOVA LABS PERÚ no es, ni pretende ser, un diagnóstico médico, tratamiento, prescripción o cura para ninguna enfermedad o condición de salud.
          </p>
          
          <h3 className="text-[#1e293b] font-bold mt-6 mb-2 text-base">1. Herramienta de Bienestar Preventivo</h3>
          <p>
            Los reportes epigenéticos, las sesiones de interpretación con nuestros especialistas (Coach Epigenético, Nutricionista Funcional, Trofóloga) y los protocolos epi-nutrimentales son exclusivamente herramientas informativas, de prevención y optimización del bienestar integral. 
          </p>

          <h3 className="text-[#1e293b] font-bold mt-6 mb-2 text-base">2. Marco Normativo (Perú y EE.UU.)</h3>
          <p>
            En estricto cumplimiento con la <strong>Ley General de Salud N° 26842 del Perú</strong>, nuestros servicios no sustituyen una evaluación, diagnóstico o tratamiento realizado por un médico colegiado. 
          </p>
          <p>
            Asimismo, de acuerdo con los lineamientos de los Estados Unidos, estas declaraciones y reportes <strong>no han sido evaluados por la Administración de Alimentos y Medicamentos (FDA)</strong> como herramientas clínicas o de diagnóstico.
          </p>

          <h3 className="text-[#1e293b] font-bold mt-6 mb-2 text-base">3. Tecnología y Hardware (S-Drive)</h3>
          <p>
            La evaluación epigenética se sustenta en la recopilación de frecuencias de la raíz del cabello. <strong>El hardware tecnológico de recolección utilizado (Cell Wellbeing S-Drive) cuenta con certificaciones y autorizaciones como dispositivo general de bienestar ante la FDA y organismos europeos correspondientes.</strong> Sin embargo, se clasifica como una herramienta de screening nutricional y ambiental, no como un dispositivo médico (Medical Device) para el tratamiento de enfermedades.
          </p>

          <h3 className="text-[#1e293b] font-bold mt-6 mb-2 text-base">4. Continuidad de Tratamientos</h3>
          <p>
            Bajo ninguna circunstancia el cliente debe suspender, alterar o iniciar tratamientos médicos, fármacos o terapias clínicas basándose en el reporte epigenético o en el protocolo epi-nutrimental de Gennova Labs. Si usted padece una condición médica preexistente, está embarazada, en periodo de lactancia o bajo tratamiento, <strong>debe consultar obligatoriamente con su médico tratante</strong> antes de realizar cambios en su nutrición o estilo de vida.
          </p>
        </div>
      )
    }
  };

  const currentContent = content[activeModal];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#1e293b]/60 backdrop-blur-sm"
        />
        
        {/* Modal Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 md:p-8 border-b border-stone-100 bg-stone-50/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white border border-stone-200 flex items-center justify-center shadow-sm">
                {currentContent.icon}
              </div>
              <h2 className="text-2xl font-serif text-[#1e293b] font-bold">
                {currentContent.title}
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-stone-200 text-stone-500 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Body */}
          <div className="p-6 md:p-8 overflow-y-auto">
            {currentContent.body}
          </div>
          
          {/* Footer Action */}
          <div className="p-6 border-t border-stone-100 bg-stone-50 text-right">
            <button 
              onClick={onClose}
              className="px-8 py-3 rounded-full bg-[#1e293b] text-white font-semibold text-sm tracking-wider hover:bg-[#009E9E] transition-colors shadow-sm"
            >
              Entendido
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
