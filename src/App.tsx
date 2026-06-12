import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
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
import SalesPage from './components/SalesPage';
import SynergySection from './components/SynergySection';
import PeptideDetailModal from './components/library/PeptideDetailModal';
import LegalModal from './components/LegalModal';
import ProGate from './components/ProGate';
import SupportButton from './components/SupportButton';
import OnlineUsers from './components/OnlineUsers';
import PlaceholderView from './components/PlaceholderView';
import CycleSchedule from './components/CycleSchedule';
import BioHackingMap from './components/BioHackingMap';
import { LabScanner } from './components/LabScanner';
import { LongevityClock } from './components/LongevityClock';
import { FastingTracker } from './components/FastingTracker';
import { CyclePlanner } from './components/CyclePlanner';
import { GenomeAnalyzer } from './components/GenomeAnalyzer';
import { MicrobiomeTracker } from './components/MicrobiomeTracker';
import { NeuroMatrix } from './components/NeuroMatrix';
import { CommandPalette } from './components/CommandPalette';
import AdminDashboard from './components/AdminDashboard';
import AiGenerator from './components/AiGenerator';
import CofreAtlas from './components/CofreAtlas';
import HowToUse from './components/HowToUse';
import FloatingChat from './components/FloatingChat';
import { PeptiumLogo } from './components/Logo';
import { PROTOCOLS, SUPPORT_LINK, TOTAL_PEPTIDES, INSTAGRAM_LINK, SITE_LINK } from './constants';
import { PeptideDossier, PeptideCategory } from './types';
import { Shield, Truck, CreditCard, Activity, CheckCircle2, ArrowUpRight, Star, Zap, ChevronRight, ShieldAlert, X, Hexagon, Plus, GraduationCap, Microscope, BookOpen, Instagram, Globe, Mail, MapPin, Lock } from 'lucide-react';

import { useAuth } from './contexts/AuthContext';
import { logout, upgradeToPro, handleRedirectResult } from './lib/firebase';
import { auditInventory } from './services/atlasAuditor';

export type View = 'home' | 'library' | 'calculator' | 'quiz' | 'stacks' | 'interactions' | 'my-protocols' | 'plans' | 'dossier' | 'guide' | 'synergies' | 'scanner' | 'map' | 'schedule' | 'admin' | 'ai-generator' | 'lab-scanner' | 'longevity-clock' | 'fasting-tracker' | 'cycle-planner' | 'genome-analyzer' | 'microbiome-tracker' | 'neuro-matrix' | 'cofre-atlas' | 'manual';

