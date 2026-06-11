import React, { useState } from 'react';
import { MapPin, Brain, Activity, Heart, Shield, RefreshCw, Zap } from 'lucide-react';

interface BioHackingMapProps {
  isStandalone?: boolean;
}

export default function BioHackingMap({ isStandalone }: BioHackingMapProps) {
  const [activePathway, setActivePathway] = useState<string>('metabolism');

  const pathways = [
    { id: 'metabolism', icon: <Activity size={18} />, label: 'Rotas Metabólicas' },
    { id: 'cognitive', icon: <Brain size={18} />, label: 'Otimização Neural' },
    { id: 'recovery', icon: <RefreshCw size={18} />, label: 'Eixo de Recuperação' },
    { id: 'cardio', icon: <Heart size={18} />, label: 'Saúde Vascular' }
  ];

  return (
    <div className={`space-y-6 ${!isStandalone ? "pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" : ""}`}>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full mb-2">
            <MapPin size={10} className="text-accent" />
            <span className="text-[10px] font-black uppercase tracking-widest text-accent">Satélite de Sistema</span>
          </div>
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic">
            MAPA DE <span className="text-accent">BIO-HACKING</span>
          </h2>
          <p className="text-[10px] text-white/60 font-bold uppercase tracking-[0.3em]">Visão interconectada de rotas biológicas e sinergias</p>
        </div>
      </div>

      <div className="bg-white/10 border border-white/20 rounded-3xl p-6 md:p-10 backdrop-blur-sm relative overflow-hidden">
        {/* Background Grid decorative */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        
        <div className="relative z-10">
          <div className="flex flex-wrap gap-2 mb-10">
            {pathways.map(p => (
              <button 
                key={p.id}
                onClick={() => setActivePathway(p.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl border transition-all ${
                  activePathway === p.id 
                    ? 'bg-accent/10 border-accent/30 text-accent'
                    : 'bg-black/30 border-white/20 text-white/60 hover:bg-white/20 hover:text-white'
                }`}
              >
                {p.icon}
                <span className="text-[10px] font-black uppercase tracking-widest">{p.label}</span>
              </button>
            ))}
          </div>

          <div className="relative aspect-[2/1] md:aspect-[3/1] bg-black/70 border border-white/20 rounded-2xl flex items-center justify-center p-8">
            <div className="text-center max-w-md mx-auto space-y-4">
               <Zap size={32} className="mx-auto text-accent opacity-50" />
               <h3 className="text-2xl font-black italic text-white uppercase">Mapeamento em Atualização</h3>
               <p className="text-xs text-white/50 font-bold uppercase tracking-widest leading-relaxed">
                 O atlas interativo de vias metabólicas está sincronizando novas rotas da literatura científica para 2026. A visualização geo-biológica estará disponível na versão 5.0.
               </p>
            </div>
            
            {/* Mock Nodes pointing to center */}
            <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-accent rounded-full animate-pulse shadow-[0_0_15px_rgba(0,229,255,0.5)]"></div>
            <div className="absolute top-3/4 left-1/3 w-2 h-2 bg-white/40 rounded-full"></div>
            <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-accent/30 flex items-center justify-center rounded-full"><div className="w-1.5 h-1.5 bg-accent rounded-full"></div></div>
            <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-white/20 rounded-full"></div>
            
            {/* SVG Connecting lines mock */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
              <path d="M 25% 25% L 50% 50% L 75% 33%" stroke="currentColor" strokeWidth="1" fill="none" className="text-accent" strokeDasharray="4 4" />
              <path d="M 33% 75% L 50% 50% L 66% 66%" stroke="currentColor" strokeWidth="1" fill="none" className="text-white" strokeDasharray="2 6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
