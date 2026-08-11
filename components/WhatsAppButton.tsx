
import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton: React.FC = () => {
  const phoneNumber = "51982026165"; // Using one of the numbers from footer
  const message = "Hola, quiero información sobre el Test Epigenético de Gennova y optimizar mi biología.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a 
      href={whatsappUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[90] group flex items-center justify-center"
      aria-label="Contactar por WhatsApp"
    >
      <span className="absolute right-full mr-4 bg-white text-black px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-xl">
        Consultar Experto
      </span>
      
      <div className="relative w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] transition-all duration-300 transform group-hover:scale-110">
        {/* Pulse Effect */}
        <div className="absolute inset-0 rounded-full border border-[#25D366] animate-ping opacity-20 duration-[2000ms]"></div>
        <MessageCircle size={28} className="text-white fill-current" />
      </div>
    </a>
  );
};

export default WhatsAppButton;
