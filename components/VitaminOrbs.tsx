
import React, { useRef, useEffect, useState } from 'react';
import { X, ArrowRight, Activity } from 'lucide-react';

const MOLECULES = [
  { label: 'Vit A', color: '#E5C77A', contribution: 'Fundamental para la diferenciación celular y la integridad de las mucosas.' },
  { label: 'Vit C', color: '#F59E0B', contribution: 'Cofactor esencial en la síntesis de colágeno y protección contra el estrés oxidativo.' },
  { label: 'Vit D3', color: '#E5C77A', contribution: 'Modulador de la expresión de +2,000 genes relacionados con la inmunidad.' },
  { label: 'Vit E', color: '#22C55E', contribution: 'Protección de las membranas lipídicas contra la peroxidación celular.' },
  { label: 'Vit K2', color: '#22C55E', contribution: 'Activación de proteínas que dirigen el calcio a los tejidos óseos, no arteriales.' },
  { label: 'B1', color: '#38E8F8', contribution: 'Clave en el metabolismo de carbohidratos y la producción de energía nerviosa.' },
  { label: 'B3', color: '#38E8F8', contribution: 'Precursor de NAD+, vital para la reparación del ADN y la función mitocondrial.' },
  { label: 'B6', color: '#8A4FFF', contribution: 'Esencial para la síntesis de neurotransmisores y la regulación de la homocisteína.' },
  { label: 'B9', color: '#8A4FFF', contribution: 'Soporta los ciclos de metilación, críticos para el encendido/apagado de genes.' },
  { label: 'B12', color: '#38E8F8', contribution: 'Vital para la formación de glóbulos rojos y la integridad de la vaina de mielina.' },
  { label: 'Colina', color: '#F9FAFB', contribution: 'Componente estructural de las membranas y precursor de la acetilcolina.' },
  { label: 'Magnesio', color: '#E5C77A', contribution: 'Involucrado en 300+ reacciones enzimáticas y la relajación del sistema nervioso.' },
  { label: 'Zinc', color: '#F59E0B', contribution: 'Fundamental para la transcripción genética y la función de las células T.' },
  { label: 'Hierro', color: '#EF4444', contribution: 'Transporte de oxígeno y soporte para la producción de energía en el citocromo.' },
  { label: 'Selenio', color: '#8A4FFF', contribution: 'Componente clave de la glutatión peroxidasa, el antioxidante maestro.' },
  { label: 'Potasio', color: '#38E8F8', contribution: 'Mantenimiento del potencial eléctrica de membrana y balance hídrico.' },
  { label: 'NAD+', color: '#38E8F8', contribution: 'Coenzima crítica para la actividad de las sirtuinas y la longevidad.' },
  { label: 'Resveratrol', color: '#8A4FFF', contribution: 'Activador de vías de supervivencia celular ante el estrés biológico.' },
];

