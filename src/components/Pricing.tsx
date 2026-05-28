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
    description: 'Acesso completo à plataforma para iniciar sua jornada.',
    features: ['Acesso a todos os peptídios', 'Acesso aos Protocolos', 'Histórico de Uso', 'Suporte Básico'],
    icon: Zap,
    premium: false,
  },
  {
    name: 'Pro Anual',
    price: '475,20',
    period: '/ano',
    description: 'A experiência Prime definitiva com vantagens exclusivas.',
    features: ['Tudo do Pro Mensal', 'Acesso antecipado a novos ativos', 'Suporte Prime Prioritário', 'Atualizações Premium Mensais'],
    icon: Crown,
    premium: true,
    tag: '60% OFF'
  }
];

export default function Pricing() {
  const { user, isPro } = useAuth();
  const [couponCode, setCouponCode] = React.useState<string | null>(null);
  const [autoCheckout, setAutoCheckout] = React.useState<string | null>(null);

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
      alert(`Erro: ${error.message}`);
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
                    <p className="mt-1 text-xs sm:text-sm font-bold text-secondary/50 line-through">R$ 1.188,00</p>
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
