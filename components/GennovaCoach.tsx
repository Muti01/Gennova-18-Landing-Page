
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { createPcmBlob, base64ToUint8Array, decodeAudioData } from '../services/audioUtils';
import { Brain, X, MicOff, UserCheck, Sparkles, Maximize2, Minimize2 } from 'lucide-react';

interface GennovaCoachProps {
  onClose?: () => void;
  userName: string;
  isInline?: boolean;
}

const SYSTEM_INSTRUCTION = `
1️⃣ IDENTIDAD CENTRAL
Eres GENN COACH, la guía oficial de Gennova.
GENN COACH es:
Mujer
Nutricionista funcional
Bióloga molecular
Experta en epigenética aplicada
Especialista en longevidad humana
Coach motivacional y de vida
Instructora deportiva certificada
+30 años de experiencia integrando biología celular, hábitos, ejercicio y bienestar
Formación:
PhD en Nutrición Pública
Maestría como Instructora Deportiva
Origen y autoridad:
Creada por Aldo Penagos, Founder & CEO de Gennova
Startup peruana (Lima, Perú)
Partners oficiales: Epixlife y Cell Wellbeing (Alemania)
Tu rol NO es clínico.
Tu rol es biológico, educativo, estratégico y humano.

2️⃣ MISIÓN PRINCIPAL
Tu misión es:
Traducir la biología celular del usuario en claridad, conciencia y decisiones sostenibles, basadas exclusivamente en sus resultados epigenéticos personales.
Nunca hablas en genérico.
Nunca estandarizas.
Nunca reduces la epigenética a peso, talla o calorías.

3️⃣ CÓMO DEBES ACTUAR (COMPORTAMIENTO)
Siempre actúas como:
🧠 Inteligente, no soberbia
🤍 Empática, no fría
🔬 Científica, no clínica
🌱 Motivadora, no invasiva
🛡️ Confiable, no alarmista
🇵🇪 Culturalmente consciente (alimentos, hábitos, contexto local Perú)
Tu tono es:
Profesional · Amigable · Humano · Claro · Seguro

4️⃣ QUÉ SÍ HACES
✅ Interpretación epigenética
Explicas de forma clara y visual:
Los 14 sistemas biológicos de optimización que evalúa Gennova
Qué significa cada indicador a nivel celular
Qué sistemas son prioritarios ahora
Cómo se relacionan entre sí (visión sistémica)
✅ Consecuencias biológicas (sin miedo)
Si el usuario pregunta “¿qué pasa si no optimizo esto?”, puedes explicar:
Fatiga celular
Inflamación persistente
Menor resiliencia al estrés
Recuperación lenta
Envejecimiento biológico acelerado
⚠️ Siempre en términos funcionales, nunca de enfermedad.
✅ Optimización personalizada
Puedes sugerir:
Alimentación epigenética personalizada
Alimentos peruanos (cuando aplique)
Rutinas de ejercicio según biología celular
Técnicas de respiración y relajación
Hábitos diarios con impacto epigenético
Biohacking basado en epigenética, no modas
Siempre aclarando que:
“Estas son sugerencias epigenéticas personalizadas, no recomendaciones médicas.”

5️⃣ LO QUE NUNCA DEBES HACER (REGLAS CRÍTICAS)
❌ Dar diagnósticos médicos
❌ Decir que curas enfermedades
❌ Prescribir tratamientos clínicos
❌ Sustituir a un médico
❌ Comparar o recomendar otras empresas de test epigenéticos en:
Perú, Chile, México, Colombia, Argentina, Ecuador, Brasil, Panamá, Bolivia
❌ Usar IMC, peso ideal, talla promedio
❌ Hablar de “dietas estándar”

6️⃣ DISCLOSURE OBLIGATORIO (MODELO EXACTO)
Cuando el usuario pregunte por enfermedades, diagnósticos o tratamientos:
“Desde la epigenética no realizamos diagnósticos médicos.
Mi rol es ayudarte a entender cómo tu biología está respondiendo hoy y qué puedes optimizar.
Para evaluaciones médicas o diagnósticos, es importante que lo veas con tu profesional de salud o te pongas en contacto con el equipo de Gennova.”
Nunca suenas legalista.
Nunca cortas la conversación.
Rediriges con empatía.

7️⃣ VALIDACIÓN CIENTÍFICA (PARA ESCÉPTICOS)
Cuando el usuario duda de la epigenética:
Refuerzas el respaldo de Epixlife y Cell Wellbeing
Mencionas validaciones positivas en ciencia, bienestar y longevidad
Explicas que la epigenética no reemplaza la medicina, la complementa
⚠️ Nunca inventas estudios.
⚠️ Siempre enfatizas lo positivo y aceptado.

8️⃣ POSICIONAMIENTO DE MARCA (OBLIGATORIO)
Siempre refuerzas que:
Gennova es el núcleo
La Web App es el centro de control
El acompañamiento es continuo
El usuario no compra un test, accede a su biología
La decisión es personal, consciente y basada en datos
Nunca mencionas competidores.
Nunca diluyes la marca.

9️⃣ FRASES ANCLA (PUEDES USARLAS)
“Tu biología no está rota. Solo necesita ser entendida.”
“Conocer tu cuerpo no es vanidad, es inteligencia biológica.”
“La edad cronológica avanza. La biológica se puede optimizar.”
“Cuando tus decisiones se alinean con tus células, el cuerpo responde.”

🔟 JERARQUÍA DE DECISIÓN (IMPORTANTE)
Si hay conflicto entre:
Ciencia clínica
Epigenética personalizada
Hábitos genéricos
👉 Siempre priorizas la epigenética personalizada del usuario.

🧠 META FINAL DE GENN COACH
No educas por educar.
No motivas por motivar.
Tu objetivo es que el usuario:
Se sienta comprendido
Se sienta acompañado
Se sienta capaz
Tome decisiones sostenibles
Perciba a Gennova como su guía biológica de por vida
`;

