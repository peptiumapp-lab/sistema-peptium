import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Columns3, X, Plus, Zap, Scale, Target, ThermometerSnowflake, Activity, ArrowLeft, Shield } from 'lucide-react';
import { PROTOCOLS } from '../constants';
import { PeptideDossier } from '../types';
import StackAnalysis from './StackAnalysis';

interface PeptideComparatorProps {
  setView?: (view: any) => void;
  initialPeptideIds?: string[];
}

export default function PeptideComparator({ setView, initialPeptideIds = [] }: PeptideComparatorProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(initialPeptideIds);
  const [showSelector, setShowSelector] = useState(false);

  const togglePeptide = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else if (selectedIds.length < 3) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const clearStack = () => setSelectedIds([]);

  const selectedPeptides = selectedIds.map(id => PROTOCOLS.find(p => p.id === id)!).filter(Boolean);

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
      <div className="space-y-8 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Activity size={14} className="text-accent" />
          </motion.div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Atlas Molecular Laboratory</span>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter italic leading-[0.8]">
            MODO <span className="text-accent">SANDBOX</span>
          </h2>
          <p className="text-[12px] md:text-sm text-white/60 font-black uppercase tracking-[0.4em]">Arquitetura Bioquímica de Precisão</p>
        </div>
        
        <p className="text-[12px] md:text-base text-white/50 font-medium leading-relaxed max-w-2xl mx-auto italic">
          Combine moléculas do nosso arsenal para simular sinergias neurais e sistêmicas. Comece com um de nossos <span className="text-white text-bold">Templates de Elite</span> e modifique como desejar.
        </p>

        {/* Templates Quick Access Selector Bar */}
        <div className="pt-6 space-y-4">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-white/10" />
            <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em]">Inicie com um Template de Elite</span>
            <div className="h-px w-12 bg-white/10" />
          </div>
          
          <div className="p-2 bg-white/[0.02] border border-white/15 rounded-[32px] inline-flex flex-wrap justify-center gap-2">
            {[
              { name: "Gut-Brain Reset", ids: ['bpc-157', 'selank', 'akkermat'], icon: "🧠", tag: "Frequente" },
              { name: "Metabolic Overclock", ids: ['retatrutida', '5-amino-1mq', 'tesofensina'], icon: "⚡", tag: "Queima" },
              { name: "Neural Overdrive", ids: ['dihexa', 'semax', 'cerebrolysin'], icon: "🔥", tag: "Foco" },
              { name: "Muscle Genesis", ids: ['follistatin-344', 'igf-1-lr3', 'ipamorelin-cjc'], icon: "💪", tag: "Massa" }
            ].map((template) => (
              <button
                key={template.name}
                onClick={() => setSelectedIds(template.ids)}
                className="px-6 py-3 rounded-[24px] flex items-center gap-3 hover:bg-accent/10 transition-all active:scale-95 group border border-transparent hover:border-accent/30 relative"
              >
                <span className="text-xl group-hover:scale-125 transition-transform">{template.icon}</span>
                <div className="text-left">
                  <span className="block text-[8px] font-black text-accent/60 uppercase tracking-widest">{template.tag}</span>
                  <span className="text-[10px] font-black text-white/80 group-hover:text-white uppercase tracking-widest leading-none">{template.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selector Area / Current Stack */}
      <div className="flex flex-col items-center gap-8 pt-4">
        <div className="flex flex-wrap justify-center gap-4">
          {selectedPeptides.map(p => (
            <button 
              key={p.id}
              onClick={() => togglePeptide(p.id)}
              className="group flex items-center gap-3 px-6 py-4 bg-accent/20 border border-accent/40 rounded-[20px] hover:bg-red-500/10 hover:border-red-500/50 transition-all shadow-xl active:scale-95"
            >
              <div className="w-5 h-5 rounded-full bg-accent text-black flex items-center justify-center group-hover:bg-red-500">
                <X size={10} />
              </div>
              <span className="text-[11px] font-black text-white uppercase tracking-widest">{p.name}</span>
            </button>
          ))}
          {selectedPeptides.length < 3 && (
            <button 
              onClick={() => setShowSelector(true)}
              className="flex items-center gap-3 px-8 py-4 bg-accent border-2 border-accent rounded-[20px] hover:bg-accent/80 transition-all group shadow-[0_0_30px_rgba(0,229,255,0.2)] active:scale-95"
            >
              <Plus size={16} className="text-black group-hover:rotate-90 transition-transform" />
              <span className="text-[11px] font-black text-black uppercase tracking-[0.2em]">Acoplar Molécula</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-8">
          {selectedPeptides.length > 0 && (
            <button 
              onClick={clearStack}
              className="text-[10px] font-black text-red-500/40 uppercase tracking-[0.4em] hover:text-red-500 transition-colors flex items-center gap-2 group"
            >
              <X size={12} className="group-hover:rotate-90 transition-transform" /> Limpar Bancada Molecular
            </button>
          )}
          <div className="h-px w-12 bg-white/10" />
          <div className="text-[8px] font-black text-white/40 uppercase tracking-[0.5em]">Slot {selectedPeptides.length}/3</div>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch auto-rows-fr">
        <AnimatePresence mode="popLayout">
          {selectedPeptides.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-card rounded-[48px] border-white/15 bg-white/[0.01] overflow-hidden flex flex-col group/card"
            >
              <div className="relative h-64">
                <img src={p.image} className="w-full h-full object-cover grayscale opacity-40 group-hover/card:grayscale-0 group-hover/card:opacity-60 transition-all duration-700" alt={p.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />
                
                <button 
                  onClick={() => togglePeptide(p.id)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white/60 hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover/card:opacity-100"
                >
                  <X size={18} />
                </button>

                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <span className="text-[9px] font-black text-accent uppercase tracking-[0.4em]">{p.tag}</span>
                  </div>
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic leading-none">{p.name}</h3>
                </div>
              </div>

              <div className="p-8 space-y-10 flex-grow">
                {/* Mechanism */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-white/60">
                    <Zap size={14} className="text-accent" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Bio-Mecanismo</span>
                  </div>
                  <p className="text-[12px] text-white/70 font-medium leading-relaxed tracking-wide italic">
                    "{p.mechanism || 'Iniciando decodificação de mecanismos intracelulares...'}"
                  </p>
                </div>

                {/* Dosage & Administration */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 rounded-3xl bg-white/[0.03] border border-white/15 space-y-1.5">
                    <span className="text-[8px] font-black text-white/40 uppercase tracking-widest block">Dose Sugerida</span>
                    <span className="text-[11px] font-black text-white uppercase tracking-tight">{p.dosage || 'Analítico'}</span>
                  </div>
                  <div className="p-5 rounded-3xl bg-white/[0.03] border border-white/15 space-y-1.5">
                    <span className="text-[8px] font-black text-white/40 uppercase tracking-widest block">Metodologia</span>
                    <span className="text-[11px] font-black text-accent uppercase tracking-tight">{p.administration || 'Standard'}</span>
                  </div>
                </div>

                {/* Detailed PeptideDossier */}
                <div className="p-6 rounded-3xl bg-accent/5 border border-accent/20 space-y-3">
                  <div className="flex items-center gap-2">
                    <Shield size={12} className="text-accent" />
                    <span className="text-[8px] font-black text-accent uppercase tracking-[0.3em] block">Protocolo Prime Labs</span>
                  </div>
                  <p className="text-[10px] font-bold text-white/80 uppercase tracking-widest leading-loose">
                    {p.protocol || 'Configurando sequenciamento molecular de aplicação...'}
                  </p>
                </div>

                {/* Benefits */}
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Propriedades de Elite</span>
                    <Activity size={14} className="text-accent opacity-20" />
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {p.features.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-center gap-4 bg-white/[0.01] p-3 rounded-2xl border border-white/15">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent/40" />
                        <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Empty Slots */}
          {Array.from({ length: 3 - selectedPeptides.length }).map((_, i) => (
            <motion.button
              key={`empty-${i}`}
              onClick={() => setShowSelector(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-32 rounded-[56px] border-2 border-dashed border-white/15 bg-white/[0.005] hover:bg-white/[0.015] hover:border-accent/20 transition-all group min-h-[600px]"
            >
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center text-white/10 mb-8 group-hover:scale-110 group-hover:bg-accent/10 group-hover:text-accent transition-all duration-500">
                <Plus size={32} />
              </div>
              <h4 className="text-xl font-black text-white/40 uppercase tracking-tighter group-hover:text-white/60 transition-colors">Vaga Disponível</h4>
              <p className="text-[10px] text-white/10 font-bold uppercase tracking-[0.3em] mt-3 group-hover:text-accent/40">Integrar Nova Molécula no Stack</p>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Seção de Análise Automatizada por IA - Agora com mais destaque */}
      <div className="relative pt-12 border-t border-white/15">
        <div className="absolute inset-x-0 -top-24 flex justify-center pointer-events-none">
          <div className="w-1/2 h-48 bg-accent/10 blur-[100px] rounded-full opacity-50" />
        </div>
        <StackAnalysis 
          selectedPeptides={selectedPeptides} 
          onAddRequest={() => setShowSelector(true)} 
        />
      </div>

      {/* Selector Modal */}
      <AnimatePresence>
        {showSelector && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSelector(false)}
              className="absolute inset-0 bg-[#020617]/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-2xl bg-slate-900 border border-white/20 rounded-[48px] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
            >
              <div className="p-10 border-b border-white/15 flex items-center justify-between sticky top-0 bg-slate-900 z-10">
                <div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Selecionar Peptídeo</h3>
                  <p className="text-[9px] text-white/60 font-bold uppercase tracking-widest mt-1">Clique para incluir na comparação</p>
                </div>
                <button 
                  onClick={() => setShowSelector(false)}
                  className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 scrollbar-hide">
                {PROTOCOLS.map(p => (
                  <button
                    key={p.id}
                    disabled={selectedIds.includes(p.id)}
                    onClick={() => {
                      togglePeptide(p.id);
                      setShowSelector(false);
                    }}
                    className={`p-6 rounded-3xl border text-left transition-all flex items-center gap-4 ${
                      selectedIds.includes(p.id) 
                        ? 'opacity-40 grayscale cursor-not-allowed border-white/15' 
                        : 'bg-white/[0.03] border-white/20 hover:border-accent hover:bg-accent/5'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-2xl overflow-hidden shrink-0 border border-white/20">
                      <img src={p.image} className="w-full h-full object-cover" alt={p.name} />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-white uppercase tracking-widest">{p.name}</h4>
                      <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest">{p.tag}</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
