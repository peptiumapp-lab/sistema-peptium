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
      <div className="fixed top-20 right-6 z-[100] hidden lg:block">
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          onClick={() => setView('plans')}
          className="bg-primary/90 border border-secondary/10 p-3 pr-16 rounded-xl flex items-center gap-3 shadow-[0_10px_40_rgba(0,0,0,0.4)] backdrop-blur-3xl relative group/notif cursor-pointer hover:border-accent/30 transition-all hover:translate-y-[-2px]"
        >
          <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-500">
            <Zap size={14} fill="currentColor" />
          </div>
          <div className="min-w-[180px]">
            <div className="text-secondary text-[9px] font-bold leading-[1.4]">
              3 novos protocolos clínicos <br />
              <span className="text-muted font-medium tracking-normal lowercase">esta semana — </span> 
              <span className="text-accent underline decoration-accent/30 underline-offset-2">acesso Elite</span>
            </div>
          </div>
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-black text-[9px] font-black shadow-[0_0_15px_rgba(0,229,255,0.3)] group-hover/notif:scale-105 transition-transform">
              Ac
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
