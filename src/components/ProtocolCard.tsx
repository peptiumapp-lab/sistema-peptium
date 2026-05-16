import React from 'react';
import { PeptideDossier } from '../types';
import { ArrowUpRight, Zap } from 'lucide-react';
import { View } from '../App';

interface ProtocolCardProps {
  protocol: PeptideDossier;
  setView: (view: View) => void;
  onClick?: () => void;
}

const ProtocolCard: React.FC<ProtocolCardProps> = ({ protocol, setView, onClick }) => {
  return (
    <div 
      className="group relative glass-card rounded-[16px] overflow-hidden transition-all duration-700 hover:border-accent/30 flex flex-col h-full bg-secondary/[0.02] border border-white/[0.03] cursor-pointer"
      onClick={onClick}
    >
      {/* Prime Badge */}
      <div className="absolute top-3 right-3 z-20 px-2 py-0.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full flex items-center gap-1">
        <Zap size={8} className="text-accent" fill="currentColor" />
        <span className="text-[7px] font-black uppercase tracking-widest text-white">Prime</span>
      </div>

      <div className="relative aspect-[16/8] overflow-hidden">
        <img 
          src={protocol.image} 
          alt={protocol.name}
          className="w-full h-full object-cover grayscale opacity-30 transition-all duration-1000 group-hover:scale-110 group-hover:opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
      </div>
      
      <div className="p-4 flex flex-col flex-grow relative z-10">
        <div className="mb-3">
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="w-[3px] h-[3px] rounded-full bg-accent animate-pulse" />
            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-accent/60 italic">{protocol.tag}</span>
          </div>
          <h3 className="text-sm font-bold font-sans text-secondary tracking-tight leading-tight uppercase">{protocol.name}</h3>
        </div>
        
        <p className="text-secondary/40 text-[9px] mb-4 leading-relaxed font-medium uppercase tracking-widest line-clamp-3">
          {protocol.description}
        </p>
        
        <div className="mt-auto">
          <button 
            onClick={() => setView('library')}
            className="group/btn w-full py-2 bg-white/[0.03] border border-white/5 rounded-[8px] transition-all flex items-center justify-center gap-1.5 font-bold text-[8px] uppercase tracking-[0.2em] text-secondary/60 hover:text-white hover:bg-accent hover:border-accent shadow-xl active:scale-[0.98]"
          >
            Ver Detalhes
            <ArrowUpRight size={12} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProtocolCard;
