import React from 'react';
import { 
  Sparkles, Calculator, ShieldAlert, Search, ChevronRight, BookText, 
  Database, Layers, ClipboardList, Clock, Flame, Calendar, Dna, Activity, MapPin, Zap 
} from 'lucide-react';

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
    },
    {
      id: 'cofre-atlas',
      icon: <Database className="w-8 h-8 text-teal-400" />,
      title: 'Cofre Atlas (Protocol Vault)',
      subtitle: 'Armazenamento seguro e persistência dos seus dossiês gerados pela I.A.',
      steps: [
        { label: 'Acesso', desc: 'Acesse o "Cofre Atlas" pelo menu lateral ou pelo atalho de busca rápida.' },
        { label: 'Resgate', desc: 'Navegue pelos cards de histórico. O sistema lista cronologicamente todos os protocolos gerados e salvos por você, criptografados na sua conta.' },
        { label: 'Leitura', desc: 'Clique sobre o documento desejado para abrir imediatamente a análise tática completa, a tabela de mitigações e os manuais de aplicação.' },
        { label: 'Descarte', desc: 'Se um protocolo ficar obsoleto para seus objetivos, clique no botão de lixeira no card para purgá-lo da base de dados permanentemente.' }
      ]
    },
    {
      id: 'stacks',
      icon: <Layers className="w-8 h-8 text-indigo-500" />,
      title: 'Cofre de Stacks (Comunidade / Curadoria)',
      subtitle: 'Livraria de protocolos testados e consolidados por especialistas da comunidade.',
      steps: [
        { label: 'Acesso', desc: 'Vá para o "Cofre de Stacks" através do painel de controle principal.' },
        { label: 'Exploração', desc: 'Navegue pelas pastas de casos clínicos de sucesso (ex: "Protocolo Fênix (Seca)", "Protocolo Wolverine").' },
        { label: 'Estudo do Ciclo', desc: 'Acesse o card de cada stack para visualizar precisamente as semanas de ciclo, compostos-chave acoplados e os dias recomendados para descanso.' },
        { label: 'Aplicação', desc: 'Use como referencial anatômico na hora de testar sua própria tolerância; essas receitas já foram depuradas de interações prejudiciais.' }
      ]
    },
    {
      id: 'lab-scanner',
      icon: <ClipboardList className="w-8 h-8 text-emerald-400" />,
      title: 'Scan De Exames (OCR)',
      subtitle: 'Digitalização e mapeamento inteligente dos seus marcadores sanguíneos.',
      steps: [
        { label: 'Acesso', desc: 'Abra o "Scan De Exames (OCR)" a partir do menu integrado de longevidade.' },
        { label: 'Envio de Dados', desc: 'Faça o upload do seu último painel de exames de sangue ou digite manualmente os principais marcadores (Testosterona, Estradiol, Hemograma, SHBG).' },
        { label: 'Auditoria Funcional', desc: 'O sistema converte os dados e analisa discrepâncias com os "Padrões de Longevidade Ideal", em vez de focar nas amplas margens clínicas normais.' },
        { label: 'Diretiva', desc: 'Receba indicações diretas de quais compostos são adequados (ou perigosos) dada sua homeostase hormonal atual.' }
      ]
    },
    {
      id: 'longevity-clock',
      icon: <Clock className="w-8 h-8 text-blue-400" />,
      title: 'Relógio Longevidade (Epigenética)',
      subtitle: 'Calculadora preditiva da sua verdadeira idade celular.',
      steps: [
        { label: 'Acesso', desc: 'Selecione "Relógio Longevidade" no painel biológico.' },
        { label: 'Inputs Metabólicos', desc: 'Insira dados antropométricos e métricas basais atualizadas (frequência cardíaca em repouso, pressão arterial, VO2 max).' },
        { label: 'Cálculo Geroscience', desc: 'O algoritmo cruza as variáveis com dados de regressão de telômeros, determinando quão acelerado está seu envelhecimento orgânico.' },
        { label: 'Projeção Tática', desc: 'Utilize esses dados de antes, durante e depois da introdução dos peptídeos para verificar a desaceleração do seu relógio biológico.' }
      ]
    },
    {
      id: 'fasting-tracker',
      icon: <Flame className="w-8 h-8 text-orange-400" />,
      title: 'Tracker de Jejum Celular',
      subtitle: 'Monitorador das vias de autofagia e restrição calórica inteligente.',
      steps: [
        { label: 'Acesso', desc: 'Clique na aba "Jejum Celular" na barra de controle.' },
        { label: 'Início', desc: 'Defina seu alvo (16h, 18h, 24h ou prolongado) e acione o timer de privação metabólica.' },
        { label: 'Estágios Bioquímicos', desc: 'Acompanhe graficamente em qual estágio seu corpo está: Queima de Glicogênio, Lipólise, Autofagia Profunda, ou Pico de GH.' },
        { label: 'Sinergia', desc: 'Descubra a janela de ouro (horários ideais de jejum) para aplicar compostos termogênicos de forma otimizada.' }
      ]
    },
    {
      id: 'cycle-planner',
      icon: <Calendar className="w-8 h-8 text-sky-400" />,
      title: 'Macro Cycle Planner (Cronograma)',
      subtitle: 'Planejador visual de meses de periodização (Blasting, Cruising e Resting).',
      steps: [
        { label: 'Acesso', desc: 'Va ao painel do "Macro Cycle Planner" para organizar sua infraestrutura anual.' },
        { label: 'Definição Estrutural', desc: 'Diferente da agenda diária, este planner programa Fases. Selecione os meses focados em hiperbolização, e em seguida meses obrigatórios de "washout" (limpeza orgânica).' },
        { label: 'Rastreio de Saturação', desc: 'O sistema alerta quando você planejar meses contínuos demais de uso do mesmo composto (evitando a dessensibilização dos receptores de insulina ou IGF-1).' },
        { label: 'Visão Panorâmica', desc: 'Visualize o ano inteiro e saiba exatamente a rotação trimestral dos seus stacks.' }
      ]
    },
    {
      id: 'genome-analyzer',
      icon: <Dna className="w-8 h-8 text-violet-500" />,
      title: 'Análise de Genoma (DNA)',
      subtitle: 'Predição de compatibilidade de compostos e SNPs limitantes.',
      steps: [
        { label: 'Acesso', desc: 'Habilite a "Análise de Genoma" na seção de Bio-Analytics Avançada.' },
        { label: 'Importação', desc: 'Adicione suas variantes genéticas relevantes (como mutações MTHFR, COMT, APOE4).' },
        { label: 'Pareamento', desc: 'Descubra de imediato se sua biologia é geneticamente predisposta a aromatizar de forma agressiva, ou se compostos dopaminérgicos trarão rebote.' },
        { label: 'Arquitetura Customizada', desc: 'A ferramenta criará escudos moleculares que "bypassam" suas falhas genéticas (ex: indicação de metilados estruturais).' }
      ]
    },
    {
      id: 'microbiome-tracker',
      icon: <Activity className="w-8 h-8 text-lime-500" />,
      title: 'Tracker de Microbioma',
      subtitle: 'Saúde digestiva, absorção entérica e integridade da barreira do intestino.',
      steps: [
        { label: 'Acesso', desc: 'Acesse o "Tracker de Microbioma" onde a imunidade biológica impera.' },
        { label: 'Sinergia Oral', desc: 'Registre o uso associado de peptídeos como BPC-157 oral, que foca unicamente na reconstituição entérica.' },
        { label: 'Gatilhos', desc: 'Acompanhe fatores dietéticos, inchaço e inflamações sub-clínicas. A saúde da flora determina quão bem os demais compostos sistêmicos circulam e se mantém anti-inflamatórios.' },
        { label: 'Relatórios', desc: 'Obtenha um escore de absorção intestinal baseado na consistência do seu padrão digestivo relatado.' }
      ]
    },
    {
      id: 'map',
      icon: <MapPin className="w-8 h-8 text-rose-500" />,
      title: 'Mapa de Clínicas / Bio-Hacking',
      subtitle: 'Geolocalização de pontos de acesso seguro, clínicas e laboratórios.',
      steps: [
        { label: 'Acesso', desc: 'Abra o menu de "Mapa de Bio-Hacking".' },
        { label: 'Radar de Recursos', desc: 'O sistema plota no mapa geográfico referências da comunidade, laboratórios de coleta por perto, ou fornecimento validado de insumos estéreis (agulhas, seringas, água bacteriostática).' },
        { label: 'Navegação', desc: 'Selecione o pin e acesse contato rápido ou rotas GPS para abastecer sua infraestrutura e laboratório caseiro.' },
        { label: 'Qualificação', desc: 'Verifique ratings da comunidade indicando a pureza e discrição das clínicas marcadas no mapa.' }
      ]
    },
    {
      id: 'neuro-matrix',
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      title: 'Neuro Matrix',
      subtitle: 'Mapeamento cognitivo, focus lock e gestão de Peptídeos Nootrópicos.',
      steps: [
        { label: 'Acesso', desc: 'Acesse o "Neuro Matrix" na aba de aprimoramento do SNC (Sistema Nervoso Central).' },
        { label: 'Setup Cognitivo', desc: 'Mapeie suplementação e drogas com eixo de atuação cerebral (como Selank, Semax, Cerebrolysin).' },
        { label: 'Sensoriamento de Fadiga', desc: 'Rastreie picos de fluxo cerebral versus fadiga adrenérgica. Evite empilhar excesso de estimulantes cruzando limites noradrenérgicos.' },
        { label: 'Otimização', desc: 'Alcance o "Flow State" com relatórios de performance associada aos horários exatos da sua administração intranasal ou sub-cutânea.' }
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
          Guia de Inteligência e Procedimento Operacional: Saiba como extrair o máximo de precisão, conhecimento biológico e segurança da plataforma. Operação passo-a-passo minuciosa para cada módulo do sistema.
        </p>
      </div>

      <div className="space-y-8">
        {tools.map((tool) => (
          <div key={tool.id} className="relative bg-[#050505] border border-white/15 rounded-[2.5rem] p-6 lg:p-10 overflow-hidden group hover:border-white/20 transition-colors duration-500">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-accent/10 transition-colors duration-500" />
            
            <div className="relative z-10 flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
              <div className="md:w-1/3 shrink-0">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-[#0a0a0a] border border-white/15 rounded-2xl">
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
                        <div className="w-px h-full bg-white/10 my-1 min-h-[30px]" />
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
