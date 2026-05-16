import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import StartHere from './components/StartHere';
import ProtocolCard from './components/ProtocolCard';
import CalculatorTeaser from './components/CalculatorTeaser';
import StatsSection from './components/StatsSection';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import PeptideCalculator from './components/calculator/PeptideCalculator';
import PeptideLibrary from './components/library/PeptideLibrary';
import InteractionVerifier from './components/InteractionVerifier';
import PeptideComparator from './components/PeptideComparator';
import Dossier from './components/Dossier';
import PeptideGuide from './components/PeptideGuide';
import WhatsAppButton from './components/WhatsAppButton';
import SalesPage from './components/SalesPage';
import SynergySection from './components/SynergySection';
import PeptideDetailModal from './components/library/PeptideDetailModal';
import { PROTOCOLS, WHATSAPP_LINK, TOTAL_PEPTIDES, INSTAGRAM_LINK, SITE_LINK } from './constants';
import { PeptideDossier } from './types';
import { Shield, Truck, CreditCard, Activity, CheckCircle2, ArrowUpRight, Star, Zap, MessageCircle, ChevronRight, ShieldAlert, X, Hexagon, Plus, GraduationCap, Microscope, BookOpen, Instagram, Globe } from 'lucide-react';

import { AuthProvider, useAuth } from './context/AuthContext';

import { auditInventory } from './services/atlasAuditor';

export type View = 'home' | 'library' | 'calculator' | 'quiz' | 'stacks' | 'interactions' | 'my-protocols' | 'plans' | 'dossier' | 'guide' | 'synergies';

