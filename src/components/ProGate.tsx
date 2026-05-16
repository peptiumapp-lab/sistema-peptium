import React from 'react';
import { motion } from 'motion/react';
import { Lock, Crown, ArrowLeft, Zap, Shield, Target, Check, ShieldAlert } from 'lucide-react';

interface ProGateProps {
  onBack: () => void;
  onUpgrade: () => void;
  title: string;
}

export default function ProGate({ onBack, onUpgrade, title }: ProGateProps) {
  return (
    <div className="py-24 px-4 flex flex-col items-center justify-center text-center space-y-12 max-w-4xl mx-auto">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/30 hover:text-accent transition-all mx-auto group"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
        Voltar para a Home
      </button>

      <div className="relative">
        <div className="w-24 h-24 rounded-3xl bg-accent/10 border border-accent/20 flex items-center justify-center relative backdrop-blur-xl">
          <div className="absolute inset-0 bg-accent/20 blur-2xl rounded-full scale-150 opacity-50" />
          <ShieldAlert size={48} className="text-accent relative z-10" />
        </div>
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-accent rounded-full blur-[60px]"
        />
      </div>

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-black text-[9px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(0,229,255,0.3)]">
          <Crown size={12} /> Assinatura Prime Necessária
        </div>
        <h2 className="text-4xl md:text-5xl font-sans font-black tracking-tighter text-white uppercase italic leading-[0.9]">
          ACESSO <span className="text-accent">RESTRITO:</span> <br/>
          <span className="opacity-90">{title}</span>
        </h2>
        <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] max-w-md mx-auto leading-relaxed italic">
          Esta ferramenta utiliza nossa rede neural de dados exclusivos. <br/>
          <span className="text-white opacity-80">Torne-se um membro Prime para desbloquear a inteligência molecular completa.</span>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-left border-y border-white/5 py-8 w-full max-w-2xl">
        {[
          'Motor de Precisão (Calculadora)',
          'Algoritmo de IA Molecular',
          'Atlas com 150+ Compostos',
          'Protocolos de Recomposição',
          'Monitor de Interações Críticas',
          'Suporte Prioritário via E-mail'
        ].map((feature, i) => (
          <div key={i} className="flex items-center gap-3 text-[10px] font-black text-white/50 uppercase tracking-widest">
            <Check size={14} className="text-accent shrink-0" /> {feature}
          </div>
        ))}
      </div>

      <div className="space-y-6 w-full max-w-sm">
        <button 
          onClick={onUpgrade}
          className="w-full py-5 bg-accent text-black rounded-2xl font-black text-xs uppercase tracking-[0.4em] transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_50px_rgba(0,229,255,0.2)] hover:bg-white"
        >
          Seja Peptium Prime
        </button>
        <div className="text-white/20 text-[9px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2">
            <Shield size={10} /> Pagamento 100% Seguro & Criptografado
        </div>
      </div>
    </div>
  );
}
