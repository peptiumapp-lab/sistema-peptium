import React from 'react';
import { Calculator, Dna, FileText, Zap, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { View } from '../App';

interface CalculatorTeaserProps {
  setView?: (view: View) => void;
  isPremium?: boolean;
}

export default function CalculatorTeaser({ setView, isPremium }: CalculatorTeaserProps) {
  return (
    <section className="py-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-sans font-extrabold leading-tight tracking-tight text-secondary text-glow uppercase italic">
              O Motor de <br />
              <span className="text-accent text-glow">Precisão Molecular</span>
            </h2>
            <p className="text-muted text-base leading-relaxed font-bold uppercase tracking-wider opacity-60">
              ELIMINE O ERRO HUMANO. NOSSO ALGORITMO DE RECONSTITUIÇÃO CALCULA VOLUMES EXATOS 
              BASEADOS EM CONCENTRAÇÃO EFETIVA E SATURAÇÃO BIOLÓGICA.
            </p>
            
            <div className="space-y-4">
              {[
                { icon: <Calculator size={20} />, text: 'Cálculo por Volume (mL/mcg)' },
                { icon: <Dna size={20} />, text: 'Ajuste por Sensibilidade Individual' },
                { icon: <FileText size={20} />, text: 'Log de Aplicações' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-secondary/80 font-medium">
                  <div className="p-2 bg-accent/20 rounded-lg text-accent">
                    {item.icon}
                  </div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {setView && (
              <button 
                onClick={() => setView(isPremium ? 'calculator' : 'plans')}
                className="px-8 py-4 bg-accent/10 border border-accent/20 text-accent rounded-2xl font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-accent/20 transition-all w-fit"
              >
                {isPremium ? 'Abrir Calculadora Prime' : 'Acessar Calculadora no Prime'} <ArrowUpRight size={14} />
              </button>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative lg:max-w-md mx-auto"
          >
            {/* Mockup do App - Compacted */}
            <div className="relative z-10 glass-card rounded-[40px] p-3 border-secondary/20 shadow-2xl">
              <div className="bg-primary rounded-[32px] aspect-[9/16] overflow-hidden relative border border-secondary/10">
                <div className="absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent pointer-events-none" />
                
                {/* Status Bar */}
                <div className="p-6 flex justify-between items-center opacity-40">
                  <span className="text-[8px] font-bold tracking-widest uppercase text-secondary">Bio-Core v2.4</span>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-secondary rounded-full" />
                    <div className="w-1 h-1 bg-secondary rounded-full" />
                    <div className="w-1 h-1 bg-accent rounded-full" />
                  </div>
                </div>

                <div className="px-6 space-y-6">
                  <div className="space-y-1">
                    <h4 className="text-secondary/40 text-[10px] uppercase font-bold tracking-widest">Ativo Selecionado</h4>
                    <div className="text-xl font-extrabold font-sans text-secondary uppercase tracking-tight">Semaglutida Elite</div>
                  </div>

                  <div className="bg-secondary/[0.03] rounded-3xl p-6 border border-secondary/5 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2"><Zap size={12} className="text-accent" /></div>
                    <span className="block text-4xl font-black text-secondary mb-1">0.25</span>
                    <span className="text-[8px] uppercase font-black text-accent tracking-[0.2em]">Miligramas (mg)</span>
                  </div>

                  <div className="space-y-4 pt-4">
                    <div className="flex justify-between items-end border-b border-secondary/5 pb-2">
                       <span className="text-[10px] text-secondary/40 uppercase font-bold">Unidades Seringa</span>
                       <span className="text-xl font-black text-secondary">10 UI</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-secondary/5 pb-2">
                       <span className="text-[10px] text-secondary/40 uppercase font-bold">Volume Total</span>
                       <span className="text-xl font-black text-secondary">0.10 mL</span>
                    </div>
                  </div>

                  <div className="pt-8">
                    <div className="w-full py-4 bg-accent text-white rounded-2xl text-[10px] uppercase font-black tracking-widest text-center shadow-lg shadow-accent/20">
                      Confirmar Aplicação
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-white/20 rounded-full" />
              </div>
            </div>
            {/* Background Blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/30 rounded-full blur-[80px] pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
