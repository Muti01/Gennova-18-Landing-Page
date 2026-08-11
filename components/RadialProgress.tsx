
import React from 'react';

interface RadialProgressProps {
  value: number;
  label: string;
  color: string;
  icon?: any;
  size?: number;
  strokeWidth?: number;
}

const RadialProgress: React.FC<RadialProgressProps> = ({
  value,
  label,
  color,
  icon: Icon,
  size = 120,
  strokeWidth = 10
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(100, Math.max(0, value)) / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center relative group" style={{ width: size, height: size }}>
      {/* Ambient Glow Effect */}
      <div 
        className="absolute inset-0 rounded-full blur-2xl opacity-10 transition-all duration-700 group-hover:opacity-30 group-hover:blur-3xl" 
        style={{ backgroundColor: color }}
      ></div>

      <svg width={size} height={size} className="transform -rotate-90 relative z-10">
        {/* Background Circle */}
        <circle
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress Circle */}
        <circle
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset: offset, transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          className="drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]"
        />
      </svg>
      
      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20">
        {Icon && (
            <div className="mb-2 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                <Icon size={size * 0.2} style={{ color }} />
            </div>
        )}
        <span className="font-mono font-bold leading-none tracking-tighter" style={{ fontSize: size * 0.22 }}>
            {value}
        </span>
        <span className="text-[8px] uppercase tracking-[0.2em] text-gray-500 mt-1 font-bold group-hover:text-white transition-colors">
            {label}
        </span>
      </div>
    </div>
  );
};

export default RadialProgress;
