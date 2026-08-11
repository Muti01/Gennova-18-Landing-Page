
import React from 'react';
import { X, ArrowRight, ShieldCheck, Globe, Users, FileText, Zap, Lock, BookOpen } from 'lucide-react';

interface FooterContent {
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  isLegal?: boolean; // Si es legal, mostramos más texto y menos imagen
  cta?: string;
  textBlock?: React.ReactNode; // Para contenido legal extenso
  articles?: { title: string; category: string }[];
}

const CONTENT_MAP: Record<string, FooterContent> = {
  // --- SOPORTE ---
  'help': {
    title: 'Centro de Comando',
    subtitle: 'Soporte 24/7',
    description: 'Nuestro equipo de especialistas en bio-datos no duerme (bueno, sí duermen, pero optimizadamente). Estamos aquí para resolver dudas sobre tu kit, tu data o tu logística.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop',
    cta: 'Contactar Soporte'
  },
  'order': {
    title: 'Rastreo de Bio-Hardware',
    subtitle: 'Logística',
    description: 'Tu kit S-Drive viaja con prioridad. Monitorea el trayecto desde nuestro laboratorio central hasta tu puerta en tiempo real.',
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=1200&auto=format&fit=crop',
    cta: 'Ver mi Pedido'
  },
  'reinc': {
    title: 'Reactivación de Protocolo',
    subtitle: 'Volver al Flow',
    description: '¿Pausaste tu suscripción? Tu data histórica sigue segura. Reactiva tu cuenta para comparar tu "Yo" de hace un año con tu "Yo" actual.',
    image: 'https://images.unsplash.com/photo-1552674605-469523170d9e?q=80&w=1200&auto=format&fit=crop',
    cta: 'Reactivar Membresía'
  },
  'members': {
    title: 'Portal de Miembros',
    subtitle: 'Acceso Exclusivo',
    description: 'El dashboard central donde convergen tus biomarcadores, tu plan nutricional y la inteligencia de Genn Coach AI.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop',
    cta: 'Ingresar al Portal'
  },
  'glabs': {
    title: 'Gennova Labs',
    subtitle: 'Innovación',
    description: 'Donde la biología se encuentra con el silicio. Nuestro centro de I+D en Lima y Hamburgo trabaja en la próxima generación de algoritmos predictivos.',
    image: 'https://images.unsplash.com/photo-1581093458891-95b247a5d1b8?q=80&w=1200&auto=format&fit=crop',
    cta: 'Ver Investigaciones'
  },
  'community': {
    title: 'El 1%',
    subtitle: 'Comunidad',
    description: 'Únete a un colectivo de atletas, ejecutivos y bio-hackers que no aceptan la "normalidad" como estándar de salud. Comparte protocolos y resultados.',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1200&auto=format&fit=crop',
    cta: 'Unirse al Discord'
  },

  // --- EMPRESA ---
  'about_support': {
    title: 'Soporte Técnico',
    subtitle: 'Ingeniería',
    description: '¿Problemas con la carga de datos o la visualización del dashboard? Nuestro equipo de ingeniería resuelve incidencias críticas en <2 horas.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop',
    cta: 'Abrir Ticket'
  },
  'devs': {
    title: 'API & Integraciones',
    subtitle: 'Developers',
    description: 'Construye sobre Gennova OS. Accede a nuestra API para integrar datos biométricos en tus aplicaciones de salud y fitness.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
    cta: 'Documentación API'
  },
  'engineering': {
    title: 'Arquitectura del Sistema',
    subtitle: 'Stack Tecnológico',
    description: 'Usamos IA generativa de Google (Gemini), procesamiento en el borde y encriptación de grado militar para procesar tu biología.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
    cta: 'Ver Tech Stack'
  },
  'careers': {
    title: 'Únete a la Misión',
    subtitle: 'Carreras',
    description: 'Estamos buscando mentes obsesionadas con la longevidad, la IA y el diseño de producto. Ayúdanos a construir el sistema operativo del cuerpo humano.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
    cta: 'Ver Vacantes'
  },
  'mission': {
    title: 'El Control es Tuyo',
    subtitle: 'Nuestra Misión',
    description: 'Creemos en un mundo donde la salud es proactiva, personalizada y basada en datos, no en el azar. Democratizamos la tecnología de élite.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
    cta: 'Leer Manifiesto'
  },

  // --- LEGAL (TEXTO EXTENSO) ---
  'terms_use': {
    title: 'Términos de Uso',
    subtitle: 'Marco Legal',
    description: 'Reglas claras para una relación transparente.',
    isLegal: true,
    textBlock: (
      <div className="space-y-4 text-sm font-light text-gray-300">
        <p><strong>1. Aceptación:</strong> Al usar Gennova, aceptas que somos una herramienta de bienestar, no un sustituto médico.</p>
        <p><strong>2. Uso de IA:</strong> Nuestros algoritmos generan recomendaciones basadas en probabilidades estadísticas.</p>
        <p><strong>3. Propiedad Intelectual:</strong> Todo el software, diseño y protocolos son propiedad exclusiva de Gennova Labs.</p>
        <p><strong>4. Cancelaciones:</strong> Las membresías pueden cancelarse en cualquier momento con 30 días de preaviso.</p>
      </div>
    )
  },
  'terms_sale': {
    title: 'Términos de Venta',
    subtitle: 'Comercial',
    description: 'Condiciones de adquisición de hardware y servicios.',
    isLegal: true,
    textBlock: (
      <div className="space-y-4 text-sm font-light text-gray-300">
        <p><strong>1. Envíos:</strong> Los tiempos de envío son estimados. No nos hacemos responsables por demoras de terceros.</p>
        <p><strong>2. Devoluciones:</strong> El Kit S-Drive no puede devolverse una vez abierto el sello de seguridad por razones de higiene biológica.</p>
        <p><strong>3. Garantía:</strong> Ofrecemos garantía de 1 año sobre defectos de fábrica en el hardware.</p>
      </div>
    )
  },
  'privacy': {
    title: 'Política de Privacidad',
    subtitle: 'Tus Datos',
    description: 'Tus datos biológicos te pertenecen. Punto.',
    isLegal: true,
    textBlock: (
      <div className="space-y-4 text-sm font-light text-gray-300">
        <p><strong>1. Encriptación:</strong> Utilizamos AES-256 para todos los datos en reposo y tránsito.</p>
        <p><strong>2. No Venta:</strong> Gennova NUNCA venderá tus datos genéticos o biométricos a terceros, aseguradoras o empleadores.</p>
        <p><strong>3. Anonimización:</strong> Tu muestra es procesada bajo un ID único, separada de tu identidad personal en el laboratorio.</p>
        <p><strong>4. Derecho al Olvido:</strong> Puedes solicitar la eliminación total de tus registros en cualquier momento.</p>
      </div>
    )
  },
  'security': {
    title: 'Seguridad de la Plataforma',
    subtitle: 'Infraestructura',
    description: 'Protocolos de seguridad de nivel bancario.',
    isLegal: true,
    textBlock: (
      <div className="space-y-4 text-sm font-light text-gray-300">
        <p><strong>1. Auditorías:</strong> Realizamos pentesting trimestral con firmas de ciberseguridad externas.</p>
        <p><strong>2. Acceso:</strong> Autenticación de doble factor (2FA) disponible y recomendada para todas las cuentas.</p>
        <p><strong>3. Conformidad:</strong> Cumplimos con GDPR (Europa) y normativas locales de protección de datos de salud.</p>
      </div>
    )
  },
  'patents': {
    title: 'Patentes & Propiedad',
    subtitle: 'IP',
    description: 'Innovación protegida.',
    isLegal: true,
    textBlock: (
      <div className="space-y-4 text-sm font-light text-gray-300">
        <p>Las tecnologías de escaneo S-Drive y los algoritmos de Genn Coach AI están protegidos por patentes internacionales y registros de propiedad intelectual.</p>
        <p>El uso no autorizado de nuestra tecnología de decodificación epigenética será perseguido legalmente.</p>
      </div>
    )
  },

  // --- PARTNERS & JOIN ---
  'affiliate': {
    title: 'Programa de Afiliados',
    subtitle: 'Partners',
    description: '¿Eres médico, entrenador o influencer de wellness? Monetiza tu influencia recomendando la tecnología de Gennova a tu comunidad.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200&auto=format&fit=crop',
    cta: 'Aplicar al Programa'
  },
  'get_kit': {
    title: 'Inicia tu Viaje',
    subtitle: 'Obtener Kit',
    description: 'El primer paso hacia el control total. Recibe el hardware S-Drive, toma tu muestra y desbloquea tu dashboard en días.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1200&auto=format&fit=crop',
    cta: 'Comprar Kit Ahora'
  },
  'refer': {
    title: 'Give 20, Get 20',
    subtitle: 'Referidos',
    description: 'La salud es contagiosa. Regala S/ 20 de descuento a un amigo y recibe S/ 20 de crédito en tu próxima mensualidad.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop',
    cta: 'Generar Link'
  },
  'gift': {
    title: 'Regala Longevidad',
    subtitle: 'Gifting',
    description: 'El regalo definitivo para quien "ya lo tiene todo". Regala conocimiento, vitalidad y años de vida saludable.',
    image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=1200&auto=format&fit=crop',
    cta: 'Comprar Tarjeta de Regalo'
  },
  'corp': {
    title: 'Gennova Corporate',
    subtitle: 'B2B',
    description: 'Equipos de alto rendimiento necesitan biología de alto rendimiento. Reduce el burnout y aumenta la productividad de tu empresa.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
    cta: 'Contactar Ventas B2B'
  },
  'accessories': {
    title: 'Ecosistema',
    subtitle: 'Accesorios',
    description: 'Suplementos validados, wearables compatibles y herramientas para potenciar tu protocolo Gennova.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop',
    cta: 'Ver Tienda'
  },
  'blog': {
    title: 'The Lab Journal',
    subtitle: 'El Blog',
    description: 'Deep dives en ciencia de longevidad, nutrición molecular y casos de estudio de nuestros usuarios.',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1200&auto=format&fit=crop',
    cta: 'Leer Todos los Artículos',
    articles: [
      { category: 'Epigenética', title: 'El Poder de la Epigenética: Cómo Reescribir tu Destino Biológico' },
      { category: 'Neurociencia', title: 'Neurogénesis: Hackeando el Cerebro para un Rendimiento Cognitivo Pico' },
      { category: 'Biología Celular', title: 'Autofagia: El Mecanismo Celular para la Juventud Prolongada' },
      { category: 'Nutrición Molecular', title: 'Ayuno Intermitente y Longevidad: Más Allá de la Pérdida de Peso' },
      { category: 'Desempeño', title: 'Bio-Ritmos y Sueño Profundo: La Arquitectura del Descanso Perfecto' },
      { category: 'Genética', title: 'Nutrigenómica: Diseñando tu Dieta Basada en tu ADN' }
    ]
  },
  'press': {
    title: 'Centro de Prensa',
    subtitle: 'Media',
    description: 'Recursos para periodistas, notas de prensa y kit de marca. Gennova en las noticias.',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200&auto=format&fit=crop',
    cta: 'Descargar Media Kit'
  }
};

