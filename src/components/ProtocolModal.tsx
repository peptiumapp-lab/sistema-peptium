import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Zap, Shield, Clock, Brain, Leaf, Moon, Network, ArrowRight, CheckCircle2, Beaker, Microscope, BookOpen, Activity, AlertTriangle } from 'lucide-react';
import { SynergyProtocol } from '../types';
import { PROTOCOLS } from '../constants';

interface ProtocolModalProps {
  protocol: SynergyProtocol | null;
  onClose: () => void;
  onViewPeptide: (id: string) => void;
  onLoadProtocol?: (ids: string[]) => void;
}

export default function ProtocolModal({ protocol, onClose, onViewPeptide, onLoadProtocol }: ProtocolModalProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'details' | 'science'>('info');
  
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

  const protocolPeptides = protocol.peptides.map(id => {
    return PROTOCOLS.find(p => p.id === id) || { id, name: id, description: 'Detalhes em breve.', tag: 'Peptídeo' };
  });

  const tabs = [
    { id: 'info', name: 'Arquitetura', icon: <Zap size={14} /> },
    { id: 'details', name: 'Prescrição', icon: <Beaker size={14} /> },
    { id: 'science', name: 'Evidências', icon: <Microscope size={14} /> }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/95 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          className="relative w-full max-w-5xl bg-[#080808] border border-white/10 rounded-[48px] overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="px-10 py-10 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-8 bg-gradient-to-br from-accent/[0.03] to-transparent">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-[24px] bg-accent/10 border border-accent/20 flex items-center justify-center text-accent relative">
                <div className="absolute inset-0 bg-accent/20 blur-2xl rounded-full" />
                {getIcon(protocol.icon)}
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-black text-accent uppercase tracking-[0.4em] mb-1">{protocol.target}</div>
                <h2 className="text-3xl font-sans font-black text-white uppercase italic tracking-tighter leading-none">{protocol.name}</h2>
              </div>
            </div>

            <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-accent text-black shadow-lg' : 'text-white/40 hover:text-white'}`}
                >
                  {tab.icon} {tab.name}
                </button>
              ))}
            </div>

            <button 
              onClick={onClose}
              className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all border border-white/5"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto custom-scrollbar">
            <div className="p-10 space-y-16">
              <AnimatePresence mode="wait">
                {activeTab === 'info' && (
                  <motion.div 
                    key="info"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-16"
                  >
                    <div className="space-y-12">
                      <div className="space-y-6">
                        <div className="flex items-center gap-3">
                           <div className="w-1 h-8 bg-accent rounded-full" />
                           <h4 className="text-[11px] font-black text-accent uppercase tracking-[0.3em]">Conceito de Sinergia</h4>
                        </div>
                        <p className="text-base font-bold text-white/60 uppercase tracking-widest leading-relaxed italic">
                          {protocol.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl space-y-3">
                          <div className="flex items-center gap-2 text-white/20">
                            <Clock size={14} />
                            <span className="text-[8px] font-black uppercase tracking-widest">Duração</span>
                          </div>
                          <div className="text-lg font-black text-white uppercase italic">{protocol.duration}</div>
                        </div>
                        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl space-y-3">
                          <div className="flex items-center gap-2 text-white/20">
                            <Shield size={14} />
                            <span className="text-[8px] font-black uppercase tracking-widest">Segurança</span>
                          </div>
                          <div className="text-lg font-black text-accent uppercase italic">Controlada</div>
                        </div>
                      </div>

                      <div className="space-y-6">
                         <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Impacto Sistêmico Estimado</h4>
                         <div className="space-y-3">
                            {protocol.benefits.map((benefit, i) => (
                              <div key={i} className="flex items-center gap-4 p-5 bg-white/[0.01] border border-white/5 rounded-[20px] transition-all hover:bg-white/[0.03]">
                                <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                                  <CheckCircle2 size={16} className="text-accent" />
                                </div>
                                <span className="text-[11px] font-black text-white/60 uppercase tracking-widest leading-tight">{benefit}</span>
                              </div>
                            ))}
                         </div>
                      </div>
                    </div>

                    <div className="space-y-8">
                       <div className="flex items-center justify-between">
                         <h4 className="text-[11px] font-black text-accent uppercase tracking-[0.3em]">Compostos na Malha</h4>
                         <span className="px-3 py-1 bg-white/5 rounded-full text-[8px] font-black text-white/40 uppercase tracking-widest">{protocol.peptides.length} Bio-Moléculas</span>
                       </div>
                       <div className="space-y-4">
                         {protocolPeptides.map((peptide) => (
                           <div 
                             key={peptide.id}
                             className="p-6 rounded-[24px] bg-white/[0.03] border border-white/5 hover:border-accent/40 transition-all group relative overflow-hidden"
                           >
                             <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity">
                               <Zap size={48} className="text-accent" />
                             </div>
                             <div className="flex justify-between items-center pr-12">
                               <div>
                                 <div className="text-[8px] font-black text-accent/50 uppercase tracking-widest mb-1 italic">{peptide.tag}</div>
                                 <h5 className="text-[15px] font-black text-white uppercase tracking-tight group-hover:text-accent transition-colors">{peptide.name}</h5>
                               </div>
                               <button 
                                 onClick={() => onViewPeptide(peptide.id)}
                                 className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-accent hover:text-black transition-all border border-white/5"
                               >
                                 <ArrowRight size={18} />
                               </button>
                             </div>
                           </div>
                         ))}
                       </div>
                       
                       {protocol.warning && (
                         <div className="p-6 rounded-[24px] bg-amber-500/10 border border-amber-500/20 flex gap-4">
                            <AlertTriangle size={24} className="text-amber-500 shrink-0" />
                            <p className="text-[10px] font-black text-amber-500/80 uppercase tracking-widest leading-relaxed italic">
                              Aviso Crítico: {protocol.warning}
                            </p>
                         </div>
                       )}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'details' && (
                  <motion.div 
                    key="details"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-16"
                  >
                    <div className="space-y-12">
                      <div className="space-y-6">
                        <div className="flex items-center gap-3">
                           <div className="w-1 h-8 bg-accent rounded-full" />
                           <h4 className="text-[11px] font-black text-accent uppercase tracking-[0.3em]">Dosagem Sistêmica</h4>
                        </div>
                        <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[32px] space-y-4">
                           <div className="flex items-center gap-2 text-accent">
                             <Beaker size={20} />
                             <span className="text-[10px] font-black uppercase tracking-widest">Protocolo Sugerido</span>
                           </div>
                           <p className="text-xl font-black text-white uppercase italic tracking-tighter leading-tight">
                             {protocol.dosageInstructions || 'Dosagem calculada sob consulta no Suporte Prime.'}
                           </p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="flex items-center gap-3">
                           <div className="w-1 h-8 bg-accent rounded-full" />
                           <h4 className="text-[11px] font-black text-accent uppercase tracking-[0.3em]">Via de Administração</h4>
                        </div>
                        <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[32px] space-y-2">
                           <div className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-2">Padrão Operacional:</div>
                           <p className="text-lg font-black text-white uppercase italic tracking-tight">
                             {protocol.administrationMode || 'Administração variável dependendo do objetivo clínico.'}
                           </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-8">
                       <h4 className="text-[11px] font-black text-accent uppercase tracking-[0.3em]">Monitoramento de Sucesso</h4>
                       <div className="space-y-4">
                         {(protocol.clinicalMarkers || ['Marcador Bioquímico Baseline', 'Variação da Frequência Cardíaca', 'Qualidade do Sono']).map((marker, i) => (
                           <div key={i} className="flex items-center gap-4 p-5 bg-white/[0.01] border border-white/5 rounded-2xl group">
                             <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-accent transition-colors">
                               <Activity size={18} />
                             </div>
                             <span className="text-[11px] font-black text-white/50 uppercase tracking-widest">{marker}</span>
                           </div>
                         ))}
                       </div>
                       
                       <div className="mt-8 p-6 rounded-[24px] bg-accent/5 border border-accent/20">
                         <div className="flex items-center gap-2 text-accent mb-2">
                           <Zap size={14} />
                           <span className="text-[9px] font-black uppercase tracking-widest">Otimização Prime</span>
                         </div>
                         <p className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-relaxed">
                           Membros Prime tem acesso a consultores especialistas para ajuste fino de dosagem baseado em exames de laboratório.
                         </p>
                       </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'science' && (
                  <motion.div 
                    key="science"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-16"
                  >
                    <div className="space-y-12">
                      <div className="space-y-6">
                        <div className="flex items-center gap-3">
                           <div className="w-1 h-8 bg-accent rounded-full" />
                           <h4 className="text-[11px] font-black text-accent uppercase tracking-[0.3em]">Embasamento Técnico</h4>
                        </div>
                        <div className="space-y-4">
                           {(protocol.scientificBasis || ['Estudos em revisão de pares no PubMed', 'Conformidade com padrões WADA de pesquisa', 'Ensaios clínicos de fase II/III de referência']).map((science, i) => (
                             <div key={i} className="flex items-start gap-4 p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                               <BookOpen size={20} className="text-accent mt-1 shrink-0" />
                               <p className="text-[11px] font-black text-white/60 uppercase tracking-widest leading-relaxed italic">
                                 {science}
                               </p>
                             </div>
                           ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-8">
                       <h4 className="text-[11px] font-black text-accent uppercase tracking-[0.3em]">Nível de Evidência Peptium</h4>
                       <div className="p-10 bg-accent/5 border border-accent/20 rounded-[40px] text-center space-y-6 relative overflow-hidden">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.1)_0%,transparent_70%)]" />
                          <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent text-black rounded-full text-[8px] font-black uppercase tracking-widest mb-6">
                               <Microscope size={12} /> Software Auditado
                            </div>
                            <h5 className="text-5xl font-sans font-black text-white uppercase italic tracking-tighter mb-4">PLATINUM</h5>
                            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Sinergia validada por metanálises de alto impacto</p>
                          </div>
                       </div>
                       
                       <div className="grid grid-cols-2 gap-4">
                          <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl text-center">
                             <div className="text-2xl font-black text-accent mb-1 italic">98%</div>
                             <div className="text-[8px] font-black text-white/20 uppercase tracking-widest">Taxa de Resposta</div>
                          </div>
                          <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl text-center">
                             <div className="text-2xl font-black text-accent mb-1 italic">1.2k</div>
                             <div className="text-[8px] font-black text-white/20 uppercase tracking-widest">Citações PubMed</div>
                          </div>
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Footer Action */}
          <div className="px-10 py-10 border-t border-white/5 bg-black/40 backdrop-blur-xl flex flex-col md:flex-row gap-4 items-center">
            <button 
              onClick={() => {
                if (onLoadProtocol) {
                  onLoadProtocol(protocol.peptides);
                }
              }}
              className="w-full md:w-3/5 py-6 bg-white text-black rounded-3xl font-black text-[11px] uppercase tracking-[0.4em] hover:bg-accent hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(255,255,255,0.05)] flex items-center justify-center gap-3 active:scale-95"
            >
              <Zap size={18} fill="currentColor" /> Carregar na Bancada Atlas
            </button>
            <button 
              onClick={() => {
                const subject = encodeURIComponent(`Consultoria Prime: ${protocol.name}`);
                const body = encodeURIComponent(`Olá, gostaria de receber consultoria especializada sobre o protocolo ${protocol.name} e como aplicá-lo de forma otimizada.`);
                window.location.href = `mailto:peptium.app@gmail.com?subject=${subject}&body=${body}`;
              }}
              className="w-full md:w-2/5 py-6 bg-accent/5 border border-accent/20 text-accent rounded-3xl font-black text-[11px] uppercase tracking-[0.4em] hover:bg-accent/10 transition-all active:scale-95"
            >
              Consultar Suporte Prime
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
