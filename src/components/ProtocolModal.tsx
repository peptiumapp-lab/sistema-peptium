import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Zap, Shield, Clock, Brain, Leaf, Moon, Network, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SynergyProtocol, PROTOCOLS } from '../constants';

interface ProtocolModalProps {
  protocol: SynergyProtocol | null;
  onClose: () => void;
  onViewPeptide: (id: string) => void;
  onLoadProtocol?: (ids: string[]) => void;
}

export default function ProtocolModal({ protocol, onClose, onViewPeptide, onLoadProtocol }: ProtocolModalProps) {
  if (!protocol) return null;

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

  // Encontrar os peptídeos completos para exibir detalhes
  const protocolPeptides = protocol.peptides.map(id => {
    return PROTOCOLS.find(p => p.id === id) || { id, name: id, description: 'Detalhes em breve.', tag: 'Peptídeo' };
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-4xl bg-[#050505] border border-white/10 rounded-[40px] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-8 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-accent/5 to-transparent">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                {getIcon(protocol.icon)}
              </div>
              <div>
                <div className="text-[10px] font-black text-accent uppercase tracking-[0.3em] mb-1">{protocol.target}</div>
                <h2 className="text-2xl font-sans font-black text-white uppercase italic tracking-tighter">{protocol.name}</h2>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-8 custom-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Info Column */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h4 className="text-[11px] font-black text-accent uppercase tracking-[0.2em]">Visão Geral da Arquitetura</h4>
                  <p className="text-sm font-bold text-white/60 uppercase tracking-widest leading-relaxed italic">
                    {protocol.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[11px] font-black text-white/20 uppercase tracking-[0.2em]">Duração Recomendada</h4>
                  <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-2xl border border-white/5 w-fit">
                    <Clock size={16} className="text-accent" />
                    <span className="text-xs font-black text-white uppercase tracking-widest">{protocol.duration}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[11px] font-black text-white/20 uppercase tracking-[0.2em]">Benefícios Biológicos</h4>
                  <div className="space-y-3">
                    {protocol.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                        <CheckCircle2 size={16} className="text-accent mt-0.5 shrink-0" />
                        <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest leading-normal">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Peptides Column */}
              <div className="space-y-8">
                <h4 className="text-[11px] font-black text-accent uppercase tracking-[0.2em]">Componentes da Sinergia</h4>
                <div className="space-y-4">
                  {protocolPeptides.map((peptide, i) => (
                    <div 
                      key={peptide.id}
                      className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-accent/30 transition-all group"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1">{peptide.tag}</div>
                          <h5 className="text-sm font-black text-white uppercase tracking-tight group-hover:text-accent transition-colors">{peptide.name}</h5>
                        </div>
                        <button 
                          onClick={() => onViewPeptide(peptide.id)}
                          className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-accent hover:text-black transition-all"
                        >
                          <ArrowRight size={14} />
                        </button>
                      </div>
                      <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest leading-relaxed">
                        {peptide.description?.substring(0, 100)}...
                      </p>
                    </div>
                  ))}
                </div>

                <div className="p-6 rounded-3xl bg-accent/5 border border-accent/20">
                  <p className="text-[9px] font-black text-accent uppercase tracking-[0.2em] leading-relaxed">
                    Aviso: Estes protocolos são baseados em literatura científica de pesquisa. O empilhamento molecular requer monitoramento e ajuste de dosagem individual.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="p-8 border-t border-white/5 bg-black flex flex-col md:flex-row gap-4">
            <button 
              onClick={() => {
                if (onLoadProtocol) {
                  onLoadProtocol(protocol.peptides);
                }
              }}
              className="flex-grow py-5 bg-white text-black rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] hover:bg-accent transition-all shadow-xl shadow-white/5 flex items-center justify-center gap-3"
            >
              <Zap size={16} /> Carregar na Bancada Atlas
            </button>
            <button 
              onClick={() => window.open(`https://wa.me/5561998586862?text=Gostaria de saber mais detalhes sobre o protocolo: ${protocol.name}`, '_blank')}
              className="flex-grow py-5 bg-accent/10 border border-accent/30 text-accent rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] hover:bg-accent/20 transition-all"
            >
              Consultar Suporte Prime
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
