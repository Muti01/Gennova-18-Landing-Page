
import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ArrowRight, Activity, Target, Zap, Microscope, Lock, BarChart3, ChevronLeft, Scan, RefreshCw, ShieldAlert, AlertTriangle, Droplets, Info, ArrowLeft, FileText } from 'lucide-react';

export interface TelemetryArea {
    label: string;
    value: number;
    status: 'Optimizado' | 'Necesidad Baja' | 'Necesidad Media' | 'Necesidad Alta';
    category: 'Sistemas' | 'Nutrientes' | 'Entorno';
}

export interface ReportDetail {
  id: string;
  title: string; 
  subtitle: string; 
  description: string; 
  
  problem: string; 
  science: string; 
  benefit: string; 
  
  targetAudience: string;
  indicators: string[];
  telemetry: TelemetryArea[]; 
  color: string;
  icon: React.ElementType;
}

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: ReportDetail | null;
  onSelect: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, report, onSelect }) => {
  const [view, setView] = useState<'dossier' | 'telemetry'>('dossier');
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
      if (isOpen) {
          setView('dossier');
          setAnimating(false);
      }
  }, [isOpen]);

  if (!isOpen || !report) return null;

  const Icon = report.icon;

  const handleSwitchView = () => {
      setAnimating(true);
      setTimeout(() => {
          setView('telemetry');
          setAnimating(false);
      }, 300);
  };

  const handleBackToDossier = () => {
      setAnimating(true);
      setTimeout(() => {
          setView('dossier');
          setAnimating(false);
      }, 300);
  };

  const getMetricColor = (status: string) => {
    switch (status) {
        case 'Optimizado': return 'bg-gennova-success';
        case 'Necesidad Baja': return 'bg-gennova-gold';
        case 'Necesidad Media': return 'bg-orange-500';
        case 'Necesidad Alta': return 'bg-red-500';
        default: return 'bg-gray-500';
    }
  };

  const getMetricTextColor = (status: string) => {
    switch (status) {
        case 'Optimizado': return 'text-gennova-success';
        case 'Necesidad Baja': return 'text-gennova-gold';
        case 'Necesidad Media': return 'text-orange-400';
        case 'Necesidad Alta': return 'text-red-400';
        default: return 'text-gray-400';
    }
  };

  const groupedTelemetry = {
      sistemas: report.telemetry.filter(t => t.category === 'Sistemas'),
      nutrientes: report.telemetry.filter(t => t.category === 'Nutrientes'),
      entorno: report.telemetry.filter(t => t.category === 'Entorno')
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4 bg-black/95 backdrop-blur-xl animate-fade-in">
      <div className="w-full h-full md:h-auto md:max-h-[95vh] max-w-6xl bg-gennova-surface border-0 md:border md:border-white/10 rounded-none md:rounded-3xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row">
        
        {/* Left Side: Visual Identity */}
        <div className="w-full md:w-[35%] lg:w-[30%] bg-black relative overflow-hidden flex flex-col p-6 md:p-8 justify-between border-b md:border-b-0 md:border-r border-white/5 transition-all duration-500 shrink-0">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,20,20,1),#000000)] z-0"></div>
             <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-10 bg-current ${report.color} transition-all duration-1000 ${view === 'telemetry' ? 'scale-150 opacity-20' : ''}`}></div>
             
             <div className="relative z-10">
                 <div className="flex justify-between items-center mb-6">
                    {view === 'telemetry' ? (
                        <button onClick={handleBackToDossier} className="flex items-center gap-2 text-gray-500 hover:text-white text-[10px] uppercase tracking-widest font-mono transition-colors">
                            <ChevronLeft size={14} /> Volver
                        </button>
                    ) : <div className="w-4"></div>}
                    <button onClick={onClose} className="p-1 text-gray-500 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                 </div>

                 <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <div className={`p-2.5 md:p-3 rounded-xl border border-white/10 bg-white/5 ${report.color}`}>
                        <Icon size={20} className="text-current md:w-6 md:h-6" />
                    </div>
                    <span className={`text-[9px] md:text-[10px] font-mono uppercase tracking-widest font-bold ${report.color}`}>{report.subtitle}</span>
                 </div>
                 
                 <h2 className="text-3xl md:text-5xl font-serif text-white leading-[0.9] tracking-tight mb-6">{report.title}</h2>
                 
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5">
                    {view === 'dossier' ? <Lock size={10} className="text-gray-500" /> : <Activity size={10} className="text-gennova-cyan animate-pulse" />}
                    <span className="text-[9px] md:text-[10px] text-gray-400 font-mono uppercase tracking-wider">
                        {view === 'dossier' ? 'Requiere Kit Epigenético' : 'Visión Integral Celular'}
                    </span>
                 </div>
             </div>

             <div className="relative z-10 mt-8 md:mt-12 space-y-4 md:space-y-6">
                 <div className="animate-fade-in">
                    <h5 className="text-gray-500 text-[9px] md:text-[10px] font-mono uppercase tracking-widest mb-2 flex items-center gap-2">
                        {view === 'dossier' ? <Target size={12} /> : <Scan size={12} />} 
                        {view === 'dossier' ? 'Perfil Objetivo' : 'Data Feed Preview'}
                    </h5>
                    <p className="text-gray-300 text-[11px] md:text-xs font-light leading-relaxed">
                        {view === 'dossier' ? report.targetAudience : 'Visualización simulada de las 14 áreas de optimización basadas en tu metilación del ADN.'}
                    </p>
                 </div>
                 
                 <div className="h-12 md:h-20 flex items-end gap-1 opacity-50">
                    {[40, 70, 50, 90, 60, 80, 45, 75, 55, 95, 30, 85, 65, 98].map((h, i) => (
                        <div key={i} className={`flex-1 rounded-t-sm transition-all duration-700 ${report.color.replace('text-', 'bg-')}`} style={{ height: view === 'telemetry' ? `${Math.random() * 100}%` : `${h}%`, opacity: i % 2 === 0 ? 0.5 : 1 }}></div>
                    ))}
                 </div>
             </div>
        </div>

        {/* Right Side: Content Area (Switchable) */}
        <div className="flex-1 bg-gennova-surface flex flex-col overflow-hidden relative">
             <div className={`flex-1 overflow-y-auto custom-scrollbar transition-opacity duration-300 ${animating ? 'opacity-0' : 'opacity-100'}`}>
                
                {view === 'dossier' ? (
                    <div className="p-6 md:p-12 space-y-8 md:space-y-12">
                        <div>
                            <h3 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-3">01 // El Desafío Celular</h3>
                            <p className="text-lg md:text-xl text-white font-serif leading-relaxed">
                                {report.problem}
                            </p>
                        </div>

                        <div className="bg-white/5 border border-white/5 rounded-2xl p-6 md:p-8">
                            <h3 className="text-[10px] font-mono font-bold text-gennova-gold uppercase tracking-widest mb-6 flex items-center gap-2">
                                <Microscope size={14} /> 02 // Áreas de Enfoque Algorítmico
                            </h3>
                            <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-6 md:mb-8 font-light">
                                {report.science}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                                {report.indicators.map((indicator, idx) => (
                                    <div key={idx} className="flex items-center gap-3 group">
                                        <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${report.color.replace('text-', 'bg-')} group-hover:scale-150 transition-transform`}></div>
                                        <span className="text-gray-400 text-[10px] md:text-xs font-mono uppercase tracking-wider">{indicator}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-3">03 // El Retorno Biológico</h3>
                            <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-5">
                                <div className={`p-3 rounded-xl bg-black border border-white/10 ${report.color} shadow-lg shrink-0`}>
                                    <Zap size={20} className="md:w-6 md:h-6" />
                                </div>
                                <p className="text-gray-300 text-xs md:text-sm leading-relaxed font-light">
                                    {report.benefit}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="p-6 md:p-12 space-y-8 md:space-y-12">
                        {/* Summary Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-6 border-b border-white/5 pb-6 md:pb-8">
                            <div>
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 flex items-center gap-2">
                                    <BarChart3 className={report.color} size={20} /> Indicadores de Optimización
                                </h3>
                                <p className="text-gray-400 text-[10px] font-mono uppercase tracking-widest">
                                    Análisis de Metilación // {report.title}
                                </p>
                            </div>
                            <div className="bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                                <Activity className="text-gennova-success" size={12} />
                                <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Carga Sistémica: 42%</span>
                            </div>
                        </div>

                        {/* Telemetry Grid (14 Areas) OR Custom Graphical Summary */}
                        {report.id === 'slim' || report.id === 'wellness' || report.id === 'sport' ? (
                            <div className="space-y-12">
                                <div className="bg-black/20 rounded-2xl p-6 border border-white/5 mb-8">
                                    <p className="text-gray-400 text-sm font-light leading-relaxed">
                                        Los gráficos muestran la prioridad de cada uno de los indicadores epigenéticos. Los consejos del informe priorizan los marcadores más alejados del nivel optimizado.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                                    {/* Gráfico: Indicadores Nutricionales */}
                                    <div className="bg-[#111111] border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col h-[360px] shadow-2xl relative">
                                        <div className="flex justify-between items-start mb-12">
                                            <div>
                                                <h4 className="text-[11px] font-bold text-white uppercase tracking-widest">Indicadores Nutricionales</h4>
                                                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">- nivel de equilibrio</span>
                                            </div>
                                        </div>
                                        <div className="flex-1 relative flex items-end justify-between gap-2 md:gap-6 px-2 sm:px-6 pb-8">
                                            {/* Threshold */}
                                            <div className="absolute top-[20%] left-0 w-full border-t border-dashed border-gennova-cyan/40 z-0">
                                                <span className="absolute -top-5 right-0 text-[8px] sm:text-[9px] font-mono font-bold text-gennova-cyan">NIVEL OPTIMIZADO</span>
                                            </div>
                                            {report.id === 'slim' ? [
                                                { label: 'Antioxidantes', val: 20, col: 'bg-red-500' },
                                                { label: 'Ácidos Grasos', val: 18, col: 'bg-red-500' },
                                                { label: 'Vitaminas', val: 55, col: 'bg-orange-500' },
                                                { label: 'Minerales', val: 78, col: 'bg-gennova-gold' },
                                                { label: 'Aminoácidos', val: 82, col: 'bg-gennova-gold' }
                                            ].map((bar, i) => (
                                                <div key={i} className="relative z-10 flex flex-col items-center justify-end w-full h-full group">
                                                    <div className={`w-full max-w-[28px] rounded-t-[4px] transition-all duration-1000 group-hover:brightness-125 shadow-[0_0_15px_rgba(0,0,0,0.5)] ${bar.col}`} style={{ height: `${bar.val}%` }}></div>
                                                    <span className="absolute -bottom-8 text-[8px] sm:text-[9px] font-mono text-gray-500 -rotate-45 origin-top-left group-hover:text-white transition-colors truncate w-24">{bar.label}</span>
                                                </div>
                                            )) : report.id === 'wellness' ? [
                                                { label: 'Minerales', val: 25, col: 'bg-red-500' },
                                                { label: 'Aminoácidos', val: 60, col: 'bg-orange-500' },
                                                { label: 'Vitaminas', val: 85, col: 'bg-gennova-gold' },
                                                { label: 'Antioxidantes', val: 82, col: 'bg-gennova-gold' },
                                                { label: 'Ácidos Grasos', val: 88, col: 'bg-gennova-gold' }
                                            ].map((bar, i) => (
                                                <div key={i} className="relative z-10 flex flex-col items-center justify-end w-full h-full group">
                                                    <div className={`w-full max-w-[28px] rounded-t-[4px] transition-all duration-1000 group-hover:brightness-125 shadow-[0_0_15px_rgba(0,0,0,0.5)] ${bar.col}`} style={{ height: `${bar.val}%` }}></div>
                                                    <span className="absolute -bottom-8 text-[8px] sm:text-[9px] font-mono text-gray-500 -rotate-45 origin-top-left group-hover:text-white transition-colors truncate w-24">{bar.label}</span>
                                                </div>
                                            )) : [
                                                { label: 'Ácidos Grasos', val: 15, col: 'bg-red-500' },
                                                { label: 'Minerales', val: 35, col: 'bg-red-500' },
                                                { label: 'Vitaminas', val: 65, col: 'bg-orange-500' },
                                                { label: 'Aminoácidos', val: 75, col: 'bg-gennova-gold' },
                                                { label: 'Antioxidantes', val: 85, col: 'bg-gennova-gold' },
                                            ].map((bar, i) => (
                                                <div key={i} className="relative z-10 flex flex-col items-center justify-end w-full h-full group">
                                                    <div className={`w-full max-w-[28px] rounded-t-[4px] transition-all duration-1000 group-hover:brightness-125 shadow-[0_0_15px_rgba(0,0,0,0.5)] ${bar.col}`} style={{ height: `${bar.val}%` }}></div>
                                                    <span className="absolute -bottom-8 text-[8px] sm:text-[9px] font-mono text-gray-500 -rotate-45 origin-top-left group-hover:text-white transition-colors truncate w-24">{bar.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Gráfico: Indicadores Ambientales */}
                                    <div className="bg-[#111111] border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col h-[360px] shadow-2xl relative">
                                        <div className="flex justify-between items-start mb-12">
                                            <div>
                                                <h4 className="text-[11px] font-bold text-white uppercase tracking-widest">Indicadores Ambientales</h4>
                                                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">+ nivel de carga</span>
                                            </div>
                                        </div>
                                        <div className="flex-1 relative flex items-end justify-between gap-2 md:gap-6 px-6 sm:px-10 pb-8">
                                            {/* Threshold */}
                                            <div className="absolute top-[80%] left-0 w-full border-t border-dashed border-gennova-cyan/40 z-0">
                                                <span className="absolute -top-5 right-0 text-[8px] sm:text-[9px] font-mono font-bold text-gennova-cyan">NIVEL OPTIMIZADO</span>
                                            </div>
                                            {report.id === 'slim' ? [
                                                { label: 'Expos. Tóxica', val: 85, col: 'bg-red-500' },
                                                { label: 'Interferencias', val: 55, col: 'bg-orange-500' },
                                                { label: 'Microbioma', val: 28, col: 'bg-gennova-gold' }
                                            ].map((bar, i) => (
                                                <div key={i} className="relative z-10 flex flex-col items-center justify-end w-full h-full group">
                                                    <div className={`w-full max-w-[28px] rounded-t-[4px] transition-all duration-1000 group-hover:brightness-125 shadow-[0_0_15px_rgba(0,0,0,0.5)] ${bar.col}`} style={{ height: `${bar.val}%` }}></div>
                                                    <span className="absolute -bottom-8 text-[8px] sm:text-[9px] font-mono text-gray-500 -rotate-45 origin-top-left group-hover:text-white transition-colors truncate w-24">{bar.label}</span>
                                                </div>
                                            )) : report.id === 'wellness' ? [
                                                { label: 'Microbioma', val: 65, col: 'bg-orange-500' },
                                                { label: 'Interferencias', val: 28, col: 'bg-gennova-gold' },
                                                { label: 'Expos. Tóxica', val: 15, col: 'bg-gennova-success' }
                                            ].map((bar, i) => (
                                                <div key={i} className="relative z-10 flex flex-col items-center justify-end w-full h-full group">
                                                    <div className={`w-full max-w-[28px] rounded-t-[4px] transition-all duration-1000 group-hover:brightness-125 shadow-[0_0_15px_rgba(0,0,0,0.5)] ${bar.col}`} style={{ height: `${bar.val}%` }}></div>
                                                    <span className="absolute -bottom-8 text-[8px] sm:text-[9px] font-mono text-gray-500 -rotate-45 origin-top-left group-hover:text-white transition-colors truncate w-24">{bar.label}</span>
                                                </div>
                                            )) : [
                                                { label: 'Interferencias', val: 85, col: 'bg-red-500' },
                                                { label: 'Exposición Tóxica', val: 55, col: 'bg-orange-500' },
                                                { label: 'Microbioma', val: 25, col: 'bg-gennova-gold' }
                                            ].map((bar, i) => (
                                                <div key={i} className="relative z-10 flex flex-col items-center justify-end w-full h-full group">
                                                    <div className={`w-full max-w-[28px] rounded-t-[4px] transition-all duration-1000 group-hover:brightness-125 shadow-[0_0_15px_rgba(0,0,0,0.5)] ${bar.col}`} style={{ height: `${bar.val}%` }}></div>
                                                    <span className="absolute -bottom-8 text-[8px] sm:text-[9px] font-mono text-gray-500 -rotate-45 origin-top-left group-hover:text-white transition-colors truncate w-24">{bar.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Prioridades Lists */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 mt-8 border-t border-white/5">
                                    <div className="bg-gradient-to-b from-red-500/10 to-transparent border-t-2 border-red-500 rounded-b-3xl p-6 md:p-8">
                                        <h5 className="text-red-500 font-bold text-sm uppercase tracking-widest mb-8">Necesidad Alta</h5>
                                        {report.id === 'slim' ? (
                                            <div className="space-y-6">
                                                <div>
                                                    <h6 className="text-white font-serif text-lg mb-2">Expos. Tóxica</h6>
                                                    <p className="text-gray-400 text-xs font-light">Metales Pesados</p>
                                                </div>
                                                <div>
                                                    <h6 className="text-white font-serif text-lg mb-2">Ácidos Grasos</h6>
                                                    <p className="text-gray-400 text-xs font-light leading-relaxed">
                                                        Ácido Alfa-Linolénico - 3 (ALA)<br/>
                                                        Ácido Oleico - 9
                                                    </p>
                                                </div>
                                                <div>
                                                    <h6 className="text-white font-serif text-lg mb-2">Antioxidantes</h6>
                                                    <p className="text-gray-400 text-xs font-light leading-relaxed">
                                                        Coenzima Q10<br/>
                                                        Polifenoles<br/>
                                                        Selenio<br/>
                                                        Vitamina E
                                                    </p>
                                                </div>
                                            </div>
                                        ) : report.id === 'wellness' ? (
                                            <div className="space-y-6">
                                                <div>
                                                    <h6 className="text-white font-serif text-lg mb-2">Minerales</h6>
                                                    <p className="text-gray-400 text-xs font-light leading-relaxed">
                                                        Potasio<br/>
                                                        Silício<br/>
                                                        Selenio
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="space-y-6">
                                                <div>
                                                    <h6 className="text-white font-serif text-lg mb-2">Interferencias</h6>
                                                    <p className="text-gray-400 text-xs font-light leading-relaxed">
                                                        Corriente de Tracción 16 2/3 Hz<br/>
                                                        Campo Magnético Constante<br/>
                                                        FEB (Frecuencia Extremadamente Baja)<br/>
                                                        Campo Magnético Intermitente
                                                    </p>
                                                </div>
                                                <div>
                                                    <h6 className="text-white font-serif text-lg mb-2">Ácidos Grasos</h6>
                                                    <p className="text-gray-400 text-xs font-light leading-relaxed">
                                                        Ácido Araquidónico - 6 (AA)<br/>
                                                        Ácido Eicosapentaenoico - 3 (EPA)
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="bg-gradient-to-b from-orange-500/10 to-transparent border-t-2 border-orange-500 rounded-b-3xl p-6 md:p-8">
                                        <h5 className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-8">Necesidad Media</h5>
                                        {report.id === 'slim' ? (
                                            <div className="space-y-6">
                                                <div>
                                                    <h6 className="text-white font-serif text-lg mb-2">Interferencias</h6>
                                                    <p className="text-gray-400 text-xs font-light leading-relaxed">
                                                        50 Hz Corriente de Entrada<br/>
                                                        Teléfono móvil, GSM (1.8 GHz)<br/>
                                                        Campo Magnético Constante<br/>
                                                        Pantalla de Televisión
                                                    </p>
                                                </div>
                                                <div>
                                                    <h6 className="text-white font-serif text-lg mb-2">Vitaminas</h6>
                                                    <p className="text-gray-400 text-xs font-light leading-relaxed">
                                                        Vitamina B12<br/>
                                                        Vitamina B5
                                                    </p>
                                                </div>
                                            </div>
                                        ) : report.id === 'wellness' ? (
                                            <div className="space-y-6">
                                                <div>
                                                    <h6 className="text-white font-serif text-lg mb-2">Microbioma</h6>
                                                    <p className="text-gray-400 text-xs font-light">Parásitos</p>
                                                </div>
                                                <div>
                                                    <h6 className="text-white font-serif text-lg mb-2">Aminoácidos</h6>
                                                    <p className="text-gray-400 text-xs font-light leading-relaxed">
                                                        Alanina<br/>
                                                        Glutamina<br/>
                                                        Prolina<br/>
                                                        Cisteína
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="space-y-6">
                                                <div>
                                                    <h6 className="text-white font-serif text-lg mb-2">Exposición Tóxica</h6>
                                                    <p className="text-gray-400 text-xs font-light leading-relaxed">
                                                        Metales Pesados
                                                    </p>
                                                </div>
                                                <div>
                                                    <h6 className="text-white font-serif text-lg mb-2">Minerales</h6>
                                                    <p className="text-gray-400 text-xs font-light leading-relaxed">
                                                        Sodio<br/>
                                                        Zinc<br/>
                                                        Potasio<br/>
                                                        Cobre
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="bg-gradient-to-b from-gennova-gold/10 to-transparent border-t-2 border-gennova-gold rounded-b-3xl p-6 md:p-8">
                                        <h5 className="text-gennova-gold font-bold text-sm uppercase tracking-widest mb-8">Necesidad Baja</h5>
                                        {report.id === 'slim' ? (
                                            <div className="space-y-6">
                                                <div>
                                                    <h6 className="text-white font-serif text-lg mb-2">Microbioma</h6>
                                                    <p className="text-gray-400 text-xs font-light">Señal Post viral</p>
                                                </div>
                                                <div>
                                                    <h6 className="text-white font-serif text-lg mb-2">Aminoácidos</h6>
                                                    <p className="text-gray-400 text-xs font-light leading-relaxed">
                                                        Cisteína<br/>
                                                        Ácido aspártico
                                                    </p>
                                                </div>
                                                <div>
                                                    <h6 className="text-white font-serif text-lg mb-2">Minerales</h6>
                                                    <p className="text-gray-400 text-xs font-light">Cromo</p>
                                                </div>
                                            </div>
                                        ) : report.id === 'wellness' ? (
                                            <div className="space-y-6">
                                                <div>
                                                    <h6 className="text-white font-serif text-lg mb-2">Interferencias</h6>
                                                    <p className="text-gray-400 text-xs font-light leading-relaxed">
                                                        50 Hz Corriente de Entrada<br/>
                                                        Campo Electrostático<br/>
                                                        Campo Magnético Constante<br/>
                                                        FEB (Extra Baja Frecuencia)
                                                    </p>
                                                </div>
                                                <div>
                                                    <h6 className="text-white font-serif text-lg mb-2">Ácidos Grasos</h6>
                                                    <p className="text-gray-400 text-xs font-light leading-relaxed">
                                                        Ácido Araquidónico - 6 (AA)
                                                    </p>
                                                </div>
                                                <div>
                                                    <h6 className="text-white font-serif text-lg mb-2">Antioxidantes</h6>
                                                    <p className="text-gray-400 text-xs font-light leading-relaxed">
                                                        Ácido Alfa-Lipoico
                                                    </p>
                                                </div>
                                                <div>
                                                    <h6 className="text-white font-serif text-lg mb-2">Vitaminas</h6>
                                                    <p className="text-gray-400 text-xs font-light leading-relaxed">
                                                        Vitamina B9<br/>
                                                        Inositol
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="space-y-6">
                                                <div>
                                                    <h6 className="text-white font-serif text-lg mb-2">Antioxidantes</h6>
                                                    <p className="text-gray-400 text-xs font-light leading-relaxed">
                                                        Carotenoides
                                                    </p>
                                                </div>
                                                <div>
                                                    <h6 className="text-white font-serif text-lg mb-2">Aminoácidos</h6>
                                                    <p className="text-gray-400 text-xs font-light leading-relaxed">
                                                        Valina<br/>
                                                        Triptófano
                                                    </p>
                                                </div>
                                                <div>
                                                    <h6 className="text-white font-serif text-lg mb-2">Vitaminas</h6>
                                                    <p className="text-gray-400 text-xs font-light leading-relaxed">
                                                        Vitamina B5<br/>
                                                        Vitamina B12<br/>
                                                        Betaína
                                                    </p>
                                                </div>
                                                <div>
                                                    <h6 className="text-white font-serif text-lg mb-2">Microbioma</h6>
                                                    <p className="text-gray-400 text-xs font-light leading-relaxed">
                                                        Bacteria
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                                
                                {/* Group 1: Sistemas Vitales */}
                                <div className="space-y-5 md:space-y-6">
                                    <h4 className="text-[9px] font-mono font-bold text-gennova-gold uppercase tracking-[0.2em] border-b border-gennova-gold/10 pb-2">I. Sistemas Vitales</h4>
                                    {groupedTelemetry.sistemas.map((item, i) => (
                                        <div key={i} className="space-y-1.5 md:space-y-2">
                                            <div className="flex justify-between items-end">
                                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{item.label}</span>
                                                <span className={`text-[9px] font-mono font-bold ${getMetricTextColor(item.status)}`}>{item.status}</span>
                                            </div>
                                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                                <div className={`h-full ${getMetricColor(item.status)} transition-all duration-1000`} style={{ width: `${item.value}%` }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Group 2: Bio-Suministro */}
                                <div className="space-y-5 md:space-y-6">
                                    <h4 className="text-[9px] font-mono font-bold text-gennova-cyan uppercase tracking-[0.2em] border-b border-gennova-cyan/10 pb-2">II. Bio-Suministro</h4>
                                    {groupedTelemetry.nutrientes.map((item, i) => (
                                        <div key={i} className="space-y-1.5 md:space-y-2">
                                            <div className="flex justify-between items-end">
                                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{item.label}</span>
                                                <span className={`text-[9px] font-mono font-bold ${getMetricTextColor(item.status)}`}>{item.status}</span>
                                            </div>
                                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                                <div className={`h-full ${getMetricColor(item.status)} transition-all duration-1000`} style={{ width: `${item.value}%` }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Group 3: Entorno & Alertas */}
                                <div className="space-y-5 md:space-y-6">
                                    <h4 className="text-[9px] font-mono font-bold text-red-400 uppercase tracking-[0.2em] border-b border-red-400/10 pb-2">III. Entorno & Carga</h4>
                                    {groupedTelemetry.entorno.map((item, i) => (
                                        <div key={i} className="space-y-1.5 md:space-y-2">
                                            <div className="flex justify-between items-end">
                                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{item.label}</span>
                                                <span className={`text-[9px] font-mono font-bold ${getMetricTextColor(item.status)}`}>{item.status}</span>
                                            </div>
                                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                                <div className={`h-full ${getMetricColor(item.status)} transition-all duration-1000`} style={{ width: `${item.value}%` }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Special Insights Callouts */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pt-4 md:pt-6">
                            <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-5 md:p-6 flex gap-4">
                                <ShieldAlert className="text-red-500 shrink-0" size={18} />
                                <div>
                                    <h4 className="text-white text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1 md:mb-2">Interferencia Crítica</h4>
                                    <p className="text-gray-500 text-[10px] leading-relaxed">
                                        Tu telemetría indica que debes evitar <span className="text-red-400 font-bold">Harinas Refinadas</span> para reducir la carga inflamatoria.
                                    </p>
                                </div>
                            </div>
                            <div className="bg-gennova-gold/5 border border-gennova-gold/10 rounded-2xl p-5 md:p-6 flex gap-4">
                                <AlertTriangle className="text-gennova-gold shrink-0" size={18} />
                                <div>
                                    <h4 className="text-white text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1 md:mb-2">Sensibilidad a Aditivos</h4>
                                    <p className="text-gray-500 text-[10px] leading-relaxed">
                                        Detectamos sensibilidad alta a <span className="text-gennova-gold font-bold">E-621</span>. Esto está bloqueando tu recuperación.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Footer Disclaimer */}
                        <div className="mt-6 md:mt-8 bg-black/40 border border-white/5 p-4 rounded-xl flex gap-3 md:gap-4 items-start">
                            <RefreshCw size={14} className="text-gray-400 mt-1 shrink-0" />
                            <p className="text-gray-500 text-[9px] md:text-[10px] leading-relaxed">
                                Los resultados se muestran de acuerdo a las necesidades a nivel celular. Análisis cualitativo enfocado en estilo de vida.
                            </p>
                        </div>
                    </div>
                )}
             </div>

             <div className="p-6 md:p-8 border-t border-white/5 bg-black/20 flex flex-col sm:flex-row justify-between items-center gap-6">
                {view === 'dossier' ? (
                    <>
                        <div className="flex items-center gap-6 self-start sm:self-center">
                            <div>
                                <span className="text-[9px] text-gray-500 font-mono uppercase tracking-widest block mb-1">Capacidad</span>
                                <span className="text-[10px] md:text-xs text-white font-bold flex items-center gap-1.5">
                                    <CheckCircle2 size={12} className="text-gennova-success" /> 14 Áreas
                                </span>
                            </div>
                            <div className="h-8 w-px bg-white/10"></div>
                            <div>
                                <span className="text-[9px] text-gray-500 font-mono uppercase tracking-widest block mb-1">Precisión</span>
                                <span className="text-[10px] md:text-xs text-white font-bold flex items-center gap-1.5">
                                    <Droplets size={12} className="text-gennova-cyan" /> +800 Marcadores
                                </span>
                            </div>
                        </div>
                        <button 
                            onClick={handleSwitchView}
                            className={`w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 rounded-2xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-lg hover:brightness-110 bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black hover:scale-[1.02] group`}
                        >
                            Ver Biomarcadores <BarChart3 size={16} className="group-hover:text-gennova-gold transition-colors" />
                        </button>
                    </>
                ) : (
                    <>
                        <div className="flex items-center gap-4 self-start sm:self-center">
                            <div className="w-10 h-10 rounded-full bg-gennova-gold/10 flex items-center justify-center border border-gennova-gold/20">
                                <Zap size={18} className="text-gennova-gold" />
                            </div>
                            <div>
                                <span className="text-[10px] md:text-xs text-white font-bold block uppercase tracking-tight">Optimización Lista</span>
                                <p className="text-[9px] text-gray-500 uppercase font-mono tracking-widest">Activa tu protocolo personalizado</p>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                            {(() => {
                                const pdfLinks: Record<string, string> = {
                                    sport: "https://drive.google.com/file/d/1aHNnNN-qwyd1Zs87_Hj7zB3Bf6ECsOP8/view?usp=sharing",
                                    wellness: "https://drive.google.com/file/d/1AzAKrp7fTRSke3lLiciXmqvgYfZgnUYZ/view?usp=sharing",
                                    slim: "https://drive.google.com/file/d/1FR0fmmkjUhJxjKrjmjsmBVTZYmuNk3zL/view?usp=sharing",
                                    age: "https://drive.google.com/file/d/1iHXeJqbN9zQHxPudUyh5IAxCsrnwTEzf/view?usp=sharing",
                                    vegan: "https://drive.google.com/file/d/1UmLtYqqJHhe0_gvsmIhFkhTLLVe5Ns33/view?usp=sharing",
                                    kids: "https://drive.google.com/file/d/1xgtUHu9njraJ8rSkUtg2StOzkITwqO6c/view?usp=sharing"
                                };
                                const link = pdfLinks[report.id] || "https://gennova.pe"; // Fallback
                                return (
                                    <a 
                                        href={link}
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="w-full sm:w-auto px-6 py-4 rounded-2xl font-bold text-[9px] uppercase tracking-widest flex items-center justify-center text-gray-500 hover:text-white transition-colors group relative"
                                    >
                                        <FileText size={14} className="mr-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                                        <span className="border-b border-gray-500/30 group-hover:border-white pb-0.5">Descargar Reporte Ejemplo</span>
                                    </a>
                                );
                            })()}
                            <button 
                                onClick={onSelect}
                                className={`w-full sm:w-auto px-10 md:px-12 py-4 md:py-5 rounded-2xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-[0_0_30px_rgba(229,199,122,0.3)] hover:brightness-110 bg-gennova-gold text-black hover:scale-[1.02] transform`}
                            >
                                Membresías Gennova <ArrowRight size={18} />
                            </button>
                        </div>
                    </>
                )}
             </div>
        </div>

      </div>
    </div>
  );
};

export default ReportModal;
