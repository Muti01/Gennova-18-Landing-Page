import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Camera, Upload, RefreshCw, X, Sparkles, Loader2, ScanFace, ChevronLeft, Save, CheckCircle2 } from 'lucide-react';
import { saveFutureSelfImage } from '../services/firebase';
import { User as FirebaseUser } from '../types';

interface FutureSelfProps {
  currentUser?: FirebaseUser | null;
}

const TIMEFRAMES = [
  { 
    id: '3m', 
    label: '3 MESES', 
    description: 'Reducción de inflamación. Piel más clara.',
    promptMod: 'Subtle biological optimization. Reduce facial puffiness (inflammation). Improve skin hydration. Keep exact facial structure.'
  },
  { 
    id: '6m', 
    label: '6 MESES', 
    description: 'Optimización metabólica. Definición facial.',
    promptMod: 'Healthy metabolic state. Clearer skin texture (collagen boost). Alert and bright eyes. Reduced water retention in face. Keep exact identity.'
  },
  { 
    id: '12m', 
    label: '1 AÑO', 
    description: 'Rejuvenecimiento celular total.',
    promptMod: 'Peak biological performance. Radiant skin tone. Optimal lean facial definition. Youthful vitality. 100% preserve identity.'
  }
];

const FutureSelf: React.FC<FutureSelfProps> = ({ currentUser }) => {
  const [mode, setMode] = useState<'intro' | 'capture' | 'preview' | 'result'>('intro');
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('12m');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    let mounted = true;
    const initCamera = async () => {
        if (mode === 'capture') {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ 
                    video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } } 
                });
                if (!mounted) {
                    stream.getTracks().forEach(track => track.stop());
                    return;
                }
                streamRef.current = stream;
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    await videoRef.current.play();
                }
            } catch (err) {
                console.error("Camera error:", err);
                if (mounted) {
                    setError("Acceso a cámara denegado.");
                    setMode('intro');
                }
            }
        } else {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
                streamRef.current = null;
            }
        }
    };
    initCamera();
    return () => {
        mounted = false;
        if (streamRef.current) streamRef.current.getTracks().forEach(track => track.stop());
    };
  }, [mode]);

  const startCamera = () => { setError(null); setMode('capture'); };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1); 
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        setCapturedImage(canvas.toDataURL('image/jpeg', 0.85));
        setMode('preview');
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedImage(reader.result as string);
        setMode('preview');
      };
      reader.readAsDataURL(file);
    }
  };

  const generateFutureSelf = async (timeframeId: string) => {
    if (!capturedImage) return;
    setLoading(true);
    setGeneratedImage(null);
    setError(null);
    setSelectedTimeframe(timeframeId);
    setMode('result');
    setSavedSuccess(false);

    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey) throw new Error("API Key missing");
      const ai = new GoogleGenAI({ apiKey });
      const timeframeConfig = TIMEFRAMES.find(t => t.id === timeframeId);
      const base64Data = capturedImage.split(',')[1];

      // CRITICAL PROMPT ENGINEERING FOR IDENTITY PRESERVATION
      const prompt = `
      TASK: You are a high-end digital retoucher.
      INPUT: Use the provided image as the STRICT REFERENCE.
      GOAL: Visualize this EXACT person after epigenetic health optimization.
      
      CONSTRAINTS:
      1. DO NOT CHANGE FACIAL FEATURES, NOSE SHAPE, EYE SHAPE, OR BONE STRUCTURE.
      2. PRESERVE ETHNICITY AND IDENTITY 100%. The output must look like the SAME person.
      3. Do not generate a generic model. Keep the user's face.
      
      MODIFICATIONS TO APPLY:
      - ${timeframeConfig?.promptMod}
      - Improve skin texture (reduce pores/blemishes).
      - Improve brightness/glow (simulating high energy levels).
      - Reduce under-eye bags or signs of fatigue.
      
      OUTPUT STYLE:
      - Photorealistic, 8k resolution, cinematic lighting.
      - Maintain the original pose and angle.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ inlineData: { mimeType: 'image/jpeg', data: base64Data } }, { text: prompt }],
        },
        config: { imageConfig: { aspectRatio: "1:1" } }
      });

      let found = false;
      if (response.candidates && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
           if (part.inlineData) {
             setGeneratedImage(`data:image/png;base64,${part.inlineData.data}`);
             found = true;
             break;
           }
        }
      }
      if (!found) throw new Error("No se pudo generar la imagen.");
    } catch (err: any) {
      console.error(err);
      if (err.message && (err.message.includes('503') || err.message.includes('unavailable'))) {
          setError("Servicio saturado. Intenta luego.");
      } else {
          setError("Error al procesar imagen.");
      }
    } finally {
      setLoading(false);
    }
  };

  const saveResult = async () => {
    if (!currentUser || !generatedImage) return;
    setSaving(true);
    try {
        await saveFutureSelfImage(currentUser.uid, generatedImage, selectedTimeframe);
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) { console.error(err); } 
    finally { setSaving(false); }
  };

  const reset = () => {
    setCapturedImage(null);
    setGeneratedImage(null);
    setMode('intro');
    setError(null);
    setSavedSuccess(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-gennova-surface border border-white/5 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[600px]">
      
      {/* Sidebar / Controls */}
      <div className="md:w-1/3 p-8 border-r border-white/5 bg-gennova-elevated flex flex-col relative z-10">
         <div className="mb-8">
            <h3 className="text-3xl font-serif font-bold text-white mb-4 leading-tight">TU YO DEL FUTURO<br/><span className="text-gennova-gold">EN BIENESTAR</span></h3>
            <p className="text-gray-400 text-xs leading-relaxed font-light">
               Simula los efectos de la optimización epigenética en tu rostro a lo largo del tiempo.
            </p>
         </div>

         <div className="flex-grow space-y-6">
            <div className={`transition-all duration-300 ${mode === 'intro' ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                <div className="flex gap-3">
                   <button onClick={startCamera} className="flex-1 bg-transparent border border-gennova-cyan text-gennova-cyan py-3 rounded-lg flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:bg-gennova-cyan/10 transition">
                      <Camera size={14} /> Cámara
                   </button>
                   <label className="flex-1 border border-white/20 text-white py-3 rounded-lg flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition cursor-pointer">
                      <Upload size={14} /> Subir
                      <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                   </label>
                </div>
            </div>

            <div className={`transition-all duration-300 ${mode === 'result' || mode === 'preview' ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                <h4 className="text-white font-mono text-[10px] uppercase tracking-widest mb-4 border-b border-white/10 pb-2">
                   Proyección Temporal
                </h4>
                <div className="space-y-3">
                   {TIMEFRAMES.map(tf => (
                      <button 
                        key={tf.id}
                        onClick={() => generateFutureSelf(tf.id)}
                        disabled={loading || !capturedImage}
                        className={`w-full p-4 rounded-xl text-left border transition-all relative overflow-hidden group ${selectedTimeframe === tf.id && mode === 'result' ? 'bg-gennova-gold text-black border-gennova-gold' : 'bg-black border-white/10 text-gray-400 hover:border-white/30'}`}
                      >
                         <div className="flex justify-between items-center mb-1">
                            <span className="font-mono text-xs font-bold uppercase">{tf.label}</span>
                            {selectedTimeframe === tf.id && mode === 'result' && <Loader2 className={`w-3 h-3 ${loading ? 'animate-spin' : 'opacity-0'}`} />}
                         </div>
                         <p className={`text-[10px] leading-tight ${selectedTimeframe === tf.id && mode === 'result' ? 'text-black/70' : 'text-gray-600'}`}>{tf.description}</p>
                      </button>
                   ))}
                </div>
            </div>
         </div>

         {(capturedImage || mode === 'capture') && (
            <button onClick={reset} className="mt-6 flex items-center gap-2 text-[10px] text-gray-500 hover:text-white transition uppercase font-bold tracking-widest font-mono z-20 hover:underline">
               {mode === 'capture' ? <ChevronLeft size={12}/> : <RefreshCw size={12} />}
               {mode === 'capture' ? 'Cancelar' : 'Reiniciar Simulación'}
            </button>
         )}
      </div>

      {/* Main Visualizer Area */}
      <div className="md:w-2/3 bg-black relative flex items-center justify-center overflow-hidden min-h-[400px]">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(50,50,50,0.2)_0%,black_100%)] pointer-events-none"></div>
         
         {mode === 'intro' && (
            <div className="text-center p-8 opacity-40">
               <ScanFace size={80} className="mx-auto text-white mb-6 animate-pulse-slow" strokeWidth={0.5} />
               <p className="font-mono text-[10px] text-white uppercase tracking-[0.3em]">Esperando datos biométricos</p>
            </div>
         )}

         {mode === 'capture' && (
            <div className="relative w-full h-full bg-black flex flex-col items-center justify-center">
                <video ref={videoRef} autoPlay playsInline muted className="absolute w-full h-full object-cover transform -scale-x-100 opacity-80" />
                <div className="absolute inset-0 border-[40px] border-black/80 pointer-events-none z-10"></div>
                {/* Scanner Overlay UI */}
                <div className="absolute inset-20 border border-gennova-gold/30 rounded-3xl z-10 pointer-events-none flex flex-col justify-between p-4">
                    <div className="flex justify-between">
                        <div className="w-4 h-4 border-t-2 border-l-2 border-gennova-gold"></div>
                        <div className="w-4 h-4 border-t-2 border-r-2 border-gennova-gold"></div>
                    </div>
                    <div className="flex justify-between">
                        <div className="w-4 h-4 border-b-2 border-l-2 border-gennova-gold"></div>
                        <div className="w-4 h-4 border-b-2 border-r-2 border-gennova-gold"></div>
                    </div>
                </div>
                <button onClick={capturePhoto} className="absolute bottom-10 w-16 h-16 rounded-full border-2 border-white flex items-center justify-center hover:scale-110 transition bg-white/10 backdrop-blur-md z-20">
                   <div className="w-12 h-12 bg-white rounded-full"></div>
                </button>
                <canvas ref={canvasRef} className="hidden" />
            </div>
         )}

         {(mode === 'preview' || mode === 'result') && capturedImage && (
            <div className="relative w-full h-full flex">
               <div className={`relative transition-all duration-1000 ${generatedImage ? 'w-0 opacity-0' : 'w-full opacity-100'}`}>
                  <img src={capturedImage} alt="Current" className="w-full h-full object-cover" />
                  <div className="absolute top-6 left-6 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white font-mono border border-white/10">ACTUAL</div>
                  {loading && (
                      <div className="absolute inset-0 z-20 bg-black/60 flex items-center justify-center">
                          <div className="w-full h-1 bg-gennova-gold shadow-[0_0_30px_#E5C77A] animate-scan-fast absolute top-0"></div>
                          <div className="text-center">
                              <span className="font-mono text-gennova-gold text-xs uppercase tracking-widest animate-pulse">Optimizando células...</span>
                          </div>
                      </div>
                  )}
               </div>

               {generatedImage && (
                   <div className="w-full h-full relative animate-fade-in">
                       <img src={generatedImage} alt="Future" className="w-full h-full object-cover" />
                       <div className="absolute top-6 left-6 bg-gennova-gold text-black px-3 py-1 rounded-full text-[10px] font-bold font-mono shadow-lg">
                          FUTURO: {TIMEFRAMES.find(t => t.id === selectedTimeframe)?.label}
                       </div>
                       
                       <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/90 to-transparent p-8 pt-24">
                           <div className="flex items-center justify-between">
                               <div>
                                   <div className="flex items-center gap-2 text-gennova-success mb-2">
                                       <Sparkles size={14} />
                                       <span className="font-mono text-[10px] uppercase tracking-widest font-bold">Optimización Completada</span>
                                   </div>
                                   <p className="text-white text-sm opacity-90 font-light">{TIMEFRAMES.find(t => t.id === selectedTimeframe)?.description}</p>
                               </div>
                               
                               {currentUser && (
                                   <button 
                                      onClick={saveResult}
                                      disabled={saving || savedSuccess}
                                      className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs uppercase transition tracking-widest shadow-lg ${savedSuccess ? 'bg-gennova-success text-black' : 'bg-gennova-gold hover:brightness-110 text-black'}`}
                                   >
                                      {saving ? <Loader2 size={16} className="animate-spin"/> : savedSuccess ? <CheckCircle2 size={16}/> : <Save size={16}/>}
                                      {savedSuccess ? 'Guardado' : 'Guardar'}
                                   </button>
                               )}
                           </div>
                       </div>
                   </div>
               )}

               {error && (
                   <div className="absolute inset-0 bg-black/90 flex items-center justify-center p-8 text-center z-30">
                       <div>
                           <X className="w-10 h-10 text-red-500 mx-auto mb-4" />
                           <p className="text-white text-sm font-mono">{error}</p>
                           <button onClick={() => { setError(null); setMode('capture'); }} className="mt-6 px-6 py-2 border border-white/20 text-white rounded-full text-xs hover:bg-white hover:text-black transition">Intentar de nuevo</button>
                       </div>
                   </div>
               )}
            </div>
         )}
      </div>
    </div>
  );
};

export default FutureSelf;