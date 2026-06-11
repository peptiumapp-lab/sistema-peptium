import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Shield, Zap, Target, ArrowUpRight, BookOpen, ChevronRight, Activity, Search } from 'lucide-react';
import { PROTOCOLS, TOTAL_PEPTIDES } from '../constants';
import { PeptiumLogo } from './Logo';
import { useState, useMemo, useEffect, useRef } from 'react';
import Fuse from 'fuse.js';
import { useLanguage } from '../contexts/LanguageContext';

interface HeroProps {
  setView: (view: any) => void;
  isPremium?: boolean;
  onSelectPeptide?: (peptide: any) => void;
}

export default function Hero({ setView, isPremium, onSelectPeptide }: HeroProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const fuse = useMemo(() => new Fuse(PROTOCOLS, {
    keys: ['name', 'synonyms', 'tag', 'class'],
    threshold: 0.3, 
    distance: 100,
  }), []);

  const searchResults = useMemo(() => {
    if (!searchTerm) return [];
    return fuse.search(searchTerm).slice(0, 5).map(res => res.item);
  }, [searchTerm, fuse]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (peptide: any) => {
    setSearchTerm('');
    setIsFocused(false);
    if (onSelectPeptide) {
      onSelectPeptide(peptide);
    }
  };
  return (
    <div className="relative pt-12 pb-10 lg:pt-24 lg:pb-16 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-blue-900/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-8"
              >
                <PeptiumLogo className="w-24 h-24 md:w-32 md:h-32 drop-shadow-[0_0_20px_rgba(0,229,255,0.4)]" glowing />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-accent/5 border border-accent/20 mb-10 backdrop-blur-md"
              >
                <div className="relative flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <div className="absolute w-4 h-4 rounded-full bg-accent/30 animate-ping" />
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[13px] font-black tracking-wider text-accent uppercase">
                    {t('hero.acervo')}
                  </span>
                  <div className="h-4 w-[1px] bg-accent/20" />
                  <span className="text-xs font-bold tracking-wider text-white/60 uppercase">
                    {t('hero.core')}
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mb-12 flex flex-col items-center"
              >
                <div className="relative group">
                  <div className="absolute -inset-4 bg-accent/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative text-[52px] md:text-[80px] font-black leading-none text-white tracking-[-0.08em] flex items-start gap-1">
                    <span className="text-glow drop-shadow-[0_0_30px_rgba(0,255,194,0.3)] italic">{TOTAL_PEPTIDES}</span>
                    <span className="text-accent text-3xl md:text-5xl mt-2 md:mt-4 animate-pulse">+</span>
                  </div>
                </div>
              </motion.div>

            <h1 className="text-3xl md:text-5xl font-sans font-black mb-8 leading-[0.95] tracking-tighter text-white uppercase italic">
              {t('hero.title')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-accent via-white to-accent text-glow">{t('hero.subtitle')}</span>
            </h1>
            
            <p className="max-w-3xl mx-auto text-xs md:text-[11px] text-white/60 mb-10 font-bold leading-loose uppercase tracking-wider">
              {t('hero.description')}
            </p>

            <div className="max-w-2xl mx-auto mb-12 relative z-50 flex items-center justify-center p-2" ref={searchRef}>
              <div className="relative w-full">
                <input 
                  type="text" 
                  placeholder={t('hero.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  className="w-full bg-[#0B0C10]/60 backdrop-blur-xl border border-white/20 rounded-2xl py-4 md:py-5 px-12 md:px-14 text-sm font-medium text-white placeholder:text-white/50 outline-none focus:border-accent/30 transition-all font-medium shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                />
                <Search size={20} className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-white/60" />
                
                <AnimatePresence>
                  {isFocused && searchTerm && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 right-0 mt-3 bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-80 overflow-y-auto custom-scrollbar"
                    >
                        {searchResults.length > 0 ? (
                            <ul className="py-2">
                                {searchResults.map((result: any) => (
                                    <li 
                                        key={result.id} 
                                        role="button"
                                        onClick={() => handleSelect(result)}
                                        className="px-4 py-3 hover:bg-white/20 cursor-pointer border-b border-white/15 last:border-0 flex items-center gap-4 transition-colors"
                                    >   
                                        <div className="w-10 h-10 rounded-lg bg-black overflow-hidden shrink-0">
                                            <img src={result.image} alt={result.name} className="w-full h-full object-cover opacity-60" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black text-white italic tracking-tight">{result.name}</h4>
                                            <p className="text-xs text-white/60 uppercase tracking-wider">{result.tag}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="px-4 py-8 text-center text-white/60 text-xs font-black uppercase tracking-wider">
                                {t('hero.noResults')}
                            </div>
                        )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => setView('library')}
                className="group relative w-full sm:w-auto px-8 py-4 bg-accent text-black font-black text-xs uppercase tracking-wider overflow-hidden transition-all hover:scale-105 active:scale-95"
                style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <div className="relative z-10 flex items-center justify-center gap-3">
                  <span>{t('hero.btnStartOps')}</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              <button 
                onClick={() => setView('plans')}
                className="group w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white/20 hover:border-accent/40 text-white font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                style={{ clipPath: 'polygon(0 0, 90% 0, 100% 30%, 100% 100%, 10% 100%, 0 70%)' }}
              >
                <span className="relative z-10">{t('hero.btnStartNow')}</span>
                <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform opacity-50" />
              </button>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                onClick={() => setView('guide')}
                className="flex flex-col p-6 rounded-[32px] bg-secondary/[0.02] border border-white/15 hover:border-accent/40 cursor-pointer transition-all group text-left relative overflow-hidden"
              >
                <div className="flex items-center gap-4 mb-4 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform shrink-0">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-black text-white italic uppercase tracking-tight">{t('hero.box1Title')}</h4>
                    </div>
                    <span className="text-xs text-accent font-black uppercase tracking-wider bg-accent/10 px-2 py-0.5 rounded-full inline-block">{t('hero.box1Tag')}</span>
                  </div>
                </div>
                <p className="text-white/50 text-xs font-bold uppercase tracking-wider leading-loose flex-grow relative z-10">
                  {t('hero.box1Desc')}
                </p>
                <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/60 group-hover:text-accent group-hover:border-accent/40 transition-all z-10">
                  <ChevronRight size={16} />
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => setView('ai-generator')}
                className="flex flex-col p-6 rounded-[32px] bg-accent/5 border border-accent/20 hover:border-accent/60 cursor-pointer transition-all group text-left relative overflow-hidden shadow-[0_0_30px_rgba(0,229,255,0.05)] hover:shadow-[0_0_40px_rgba(0,229,255,0.15)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-4 mb-4 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform shrink-0">
                    <Activity size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-black text-white italic uppercase tracking-tight">{t('hero.box2Title')}</h4>
                    </div>
                    <span className="text-xs text-primary font-black uppercase tracking-wider bg-accent px-2 py-0.5 rounded-full inline-block">{t('hero.box2Tag')}</span>
                  </div>
                </div>
                <p className="text-accent/60 text-xs font-bold uppercase tracking-wider leading-loose flex-grow relative z-10">
                  {t('hero.box2Desc')}
                </p>
                <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full border border-accent/20 flex items-center justify-center text-accent/50 group-hover:text-accent group-hover:border-accent transition-all z-10">
                  <ChevronRight size={16} />
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                onClick={() => setView('stacks')}
                className="flex flex-col p-6 rounded-[32px] bg-secondary/[0.02] border border-white/15 hover:border-blue-400/40 cursor-pointer transition-all group text-left relative overflow-hidden"
              >
                <div className="flex items-center gap-4 mb-4 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform shrink-0">
                    <Target size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-black text-white italic uppercase tracking-tight">{t('hero.box3Title')}</h4>
                    </div>
                    <span className="text-xs text-blue-400 font-black uppercase tracking-wider bg-blue-500/10 px-2 py-0.5 rounded-full inline-block">{t('hero.box3Tag')}</span>
                  </div>
                </div>
                <p className="text-white/50 text-xs font-bold uppercase tracking-wider leading-loose flex-grow relative z-10">
                  {t('hero.box3Desc')}
                </p>
                <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/60 group-hover:text-blue-400 group-hover:border-blue-400/40 transition-all z-10">
                  <ChevronRight size={16} />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { icon: <Shield size={24} className="text-accent" />, title: t('hero.feat1Title' as any), desc: t('hero.feat1Desc' as any) },
              { icon: <Zap size={24} className="text-accent" />, title: t('hero.feat2Title' as any), desc: t('hero.feat2Desc' as any) },
              { icon: <Target size={24} className="text-accent" />, title: t('hero.feat3Title' as any), desc: t('hero.feat3Desc' as any) }
            ].map((item, i) => (
              <div key={i} className="glass-card p-6 rounded-[24px] text-left border-white/15 bg-white/[0.01] hover:border-accent/20 transition-all duration-500 group">
                <div className="mb-6 p-3 w-fit bg-accent/5 rounded-xl group-hover:bg-accent group-hover:text-black transition-colors">{item.icon}</div>
                <h3 className="text-lg font-black mb-2 tracking-tighter uppercase italic">{item.title}</h3>
                <p className="text-white/50 text-xs font-bold leading-loose uppercase tracking-wider">{item.desc}</p>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </div>
  );
}
