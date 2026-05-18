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
      role="button"
      className="group relative glass-card rounded-[20px] overflow-hidden transition-all duration-700 hover:border-accent/30 flex flex-col h-full bg-[#080808] border border-white/[0.03] cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img 
          src={protocol.image} 
          alt={protocol.name}
          className="w-full h-full object-cover grayscale opacity-20 transition-all duration-1000 group-hover:scale-110 group-hover:opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
        
        {/* Prime Brand Badge - Fixed position at top-right */}
        <div className="absolute top-2.5 right-2.5 flex gap-2 z-20 pointer-events-none">
           <div className="px-1 py-0.5 bg-black/40 backdrop-blur-sm border border-white/5 rounded flex items-center gap-1">
             <Zap size={6} className="text-secondary/30" />
             <span className="text-[5px] font-black uppercase tracking-[0.1em] text-secondary/30">PRIME</span>
           </div>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow relative z-10">
        <div className="mb-3">
          <div className="flex items-center gap-1.5 mb-1.5 opacity-40">
            <div className="w-1 h-1 rounded-full bg-accent" />
            <span className="text-[7px] font-black uppercase tracking-[0.2em] italic">{protocol.tag}</span>
          </div>
          <h3 className="text-[13px] font-black font-sans text-white tracking-tight leading-tight uppercase group-hover:text-accent transition-colors italic">{protocol.name}</h3>
        </div>
        
        <p className="text-white/20 text-[8px] mb-4 leading-relaxed font-bold uppercase tracking-widest line-clamp-2">
          {protocol.description}
        </p>
        
        <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between">
          <span className="text-[7px] font-black text-accent uppercase tracking-widest">Acessar Dossiê</span>
          <ArrowUpRight size={12} className="text-accent/40 group-hover:text-accent transition-all" />
        </div>
      </div>
    </div>
  );
};

export default ProtocolCard;
