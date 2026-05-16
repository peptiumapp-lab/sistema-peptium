import React from 'react';
import { motion } from 'motion/react';
import { Check, Zap, Sparkles, Crown } from 'lucide-react';
import { SUPPORT_LINK } from '../constants';
import { useAuth } from '../contexts/AuthContext';
import { signInWithGoogle, upgradeToPro } from '../lib/firebase';

const plans = [
  {
    name: 'Pro Mensal',
    price: '99,99',
    period: '/mês',
    description: 'Ideal para quem está começando sua jornada de biohacking.',
    features: ['Calculadora Inteligente', 'Ajuste de Sensibilidade', 'Log de 30 dias', 'Suporte Básico'],
    icon: Zap,
    premium: false,
  },
  {
    name: 'Pro Anual',
    price: '475,20',
    period: '/ano',
    description: 'O padrão ouro para performance máxima e precisão absoluta.',
    features: ['Tudo do Mensal', 'Protocolos Exclusivos', 'Histórico Ilimitado', 'Suporte Prime via E-mail', 'Acesso Antecipado a Novos Ativos'],
    icon: Crown,
    premium: true,
    tag: '60% OFF'
  }
];

export default function Pricing() {
  const { user, isPro } = useAuth();

  const handlePurchase = async (planName: string) => {
    if (!user) {
      await signInWithGoogle();
      return;
    }
    
    if (isPro) {
      alert('Você já é um membro Prime!');
      return;
    }

    try {
      await upgradeToPro(user.uid);
      alert(`Sucesso! Seu acesso ${planName} foi liberado.`);
    } catch (error) {
      console.error('Erro no checkout:', error);
      alert('Erro ao processar ativação. Tente novamente.');
    }
  };

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(20,255,180,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold mb-2 uppercase italic tracking-tighter"
          >
            Escolha seu Nível de <span className="text-accent">Excelência</span>
          </motion.h2>
          <p className="text-secondary/40 max-w-2xl mx-auto text-[11px] font-bold uppercase tracking-widest leading-relaxed">
            Invista na precisão que o seu corpo merece. Protocolos validados e tecnologia de ponta.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative flex flex-col h-full ${
                plan.premium ? 'md:scale-105' : ''
              }`}
            >
              {plan.tag && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-primary text-[10px] font-bold px-3 py-1 rounded-full z-10">
                  {plan.tag}
                </div>
              )}
              <div className={`glass-card rounded-2xl p-6 border border-secondary/10 flex flex-col h-full ${
                plan.premium ? 'ring-[1px] ring-accent shadow-[0_0_30px_rgba(20,255,180,0.05)]' : ''
              }`}>
                <div className="mb-6 text-center sm:text-left">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 mx-auto sm:mx-0 ${
                    plan.premium ? 'bg-accent text-primary' : 'bg-secondary/20 text-accent'
                  }`}>
                    <plan.icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold mb-1 uppercase tracking-tight">{plan.name}</h3>
                  <div className="flex items-baseline justify-center sm:justify-start gap-1">
                    <span className="text-xs font-medium text-gray-400">R$</span>
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-xs text-gray-400">{plan.period}</span>
                  </div>
                  {plan.name === 'Pro Anual' && (
                    <p className="mt-1 text-[10px] text-secondary/30 line-through">R$ 1.188,00</p>
                  )}
                  <p className="mt-3 text-[10px] text-gray-400 uppercase tracking-widest leading-relaxed">{plan.description}</p>
                </div>

                <div className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 text-sm text-gray-300">
                      <Check size={16} className="text-accent shrink-0" />
                      <span className="uppercase text-[10px] font-bold tracking-widest opacity-70">{feature}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => handlePurchase(plan.name)}
                  className={`w-full py-4 rounded-[12px] font-bold transition-all duration-300 text-center uppercase tracking-[0.3em] text-[10px] ${
                    plan.premium 
                    ? 'bg-accent text-primary hover:bg-white shadow-[0_0_20px_rgba(0,229,255,0.2)]' 
                    : 'bg-secondary/10 hover:bg-secondary/20 border border-secondary/20'
                  }`}
                >
                  {isPro ? 'Plano Ativo' : user ? `Adquirir ${plan.name}` : 'Entrar para Adquirir'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
