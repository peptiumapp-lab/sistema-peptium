import React from 'react';
import { motion } from 'motion/react';
import { Check, Zap, Sparkles, Crown } from 'lucide-react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { SUPPORT_LINK } from '../constants';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { upgradeToPro } from '../lib/firebase';

const plansData = {
  pt: [
    {
      name: 'Pro Mensal',
      price: '49,90',
      period: '/mês',
      description: 'Acesso completo à plataforma para iniciar sua jornada.',
      features: ['Acesso a todos os peptídios', 'Acesso aos Protocolos', 'Histórico de Uso', 'Suporte Básico'],
      icon: Zap,
      premium: false,
    },
    {
      name: 'Pro Anual',
      price: '449,10',
      period: '/ano',
      description: 'A experiência Prime definitiva com vantagens exclusivas.',
      features: ['Tudo do Pro Mensal', 'Acesso antecipado a novos ativos', 'Suporte Prime Prioritário', 'Atualizações Premium Mensais'],
      icon: Crown,
      premium: true,
      tag: '3 MESES GRÁTIS',
      originalPrice: '598,80'
    }
  ],
  en: [
    {
      name: 'Pro Monthly',
      price: '29.90',
      period: '/month',
      description: 'Complete platform access to start your journey.',
      features: ['Access to all peptides', 'Protocol Access', 'Usage History', 'Basic Support'],
      icon: Zap,
      premium: false,
    },
    {
      name: 'Pro Annual',
      price: '269.10',
      period: '/year',
      description: 'The ultimate Prime experience with exclusive perks.',
      features: ['Everything in Monthly', 'Early access to new compounds', 'Priority Prime Support', 'Monthly Premium Updates'],
      icon: Crown,
      premium: true,
      tag: '3 MONTHS FREE',
      originalPrice: '358.80'
    }
  ],
  es: [
    {
      name: 'Pro Mensual',
      price: '29.90',
      period: '/mes',
      description: 'Acceso completo a la plataforma para iniciar tu viaje.',
      features: ['Acceso a todos los péptidos', 'Acceso a Protocolos', 'Historial de Uso', 'Soporte Básico'],
      icon: Zap,
      premium: false,
    },
    {
      name: 'Pro Anual',
      price: '269.10',
      period: '/año',
      description: 'La experiencia Prime definitiva con ventajas exclusivas.',
      features: ['Todo en Mensual', 'Acceso anticipado a activos', 'Soporte Prime Prioritario', 'Actualizaciones Premium'],
      icon: Crown,
      premium: true,
      tag: '3 MESES GRATIS',
      originalPrice: '358.80'
    }
  ]
};

