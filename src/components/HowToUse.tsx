import React from 'react';
import { Sparkles, Calculator, ShieldAlert, Search, ChevronRight, BookText } from 'lucide-react';

export default function HowToUse() {
  const tools = [
    {
      id: 'ai-generator',
      icon: <Sparkles className="w-8 h-8 text-fuchsia-500" />,
      title: 'Atlas AI Builder',
      subtitle: 'Gerador inteligente de protocolos avançados de biohacking.',
      steps: [
        { label: 'Acesso', desc: 'Abra o menu lateral (ou pelo atalho Cmd/Ctrl+K) e selecione "Atlas AI Builder".' },
        { label: 'Instrução', desc: 'Digite seu objetivo principal na barra (Ex: "Quero reduzir meu percentual de gordura e tratar inflamações nos joelhos").' },
        { label: 'Processamento', desc: 'Clique em "Executar Simulação Biológica". A inteligência artificial fará o cruzamento fisiológico de ponta e criará o seu roteiro perfeito.' },
        { label: 'Cofre', desc: 'Após estudar as táticas, os horários e o Manual de Aplicação Prática, role até o final da tela e clique em "Salvar no Cofre" para eternizar seu protocolo.' }
      ]
    },
    {
      id: 'calculator',
      icon: <Calculator className="w-8 h-8 text-cyan-500" />,
      title: 'Calculadora de Reconstituição',
      subtitle: 'Cálculo de dosagem de precisão para diluição de peptídeos.',
      steps: [
        { label: 'Acesso', desc: 'Acesse a "Calculadora de Reconstituição" pelo menu de ferramentas do sistema.' },
        { label: 'Inclusão de Dados', desc: 'Passe pelas caixas inserindo quantos miligramas (mg) tem no seu frasco, a quantidade de água bacteriostática (ml) utilizada para diluir, e selecione o tipo de seringa que você possui.' },
        { label: 'Alvo de Dosagem', desc: 'No último campo, informe o target terapêutico desejado por aplicação em microgramas (mcg).' },
        { label: 'Matemática Pronta', desc: 'O painel exibirá as unidades de marcação exatas (U ou marcas no êmbolo) que você precisará aspirar do frasco reconstruído.' }
      ]
    },
    {
      id: 'interactions',
      icon: <ShieldAlert className="w-8 h-8 text-orange-500" />,
      title: 'Guardião de Segurança',
      subtitle: 'Auditoria de sinergias bioquímicas, tolerância de empilhamento e choques de receptores.',
      steps: [
        { label: 'Acesso', desc: 'Vá até o "Guardião de Segurança (Interações)" através do painel geral ou busca rápida.' },
        { label: 'Seleção', desc: 'Nos painéis com menus vazados, clique e selecione quais compostos ou peptídeos você está cogitando juntar em uma mesma rotina.' },
        { label: 'Processamento', desc: 'O sistema auditará automaticamente o choque ou interações potenciais de cada elemento adicionado simultaneamente.' },
        { label: 'Veredito', desc: 'Analise os faróis indicativos. Eles dirão de imediato se sua intenção gera Sinergia Produtiva, Conflito ou Saturabilidade de receptor (colateral desnecessário).' }
      ]
    },
    {
      id: 'library',
      icon: <Search className="w-8 h-8 text-blue-500" />,
      title: 'Explorador (Biblioteca Core)',
      subtitle: 'Atlas anatômico com bulas, descritivos e dosagens padronizadas da indústria.',
      steps: [
        { label: 'Acesso', desc: 'Na barra de atalhos lateral, clique em "Explorar Core Peptídeos" (Data-Center).' },
        { label: 'Busca Direta', desc: 'Você pode pesquisar pelo campo de busca usando siglas ou termos de interesse. Além disso, as abas de categoria filtram imediatamente por especialidade (ex: Longevidade, Sono, Metabolismo).' },
        { label: 'Aprofundamento', desc: 'Clique sobre qualquer caixa/composto selecionado para ser exposto ao dossiê completo dele.' },
        { label: 'O Dossiê Livre', desc: 'Leia e absorva todos os detalhes de meia-vida biológica, estrutura molecular, métodos padrões e os riscos associados com mitigações essenciais.' }
      ]
    }
  ];

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center justify-center p-4 bg-accent/10 rounded-[2rem] border border-accent/20 mb-4 hover:bg-accent/20 transition-colors">
          <BookText className="w-10 h-10 text-accent" />
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none">
          Manual de <span className="text-accent">Uso Tático</span>
        </h2>
        <p className="text-white/50 text-xs md:text-sm max-w-2xl mx-auto font-medium leading-relaxed">
          Guia de Inteligência e Procedimento Operacional: Saiba como extrair o máximo de precisão, conhecimento biológico e segurança da plataforma. Operação passo-a-passo.
        </p>
      </div>

      <div className="space-y-8">
        {tools.map((tool) => (
          <div key={tool.id} className="relative bg-[#050505] border border-white/5 rounded-[2.5rem] p-6 lg:p-10 overflow-hidden group hover:border-white/10 transition-colors duration-500">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-accent/10 transition-colors duration-500" />
            
            <div className="relative z-10 flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
              <div className="md:w-1/3 shrink-0">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-[#0a0a0a] border border-white/5 rounded-2xl">
                    {tool.icon}
                  </div>
                  <div>
                    <h3 className="font-black text-white md:text-xl text-lg uppercase italic tracking-tighter leading-tight break-words pr-2">{tool.title}</h3>
                  </div>
                </div>
                <p className="text-xs lg:text-sm text-white/50 leading-relaxed font-medium">
                  {tool.subtitle}
                </p>
              </div>

              <div className="md:w-2/3 space-y-6 lg:space-y-8">
                {tool.steps.map((step, idx) => (
                  <div key={idx} className="flex gap-4 lg:gap-5 items-start">
                    <div className="flex flex-col items-center mt-1">
                      <div className="w-6 h-6 rounded-xl bg-accent/10 border border-accent/30 text-accent flex items-center justify-center text-xs font-black shrink-0 relative z-10 shadow-[0_0_15px_rgba(45,212,191,0.2)]">
                        {idx + 1}
                      </div>
                      {idx !== tool.steps.length - 1 && (
                        <div className="w-px h-full bg-white/5 my-1 min-h-[30px]" />
                      )}
                    </div>
                    <div className="pb-2">
                      <h4 className="text-[11px] font-black uppercase text-white/80 tracking-widest mb-2 flex items-center gap-2">
                        Passo {idx + 1} <ChevronRight size={10} className="text-accent" /> {step.label}
                      </h4>
                      <p className="text-[13px] md:text-sm text-white/50 leading-relaxed max-w-lg font-medium">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
