import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, Search, ShieldCheck, Info, ChevronDown, AlertCircle, Zap, ShieldQuestion, ArrowLeft } from 'lucide-react';
import { PROTOCOLS } from '../constants';
import { PeptideDossier, Interaction } from '../types';

interface InteractionVerifierProps {
  setView?: (view: any) => void;
}

export default function InteractionVerifier({ setView }: InteractionVerifierProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeptide, setSelectedPeptide] = useState<PeptideDossier | null>(null);
  const [viewMode, setViewMode] = useState<'single' | 'cross'>('single');

  const filteredPeptides = PROTOCOLS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRiskColor = (risk: Interaction['risk']) => {
    switch (risk) {
      case 'high': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'medium': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case 'low': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      default: return 'text-white/60 bg-white/10 border-white/20';
    }
  };

  return (
    <div className="space-y-12 py-10">
      {setView && (
        <button 
          onClick={() => setView('home')}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-secondary/60 hover:text-accent transition-all group mb-4"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Voltar para a Home
        </button>
      )}

      {/* Header */}
      <div className="space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full">
          <ShieldAlert size={14} className="text-accent" />
          <span className="text-[10px] font-black uppercase tracking-widest text-accent">Misture compostos com segurança</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter italic leading-[0.9]">
          VERIFICADOR DE <span className="text-accent underline decoration-2 underline-offset-8">INTERAÇÕES</span>
        </h2>
        <p className="text-[11px] text-white/60 font-bold uppercase tracking-[0.2em] max-w-xl mx-auto">
          Cruze dados científicos e sinalize riscos — de precaução leve a contraindicação absoluta.
        </p>
      </div>

      {/* Warning Banner */}
      <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-3xl flex gap-4 items-start max-w-3xl mx-auto">
        <AlertCircle className="text-red-500 shrink-0" size={20} />
        <div className="space-y-1">
          <h4 className="text-[10px] font-black text-red-500 uppercase tracking-widest italic">Aviso Importante</h4>
          <p className="text-[9px] text-white/60 font-bold uppercase leading-relaxed tracking-wider">
            Esta ferramenta é apenas informativa. NÃO substitui orientação médica profissional. 
            Sempre consulte seu médico antes de iniciar ou combinar protocolos.
          </p>
        </div>
      </div>

      {/* Main UI */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
        {/* Selection Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <input 
              type="text" 
              placeholder="BUSCAR PEPTÍDEO..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/15 rounded-2xl py-6 pl-16 pr-6 text-xs font-black text-white placeholder:text-white/40 outline-none focus:border-accent/40 transition-all uppercase tracking-widest"
            />
          </div>

          <div className="glass-card rounded-[32px] border-white/15 bg-white/[0.01] overflow-hidden">
            <div className="p-4 border-b border-white/15 font-black text-[9px] text-white/60 uppercase tracking-[0.3em] flex items-center justify-between">
              Resultados ({filteredPeptides.length})
              <ChevronDown size={12} />
            </div>
            <div className="max-h-[400px] overflow-y-auto scrollbar-hide">
              {filteredPeptides.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPeptide(p)}
                  className={`w-full p-6 text-left border-b border-white/15 last:border-0 transition-all group flex items-center justify-between ${
                    selectedPeptide?.id === p.id ? 'bg-accent/10' : 'hover:bg-white/[0.02]'
                  }`}
                >
                  <div>
                    <h4 className={`text-xs font-black uppercase tracking-widest transition-colors ${
                      selectedPeptide?.id === p.id ? 'text-accent' : 'text-white'
                    }`}>
                      {p.name}
                    </h4>
                    <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest">{p.tag}</span>
                  </div>
                  {p.interactions && p.interactions.length > 0 && (
                    <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Interaction Details */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {selectedPeptide ? (
              <motion.div
                key={selectedPeptide.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-6 p-8 rounded-[40px] bg-white/[0.02] border border-white/15">
                  <div className="w-20 h-20 rounded-3xl overflow-hidden grayscale border border-white/20 shrink-0">
                    <img src={selectedPeptide.image} className="w-full h-full object-cover" alt={selectedPeptide.name} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic">{selectedPeptide.name}</h3>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-[8px] font-black text-accent uppercase tracking-widest">
                        {selectedPeptide.tag}
                      </span>
                      {selectedPeptide.interactions && (
                        <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-[8px] font-black text-amber-500 uppercase tracking-widest">
                          {selectedPeptide.interactions.length} Interações Mapeadas
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] pl-2 flex items-center gap-2">
                    <Zap size={12} className="text-accent" /> Matriz de Riscos
                  </h4>
                  
                  {selectedPeptide.interactions && selectedPeptide.interactions.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                      {selectedPeptide.interactions.map((interaction, idx) => (
                        <div 
                          key={idx}
                          className="p-8 rounded-[32px] bg-white/[0.01] border border-white/15 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-white/20 transition-all"
                        >
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <h5 className="text-sm font-black text-white uppercase tracking-widest">{interaction.substance}</h5>
                              <span className={`px-2 py-0.5 rounded-md text-[7px] font-black uppercase tracking-widest border ${getRiskColor(interaction.risk)}`}>
                                Risco {interaction.risk}
                              </span>
                            </div>
                            <p className="text-[10px] text-white/60 font-bold uppercase leading-relaxed tracking-wider italic">
                              "{interaction.warning}"
                            </p>
                          </div>
                          <button className="px-6 py-3 bg-white/10 rounded-xl text-[9px] font-black text-white/40 uppercase tracking-widest hover:bg-white/20 hover:text-white transition-all">
                            Ver EstudoPubMed
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-20 text-center space-y-6 bg-white/[0.01] border border-white/15 border-dashed rounded-[40px]">
                      <div className="w-16 h-16 bg-accent/5 rounded-full flex items-center justify-center mx-auto text-accent">
                        <ShieldCheck size={32} />
                      </div>
                      <div className="space-y-2">
                        <h5 className="text-sm font-black text-white uppercase tracking-widest">Nenhuma Interação Grave Encontrada</h5>
                        <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Este composto possui um perfil de segurança elevado para as substâncias mapeadas.</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-center space-y-6 glass-card rounded-[56px] border-white/15 border-dashed">
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center text-white/10 animate-pulse">
                  <ShieldQuestion size={40} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-white/40 uppercase tracking-tighter">Selecione um Composto</h3>
                  <p className="text-[10px] text-white/10 font-bold uppercase tracking-[0.3em]">Selecione ao lado para ver a matriz de interações</p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-8 pt-10 border-t border-white/15">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <span className="text-[8px] font-black text-white/30 uppercase tracking-widest">Crítico / Não Fazer</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          <span className="text-[8px] font-black text-white/30 uppercase tracking-widest">Atenção / Monitorar</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-400" />
          <span className="text-[8px] font-black text-white/30 uppercase tracking-widest">Moderado / Precaução</span>
        </div>
      </div>
    </div>
  );
}
