
import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Activity, Brain, Zap, Moon, ShieldCheck, Flame, ChevronRight, CheckCircle2, Scan, Database, Cpu, Sparkles, BarChart3, Info, AlertTriangle, Battery, BatteryCharging, BatteryWarning } from 'lucide-react';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlanRecommend: (recommendedAction: string) => void;
}

// Estructura de Preguntas con Contexto Estratégico ("Why we ask")
const QUESTIONS = [
  {
    id: 1,
    category: "Metabolismo & Energía",
    systemIcon: Zap,
    context: "Tus mitocondrias son las baterías de tus células.",
    question: "¿Cómo describirías tu nivel de energía un martes a las 3:00 PM?",
    options: [
      { id: 'a', label: "Estable. No necesito estimulantes.", score: { energy: 10, stress: 0 } },
      { id: 'b', label: "Variable. Necesito café o azúcar para seguir.", score: { energy: 5, stress: 5 }, micro: "Dato: La variabilidad suele indicar oportunidad de mejora metabólica." },
      { id: 'c', label: "Bajo. Me cuesta mantener el ritmo.", score: { energy: 0, stress: 10 }, micro: "Prioridad: Posible ineficiencia mitocondrial a optimizar." }
    ]
  },
  {
    id: 2,
    category: "Eje Intestino-Cerebro",
    systemIcon: Flame,
    context: "El 90% de tu serotonina se produce en tu intestino.",
    question: "¿Cómo sientes tu digestión después de las comidas?",
    options: [
      { id: 'a', label: "Ligera. Mi digestión es eficiente.", score: { gut: 10, inflammation: 0 } },
      { id: 'b', label: "A veces pesada con ciertos alimentos.", score: { gut: 5, inflammation: 5 }, micro: "Insight: Podrías tener sensibilidades alimentarias no detectadas." },
      { id: 'c', label: "Frecuentemente lenta o incómoda.", score: { gut: 0, inflammation: 10 }, micro: "Atención: La absorción de nutrientes podría estar bloqueada." }
    ]
  },
  {
    id: 3,
    category: "Sistema Nervioso",
    systemIcon: Brain,
    context: "La gestión del estrés define tu longevidad celular.",
    question: "Ante una situación de presión imprevista, tú...",
    options: [
      { id: 'a', label: "Mantengo el enfoque y resuelvo.", score: { stress: 0, focus: 10 } },
      { id: 'b', label: "Siento tensión física o inquietud.", score: { stress: 8, focus: 2 }, micro: "Señal: Tu sistema simpático podría estar hiper-reactivo." },
      { id: 'c', label: "Me bloqueo mentalmente (Niebla mental).", score: { stress: 5, focus: 0 }, micro: "Conexión: La claridad mental depende de la calma celular." }
    ]
  },
  {
    id: 4,
    category: "Regeneración Nocturna",
    systemIcon: Moon,
    context: "El sueño profundo es el único momento donde tu ADN se repara.",
    question: "¿Cómo te sientes al sonar la alarma?",
    options: [
      { id: 'a', label: "Renovado y listo para el día.", score: { sleep: 10 } },
      { id: 'b', label: "Necesito unos minutos para 'arrancar'.", score: { sleep: 4 }, micro: "Dato: La inercia matutina indica falta de sueño profundo." },
      { id: 'c', label: "Como si no hubiera descansado suficiente.", score: { sleep: 2 }, micro: "Prioridad: Tu sistema de reparación nocturna necesita soporte." }
    ]
  },
  {
    id: 5,
    category: "Capacidad de Adaptación",
    systemIcon: Activity,
    context: "La recuperación es más importante que el entrenamiento.",
    question: "¿Cuánto tardas en recuperarte de un esfuerzo físico intenso?",
    options: [
      { id: 'a', label: "Rápido. Al día siguiente estoy bien.", score: { recovery: 10 } },
      { id: 'b', label: "Lento. Siento el esfuerzo por 2 días.", score: { recovery: 3 }, micro: "Insight: Oportunidad para mejorar la limpieza de toxinas." },
      { id: 'c', label: "Me agoto o me lesiono si entreno fuerte.", score: { recovery: 0 }, micro: "Atención: Baja reserva de adaptación biológica." }
    ]
  },
  {
    id: 6,
    category: "Objetivo Principal",
    systemIcon: ShieldCheck,
    context: "La especificidad es la clave de la bio-optimización.",
    question: "Si pudieras transformar UNA sola cosa hoy:",
    options: [
      { id: 'op_wellness', label: "Recuperar mi equilibrio y energía vital.", focus: "Bienestar Integral", targetReport: 'wellness' },
      { id: 'op_sport', label: "Maximizar mi potencia física y recuperación.", focus: "Rendimiento Deportivo", targetReport: 'sport' },
      { id: 'op_slim', label: "Optimizar mi composición corporal.", focus: "Metabolismo", targetReport: 'slim' },
      { id: 'op_age', label: "Ralentizar mi envejecimiento celular.", focus: "Longevidad", targetReport: 'age' }
    ]
  }
];

