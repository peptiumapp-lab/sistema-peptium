import React from 'react';

export function PeptiumLogo({ className = "w-6 h-6", glowing = false }: { className?: string, glowing?: boolean }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {glowing && (
        <div className="absolute inset-0 bg-[#00E5FF] blur-[10px] opacity-40 rounded-full" />
      )}
      <img 
        src="/logo.png" 
        alt="Peptium Logo" 
        className="w-full h-full relative z-10 drop-shadow-[0_0_8px_rgba(0,229,255,0.8)] object-contain" 
      />
    </div>
  );
}
