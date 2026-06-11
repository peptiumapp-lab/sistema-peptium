import React from 'react';
import { motion } from 'motion/react';
import { X, Scale } from 'lucide-react';

interface LegalModalProps {
  type: 'termos' | 'privacidade' | 'disclaimer' | null;
  onClose: () => void;
}

export default function LegalModal({ type, onClose }: LegalModalProps) {
  if (!type) return null;

  let title = '';
  let content = [];

  if (type === 'termos') {
    title = 'Termos de Uso';
    content = [
      'Última atualização: Maio de 2026',
      '1. Aceitação dos Termos: Ao acessar e utilizar o Peptium Prime, você concorda com estes termos de uso.',
      '2. Uso da Plataforma: O conteúdo aqui disponibilizado, incluindo calculadoras, bases de dados de peptídeos e ferramentas de sinergia, destina-se a fins estritamente informativos e não constitui prescrição médica.',
      '3. Assinatura e Acesso: O acesso aos recursos Prime requer assinatura ativa ou passe vitalício. O compartilhamento de contas é proibido.',
      '4. Isenção de Responsabilidade: Os mantenedores da plataforma não se responsabilizam pelo uso indevido das informações aqui contidas. O usuário assume total responsabilidade por suas ações e interpretações baseadas nas ferramentas e calculadoras fornecidas.'
    ];
  } else if (type === 'privacidade') {
    title = 'Privacidade';
    content = [
      'Última atualização: Maio de 2026',
      '1. Coleta de Dados: Coletamos apenas os dados essenciais para o funcionamento da sua conta, incluindo e-mail de registro e configurações de perfil.',
      '2. Uso das Informações: As informações processadas em calculadoras e ferramentas são submetidas apenas para resultados durante a sessão e não são comercializadas a terceiros.',
      '3. Armazenamento e Segurança: Adotamos medidas e tecnologias rigorosas para proteger seus dados pessoais, mantendo a plataforma sincronizada com infraestrutura em nuvem segura.',
      '4. Direitos do Usuário: Você tem o direito de solicitar a exclusão da sua conta e de seus dados a qualquer momento pelos nossos canais de suporte.'
    ];
  } else if (type === 'disclaimer') {
    title = 'Disclaimer Médico';
    content = [
      'Aviso legal e exoneração de responsabilidade médica:',
      'As informações, ferramentas de software (como calculadoras e bases de dados) e gráficos presentes no Peptium Prime NÃO SÃO serviços de saúde e não devem ser utilizados para diagnóstico ou tratamento de qualquer condição médica.',
      'O conteúdo não substitui a orientação, diagnóstico ou prescrição fornecidos por um profissional de saúde qualificado (médico).',
      'NUNCA ignore conselhos médicos profissionais ou demore na busca de tratamento devido a informações encontradas ou calculadas através da nossa plataforma.',
      'IMPORTANTE: A grande maioria dos peptídeos e protocolos exibidos nesta plataforma AINDA NÃO FORAM AUTORIZADOS pelos órgãos competentes (ANVISA, FDA, etc.) para uso clínico ou consumo humano. Eles são destinados estritamente para fins de pesquisa e educação científica.',
      'O uso de qualquer substância mencionada é de responsabilidade exclusiva e integral do usuário. O Peptium Prime não incentiva o uso de substâncias experimentais sem a devida supervisão médica e autorização legal.'
    ];
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-lg bg-[#0B0C10] border border-white/20 rounded-2xl shadow-2xl relative z-10 overflow-hidden"
      >
        <div className="p-5 border-b border-white/20 flex justify-between items-center bg-[#0a0a0a]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-secondary">
              <Scale size={16} />
            </div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">{title}</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/20"
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar text-white/70 space-y-4 text-sm leading-loose">
          {content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
        
        <div className="p-5 border-t border-white/20 flex justify-end bg-[#0a0a0a]">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-accent/20 text-accent hover:bg-accent/30 transition-colors rounded-xl text-xs font-bold uppercase tracking-wider"
          >
            Entendido
          </button>
        </div>
      </motion.div>
    </div>
  );
}
