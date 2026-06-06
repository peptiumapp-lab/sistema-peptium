export const translations = {
  pt: {
    nav: {
      dashboard: 'Painel Central',
      dossier: 'Dossiê Peptídeos',
      compare: 'Comparador',
      synergy: 'Sinergia Cruzada',
      protocols: 'Protocolos Prime',
      cycle: 'Calculadora de Ciclo',
      calendar: 'Planner / Calendário',
      guide: 'Guia de Peptídeos',
      lab: 'Análise de Exames',
      longevity: 'Relógio Biológico',
      genome: 'DNA & Genômica',
      fasting: 'Jejum & Autofagia',
      microbiome: 'Microbioma',
      neuro: 'Neuromatrix',
      support: 'Suporte Prime',
      legal: 'Termos e Legal',
      online: 'Usuários Online'
    },
    pricing: {
      title: 'Desbloqueie o Próximo Nível da Sua Biologia',
      subtitle: 'Acesse ferramentas avançadas, protocolos detalhados e inteligência artificial para otimização humana.',
      currentPlan: 'Seu plano atual',
      choosePlan: 'Escolher',
      subscribe: 'Assinar',
      popular: 'MAIS POPULAR',
      coupon: 'Cupom de Desconto',
      apply: 'Aplicar',
      invalidCoupon: 'Cupom inválido ou expirado',
      support: 'Dúvidas? Fale com nosso suporte',
      disclaimer: 'O acesso é liberado imediatamente após a confirmação do pagamento. Cancele quando quiser.'
    },
    common: {
      search: 'Buscar (Cmd+K)',
      settings: 'Configurações',
      logout: 'Sair',
      login: 'Entrar com Google',
      proRequired: 'Acesso Prime Necessário',
      upgrade: 'Fazer Upgrade'
    }
  },
  en: {
    nav: {
      dashboard: 'Dashboard',
      dossier: 'Peptide Dossier',
      compare: 'Comparator',
      synergy: 'Cross Synergy',
      protocols: 'Prime Protocols',
      cycle: 'Cycle Calculator',
      calendar: 'Planner / Calendar',
      guide: 'Peptide Guide',
      lab: 'Lab Analysis',
      longevity: 'Biological Clock',
      genome: 'DNA & Genomics',
      fasting: 'Fasting & Autophagy',
      microbiome: 'Microbiome',
      neuro: 'Neuromatrix',
      support: 'Prime Support',
      legal: 'Terms & Legal',
      online: 'Users Online'
    },
    pricing: {
      title: 'Unlock the Next Level of Your Biology',
      subtitle: 'Access advanced tools, detailed protocols, and artificial intelligence for human optimization.',
      currentPlan: 'Your current plan',
      choosePlan: 'Choose',
      subscribe: 'Subscribe',
      popular: 'MOST POPULAR',
      coupon: 'Discount Coupon',
      apply: 'Apply',
      invalidCoupon: 'Invalid or expired coupon',
      support: 'Questions? Contact our support',
      disclaimer: 'Access is granted immediately after payment confirmation. Cancel anytime.'
    },
    common: {
      search: 'Search (Cmd+K)',
      settings: 'Settings',
      logout: 'Logout',
      login: 'Login with Google',
      proRequired: 'Prime Access Required',
      upgrade: 'Upgrade'
    }
  },
  es: {
    nav: {
      dashboard: 'Panel Central',
      dossier: 'Dossier de Péptidos',
      compare: 'Comparador',
      synergy: 'Sinergia Cruzada',
      protocols: 'Protocolos Prime',
      cycle: 'Calculadora de Ciclo',
      calendar: 'Planner / Calendario',
      guide: 'Guía de Péptidos',
      lab: 'Análisis de Laboratorio',
      longevity: 'Reloj Biológico',
      genome: 'ADN y Genómica',
      fasting: 'Ayuno y Autofagia',
      microbiome: 'Microbioma',
      neuro: 'Neuromatriz',
      support: 'Soporte Prime',
      legal: 'Términos y Legal',
      online: 'Usuarios en Línea'
    },
    pricing: {
      title: 'Desbloquea el Próximo Nivel de tu Biología',
      subtitle: 'Accede a herramientas avanzadas, protocolos detallados e inteligencia artificial para la optimización humana.',
      currentPlan: 'Tu plan actual',
      choosePlan: 'Elegir',
      subscribe: 'Suscribirse',
      popular: 'MÁS POPULAR',
      coupon: 'Cupón de Descuento',
      apply: 'Aplicar',
      invalidCoupon: 'Cupón inválido o caducado',
      support: '¿Dudas? Habla con nuestro soporte',
      disclaimer: 'El acceso se libera de inmediato tras confirmar el pago. Cancela cuando quieras.'
    },
    common: {
      search: 'Buscar (Cmd+K)',
      settings: 'Ajustes',
      logout: 'Salir',
      login: 'Entrar con Google',
      proRequired: 'Acceso Prime Requerido',
      upgrade: 'Mejorar'
    }
  }
};

export type Translations = typeof translations;
export type NestedKeyOf<ObjectType extends object> = 
{[Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
: `${Key}`
}[keyof ObjectType & (string | number)];

export type TranslationKey = NestedKeyOf<typeof translations.pt>;