function AppContent() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [userPeptides, setUserPeptides] = useState<string[]>(['bpc-157', 'selank']); // Default for demo as requested
  const [selectedPeptide, setSelectedPeptide] = useState<PeptideDossier | null>(null);
  const [selectedSynergyIds, setSelectedSynergyIds] = useState<string[]>([]);
  const { profile, loading } = useAuth();
  const isPremium = profile?.isPro || false;

  const auditResult = auditInventory(userPeptides);

  useEffect(() => {
    if (currentView === 'plans') {
      window.scrollTo(0, 0);
      return;
    }

    window.scrollTo(0, 0);
    
    // Handle initial hash for deep linking
    const hash = window.location.hash;
    if (hash && currentView === 'home') {
      const id = hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    }
  }, [currentView]);

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  const renderView = () => {
    switch (currentView) {
      case 'library':
        return <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"><PeptideLibrary setView={setCurrentView} isPremium={isPremium} /></div>;
      case 'calculator':
        return <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"><PeptideCalculator setView={setCurrentView} /></div>;
      case 'dossier':
        return <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"><Dossier setView={setCurrentView} /></div>;
      case 'guide':
        return <PeptideGuide setView={setCurrentView} />;
      case 'interactions':
        return <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"><InteractionVerifier setView={setCurrentView} /></div>;
      case 'stacks':
        return <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"><PeptideComparator setView={setCurrentView} initialPeptideIds={selectedSynergyIds} /></div>;
      case 'plans':
        return <SalesPage setView={setCurrentView} />;
      case 'synergies':
        return <SynergySection setView={setCurrentView} onSelectProtocol={(ids) => {
          setSelectedSynergyIds(ids);
          setCurrentView('stacks');
        }} isStandalone />;
      case 'home':
      default:
        return (
          <div className="space-y-0">
            <Hero setView={setCurrentView} isPremium={isPremium} />
            
            {/* Atlas de Compostos - Seção Principal e "Aberta" */}
            <section className="py-24 bg-primary relative overflow-hidden" id="atlas-preview">
              <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full">
                      <Hexagon size={10} className="text-accent" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-accent">Banco de Dados Molecular v4.2</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-sans font-black tracking-tighter text-white uppercase italic leading-[0.85]">
                      ATLAS DE <br/>
                      <span className="text-accent underline decoration-accent underline-offset-[8px]">COMPOSTOS</span>
                    </h2>
                    <p className="text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] max-w-2xl leading-relaxed italic">
                      A maior biblioteca técnica de peptídeos e SARMs do mundo. <br/>
                      <span className="text-white">Explore os 9 pilares da performance ou acesse o catálogo completo.</span>
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-end gap-6">
                    <div className="flex items-center gap-8 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                      <div className="text-center">
                        <div className="text-xl font-black text-white leading-none">{TOTAL_PEPTIDES}</div>
                        <div className="text-[8px] font-black text-accent uppercase tracking-widest mt-1">Moléculas</div>
                      </div>
                      <div className="w-px h-8 bg-white/10" />
                      <div className="text-center">
                        <div className="text-xl font-black text-white leading-none">24</div>
                        <div className="text-[8px] font-black text-accent uppercase tracking-widest mt-1">Categorias</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Array.isArray(PROTOCOLS) && PROTOCOLS.slice(0, 8).map((protocol) => (
                    <ProtocolCard 
                      key={protocol.id} 
                      protocol={protocol} 
                      setView={setCurrentView}
                      onClick={() => setSelectedPeptide(protocol)}
                    />
                  ))}
                </div>

                <div className="mt-20 flex flex-col items-center gap-8">
                  <button 
                    onClick={() => {
                      setCurrentView('library');
                      window.scrollTo(0, 0);
                    }}
                    className="group relative px-10 py-4 bg-accent text-black rounded-xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white transition-all shadow-[0_0_30px_rgba(191,255,0,0.15)] hover:shadow-[0_0_50px_rgba(255,255,255,0.1)] overflow-hidden"
                  >
                    <span className="relative z-10">Explorar Catálogo Completo</span>
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </button>
                  <div className="flex items-center gap-4 text-[9px] font-black text-white/20 uppercase tracking-[0.3em] italic">
                    <div className="w-8 h-px bg-white/10" />
                    Acesso a {TOTAL_PEPTIDES} Dossiês Técnicos Atualizados
                    <div className="w-8 h-px bg-white/10" />
                  </div>
                </div>
              </div>
              
              {/* Decorative background text */}
              <div className="absolute -bottom-20 -right-20 text-[200px] font-black text-white/[0.02] uppercase tracking-tighter pointer-events-none select-none italic">
                ATLAS
              </div>
            </section>

            <StatsSection />
            <SynergySection setView={setCurrentView} onSelectProtocol={(ids) => {
              setSelectedSynergyIds(ids);
              setCurrentView('stacks');
            }} />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <CalculatorTeaser setView={setCurrentView} />
            </div>

            <Testimonials />
            
            <StartHere setView={setCurrentView} />
            <Pricing />
          </div>
        );
    }
  };

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="bg-primary text-secondary font-sans selection:bg-accent selection:text-white transition-colors duration-500 overflow-x-hidden min-h-screen">
        
        {/* Prime Market Ticker */}
        <div className="bg-[#02010a] border-b border-white/5 py-2.5 overflow-hidden whitespace-nowrap z-[100] relative">
          <motion.div 
            animate={{ x: [0, -2000] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="inline-flex gap-20 pr-20"
          >
            {[
              `STATUS: ${TOTAL_PEPTIDES}+ PEPTÍDEOS REGISTRADOS`,
              "NOVO: PROTOCOLO METABÓLICO SLU-PP-332",
              "COMUNIDADE: 742 BIOHACKERS ATIVOS",
              "SISTEMA: DATABASE 99.8% SINCRONIZADA",
              "TENDÊNCIA: BPC-157 ORAL VS INJETÁVEL",
              "DESTAQUE: STACK KISSPEPTINA-10 + HCG",
              "ALGO: MOTOR DE CÁLCULO DE DOSAGEM V4.2",
              `STATUS: ${TOTAL_PEPTIDES}+ PEPTÍDEOS REGISTRADOS`,
              "NOVO: PROTOCOLO METABÓLICO SLU-PP-332",
              "COMUNIDADE: 742 BIOHACKERS ATIVOS"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-1 h-1 rounded-full bg-accent shadow-[0_0_8px_rgba(191,255,0,0.6)] animate-pulse" />
                <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em] font-sans italic">{text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <Layout currentView={currentView} setCurrentView={setCurrentView} theme={theme} setTheme={setTheme} isPremium={isPremium}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
          
          <footer className="py-16 bg-primary border-t border-secondary/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2 space-y-6">
              <span 
                className="text-xl font-sans font-extrabold tracking-tighter text-secondary block uppercase cursor-pointer"
                onClick={() => setCurrentView('home')}
              >
                PEPTIUM<span className="text-accent"> PRIME</span>
              </span>
              <p className="text-muted max-w-sm text-[11px] leading-relaxed font-medium opacity-60">
                A maior autoridade mundial em ciência e protocolos de peptídeos. 
                Vanguarda do biohacking na palma da sua mão.
              </p>
              <div className="flex gap-6">
                <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-secondary/10 rounded-full flex items-center justify-center text-secondary/40 hover:text-accent hover:border-accent/40 transition-all cursor-pointer">
                  <Instagram size={18} />
                </a>
                <a href={SITE_LINK} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-secondary/10 rounded-full flex items-center justify-center text-secondary/40 hover:text-accent hover:border-accent/40 transition-all cursor-pointer">
                  <Globe size={18} />
                </a>
              </div>
            </div>
            
            <div className="space-y-6">
              <h5 className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary opacity-40">Navegação</h5>
              <ul className="space-y-4 text-[11px] font-medium text-muted">
                <li className="hover:text-accent cursor-pointer transition-colors" onClick={() => setCurrentView('home')}>Explorar</li>
                <li className="hover:text-accent cursor-pointer transition-colors" onClick={() => setCurrentView('library')}>Biblioteca</li>
                <li className="hover:text-accent cursor-pointer transition-colors" onClick={() => setCurrentView('calculator')}>Calculadora</li>
                <li className="hover:text-accent cursor-pointer transition-colors" onClick={() => setCurrentView('interactions')}>Interações</li>
                <li className="hover:text-accent cursor-pointer transition-colors" onClick={() => setCurrentView('dossier')}>Dossiê Molecular</li>
                <li className="hover:text-accent cursor-pointer transition-colors" onClick={() => setCurrentView('plans')}>Planos</li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <h5 className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary opacity-40">Legal</h5>
              <ul className="space-y-4 text-[11px] font-medium text-muted">
                <li className="hover:text-accent cursor-pointer transition-colors">Termos de Uso</li>
                <li className="hover:text-accent cursor-pointer transition-colors">Privacidade</li>
                <li className="hover:text-accent cursor-pointer transition-colors">Disclaimer Médico</li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-secondary/5">
            <p className="text-[8px] font-bold text-secondary/20 uppercase tracking-widest">
              © 2026 Peptium Prime. Scientific Research Purpose Only.
            </p>
            <div className="flex gap-12 grayscale opacity-30">
               <span className="text-xs font-sans font-bold text-secondary">The Lancet</span>
               <span className="text-xs font-sans font-bold text-secondary">Nature</span>
               <span className="text-xs font-sans font-bold text-secondary">PubMed</span>
            </div>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
      
      <AnimatePresence>
        {selectedPeptide && (
          <PeptideDetailModal 
            peptide={selectedPeptide} 
            onClose={() => setSelectedPeptide(null)} 
          />
        )}
      </AnimatePresence>
      </Layout>
    </div>
  </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
