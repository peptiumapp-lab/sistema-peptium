import React from 'react';
import { motion } from 'motion/react';
import { Hexagon, Sparkles, Calculator, Layers, Shield, ClipboardList, Zap, CreditCard, ArrowRight } from 'lucide-react';
import type { View } from '../App';
import { TOTAL_PEPTIDES } from '../constants';
import { useAuth } from '../contexts/AuthContext';

interface CardItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  view: View;
  href?: string;
  hideIfPro?: boolean;
}

const getCards = (isPro: boolean): CardItem[] => {
  const cardsList: CardItem[] = [
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
      view: 'plans',
      hideIfPro: true
    },
    {
      icon: <ClipboardList size={24} />,
      title: 'Centro de Comando',
      description: 'Seus dados e históricos',
      view: 'my-protocols'
    }
  ];
  return cardsList.filter(card => !(card.hideIfPro && isPro));
};

interface StartHereProps {
  setView: (view: View) => void;
}

export default function StartHere({ setView }: StartHereProps) {
  const { isPro } = useAuth();
  const cards = getCards(isPro);

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

      {/* Floating Notification - Gloss Design */}
      {!isPro && (
        <div className="fixed bottom-6 right-6 z-[100]">
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2, duration: 0.8, ease: "circOut" }}
            onClick={() => setView('plans')}
            className="group relative bg-[#050505]/40 backdrop-blur-xl border border-white/10 p-1.5 rounded-2xl cursor-pointer hover:bg-white/5 transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Subtle Glow Effect */}
            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex items-center gap-3 pr-4 pl-1">
              <div className="w-10 h-10 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center relative">
                 <div className="absolute inset-0 bg-accent/20 blur-md rounded-full animate-pulse" />
                 <Zap size={18} className="text-accent relative z-10" fill="currentColor" />
              </div>
              
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[8px] font-black text-accent uppercase tracking-[0.3em]">Neural Update</span>
                  <div className="w-1 h-1 rounded-full bg-accent animate-pulse" />
                </div>
                <div className="text-[10px] font-black text-white/90 uppercase tracking-tight">
                  3 Novos Protocolos de <span className="text-accent underline decoration-accent/30">Sinergia</span>
                </div>
              </div>

              <div className="ml-4 w-6 h-6 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent/20 transition-all">
                <ArrowRight size={12} className="text-white/40 group-hover:text-accent transition-all" />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