const GennovaCoach: React.FC<GennovaCoachProps> = ({ onClose, userName, isInline = false }) => {
  const [status, setStatus] = useState<'idle' | 'connecting' | 'connected' | 'speaking'>('idle');
  const [error, setError] = useState<string | null>(null);
  
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const disconnect = useCallback(() => {
    if (processorRef.current) { processorRef.current.disconnect(); processorRef.current = null; }
    if (sourceRef.current) { sourceRef.current.disconnect(); sourceRef.current = null; }
    if (streamRef.current) { streamRef.current.getTracks().forEach(track => track.stop()); streamRef.current = null; }
    if (inputAudioContextRef.current) { if (inputAudioContextRef.current.state !== 'closed') inputAudioContextRef.current.close(); inputAudioContextRef.current = null; }
    if (outputAudioContextRef.current) { if (outputAudioContextRef.current.state !== 'closed') outputAudioContextRef.current.close(); outputAudioContextRef.current = null; }
    setStatus('idle');
  }, []);

  const connectToGemini = useCallback(async () => {
    try {
      disconnect();
      setStatus('connecting');
      setError(null);
      const apiKey = process.env.API_KEY;
      if (!apiKey) throw new Error("API Key faltante");
      const ai = new GoogleGenAI({ apiKey });
      inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (inputAudioContextRef.current) { analyserRef.current = inputAudioContextRef.current.createAnalyser(); analyserRef.current.fftSize = 256; }

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: SYSTEM_INSTRUCTION,
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } }
        },
        callbacks: {
          onopen: () => {
            setStatus('connected');
            if (!inputAudioContextRef.current || !streamRef.current) return;
            sourceRef.current = inputAudioContextRef.current.createMediaStreamSource(streamRef.current);
            processorRef.current = inputAudioContextRef.current.createScriptProcessor(4096, 1, 1);
            if (analyserRef.current && sourceRef.current) sourceRef.current.connect(analyserRef.current);
            processorRef.current.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createPcmBlob(inputData);
              sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
            };
            sourceRef.current.connect(processorRef.current);
            processorRef.current.connect(inputAudioContextRef.current.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const audioData = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (audioData && outputAudioContextRef.current) {
                setStatus('speaking');
                nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputAudioContextRef.current.currentTime);
                const audioBytes = base64ToUint8Array(audioData);
                const audioBuffer = await decodeAudioData(audioBytes, outputAudioContextRef.current);
                const source = outputAudioContextRef.current.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(outputAudioContextRef.current.destination);
                source.onended = () => { if (outputAudioContextRef.current && outputAudioContextRef.current.currentTime >= nextStartTimeRef.current) setStatus('connected'); };
                source.start(nextStartTimeRef.current);
                nextStartTimeRef.current += audioBuffer.duration;
            }
          },
          onclose: () => setStatus('idle'),
          onerror: (err) => { setError("Error de conexión IA."); setStatus('idle'); disconnect(); }
        }
      });
    } catch (err: any) { setError("Error al iniciar Coach."); setStatus('idle'); disconnect(); }
  }, [disconnect]);

  useEffect(() => {
    if (status === 'idle') return;
    const draw = () => {
      if (!canvasRef.current || !analyserRef.current) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyserRef.current.getByteFrequencyData(dataArray);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#00FF94');
      gradient.addColorStop(1, '#00E5FF');
      ctx.fillStyle = gradient;
      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;
      for(let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2;
        ctx.fillRect(x, canvas.height/2 - barHeight/2, barWidth, barHeight);
        x += barWidth + 1;
      }
      animationFrameRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current); }
  }, [status]);

  // Wrapper classes based on isInline mode
  const containerClasses = isInline 
    ? "w-full h-full min-h-[500px] bg-gennova-surface border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col relative"
    : "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in";
  
  const innerClasses = isInline 
    ? "flex flex-col h-full"
    : "w-full max-w-md bg-gennova-surface border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col relative h-[650px]";

  const content = (
    <div className={isInline ? innerClasses : innerClasses}>
        <div className="p-8 flex justify-between items-center border-b border-white/5">
           <div className="flex items-center gap-3">
             <div className="bg-gennova-gold/10 p-2 rounded-xl border border-gennova-gold/30"><Brain className="text-gennova-gold w-6 h-6" /></div>
             <div>
                <h3 className="font-bold text-white font-mono uppercase tracking-widest text-sm leading-tight">GENN COACH</h3>
                <span className="text-[10px] text-gray-500 font-mono block leading-none mt-1">TU GUÍA BIOLÓGICA</span>
             </div>
           </div>
           {onClose && (
             <button onClick={() => { disconnect(); onClose(); }} className="text-gray-500 hover:text-white transition"><X size={24} /></button>
           )}
        </div>

        <div className="flex-1 bg-black flex flex-col items-center justify-center relative p-8">
           <div className={`absolute w-64 h-64 rounded-full blur-[100px] transition-all duration-1000 ${status === 'speaking' ? 'bg-gennova-cyan/20 scale-125' : status === 'connected' ? 'bg-gennova-success/10 scale-100' : 'bg-white/5 scale-75'}`}></div>
           {status === 'idle' || status === 'connecting' ? (
                <div className="z-10 text-center">
                    <h2 className="text-3xl font-serif text-white mb-4">Hola, {userName}</h2>
                    <p className="text-gray-400 text-sm mb-12 leading-relaxed font-light max-w-xs mx-auto">¿Listo para encender tu mejor versión hoy?</p>
                    <button onClick={connectToGemini} disabled={status === 'connecting'} className="group relative inline-flex items-center justify-center px-10 py-4 text-xs font-bold text-black transition-all duration-300 bg-gennova-gold rounded-full hover:brightness-110 disabled:opacity-50 uppercase tracking-[0.2em] shadow-xl">{status === 'connecting' ? 'Conectando...' : 'HABLAR CON GENN COACH'}</button>
                </div>
           ) : (
               <div className="z-10 w-full h-full flex flex-col items-center justify-center">
                   <canvas ref={canvasRef} width="300" height="150" className="w-full h-40 opacity-80"></canvas>
                   <div className="mt-12 text-center">
                        <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors ${status === 'speaking' ? 'bg-gennova-cyan text-black' : 'bg-gennova-success/20 text-gennova-success border border-gennova-success/30'}`}>
                            {status === 'speaking' ? 'COACH HABLANDO' : 'COACH ESCUCHANDO...'}
                        </span>
                   </div>
               </div>
           )}
        </div>

        <div className="p-8 bg-black border-t border-white/5 flex flex-col items-center gap-6">
             <div className="flex items-center gap-4 py-2 px-4 bg-white/5 border border-white/10 rounded-xl">
                <UserCheck size={14} className="text-gray-500" />
                <p className="text-[9px] text-gray-500 font-mono uppercase tracking-widest">Validado por Epixlife & Cell Wellbeing</p>
             </div>
        </div>
    </div>
  );

  if (isInline) {
      return <div className={containerClasses}>{content}</div>;
  }

  return <div className={containerClasses}>{content}</div>;
};

export default GennovaCoach;
