import React, { useState, useEffect } from 'react';
import { PeptideDossier } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, ShieldAlert, Sparkles, Loader2, Target, ShieldCheck } from 'lucide-react';

interface StackAnalysisProps {
  selectedPeptides: PeptideDossier[];
  onAddRequest?: () => void;
}

interface AnalysisData {
  score: number;
  compatibility: string;
  synergySummary: string;
  receptorSynergy: string;
  redFlags: string[];
  mitigationMatrix: string[];
  advice: string;
}

export default function StackAnalysis({ selectedPeptides, onAddRequest }: StackAnalysisProps) {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasAttempted, setHasAttempted] = useState(false);

  // Reset state when selection changes materially
  useEffect(() => {
    setAnalysis(null);
    setError(null);
    setHasAttempted(false);
  }, [selectedPeptides.length, selectedPeptides.map(p => p.id).join(',')]);

  const fetchAnalysis = async () => {
    if (selectedPeptides.length < 2) return;
    
    setHasAttempted(true);
    setLoading(true);
    setError(null);
    try {
      console.log('Auditando sinergia molecular para:', selectedPeptides.map(p => p.name));
      const response = await fetch('/api/analyze-stack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ peptides: selectedPeptides }),
      });

      const body = await response.json().catch(() => ({}));

      if (!response.ok || !body.success) {
        throw new Error(body.error?.message || body.error?.details || 'Falha na análise neural Atlas.');
      }
      
      console.log('Audit Atlas concluído:', body.data);
      setAnalysis(body.data);
    } catch (err: any) {
      setError(err.message || 'Erro crítico na conexão neural molecular.');
      console.error('Stack Analysis Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (selectedPeptides.length < 2) {
    return (
      <div className="mt-16 p-10 border-2 border-dashed border-accent/20 rounded-[40px] text-center bg-accent/5 backdrop-blur-sm">
        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 text-accent/40">
          <Target size={24} />
        </div>
        <p className="text-white/60 text-xs font-black uppercase tracking-[0.2em]">
          Aguardando composição de Stack...
        </p>
        <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest mt-2">
          Adicione pelo menos 2 compostos para ativar o Auditor de Sinergia IA
        </p>
      </div>
    );
  }

  return (
    <div className="mt-16 w-full max-w-5xl mx-auto space-y-8 pb-32">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="h-px w-32 bg-gradient-to-r from-transparent to-accent" />
        <h3 className="text-2xl md:text-3xl font-black text-secondary uppercase tracking-tight italic flex items-center gap-4">
          <div className="relative">
            <Zap size={28} className="text-accent fill-accent" />
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-accent rounded-full -z-10 blur-xl" 
            />
          </div>
          Bio-Sinergia <span className="text-accent">Advanced Audit</span>
        </h3>
        <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.4em]">Auditado por Atlas Neural Engine v3.1</p>
      </div>

      <AnimatePresence mode="wait">
        {!hasAttempted && !loading ? (
          <motion.div
            key="preparation"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="bg-black/40 border-2 border-white/15 rounded-[48px] p-8 md:p-16 backdrop-blur-3xl relative overflow-hidden group shadow-2xl">
               {/* Animated Background Grid */}
               <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
                    style={{ backgroundImage: 'linear-gradient(var(--color-accent) 1px, transparent 1px), linear-gradient(90deg, var(--color-accent) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
               
               <div className="flex flex-col items-center gap-12 relative z-10">
                  <div className="space-y-6 text-center">
                    <div className="px-4 py-1 bg-accent/10 border border-accent/20 rounded-full inline-block">
                      <span className="text-accent font-black text-[10px] uppercase tracking-[0.3em]">Ambiente de Engenharia de Precisão</span>
                    </div>
                    <h4 className="text-white text-3xl font-black uppercase tracking-tighter italic">
                      Bancada de <span className="text-accent">Experimentos Moleculares</span>
                    </h4>
                    
                    <p className="text-white/60 text-xs font-medium leading-relaxed max-w-xl mx-auto uppercase tracking-wide">
                      Crie qualquer protocolo customizado. O motor Atlas processará sua combinação única em busca de sinergias bioquímicas, quebras de homeostase ou riscos sistêmicos.
                    </p>
                  </div>

                 {/* Laboratory Workbench Visualization */}
                 <div className="w-full flex flex-wrap justify-center gap-4 bg-white/[0.02] p-8 rounded-[40px] border border-white/15">
                   {selectedPeptides.map((p, idx) => (
                     <motion.div
                       key={p.id}
                       initial={{ scale: 0.8, opacity: 0 }}
                       animate={{ scale: 1, opacity: 1 }}
                       transition={{ delay: idx * 0.1 }}
                       className="px-8 py-5 bg-black/60 border-2 border-accent/20 rounded-2xl flex items-center gap-4 hover:border-accent shadow-xl transition-all"
                     >
                        <div className="p-2 bg-accent/10 rounded-xl">
                          <Zap size={16} className="text-accent" />
                        </div>
                        <div className="flex flex-col items-start">
                          <span className="text-white font-black text-[10px] uppercase tracking-widest">{p.name}</span>
                          <span className="text-accent/50 text-[8px] font-bold uppercase tracking-tighter">Conexão Ativa</span>
                        </div>
                     </motion.div>
                   ))}
                   
                   <motion.button 
                     onClick={onAddRequest}
                     animate={{ opacity: [0.2, 0.5, 0.2] }}
                     transition={{ duration: 2, repeat: Infinity }}
                     className="px-8 py-5 border-2 border-dashed border-white/20 rounded-2xl flex items-center justify-center min-w-[200px] hover:border-accent/40 transition-colors group/add"
                   >
                      <span className="text-white/60 group-hover:text-accent font-black text-[10px] uppercase tracking-widest">+ Integrar Molécula</span>
                   </motion.button>
                 </div>

                 <div className="flex flex-col items-center gap-6">
                    <button
                      onClick={fetchAnalysis}
                      className="group relative px-20 py-8 bg-accent rounded-[32px] overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_40px_80px_rgba(0,229,255,0.25)] hover:shadow-[0_40px_100px_rgba(0,229,255,0.4)]"
                    >
                      <div className="absolute inset-0 bg-white/40 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                      <div className="relative flex items-center gap-4">
                        <ShieldCheck size={28} className="text-black group-hover:rotate-12 transition-transform" />
                        <span className="text-black font-black uppercase tracking-[0.3em] text-base italic">Ativar Bio-Auditoria</span>
                      </div>
                    </button>
                    <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.4em]">Processamento Atlas Neural Engine V3.1</p>
                 </div>
               </div>
            </div>
          </motion.div>
        ) : loading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="bg-accent/5 rounded-[48px] p-20 border border-accent/20 flex flex-col items-center justify-center gap-6 backdrop-blur-xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent animate-pulse" />
            <Loader2 size={48} className="text-accent animate-spin" />
            <div className="space-y-2 text-center">
              <p className="text-xs font-black uppercase tracking-[0.5em] text-accent">Analisando Bio-Interações</p>
              <p className="text-[9px] font-bold uppercase tracking-widest text-white/40">Calculando vetores de farmacocinética...</p>
            </div>
          </motion.div>
        ) : analysis ? (
          <motion.div 
            key="analysis"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-4 gap-6"
          >
            {/* Score Card */}
            <div className="lg:col-span-1 bg-black/60 border-2 border-accent/30 rounded-[40px] p-10 flex flex-col items-center justify-center relative overflow-hidden group shadow-[0_0_40px_rgba(0,229,255,0.05)]">
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                 className="absolute -top-10 -right-10 w-40 h-40 bg-accent/5 rounded-full blur-[60px]" 
               />
               
               <div className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] mb-4">Sinergia Atlas</div>
               <div className="text-7xl font-black text-secondary tracking-tighter mb-4 flex items-baseline gap-1">
                 {analysis.score}<span className="text-accent text-3xl font-black">%</span>
               </div>
               
               <div className="w-full h-1 bg-white/10 rounded-full mb-6 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${analysis.score}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-accent shadow-[0_0_15px_#bfff00]"
                  />
               </div>

               <div className="px-6 py-2 bg-accent/20 rounded-2xl text-accent text-[10px] font-black uppercase tracking-widest border border-accent/40 backdrop-blur-md">
                 Grau {analysis.compatibility}
               </div>
            </div>

            {/* Analysis Detail */}
            <div className="lg:col-span-3 bg-white/[0.02] border border-white/20 rounded-[40px] p-10 backdrop-blur-sm relative overflow-hidden">
               <div className="flex items-center justify-between mb-8">
                 <div className="text-accent font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-3">
                   <Target size={16} /> Relatório Técnico Detalhado
                 </div>
                 <div className="text-[9px] text-white/40 font-black uppercase tracking-widest">Hash: #{analysis.score}X-PRIME</div>
               </div>

               <div className="space-y-6">
                 <div className="relative">
                   <span className="absolute -left-6 top-0 text-4xl text-accent/20 font-serif">"</span>
                   <p className="text-secondary font-black text-2xl mb-4 leading-[1.1] tracking-tight italic">
                     {analysis.synergySummary}
                   </p>
                 </div>

                 <div className="space-y-4">
                   <div className="text-accent font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
                     <Zap size={14} /> Sinergia de Receptores
                   </div>
                   <p className="text-white/60 text-sm leading-relaxed font-medium bg-white/[0.01] p-4 rounded-2xl border border-white/15">
                     {analysis.receptorSynergy}
                   </p>
                 </div>

                 <div className="h-px bg-gradient-to-r from-white/10 to-transparent" />

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   <div className="space-y-6">
                     <div className="space-y-4">
                        <div className="text-red-500 font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
                          <ShieldAlert size={14} /> Red-Flags & Colisão de Vias
                        </div>
                        <div className="space-y-2">
                          {analysis.redFlags.map((flag, i) => (
                            <div key={i} className="flex gap-3 text-[10px] text-white/60 font-bold uppercase leading-tight bg-red-500/5 p-3 rounded-xl border border-red-500/10 hover:border-red-500/30 transition-colors">
                              <span className="text-red-500">•</span>
                              {flag}
                            </div>
                          ))}
                        </div>
                     </div>
                     <div className="space-y-4">
                        <div className="text-emerald-400 font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
                          <ShieldCheck size={14} /> Matriz de Mitigação Combinada
                        </div>
                        <div className="space-y-2">
                          {analysis.mitigationMatrix.map((mitigation, i) => (
                            <div key={i} className="flex gap-3 text-[10px] text-white/60 font-bold uppercase leading-tight bg-emerald-500/5 p-3 rounded-xl border border-emerald-500/10 hover:border-emerald-500/30 transition-colors">
                              <span className="text-emerald-400">•</span>
                              {mitigation}
                            </div>
                          ))}
                        </div>
                     </div>
                   </div>
                   <div className="bg-accent shadow-[0_20px_50px_rgba(0,229,255,0.15)] rounded-[32px] p-6 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="text-black font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
                          <Sparkles size={14} /> Matrix Hack
                        </div>
                        <p className="text-sm text-black font-black leading-tight italic">
                          "{analysis.advice}"
                        </p>
                      </div>
                      <div className="mt-6 flex justify-end">
                        <div className="px-3 py-1 bg-black/10 rounded-full text-[8px] font-black text-black uppercase tracking-widest">Dica Elite</div>
                      </div>
                   </div>
                 </div>
               </div>
            </div>
          </motion.div>
        ) : error ? (
           <div className="bg-red-500/5 border-2 border-red-500/20 rounded-[40px] p-12 text-center space-y-6">
              <ShieldAlert size={48} className="text-red-500 mx-auto opacity-50" />
              <div className="space-y-2">
                <p className="text-red-500 text-xs font-black uppercase tracking-[0.3em]">{error}</p>
                <p className="text-white/40 text-[8px] font-mono uppercase tracking-widest leading-relaxed max-w-md mx-auto">
                  Audit Log: "Molecular link failed to establish. Check API Key or connectivity."
                </p>
              </div>
              <button 
                onClick={() => fetchAnalysis()}
                className="px-8 py-3 bg-red-500/10 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-red-500/20 hover:bg-red-500/20 transition-all font-sans"
              >
                Tentar Reconexão Molecular
              </button>
           </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
