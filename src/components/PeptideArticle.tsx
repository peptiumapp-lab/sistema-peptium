import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Calendar, Info, ShieldCheck, Zap, Heart, Brain, Activity, Beaker, Search } from 'lucide-react';

interface PeptideArticleProps {
  onBack: () => void;
  title?: string;
  category?: string;
  summary?: string;
  date?: string;
  image?: string;
  technicals?: {
    n?: string;
    duration?: string;
    p_value?: string;
    markers?: string[];
    source?: string;
  };
  references?: string[];
}

export default function PeptideArticle({ 
  onBack, 
  title = "O QUE SÃO PEPTÍDEOS?", 
  category = "Fundamentos",
  summary,
  date = "2024-03-18",
  image,
  technicals,
  references
}: PeptideArticleProps) {
  const classifications = [
    { category: 'Cicatrização', examples: 'BPC-157, TB-500, GHK-Cu, KPV', function: 'Recuperação de tecidos e anti-inflamação' },
    { category: 'Sistema Imunológico', examples: 'Glutationa, Timosina Alfa-1, LL-37', function: 'Modulação e fortalecimento imune' },
    { category: 'Longevidade', examples: 'Ipamorelin, Tesamorelina, Epithalon, FOXO4-DRI', function: 'Anti-aging e secretagogos de GH' },
    { category: 'Mitocondriais', examples: 'MOTS-c, SS-31, NAD+, L-Carnitina', function: 'Energia celular e função mitocondrial' },
    { category: 'Perda de Peso', examples: 'Semaglutida, Tirzepatida, Retatrutida', function: 'Regulação do apetite e metabolismo' },
    { category: 'Libido', examples: 'PT-141, Kisspeptina, Ocitocina', function: 'Função sexual e hormonal' },
    { category: 'Neuropeptídeos', examples: 'Selank, Semax, Cerebrolysin, Dihexa', function: 'Cognição, memória e neuroproteção' }
  ];

  return (
    <div className="min-h-screen bg-primary pb-32">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Navigation */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-accent hover:text-white transition-all group mb-12"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Voltar aos Guias
        </button>

        {/* Article Header */}
        <div className="p-8 md:p-12 rounded-[40px] bg-secondary/[0.02] border border-white/15 space-y-6 mb-12 overflow-hidden relative">
          {image && (
            <div className="absolute inset-0 opacity-10 grayscale hover:grayscale-0 transition-all duration-1000">
              <img src={image} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
            </div>
          )}
          
          <div className="relative z-10 space-y-6">
            <div className="inline-flex px-3 py-1 rounded-lg bg-accent/10 border border-accent/20 text-accent text-xs font-black uppercase tracking-wider">
              {category}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-sans font-black text-white italic tracking-tighter uppercase leading-[0.9]">
              {title.split(':')[0]} <br />
              <span className="text-white/60">{title.split(':')[1] || ""}</span>
            </h1>

            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/15">
              <div className="flex items-center gap-2 text-white/50 text-xs font-bold uppercase tracking-wider">
                <Calendar size={14} /> {date}
              </div>
              <div className="flex items-center gap-2 text-white/50 text-xs font-bold uppercase tracking-wider">
                <Clock size={14} /> Atualizado em {date}
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-16 text-white/70">
          
          {summary && (
             <section className="space-y-6">
             <h2 className="text-2xl font-black text-white uppercase italic tracking-tight flex items-center gap-3">
               <div className="w-1.5 h-1.5 rounded-full bg-accent" />
               Resumo Analítico
             </h2>
             <div className="p-8 rounded-[32px] bg-secondary/[0.08] border border-white/15 space-y-4">
               <p className="text-lg text-white font-medium italic leading-loose">
                 "{summary}"
               </p>
               <div className="pt-6 border-t border-white/15 grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-4">
                   <h4 className="text-xs font-black text-accent uppercase tracking-wider">Metodologia Sugerida</h4>
                   <ul className="space-y-2 text-xs font-bold uppercase tracking-wide text-white/60">
                     <li className="flex items-center gap-2"><div className="w-1 h-1 bg-accent rounded-full"/> Protocolo de 12 semanas</li>
                     <li className="flex items-center gap-2"><div className="w-1 h-1 bg-accent rounded-full"/> Monitoramento de IGF-1 basal</li>
                     <li className="flex items-center gap-2"><div className="w-1 h-1 bg-accent rounded-full"/> Administração SubQ noturna</li>
                   </ul>
                 </div>
                 <div className="space-y-4">
                   <h4 className="text-xs font-black text-accent uppercase tracking-wider">Impacto Bioquímico</h4>
                   <ul className="space-y-2 text-xs font-bold uppercase tracking-wide text-white/60">
                     <li className="flex items-center gap-2"><div className="w-1 h-1 bg-accent rounded-full"/> Modulação de receptores GHRH</li>
                     <li className="flex items-center gap-2"><div className="w-1 h-1 bg-accent rounded-full"/> Otimização da reparação celular</li>
                     <li className="flex items-center gap-2"><div className="w-1 h-1 bg-accent rounded-full"/> Redução de marcadores inflamatórios</li>
                   </ul>
                 </div>
               </div>
             </div>
           </section>
          )}

          {technicals && (
            <section className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-white uppercase italic tracking-tight flex items-center gap-3">
                  <Beaker size={24} className="text-accent" />
                  Dados de Excelência Técnica
                </h2>
                <div className="px-3 py-1 rounded bg-white/10 border border-white/20 text-xs font-black text-white/60 tracking-wider uppercase">
                  Fonte: {technicals.source || 'PubMed / ClinicalTrials.gov'}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Amostra (N)', value: technicals.n || 'N/A', icon: <Activity size={14} /> },
                  { label: 'Duração', value: technicals.duration || 'N/A', icon: <Clock size={14} /> },
                  { label: 'P-Value', value: technicals.p_value || '< 0.05', icon: <ShieldCheck size={14} /> },
                  { label: 'Confiança', value: '95% CI', icon: <ShieldCheck size={14} /> }
                ].map((stat, i) => ( stat.value && (
                  <div key={i} className="p-6 rounded-[24px] bg-white/[0.02] border border-white/15 space-y-2">
                    <div className="text-accent">{stat.icon}</div>
                    <div className="text-xs font-black text-white/50 uppercase tracking-wider">{stat.label}</div>
                    <div className="text-sm font-black text-white">{stat.value}</div>
                  </div>
                )))}
              </div>

              {technicals.markers && (
                <div className="p-8 rounded-[32px] bg-accent/5 border border-accent/10">
                  <h4 className="text-xs font-black text-accent uppercase tracking-wider mb-4">Principais Marcadores Clínicos</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
                    {technicals.markers.map((marker, i) => (
                      <div key={i} className="flex items-center gap-3 text-xs font-bold text-white/60">
                        <div className="w-1 h-1 rounded-full bg-accent" />
                        {marker}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {references && references.length > 0 && (
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black text-white uppercase italic tracking-tight flex items-center gap-3">
                  <Info size={20} className="text-accent" />
                  Bibliografia & Referências
                </h2>
                <button 
                  onClick={() => window.open(`https://www.openevidence.com/search?q=${encodeURIComponent(title)}`, '_blank')}
                  className="flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-xl text-xs font-black text-accent uppercase tracking-wider hover:bg-accent/20 transition-all"
                >
                  <Search size={14} />
                  Buscar no OpenEvidence
                </button>
              </div>
              <div className="space-y-2">
                {references.map((ref, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/[0.01] border border-white/15 text-xs font-mono text-white/60 hover:text-white/60 transition-colors">
                    [{String(i + 1).padStart(2, '0')}] {ref}
                  </div>
                ))}
              </div>
            </section>
          )}

          {!summary && (
            <>
              {/* Section: O que são */}
              <section className="space-y-6">
                <h2 className="text-2xl font-black text-white uppercase italic tracking-tight flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  O que são Peptídeos?
                </h2>
                <div className="space-y-4 text-base leading-loose font-medium">
                  <p>
                    No seu núcleo, peptídeos são pequenas cadeias de aminoácidos ligadas por ligações peptídicas — como contas em um colar. Para uma molécula ser classificada como peptídeo, deve conter entre 2 e 50 aminoácidos, com um grupo amina (NH2) em uma extremidade e um grupo carboxila (COOH) na outra.
                  </p>
                  <p>
                    Passe de 50, e eles são classificados como polipeptídeos. Cruze a marca de 100, e você agora tem uma proteína.
                  </p>
                  <p>
                    Apesar de seu tamanho, esses mensageiros moleculares estão longe de ser simples. Cada peptídeo tem sua própria assinatura farmacológica — uma capacidade intrínseca de se comunicar com células de maneira altamente seletiva e profundamente inteligente.
                  </p>
                  <p className="p-6 rounded-3xl bg-accent/5 border border-accent/10 text-white italic">
                    Peptídeos são a linguagem da função celular. Pense neles como mensagens passadas entre sistemas, dizendo ao corpo quando construir, o que decompor, quando se recuperar, quando proteger, quando descansar.
                  </p>
                </div>
              </section>

              {/* Section: História */}
              <section className="space-y-6">
                <h2 className="text-2xl font-black text-white uppercase italic tracking-tight flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Breve História dos Peptídeos
                </h2>
                <div className="space-y-4 text-base leading-loose font-medium">
                  <p>
                    O primeiro peptídeo comercialmente disponível foi a insulina. Isolada de pâncreas animais na década de 1920, ela mudou tudo para diabéticos tipo 1. Mas não foi até 1982 que vimos um grande avanço com a criação da primeira insulina humana recombinante, simetricamente sequenciada com 51 aminoácidos.
                  </p>
                  <p>
                    Agora temos peptídeos que melhoram a cognição, aceleram a cicatrização de feridas, modulam o sistema imunológico, promovem a perda de gordura, aumentam a libido, regeneram cartilagem e até retreinam o comportamento mitocondrial — tudo sem os efeitos colaterais de muitos produtos farmacêuticos convencionais.
                  </p>
                </div>
              </section>

              {/* Section: Não são milagre */}
              <section className="space-y-6">
                <h2 className="text-2xl font-black text-white uppercase italic tracking-tight flex items-center gap-3 text-red-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  Peptídeos NÃO São Drogas Milagrosas
                </h2>
                <div className="space-y-6 text-base leading-loose font-medium">
                  <p>
                    Peptídeos funcionam melhor quando tudo mais já está ajustado: nutrição, sono, treinamento, estresse, digestão. Se estas bases falham, não espere um milagre. 
                  </p>
                  <p>
                    Eles não são naturais. Acionam vias que seu corpo normalmente não ativaria nesse nível, podendo ampliar a cura e o metabolismo de formas impossíveis sem intervenção.
                  </p>

                  <div className="p-8 rounded-[32px] bg-blue-500/5 border border-blue-500/20 flex gap-6">
                    <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-blue-500/10 items-center justify-center text-blue-400 shrink-0">
                      <Info size={24} />
                    </div>
                    <div className="space-y-2">
                      <div className="text-blue-400 text-xs font-black uppercase tracking-wider">Flash Insight</div>
                      <p className="text-white text-sm font-black italic uppercase leading-tight">
                        Peptídeos não são instruções externas — são sinais na linguagem nativa do corpo. Você não está convencendo o corpo a fazer algo — está dando a ele o sinal ao qual ele já foi construído para responder.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* Section: Classificação Table (Show always or conditionally) */}
          <section className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tight">Classificação dos Peptídeos</h2>
              <p className="text-white/50 text-xs font-bold uppercase tracking-wider">Categorias Principais do Acervo</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="pb-4 text-xs font-black text-white/60 uppercase tracking-wider">Categoria</th>
                    <th className="pb-4 text-xs font-black text-white/60 uppercase tracking-wider">Exemplos</th>
                    <th className="pb-4 text-xs font-black text-white/60 uppercase tracking-wider">Principal Função</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {classifications.map((row, i) => (
                    <tr key={i} className="border-b border-white/15 hover:bg-white/[0.01] transition-colors">
                      <td className="py-6 font-black text-white uppercase italic pr-8">{row.category}</td>
                      <td className="py-6 font-mono text-xs text-accent pr-8">{row.examples}</td>
                      <td className="py-6 text-white/50 font-medium leading-tight">{row.function}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
