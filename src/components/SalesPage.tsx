import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Shield, Activity, CheckCircle2, ArrowUpRight, Star, Zap, Plus, Hexagon, ShieldAlert, ChevronRight, Beaker, Apple, Target, Users, BookOpen, ArrowLeft, Microscope, Check, Lock } from 'lucide-react';
import { SUPPORT_LINK, PROTOCOLS, TOTAL_PEPTIDES, SYNERGY_PROTOCOLS } from '../constants';
import { View } from '../App';
import ProtocolCard from './ProtocolCard';
import { useAuth } from '../contexts/AuthContext';
import { upgradeToPro } from '../lib/firebase';
import { PayPalButtons } from '@paypal/react-paypal-js';

interface SalesPageProps {
  setView: (view: View) => void;
}

export default function SalesPage({ setView }: SalesPageProps) {
  const { user, isPro, openAuthModal } = useAuth();
  const [couponCode, setCouponCode] = React.useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const params = new URLSearchParams(window.location.search);
    const code = params.get('coupon');
    if (code) {
      setCouponCode(code);
      sessionStorage.setItem('pendingCoupon', code);
    } else {
      const pendingCoupon = sessionStorage.getItem('pendingCoupon');
      if (pendingCoupon) setCouponCode(pendingCoupon);
    }
  }, []);

  const handleLoginClick = async () => {
    openAuthModal();
  };

  const protocolsToShow = (SYNERGY_PROTOCOLS || []).slice(0, 8);
  const remainingCount = (SYNERGY_PROTOCOLS?.length || 0) - 8;

  return (
    <div className="bg-primary selection:bg-accent selection:text-black min-h-screen">
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 pt-8">
           <button 
             onClick={() => setView('home')}
             className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-secondary/60 hover:text-accent transition-all group"
           >
             <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
             Voltar para a Home
           </button>
        </div>
        {/* 1. HERO - POSICIONAMENTO SOFTWARE / ATLAS INTERATIVO */}
        <section id="inicio" className="pt-16 pb-24 border-b border-white/15 relative overflow-hidden bg-gradient-to-b from-black to-[#050505]">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                {couponCode && (
                  <div className="inline-block bg-accent/20 border border-accent/30 text-accent px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider animate-pulse">
                     🎉 Cupom de Desconto Ativado!
                  </div>
                )}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                  <span className="text-xs font-black text-accent uppercase tracking-wider">Atlas Clínico Interativo V5.0</span>
                </div>
              <h2 className="text-3xl md:text-5xl font-sans font-black text-white leading-[0.95] uppercase tracking-tighter italic">
                O SOFTWARE <br />
                <span className="text-accent underline decoration-accent/30 underline-offset-[10px]">DEFINITIVO</span> <br />
                EM PEPTÍDEOS.
              </h2>
              <p className="text-white/60 text-xs md:text-[11px] font-bold leading-loose uppercase tracking-wider max-w-xl">
                Não é um e-book. Não é uma tabela. É o ecossistema de inteligência molecular mais avançado do mercado. O Peptium Prime Atlas entrega <span className="text-white font-black underline decoration-accent underline-offset-4">ROTAS BIOLÓGICAS</span> de recuperação e performance validadas.
              </p>
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                  <button 
                    onClick={() => document.getElementById('planos-vendas')?.scrollIntoView({ behavior: 'smooth' })}
                    className="w-full sm:w-auto px-10 py-5 bg-accent text-black rounded-2xl font-black text-xs uppercase tracking-wider shadow-xl shadow-accent/20 hover:scale-105 active:scale-95 transition-all"
                  >
                    DESBLOQUEAR ATLAS CLÍNICO
                  </button>
                  <button 
                    onClick={() => document.getElementById('protocolos-sinergia')?.scrollIntoView({ behavior: 'smooth' })}
                    className="w-full sm:w-auto px-10 py-5 bg-white/10 border border-white/20 text-white rounded-2xl font-black text-xs uppercase tracking-wider hover:bg-white/20 transition-all"
                  >
                    VER PROTOCOLO DE SINERGIA
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                  <div className="p-6 rounded-[32px] bg-white/[0.02] border border-white/15 group hover:border-accent/20 transition-all">
                    <div className="text-4xl font-sans font-black text-white italic mb-1 group-hover:scale-105 transition-transform tracking-tighter">{TOTAL_PEPTIDES}+</div>
                    <div className="text-[7px] font-black text-white/50 uppercase tracking-wider">Moléculas Catalogadas</div>
                  </div>
                  <div className="p-6 rounded-[32px] bg-white/[0.02] border border-white/15 group hover:border-accent/20 transition-all">
                    <div className="text-4xl font-sans font-black text-white italic mb-1 group-hover:scale-105 transition-transform tracking-tighter">∞</div>
                    <div className="text-[7px] font-black text-white/50 uppercase tracking-wider">Sinergias Moleculares</div>
                  </div>
                  <div className="p-6 rounded-[32px] border-2 border-accent/20 bg-accent/5 group hover:bg-accent/10 transition-all">
                    <div className="text-4xl font-sans font-black text-accent italic mb-1">REAL</div>
                    <div className="text-[7px] font-black text-accent/50 uppercase tracking-wider">Atlas Interativo</div>
                  </div>
                </div>
              </div>
              <div className="relative group lg:pl-10">
                <div className="absolute -inset-10 bg-accent/10 blur-[120px] rounded-full opacity-50 animate-pulse" />
                <div className="relative aspect-square bg-[#0B0C10] border border-white/20 rounded-[64px] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] p-1">
                   <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-accent/10 to-transparent pointer-events-none" />
                   <div className="h-full w-full rounded-[60px] overflow-hidden border border-white/20 bg-black flex flex-col items-center justify-center p-12 text-center space-y-8">
                      <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                        <Activity size={48} className="animate-pulse" />
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-2xl font-sans font-black text-white uppercase italic tracking-tighter leading-none">High-Impact <br />Summary Cards</h3>
                        <p className="text-xs font-bold text-white/50 uppercase tracking-wider leading-loose">Impacto Global, Eixos Clínicos e Mecanismos de Ação mapeados visualmente.</p>
                      </div>
                      <div className="w-full h-[1px] bg-white/10" />
                      <div className="grid grid-cols-2 gap-4 w-full">
                        <div className="text-left space-y-1">
                          <div className="text-xs font-black text-accent uppercase tracking-wider">Matriz de Evidência</div>
                          <div className="text-xs font-bold text-white/60">HUMANA | RCT | VIVO</div>
                        </div>
                        <div className="text-right space-y-1">
                          <div className="text-xs font-black text-accent uppercase tracking-wider">Acesso Direto</div>
                          <div className="text-xs font-bold text-white/60">PUBMED / PMID LINKS</div>
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 1.5 NOVIDADES V5.0 - A EVOLUÇÃO */}
        <section className="py-24 bg-[#0a0a0a] border-y border-white/15 relative overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row gap-20 items-start">
              <div className="lg:w-1/3 space-y-8 sticky top-24">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full">
                  <Zap size={10} className="text-red-500" />
                  <span className="text-xs font-black text-red-500 uppercase tracking-wider">Grande Atualização V5.0</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-sans font-black text-white leading-[0.9] uppercase tracking-tighter italic">
                  A EVOLUÇÃO <br />
                  <span className="text-accent">CHEGOU.</span>
                </h2>
                <p className="text-white/60 text-[11px] font-medium leading-loose uppercase tracking-wider">
                  De Performance Biohacker à <span className="text-white font-black">Medicina Regenerativa de Fronteira</span>. O Peptium Prime Atlas passou pela sua maior atualização clínica. Reprogramar o terreno biológico celular é a medicina do presente.
                </p>
                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                    <span className="text-xs font-black text-white/60 uppercase tracking-wider">NIH PubMed Audited</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                    <span className="text-xs font-black text-white/60 uppercase tracking-wider">ClinicalTrials.gov Data</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                    <span className="text-xs font-black text-white/60 uppercase tracking-wider">WADA Compliance Ready</span>
                  </div>
                </div>
              </div>

              <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Heavy Weights */}
                <div className="col-span-full mb-6">
                  <h3 className="text-xs font-black text-accent uppercase tracking-[0.5em] mb-8 border-l-2 border-accent pl-4">Os Novos "Heavy Weights" Adicionados</h3>
                </div>
                
                {[
                  { title: "Metabolismo Profundo", items: "Tirzepatida, Retatrutida, MOTS-c", desc: "Domínio glicêmico agressivo e reprogramação mitocondrial." },
                  { title: "Saúde Neural Real", items: "Cerebrolysin, Dihexa, Semax", desc: "Proteção neurodegenerativa, reparo isquêmico e hiper-foco." },
                  { title: "Longevidade Exordial", items: "SS-31, ARA-290, Epitalon", desc: "Resgate da mitocôndria e ativação profunda de telomerase." },
                  { title: "Eixo Imuno-Endócrino", items: "TA1, LL-37, TRH", desc: "Regulação de defesa e restauração de ritmos tireoidianos." }
                ].map((item, i) => (
                  <div key={i} className="p-8 rounded-[32px] bg-white/[0.02] border border-white/15 hover:border-accent/20 transition-all group">
                    <div className="text-accent mb-4 group-hover:scale-110 transition-transform">
                      <Hexagon size={24} />
                    </div>
                    <h4 className="text-sm font-black text-white uppercase tracking-tighter mb-2 italic">{item.title}</h4>
                    <div className="text-xs font-black text-accent/60 uppercase tracking-wider mb-3">{item.items}</div>
                    <p className="text-xs font-medium text-white/50 uppercase leading-loose tracking-wider">{item.desc}</p>
                  </div>
                ))}

                {/* Sinergias Ouro */}
                <div className="col-span-full mt-12 mb-6">
                  <h3 className="text-xs font-black text-accent uppercase tracking-[0.5em] mb-8 border-l-2 border-accent pl-4">Protocolos Ouro (Sinergias Estruturadas)</h3>
                </div>

                {[
                  { title: "Cardiometabolic Master", desc: "Tirzepatida + MOTS-c: Resensibilização insulínica extrema." },
                  { title: "Cardio-Vascular Resilience", desc: "TB-500 + BPC-157 + ARA-290: Reparo vascular sistêmico." },
                  { title: "Circadian Deep Sleep", desc: "DSIP + Epitalon: Resgate das ondas cerebrais Delta." },
                  { title: "Gut Barrier Repair", desc: "Fundamentos Khavinson: Resolvendo o Leaky Gut real." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 p-6 rounded-3xl bg-accent/5 border border-accent/10 items-center group hover:bg-accent/10 transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center text-black shrink-0">
                      <Star size={20} fill="currentColor" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-black text-white uppercase tracking-wider mb-1">{item.title}</h4>
                      <p className="text-xs font-bold text-white/60 uppercase tracking-wider">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 2. PROTOCOLOS DE SINERGIA - O GRANDE ARGUMENTO */}
        <section id="protocolos-sinergia" className="py-24 bg-black border-b border-white/15 relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="mb-16 space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full">
                <Plus size={10} className="text-accent" />
                <span className="text-xs font-black text-accent uppercase tracking-wider">Funcionalidade Exclusiva</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-sans font-black text-white uppercase italic tracking-tighter leading-[0.85]">
                PROTOCOLOS DE <br />
                <span className="text-accent">SINERGIA MOLECULAR</span>
              </h2>
              <p className="text-white/60 text-xs font-bold leading-loose uppercase tracking-wider">
                O Atlas não te diz apenas o que é uma molécula. Ele te entrega a <span className="text-white underline decoration-accent underline-offset-4">STACK</span> exata para tratar patologias e otimizar bio-marcadores específicos.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {protocolsToShow.map((protocol, i) => (
                <div key={i} className="p-5 rounded-[24px] bg-white/[0.02] border border-white/15 hover:border-accent/20 transition-all group relative overflow-hidden flex flex-col min-h-[160px]">
                  <div className="space-y-4">
                    <div className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                      <Zap size={16} />
                    </div>
                    <div>
                      <div className="text-[7px] font-black text-accent uppercase tracking-wider mb-1">{protocol.target}</div>
                      <h3 className="text-[12px] font-sans font-black text-white uppercase italic tracking-tighter leading-tight">{protocol.name}</h3>
                    </div>
                    <p className="text-xs font-bold text-white/60 uppercase tracking-wider leading-loose line-clamp-2">{protocol.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-col items-center gap-6">
              <button 
                onClick={() => document.getElementById('planos-vendas')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 bg-white/10 border border-accent/20 rounded-2xl flex items-center gap-4 group hover:bg-white/20 transition-all shadow-[0_0_30px_rgba(0,229,255,0.1)]"
              >
                <div className="text-left">
                  <span className="block text-xs font-black uppercase tracking-wider text-accent mb-0.5 italic">CONTEÚDO PRIME</span>
                  <span className="text-[11px] font-black uppercase tracking-wider text-white">
                    Desbloquear Catálogo (+{remainingCount} itens)
                  </span>
                </div>
                <Lock size={16} className="text-accent" />
              </button>
              <p className="text-xs font-black text-white/60 uppercase tracking-wider">Protocolos atualizados semanalmente pela nossa IA</p>
            </div>

            <div className="mt-16 p-10 rounded-[48px] bg-accent/5 border border-accent/20 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-12 opacity-5">
                  <ShieldAlert size={160} />
               </div>
               <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <h3 className="text-2xl md:text-3xl font-sans font-black text-white uppercase italic leading-none tracking-tighter">
                      E MUITO MAIS: <br />
                      <span className="text-accent">DAS PATOLOGIAS À PERFORMANCE</span>
                    </h3>
                    <p className="text-xs font-bold text-white/60 uppercase tracking-wider leading-loose">
                      Cobrimos desde saúde cardiovascular e hepática (Esteatose) até neuropatias, 
                      saúde ocular (Visoluten), bócio e biorreguladores russos de Khavinson.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3 justify-end italic">
                    {['Bone Fortress', 'Hepatic Detox', 'Anxiety Relief', 'Vision Repair', 'Mitochondrial Awakening'].map((p, i) => (
                      <div key={i} className="px-5 py-3 bg-white/10 border border-white/20 rounded-2xl text-xs font-black text-white/60 uppercase tracking-wider">
                        {p}
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* 3. ARSENAL DE DADOS - CATEGORIAS */}
        <section className="py-24 bg-black border-b border-white/15">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-20 space-y-4">
              <h2 className="text-3xl md:text-5xl font-sans font-black text-white uppercase italic tracking-tighter">
                ARSENAL DE <span className="text-accent">{TOTAL_PEPTIDES}+ MOLÉCULAS</span>
              </h2>
              <p className="text-xs font-black text-white/50 uppercase tracking-[0.5em]">O Banco de Dados mais completo e atualizado</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Metabolismo", items: "Tirzepatida, Retatrutida, 5-Amino-1MQ", color: "accent" },
                { title: "Longevidade", items: "Epitalon, Endoluten, SS-31, GHK-Cu", color: "blue-500" },
                { title: "Nootrópicos", items: "Cerebrolysin, Dihexa, Semax", color: "purple-500" },
                { title: "Recuperação & Reparo", items: "BPC-157, TB-500, ARA-290", color: "red-500" },
                { title: "Imunidade", items: "TA1, LL-37, Vladonix", color: "green-500" },
                { title: "Performance/GH", items: "Tesamorelin, Ipamorelina, GHRPs", color: "orange-500" },
                { title: "Saúde Sexual", items: "PT-141, MT2, Kisspeptina", color: "pink-500" },
                { title: "Órgão-Específico", items: "Visoluten, Bronchogen, TRH", color: "cyan-500" }
              ].map((cat, i) => (
                <div key={i} className="p-8 rounded-[32px] bg-white/[0.01] border border-white/15 hover:bg-white/[0.03] transition-all group">
                  <div className="text-xs font-black text-white uppercase tracking-wider mb-4 flex items-center justify-between">
                    {cat.title}
                    <ChevronRight size={12} className="text-accent opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                  <div className="text-xs font-bold text-white/50 uppercase leading-loose tracking-wider">{cat.items}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. EVIDÊNCIA E CIÊNCIA */}
        <section id="base-cientifica" className="py-24 bg-gradient-to-b from-transparent to-accent/[0.01] border-b border-white/15">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 text-accent">
                  <Star size={12} fill="currentColor" />
                  <span className="text-xs font-black uppercase tracking-wider">Auditado Cientificamente</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-sans font-black text-white leading-[0.9] uppercase tracking-tighter italic">
                  SEM ACHISMO.<br />SOFTWARE <span className="text-accent underline decoration-4 underline-offset-[10px]">AUDITADO.</span>
                </h2>
                <p className="text-white/60 text-xs font-bold leading-loose uppercase tracking-wider">
                  A espinha dorsal de dados do Atlas é construída sob a validação científica pesada do <span className="text-white">NIH PubMed</span>, Ensaios Globais da <span className="text-white">ClinicalTrials.gov</span>, Biblioteca Química da <span className="text-white">PubChem</span> e conformidade com os padrões <span className="text-white">WADA</span>. O seu cliente não acessa palpites; acessa ciência rastreável em segundos.
                </p>
                <div className="grid grid-cols-2 gap-6">
                   <div className="p-6 border border-white/15 rounded-[32px] bg-white/[0.01]">
                      <div className="text-3xl font-black text-white mb-1">∞</div>
                      <div className="text-xs font-bold text-white/50 uppercase tracking-wider">PubMed Direct Links</div>
                   </div>
                   <div className="p-6 border border-white/15 rounded-[32px] bg-white/[0.01]">
                      <div className="text-3xl font-black text-white mb-1">100%</div>
                      <div className="text-xs font-bold text-white/50 uppercase tracking-wider">Eixos Clínicos Ativos</div>
                   </div>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-x-20 -inset-y-10 bg-accent/20 blur-[100px] rounded-full opacity-50 group-hover:opacity-80 transition-opacity" />
                <div className="aspect-video bg-[#0B0C10] border border-white/15 rounded-[48px] overflow-hidden relative shadow-2xl">
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.05)_0%,transparent_70%)]" />
                   <img 
                    src="https://images.unsplash.com/photo-1579154235884-331505f562bd?q=80&w=1200&auto=format&fit=crop" 
                    alt="Lab" 
                    className="w-full h-full object-cover grayscale opacity-20 group-hover:scale-105 transition-transform duration-1000 mix-blend-luminosity" 
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-accent/20 border border-accent/40 backdrop-blur-xl flex items-center justify-center text-accent animate-pulse">
                        <Microscope size={32} />
                      </div>
                   </div>
                   <div className="absolute bottom-6 left-6 right-6">
                      <div className="p-4 bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl space-y-3">
                        <div className="flex gap-1 text-accent">
                          {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                        </div>
                        <p className="text-xs font-medium text-white/70 leading-loose italic uppercase tracking-[0.1em]">
                          "O Peptium Prime é o único que entrega a interpretação clínica mastigada vinculada ao estudo original."
                        </p>
                        <div className="text-[7px] font-black text-white/60 uppercase tracking-wider">Dr. Lucas V. | Neurologista</div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. SOLUÇÕES POR PATOLOGIA - FOCO NAS DORES DO CLIENTE */}
        <section className="py-24 bg-black border-b border-white/15 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-5xl font-sans font-black text-white uppercase italic tracking-tighter">
                SOLUÇÕES PARA <span className="text-accent underline decoration-accent underline-offset-8 italic">PATOLOGIAS COMPLEXAS</span>
              </h2>
              <p className="text-xs font-black text-white/50 uppercase tracking-wider max-w-2xl mx-auto">
                Não importa o quão agressivo seja o quadro. O Atlas entrega a rota biológica para restauração celular.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { 
                  pain: "SOFRE COM INSÔNIA SEVERA?", 
                  sol: "Reset neuroendócrino profundo com o protocolo Circadian Deep Sleep (DSIP + Epitalon). Resgate o ritmo circadiano original.",
                  icon: <Zap size={24} />
                },
                { 
                  pain: "DOR CRÔNICA OU NEUROPATIA?", 
                  sol: "Modulação agressiva da inflamação nervosa com ARA-290 e BPC-157. Recupere a mobilidade e o bem-estar sistêmico.",
                  icon: <ShieldAlert size={24} />
                },
                { 
                  pain: "PROBLEMAS DIGESTIVOS (CROHN/GUT)?", 
                  sol: "Protocolo Gut Barrier Repair. Reconstrução endotelial do trato gastrointestinal e selamento da barreira intestinal.",
                  icon: <Activity size={24} />
                },
                { 
                  pain: "FADIGA E BAIXA ENERGIA?", 
                  sol: "Mitochondrial Awakening. Ative a biogênese mitocondrial e restaure a produção de ATP em nível celular.",
                  icon: <Plus size={24} />
                }
              ].map((item, i) => (
                <div key={i} className="p-10 rounded-[48px] bg-white/[0.01] border border-white/15 hover:border-accent/20 transition-all group flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-16 h-16 rounded-3xl bg-accent/10 flex items-center justify-center text-accent shrink-0 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-sans font-black text-white uppercase italic tracking-tighter leading-none group-hover:text-accent transition-colors">
                      {item.pain}
                    </h3>
                    <p className="text-[11px] font-medium text-white/60 uppercase leading-loose tracking-wider">
                      {item.sol}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. TESTEMUNHOS */}
        <section className="py-24 bg-black border-b border-white/15">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col items-center mb-16 text-center">
              <div className="flex gap-1 text-yellow-500 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">RESULTADOS QUE FALAM <span className="text-accent">POR SI SÓ</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  text: "Antes do Peptium Prime, gastava horas pesquisando artigos no PubMed para validar dosagens. A plataforma centralizou tudo com base científica sólida. Reduzi meu tempo de pesquisa em 80%.",
                  name: "Dr. Ricardo Mendes",
                  role: "Médico Endocrinologista",
                  initials: "RM"
                },
                { 
                  text: "Uso diariamente para consultar doses e protocolos dos meus peptídeos. Agora tenho tudo centralizado e baseado em evidências.",
                  name: "Marina Costa",
                  role: "Atleta de Crossfit",
                  initials: "MC"
                },
                { 
                  text: "Meu médico prescreveu GHK-Cu e CJC-1295, mas eu não entendia nada. O Peptium Prime me explicou de forma acessível o que cada um faz e como funciona.",
                  name: "Paulo Henrique",
                  role: "Paciente Elite",
                  initials: "PH"
                }
              ].map((t, i) => (
                <div key={i} className="p-8 rounded-[32px] bg-white/[0.02] border border-white/15 space-y-6">
                  <div className="flex gap-1 text-yellow-500">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <p className="text-[11px] font-bold text-white/60 leading-loose uppercase tracking-wider italic leading-loose">
                    "{t.text}"
                  </p>
                  <div className="flex items-center gap-4 pt-4 border-t border-white/15">
                    <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-black text-xs">
                      {t.initials}
                    </div>
                    <div>
                      <div className="text-xs font-black text-white uppercase tracking-wider">{t.name}</div>
                      <div className="text-xs font-bold text-white/50 uppercase tracking-wider">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. PLANOS DE ACESSO */}
        <section id="planos-vendas" className="py-32 bg-black border-b border-white/15">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="mb-20 space-y-4">
              <h2 className="text-4xl md:text-6xl font-sans font-black tracking-tighter uppercase text-white italic leading-none">
                ESCOLHA SEU PLANO
              </h2>
              <p className="text-xs font-bold text-white/60 uppercase tracking-wider max-w-xl mx-auto leading-loose">
                Desbloqueie acesso completo à plataforma com o plano ideal para você.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-10 max-w-4xl mx-auto">
              {/* PRO MENSAL */}
              <div className="flex flex-col p-10 rounded-[40px] bg-[#141414] border border-white/15 group hover:bg-[#1A1A1A] transition-all">
                <h3 className="text-xs font-black text-white/60 tracking-wider uppercase mb-8">PRO MENSAL</h3>
                <div className="mb-8 text-left">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-sans font-black text-white italic leading-none tracking-tighter">R$ 99,99</span>
                    <span className="text-xs font-black text-white/60 uppercase ml-2">/mês</span>
                  </div>
                </div>
                <ul className="space-y-5 mb-12 flex-grow text-left">
                  {["Atlas Interativo Completo", "Calculadoras de Precisão", "Protocolos de Sinergia", "Base de Dados PubMed"].map((f, i) => (
                    <li key={i} className="flex items-center gap-4 text-xs font-bold text-white/60 uppercase tracking-wider leading-none">
                      <CheckCircle2 size={12} className="text-accent/60" /> {f}
                    </li>
                  ))}
                </ul>
                {isPro ? (
                  <button disabled className="w-full py-5 bg-white/10 border border-white/20 rounded-2xl text-xs font-black text-white text-center uppercase tracking-wider opacity-50 cursor-not-allowed">
                    Plano Ativo
                  </button>
                ) : !user ? (
                  <button 
                    onClick={handleLoginClick}
                    className="w-full py-5 bg-white/10 border border-white/20 rounded-2xl text-xs font-black text-white text-center uppercase tracking-wider hover:bg-white/20 transition-all"
                  >
                    Entrar para Assinar
                  </button>
                ) : (
                  <div style={{ position: 'relative', zIndex: 0, minHeight: '48px' }}>
                    <PayPalButtons
                      style={{ layout: "horizontal", color: "blue", shape: "rect", height: 48 }}
                      createSubscription={(data, actions) => {
                          const planId = import.meta.env.VITE_PAYPAL_PLAN_ID_MONTHLY_BRL || 'P-5B76934704315025ENIUMBVI';
                          return actions.subscription.create({ plan_id: String(planId) });
                      }}
                      onApprove={async (data, actions) => {
                        try {
                          await upgradeToPro(user.uid);
                          alert('Pagamento aprovado via PayPal! Você agora é um membro Prime.');
                          window.location.reload();
                        } catch (error) {
                          console.error(error);
                          alert('Erro ao finalizar o pagamento.');
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

              {/* PRO ANUAL */}
              <div className="flex flex-col p-10 rounded-[40px] bg-[#141414] border-2 border-accent relative sm:scale-105 z-20 shadow-2xl">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-accent text-black font-black text-xs uppercase tracking-wider rounded-full">Melhor Valor</div>
                <h3 className="text-xs font-black text-accent tracking-wider uppercase mb-8 text-left">PRO ANUAL</h3>
                <div className="mb-8 text-left">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-sans font-black text-white italic leading-none tracking-tighter uppercase">R$ 475,20</span>
                    <span className="text-xs font-black text-white/60 uppercase ml-2 italic">/ano</span>
                  </div>
                  <div className="flex items-center gap-3 mt-4">
                    <span className="text-sm font-bold text-white/50 line-through">R$ 1.188,00</span>
                    <span className="px-2 py-0.5 bg-accent/20 text-accent font-black text-xs uppercase rounded">-60% OFF</span>
                  </div>
                </div>
                <ul className="space-y-5 mb-12 flex-grow text-left">
                  {["Tudo do Mensal", "Update Vitalício V5.0", "Consultoria em Comunidade", "Dossiês de Novos Ativos"].map((f, i) => (
                    <li key={i} className="flex items-center gap-4 text-xs font-black text-white uppercase tracking-wider leading-none">
                      <CheckCircle2 size={14} className="text-accent" /> {f}
                    </li>
                  ))}
                </ul>
                {isPro ? (
                  <button disabled className="w-full py-7 bg-accent text-black rounded-[20px] text-[12px] font-black text-center uppercase tracking-wider opacity-50 cursor-not-allowed">
                    Plano Ativo
                  </button>
                ) : !user ? (
                  <button 
                    onClick={handleLoginClick}
                    className="w-full py-7 bg-accent text-black rounded-[20px] text-[12px] font-black text-center uppercase tracking-wider shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    Entrar para Assinar
                  </button>
                ) : (
                  <div style={{ position: 'relative', zIndex: 0, minHeight: '48px' }}>
                    <PayPalButtons
                      style={{ layout: "horizontal", color: "gold", shape: "rect", height: 48 }}
                      createSubscription={(data, actions) => {
                          const planId = import.meta.env.VITE_PAYPAL_PLAN_ID_ANNUAL_BRL || 'P-98557937YE021832CNIUMG3I';
                          return actions.subscription.create({ plan_id: String(planId) });
                      }}
                      onApprove={async (data, actions) => {
                        try {
                          await upgradeToPro(user.uid);
                          alert('Pagamento aprovado via PayPal! Você agora é um membro Prime.');
                          window.location.reload();
                        } catch (error) {
                          console.error(error);
                          alert('Erro ao finalizar o pagamento.');
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
            </div>
          </div>
        </section>

        {/* 7. FINAL CTA */}
        <section className="py-24 bg-black relative border-y border-white/15 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-accent/5 blur-[120px] rounded-full" />
            <div className="absolute inset-0 tech-grid opacity-[0.03]" />
          </div>
          <div className="max-w-4xl mx-auto px-4 text-center space-y-10 relative z-10">
            <h2 className="text-4xl md:text-5xl font-sans font-black text-white tracking-tighter uppercase italic leading-[0.95]">
              DOMINE A SUA <br/>
              <span className="text-accent underline decoration-accent/20 underline-offset-8 italic">PRÓPRIA OPERAÇÃO.</span>
            </h2>
            <p className="text-white/50 text-xs font-bold uppercase tracking-wider max-w-lg mx-auto">
              Acesso instantâneo à maior rede neural de biohacking da América Latina.
            </p>
            <button 
              onClick={() => document.getElementById('planos-vendas')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-16 py-6 bg-accent text-black rounded-2xl font-black text-xs uppercase tracking-wider shadow-[0_0_50px_rgba(0,229,255,0.2)] hover:bg-white hover:scale-105 active:scale-95 transition-all outline-none border-none"
            >
              Liberar Acesso Prime
            </button>
          </div>
        </section>

        {/* 8. FAQ */}
        <section className="py-24 bg-black">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-12 text-center underline decoration-accent underline-offset-8">FAQ</h2>
            <div className="space-y-6">
              {[
                { q: "COMO RECEBO O ACESSO?", a: "Imediatamente no seu e-mail após a confirmação." },
                { q: "OS PROTOCOLOS SÃO SEGUROS?", a: "Sim, baseados 100% em literatura médica e bioquímica." },
                { q: "POSSO CANCELAR?", a: "O plano mensal pode ser cancelado a qualquer momento." }
              ].map((item, i) => (
                <div key={i} className="p-6 border border-white/15 bg-white/[0.01] rounded-3xl group">
                  <h4 className="text-xs font-black text-white uppercase tracking-wider mb-2 flex items-center justify-between">
                    {item.q} <ChevronRight size={14} className="group-hover:rotate-90 transition-all" />
                  </h4>
                  <p className="text-xs font-bold text-white/50 uppercase leading-loose">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 text-center">
            <button onClick={() => setView('home')} className="text-xs font-black text-white/60 uppercase tracking-[0.5em] hover:text-accent transition-colors italic">Voltar ao Dashboard</button>
        </section>
      </main>
    </div>
  );
}
