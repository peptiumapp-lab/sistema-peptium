import React, { useState } from 'react';
import { Shield, Sparkles, Brain, Code2, AlertTriangle, Play, ChevronRight, Activity, Terminal, CheckCircle2, Clock, Calendar, Save, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { View } from '../App';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

interface ProtocolResponse {
  protocolName: string;
  physiologicalRationale: string;
  cycleDuration: string;
  directAdvantages: string[];
  coreCompounds: { name: string; action: string; initialDose: string; maintenanceDose: string; bestTime: string }[];
  mitigationMatrix: { risk: string; mitigation: string }[];
  structuralTactics: string;
  receptorSynergy: string;
  applicationManual: string;
}

export default function AiGenerator() {
  const [intent, setIntent] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ProtocolResponse | null>(null);
  const [error, setError] = useState('');
  
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const saveToVault = async () => {
    if (!user || !result) return;
    
    setIsSaving(true);
    try {
      await addDoc(collection(db, 'protocols'), {
        userId: user.uid,
        protocolName: result.protocolName,
        data: result,
        createdAt: serverTimestamp()
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setError(`Erro ao salvar no cofre: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const generateProtocol = async () => {
    if (!intent.trim()) {
      setError('Descreva um objetivo clínico.');
      return;
    }
    
    setError('');
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/protocol-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ intent })
      });

      const data = await response.json().catch(() => ({}));

      if (data.success) {
        setResult(data.data);
      } else {
        setError(data.error?.message || 'Falha na transmissão neural. Tente novamente.');
      }
    } catch (err) {
      setError('Erro de conexão com o banco de dados principal.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full">
          <Brain size={12} className="text-accent" />
          <span className="text-[10px] font-black uppercase tracking-widest text-accent">Atlas AI Builder v4.0</span>
        </div>
        
        <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none flex flex-col gap-2">
          Gerador Semântico de
          <span className="text-accent">Protocolos IA</span>
        </h2>
        
        <p className="text-white/50 text-xs md:text-sm max-w-2xl mx-auto font-medium leading-relaxed">
          O motor Atlas Neural avalia sua linguagem natural contra mais de 564 biomoléculas 
          e compila um dossiê de alta sinergia e mitigação inteligente para alvos extremos.
        </p>
      </div>

      <div className="bg-[#050505] p-6 lg:p-8 rounded-[2rem] border border-white/15 shadow-2xl relative overflow-hidden">
        {/* BG Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 blur-[100px] pointer-events-none rounded-full" />
        
        <div className="relative z-10 space-y-6">
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 flex items-center gap-2">
              <Terminal size={14} className="text-accent" /> Interface Neurolinguística 
            </label>
            <textarea 
              value={intent}
              onChange={(e) => setIntent(e.target.value)}
              placeholder="Exemplo: Quero perder gordura profunda teimosa, reconstruir ligamentos no ombro desgastados e regular meu foco diário."
              className="w-full h-32 bg-white/[0.02] border border-white/20 rounded-2xl p-5 text-sm text-white focus:outline-none focus:border-accent/40 focus:bg-white/[0.04] transition-all resize-none shadow-inner"
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
                <AlertTriangle size={16} className="text-red-500 mt-0.5" />
                <p className="text-xs font-bold text-red-500">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={generateProtocol}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-5 bg-gradient-to-r from-accent to-accent/80 hover:from-white hover:to-white text-black rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all disabled:opacity-50 group hover:shadow-[0_0_30px_rgba(0,229,255,0.4)]"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-4 h-4 border-2 border-black border-r-transparent rounded-full animate-spin" />
                Sintetizando...
              </div>
            ) : (
              <>
                <Sparkles size={16} className="group-hover:text-accent transition-colors" />
                Gerar Protocolo Tático
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </div>

      {result && (
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-white/20 rounded-[2.5rem] p-6 lg:p-10 relative mt-8 pt-12"
        >
          {/* Header Badge */}
          <div className="absolute top-0 right-10 transform -translate-y-1/2">
            <div className="bg-accent text-primary px-3 py-1 flex items-center gap-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-accent/20 shadow-[0_0_15px_rgba(0,229,255,0.3)]">
              <Sparkles size={12}/> Gerado por IA
            </div>
          </div>

          <div className="space-y-12">
            
            {/* Title Section */}
            <div className="text-center space-y-4">
              <h3 className="text-2xl md:text-4xl font-black text-white italic tracking-tighter uppercase mb-4 leading-tight">
                {result.protocolName}
              </h3>
            </div>

            {/* Vantagens Diretas */}
            <div className="border border-white/15 rounded-[1.5rem] p-6 lg:p-8 bg-white/[0.02]">
              <div className="flex items-center gap-2 text-accent text-xs font-black uppercase tracking-widest mb-6">
                <Sparkles size={16}/> Vantagens Diretas
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {result.directAdvantages.map((adv, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-accent shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-white/90 leading-tight">{adv}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Racionalidade Fisiológica */}
            <div className="space-y-4 px-2">
              <div className="flex items-center gap-2 text-accent text-xs font-black uppercase tracking-widest">
                <Brain size={16} /> Racionalidade Fisiológica
              </div>
              <p className="text-sm text-white/80 leading-relaxed font-medium">
                {result.physiologicalRationale}
              </p>
              <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-xl text-accent text-xs font-black uppercase tracking-widest">
                <Calendar size={14} /> Duração: {result.cycleDuration}
              </div>
            </div>

            {/* Core Compounds Setup */}
            <div className="space-y-6 pt-6">
               <div className="flex items-center gap-2 text-white text-sm font-black uppercase tracking-widest mb-6 border-b border-white/15 pb-4">
                  <Activity className="text-accent" size={18}/> Matriz de Compostos Core
               </div>
               
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {result.coreCompounds.map((comp, idx) => (
                     <div key={idx} className="p-6 rounded-[2rem] border border-white/20 bg-[#050505] flex flex-col hover:border-accent/30 transition-all">
                        <h4 className="text-xl font-black text-accent uppercase italic tracking-tighter mb-2">{comp.name}</h4>
                        <div className="inline-block border border-white/20 text-white/50 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded mb-4 w-fit">
                           {comp.name.toLowerCase()}
                        </div>
                        <p className="text-xs text-white/70 mb-6 flex-grow">{comp.action}</p>
            
                        <div className="mt-auto border border-white/15 rounded-xl p-4 bg-white/[0.02] space-y-3">
                           <div className="flex justify-between items-center pb-3 border-b border-white/15">
                              <span className="text-[10px] uppercase tracking-widest text-white/60 font-bold">Dose Inicial</span>
                              <span className="text-xs font-bold text-white text-right ml-4">{comp.initialDose}</span>
                           </div>
                           <div className="flex justify-between items-center pb-3 border-b border-white/15">
                              <span className="text-[10px] uppercase tracking-widest text-white/60 font-bold">Dose Manutenção</span>
                              <span className="text-xs font-bold text-accent text-right ml-4">{comp.maintenanceDose}</span>
                           </div>
                           <div className="flex justify-between items-center pt-1">
                              <span className="text-[10px] uppercase tracking-widest text-white/60 font-bold flex items-center gap-1 shrink-0"><Clock size={12}/> Horário</span>
                              <span className="text-[10px] font-medium text-white/80 max-w-[200px] text-right">{comp.bestTime}</span>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* Sinergia & Táticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              <div className="space-y-4 px-2">
                <div className="flex items-center gap-2 text-fuchsia-400 text-xs font-black uppercase tracking-widest">
                  <Code2 size={16} /> Sinergia Receptorial
                </div>
                <p className="text-xs md:text-sm text-white/60 leading-relaxed font-medium">
                  {result.receptorSynergy}
                </p>
              </div>
              <div className="space-y-4 px-2">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-black uppercase tracking-widest">
                  <Play size={16} /> Estruturação Tática
                </div>
                <p className="text-xs md:text-sm text-white/60 leading-relaxed font-medium">
                  {result.structuralTactics}
                </p>
              </div>
            </div>

            {/* Matriz de Mitigação */}
            <div className="space-y-6 pt-8">
               <div className="flex items-center gap-2 text-white text-sm font-black uppercase tracking-widest mb-6 border-b border-white/15 pb-4">
                  <Shield className="text-orange-500" size={18}/> Matriz de Mitigação
               </div>
               
               <div className="space-y-4">
                  {result.mitigationMatrix.map((item, idx) => (
                     <div key={idx} className="flex flex-col md:flex-row items-start md:items-center p-5 rounded-xl border border-orange-500/20 bg-[#050505] gap-4 hover:border-orange-500/40 transition-colors">
                         <div className="md:w-1/3 lg:w-1/4 space-y-1">
                             <div className="text-[10px] md:text-xs font-black uppercase text-orange-500 tracking-widest">
                                Risco: {item.risk}
                             </div>
                             <div className="text-[8px] md:text-[10px] text-white/30 uppercase tracking-widest font-bold">
                                Manejo Inteligente
                             </div>
                         </div>
                         <div className="text-accent shrink-0 hidden md:flex items-center">
                             <ChevronRight size={16} className="-mr-2 text-accent/50"/>
                             <ChevronRight size={16} className="text-accent"/>
                         </div>
                         <div className="md:w-2/3 lg:w-3/4">
                             <p className="text-xs md:text-sm text-white/90 font-medium leading-relaxed">
                                {item.mitigation}
                             </p>
                         </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* Manual Tático de Aplicação */}
            {result.applicationManual && (
               <div className="space-y-6 pt-8 border-t border-white/15 mt-8">
                  <div className="flex items-center gap-2 text-white text-sm font-black uppercase tracking-widest mb-6 pb-4">
                     <AlertTriangle className="text-fuchsia-500" size={18}/> Manual Prático de Aplicação
                  </div>
                  
                  <div className="bg-gradient-to-br from-fuchsia-900/20 to-[#050505] border border-fuchsia-500/20 rounded-2xl p-6 lg:p-8">
                     <p className="text-sm font-medium text-white/80 leading-relaxed whitespace-pre-line">
                        {result.applicationManual}
                     </p>
                  </div>
               </div>
            )}

            {/* Ações / Cofre */}
            {user && (
               <div className="pt-8 mt-8 border-t border-white/15 flex flex-col md:flex-row justify-center md:justify-end gap-4">
                  <button 
                     onClick={saveToVault}
                     disabled={isSaving || saveSuccess}
                     className="px-6 py-4 flex items-center justify-center gap-2 font-black uppercase tracking-widest text-xs rounded-xl bg-accent text-black hover:bg-white hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                     {isSaving ? (
                        <div className="w-4 h-4 border-2 border-black border-r-transparent rounded-full animate-spin" />
                     ) : saveSuccess ? (
                        <>
                           <Check size={16} /> Salvo no Cofre 
                        </>
                     ) : (
                        <>
                           <Save size={16} /> Salvar no Cofre
                        </>
                     )}
                  </button>
               </div>
            )}
            {!user && (
               <div className="pt-8 mt-8 border-t border-white/15 text-center">
                  <p className="text-xs text-white/50 uppercase tracking-widest font-bold">Autentique-se para salvar no Cofre Atlas</p>
               </div>
            )}

          </div>
        </motion.div>
      )}
    </div>
  );
}
