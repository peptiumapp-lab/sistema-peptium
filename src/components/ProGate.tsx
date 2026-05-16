import React from 'react';
import { motion } from 'motion/react';
import { Lock, Crown, ArrowLeft, Zap, Shield, Target, Check } from 'lucide-react';

interface ProGateProps {
  onBack: () => void;
  onUpgrade: () => void;
  title: string;
}

export default function ProGate({ onBack, onUpgrade, title }: ProGateProps) {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-6 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.03)_0%,transparent_100%)]">
      <div className="max-w-xl w-full text-center space-y-12">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/30 hover:text-accent transition-all mx-auto"
        >
          <ArrowLeft size={14} /> Voltar aos Guias
        </button>

        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto text-accent mb-6 relative z-10">
            <Lock size={40} />
          </div>
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 bg-accent rounded-full blur-3xl"
          />
        </div>

        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-primary text-[10px] font-black uppercase tracking-widest">
            <Crown size={12} /> Conteúdo Prime Exclusive
          </div>
          <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none">
            ACESSO RESTRITO: <br />
            <span className="text-accent">{title}</span>
          </h1>
          <p className="text-white/40 text-sm font-medium leading-relaxed max-w-md mx-auto">
            Este manual técnico detalhado faz parte do ecossistema Cortex Prime. Desbloqueie o acesso total a todos os guias, calculadoras e protocolos avançados.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-left">
          {[
            'Protocolos Estruturados',
            'Guias de Aplicação HD',
            'Suporte Bioquímico',
            'Calculadoras de Dose',
            'Acervo de 150+ Peptídeos',
            'Comunidade Exclusiva'
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-2 text-[10px] font-bold text-white/60 uppercase tracking-widest">
              <Check size={12} className="text-accent" /> {feature}
            </div>
          ))}
        </div>

        <div className="space-y-6 pt-8">
          <button 
            onClick={onUpgrade}
            className="w-full py-6 bg-accent text-primary font-black text-[12px] uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(0,229,255,0.2)]"
            style={{ clipPath: 'polygon(5% 0, 100% 0, 100% 70%, 95% 100%, 0 100%, 0 30%)' }}
          >
            Assinar Cortex Prime
          </button>
          <div className="text-white/20 text-[9px] font-bold uppercase tracking-widest">
            A partir de R$ 147/mês • Cancele quando quiser
          </div>
        </div>
      </div>
    </div>
  );
}
