
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Sparkles, Image as ImageIcon, Share2, Bot, Scan, Aperture, Fingerprint, Activity, RefreshCw } from 'lucide-react';

interface ReportImageProps {
  type: string;
}

const STATIC_ASSETS: Record<string, string> = {
    'Equilibrio & Bienestar Integral': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1920&auto=format&fit=crop',
    'Rendimiento Deportivo': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1920&auto=format&fit=crop',
    'Metabolismo & Peso': 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=1920&auto=format&fit=crop',
    'Longevidad & Vitalidad': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1920&auto=format&fit=crop',
    'Nutrición Vegana': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1920&auto=format&fit=crop',
    'Potencial Infantil': 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?q=80&w=1920&auto=format&fit=crop',
};

const GET_COLOR = (type: string) => {
    if (type.includes("Bienestar")) return "#38E8F8";
    if (type.includes("Rendimiento")) return "#22C55E";
    if (type.includes("Metabolismo")) return "#FB7185";
    if (type.includes("Longevidad")) return "#8A4FFF";
    if (type.includes("Vegana")) return "#10B981";
    if (type.includes("Infantil")) return "#E5C77A";
    return "#E5C77A";
};

const ReportImage: React.FC<ReportImageProps> = ({ type }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bgImage = STATIC_ASSETS[type] || 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop';
  const hudColor = GET_COLOR(type);

  const generateImage = async () => {
    try {
      setLoading(true);
      setError(null);
      const apiKey = process.env.API_KEY;
      if (!apiKey) throw new Error("API Key missing");

      const ai = new GoogleGenAI({ apiKey });
      
      const prompt = `Cinematic Macro Photography for a high-tech biological report cover titled "${type}". 
      Style: Whoop / Apple Health Dark Mode. 
      Vibe: Mysterious, Scientific, Premium, Moody.
      Subject: Abstract data visualization overlaying a human silhouette in motion.
      Lighting: Low key lighting with strong rim lights, glowing neon accents matching ${hudColor}.
      Composition: Clean, minimal, data-driven aesthetic. No text on image.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: "3:4"
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

      if (!foundImage) setError("No se pudo generar imagen.");
    } catch (e: any) {
      console.error(e);
      setError("Error de generación.");
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation(); 
    if (!imageUrl) return;
    try {
      const blob = await (await fetch(imageUrl)).blob();
      const file = new File([blob], `gennova-${type.toLowerCase().replace(/\s/g, '-')}.png`, { type: blob.type });
      if (navigator.share) {
        await navigator.share({
          title: `Gennova: ${type}`,
          text: `Mi visualización epigenética generada por Gennova AI.`,
          files: [file],
        });
      }
    } catch (err) { console.error(err); }
  };

  const randomPercent = Math.floor(Math.random() * (98 - 75) + 75);

  return (
    <div className="absolute inset-0 z-0 bg-gray-900 overflow-hidden group/card">
      {/* Imagen Principal con efecto Ken Burns */}
      <img 
        src={imageUrl || bgImage} 
        alt={type} 
        className={`w-full h-full object-cover transition-opacity duration-1000 animate-ken-burns ${loading ? 'blur-sm opacity-50' : 'opacity-100'}`}
      />
      
      {/* Línea de escaneo biométrico */}
      <div className="absolute left-0 w-full h-[2px] z-10 animate-biometric-scan pointer-events-none" style={{ background: `linear-gradient(90deg, transparent, ${hudColor}, transparent)`, boxShadow: `0 0 15px ${hudColor}` }}></div>

      {/* Overlays degradados */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 pointer-events-none"></div>
      
      {!imageUrl && !loading && (
        <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between">
            <div className="flex justify-end">
                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    <Activity size={10} className="animate-pulse" style={{ color: hudColor }} />
                    <span className="text-[8px] font-mono text-white font-bold uppercase tracking-widest">G-OS System</span>
                </div>
            </div>

            <div className="mt-auto">
                <div className="relative w-10 h-10 mb-2">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle cx="20" cy="20" r="18" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="transparent" />
                        <circle cx="20" cy="20" r="18" stroke={hudColor} strokeWidth="2" fill="transparent" strokeDasharray="113" strokeDashoffset={113 - (113 * randomPercent) / 100} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-white">{randomPercent}</span>
                    </div>
                </div>
            </div>
        </div>
      )}

      {loading && (
         <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/60 backdrop-blur-sm">
             <div className="relative w-10 h-10 mb-4">
                <div className="absolute inset-0 border-t-2 border-gennova-gold rounded-full animate-spin"></div>
             </div>
         </div>
      )}

      <div className="absolute top-4 right-4 z-30 opacity-0 group-hover/card:opacity-100 transition-opacity">
          {imageUrl ? (
            <button onClick={handleShare} className="p-2 bg-black/40 backdrop-blur-md rounded-full text-white border border-white/10 hover:bg-white hover:text-black transition-all">
                <Share2 size={14} />
            </button>
          ) : (
            !loading && (
                <button onClick={(e) => { e.stopPropagation(); generateImage(); }} className="p-2 bg-black/40 backdrop-blur-md rounded-full text-gennova-gold border border-white/10 hover:bg-gennova-gold hover:text-black transition-all">
                    <Sparkles size={14} />
                </button>
            )
          )}
      </div>
    </div>
  );
};

export default ReportImage;
