
import React, { useState, useEffect } from 'react';

const SLIDES = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2500&auto=format&fit=crop',
    alt: 'Enfoque y vitalidad femenina'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2500&auto=format&fit=crop',
    alt: 'Potencia y control masculino'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=2500&auto=format&fit=crop',
    alt: 'Plenitud y transformación'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1552674605-469523170d9e?q=80&w=2500&auto=format&fit=crop',
    alt: 'Rendimiento y velocidad'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1517963879466-e9b5ce384d30?q=80&w=2500&auto=format&fit=crop',
    alt: 'Inteligencia biológica'
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2500&auto=format&fit=crop',
    alt: 'Equilibrio y longevidad'
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?q=80&w=2500&auto=format&fit=crop',
    alt: 'Natación Pro Mariposa'
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=2500&auto=format&fit=crop',
    alt: 'Surfer Performance'
  },
  {
    id: 9,
    url: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2500&auto=format&fit=crop',
    alt: 'Runner Focus'
  },
  {
    id: 10,
    url: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=2500&auto=format&fit=crop',
    alt: 'Fútbol Profesional'
  },
  {
    id: 11,
    url: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=2500&auto=format&fit=crop',
    alt: 'Voleybol Acción'
  },
  {
    id: 12,
    url: 'https://images.unsplash.com/photo-1533561098177-336780c39972?q=80&w=2500&auto=format&fit=crop',
    alt: 'Ciclismo Elite'
  },
  {
    id: 13,
    url: 'https://images.unsplash.com/photo-1626245024434-80c76677cc2d?q=80&w=2500&auto=format&fit=crop',
    alt: 'Padel Sport'
  }
];

const HeroSlideshow: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Reducido a 3500ms (3.5s) para una sensación más dinámica tipo "video"
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  const prevSlide = (currentSlide - 1 + SLIDES.length) % SLIDES.length;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-gennova-main">
      {SLIDES.map((slide, index) => {
        // Duración de transición ajustada a 1500ms para suavidad cinematográfica
        let wrapperClass = "absolute inset-0 w-full h-full transition-opacity duration-[1500ms] ease-in-out will-change-opacity";
        
        if (index === currentSlide) {
            // Slide Activo: Se desvanece entrando (z-10 para estar arriba)
            wrapperClass += " opacity-100 z-10";
        } else if (index === prevSlide) {
            // Slide Anterior: Se mantiene visible (opacity 100) detrás del nuevo (z-0)
            // Esto elimina el parpadeo negro completamente.
            wrapperClass += " opacity-100 z-0";
        } else {
            // Otros: Ocultos
            wrapperClass += " opacity-0 z-0";
        }

        return (
            <div
              key={slide.id}
              className={wrapperClass}
            >
              <img
                src={slide.url}
                alt={slide.alt}
                // Filtros añadidos: brightness-110 (más luz), contrast-105 (definición), saturate-110 (color vivo)
                className="w-full h-full object-cover object-center md:object-[center_20%] animate-ken-burns brightness-110 contrast-105 saturate-110"
              />
            </div>
        );
      })}

      {/* Overlay Gradiente Base */}
      <div className="absolute inset-0 bg-gradient-to-b from-gennova-main/70 via-gennova-main/40 to-gennova-main pointer-events-none z-20"></div>
      
      {/* Overlay Radial */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,7,10,0.8)_100%)] pointer-events-none z-20"></div>
      
      {/* Textura de grano (Film Grain) */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-20 mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
    </div>
  );
};

export default HeroSlideshow;
