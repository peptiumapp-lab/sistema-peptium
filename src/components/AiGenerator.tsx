import React, { useState } from 'react';
import { Shield, Sparkles, Brain, Code2, AlertTriangle, Play, ChevronRight, Activity, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { View } from '../App';

interface ProtocolResponse {
  protocolName: string;
  physiologicalRationale: string;
  coreCompounds: { name: string; action: string }[];
  mitigationMatrix: { risk: string; mitigation: string }[];
  structuralTactics: string;
  receptorSynergy: string;
}

export default function AiGenerator() {
  const [intent, setIntent] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ProtocolResponse | null>(null);
  const [error, setError] = useState('');

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

      const data = await response.json();

      if (data.success) {
        setResult(data.data);
      } else {
        setError(data.error?.message || 'Falha na transmissão neural.');
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

      <div className="bg-[#050505] p-6 lg:p-8 rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden">
        {/* BG Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 blur-[100px] pointer-events-none rounded-full" />
        
        <div className="relative z-10 space-y-6">
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
              <Terminal size={14} className="text-accent" /> Interface Neurolinguística 
            </label>
            <textarea 
              value={intent}
              onChange={(e) => setIntent(e.target.value)}
              placeholder="Exemplo: Quero perder gordura profunda teimosa, reconstruir ligamentos no ombro desgastados e regular meu foco diário."
              className="w-full h-32 bg-white/[0.02] border border-white/10 rounded-2xl p-5 text-sm text-white focus:outline-none focus:border-accent/40 focus:bg-white/[0.04] transition-all resize-none shadow-inner"
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
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center p-8 bg-accent/5 border border-accent/20 rounded-[2rem] glow-surface">
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase mb-4">{result.protocolName}</h3>
            <p className="text-sm text-white/70 leading-relaxed font-medium">
              {result.physiologicalRationale}
            </p>
          </div>

          {/* Grid of Results */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Core Compounds */}
            <div className="space-y-4 bg-white/[0.02] p-6 rounded-[2rem] border border-white/5">
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-accent">
                <Activity size={16} /> Vetores Core (Moléculas Sinergistas)
              </div>
              <div className="space-y-3">
                {result.coreCompounds.map((comp, idx) => (
                  <div key={idx} className="flex flex-col p-4 bg-[#050505] rounded-xl border border-white/5 relative overflow-hidden group">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent/20 group-hover:bg-accent transition-colors" />
                    <span className="font-bold text-white text-sm uppercase tracking-wide">{comp.name}</span>
                    <span className="text-xs text-white/50 mt-1 leading-relaxed">{comp.action}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Synergies & Tactics */}
            <div className="space-y-6">
              <div className="space-y-3 bg-white/[0.02] p-6 rounded-[2rem] border border-white/5">
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-fuchsia-400">
                  <Code2 size={16} /> Sinergia Receptorial
                </div>
                <p className="text-xs text-white/60 leading-relaxed font-medium">
                  {result.receptorSynergy}
                </p>
              </div>

              <div className="space-y-3 bg-white/[0.02] p-6 rounded-[2rem] border border-white/5">
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">
                  <Play size={16} /> Estruturação Tática
                </div>
                <p className="text-xs text-white/60 leading-relaxed font-medium">
                  {result.structuralTactics}
                </p>
              </div>
            </div>

            {/* Mitigation Matrix */}
            <div className="lg:col-span-2 space-y-4 bg-white/[0.02] p-6 rounded-[2rem] border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 w-64 h-64 bg-red-500/10 blur-[100px] pointer-events-none rounded-full" />
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-red-400 relative z-10">
                  <Shield size={16} /> Matriz de Mitigação (Riscos Controlados)
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                  {result.mitigationMatrix.map((item, idx) => (
                    <div key={idx} className="bg-[#050505] p-4 rounded-xl border border-red-500/10 space-y-2">
                       <div className="flex gap-2 text-[10px] font-black text-red-500/80 uppercase tracking-widest items-start">
                         <AlertTriangle size={12} className="shrink-0 mt-0.5" />
                         <span>{item.risk}</span>
                       </div>
                       <p className="text-xs text-emerald-400/90 font-medium leading-relaxed mt-2 p-2 relative bg-emerald-500/5 rounded-lg border border-emerald-500/10">
                         {item.mitigation}
                       </p>
                    </div>
                  ))}
                </div>
            </div>

          </div>
        </motion.div>
      )}
    </div>
  );
}
