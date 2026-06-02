import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Zap, Brain, Moon, Leaf, Network, ArrowRight, ShieldCheck, Clock, Shield, Layers } from 'lucide-react';
import { SYNERGY_PROTOCOLS } from '../constants';
import { SynergyProtocol } from '../types';
import ProtocolModal from './ProtocolModal';

interface SynergySectionProps {
  setView: (view: any) => void;
  onSelectProtocol?: (ids: string[]) => void;
  isStandalone?: boolean;
}

export default function SynergySection({ setView, onSelectProtocol, isStandalone }: SynergySectionProps) {
  const [selectedProtocol, setSelectedProtocol] = useState<SynergyProtocol | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain': return <Brain size={24} />;
      case 'Leaf': return <Leaf size={24} />;
      case 'Moon': return <Moon size={24} />;
      case 'Network': return <Network size={24} />;
      case 'Shield': return <Shield size={24} />;
      default: return <Zap size={24} />;
    }
  };

  const handleViewPeptide = (id: string) => {
    setSelectedProtocol(null);
    // Para simplificar, vamos para a library, mas poderíamos abrir um artigo específico
    setView('library');
  };

  return (
    <section className={`py-24 bg-[#02010a] relative overflow-hidden ${isStandalone ? 'min-h-screen pt-32' : ''}`} id="synergies">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />
      
      {isStandalone && (
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-accent/10 to-transparent pointer-events-none" />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full">
              <Zap size={10} className="text-accent" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent italic">Neural Database v4.2</span>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-4xl md:text-6xl font-sans font-black tracking-tighter text-white uppercase italic leading-[0.8]">
                {isStandalone ? 'BIBLIOTECA DE' : 'PROTOCOLOS DE'} <span className="text-accent">ELITE</span>
              </h2>
              {isStandalone && (
                <p className="text-[12px] md:text-sm text-white/60 font-medium uppercase tracking-[0.2em] italic">
                  Arquitetura de Sinergia Molecular Autorizada
                </p>
              )}
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-6 pt-4">
              <p className="text-white/40 text-[11px] md:text-sm font-bold uppercase tracking-[0.2em] max-w-2xl leading-relaxed italic">
                Descubra os templates mais eficientes testados em campo. <br/>
                <span className="text-white">Clique em um protocolo para ver a composição e carregar na bancada livre.</span>
              </p>
              <div className="h-px flex-grow bg-white/5 md:block hidden" />
              <button 
                onClick={() => setView('stacks')}
                className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3 group hover:bg-accent hover:text-black transition-all shadow-xl"
              >
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent group-hover:bg-black group-hover:text-accent transition-all">
                  <Network size={16} />
                </div>
                <div className="text-left">
                  <span className="block text-[8px] font-black uppercase tracking-widest opacity-40 group-hover:opacity-100 italic">Modo Expert</span>
                  <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                    Bancada Molecular Livre
                  </span>
                </div>
                <ArrowRight size={14} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(isStandalone ? (SYNERGY_PROTOCOLS || []) : (SYNERGY_PROTOCOLS || []).slice(0, 3)).map((protocol, i) => (
            <motion.div
              key={protocol.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="p-6 rounded-[24px] bg-white/[0.02] border border-white/5 hover:border-accent/30 transition-all group relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity">
                {getIcon(protocol.icon)}
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all">
                    {getIcon(protocol.icon)}
                  </div>
                  <div>
                    <div className="text-[8px] font-black text-accent uppercase tracking-[0.3em]">{protocol.target}</div>
                    <h3 className="text-xl font-sans font-black text-white uppercase italic tracking-tighter leading-none">{protocol.name}</h3>
                  </div>
                </div>

                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-relaxed line-clamp-3">
                  {protocol.description}
                </p>

                <div className="space-y-3">
                  <div className="text-[8px] font-black text-white/20 uppercase tracking-widest flex items-center gap-2">
                    <ShieldCheck size={10} className="text-accent" /> Benefícios Chave
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {protocol.benefits && Array.isArray(protocol.benefits) ? protocol.benefits.slice(0, 2).map((benefit, j) => (
                      <span key={j} className="px-3 py-1 bg-white/5 rounded-lg text-[7px] font-black text-white/60 uppercase tracking-widest border border-white/5">
                        {benefit}
                      </span>
                    )) : null}
                    {protocol.benefits && protocol.benefits.length > 2 && (
                      <span className="px-2 py-1 bg-white/5 rounded-lg text-[7px] font-black text-white/40 uppercase tracking-widest">
                        +{protocol.benefits.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2">
                    <Clock size={12} className="text-accent/40" />
                    <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">{protocol.duration}</span>
                  </div>
                  <button 
                    onClick={() => setSelectedProtocol(protocol)}
                    className="flex items-center gap-2 text-[8px] font-black text-accent uppercase tracking-widest group-hover:translate-x-1 transition-transform"
                  >
                    Detalhes <ArrowRight size={10} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {!isStandalone && (
          <div className="mt-12 flex justify-center">
            <button 
              onClick={() => {
                setView('synergies');
                window.scrollTo(0, 0);
              }}
              className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3 group hover:bg-white/10 transition-all shadow-xl"
            >
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all">
                <Layers size={18} />
              </div>
              <div className="text-left">
                <span className="block text-[8px] font-black uppercase tracking-widest opacity-40 italic">Explore Mais</span>
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white">
                  Ver Coleção Completa ({(SYNERGY_PROTOCOLS || []).length})
                </span>
              </div>
              <ArrowRight size={16} className="text-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
            </button>
          </div>
        )}

        <div className="mt-12 p-6 rounded-[24px] bg-gradient-to-r from-accent/10 to-transparent border border-accent/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-lg font-sans font-black text-white uppercase italic tracking-tighter">Precisa de um protocolo personalizado?</h4>
            <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest italic">Acesse o Guided Quiz V2.0 para uma recomendação algorítmica.</p>
          </div>
          <button 
            onClick={() => setView('home')}
            className="px-6 py-3 bg-accent text-black rounded-xl font-black text-[9px] uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-lg shadow-accent/10"
          >
            Iniciar Diagnóstico Molecular
          </button>
        </div>
      </div>

      <ProtocolModal 
        protocol={selectedProtocol} 
        onClose={() => setSelectedProtocol(null)} 
        onViewPeptide={handleViewPeptide}
        onLoadProtocol={(ids) => {
          if (onSelectProtocol) {
            onSelectProtocol(ids);
            setSelectedProtocol(null);
          }
        }}
      />
    </section>
  );
}