const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, onPlanRecommend }) => {
  const [step, setStep] = useState<'intro' | 'question' | 'analyzing' | 'result'>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  // Reset al abrir
  useEffect(() => {
    if (isOpen) {
        setStep('intro');
        setCurrentQ(0);
        setAnswers({});
        setSelectedOption(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStart = () => setStep('question');

  const handleOptionSelect = (option: any) => {
    setSelectedOption(option.id);
    setAnswers({ ...answers, [currentQ]: option });
  };

  const handleNext = () => {
    if (currentQ < QUESTIONS.length - 1) {
      setSelectedOption(null);
      setCurrentQ(prev => prev + 1);
    } else {
      setStep('analyzing');
      setTimeout(() => setStep('result'), 3000);
    }
  };

  // --- LÓGICA AVANZADA DE RESULTADOS ---
  const getResultData = () => {
    // 1. Recopilar métricas
    const answersArray = Object.values(answers);
    const goalAnswer = answers[5]; // Pregunta 6 (Objetivo)
    const targetReport = goalAnswer?.targetReport || 'wellness'; // Default fallback
    
    // Contadores de severidad
    let criticalCount = 0; // Opción C
    let warningCount = 0;  // Opción B
    let optimalCount = 0;  // Opción A
    
    // Identificar sistemas para optimizar
    const systemNames = [
        "Metabolismo Energético",
        "Salud Intestinal",
        "Sistema Nervioso",
        "Ritmo Circadiano",
        "Capacidad de Recuperación"
    ];
    let weakSystems: string[] = [];

    // Analizar las primeras 5 preguntas
    for (let i = 0; i < 5; i++) {
        const ans = answers[i];
        if (!ans) continue;
        
        if (ans.id === 'c') {
            criticalCount++;
            weakSystems.push(systemNames[i]);
        } else if (ans.id === 'b') {
            warningCount++;
            weakSystems.push(systemNames[i]);
        } else {
            optimalCount++;
        }
    }

    // 2. Determinar Foco Principal (Visualización)
    let primaryFocus = goalAnswer?.focus || "Vitalidad Integral";
    
    // 3. Determinar el Nivel de Evaluación (Arquetipo)
    let status: 'optimal' | 'warning' | 'critical' = 'optimal';
    let title = "";
    let scoreText = "";
    let insight = "";
    let plan = "start";
    let icon = Battery; // Icono por defecto
    let colorClass = "text-green-500";

    // LÓGICA DE CLASIFICACIÓN
    if (criticalCount >= 2 || (criticalCount + warningCount >= 4)) {
        status = 'critical';
        title = "Oportunidad de Transformación Alta";
        scoreText = "Potencial de Mejora Elevado";
        plan = "elite"; 
        icon = BatteryWarning;
        colorClass = "text-red-500";
        insight = `Tu elección de ${primaryFocus} es correcta, pero tus respuestas indican bloqueos en ${weakSystems.slice(0, 2).join(" y ")}. Tu cuerpo está en "modo resistencia". Necesitamos una estrategia de renovación profunda para desbloquear tu objetivo.`;
    } else if (warningCount >= 2 || criticalCount === 1) {
        status = 'warning';
        title = "Potencial Latente";
        scoreText = "Eficiencia por Optimizar";
        plan = "plus"; 
        icon = BatteryCharging;
        colorClass = "text-orange-500";
        insight = `Tienes una base sólida para alcanzar ${primaryFocus}, pero detectamos "fricción" en ${weakSystems[0]}. No estás al 100%, pero estás cerca. Pequeños ajustes epigenéticos liberarán esa energía extra que buscas.`;
    } else {
        status = 'optimal';
        title = "Bio-Arquitectura Sólida";
        scoreText = "Listo para Alto Rendimiento";
        plan = "start"; 
        icon = Battery;
        colorClass = "text-gennova-success";
        insight = `Tu sistema base es robusto. Estás en la posición ideal para perseguir ${primaryFocus} no desde la reparación, sino desde la potenciación pura. Tu estrategia será de optimización de alto nivel.`;
    }

    return { primaryFocus, insight, plan, status, title, scoreText, icon, colorClass, targetReport };
  };

  const result = step === 'result' ? getResultData() : null;

  // --- RENDERERS ---

  const renderIntro = () => (
    <div className="flex flex-col md:flex-row h-full">
        {/* Left Side: Visual Hook */}
        <div className="w-full md:w-5/12 bg-[#0B0F16] relative overflow-hidden p-8 md:p-10 flex flex-col justify-between text-white min-h-[250px] md:min-h-full">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,232,248,0.1),transparent_50%)]"></div>
            <div className="relative z-10">
                <span className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest border border-white/10 text-gennova-cyan">
                    Gennova Bio-Scan
                </span>
                <h2 className="mt-4 md:mt-6 text-3xl md:text-5xl font-serif leading-tight">
                    Descifra las señales de <span className="text-gennova-gold italic">tu cuerpo.</span>
                </h2>
            </div>
            <div className="relative z-10 space-y-4 md:space-y-6 hidden sm:block">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                        <Activity size={18} className="text-gennova-gold" />
                    </div>
                    <div>
                        <p className="text-sm font-bold">Lectura de Señales</p>
                        <p className="text-xs text-gray-400">Interpretación de niveles de energía.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                        <Database size={18} className="text-gennova-cyan" />
                    </div>
                    <div>
                        <p className="text-sm font-bold">Perfil de Optimización</p>
                        <p className="text-xs text-gray-400">Mapa de prioridades biológicas.</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Right Side: Welcome & Action */}
        <div className="w-full md:w-7/12 bg-white p-8 md:p-16 flex flex-col justify-center items-start text-left relative overflow-y-auto">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">¿Estás operando al 100%?</h3>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 max-w-md">
                La mayoría de nosotros nos acostumbramos a vivir con energía media, pensando que es "normal". <br className="hidden md:block"/><br className="hidden md:block"/>
                <span className="font-semibold text-gray-900">Tu cuerpo puede dar más. Escúchalo.</span>
            </p>
            <p className="text-xs md:text-sm text-gray-500 mb-8 md:mb-10 flex items-center gap-2">
                <Info size={16} /> 6 preguntas clave. 2 minutos. Resultados inmediatos.
            </p>
            <button 
                onClick={handleStart}
                className="group flex items-center gap-4 bg-black text-white px-8 py-4 rounded-xl font-bold text-xs md:text-sm uppercase tracking-widest hover:bg-gennova-gold hover:text-black transition-all shadow-xl w-full md:w-auto justify-center"
            >
                INICIAR EVALUACIÓN <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    </div>
  );

  const renderQuestion = () => {
    const q = QUESTIONS[currentQ];
    const ProgressIcon = q.systemIcon;

    return (
        <div className="flex flex-col md:flex-row h-full overflow-hidden">
            {/* Sidebar / Header: Context & Progress */}
            <div className="w-full md:w-4/12 bg-[#0B0F16] text-white p-6 md:p-10 flex flex-col justify-between relative overflow-hidden shrink-0">
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4 md:mb-8">
                        <span className="text-[9px] md:text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                            Pregunta {currentQ + 1} / {QUESTIONS.length}
                        </span>
                        <div className="w-16 md:w-24 h-1 bg-gray-800 rounded-full">
                            <div className="h-full bg-gennova-gold transition-all duration-300" style={{ width: `${((currentQ + 1) / QUESTIONS.length) * 100}%` }}></div>
                        </div>
                    </div>
                    
                    <div className="flex md:block items-center gap-4 mb-4 md:mb-6">
                        <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 text-gennova-cyan shrink-0">
                            <ProgressIcon size={24} className="md:w-7 md:h-7" />
                        </div>
                        <div>
                            <h4 className="text-base md:text-lg font-serif text-white mb-0 md:mb-1">{q.category}</h4>
                            <p className="text-[9px] md:text-xs text-gennova-gold font-mono uppercase tracking-wider">Escaneando Sistema...</p>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 bg-white/5 p-4 md:p-5 rounded-xl border border-white/5 backdrop-blur-sm hidden sm:block">
                    <div className="flex items-start gap-3">
                        <Info size={16} className="text-gray-400 mt-0.5 shrink-0" />
                        <div>
                            <p className="text-[9px] md:text-[10px] font-bold text-gray-300 uppercase tracking-wide mb-1">¿POR QUÉ PREGUNTAMOS ESTO?</p>
                            <p className="text-xs text-gray-400 leading-relaxed font-light">{q.context}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Area: Interaction */}
            <div className="w-full md:w-8/12 bg-gray-50 p-6 md:p-14 flex flex-col relative overflow-y-auto custom-scrollbar">
                <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col justify-center">
                    <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-10 leading-tight">
                        {q.question}
                    </h3>

                    <div className="space-y-3 md:space-y-4">
                        {q.options.map((opt) => (
                            <div key={opt.id} className="group">
                                <button
                                    onClick={() => handleOptionSelect(opt)}
                                    className={`w-full text-left p-4 md:p-6 rounded-xl md:rounded-2xl border-2 transition-all duration-200 relative overflow-hidden shadow-sm hover:shadow-md ${selectedOption === opt.id ? 'bg-white border-black ring-1 ring-black' : 'bg-white border-gray-200 hover:border-gray-300'}`}
                                >
                                    <div className="flex items-center justify-between relative z-10">
                                        <span className={`text-sm md:text-lg pr-4 ${selectedOption === opt.id ? 'font-bold text-black' : 'text-gray-700'}`}>
                                            {opt.label}
                                        </span>
                                        <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${selectedOption === opt.id ? 'border-black bg-black text-white' : 'border-gray-300 text-transparent'}`}>
                                            <CheckCircle2 size={12} fill="currentColor" className="md:w-3.5 md:h-3.5" />
                                        </div>
                                    </div>
                                </button>
                                
                                {selectedOption === opt.id && opt.micro && (
                                    <div className="mt-3 ml-2 md:ml-4 flex items-start gap-3 animate-fade-in-up">
                                        <div className="w-0.5 h-auto min-h-[30px] bg-gennova-gold/50 rounded-full"></div>
                                        <div>
                                            <span className="text-[9px] md:text-[10px] font-bold text-gennova-gold uppercase tracking-widest">Gennova Insight</span>
                                            <p className="text-xs md:text-sm text-gray-600 italic leading-snug">
                                                "{opt.micro}"
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Nav */}
                <div className="mt-8 md:mt-10 pt-4 md:pt-6 border-t border-gray-200 flex justify-end max-w-2xl mx-auto w-full pb-4">
                    <button 
                        onClick={handleNext} 
                        disabled={!selectedOption}
                        className="w-full md:w-auto px-8 py-3.5 md:py-3 bg-black text-white font-bold rounded-xl text-[10px] md:text-xs uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                    >
                        {currentQ === QUESTIONS.length - 1 ? 'ANALIZAR RESPUESTAS' : 'SIGUIENTE'} <ChevronRight size={14}/>
                    </button>
                </div>
            </div>
        </div>
    );
  };

  const renderAnalyzing = () => (
    <div className="flex flex-col items-center justify-center h-full bg-white text-center p-8">
        <div className="relative w-20 h-20 md:w-24 md:h-24 mb-6 md:mb-8">
            <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
            <Brain className="absolute inset-0 m-auto text-black w-8 h-8 md:w-10 md:h-10" />
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Triangulando Biomarcadores</h3>
        <p className="text-gray-500 font-mono text-[10px] md:text-xs uppercase tracking-widest">Generando Estrategia de Optimización...</p>
    </div>
  );

  const renderResult = () => {
    if (!result) return null;
    const StatusIcon = result.icon;

    return (
        <div className="flex flex-col md:flex-row h-full overflow-y-auto custom-scrollbar">
            {/* Left Panel: The Evaluation */}
            <div className="w-full md:w-5/12 bg-gray-50 p-8 md:p-14 border-r border-gray-200 flex flex-col justify-center relative overflow-hidden shrink-0">
                {result.status === 'critical' && <div className="absolute inset-0 bg-red-500/5 pointer-events-none"></div>}
                
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4 md:mb-6">
                        <StatusIcon size={20} className={`${result.colorClass} md:w-6 md:h-6`} />
                        <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-widest ${result.colorClass}`}>
                            {result.title}
                        </span>
                    </div>
                    
                    <h2 className="text-2xl md:text-4xl font-serif text-gray-900 mb-6 leading-tight">
                        Foco Prioritario: <br className="hidden md:block"/>
                        <span className={`${result.status === 'critical' ? 'text-red-600' : 'text-gennova-gold'} font-medium`}>
                            {result.primaryFocus}
                        </span>
                    </h2>
                    
                    <div className={`p-5 md:p-6 rounded-xl md:rounded-2xl border shadow-sm mb-6 md:mb-8 ${result.status === 'critical' ? 'bg-red-50 border-red-100' : result.status === 'warning' ? 'bg-orange-50 border-orange-100' : 'bg-white border-gray-200'}`}>
                        <div className="flex items-center gap-2 mb-3 text-gray-500">
                            <Scan size={16} />
                            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest">Análisis de Patrones</span>
                        </div>
                        <p className="text-gray-700 text-xs md:text-sm leading-relaxed font-medium">
                            {result.insight}
                        </p>
                    </div>

                    <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-[10px] md:text-xs text-gray-500 font-medium">
                        <span className="flex items-center gap-1"><CheckCircle2 size={12} className={result.colorClass}/> Nutrición</span>
                        <span className="flex items-center gap-1"><CheckCircle2 size={12} className={result.colorClass}/> Suplementación</span>
                        <span className="flex items-center gap-1"><CheckCircle2 size={12} className={result.colorClass}/> Hábitos</span>
                    </div>
                </div>
            </div>

            {/* Right Panel: The Solution */}
            <div className="w-full md:w-7/12 bg-[#0B0F16] text-white p-8 md:p-14 flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gennova-gold/10 blur-[80px] rounded-full pointer-events-none"></div>

                <div className="relative z-10 max-w-md w-full mx-auto md:mx-0">
                    <h3 className="text-xl md:text-2xl font-bold mb-6">Tu Plan de Acción Gennova</h3>
                    
                    <ul className="space-y-4 md:space-y-6 mb-8 md:mb-10">
                        <li className="flex gap-4">
                            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/10 flex items-center justify-center text-gennova-cyan border border-white/10 shrink-0 text-xs md:text-sm">1</div>
                            <div>
                                <h4 className="font-bold text-xs md:text-sm uppercase tracking-wide">Validación Epigenética</h4>
                                <p className="text-[11px] md:text-xs text-gray-400 mt-1 leading-relaxed">Usaremos el Kit S-Drive para confirmar los marcadores moleculares de tu {result.primaryFocus.toLowerCase()}.</p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center border shrink-0 text-xs md:text-sm ${result.status === 'critical' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-white/10 text-gennova-gold border-white/10'}`}>2</div>
                            <div>
                                <h4 className="font-bold text-xs md:text-sm uppercase tracking-wide">Protocolo {result.plan.toUpperCase()}</h4>
                                <p className="text-[11px] md:text-xs text-gray-400 mt-1 leading-relaxed">
                                    {result.status === 'critical' 
                                        ? "Intervención de transformación. Estrategias intensivas para reducir la carga alostática en 90 días."
                                        : result.status === 'warning'
                                            ? "Corrección funcional. Ajustes precisos para eliminar la fricción metabólica."
                                            : "Bio-potenciación. Estrategias avanzadas para longevidad y rendimiento pico."
                                    }
                                </p>
                            </div>
                        </li>
                    </ul>

                    <button 
                        onClick={() => { 
                            onClose(); 
                            const action = `OPEN_REPORT_${result.targetReport.toUpperCase()}`;
                            onPlanRecommend(action); 
                        }}
                        className="w-full py-4 md:py-5 bg-white text-black font-bold rounded-xl text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] hover:bg-gennova-gold transition-all shadow-2xl flex items-center justify-center gap-3 group mb-4"
                    >
                        VER MI ESTRATEGIA RECOMENDADA <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                    </button>
                    
                    <button 
                        onClick={onClose}
                        className="w-full py-2 text-gray-500 font-bold rounded-xl text-[9px] md:text-[10px] font-mono uppercase tracking-widest hover:text-white transition-all text-center"
                    >
                        Guardar resultados y salir
                    </button>
                </div>
            </div>
        </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[160] flex items-center justify-center p-0 md:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
        <div className="w-full h-full md:h-[750px] md:max-h-[90vh] max-w-6xl bg-white md:rounded-[2rem] shadow-2xl relative flex flex-col overflow-hidden">
            
            {/* Close Button - More accessible on mobile */}
            {step !== 'result' && (
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 md:top-6 md:right-6 z-50 p-2 bg-gray-100/50 backdrop-blur md:bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"
                >
                    <X size={20}/>
                </button>
            )}

            <div className="flex-1 overflow-hidden">
                {step === 'intro' && renderIntro()}
                {step === 'question' && renderQuestion()}
                {step === 'analyzing' && renderAnalyzing()}
                {step === 'result' && renderResult()}
            </div>
        </div>
    </div>
  );
};

export default QuizModal;
