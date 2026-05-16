import { motion } from 'motion/react';
import { ArrowRight, Shield, Zap, Target, ArrowUpRight, BookOpen, ChevronRight, Activity } from 'lucide-react';
import { TOTAL_PEPTIDES } from '../constants';

interface HeroProps {
  setView: (view: any) => void;
  isPremium?: boolean;
}

export default function Hero({ setView, isPremium }: HeroProps) {
  return (
    <div className="relative pt-12 pb-10 lg:pt-24 lg:pb-16 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-blue-900/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-accent/5 border border-accent/20 mb-10 backdrop-blur-md"
              >
                <div className="relative flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <div className="absolute w-4 h-4 rounded-full bg-accent/30 animate-ping" />
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[13px] font-black tracking-[0.4em] text-accent uppercase">
                    O maior acervo de peptídeos do mundo
                  </span>
                  <div className="h-4 w-[1px] bg-accent/20" />
                  <span className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">
                    Core Intelligence v4.0
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mb-12 flex flex-col items-center"
              >
                <div className="relative group">
                  <div className="absolute -inset-4 bg-accent/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative text-[52px] md:text-[80px] font-black leading-none text-white tracking-[-0.08em] flex items-start gap-1">
                    <span className="text-glow drop-shadow-[0_0_30px_rgba(0,255,194,0.3)] italic">{TOTAL_PEPTIDES}</span>
                    <span className="text-accent text-3xl md:text-5xl mt-2 md:mt-4 animate-pulse">+</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-2 md:mt-4">
                  <div className="w-8 h-[1px] bg-accent/30" />
                  <span className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.5em] text-accent/80">
                    Compostos de Elite
                  </span>
                  <div className="w-8 h-[1px] bg-accent/30" />
                </div>
              </motion.div>

            <h1 className="text-4xl md:text-[64px] font-sans font-black mb-8 leading-[0.85] tracking-tight text-white uppercase italic">
              DECODIFIQUE O CÓDIGO DA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-accent via-white to-accent text-glow">FISIOLOGIA DE ELITE</span>
            </h1>
            
            <p className="max-w-3xl mx-auto text-xs md:text-sm text-white/40 mb-10 font-medium leading-relaxed uppercase tracking-[0.2em]">
              A INSIGHT MOLECULAR QUE TRANSFORMA <span className="text-white">DADOS BRUTOS</span> EM <br />
              <span className="text-accent underline underline-offset-8 decoration-accent/30">PERFORMANCE HUMANA ABSOLUTA.</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => setView('library')}
                className="group relative w-full sm:w-auto px-8 py-4 bg-accent text-black font-black text-[10px] uppercase tracking-[0.3em] overflow-hidden transition-all hover:scale-105 active:scale-95"
                style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <div className="relative z-10 flex items-center justify-center gap-3">
                  <span>Iniciar Operação</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              <button 
                onClick={() => {
                  const pricingElement = document.getElementById('pricing');
                  if (pricingElement) {
                    pricingElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="group w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white/10 hover:border-accent/40 text-white font-black text-[10px] uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2"
                style={{ clipPath: 'polygon(0 0, 90% 0, 100% 30%, 100% 100%, 10% 100%, 0 70%)' }}
              >
                <span className="relative z-10">Níveis de Acesso</span>
                <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform opacity-50" />
              </button>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => setView('guide')}
                className="flex items-center gap-6 p-6 rounded-[32px] bg-secondary/[0.02] border border-white/5 hover:border-accent/40 cursor-pointer transition-all group text-left"
              >
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform shrink-0">
                  <BookOpen size={28} />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-lg font-black text-white italic uppercase tracking-tight">O que são Peptídeos?</h4>
                    <span className="px-2 py-0.5 rounded-full bg-accent text-primary text-[8px] font-black uppercase tracking-widest">Início</span>
                  </div>
                  <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                    Comece por aqui — entenda a ciência, os mecanismos e a revolução na saúde molecular.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-white/20 group-hover:text-accent group-hover:border-accent/40 transition-all shrink-0">
                  <ChevronRight size={20} />
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => setView('stacks')}
                className="flex items-center gap-6 p-6 rounded-[32px] bg-secondary/[0.02] border border-white/5 hover:border-accent/40 cursor-pointer transition-all group text-left"
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform shrink-0">
                  <Activity size={28} />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-lg font-black text-white italic uppercase tracking-tight">Molecular Sandbox</h4>
                    <span className="px-2 py-0.5 rounded-full bg-blue-500 text-white text-[8px] font-black uppercase tracking-widest">Bancada Livre</span>
                  </div>
                  <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                    Combine múltiplas moléculas, simule sinergias e construa sua própria arquitetura de performance.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-white/20 group-hover:text-blue-400 group-hover:border-blue-400/40 transition-all shrink-0">
                  <ChevronRight size={20} />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { icon: <Shield size={24} className="text-accent" />, title: 'BIOTECNOLOGIA', desc: 'Peptídeos com pureza laboratorial superior a 99.8%.' },
              { icon: <Zap size={24} className="text-accent" />, title: 'BIOAVAILABILITY', desc: 'Protocolos de absorção otimizados para ROI biológico.' },
              { icon: <Target size={24} className="text-accent" />, title: 'PRECISION CORE', desc: 'Dosagens calculadas por algoritmos fisiológicos.' }
            ].map((item, i) => (
              <div key={i} className="glass-card p-6 rounded-[24px] text-left border-white/5 bg-white/[0.01] hover:border-accent/20 transition-all duration-500 group">
                <div className="mb-6 p-3 w-fit bg-accent/5 rounded-xl group-hover:bg-accent group-hover:text-black transition-colors">{item.icon}</div>
                <h3 className="text-lg font-black mb-2 tracking-tighter uppercase italic">{item.title}</h3>
                <p className="text-white/30 text-[10px] font-bold leading-relaxed uppercase tracking-widest">{item.desc}</p>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </div>
  );
}
