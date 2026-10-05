import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Loader2, ExternalLink } from 'lucide-react';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      setIsLoading(true); // Reset loading state for next open
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const CAL_URL = "https://cal.com/gennova.labs/gennova-evaluacion-epigenetica?embed=true";
  const DIRECT_URL = "https://cal.com/gennova.labs/gennova-evaluacion-epigenetica";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-8">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#050B14]/80 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl h-[92vh] md:h-[84vh] max-h-[820px] bg-white rounded-3xl shadow-2xl border border-stone-200/80 flex flex-col overflow-hidden z-10"
        >
          {/* Header */}
          <div className="px-5 py-4 sm:px-6 sm:py-4.5 border-b border-stone-100 flex items-center justify-between bg-stone-50/70 backdrop-blur-sm shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#009E9E]/10 border border-[#009E9E]/20 flex items-center justify-center text-[#009E9E] shrink-0">
                <Calendar size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#009E9E] font-bold">
                    GENNOVA LABS • CALENDARIZACIÓN
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-serif font-bold text-[#1e293b] leading-tight">
                  Agendar Evaluación Epigenética
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={DIRECT_URL}
                target="_blank"
                rel="noopener noreferrer"
                title="Abrir en pestaña nueva"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-stone-500 hover:text-[#009E9E] hover:bg-stone-100 transition-colors"
              >
                <span>Pestaña nueva</span>
                <ExternalLink size={13} />
              </a>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-[#1e293b] flex items-center justify-center transition-colors"
                aria-label="Cerrar modal"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Body / Cal.com Embed */}
          <div className="relative flex-1 w-full bg-white overflow-hidden">
            {/* Loader indicator while Cal.com loads */}
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10 gap-3">
                <Loader2 className="w-8 h-8 text-[#009E9E] animate-spin" />
                <p className="text-sm font-light text-stone-500 font-mono tracking-wide">
                  Cargando agenda de Gennova Labs...
                </p>
              </div>
            )}

            {/* Cal.com Iframe */}
            <iframe
              src={CAL_URL}
              title="Agendamiento Gennova Labs"
              className="w-full h-full border-0"
              onLoad={() => setIsLoading(false)}
              allow="camera; microphone; fullscreen; clipboard-read; clipboard-write"
            />
          </div>

          {/* Footer note */}
          <div className="px-5 py-2.5 sm:px-6 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400 font-light shrink-0">
            <span>Toma de muestra indolora presencial en Barranco, Lima.</span>
            <span className="hidden sm:inline font-mono">Sincronizado con Cal.com</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ScheduleModal;