interface FooterContentModalProps {
  contentKey: string;
  onClose: () => void;
}

const FooterContentModal: React.FC<FooterContentModalProps> = ({ contentKey, onClose }) => {
  const content = CONTENT_MAP[contentKey];

  if (!content) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-fade-in">
      <div className={`bg-gennova-main border border-white/10 w-full rounded-3xl shadow-2xl relative flex flex-col md:flex-row overflow-hidden ${content.isLegal ? 'max-w-2xl max-h-[80vh]' : 'max-w-5xl h-[600px]'}`}>
        
        {/* Visual Side (Left) - Only for Non-Legal or if Image exists */}
        {!content.isLegal && content.image && (
            <div className="md:w-3/5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                <img 
                    src={content.image} 
                    alt={content.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
                <div className="absolute bottom-8 left-8 z-20">
                    <span className="text-gennova-gold font-mono text-[10px] uppercase tracking-[0.3em] bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">{content.subtitle}</span>
                </div>
            </div>
        )}

        {/* Content Side (Right) */}
        <div className={`${content.isLegal ? 'w-full' : 'md:w-2/5'} p-8 md:p-12 flex flex-col relative bg-[#05070A]`}>
            <button 
                onClick={onClose} 
                className="absolute top-6 right-6 p-2 bg-white/5 rounded-full text-gray-500 hover:text-white transition-colors z-50 hover:bg-white/10"
            >
                <X size={20} />
            </button>

            <div className="flex-1 flex flex-col justify-center">
                <div className="mb-6">
                    {content.isLegal && (
                        <div className="flex items-center gap-2 mb-4 text-gennova-cyan">
                            <ShieldCheck size={18} />
                            <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Documento Legal</span>
                        </div>
                    )}
                    <h2 className="text-3xl md:text-4xl font-serif text-white mb-6 leading-none">{content.title}</h2>
                    <div className="w-12 h-1 bg-gennova-gold rounded-full mb-6"></div>
                    
                    {content.isLegal ? (
                        <div className="overflow-y-auto max-h-[300px] custom-scrollbar pr-2">
                            {content.textBlock}
                        </div>
                    ) : (
                        <div className="flex flex-col gap-6">
                            <p className="text-gray-400 text-sm leading-relaxed font-light">
                                {content.description}
                            </p>
                            {content.articles && (
                                <div className="flex flex-col gap-4 mt-2 overflow-y-auto max-h-[250px] custom-scrollbar pr-2 pb-4">
                                    {content.articles.map((article, i) => (
                                        <div key={i} className="group/article cursor-pointer border-l-2 border-white/10 hover:border-gennova-gold pl-4 py-1 transition-colors">
                                            <span className="text-[9px] font-mono text-gennova-gold uppercase tracking-[0.2em]">{article.category}</span>
                                            <h4 className="text-white text-sm font-medium mt-1 group-hover/article:text-gennova-gold transition-colors">{article.title}</h4>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {!content.isLegal && (
                    <button className="group flex items-center gap-3 text-white text-xs font-bold uppercase tracking-widest mt-auto hover:text-gennova-gold transition-colors">
                        {content.cta || 'Explorar Más'} 
                        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-gennova-gold group-hover:text-black group-hover:border-gennova-gold transition-all">
                            <ArrowRight size={14} />
                        </div>
                    </button>
                )}
                
                {content.isLegal && (
                    <button onClick={onClose} className="w-full bg-white/5 border border-white/10 text-white py-3 rounded-lg text-xs uppercase tracking-widest hover:bg-white/10 transition mt-6">
                        Entendido
                    </button>
                )}
            </div>
        </div>

      </div>
    </div>
  );
};

export default FooterContentModal;
