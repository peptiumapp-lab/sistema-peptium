import React from 'react';
import { motion } from 'motion/react';
import { Hexagon, Sparkles, Calculator, Layers, Shield, ClipboardList, Zap, CreditCard, ArrowRight } from 'lucide-react';
import type { View } from '../App';
import { TOTAL_PEPTIDES } from '../constants';

interface CardItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  view: View;
  href?: string;
}

const cards: CardItem[] = [
  {
    icon: <Hexagon size={24} />,
    title: 'Atlas de Compostos',
    description: `Explore ${TOTAL_PEPTIDES}+ ativos`,
    view: 'library'
  },
  {
    icon: <Sparkles size={24} />,
    title: 'Bio-Scanner IA',
    description: 'Encontre o ativo ideal',
    view: 'quiz'
  },
  {
    icon: <Calculator size={24} />,
    title: 'Motor de Precisão',
    description: 'Reconstituição molecular',
    view: 'calculator'
  },
  {
    icon: <Layers size={24} />,
    title: 'Acervo de Protocolos',
    description: 'Guidelines de aplicação',
    view: 'stacks'
  },
  {
    icon: <Shield size={24} />,
    title: 'Guardião de Sinergia',
    description: 'Verifique interações',
    view: 'interactions'
  },
  {
    icon: <CreditCard size={24} />,
    title: 'Upgrade para Elite',
    description: 'Domine a biologia',
    view: 'plans'
  },
  {
    icon: <ClipboardList size={24} />,
    title: 'Centro de Comando',
    description: 'Seus dados e históricos',
    view: 'my-protocols'
  }
];

interface StartHereProps {
  setView: (view: View) => void;
}

export default function StartHere({ setView }: StartHereProps) {
  return (
    <section className="py-10 px-6 max-w-7xl mx-auto relative overflow-hidden">
      <div className="text-center mb-6 opacity-60">
        <h2 className="text-xl md:text-2xl font-sans font-bold text-secondary tracking-tight uppercase">
          Portal de Operações
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            viewport={{ once: true }}
            onClick={() => setView(card.view)}
            className="group cursor-pointer p-5 rounded-[20px] bg-secondary/[0.01] border border-secondary/[0.03] hover:border-accent/40 hover:bg-accent/[0.02] transition-all relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-accent/5 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="w-10 h-10 rounded-[12px] bg-accent/5 flex items-center justify-center border border-accent/10 mb-4 group-hover:scale-110 group-hover:bg-accent group-hover:text-primary transition-all duration-500">
              {React.cloneElement(card.icon as React.ReactElement, { size: 18, className: 'group-hover:text-primary' })}
            </div>
            
            <div className="space-y-1">
              <h3 className="text-sm font-black text-secondary tracking-tight group-hover:text-accent transition-colors uppercase italic">{card.title}</h3>
              <p className="text-[9px] font-bold text-muted uppercase tracking-[0.2em]">{card.description}</p>
            </div>
            
            <div className="mt-5 flex items-center gap-2 text-accent opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
              <span className="text-[10px] font-black uppercase tracking-widest leading-none">Acessar Terminal</span>
              <ArrowRight size={14} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Notification */}
      <div className="fixed bottom-8 right-6 z-[100] hidden lg:block">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          onClick={() => setView('plans')}
          className="bg-[#050505]/95 border-l-[3px] border-l-accent border-r border-y border-white/5 py-4 px-5 rounded-r-xl rounded-l-sm shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl relative group/notif cursor-pointer hover:bg-accent/[0.02] transition-all flex items-center gap-5"
        >
          <div className="relative shrink-0">
             <div className="absolute inset-0 bg-accent/30 blur-md rounded-full" />
             <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse relative z-10 shadow-[0_0_10px_rgba(0,229,255,0.8)]" />
          </div>
          <div className="flex-grow">
            <div className="text-[9px] text-accent font-black tracking-[0.3em] uppercase mb-1.5 flex items-center gap-2">
               <span>Atualização de Malha</span>
            </div>
            <div className="text-white/80 text-[12px] font-bold leading-tight tracking-wide">
              3 Novos Protocolos Injetados<br />
              <span className="text-white/40 text-[10px] uppercase tracking-widest font-medium mt-1 inline-block">Nível de acesso requerido: <span className="text-white font-black italic">PRIME</span></span>
            </div>
          </div>
          <div className="ml-2 pl-4 border-l border-white/10 group-hover/notif:border-accent/30 transition-colors flex items-center shrink-0">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover/notif:bg-accent/20 transition-colors">
              <ArrowRight size={14} className="text-white/50 group-hover/notif:text-accent transition-colors" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