export default function Pricing() {
  const { user, isPro, openAuthModal } = useAuth();
  const { language, currency, t } = useLanguage();
  const [couponCode, setCouponCode] = React.useState<string | null>(null);

  const plans = plansData[language] || plansData.en;

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('coupon');
    if (code) setCouponCode(code);
  }, []);

  const handleLoginClick = async () => {
    openAuthModal();
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
            {t('pricing.title')}
          </motion.h2>
          <p className="text-secondary/60 max-w-2xl mx-auto text-[11px] font-bold uppercase tracking-wider leading-loose">
            {t('pricing.subtitle')}
          </p>
          {couponCode && (
            <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="mt-6 inline-block animate-pulse bg-accent/20 border border-accent/30 text-accent px-6 py-2 rounded-full text-xs font-black uppercase tracking-wider"
            >
               🎉 {t('pricing.coupon')}
            </motion.div>
          )}
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
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full z-10">
                  {plan.tag}
                </div>
              )}
              <div className={`glass-card rounded-2xl p-6 border border-secondary/20 flex flex-col h-full ${
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
                    <span className="text-xs font-medium text-gray-400">{currency === 'BRL' ? 'R$' : '$'}</span>
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-xs text-gray-400">{plan.period}</span>
                  </div>
                  {plan.originalPrice && (
                    <p className="mt-1 text-xs sm:text-sm font-bold text-secondary/70 line-through">
                      {currency === 'BRL' ? 'R$' : '$'} {plan.originalPrice}
                    </p>
                  )}
                  <p className="mt-3 text-xs text-gray-400 uppercase tracking-wider leading-loose">{plan.description}</p>
                </div>

                <div className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 text-sm text-gray-300">
                      <Check size={16} className="text-accent shrink-0" />
                      <span className="uppercase text-xs font-bold tracking-wider opacity-70">{feature}</span>
                    </div>
                  ))}
                </div>

                {isPro ? (
                  <button disabled className="w-full py-4 rounded-[12px] font-bold transition-all duration-300 text-center uppercase tracking-wider text-xs bg-secondary/10 border border-secondary/20 opacity-50 cursor-not-allowed">
                    {t('pricing.currentPlan')}
                  </button>
                ) : !user ? (
                   <button 
                     onClick={handleLoginClick}
                     className={`w-full py-4 rounded-[12px] font-bold transition-all duration-300 text-center uppercase tracking-wider text-xs ${
                      plan.premium 
                      ? 'bg-accent text-primary hover:bg-white shadow-[0_0_20px_rgba(0,229,255,0.2)]' 
                      : 'bg-secondary/10 hover:bg-secondary/20 border border-secondary/20'
                     }`}
                   >
                     {t('common.login')}
                   </button>
                ) : (
                   <div style={{ position: 'relative', zIndex: 0, minHeight: '48px' }}>
                     <PayPalButtons
                       style={{ layout: "horizontal", color: plan.premium ? "gold" : "blue", shape: "rect", height: 48 }}
                       createSubscription={(data, actions) => {
                           const isAnnual = plan.premium;
                           const isBrl = currency === 'BRL';
                           
                           let planId = undefined;
                           if (isBrl) {
                             planId = isAnnual 
                               ? (import.meta.env.VITE_PAYPAL_PLAN_ID_ANNUAL_BRL || 'P-98557937YE021832CNIUMG3I')
                               : (import.meta.env.VITE_PAYPAL_PLAN_ID_MONTHLY_BRL || 'P-5B76934704315025ENIUMBVI');
                           } else {
                             planId = isAnnual 
                               ? (import.meta.env.VITE_PAYPAL_PLAN_ID_ANNUAL_USD || 'P-8GB03595EC748711XNIUMJTY')
                               : (import.meta.env.VITE_PAYPAL_PLAN_ID_MONTHLY_USD || 'P-0GB37855K4264004MNIUMINY');
                           }
                           
                           if (!planId || planId === "undefined") {
                             throw new Error(`Plano do PayPal não configurado. Adicione os IDs nas variáveis de ambiente.`);
                           }
                           
                           return actions.subscription.create({ plan_id: String(planId) });
                       }}
                       onApprove={async (data, actions) => {
                         try {
                           const response = await fetch('/api/activate-subscription', {
                             method: 'POST',
                             headers: { 'Content-Type': 'application/json' },
                             body: JSON.stringify({
                               subscriptionId: data.subscriptionID,
                               userId: user.uid,
                               planKey: plan.name
                             })
                           });

                           const result = await response.json();
                           if (!response.ok) {
                             throw new Error(result.error || 'Erro ao ativar assinatura no servidor');
                           }

                           alert('Pagamento aprovado via PayPal! Você agora é um membro Prime.');
                           window.location.reload();
                         } catch (error: any) {
                           console.error(error);
                           alert('Sua assinatura foi processada no PayPal, mas houve um erro na ativação: ' + error.message);
                         }
                       }}
                       onError={(err) => {
                         console.error('PayPal Error:', err);
                         alert('Ocorreu um erro no pagamento.');
                       }}
                     />
                   </div>
                )}

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
