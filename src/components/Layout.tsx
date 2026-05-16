import React from 'react';
import { 
  Menu, X, Phone, LayoutDashboard, Calculator, 
  Beaker, Library, CreditCard, MessageCircle, 
  Zap, Shield, Target, Sun, Moon,
  Hexagon, Sparkles, ArrowLeftRight, ClipboardList,
  GraduationCap, Layers, ShieldAlert, MapPin,
  Calendar, User, HelpCircle, UserPlus, BookOpen, LogOut, LogIn, Instagram, Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WHATSAPP_LINK, INSTAGRAM_HANDLE, INSTAGRAM_LINK, SITE_URL, SITE_LINK } from '../constants';
import type { View } from '../App';
import { useAuth } from '../context/AuthContext';
import { PeptiumLogo } from './Logo';
import { signInWithGoogle, logout } from '../lib/firebase';

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
  const { user, profile } = useAuth();

  const bibliotecaItems = [
    { icon: <LayoutDashboard size={18} />, label: 'Painel Central', view: 'home' as View },
    { icon: <Hexagon size={18} />, label: 'Atlas de Compostos', view: 'library' as View },
    { icon: <Layers size={18} />, label: 'Biblioteca de Protocolos', view: 'synergies' as View },
    { icon: <BookOpen size={18} />, label: 'Bio-Inteligência', view: 'dossier' as View },
    { icon: <Sparkles size={18} />, label: 'Bio-Scanner IA', view: 'home' as View, anchor: 'hero' },
    { icon: <ArrowLeftRight size={18} />, label: 'Análise de Sinergia', view: 'stacks' as View },
    { icon: <ClipboardList size={18} />, label: 'Meus Protocolos', view: 'home' as View, anchor: 'hero' },
    { icon: <GraduationCap size={18} />, label: 'Centro de Aprendizado', view: 'guide' as View },
  ];

  const ferramentasItems = [
    { icon: <Calculator size={18} />, label: 'Motor de Precisão', view: 'calculator' as View },
    { icon: <Layers size={18} />, label: 'Cofre de Stacks', view: 'stacks' as View },
    { icon: <ShieldAlert size={18} />, label: 'Guardião de Segurança', view: 'interactions' as View },
    { icon: <MapPin size={18} />, label: 'Mapa de Bio-Hacking', view: 'home' as View, anchor: 'extras' },
    { icon: <Calendar size={18} />, label: 'Cronograma de Ciclo', view: 'home' as View, anchor: 'hero' },
  ];

  const contaItems = [
    ...(user ? [
      { icon: <User size={18} />, label: profile?.displayName || 'Minha Conta', view: 'plans' as View },
      { icon: <LogOut size={18} />, label: 'Sair', onClick: logout },
    ] : [
      { icon: <LogIn size={18} />, label: 'Entrar / Cadastrar', onClick: signInWithGoogle, highlight: true },
    ]),
    { icon: <Instagram size={18} />, label: INSTAGRAM_HANDLE, onClick: () => window.open(INSTAGRAM_LINK, '_blank') },
    { icon: <Globe size={18} />, label: SITE_URL, onClick: () => window.open(SITE_LINK, '_blank') },
    { icon: <HelpCircle size={18} />, label: 'Suporte', onClick: () => window.open(WHATSAPP_LINK, '_blank') },
    { icon: <Moon size={18} />, label: 'Modo Escuro', onClick: () => setTheme(theme === 'dark' ? 'light' : 'dark') },
    ...(!isPremium ? [{ icon: <UserPlus size={18} />, label: 'Assinar Prime', view: 'plans' as View, highlight: true }] : []),
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
    <div className="min-h-screen bg-primary flex overflow-x-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-52 h-screen fixed left-0 top-0 bg-primary border-r border-secondary/5 z-40 transition-colors">
        <div className="p-4 pb-2">
          <span 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setCurrentView('home')}
          >
            <PeptiumLogo className="w-12 h-12" glowing />
            <span className="font-sans font-black text-[12px] tracking-widest text-[#00E5FF] uppercase leading-none drop-shadow-[0_0_8px_rgba(0,229,255,0.4)]">
              PEPTIUM
            </span>
            <span className="font-sans font-bold text-[12px] tracking-[0.3em] text-white uppercase italic leading-none opacity-90">
              PRIME
            </span>
          </span>
        </div>
        
        <div className="flex-grow overflow-y-auto px-1 py-1 custom-scrollbar">
          {isPremium && (
            <div className="px-4 py-3 mb-4 mx-2 bg-accent/5 border border-accent/20 rounded-2xl">
              <div className="flex items-center gap-2 mb-1">
                <Zap size={10} className="text-accent" fill="currentColor" />
                <span className="text-[10px] font-black text-secondary tracking-widest uppercase italic">Status Prime</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-accent animate-pulse" />
                <span className="text-[8px] font-bold text-accent uppercase tracking-[0.2em]">Acesso Ilimitado</span>
              </div>
            </div>
          )}

          <div className="mb-3">
            <div className="text-[8px] font-black text-secondary/20 uppercase tracking-[0.2em] mb-1 px-4 italic">
              BIBLIOTECA
            </div>
            <nav className="space-y-0">
              {bibliotecaItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleNavClick(item.view, (item as any).anchor)}
                  className={`w-full flex items-center gap-2 px-4 py-1.5 transition-all text-[11px] font-bold group relative ${
                    currentView === item.view 
                      ? 'text-accent' 
                      : 'text-muted hover:text-secondary hover:bg-secondary/5'
                  }`}
                >
                  {currentView === item.view && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-3 bg-accent rounded-r-full" />
                  )}
                  <span className={`${
                    currentView === item.view ? 'text-accent' : 'text-secondary/20 group-hover:text-secondary'
                  } transition-colors`}>
                    {React.cloneElement(item.icon as React.ReactElement, { size: 13 })}
                  </span>
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="mb-3">
            <div className="text-[8px] font-black text-secondary/20 uppercase tracking-[0.2em] mb-1 px-4 italic">
              FERRAMENTAS
            </div>
            <nav className="space-y-0">
              {ferramentasItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleNavClick(item.view, (item as any).anchor)}
                  className={`w-full flex items-center gap-2 px-4 py-1.5 transition-all text-[11px] font-bold group relative ${
                    currentView === item.view 
                      ? 'text-accent' 
                      : 'text-muted hover:text-secondary hover:bg-secondary/5'
                  }`}
                >
                  {currentView === item.view && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-3 bg-accent rounded-r-full" />
                  )}
                  <span className={`${
                    currentView === item.view ? 'text-accent' : 'text-secondary/20 group-hover:text-secondary'
                  } transition-colors`}>
                    {React.cloneElement(item.icon as React.ReactElement, { size: 13 })}
                  </span>
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="p-1 border-t border-secondary/5 bg-primary/80 backdrop-blur-md">
          <nav className="space-y-0">
            {contaItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick || (() => handleNavClick(item.view!))}
                className={`w-full flex items-center gap-2 px-4 py-1.5 transition-all text-[11px] font-bold group ${
                  item.highlight ? 'text-accent' : 'text-muted hover:text-secondary hover:bg-secondary/5'
                }`}
              >
                <span className={`${
                  item.highlight ? 'text-accent' : 'text-secondary/20 group-hover:text-secondary shadow-sm'
                } transition-colors`}>
                  {React.cloneElement(item.icon as React.ReactElement, { size: 13 })}
                </span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile Header / Navbar */}
      <nav className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-primary/80 backdrop-blur-xl border-b border-secondary/5">
        <div className="px-4 h-14 flex justify-between items-center">
          <span 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setCurrentView('home')}
          >
            <PeptiumLogo className="w-12 h-12" glowing />
            <span className="font-sans font-black text-[14px] tracking-widest text-[#00E5FF] uppercase drop-shadow-[0_0_8px_rgba(0,229,255,0.4)]">
              PEPTIUM
            </span>
            <span className="font-sans font-bold text-[14px] tracking-[0.3em] text-white uppercase italic opacity-90">
              PRIME
            </span>
          </span>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 text-secondary/40"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
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
              className="fixed inset-0 bg-primary/90 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed top-0 left-0 h-full w-4/5 max-w-sm bg-primary z-[70] lg:hidden border-r border-secondary/10 flex flex-col"
            >
              <div className="p-5 flex justify-between items-center border-b border-secondary/5">
                <span className="flex items-center gap-2 cursor-pointer group">
                  <PeptiumLogo className="w-12 h-12" glowing />
                  <span className="font-sans font-black text-[14px] tracking-widest text-[#00E5FF] uppercase drop-shadow-[0_0_8px_rgba(0,229,255,0.4)]">
                    PEPTIUM
                  </span>
                  <span className="font-sans font-bold text-[14px] tracking-[0.3em] text-white uppercase italic opacity-90">
                    PRIME
                  </span>
                </span>
                <button onClick={() => setIsSidebarOpen(false)} className="text-secondary/40 hover:text-accent transition-colors"><X size={18} /></button>
              </div>
              
              <div className="p-4 overflow-y-auto custom-scrollbar flex-grow">
                {isPremium && (
                  <div className="px-5 py-4 mb-6 bg-accent/5 border border-accent/20 rounded-2xl mx-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Zap size={12} className="text-accent" fill="currentColor" />
                      <span className="text-[11px] font-black text-secondary tracking-widest uppercase italic">Assinatura Prime Ativa</span>
                    </div>
                    <span className="text-[9px] font-bold text-accent uppercase tracking-widest">Acesso Vitalício Liberado</span>
                  </div>
                )}

                <div className="mb-6">
                  <div className="text-[10px] font-bold text-secondary/30 uppercase tracking-[0.05em] mb-4 px-4">BIBLIOTECA</div>
                  <nav className="space-y-0.5">
                    {bibliotecaItems.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleNavClick(item.view, (item as any).anchor)}
                        className={`w-full flex items-center gap-3 py-3 px-4 transition-all text-[13px] font-medium ${
                          currentView === item.view ? 'text-accent' : 'text-muted'
                        }`}
                      >
                        <span className={currentView === item.view ? 'text-accent' : 'text-secondary/40'}>{item.icon}</span>
                        {item.label}
                      </button>
                    ))}
                  </nav>
                </div>

                <div className="mb-6">
                  <div className="text-[10px] font-bold text-secondary/30 uppercase tracking-[0.05em] mb-4 px-4">FERRAMENTAS</div>
                  <nav className="space-y-0.5">
                    {ferramentasItems.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleNavClick(item.view, (item as any).anchor)}
                        className={`w-full flex items-center gap-3 py-3 px-4 transition-all text-[13px] font-medium ${
                          currentView === item.view ? 'text-accent' : 'text-muted'
                        }`}
                      >
                        <span className={currentView === item.view ? 'text-accent' : 'text-secondary/40'}>{item.icon}</span>
                        {item.label}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              <div className="p-4 border-t border-secondary/5 bg-primary/80">
                <nav className="space-y-0.5 mb-4">
                  {contaItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={item.onClick || (() => handleNavClick(item.view!))}
                      className={`w-full flex items-center gap-3 py-3 px-4 transition-all text-[13px] font-medium ${
                        item.highlight ? 'text-accent' : 'text-muted'
                      }`}
                    >
                      <span className={item.highlight ? 'text-accent' : 'text-secondary/40'}>{item.icon}</span>
                      {item.label}
                    </button>
                  ))}
                </nav>
                <div className="flex flex-col gap-2">
                  <a href={WHATSAPP_LINK} className="flex items-center justify-center gap-3 bg-accent text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl">
                    Suporte Via WhatsApp
                  </a>
                  <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 bg-primary border border-secondary/10 text-secondary py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em]">
                    <Instagram size={14} /> @peptium.app
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-grow lg:pl-52 w-full tech-grid relative min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-transparent to-primary pointer-events-none" />
        <div className="relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
