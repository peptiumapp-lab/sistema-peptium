import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, Zap, Activity, Brain, Shield, ChevronRight, ArrowLeft, Beaker, CheckCircle2 } from 'lucide-react';

type Goal = 'hypertrophy' | 'longevity' | 'recovery' | 'fat-loss';

interface Question {
  id: number;
  text: string;
  options: {
    id: string;
    label: string;
    icon: any;
    desc: string;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "QUAL SEU BIO-OBJETIVO PRINCIPAL?",
    options: [
      { id: 'hypertrophy', label: 'Hipertrofia Atômica', icon: Target, desc: 'Aumento de massa magra e densidade muscular.' },
      { id: 'longevity', label: 'Longevidade Radical', icon: Shield, desc: 'Otimização telomérica e antienvelhecimento.' },
      { id: 'recovery', label: 'Recuperação Neural', icon: Brain, desc: 'Foco, cognição e reparo do sistema nervoso.' },
      { id: 'fat-loss', label: 'Lipólise Acelerada', icon: Zap, desc: 'Queima de gordura e otimização metabólica.' }
    ]
  },
  {
    id: 2,
    text: "NÍVEL DE EXPERIÊNCIA BIOHACKING?",
    options: [
      { id: 'novice', label: 'Iniciante / Setup', icon: Activity, desc: 'Primeiro contato com otimização hormonal.' },
      { id: 'inter', label: 'Intermediário / Core', icon: Activity, desc: 'Já utiliza suplementação básica e dieta.' },
      { id: 'advanced', label: 'Avançado / Elite', icon: Activity, desc: 'Experiência com stacks complexos e exames.' }
    ]
  }
];

export default function AtlasMatch() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSelect = (questionId: string, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setIsAnalyzing(true);
      setTimeout(() => setStep(QUESTIONS.length), 2500);
    }
  };

  if (isAnalyzing && step < QUESTIONS.length) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center space-y-8 bg-black/40 backdrop-blur-3xl rounded-[48px] border border-white/5 p-12">
        <div className="relative">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 border-2 border-accent/20 rounded-full flex items-center justify-center"
          >
            <div className="w-24 h-24 border-t-2 border-accent rounded-full animate-pulse" />
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Beaker className="text-accent animate-bounce" size={32} />
          </div>
        </div>
        <div className="text-center space-y-2">
            <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">Sincronizando Dados Biométricos</h3>
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em]">Cruzando com a Database Peptium Prime...</p>
        </div>
      </div>
    );
  }

  if (step === QUESTIONS.length) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-accent/10 to-transparent backdrop-blur-3xl rounded-[48px] border border-accent/20 p-12 overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Target size={120} className="text-accent" />
        </div>

        <div className="relative z-10 space-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent text-black rounded-full text-[9px] font-black uppercase tracking-widest">
            Resultado do Algoritmo Atlas
          </div>
          
          <div className="space-y-4">
            <h2 className="text-4xl font-sans font-black text-white italic uppercase leading-none tracking-tighter">
              SEU PROTOCOLO <br />
              <span className="text-accent">MIMETIZADOR ELITE</span>
            </h2>
            <p className="max-w-md text-xs font-bold text-white/40 uppercase tracking-widest leading-relaxed">
              Com base no seu perfil de {answers[1]} e nível {answers[2]}, identificamos uma curva de resposta ideal com o seguinte Stack Prime:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {[
               { name: 'Core Base', value: 'BPC-157 Alpha' },
               { name: 'Metabolic Key', value: 'MOTS-c Prime' },
               { name: 'Neural Gate', value: 'Selank Elite' }
             ].map((item, i) => (
               <div key={i} className="p-6 bg-black/40 border border-white/5 rounded-3xl flex items-center justify-between group hover:border-accent/40 transition-all">
                  <div className="space-y-1">
                    <div className="text-[8px] font-black text-white/20 uppercase tracking-widest">{item.name}</div>
                    <div className="text-sm font-black text-white uppercase">{item.value}</div>
                  </div>
                  <ChevronRight size={16} className="text-accent group-hover:translate-x-1 transition-transform" />
               </div>
             ))}
          </div>

          <button 
            onClick={() => document.getElementById('planos-vendas')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full py-6 bg-accent text-black rounded-2xl font-black text-[12px] uppercase tracking-[0.4em] shadow-2xl shadow-accent/20 hover:scale-[1.02] active:scale-95 transition-all"
          >
            Acessar Protocolo Completo
          </button>
        </div>
      </motion.div>
    );
  }

  const currentQuestion = QUESTIONS[step];

  return (
    <div className="bg-white/[0.02] backdrop-blur-3xl rounded-[48px] border border-white/5 p-12 min-h-[500px] flex flex-col">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-4">
          {step > 0 && (
            <button onClick={() => setStep(step - 1)} className="p-3 bg-white/5 border border-white/10 rounded-2xl text-white/40 hover:text-white transition-colors">
              <ArrowLeft size={16} />
            </button>
          )}
          <div className="space-y-1">
            <div className="text-[8px] font-black text-accent uppercase tracking-[0.4em]">Scan em Progresso</div>
            <div className="flex gap-1">
              {QUESTIONS.map((_, i) => (
                <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i <= step ? 'w-8 bg-accent' : 'w-2 bg-white/10'}`} />
              ))}
            </div>
          </div>
        </div>
        <div className="text-[10px] font-black text-white/20 uppercase tracking-widest italic font-sans">Atlas Match v5.4</div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="flex-grow space-y-10"
        >
          <h2 className="text-3xl font-sans font-black text-white italic uppercase tracking-tighter leading-tight">
            {currentQuestion.text}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((opt) => {
              const Icon = opt.icon;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(String(currentQuestion.id), opt.id)}
                  className="group relative p-6 bg-white/[0.03] border border-white/5 rounded-3xl text-left hover:border-accent/40 hover:bg-accent/[0.02] transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-white/20 group-hover:bg-accent group-hover:text-black transition-all">
                      <Icon size={20} />
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-black text-white uppercase tracking-tight group-hover:text-accent transition-colors">{opt.label}</div>
                      <div className="text-[9px] font-bold text-white/30 uppercase tracking-widest leading-relaxed group-hover:text-white/60 transition-colors">{opt.desc}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-12 flex items-center gap-3 text-white/10">
        <CheckCircle2 size={12} />
        <span className="text-[8px] font-bold uppercase tracking-[0.2em]">Criptografia de Dados Bio-Sincronizados Ativa</span>
      </div>
    </div>
  );
}
