import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Sparkles, Package, Share2, AlertCircle, Loader2 } from 'lucide-react';

const KitImage: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    try {
      setLoading(true);
      setError(null);
      const apiKey = process.env.API_KEY;
      if (!apiKey) throw new Error("API Key missing");

      const ai = new GoogleGenAI({ apiKey });

      // Updated Design System Prompt
      const prompt = `Generate an ultra-realistic 3D render of the Gennova Epigenetic Kit on a dark, sleek lab table. 
      Lighting should be soft, cinematic, with gold and neon cyan accents reflecting off the surface.
      The kit box is white with high-end gold serif typography 'GENNOVA'.
      Inside: precision stainless steel tweezers for hair collection, a gold foil pouch, and minimal instruction cards.
      Macro shot, depth of field, 8k resolution, premium biotech aesthetic like Apple or Whoop product shots.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
            imageConfig: {
                aspectRatio: "1:1"
            }
        }
      });

      let foundImage = false;
      if (response.candidates && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const base64String = part.inlineData.data;
            setImageUrl(`data:image/png;base64,${base64String}`);
            foundImage = true;
            break;
          }
        }
      }

      if (!foundImage) {
        setError("No se pudo generar imagen.");
      }
    } catch (e: any) {
      console.error(e);
      if (e.message && (e.message.includes('503') || e.message.includes('unavailable'))) {
          setError("Servicio saturado. Intenta de nuevo.");
      } else {
          setError("Error de generación.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!imageUrl) return;
    try {
      const blob = await (await fetch(imageUrl)).blob();
      const file = new File([blob], `gennova-kit.png`, { type: blob.type });
      if (navigator.share) {
        await navigator.share({
          title: `Gennova Kit Epigenético`,
          text: `Descubre el nuevo Kit Epigenético de Gennova.`,
          files: [file],
        });
      } else {
        const a = document.createElement('a');
        a.href = imageUrl;
        a.download = `gennova-kit.png`;
        a.click();
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <div className="relative aspect-square w-full max-w-md mx-auto bg-gennova-surface rounded-3xl border border-white/5 shadow-2xl overflow-hidden flex items-center justify-center group hover:border-gennova-gold/30 transition-all duration-500">
       
       {imageUrl ? (
        <>
            <img 
                src={imageUrl} 
                alt="Gennova Epigenetic Kit" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            {/* Share Button */}
            <button
                onClick={handleShare}
                className="absolute top-4 right-4 p-3 bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-gennova-gold hover:text-black border border-white/10 transition-all duration-300 z-30 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 shadow-xl"
                title="Compartir"
            >
                <Share2 size={20} />
            </button>
        </>
      ) : (
        <div className="text-center relative z-10 p-8 flex flex-col items-center">
             {loading ? (
                 <div className="flex flex-col items-center">
                    <div className="relative w-16 h-16 mb-6">
                        <div className="absolute inset-0 border-t-2 border-gennova-gold rounded-full animate-spin"></div>
                        <div className="absolute inset-2 border-b-2 border-gennova-cyan rounded-full animate-spin-slow"></div>
                    </div>
                    <p className="text-gennova-gold font-mono text-xs font-bold tracking-widest uppercase animate-pulse">Simulando Kit 3D...</p>
                 </div>
             ) : (
                <>
                    <div className="w-20 h-20 bg-gennova-elevated rounded-full flex items-center justify-center mb-6 border border-white/5 group-hover:border-gennova-gold/30 transition-all">
                        <Package size={32} className="text-gennova-gold opacity-80" />
                    </div>
                    <h3 className="text-2xl font-serif text-white mb-3">Kit Epigenético 3D</h3>
                    <p className="text-gennova-text-secondary text-sm mb-8 max-w-xs leading-relaxed font-light">
                        Visualiza el hardware biológico antes de comprarlo con <span className="text-white font-medium">Nano Banana AI</span>.
                    </p>
                    
                    <button 
                        onClick={generateImage}
                        className="flex items-center gap-2 px-8 py-3 bg-gennova-gold text-black font-bold rounded-full hover:brightness-110 hover:scale-105 transition-all duration-300 text-xs uppercase tracking-widest shadow-lg"
                    >
                        <Sparkles size={16} />
                        <span>Generar Render</span>
                    </button>
                    {error && (
                        <div className="flex items-center gap-1 text-red-400 text-xs mt-4 bg-red-900/10 px-3 py-1 rounded border border-red-900/30">
                            <AlertCircle size={12} />
                            <span>{error}</span>
                        </div>
                    )}
                </>
             )}
        </div>
      )}
    </div>
  );
};

export default KitImage;