const VitaminOrbs: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeOrb, setActiveOrb] = useState<{ label: string, contribution: string, x: number, y: number, color: string } | null>(null);
  const orbsRef = useRef<any[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let frameId: number;
    let time = 0;
    
    const mouse = { x: width / 2, y: height / 2 };
    const target = { x: width / 2, y: height / 2 };

    class VitaminOrb {
      x: number;
      y: number;
      z: number;
      label: string;
      color: string;
      contribution: string;
      baseRadius: number;
      currentRadius: number;
      speedX: number;
      speedY: number;
      phase: number;
      pulseSpeed: number;
      screenX: number = 0;
      screenY: number = 0;
      screenRadius: number = 0;
      maxSpeed: number = 1.2;
      friction: number = 0.995;

      // Epigenetic state
      isActive: boolean = Math.random() > 0.3;
      glowIntensity: number = this.isActive ? 1 : 0.1;
      targetGlow: number = this.isActive ? 1 : 0.1;
      switchTimer: number = Math.random() * 300 + 100;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.z = Math.random() * 400 - 200;
        const molecule = MOLECULES[Math.floor(Math.random() * MOLECULES.length)];
        this.label = molecule.label;
        this.color = molecule.color;
        this.contribution = molecule.contribution;
        this.baseRadius = Math.random() * 30 + 25;
        this.currentRadius = this.baseRadius;
        // Velocidad inicial ligeramente más dinámica
        this.speedX = (Math.random() - 0.5) * 0.6;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.phase = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.025 + 0.01;
      }

      update(mx: number, my: number) {
        // Suavizado de luz
        this.glowIntensity += (this.targetGlow - this.glowIntensity) * 0.05;

        // Lógica de "encendido/apagado"
        this.switchTimer--;
        if (this.switchTimer <= 0) {
          this.isActive = !this.isActive;
          this.targetGlow = this.isActive ? 1 : 0.1;
          this.switchTimer = Math.random() * 400 + 200;
        }

        // Interacción con mouse
        const dMouse = Math.sqrt((mx - this.screenX)**2 + (my - this.screenY)**2);
        if (dMouse < this.screenRadius * 1.8) {
          this.targetGlow = 1;
        } else if (!this.isActive) {
          this.targetGlow = 0.1;
        }

        // Movimiento Errático Sutil (Drift)
        this.speedX += (Math.random() - 0.5) * 0.01;
        this.speedY += (Math.random() - 0.5) * 0.01;

        this.speedX *= this.friction;
        this.speedY *= this.friction;
        this.x += this.speedX;
        this.y += this.speedY;
        this.phase += this.pulseSpeed;
        
        // Pulso más visible pero armónico
        this.currentRadius = this.baseRadius + (Math.sin(this.phase) * (this.baseRadius * 0.12));

        // Rebote en paredes con pérdida de energía
        if (this.x - this.baseRadius < 0) { this.x = this.baseRadius; this.speedX *= -0.7; }
        else if (this.x + this.baseRadius > width) { this.x = width - this.baseRadius; this.speedX *= -0.7; }
        if (this.y - this.baseRadius < 0) { this.y = this.baseRadius; this.speedY *= -0.7; }
        else if (this.y + this.baseRadius > height) { this.y = height - this.baseRadius; this.speedY *= -0.7; }

        // Exclusión central para proteger el H1
        const centerX = width / 2;
        const centerY = height / 2;
        const exclusionWidth = width < 768 ? 260 : 550;
        const exclusionHeight = width < 768 ? 340 : 420;
        const dx = Math.abs(this.x - centerX);
        const dy = Math.abs(this.y - centerY);

        if (dx < exclusionWidth / 2 && dy < exclusionHeight / 2) {
          const angle = Math.atan2(this.y - centerY, this.x - centerX);
          // Fuerza de repulsión más suave para un "flow" orbital
          this.speedX += Math.cos(angle) * 0.06;
          this.speedY += Math.sin(angle) * 0.06;
        }

        const currentTotalSpeed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
        if (currentTotalSpeed > this.maxSpeed) {
          const ratio = this.maxSpeed / currentTotalSpeed;
          this.speedX *= ratio; this.speedY *= ratio;
        }
      }

      draw() {
        if (!ctx) return;
        const focalLength = 600;
        const scale = focalLength / (focalLength + this.z);
        const parallaxX = (mouse.x - width / 2) * 0.03 * scale;
        const parallaxY = (mouse.y - height / 2) * 0.03 * scale;
        this.screenX = this.x + parallaxX;
        this.screenY = this.y + parallaxY;
        this.screenRadius = this.currentRadius * scale;

        const opacityHex = Math.floor(this.glowIntensity * 75).toString(16).padStart(2, '0');
        const borderOpacity = Math.max(0.15, this.glowIntensity * 0.8);

        const gradient = ctx.createRadialGradient(this.screenX, this.screenY, 0, this.screenX, this.screenY, this.screenRadius);
        gradient.addColorStop(0, this.color + opacityHex);
        gradient.addColorStop(0.6, this.color + (this.glowIntensity > 0.5 ? '15' : '05'));
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.screenX, this.screenY, this.screenRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = this.color;
        ctx.globalAlpha = borderOpacity;
        ctx.lineWidth = 1.5 * scale;
        ctx.beginPath();
        ctx.arc(this.screenX, this.screenY, this.screenRadius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#FFFFFF';
        ctx.globalAlpha = Math.max(0.25, this.glowIntensity * 0.9);
        ctx.font = `700 ${13 * scale}px 'JetBrains Mono'`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(this.label, this.screenX, this.screenY);
        
        ctx.globalAlpha = 1.0;
      }
    }

    const drawDNA = (t: number, front: boolean) => {
      if (!ctx) return;
      const centerX = width / 2;
      const centerY = height / 2;
      const dnaWidth = width < 768 ? 100 : 200;
      const dnaHeight = height;
      const nodes = 35;
      const spacing = dnaHeight / nodes;

      for (let i = 0; i < nodes; i++) {
        const y = i * spacing;
        const angle = (y * 0.006) + (t * 0.015);
        
        const x1 = centerX + Math.sin(angle) * dnaWidth;
        const z1 = Math.cos(angle) * dnaWidth;
        const x2 = centerX + Math.sin(angle + Math.PI) * dnaWidth;
        const z2 = Math.cos(angle + Math.PI) * dnaWidth;

        const isNode1Front = z1 > 0;
        const isNode2Front = z2 > 0;

        if (front) {
          if (isNode1Front || isNode2Front) {
             ctx.beginPath();
             ctx.moveTo(x1, y);
             ctx.lineTo(x2, y);
             ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
             ctx.lineWidth = 1;
             ctx.stroke();
          }
        }

        const drawNode = (nx: number, nz: number, strandColor: string) => {
          const s = 600 / (600 + nz);
          const r = (width < 768 ? 3 : 4.5) * s;
          const alpha = (nz + dnaWidth) / (dnaWidth * 2) * 0.3 + 0.05;
          
          ctx.beginPath();
          ctx.arc(nx, y, r, 0, Math.PI * 2);
          ctx.fillStyle = strandColor;
          ctx.globalAlpha = alpha;
          ctx.fill();
          ctx.globalAlpha = 1.0;
        };

        if (front) {
            if (isNode1Front) drawNode(x1, z1, '#38E8F8');
            if (isNode2Front) drawNode(x2, z2, '#E5C77A');
        } else {
            if (!isNode1Front) drawNode(x1, z1, '#38E8F8');
            if (!isNode2Front) drawNode(x2, z2, '#E5C77A');
        }
      }
    };

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      orbsRef.current = [];
      const orbCount = width < 768 ? 14 : 28; 
      for (let i = 0; i < orbCount; i++) { orbsRef.current.push(new VitaminOrb()); }
    };

    const animate = () => {
      if (!ctx) return;
      time++;
      mouse.x += (target.x - mouse.x) * 0.05;
      mouse.y += (target.y - mouse.y) * 0.05;
      ctx.clearRect(0, 0, width, height);

      drawDNA(time, false);

      orbsRef.current.forEach(orb => {
        orb.update(mouse.x, mouse.y);
        if (orb.z <= 0) orb.draw();
      });

      drawDNA(time, true);

      orbsRef.current.forEach(orb => {
        if (orb.z > 0) orb.draw();
      });

      frameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', init);
    window.addEventListener('mousemove', (e) => {
        target.x = e.clientX; target.y = e.clientY;
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left; const my = e.clientY - rect.top;
        let isHovering = false;
        for(let orb of orbsRef.current) {
            const dx = mx - orb.screenX; const dy = my - orb.screenY;
            if (Math.sqrt(dx*dx + dy*dy) < orb.screenRadius) { isHovering = true; break; }
        }
        canvas.style.cursor = isHovering ? 'pointer' : 'default';
    });

    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left; const my = e.clientY - rect.top;
        for(let orb of orbsRef.current) {
            const dx = mx - orb.screenX; const dy = my - orb.screenY;
            if (Math.sqrt(dx*dx + dy*dy) < orb.screenRadius) {
                setActiveOrb({ label: orb.label, contribution: orb.contribution, color: orb.color, x: orb.screenX, y: orb.screenY });
                break;
            }
        }
    });
    
    init();
    animate();

    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <>
        <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full" />
        {activeOrb && (
            <div 
                className="absolute z-50 animate-fade-in-up"
                style={{ 
                    left: Math.min(window.innerWidth - 260, Math.max(20, activeOrb.x - 120)),
                    top: Math.max(100, activeOrb.y - 180) 
                }}
            >
                <div className="bg-gennova-surface/90 border border-white/20 p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] w-64 relative backdrop-blur-xl">
                    <button 
                        onClick={() => setActiveOrb(null)}
                        className="absolute -top-2 -right-2 bg-black border border-white/20 rounded-full p-1.5 text-white hover:bg-white hover:text-black transition shadow-lg"
                    >
                        <X size={12} />
                    </button>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: activeOrb.color, boxShadow: `0 0 15px ${activeOrb.color}` }}></div>
                        <h4 className="text-white font-bold font-mono text-sm uppercase tracking-widest">{activeOrb.label}</h4>
                    </div>
                    <div className="mb-4">
                        <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-1">Contribución Biológica</p>
                        <p className="text-gray-200 text-[11px] font-light leading-relaxed">{activeOrb.contribution}</p>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                        <div className="flex items-center gap-1.5 text-gennova-gold">
                            <Activity size={10} />
                            <span className="text-[8px] font-mono uppercase tracking-tighter">Optimización Activa</span>
                        </div>
                        <ArrowRight size={12} className="text-gray-600" />
                    </div>
                </div>
            </div>
        )}
    </>
  );
};

export default VitaminOrbs;
