import React, { useState, useEffect } from 'react';
import { 
  X, Mail, CreditCard, MapPin, CheckCircle2, Truck, Smartphone, User, 
  FileText, ChevronRight, Loader2, Sparkles, ArrowRight, Check, 
  UserCheck, Cpu, Gem, Lock, Unlock, Fingerprint, Award, ShieldCheck,
  AlertTriangle, Copy
} from 'lucide-react';
import { buyKitFlow, loginWithGoogle, loginWithEmail } from '../services/firebase';
import { User as FirebaseUser } from '../types';

interface CheckoutFlowProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: FirebaseUser | null;
  initialPlan?: 'core' | 'plus' | 'elite';
}

type Step = 
  | 'vipGate' 
  | 'vettedApp' 
  | 'vettingScanner' 
  | 'vettingResult' 
  | 'plan' 
  | 'auth' 
  | 'payment' 
  | 'shipping' 
  | 'success';

const CheckoutFlow: React.FC<CheckoutFlowProps> = ({ isOpen, onClose, currentUser, initialPlan }) => {
  const [step, setStep] = useState<Step>('vipGate');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<'core' | 'plus' | 'elite'>(initialPlan || 'core');
  
  // VIP System State
  const [vipCode, setVipCode] = useState('');
  const [validationMsg, setValidationMsg] = useState<string | null>(null);
  
  // Survey Vetting State
  const [bioGoal, setBioGoal] = useState<'longevity' | 'performance' | 'metabolism'>('longevity');
  const [hasDoneAdvancedTests, setHasDoneAdvancedTests] = useState<'yes' | 'no'>('no');
  const [motivationText, setMotivationText] = useState('');
  
  // Scanner Dynamic Text
  const [scannerLogs, setScannerLogs] = useState<string[]>([]);
  const [generatedVipCode, setGeneratedVipCode] = useState('');
  
  // Payment ID
  const [paymentId, setPaymentId] = useState<string | null>(null);
  
  // Auth State
  const [authMode, setAuthMode] = useState<'selection' | 'email'>('selection');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Shipping Form
  const [formData, setFormData] = useState({
    fullName: currentUser?.displayName || '',
    dni: '',
    phone: '',
    address: '',
    district: '',
    city: 'Lima'
  });

  // Pre-approved VIP codes list
  const APPROVED_VIP_CODES = [
    'GENNOVA-VIP',
    'EPIGENE-2026',
    'COACH-AI',
    'ALPHA-MEMBER',
    'BIO-ELITE-LIMA',
    'VIP-CR7',
    'VELVET-GENN'
  ];

  useEffect(() => {
    if (isOpen) {
      if (initialPlan) {
        setSelectedPlan(initialPlan);
      }
      setStep('vipGate');
      setError(null);
      setValidationMsg(null);
      setVipCode('');
    }
  }, [isOpen, initialPlan]);

  if (!isOpen) return null;

  // Verify Invitation Codes
  const handleVerifyCode = () => {
    const formattedCode = vipCode.trim().toUpperCase();
    if (!formattedCode) {
      setError("Por favor ingrese un código.");
      return;
    }

    // Accept predefined codes, or mock generated codes
    const isPredefined = APPROVED_VIP_CODES.includes(formattedCode);
    const isGenerated = formattedCode.startsWith('GENN-VIP-');

    if (isPredefined || isGenerated) {
      setLoading(true);
      setError(null);
      setTimeout(() => {
        setLoading(false);
        setValidationMsg("¡Acceso VIP Autorizado con éxito!");
        setTimeout(() => {
          // Go straight to payment if logged in, else to auth
          if (currentUser) {
            setStep('payment');
          } else {
            setStep('auth');
          }
        }, 1200);
      }, 1000);
    } else {
      setError("Código de invitación no válido o ya expirado.");
    }
  };

  // Launch Automated Epigenetic Vetting Committee Simulation
  const handleStartVetting = () => {
    if (motivationText.trim().length < 10) {
      setError("Por favor, describa brevemente su motivación (mínimo 10 caracteres) para que el comité evalúe su perfil.");
      return;
    }
    
    setError(null);
    setStep('vettingScanner');
    setScannerLogs([]);
    
    const logs = [
      "⚡ INICIANDO ENLACE DE PRE-FACTIBILIDAD...",
      "🔬 EVALUANDO PERFIL DE BIOMARCADORES DE LIMA...",
      "🧠 SELECCIONANDO PROTOCOLO SUGERIDO: " + (bioGoal === 'longevity' ? 'LONGEVIDAD CELULAR' : bioGoal === 'performance' ? 'MÁXIMO ENFOQUE' : 'METABOLISMO ÁGIL'),
      "📡 VERIFICANDO CAPACIDAD DE COHORTE DE GENNOVA LABS...",
      "🔒 ASIGNANDO CÓDIGO DE ACCESO EXCLUSIVO...",
      "✅ ADMISIÓN VIP AUTORIZADA POR EL COMITÉ CIENTÍFICO"
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setScannerLogs(prev => [...prev, log]);
        if (index === logs.length - 1) {
          // Generate customized VIP Code
          const randId = Math.floor(1000 + Math.random() * 9000);
          const goalCode = bioGoal.toUpperCase().slice(0, 4);
          setGeneratedVipCode(`GENN-VIP-${goalCode}-${randId}`);
          
          setTimeout(() => {
            setStep('vettingResult');
          }, 1000);
        }
      }, (index + 1) * 800);
    });
  };

  const handleApplyVettedCode = () => {
    setVipCode(generatedVipCode);
    setStep('vipGate');
    setError(null);
    // Auto-trigger verification
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setValidationMsg("¡Cupo VIP Cohorte Reservado!");
      setTimeout(() => {
        currentUser ? setStep('payment') : setStep('auth');
      }, 1200);
    }, 1000);
  };

  const handlePlanContinue = () => { 
    currentUser ? setStep('payment') : setStep('auth'); 
  };

  const handleAuthGoogle = async () => {
    setLoading(true);
    setError(null);
    try { 
      await loginWithGoogle(); 
      setStep('payment');
    } 
    catch (e: any) { 
      setError("Error al autenticar con Google"); 
    } 
    finally { 
      setLoading(false); 
    }
  };

  const handleAuthEmail = async () => {
    setLoading(true);
    setError(null);
    try { 
      await loginWithEmail(email, password); 
      setStep('payment');
    } 
    catch(e: any) { 
      setError("Credenciales incorrectas."); 
    } 
    finally { 
      setLoading(false); 
    }
  };

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setPaymentId(`TX-${Date.now()}-${Math.floor(Math.random() * 1000)}`);
      setLoading(false);
      setStep('shipping');
    }, 1500);
  };

  const handleShippingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !paymentId) return;
    setLoading(true);
    setError(null);
    try {
        const prices = { core: 679, plus: 1299, elite: 2599 };
        await buyKitFlow(
            currentUser.uid,
            `kit-${selectedPlan}`,
            { amount: prices[selectedPlan], transactionId: paymentId, method: 'Google Pay' },
            formData
        );
        setStep('success');
    } catch (err: any) { 
        setError("Error al procesar el pedido."); 
    } 
    finally { 
        setLoading(false); 
    }
  };

  // RENDER STEP 1: GATE
  const renderVipGate = () => (
    <div className="space-y-6 animate-fade-in text-center">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 bg-gradient-to-br from-gennova-gold to-yellow-600/30 border border-gennova-gold/40 rounded-full flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(229,199,122,0.2)]">
          <Lock className="text-black w-6 h-6" />
        </div>
        <h2 className="text-2xl md:text-3xl font-serif text-white mb-2 font-bold tracking-tight">Control de Acceso VIP</h2>
        <p className="text-xs text-gennova-gold font-mono tracking-[0.25em] uppercase mb-4">Gennova Cohortes Privadas</p>
      </div>

      <div className="bg-black/40 backdrop-blur-sm border border-white/5 rounded-2xl p-5 text-left space-y-3">
        <p className="text-gray-300 text-xs leading-relaxed font-sans">
          Gennova Labs opera bajo un modelo de <strong>admisión personalizada</strong>. Limitamos los cupos semanales en Lima para garantizar que cada participante reciba atención de nuestro staff especialista y reserva inmediata del hardware biológico <strong>S-Drive</strong>.
        </p>
        <p className="text-gray-400 text-[11px] leading-relaxed font-sans">
          Si recibió un <strong>Código de Invitación VIP</strong> de un médico afiliado o miembro activo, ingréselo para iniciar su optimización.
        </p>
      </div>

      {error && <p className="text-red-400 text-xs font-mono bg-red-950/30 border border-red-500/20 p-3 rounded-xl">{error}</p>}
      {validationMsg && <p className="text-gennova-cyan text-xs font-mono bg-gennova-cyan/10 border border-gennova-cyan/20 p-3 rounded-xl animate-pulse">✓ {validationMsg}</p>}

      <div className="space-y-4">
        <div>
          <input 
            type="text" 
            placeholder="INGRESE CÓDIGO DE ACCESO" 
            value={vipCode}
            onChange={(e) => {
              setVipCode(e.target.value);
              setError(null);
            }}
            className="w-full bg-black border border-white/10 rounded-xl py-4 px-4 text-center text-lg font-mono font-bold tracking-[0.3em] uppercase text-gennova-gold placeholder-gray-800 focus:border-gennova-gold outline-none focus:ring-1 focus:ring-gennova-gold transition-all"
          />
        </div>

        <button 
          onClick={handleVerifyCode} 
          disabled={loading}
          className="w-full bg-gennova-gold text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:brightness-115 active:scale-98 transition shadow-[0_0_20px_rgba(229,199,122,0.15)] text-xs uppercase tracking-[0.2em]"
        >
          {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <><Unlock size={14} /> Verificar Invitación</>}
        </button>

        <div className="relative py-2 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
          <span className="relative bg-gennova-elevated px-4 text-[10px] font-mono text-gray-600 uppercase tracking-widest">¿No tiene una invitación?</span>
        </div>

        <button 
          onClick={() => setStep('vettedApp')}
          className="w-full bg-transparent border border-white/10 text-white font-medium py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-white/5 transition text-xs uppercase tracking-widest hover:border-white/20"
        >
          <Award size={14} className="text-gennova-cyan animate-pulse" /> Solicitar Admisión Excepcional
        </button>
      </div>
      
      <p className="text-center text-[10px] text-gray-600 font-mono tracking-widest uppercase">
        Admisión controlada para Lima Metropolitana y Regiones
      </p>
    </div>
  );

  // RENDER STEP 2: VETTING APPLICATION SURVEY
  const renderVettedApp = () => (
    <div className="space-y-6 animate-fade-in text-left">
      <div>
        <h3 className="text-xl md:text-2xl font-serif text-white font-bold leading-tight">Solicitud de Admisión</h3>
        <p className="text-[10px] font-mono text-gennova-cyan uppercase tracking-widest mt-1">Evaluación de Compatibilidad Biológica</p>
      </div>

      <div className="space-y-5">
        {/* Question 1: Goal */}
        <div className="space-y-2">
          <label className="text-xs uppercase font-mono text-gray-400 tracking-wider">1. ¿Cuál es su principal objetivo de optimización?</label>
          <div className="grid grid-cols-1 gap-2">
            {[
              { id: 'longevity', title: 'Longevidad Activa', desc: 'Prevenir envejecimiento celular y proteger ADN.' },
              { id: 'performance', title: 'Alto Rendimiento', desc: 'Optimizar enfoque cognitivo y potencia física.' },
              { id: 'metabolism', title: 'Balance Metabólico', desc: 'Mejorar absorción, evitar fatiga y peso óptimo.' }
            ].map(item => (
              <div 
                key={item.id}
                onClick={() => setBioGoal(item.id as any)}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-center ${bioGoal === item.id ? 'bg-gennova-cyan/5 border-gennova-cyan/40 shadow-md' : 'bg-black/30 border-white/5 hover:border-white/10'}`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">{item.title}</span>
                  <div className={`w-3 h-3 rounded-full border ${bioGoal === item.id ? 'border-gennova-cyan bg-gennova-cyan' : 'border-gray-700'}`}></div>
                </div>
                <p className="text-[10px] text-gray-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Question 2: Previous tests */}
        <div className="space-y-2">
          <label className="text-xs uppercase font-mono text-gray-400 tracking-wider">2. ¿Ha realizado antes pruebas biológicas avanzadas?</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'no', label: 'No, es mi primera vez' },
              { id: 'yes', label: 'Sí, medicina preventiva/tests' }
            ].map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => setHasDoneAdvancedTests(item.id as any)}
                className={`py-2 px-3 rounded-xl text-[11px] font-mono border transition-all text-center uppercase tracking-wider ${hasDoneAdvancedTests === item.id ? 'bg-white/10 border-white/30 text-white' : 'bg-black/30 border-white/5 text-gray-500 hover:border-white/10'}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Question 3: Motivation */}
        <div className="space-y-2">
          <label className="text-xs uppercase font-mono text-gray-400 tracking-wider">3. Describa brevemente su necesidad o motivación actual:</label>
          <textarea
            required
            rows={3}
            placeholder="Ej: Quiero recuperar mi nivel de energía diario que ha bajado mucho por el estrés laboral, y optimizar mi nutrición."
            value={motivationText}
            onChange={(e) => setMotivationText(e.target.value)}
            className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-700 focus:border-gennova-gold outline-none resize-none font-sans leading-relaxed"
          />
        </div>
      </div>

      {error && <p className="text-red-400 text-xs bg-red-950/20 border border-red-500/10 p-2 rounded-lg font-mono text-center">{error}</p>}

      {/* Limited Slots Live Proof */}
      <div className="flex items-center justify-between p-3.5 rounded-xl border border-gennova-gold/15 bg-gennova-gold/5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-yellow-500 animate-ping"></div>
          <span className="text-[11px] uppercase font-mono text-gennova-gold tracking-widest font-bold">COHORTE LIMA ACTUAL</span>
        </div>
        <span className="text-[10px] font-mono text-gray-400">14 cupos disponibles</span>
      </div>

      <div className="flex gap-3 pt-2">
        <button 
          onClick={() => setStep('vipGate')}
          className="w-1/3 bg-transparent border border-white/5 py-4 rounded-xl text-xs font-mono uppercase tracking-widest hover:bg-white/5 text-gray-400"
        >
          Volver
        </button>
        <button 
          onClick={handleStartVetting}
          className="w-2/3 bg-white text-black font-bold py-4 rounded-xl text-xs uppercase tracking-widest hover:bg-gray-100 transition shadow-md flex items-center justify-center gap-2 font-mono"
        >
          Enviar Solicitud <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );

  // RENDER STEP 3: SCANNER ANIMATION
  const renderVettingScanner = () => (
    <div className="space-y-8 animate-fade-in text-center py-8">
      <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
        {/* Holographic scanner layout */}
        <div className="absolute inset-0 border-2 border-gennova-cyan/20 rounded-full animate-spin-slow"></div>
        <div className="absolute inset-2 border border-dashed border-gennova-cyan/40 rounded-full animate-reverse-spin"></div>
        <div className="absolute inset-4 bg-[radial-gradient(circle_at_center,rgba(56,232,248,0.25),transparent_70%)] animate-pulse-slow rounded-full"></div>
        <Fingerprint className="text-gennova-cyan w-12 h-12 relative z-10 animate-pulse" />
      </div>

      <div>
        <h3 className="text-xl font-serif text-white mb-2">Comité Biométrico de Gennova Labs</h3>
        <p className="text-xs text-gray-500 font-mono tracking-widest uppercase">Procesamiento de Perfil de Candidato...</p>
      </div>

      {/* Falling Terminal Logs */}
      <div className="bg-black border border-white/5 p-4 rounded-2xl text-left h-44 overflow-y-auto no-scrollbar font-mono text-[10px] text-gray-400 space-y-2">
        {scannerLogs.map((log, i) => (
          <div key={i} className={`flex items-start gap-2 ${i === scannerLogs.length - 1 ? 'text-gennova-cyan font-bold font-mono animate-pulse' : ''}`}>
            <span className="text-gray-700 font-mono">[{new Date().toLocaleTimeString()}]</span>
            <span className="font-mono">{log}</span>
          </div>
        ))}
        {scannerLogs.length === 0 && <span className="animate-pulse text-gray-600 font-mono">Iniciando verificación analítica en la nube...</span>}
      </div>

      <p className="text-[10px] text-gray-600 font-mono uppercase tracking-[0.25em]">Medicina Molecular · Inteligencia Predictiva</p>
    </div>
  );

  // RENDER STEP 4: APPROVED APPLICATION TICKET
  const renderVettingResult = () => (
    <div className="space-y-6 animate-fade-in text-center">
      <div className="inline-flex items-center gap-2 bg-gennova-success/10 border border-gennova-success/20 px-4 py-1.5 rounded-full text-gennova-success font-mono text-[9px] uppercase tracking-widest mb-2">
        <ShieldCheck size={12} className="animate-pulse" /> Admitido en Cohorte de Lima
      </div>

      <div>
        <h3 className="text-2xl font-serif text-white leading-tight">Membresía Aprobada Excepcionalmente</h3>
        <p className="text-xs text-gennova-gold font-mono uppercase tracking-[0.2em] mt-1">BIOLÓGICAMENTE COMPATIBLE</p>
      </div>

      {/* Premium Ticket Card */}
      <div className="relative bg-gradient-to-br from-[#0c121e] to-[#06080d] border border-gennova-gold/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <Sparkles size={120} className="text-gennova-gold" />
        </div>
        
        <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
          <div className="text-left">
            <span className="text-[9px] text-gray-500 font-mono uppercase block">Socio Aprobado</span>
            <span className="text-xs font-bold text-white font-mono">{currentUser?.email || "Candidato Gennova"}</span>
          </div>
          <Award size={20} className="text-gennova-gold" />
        </div>

        <div className="text-center py-4 relative z-10">
          <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest block mb-2">Código de Invitación VIP Exclusivo</span>
          <div className="bg-black/90 rounded-2xl py-3 border border-white/10 flex items-center justify-center gap-3 relative">
            <span className="text-xl font-mono text-gennova-gold font-bold tracking-[0.3em] uppercase pl-2">
              {generatedVipCode}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4 text-xs font-mono text-gray-500 text-left">
          <div>
            <span className="block text-[8px] uppercase tracking-wider text-gray-600 font-mono">Ubicación</span>
            <span className="font-bold text-white uppercase text-[10px] font-mono">Lima, PE</span>
          </div>
          <div className="text-right">
            <span className="block text-[8px] uppercase tracking-wider text-gray-600 font-mono">Expira</span>
            <span className="font-bold text-emerald-400 uppercase text-[10px] font-mono">Reserva de 48H</span>
          </div>
        </div>
      </div>

      <p className="text-gray-400 text-xs leading-relaxed font-sans px-4">
        Por favor aplique su código de invitación. El sistema reservará su Hardware Biológico S-Drive de importación y programará su sesión presencial y teleconsulta con el especialista.
      </p>

      <button 
        onClick={handleApplyVettedCode}
        className="w-full bg-gennova-gold text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:brightness-110 transition shadow-xl text-xs uppercase tracking-[0.2em] font-mono"
      >
        <CheckCircle2 size={16} /> Aplicar Código y Desbloquear Plan
      </button>
    </div>
  );

  const renderPlanSelection = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center pb-2">
        <h2 className="text-2xl font-serif text-white font-bold mb-1">Elegir Nivel de Optimización</h2>
        <p className="text-gennova-gold text-[10px] font-mono uppercase tracking-widest">Niveles de Membresía Autorizada</p>
      </div>

      <div className="space-y-3">
          {[
              { id: 'core', title: 'Gennova Core (Bio-Esencial)', price: 'S/ 729', icon: Cpu, color: 'text-gennova-cyan', desc: 'Prueba Epigenética + Mapeo 12 Sistemas.' },
              { id: 'plus', title: 'Gennova Plus (Bio-Evolución)', price: 'S/ 1,299', icon: UserCheck, color: 'text-gennova-gold', desc: 'Test + Consulta Trofología/Especialistas.' },
              { id: 'elite', title: 'Gennova Elite (Bio-Elite)', price: 'S/ 2,599', icon: Gem, color: 'text-white', desc: 'Control Absoluto: 3 Sesiones Expertos + 2 Tests.' }
          ].map(plan => (
              <div 
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id as any)}
                className={`p-4 rounded-2xl cursor-pointer border transition-all flex items-center justify-between group ${selectedPlan === plan.id ? 'bg-white/10 border-white/40 shadow-xl' : 'bg-black/40 border-white/5 hover:border-white/20'}`}
              >
                  <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl bg-black border border-white/10 ${plan.color}`}>
                          <plan.icon size={18} />
                      </div>
                      <div>
                          <h4 className="font-bold text-white text-[13px] font-sans">{plan.title}</h4>
                          <p className="text-[10px] text-gray-500 font-sans leading-relaxed mt-0.5">{plan.desc}</p>
                      </div>
                  </div>
                  <div className="text-right shrink-0">
                      <span className="block font-bold text-white text-[15px]">{plan.price}</span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ml-auto mt-1 ${selectedPlan === plan.id ? 'border-gennova-gold bg-gennova-gold' : 'border-gray-700'}`}>
                          {selectedPlan === plan.id && <Check size={10} className="text-black" />}
                      </div>
                  </div>
              </div>
          ))}
      </div>

      <button onClick={handlePlanContinue} className="w-full bg-gennova-gold text-black font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:brightness-110 transition shadow-lg text-xs uppercase tracking-[0.2em] mt-2 font-mono">
        CONTINUAR A IDENTIFICACIÓN <ChevronRight size={16} />
      </button>
    </div>
  );

  const renderAuth = () => (
    <div className="space-y-6 animate-fade-in text-center">
      <div className="flex flex-col items-center">
        <User className="text-gennova-cyan w-10 h-10 mb-4 animate-pulse" />
        <h3 className="text-xl font-serif text-white font-bold">Verificación de Cuenta de Miembro</h3>
        <p className="text-[9px] font-mono text-gray-400 uppercase tracking-widest mt-1">Conectar con Gennova OS</p>
      </div>

      {error && <p className="text-red-400 text-xs bg-red-950/20 border border-red-500/20 p-2 rounded-xl font-mono">{error}</p>}
      
      {authMode === 'selection' ? (
          <div className="space-y-3">
            <button 
              onClick={handleAuthGoogle} 
              disabled={loading} 
              className="w-full bg-white text-black font-bold py-3.5 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-100 transition text-xs uppercase tracking-[0.15em]"
            >
              {loading ? <Loader2 className="animate-spin w-4 h-4" /> : 'Continuar con Google'}
            </button>
            <button 
              onClick={() => setAuthMode('email')} 
              disabled={loading} 
              className="w-full bg-transparent border border-white/10 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-3 hover:bg-white/5 transition text-xs uppercase tracking-[0.15em]"
            >
              Usar correo electrónico
            </button>
          </div>
      ) : (
          <div className="space-y-3.5 text-left">
              <input 
                type="email" 
                placeholder="Dirección de correo electrónico" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full bg-black border border-white/10 text-white p-3.5 rounded-xl text-xs focus:border-gennova-gold outline-none" 
              />
              <input 
                type="password" 
                placeholder="Contraseña de acceso" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full bg-black border border-white/10 text-white p-3.5 rounded-xl text-xs focus:border-gennova-gold outline-none" 
              />
              <button 
                onClick={handleAuthEmail} 
                disabled={loading} 
                className="w-full bg-gennova-gold text-black py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:brightness-110 active:scale-98 transition font-mono mt-2"
              >
                {loading ? <Loader2 className="animate-spin w-4 h-4 mx-auto"/> : 'Ingresar'}
              </button>
              <button 
                onClick={() => setAuthMode('selection')} 
                className="w-full text-gray-500 hover:text-white text-[10px] uppercase tracking-wider font-mono hover:underline text-center block"
              >
                Volver
              </button>
          </div>
      )}
    </div>
  );

  const renderPayment = () => (
    <div className="space-y-6 animate-fade-in text-center">
      <div className="flex flex-col items-center">
        <CreditCard className="text-gennova-gold w-10 h-10 mb-4" />
        <h3 className="text-xl font-serif text-white font-bold">Reserva de Membresía</h3>
        <p className="text-[9px] font-mono text-gray-400 uppercase tracking-widest mt-1">Caja Segura Encriptada</p>
      </div>

      <div className="bg-black/40 p-6 rounded-2xl border border-white/5 text-left space-y-4">
          <div className="flex justify-between items-center text-xs text-gray-400 font-mono uppercase">
            <span>Membresía Seleccionada</span>
            <span className="text-white font-bold">
              {selectedPlan === 'core' ? 'BIO-ESENCIAL' : selectedPlan === 'plus' ? 'BIO-EVOLUCIÓN' : 'BIO-ELITE'}
            </span>
          </div>
          <div className="flex justify-between items-center border-t border-white/5 pt-3 text-xs text-gray-400 font-mono uppercase">
            <span>Hardware S-Drive Importación</span>
            <span className="text-gennova-success">ASIGNADO & CONFIRMADO</span>
          </div>
          <div className="flex justify-between items-center border-t border-white/5 pt-3 text-xs text-gray-400 font-mono uppercase">
            <span>Envío Express Courier</span>
            <span className="text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-md border border-emerald-400/25">¡GRATIS!</span>
          </div>
          <div className="border-t border-white/10 pt-4 flex justify-between items-center text-white font-bold">
            <span className="font-serif">Inversión Final</span>
            <span className="text-gennova-gold text-2xl font-serif">S/ {selectedPlan === 'core' ? '729' : selectedPlan === 'plus' ? '1,299' : '2,599'}</span>
          </div>
      </div>

      <button 
        onClick={handlePayment} 
        disabled={loading} 
        className="w-full bg-white text-black py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-100 transition font-bold text-sm shadow-xl active:scale-98 font-mono tracking-widest text-xs uppercase"
      >
        {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <><Smartphone size={18}/> PAGAR CON GOOGLE PAY</>}
      </button>
    </div>
  );

  const renderShipping = () => (
    <form onSubmit={handleShippingSubmit} className="space-y-4 animate-fade-in text-left">
      <div className="text-center mb-6">
        <h3 className="text-xl font-serif text-white font-bold mb-2">Logística de Despacho VIP</h3>
        <p className="text-gennova-success text-[10px] font-mono uppercase tracking-widest">PAGO AUTORIZADO SEGURO</p>
      </div>
      
      <div className="space-y-3">
        <input 
          required 
          type="text" 
          className="w-full bg-black border border-white/10 rounded-xl py-3.5 px-4 text-white text-xs focus:border-gennova-gold outline-none" 
          placeholder="Nombres Completos" 
          value={formData.fullName} 
          onChange={(e) => setFormData({...formData, fullName: e.target.value})} 
        />
        <div className="grid grid-cols-2 gap-3">
            <input 
              required 
              type="text" 
              className="w-full bg-black border border-white/10 rounded-xl py-3.5 px-4 text-white text-xs focus:border-gennova-gold outline-none" 
              placeholder="DNI / Carnet Extrangería" 
              value={formData.dni} 
              onChange={(e) => setFormData({...formData, dni: e.target.value})} 
            />
            <input 
              required 
              type="tel" 
              className="w-full bg-black border border-white/10 rounded-xl py-3.5 px-4 text-white text-xs focus:border-gennova-gold outline-none" 
              placeholder="Celular de Contacto" 
              value={formData.phone} 
              onChange={(e) => setFormData({...formData, phone: e.target.value})} 
            />
        </div>
        <input 
          required 
          type="text" 
          className="w-full bg-black border border-white/10 rounded-xl py-3.5 px-4 text-white text-xs focus:border-gennova-gold outline-none" 
          placeholder="Dirección exacta de entrega / envío del Kit" 
          value={formData.address} 
          onChange={(e) => setFormData({...formData, address: e.target.value})} 
        />
        <div className="grid grid-cols-2 gap-3">
            <input 
              required 
              type="text" 
              className="w-full bg-black border border-white/10 rounded-xl py-3.5 px-4 text-white text-xs focus:border-gennova-gold outline-none" 
              placeholder="Distrito de entrega" 
              value={formData.district} 
              onChange={(e) => setFormData({...formData, district: e.target.value})} 
            />
            <input 
              required 
              type="text" 
              className="w-full bg-black border border-white/10 rounded-xl py-3.5 px-4 text-white text-xs focus:border-gennova-gold outline-none" 
              placeholder="Ciudad / Provincia (ej: Lima)" 
              value={formData.city} 
              onChange={(e) => setFormData({...formData, city: e.target.value})} 
            />
        </div>
      </div>

      <button 
        type="submit" 
        disabled={loading} 
        className="w-full bg-gennova-gold text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-98 transition mt-6 text-xs uppercase tracking-widest shadow-xl font-mono"
      >
         {loading ? <Loader2 className="animate-spin w-4 h-4" /> : 'CONFIRMAR ASIGNACIÓN'}
      </button>
    </form>
  );

  const renderSuccess = () => (
    <div className="text-center py-8 animate-fade-in space-y-6">
        <div className="w-20 h-20 bg-gennova-success/10 rounded-full flex items-center justify-center mx-auto border border-gennova-success/30">
            <CheckCircle2 className="text-gennova-success w-10 h-10 animate-bounce" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-3xl font-serif text-white font-bold leading-tight">¡Membresía Activada!</h3>
          <p className="text-gennova-gold text-xs font-mono uppercase tracking-[0.2em]">Bienvenido a Gennova Labs OS</p>
        </div>

        <div className="bg-black/30 p-5 rounded-2xl border border-white/5 text-xs text-gray-400 space-y-2 font-sans tracking-wide leading-relaxed">
          <p>
            Su <strong>Kit Epigenético {selectedPlan === 'core' ? 'Bio-Esencial' : selectedPlan === 'plus' ? 'Bio-Evolución' : 'Bio-Elite'}</strong> ha sido asignado a despacho priority express. Recibirá un mensaje confirmando el bloque de entrega.
          </p>
          <p className="text-gray-500 text-[10px] font-mono leading-relaxed uppercase">
            Acceso concedido a Genn Coach AI y panel de control de longevidad de forma inmediata.
          </p>
        </div>

        <button 
          onClick={onClose} 
          className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-100 transition text-xs uppercase tracking-[0.2em] shadow-lg font-mono"
        >
          INGRESAR AL PANEL PRIVADO
        </button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="bg-gennova-elevated border border-white/10 w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden relative">
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-gray-500 hover:text-white z-10 p-1 bg-black/50 hover:bg-black/80 rounded-full transition-all"
        >
          <X size={20} />
        </button>
        <div className="p-8 md:p-10">
           {step === 'vipGate' && renderVipGate()}
           {step === 'vettedApp' && renderVettedApp()}
           {step === 'vettingScanner' && renderVettingScanner()}
           {step === 'vettingResult' && renderVettingResult()}
           {step === 'plan' && renderPlanSelection()}
           {step === 'auth' && renderAuth()}
           {step === 'payment' && renderPayment()}
           {step === 'shipping' && renderShipping()}
           {step === 'success' && renderSuccess()}
        </div>
      </div>
    </div>
  );
};

export default CheckoutFlow;
