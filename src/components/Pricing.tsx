import React from 'react';
import { motion } from 'motion/react';
import { Check, Zap, Sparkles, Crown } from 'lucide-react';
import { SUPPORT_LINK } from '../constants';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { signInWithGoogle, upgradeToPro } from '../lib/firebase';

const plansData = {
  pt: [
    {
      name: 'Pro Mensal',
      price: '39,90',
      period: '/mês',
      description: 'Acesso completo à plataforma para iniciar sua jornada.',
      features: ['Acesso a todos os peptídios', 'Acesso aos Protocolos', 'Histórico de Uso', 'Suporte Básico'],
      icon: Zap,
      premium: false,
    },
    {
      name: 'Pro Anual',
      price: '347,00',
      period: '/ano',
      description: 'A experiência Prime definitiva com vantagens exclusivas.',
      features: ['Tudo do Pro Mensal', 'Acesso antecipado a novos ativos', 'Suporte Prime Prioritário', 'Atualizações Premium Mensais'],
      icon: Crown,
      premium: true,
      tag: 'CUSTO EQUIVALENTE A R$ 28,90/MÊS'
    }
  ],
  en: [
    {
      name: 'Pro Monthly',
      price: '29.99',
      period: '/month',
      description: 'Complete platform access to start your journey.',
      features: ['Access to all peptides', 'Protocol Access', 'Usage History', 'Basic Support'],
      icon: Zap,
      premium: false,
    },
    {
      name: 'Pro Annual',
      price: '249.00',
      period: '/year',
      description: 'The ultimate Prime experience with exclusive perks.',
      features: ['Everything in Monthly', 'Early access to new compounds', 'Priority Prime Support', 'Monthly Premium Updates'],
      icon: Crown,
      premium: true,
      tag: 'EQUIVALENT TO $20.75/MONTH'
    }
  ],
  es: [
    {
      name: 'Pro Mensual',
      price: '29.99',
      period: '/mes',
      description: 'Acceso completo a la plataforma para iniciar tu viaje.',
      features: ['Acceso a todos los péptidos', 'Acceso a Protocolos', 'Historial de Uso', 'Soporte Básico'],
      icon: Zap,
      premium: false,
    },
    {
      name: 'Pro Anual',
      price: '249.00',
      period: '/año',
      description: 'La experiencia Prime definitiva con ventajas exclusivas.',
      features: ['Todo en Mensual', 'Acceso anticipado a activos', 'Soporte Prime Prioritario', 'Actualizaciones Premium'],
      icon: Crown,
      premium: true,
      tag: 'EQUIVALENTE A $20.75/MES'
    }
  ]
};

export default function Pricing() {
  const { user, isPro } = useAuth();
  const { language, currency, t } = useLanguage();
  const [couponCode, setCouponCode] = React.useState<string | null>(null);
  const [autoCheckout, setAutoCheckout] = React.useState<string | null>(null);

  const plans = plansData[language] || plansData.en;

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('coupon');
    const checkoutPlan = params.get('checkout');
    
    if (code) {
      setCouponCode(code);
      // Persist in session storage in case they need to log in
      sessionStorage.setItem('pendingCoupon', code);
    } else {
      const pendingCoupon = sessionStorage.getItem('pendingCoupon');
      if (pendingCoupon) setCouponCode(pendingCoupon);
    }

    if (checkoutPlan) {
      setAutoCheckout(checkoutPlan);
      sessionStorage.setItem('pendingCheckout', checkoutPlan);
    } else {
      const pendingCheckout = sessionStorage.getItem('pendingCheckout');
      if (pendingCheckout) setAutoCheckout(pendingCheckout);
    }
  }, []);

  React.useEffect(() => {
    if (autoCheckout) {
      const plan = plans.find(p => p.name === autoCheckout || p.name.includes(autoCheckout));
      if (plan) {
        if (!user) {
           sessionStorage.setItem('pendingCheckout', plan.name);
           if (couponCode) sessionStorage.setItem('pendingCoupon', couponCode);
           // We can't auto-popup Google Auth easily as it might block popups, but we can try!
        } else if (!isPro) {
           setAutoCheckout(null);
           sessionStorage.removeItem('pendingCheckout');
           setTimeout(() => {
             handlePurchase(plan.name, couponCode);
           }, 500);
        }
      }
    }
  }, [user, isPro, autoCheckout, couponCode]);

  const handlePurchase = async (planName: string, explicitCoupon?: string | null) => {
    const finalCoupon = explicitCoupon || couponCode;
    if (!user) {
      sessionStorage.setItem('pendingCheckout', planName);
      if (finalCoupon) sessionStorage.setItem('pendingCoupon', finalCoupon);
      await signInWithGoogle();
      return;
    }
    
    if (isPro) {
      alert('Você já é um membro Prime!');
      return;
    }

    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planName: planName,
          userId: user.uid,
          userEmail: user.email,
          coupon: finalCoupon || undefined,
        }),
      });

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('text/html')) {
        throw new Error(`Servidor de API não encontrado (404) na URL: ${response.url}. O servidor retornou a página HTML principal em vez de uma resposta da API.`);
      }

      const body = await response.json().catch(() => ({}));

      if (!response.ok || !body.success) {
        throw new Error(body.error?.message || body.error?.details || `Erro HTTP ${response.status} ao acessar ${response.url}`);
      }

      if (body.data?.url) {
        window.location.href = body.data.url;
      } else {
        throw new Error('Falha ao criar sessão de checkout ou URL ausente');
      }
    } catch (error: any) {
      console.error('Erro no checkout:', error);
      if (error.message?.includes('coupon cannot be redeemed') || error.message?.includes('does not apply')) {
        alert('O cupom informado é inválido para este pedido ou está configurado para "produtos específicos" no painel do Stripe.');
        setCouponCode(null);
        sessionStorage.removeItem('pendingCoupon');
      } else {
        alert(`Erro: ${error.message}`);
      }
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
            {t('pricing.title')}
          </motion.h2>
          <p className="text-secondary/40 max-w-2xl mx-auto text-[11px] font-bold uppercase tracking-widest leading-relaxed">
            {t('pricing.subtitle')}
          </p>
          {couponCode && (
            <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="mt-6 inline-block animate-pulse bg-accent/20 border border-accent/50 text-accent px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest"
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
                    <span className="text-xs font-medium text-gray-400">{currency === 'BRL' ? 'R$' : '$'}</span>
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-xs text-gray-400">{plan.period}</span>
                  </div>
                  {plan.name.includes('Anual') && (
                    <p className="mt-1 text-xs sm:text-sm font-bold text-secondary/50 line-through">
                      {currency === 'BRL' ? 'R$ 478,80' : '$ 359.88'}
                    </p>
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
                  {isPro ? t('pricing.currentPlan') : user ? t('pricing.subscribe') : t('common.login')}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
