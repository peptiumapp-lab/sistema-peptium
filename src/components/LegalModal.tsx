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
    title = 'Política de Privacidade e LGPD';
    content = [
      'Última atualização: Maio de 2026',
      'Em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018), detalhamos abaixo como tratamos suas informações:',
      '1. Coleta e Finalidade: Coletamos dados como e-mail (para autenticação via Firebase) e histórico de uso das calculadoras e do Atlas. Esses dados são utilizados exclusivamente para fornecer a funcionalidade da plataforma e manter suas configurações.',
      '2. Base Legal: O tratamento de seus dados ocorre mediante o seu consentimento (Art. 7º, I, LGPD) ao criar a conta e usar os serviços.',
      '3. Compartilhamento: Não comercializamos ou compartilhamos dados pessoais com terceiros não autorizados. Utilizamos serviços de infraestrutura seguros (Google Cloud, Firebase) para armazenamento.',
      '4. Segurança Técnica: A aplicação possui sistema de Rate Limit contra abusos, protege a comunicação backend/database por ambientes isolados e não expõe credenciais de sistema no Client-side, seguindo as melhores práticas de Cybersegurança e Biohacking Privacy.',
      '5. Direitos do Titular da LGPD: Você possui o direito de confirmar a existência de tratamento, acessar dados, corrigir dados incompletos ou solicitar a exclusão de sua conta e dos dados vinculados. Para exercer esses direitos, contate peptium.app@gmail.com.',
      '6. Retenção: Armazenamos seus dados enquanto sua conta estiver ativa. Ao cancelar a conta, os dados são anonimizados ou definitivamente apagados de nossos servidores.'
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