function AppContent() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [userPeptides, setUserPeptides] = useState<string[]>(['bpc-157', 'selank']); 
  const [selectedPeptide, setSelectedPeptide] = useState<PeptideDossier | null>(null);
  const [selectedSynergyIds, setSelectedSynergyIds] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [legalModalType, setLegalModalType] = useState<'termos' | 'privacidade' | 'disclaimer' | null>(null);
  const { user, isPro, loading: authLoading, openAuthModal } = useAuth();
  const isPremium = isPro; // Read from Firebase Auth Context

  const [apiStatus, setApiStatus] = useState<string>('checking...');

  useEffect(() => {
    const checkApi = async () => {
      try {
        const start = Date.now();
        const res = await fetch('/api/health');
        const end = Date.now();
        
        if (res.ok) {
          const body = await res.json();
          if (body.success) {
            setApiStatus(`Online (${end - start}ms)`);
            console.log('✅ API Neural Activo:', body.data);
          } else {
            setApiStatus(`Error ${res.status}`);
            console.error('❌ API Error:', body.error);
          }
        } else {
          setApiStatus(`Error ${res.status}`);
          console.error('❌ API Error:', res.status);
        }
      } catch (err) {
        setApiStatus('Offline (404/Refused)');
        console.error('❌ API Inalcanzable:', err);
      }
    };
    checkApi();
  }, []);

  useEffect(() => {
    handleRedirectResult();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const view = params.get('view') as View;
    if (view && ['home', 'library', 'calculator', 'quiz', 'stacks', 'interactions', 'my-protocols', 'plans', 'dossier', 'guide', 'synergies', 'scanner', 'map', 'schedule', 'admin', 'ai-generator'].includes(view)) {
      setCurrentView(view);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentStatus = params.get('payment_status');
    
    if (paymentStatus === 'success') {
      alert('Pagamento processado! Seu acesso Prime será ativado em alguns instantes.');
      // Remove query param without reload
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (paymentStatus === 'cancel') {
      alert('O checkout foi cancelado.');
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

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
    document.documentElement.classList.remove('light');
  }, []);

  const renderView = () => {
    // Content Locking Logic
    const premiumViews: View[] = ['calculator', 'dossier', 'interactions', 'stacks', 'synergies', 'scanner', 'map', 'schedule', 'my-protocols', 'quiz', 'lab-scanner', 'longevity-clock', 'fasting-tracker', 'cycle-planner', 'genome-analyzer', 'microbiome-tracker', 'neuro-matrix', 'cofre-atlas', 'ai-generator'];
    const isRestricted = !isPremium && premiumViews.includes(currentView);

    if (isRestricted) {
        return <SalesPage setView={setCurrentView} />;
    }

    switch (currentView) {
      case 'library':
        return <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"><PeptideLibrary setView={setCurrentView} isPremium={isPremium} initialCategory={selectedCategory} /></div>;
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
      case 'schedule':
        return <CycleSchedule isStandalone setView={setCurrentView} />;
      case 'map':
        return <BioHackingMap isStandalone setView={setCurrentView} />;
      case 'lab-scanner':
        return <div className="py-24"><LabScanner setView={setCurrentView} /></div>;
      case 'longevity-clock':
        return <div className="py-24"><LongevityClock setView={setCurrentView} /></div>;
      case 'fasting-tracker':
        return <div className="py-24"><FastingTracker setView={setCurrentView} /></div>;
      case 'cycle-planner':
        return <div className="py-24"><CyclePlanner setView={setCurrentView} /></div>;
      case 'genome-analyzer':
        return <div className="py-24"><GenomeAnalyzer setView={setCurrentView} /></div>;
      case 'microbiome-tracker':
        return <div className="py-24"><MicrobiomeTracker setView={setCurrentView} /></div>;
      case 'neuro-matrix':
        return <div className="py-24"><NeuroMatrix setView={setCurrentView} /></div>;
      case 'cofre-atlas':
        return <CofreAtlas setView={setCurrentView} />;
      case 'manual':
        return <HowToUse setView={setCurrentView} />;
      case 'scanner':
      case 'my-protocols':
      case 'quiz':
        return <PlaceholderView view={currentView} setView={setCurrentView} />;
      case 'admin':
        return <AdminDashboard setView={setCurrentView} />;
      case 'ai-generator':
        return <AiGenerator setView={setCurrentView} />;
      case 'home':
      default:
        return (
          <div className="space-y-0">
            <Hero setView={setCurrentView} isPremium={isPremium} onSelectPeptide={setSelectedPeptide} />
            
            {/* Atlas de Compostos - Seção Principal e "Aberta" */}
            <section className="py-24 bg-primary relative overflow-hidden" id="atlas-preview">
              <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full">
                      <Hexagon size={10} className="text-accent" />
                      <span className="text-xs font-black uppercase tracking-wider text-accent">Banco de Dados Molecular v4.2</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-sans font-black tracking-tighter text-white uppercase italic leading-[0.85]">
                      ATLAS DE <br/>
                      <span className="text-accent underline decoration-accent underline-offset-[8px]">COMPOSTOS</span>
                    </h2>
                    <p className="text-white/60 text-xs md:text-xs font-bold uppercase tracking-wider max-w-2xl leading-loose italic">
                      A maior biblioteca técnica de peptídeos e SARMs do mundo. <br/>
                      <span className="text-white">Explore os 9 pilares da performance ou acesse o catálogo completo.</span>
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-end gap-6">
                    <div className="flex items-center gap-8 px-8 py-4 bg-white/10 border border-white/20 rounded-2xl backdrop-blur-sm">
                      <div className="text-center">
                        <div className="text-xl font-black text-white leading-none">{TOTAL_PEPTIDES}</div>
                        <div className="text-xs font-black text-accent uppercase tracking-wider mt-1">Moléculas</div>
                      </div>
                      <div className="w-px h-8 bg-white/10" />
                      <div className="text-center">
                        <div className="text-xl font-black text-white leading-none">24</div>
                        <div className="text-xs font-black text-accent uppercase tracking-wider mt-1">Categorias</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* High-Tech Categories Grid */}
                <div className="mb-12 pb-8 border-b border-white/15">
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                    {Object.values(PeptideCategory).sort().map((cat, i) => (
                      <div 
                        key={i}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setCurrentView('library');
                          window.scrollTo(0, 0);
                        }}
                        className="px-3 py-2 bg-white/[0.02] border border-white/15 hover:border-accent/20 hover:bg-accent/5 rounded-lg transition-all group flex items-center gap-2 cursor-pointer select-none"
                      >
                        <div className="w-1 h-1 rounded-full bg-accent/30 group-hover:bg-accent animate-pulse" />
                        <span className="text-[12px] font-black text-white/60 group-hover:text-white uppercase tracking-wider truncate">{cat}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Array.isArray(PROTOCOLS) && PROTOCOLS.slice(0, 8).map((protocol, i) => {
                    const isLocked = !isPremium && i >= 4; 
                    return (
                        <div key={protocol.id} className="relative">
                            <ProtocolCard 
                                protocol={protocol} 
                                setView={setCurrentView}
                                onClick={() => isLocked ? setCurrentView('plans') : setSelectedPeptide(protocol)}
                            />
                            {/* Status Badge overlay - positioned strictly left to avoid right-side brand badge */}
                            <div className="absolute top-2.5 left-2.5 z-30 flex gap-1 pointer-events-none">
                                {i < 4 ? (
                                    <div className="px-1.5 py-0.5 bg-green-500/80 text-black rounded text-[6px] font-black uppercase tracking-wider shadow-lg">
                                        FREE
                                    </div>
                                ) : (
                                    <div className={`px-1.5 py-0.5 ${isPremium ? 'bg-accent/80' : 'bg-red-500/80'} text-black rounded text-[6px] font-black uppercase tracking-wider flex items-center gap-1 shadow-lg`}>
                                        {isPremium ? (
                                          <span>UNLOCKED</span>
                                        ) : (
                                          <><Lock size={6} /> PRO</>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                  })}
                </div>

                <div className="mt-20 flex flex-col items-center gap-8">
                  <button 
                    onClick={() => {
                      setCurrentView('library');
                      window.scrollTo(0, 0);
                    }}
                    className="group relative px-10 py-4 bg-accent text-black rounded-xl font-black text-xs uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_30px_rgba(0,229,255,0.15)] hover:shadow-[0_0_50px_rgba(255,255,255,0.1)] overflow-hidden"
                  >
                    <span className="relative z-10">Explorar Catálogo {isPremium ? 'Completo' : 'Limited'}</span>
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </button>
                  <div className="flex items-center gap-4 text-xs font-black text-white/60 uppercase tracking-wider italic">
                    <div className="w-8 h-px bg-white/10" />
                    {isPremium ? 'Acesso Total Liberado' : 'Contém Itens com Acesso Restrito'}
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
              <CalculatorTeaser setView={setCurrentView} isPremium={isPremium} />
            </div>

            <Testimonials />
            
            <StartHere setView={setCurrentView} />
            <Pricing />
          </div>
        );
    }
  };

  return (
    <div className="dark">
      <CommandPalette isOpen={isCommandPaletteOpen} setIsOpen={setIsCommandPaletteOpen} setView={setCurrentView} />
      <OnlineUsers />
      <div className="bg-primary text-secondary font-sans selection:bg-accent selection:text-white transition-colors duration-500 overflow-x-hidden min-h-screen">
        
        <ErrorBoundary>
          <Layout currentView={currentView} setCurrentView={setCurrentView} theme="dark" setTheme={() => {}} isPremium={isPremium}>
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
            
            <SupportButton />
            
            <footer className="py-16 bg-primary border-t border-secondary/15 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2 space-y-6">
              <span 
                className="flex items-center gap-2 cursor-pointer group"
                onClick={() => setCurrentView('home')}
              >
                <PeptiumLogo className="w-12 h-12" glowing />
                <span className="font-sans font-black text-[20px] tracking-wider text-[#00E5FF] uppercase drop-shadow-[0_0_8px_rgba(0,229,255,0.4)]">
                  PEPTIUM
                </span>
                <span className="font-sans font-bold text-[20px] tracking-wider text-white uppercase italic opacity-90">
                  PRIME
                </span>
              </span>
              <p className="text-muted max-w-sm text-[11px] leading-loose font-medium opacity-60">
                A maior autoridade mundial em ciência e protocolos de peptídeos. 
                Vanguarda do biohacking na palma da sua mão.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-muted text-[11px] font-medium opacity-80 group">
                  <Instagram size={14} className="text-accent" />
                  <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">@peptium.app</a>
                </div>
                <div className="flex items-center gap-3 text-muted text-[11px] font-medium opacity-80 group">
                  <Globe size={14} className="text-accent" />
                  <a href={SITE_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">peptium.com.br</a>
                </div>
                <div className="flex items-center gap-3 text-muted text-[11px] font-medium opacity-80 group">
                  <Mail size={14} className="text-accent" />
                  <a href="mailto:peptium.app@gmail.com" className="hover:text-accent transition-colors">peptium.app@gmail.com</a>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h5 className="text-xs font-black uppercase tracking-wider text-secondary opacity-40">Navegação</h5>
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
              <h5 className="text-xs font-black uppercase tracking-wider text-secondary opacity-40">Legal</h5>
              <ul className="space-y-4 text-[11px] font-medium text-muted">
                <li className="hover:text-accent cursor-pointer transition-colors" onClick={() => setLegalModalType('termos')}>Termos de Uso</li>
                <li className="hover:text-accent cursor-pointer transition-colors" onClick={() => setLegalModalType('privacidade')}>Privacidade</li>
                <li className="hover:text-accent cursor-pointer transition-colors" onClick={() => setLegalModalType('disclaimer')}>Disclaimer Médico</li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-secondary/15">
            <div className="flex flex-col gap-1">
              <p className="text-xs font-bold text-secondary/60 uppercase tracking-wider">
                © 2026 Peptium Prime. Scientific Research Purpose Only.
              </p>
              <div className="flex items-center gap-2">
                <p className="text-[6px] font-black text-accent/20 uppercase tracking-wider">
                  Build v5.0.4-Prime | Email detectado: {user?.email || 'Nenhum'} | Usuário: {user ? (isPremium ? 'PRO' : 'FREE') : 'Não logado'} | Status:
                </p>
                <span className={`text-[6px] font-black uppercase tracking-wider ${
                  apiStatus.startsWith('Online') ? 'text-accent' : 'text-red-500'
                }`}>
                  {apiStatus}
                </span>
              </div>
            </div>
            <div className="flex gap-12 grayscale opacity-30">
               <span className="text-xs font-sans font-bold text-secondary">The Lancet</span>
               <span className="text-xs font-sans font-bold text-secondary">Nature</span>
               <span className="text-xs font-sans font-bold text-secondary">PubMed</span>
            </div>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {selectedPeptide && (
          <PeptideDetailModal 
            peptide={selectedPeptide} 
            onClose={() => setSelectedPeptide(null)} 
          />
        )}
      </AnimatePresence>

      <LegalModal type={legalModalType} onClose={() => setLegalModalType(null)} />
      <FloatingChat />
      </Layout>
    </ErrorBoundary>
  </div>
</div>
  );
}

export default function App() {
  return (
    <AppContent />
  );
}
