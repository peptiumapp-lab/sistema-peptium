import React, { useState } from 'react';
import { Search, Filter, ArrowUpRight, Lock, Zap, ArrowLeft } from 'lucide-react';
import { PROTOCOLS, TOTAL_PEPTIDES } from '../../constants';
import { motion, AnimatePresence } from 'motion/react';
import { View } from '../../App';
import PeptideDetailModal from './PeptideDetailModal';
import { PeptideDossier } from '../../types';

interface PeptideLibraryProps {
  setView: (view: View) => void;
  isPremium?: boolean;
}

export default function PeptideLibrary({ setView, isPremium }: PeptideLibraryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [selectedPeptide, setSelectedPeptide] = useState<PeptideDossier | null>(null);

  const categories = [
    'Todos', 
    ...Array.from(new Set([
      ...PROTOCOLS.map(p => p.tag),
      ...PROTOCOLS.flatMap(p => p.secondaryTags || [])
    ]))
  ].sort((a, b) => a === 'Todos' ? -1 : a.localeCompare(b));

  const filtered = PROTOCOLS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Todos' || 
                            p.tag === activeCategory || 
                            p.secondaryTags?.includes(activeCategory);
    return matchesSearch && matchesCategory;
  });

  const getAccessLevel = (index: number) => {
    if (isPremium) return 'full';
    
    // Proteção de Dados: Após 50 compostos, desfoque total
    if (index >= 50) return 'blurred';
    
    // Padrão Intercalado: 2 Grátis, 1 Pro (Bloqueado)
    // 0, 1 -> Free | 2 -> Pro | 3, 4 -> Free | 5 -> Pro
    if (index % 3 === 2) return 'pro';
    
    return 'free';
  };

  const handlePeptideClick = (protocol: PeptideDossier, index: number) => {
    const level = getAccessLevel(index);
    if (isPremium || level === 'free') {
      setSelectedPeptide(protocol);
    } else {
      setView('plans');
    }
  };

  return (
    <div className="space-y-12">
      <button 
        onClick={() => setView('home')}
        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-secondary/40 hover:text-accent transition-all group mb-4"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        Voltar para a Home
      </button>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className={`inline-flex items-center gap-2 px-3 py-1 border rounded-full ${isPremium ? 'bg-accent/20 border-accent/40' : 'bg-white/5 border-white/10'}`}>
            <Zap size={10} className={`${isPremium ? 'text-accent fill-accent' : 'text-white/20'}`} />
            <span className={`text-[9px] font-black uppercase tracking-widest ${isPremium ? 'text-accent' : 'text-white/40'}`}>
              Status: {isPremium ? 'Acesso Prime Ativado' : 'Acesso Limitado (Free)'} • {TOTAL_PEPTIDES} Compostos
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-secondary uppercase tracking-tight italic">
            Atlas de <span className="text-accent underline decoration-2 underline-offset-8">Compostos</span>
          </h2>
          <p className="text-muted text-xs font-medium max-w-lg leading-relaxed">
            Nossa inteligência mapeou {TOTAL_PEPTIDES} compostos. {isPremium ? 'Sua licença Prime concede acesso total.' : 'Upgrade para Prime para desbloquear o catálogo completo e farmacodinâmica avançada.'}
          </p>
        </div>
        
        <div className="relative w-full md:w-96">
          <input 
            type="text" 
            placeholder="Buscar composto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-secondary/5 border border-secondary/10 rounded-2xl py-4 px-12 text-sm font-medium text-secondary placeholder:text-secondary/40 outline-none focus:border-accent/40 transition-all font-medium"
          />
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/40" />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {categories.slice(0, 15).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'bg-white/5 text-secondary/40 hover:bg-white/10'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filtered.map((protocol, i) => {
            const level = getAccessLevel(i);
            const isBlurred = level === 'blurred';
            const isProLocked = level === 'pro';

            return (
              <motion.div
                key={protocol.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: Math.min(i * 0.01, 0.5) }}
                onClick={() => handlePeptideClick(protocol, i)}
                className={`group relative glass-card cursor-pointer rounded-[16px] overflow-hidden border border-white/[0.03] hover:border-accent/20 transition-all flex flex-col h-full bg-[#080808] ${isBlurred ? 'grayscale saturate-0 opacity-50' : ''}`}
              >
                <div className="relative h-28 overflow-hidden">
                  <img src={protocol.image} alt={protocol.name} className={`w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-700 ${isBlurred ? 'blur-[8px]' : 'blur-[2px] group-hover:blur-0'}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808] to-transparent" />
                  
                  {/* Access Badge Container */}
                  <div className="absolute top-3 left-3 z-20 flex gap-2">
                    {level === 'free' && (
                        <span className="px-2 py-0.5 bg-green-500 text-black rounded-full text-[7px] font-black uppercase tracking-widest shadow-lg">
                            FREE
                        </span>
                    )}
                    {(isProLocked || isBlurred) && (
                        <span className="px-2 py-0.5 bg-accent text-black rounded-full text-[7px] font-black uppercase tracking-widest flex items-center gap-1 shadow-lg">
                            <Lock size={8} /> PRO
                        </span>
                    )}
                  </div>
                  
                  {/* Category Badge - Moved to bottom-right of image to avoid overlap */}
                  <div className="absolute bottom-3 right-3 z-20 px-2 py-0.5 bg-black/50 text-white/60 rounded-full text-[7px] font-black uppercase tracking-widest border border-white/10 backdrop-blur-md">
                    {protocol.tag.split(' ')[0]}
                  </div>
                </div>
                
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className={`text-sm font-extrabold text-secondary mb-1.5 tracking-tight group-hover:text-accent transition-colors uppercase ${isBlurred ? 'blur-[4px] select-none' : ''}`}>
                    {isBlurred ? 'XXXXXXXXXXXXX' : protocol.name}
                  </h3>
                  
                  <p className={`text-muted text-[9px] leading-relaxed font-medium mb-4 line-clamp-2 ${isBlurred ? 'blur-[3px] select-none' : ''}`}>
                    {isBlurred ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' : protocol.description}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between pt-3 border-t border-white/5">
                    <div className={`flex -space-x-2 ${isBlurred ? 'blur-[2px] opacity-20' : ''}`}>
                      {protocol.synergies && Array.isArray(protocol.synergies) ? (
                        protocol.synergies.slice(0, 3).map((s, j) => (
                          <div key={j} className="w-6 h-6 rounded-full border-2 border-black bg-accent/10 flex items-center justify-center text-[5px] text-accent font-black uppercase overflow-hidden">
                            {s.charAt(0)}
                          </div>
                        ))
                      ) : (
                        [1, 2].map(j => (
                          <div key={j} className="w-6 h-6 rounded-full border-2 border-black bg-[#111] overflow-hidden">
                             <img src={`https://i.pravatar.cc/100?u=${protocol.id}${j}`} alt="u" className="w-full h-full object-cover opacity-60" />
                          </div>
                        ))
                      )}
                    </div>
                    
                    <button 
                      className={`text-[8px] font-black uppercase tracking-widest transition-all flex items-center gap-1 ${level === 'free' || level === 'full' ? 'text-accent' : 'text-secondary/20'}`}
                    >
                      {level === 'free' || level === 'full' ? 'Ver Bula' : 'Bloqueado'} 
                      {level === 'free' || level === 'full' ? <ArrowUpRight size={12} /> : <Lock size={10} />}
                    </button>
                  </div>
                </div>

                {/* Hover Overlay for Locked */}
                {(isProLocked || isBlurred) && (
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 z-10 backdrop-blur-[1px]">
                        <div className="bg-accent text-black px-4 py-2 rounded-xl font-black text-[9px] uppercase tracking-[0.2em] shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all">
                            Upgrade Prime
                        </div>
                    </div>
                )}
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="py-20 text-center space-y-4">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-secondary/20">
            <Search size={24} />
          </div>
          <p className="text-secondary/40 font-black uppercase tracking-widest text-[10px]">Nenhum composto encontrado</p>
        </div>
      )}

      <AnimatePresence>
        {selectedPeptide && (
          <PeptideDetailModal 
            peptide={selectedPeptide} 
            onClose={() => setSelectedPeptide(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

