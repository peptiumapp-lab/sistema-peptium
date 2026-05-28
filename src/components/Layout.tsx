import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, LayoutDashboard, Calculator, 
  Beaker, Library, CreditCard, MessageCircle, 
  Zap, Shield, Target, Sun, Moon,
  Hexagon, Sparkles, ArrowLeftRight, ClipboardList,
  GraduationCap, Layers, ShieldAlert, MapPin,
  Calendar, User, HelpCircle, UserPlus, BookOpen, LogOut, LogIn, Instagram, Globe, Mail, ArrowLeft
} from 'lucide-react';
import { SUPPORT_LINK, INSTAGRAM_HANDLE, INSTAGRAM_LINK, SITE_URL, SITE_LINK, PROTOCOLS } from '../constants';
import type { View } from '../App';
import { useAuth } from '../contexts/AuthContext';
import { PeptiumLogo } from './Logo';
import { signInWithGoogle, logout } from '../lib/firebase';

const TOTAL_PEPTIDES = PROTOCOLS.length;

interface LayoutProps {
  children: React.ReactNode;
  currentView: View;
  setCurrentView: (view: View) => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  isPremium?: boolean;
}

export default function Layout({ children, currentView, setCurrentView, theme, setTheme, isPremium }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const { user, isPro, isAdmin } = useAuth();

  const bibliotecaItems = [
    { icon: <LayoutDashboard size={18} />, label: 'Painel Central', view: 'home' as View },
    { icon: <Hexagon size={18} />, label: 'Atlas de Compostos', view: 'library' as View },
    { icon: <Layers size={18} />, label: 'Biblioteca de Protocolos', view: 'synergies' as View },
    { icon: <BookOpen size={18} />, label: 'Bio-Inteligência', view: 'dossier' as View },
    { icon: <Sparkles size={18} />, label: 'Bio-Scanner IA', view: 'scanner' as View },
    { icon: <ArrowLeftRight size={18} />, label: 'Análise de Sinergia', view: 'stacks' as View },
    { icon: <ClipboardList size={18} />, label: 'Meus Protocolos', view: 'my-protocols' as View },
    { icon: <GraduationCap size={18} />, label: 'Centro de Aprendizado', view: 'guide' as View },
  ];

  const ferramentasItems = [
    { icon: <Calculator size={18} />, label: 'Calculadora Prime', view: 'calculator' as View },
    { icon: <Layers size={18} />, label: 'Cofre de Stacks', view: 'stacks' as View },
    { icon: <ShieldAlert size={18} />, label: 'Guardião de Segurança', view: 'interactions' as View },
    { icon: <MapPin size={18} />, label: 'Mapa de Bio-Hacking', view: 'map' as View },
    { icon: <Calendar size={18} />, label: 'Cronograma de Ciclo', view: 'schedule' as View },
    ...(isAdmin ? [{ icon: <Shield size={18} />, label: 'Painel Admin', view: 'admin' as View }] : [])
  ];

  const contaItems = [
    ...(user ? [
      { 
        icon: <User size={18} />, 
        label: (
          <div className="flex items-center justify-between w-full text-left overflow-hidden">
            <div className="flex flex-col truncate max-w-[80%]">
              <span className="truncate text-[12px]">{user.displayName || 'Minha Conta'}</span>
              <span className="truncate text-[8px] opacity-50 font-mono mt-0.5">{user.email || ''}</span>
            </div>
            <span className={`text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-sm border shrink-0 ${
              isPro 
                ? 'bg-accent/10 text-accent border-accent/20' 
                : 'bg-white/5 text-white/40 border-white/10'
            }`}>
              {isPro ? 'PRO' : 'FREE'}
            </span>
          </div>
        ), 
        view: 'plans' as View 
      },
      { icon: <LogOut size={18} />, label: 'Sair', onClick: logout },
    ] : [
      { icon: <LogIn size={18} />, label: 'Entrar / Cadastrar', onClick: signInWithGoogle, highlight: true },
    ]),
    { icon: <Instagram size={18} />, label: INSTAGRAM_HANDLE, onClick: () => window.open(INSTAGRAM_LINK, '_blank') },
    { icon: <Globe size={18} />, label: SITE_URL, onClick: () => window.open(SITE_LINK, '_blank') },
    { icon: <Mail size={18} />, label: 'Suporte', onClick: () => window.location.href = SUPPORT_LINK },
    ...(!isPro ? [{ icon: <UserPlus size={18} />, label: 'Assinar Prime', view: 'plans' as View, highlight: true }] : []),
  ];

  const handleNavClick = (view: View, anchor?: string) => {
    const isSameView = currentView === view;
    
    setCurrentView(view);
    setIsSidebarOpen(false);
    
    if (anchor) {
      const waitTime = isSameView ? 0 : 350; // Increased wait time for view transition
      setTimeout(() => {
        const element = document.getElementById(anchor);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, waitTime);
    } else {
      // Always scroll to top if changing view without anchor
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-primary flex overflow-x-hidden pt-8">
      
      {/* Prime Market Ticker (Integrated) */}
      <div className="bg-[#02010a] border-b border-white/5 py-1.5 md:py-2 overflow-hidden whitespace-nowrap z-40 fixed top-0 left-0 w-full flex">
        <motion.div 
          animate={{ x: [0, "-50%"] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="inline-flex gap-8 md:gap-16 pr-8 md:pr-16 shrink-0"
        >
          {[...Array(2)].map((_, arrayIndex) => (
            <React.Fragment key={arrayIndex}>
              {[
                `STATUS: ${TOTAL_PEPTIDES}+ PEPTÍDEOS REGISTRADOS`,
                "NOVO: PROTOCOLO METABÓLICO DE RECOMPOSIÇÃO",
                "COMUNIDADE: +700 BIOHACKERS ATIVOS NO BRASIL",
                "ALERTA: ACESSO VITALÍCIO LIBERADO",
                "TENDÊNCIA: GHK-CU E LONGEVIDADE CUTÂNEA",
                "STATUS: MOTOR DE DOSAGEM IA OPERACIONAL",
                "COFRE DE STACKS: 43 COMBINAÇÕES EXECUTADAS",
                "MAPA: REDE NEURAL DE PEPTÍDEOS ATIVA",
                "NOTÍCIA: BPC-157 (ARG) EM ALTA ESTA SEMANA",
                "DESTAQUE: RECUPERAÇÃO ACELERADA COM TB-500",
                "SISTEMA: DATABASE 99.8% SINCRONIZADA",
              ].map((text, i) => (
                <div key={`${arrayIndex}-${i}`} className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(0,229,255,0.6)] animate-pulse" />
                  <span className="text-[10px] md:text-xs font-black text-white/90 uppercase tracking-[0.2em] font-sans italic">{text}</span>
                </div>
              ))}
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* Desktop Sidebar (Floating UI) */}
      <aside className="hidden lg:flex flex-col w-[230px] h-[calc(100vh-2rem)] fixed left-4 top-4 bg-[#050505]/80 backdrop-blur-2xl border border-white/5 rounded-3xl z-40 shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_0_32px_rgba(0,229,255,0.02)]">
        {/* Header */}
        <div className="p-5 pb-4">
          <span 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setCurrentView('home')}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full" />
              <PeptiumLogo className="w-8 h-8 relative z-10" glowing />
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-black text-[14px] tracking-[0.2em] text-[#00E5FF] uppercase leading-none drop-shadow-[0_0_8px_rgba(0,229,255,0.4)]">
                PEPTIUM
              </span>
              <span className="font-sans font-bold text-[9px] tracking-[0.4em] text-white/50 uppercase leading-relaxed mt-1">
                PRIME
              </span>
            </div>
          </span>
        </div>
        
        <div className="flex-grow overflow-y-auto px-3 py-2 custom-scrollbar">
          {isPro && (
            <div className="px-4 py-3 mb-6 mx-1 bg-gradient-to-r from-accent/10 to-transparent border border-accent/20 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-accent/20 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2" />
              <div className="flex items-center gap-2 mb-1.5 relative z-10">
                <Zap size={12} className="text-accent" fill="currentColor" />
                <span className="text-[10px] font-black text-white tracking-[0.2em] uppercase">Status Prime</span>
              </div>
              <div className="flex items-center gap-2 relative z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#00E5FF]" />
                <span className="text-[9px] font-bold text-accent uppercase tracking-widest opacity-80">Acesso Neural Ativo</span>
              </div>
            </div>
          )}

          <div className="mb-3 space-y-1">
            <div className="flex items-center gap-2 px-3 mb-1.5">
              <div className="h-[1px] w-4 bg-white/10" />
              <div className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em]">
                Biblioteca
              </div>
              <div className="h-[1px] flex-grow bg-gradient-to-r from-white/10 to-transparent" />
            </div>
            <nav className="space-y-0">
              {bibliotecaItems.map((item, index) => {
                const isActive = currentView === item.view;
                return (
                <button
                  key={index}
                  onClick={() => handleNavClick(item.view, (item as any).anchor)}
                  className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-xl transition-all duration-300 text-[12px] font-bold group relative overflow-hidden ${
                    isActive 
                      ? 'bg-accent/10 border border-accent/20 text-white shadow-[inset_0_0_20px_rgba(0,229,255,0.05)]' 
                      : 'text-secondary/50 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {isActive && (
                    <motion.div layoutId="sidebar-active" className="absolute left-0 top-1/4 bottom-1/4 w-[3px] bg-accent rounded-r-full shadow-[0_0_10px_#00E5FF]" />
                  )}
                  <div className={`p-1.5 rounded-xl transition-all duration-300 ${
                    isActive ? 'bg-accent/20 text-accent shadow-[0_0_10px_rgba(0,229,255,0.2)]' : 'bg-white/5 text-white/40 group-hover:bg-white/10 group-hover:text-white/80'
                  }`}>
                    {item.icon}
                  </div>
                  <span className="tracking-wide text-left">{item.label}</span>
                </button>
              )})}
            </nav>
          </div>

          <div className="mb-2 space-y-1">
            <div className="flex items-center gap-2 px-3 mb-1.5">
              <div className="h-[1px] w-4 bg-white/10" />
              <div className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em]">
                Ferramentas
              </div>
              <div className="h-[1px] flex-grow bg-gradient-to-r from-white/10 to-transparent" />
            </div>
            <nav className="space-y-0">
              {ferramentasItems.map((item, index) => {
                const isActive = currentView === item.view;
                return (
                <button
                  key={index}
                  onClick={() => handleNavClick(item.view, (item as any).anchor)}
                  className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-xl transition-all duration-300 text-[12px] font-bold group relative overflow-hidden ${
                    isActive 
                      ? 'bg-accent/10 border border-accent/20 text-white shadow-[inset_0_0_20px_rgba(0,229,255,0.05)]' 
                      : 'text-secondary/50 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {isActive && (
                    <motion.div layoutId="sidebar-active-tools" className="absolute left-0 top-1/4 bottom-1/4 w-[3px] bg-accent rounded-r-full shadow-[0_0_10px_#00E5FF]" />
                  )}
                  <div className={`p-1.5 rounded-xl transition-all duration-300 ${
                    isActive ? 'bg-accent/20 text-accent shadow-[0_0_10px_rgba(0,229,255,0.2)]' : 'bg-white/5 text-white/40 group-hover:bg-white/10 group-hover:text-white/80'
                  }`}>
                    {item.icon}
                  </div>
                  <span className="tracking-wide text-left">{item.label}</span>
                </button>
              )})}
            </nav>
          </div>
        </div>

        <div className="p-3 border-t border-white/5 mt-auto">
          <nav className="space-y-0">
            {contaItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick || (() => handleNavClick(item.view!))}
                className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-xl transition-all duration-300 text-[12px] font-bold group ${
                  item.highlight 
                    ? 'bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 hover:shadow-[0_0_15px_rgba(0,229,255,0.2)]' 
                    : 'text-secondary/50 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className={`p-1.5 rounded-xl transition-all duration-300 ${
                  item.highlight ? 'bg-accent/20 text-accent' : 'bg-white/5 text-white/40 group-hover:bg-white/10 group-hover:text-white/80'
                }`}>
                  {item.icon}
                </div>
                <div className="flex-1 w-full flex items-center overflow-hidden min-w-0">{item.label}</div>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile Header / Navbar */}
      <nav className="lg:hidden fixed top-8 md:top-10 left-0 right-0 z-40 bg-primary/80 backdrop-blur-xl border-b border-secondary/5">
        <div className="px-4 h-14 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {currentView !== 'home' ? (
              <button 
                onClick={() => setCurrentView('home')}
                className="p-2 text-secondary hover:text-white transition-colors"
                aria-label="Voltar"
              >
                <ArrowLeft size={20} />
              </button>
            ) : (
              <span 
                className="flex items-center gap-2 cursor-pointer group"
                onClick={() => setCurrentView('home')}
              >
                <PeptiumLogo className="w-8 h-8" glowing />
                <span className="font-sans font-black text-[12px] tracking-widest text-[#00E5FF] uppercase drop-shadow-[0_0_8px_rgba(0,229,255,0.4)] hidden sm:block">
                  PEPTIUM
                </span>
                <span className="font-sans font-bold text-[12px] tracking-[0.3em] text-white uppercase italic opacity-90 hidden sm:block">
                  PRIME
                </span>
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-secondary"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-primary/90 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed top-0 left-0 h-full w-[85%] max-w-sm bg-[#050505]/95 backdrop-blur-3xl z-50 lg:hidden border-r border-white/5 flex flex-col shadow-[20px_0_40px_rgba(0,0,0,0.6)]"
            >
              <div className="p-6 flex justify-between items-center border-b border-white/5">
                <span className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full" />
                    <PeptiumLogo className="w-10 h-10 relative z-10" glowing />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans font-black text-[15px] tracking-[0.2em] text-[#00E5FF] uppercase leading-none drop-shadow-[0_0_8px_rgba(0,229,255,0.4)]">
                      PEPTIUM
                    </span>
                    <span className="font-sans font-bold text-[10px] tracking-[0.4em] text-white/50 uppercase leading-relaxed mt-1">
                      PRIME
                    </span>
                  </div>
                </span>
                <button 
                  onClick={() => setIsSidebarOpen(false)} 
                  className="p-2 bg-white/5 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X size={18} />
                </button>
              </div>
              
              <div className="p-4 overflow-y-auto custom-scrollbar flex-grow">
                {isPro && (
                  <div className="px-5 py-4 mb-6 bg-gradient-to-r from-accent/10 to-transparent border border-accent/20 rounded-2xl mx-1 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-accent/20 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2" />
                    <div className="flex items-center gap-2 mb-1.5 relative z-10">
                      <Zap size={12} className="text-accent" fill="currentColor" />
                      <span className="text-[11px] font-black text-white tracking-[0.2em] uppercase">Assinatura Ativa</span>
                    </div>
                    <span className="text-[9px] font-bold text-accent uppercase tracking-widest relative z-10">Acesso Vitalício</span>
                  </div>
                )}

                <div className="mb-6 space-y-2">
                  <div className="flex items-center gap-2 px-2 mb-4">
                    <div className="h-[1px] w-3 bg-white/10" />
                    <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">BIBLIOTECA</div>
                    <div className="h-[1px] flex-grow bg-gradient-to-r from-white/10 to-transparent" />
                  </div>
                  <nav className="space-y-0.5">
                    {bibliotecaItems.map((item, index) => {
                      const isActive = currentView === item.view;
                      return (
                      <button
                        key={index}
                        onClick={() => handleNavClick(item.view, (item as any).anchor)}
                        className={`w-full flex items-center gap-3 py-2 px-3 rounded-2xl transition-all text-[13px] font-bold ${
                          isActive 
                            ? 'bg-accent/10 border border-accent/20 text-white' 
                            : 'text-secondary/50 hover:bg-white/5 hover:text-white border border-transparent'
                        }`}
                      >
                        <div className={`p-1.5 rounded-xl transition-all ${
                          isActive ? 'bg-accent/20 text-accent' : 'bg-white/5 text-white/40'
                        }`}>
                          {item.icon}
                        </div>
                        {item.label}
                      </button>
                    )})}
                  </nav>
                </div>

                <div className="mb-6 space-y-2">
                  <div className="flex items-center gap-2 px-2 mb-4">
                    <div className="h-[1px] w-3 bg-white/10" />
                    <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">FERRAMENTAS</div>
                    <div className="h-[1px] flex-grow bg-gradient-to-r from-white/10 to-transparent" />
                  </div>
                  <nav className="space-y-0.5">
                    {ferramentasItems.map((item, index) => {
                      const isActive = currentView === item.view;
                      return (
                      <button
                        key={index}
                        onClick={() => handleNavClick(item.view, (item as any).anchor)}
                        className={`w-full flex items-center gap-3 py-2 px-3 rounded-2xl transition-all text-[13px] font-bold ${
                          isActive 
                            ? 'bg-accent/10 border border-accent/20 text-white' 
                            : 'text-secondary/50 hover:bg-white/5 hover:text-white border border-transparent'
                        }`}
                      >
                        <div className={`p-1.5 rounded-xl transition-all ${
                          isActive ? 'bg-accent/20 text-accent' : 'bg-white/5 text-white/40'
                        }`}>
                          {item.icon}
                        </div>
                        {item.label}
                      </button>
                    )})}
                  </nav>
                </div>
              </div>

              <div className="p-4 border-t border-white/5">
                <nav className="space-y-0.5 mb-4">
                  {contaItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={item.onClick || (() => handleNavClick(item.view!))}
                      className={`w-full flex items-center gap-3 py-2 px-3 rounded-2xl transition-all text-[13px] font-bold ${
                        item.highlight 
                          ? 'bg-accent/10 border border-accent/20 text-accent' 
                          : 'text-secondary/50 hover:bg-white/5 hover:text-white border border-transparent'
                      }`}
                    >
                      <div className={`p-1.5 rounded-xl transition-all ${
                        item.highlight ? 'bg-accent/20 text-accent' : 'bg-white/5 text-white/40'
                      }`}>
                        {item.icon}
                      </div>
                      <div className="flex-1 w-full flex items-center overflow-hidden min-w-0">{item.label}</div>
                    </button>
                  ))}
                </nav>
                <div className="flex flex-col gap-2">
                  <a href={SUPPORT_LINK} className="flex items-center justify-center gap-3 bg-accent/20 border border-accent/40 text-accent py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(0,229,255,0.1)]">
                    Fale com o Suporte
                  </a>
                  <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] transition-all">
                    <Instagram size={16} /> @peptium.app
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-grow lg:pl-[250px] w-full tech-grid relative min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-transparent to-primary pointer-events-none" />
        <div className="relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
