import React from 'react';
import { motion } from 'motion/react';
import { Microscope, BookOpen, Users, FlaskConical } from 'lucide-react';
import { TOTAL_PEPTIDES } from '../constants';

const stats = [
  { 
    label: 'Acesso Restrito', 
    value: 'VIP', 
    icon: <Users size={20} />,
    desc: 'Comunidade Elite de Alta Performance'
  },
  { 
    label: 'Agentes Bio-Ativos', 
    value: `${TOTAL_PEPTIDES}+`, 
    icon: <FlaskConical size={20} />,
    desc: 'O Database mais denso do Mercado'
  },
  { 
    label: 'Protocolos de Ciclo', 
    value: '+150', 
    icon: <Microscope size={20} />,
    desc: 'Arquitetura de Dosagem Linear'
  },
  { 
    label: 'Evidência Científica', 
    value: '500+', 
    icon: <BookOpen size={20} />,
    desc: 'Papers indexados PubMed'
  }
];

export default function StatsSection() {
  return (
    <section className="py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group p-4 rounded-2xl bg-secondary/[0.01] border border-secondary/15 hover:border-accent/20 transition-all text-center"
            >
              <div className="absolute inset-0 bg-accent/5 blur-[20px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <div className="inline-flex p-2 rounded-xl bg-accent/5 text-accent mb-3">
                  {React.cloneElement(stat.icon as React.ReactElement, { size: 16 })}
                </div>
                <div className="text-2xl md:text-3xl font-black text-secondary tracking-tighter mb-1">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-accent uppercase tracking-wider mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-muted font-medium uppercase tracking-wider leading-none">
                  {stat.desc}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Source Badges */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-col items-center justify-center gap-6"
        >
          <div className="text-[12px] font-black text-accent/50 uppercase tracking-wider mb-2">Protocolos estruturados sob dados de:</div>
          
          <div className="flex flex-wrap items-center justify-center gap-10 px-12 py-8 rounded-3xl bg-secondary/[0.01] border border-secondary/15">
            {/* NIH */}
            <div className="flex items-center gap-4">
              <div className="px-3 py-1 bg-[#1F3E6C] rounded text-white text-xs font-bold">NIH</div>
              <div className="flex flex-col">
                <span className="text-secondary/60 text-sm font-bold leading-none">PubMed</span>
                <span className="text-secondary/30 text-xs font-medium leading-none mt-1.5 uppercase tracking-wider">Database</span>
              </div>
            </div>

            <div className="h-6 w-[1px] bg-secondary/10 hidden sm:block" />

            {/* ClinicalTrials */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 font-black text-xs">CT</div>
              <div className="flex flex-col">
                <span className="text-secondary/60 text-sm font-bold leading-none">ClinicalTrials.gov</span>
                <span className="text-secondary/30 text-xs font-medium leading-none mt-1.5 uppercase tracking-wider">Human Trials</span>
              </div>
            </div>

            <div className="h-6 w-[1px] bg-secondary/10 hidden sm:block" />

            {/* PubChem */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 font-black text-xs">PC</div>
              <div className="flex flex-col">
                <span className="text-secondary/60 text-sm font-bold leading-none">PubChem</span>
                <span className="text-secondary/30 text-xs font-medium leading-none mt-1.5 uppercase tracking-wider">Bio-Chemistry</span>
              </div>
            </div>

            <div className="h-6 w-[1px] bg-secondary/10 hidden sm:block" />

            {/* WADA */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400 font-black text-[11px]">WADA</div>
              <div className="flex flex-col">
                <span className="text-secondary/60 text-sm font-bold leading-none">Anti-Doping</span>
                <span className="text-secondary/30 text-xs font-medium leading-none mt-1.5 uppercase tracking-wider">Compliance</span>
              </div>
            </div>

            <div className="h-6 w-[1px] bg-secondary/10 hidden sm:block" />

            {/* OpenEvidence */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-black text-xs">OE</div>
              <div className="flex flex-col">
                <span className="text-secondary/60 text-sm font-bold leading-none">OpenEvidence</span>
                <span className="text-secondary/30 text-xs font-medium leading-none mt-1.5 uppercase tracking-wider">AI Medical Search</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
