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
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/20 border border-accent/40 rounded-full">
            <Zap size={10} className="text-accent fill-accent" />
            <span className="text-[9px] font-black uppercase tracking-widest text-accent">Status: Acesso Prime Ativado • {TOTAL_PEPTIDES} Compostos</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-secondary uppercase tracking-tight italic">Biblioteca <span className="text-accent underline decoration-2 underline-offset-8">Prime</span></h2>
          <p className="text-muted text-xs font-medium max-w-lg leading-relaxed">
            Explore nossa base de dados com {TOTAL_PEPTIDES} compostos, SARMs e biorreguladores validados cientificamente. Informação técnica para otimização humana.
          </p>
        </div>
        
        <div className="relative w-full md:w-96">
          <input 
            type="text" 
            placeholder="Buscar composto (ex: BPC-157)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-secondary/5 border border-secondary/10 rounded-2xl py-4 px-12 text-sm font-medium text-secondary placeholder:text-secondary/40 outline-none focus:border-accent/40 transition-all font-medium"
          />
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/40" />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {categories.map((cat) => (
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
          {filtered.map((protocol, i) => (
            <motion.div
              key={protocol.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: Math.min(i * 0.01, 0.5) }}
              onClick={() => setSelectedPeptide(protocol)}
              className="group relative glass-card cursor-pointer rounded-[16px] overflow-hidden border border-white/[0.03] hover:border-accent/20 transition-all flex flex-col h-full bg-[#080808]"
            >
              <div className="relative h-28 overflow-hidden">
                 <img src={protocol.image} alt={protocol.name} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-700 blur-[2px] group-hover:blur-0" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#080808] to-transparent" />
                 <span className="absolute top-3 left-3 px-2 py-0.5 bg-accent/20 text-accent rounded-full text-[7px] font-black uppercase tracking-widest border border-accent/20 backdrop-blur-md">
                  {protocol.tag}
                </span>
              </div>
              
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-base font-extrabold text-secondary mb-1.5 tracking-tight group-hover:text-accent transition-colors uppercase">{protocol.name}</h3>
                <p className="text-muted text-[9px] leading-relaxed font-medium mb-4 line-clamp-3">
                  {protocol.description}
                </p>
                
                <div className="mt-auto flex items-center justify-between pt-3 border-t border-white/5">
                  <div className="flex -space-x-2">
                    {protocol.synergies && Array.isArray(protocol.synergies) ? (
                      protocol.synergies.slice(0, 3).map((s, j) => (
                        <div key={j} className="w-6 h-6 rounded-full border-2 border-black bg-accent/10 flex items-center justify-center text-[5px] text-accent font-black uppercase overflow-hidden" title={`Sinergia: ${s}`}>
                          {s.charAt(0)}
                        </div>
                      ))
                    ) : (
                      [1, 2, 3].map(j => (
                        <div key={j} className="w-6 h-6 rounded-full border-2 border-black bg-[#111] flex items-center justify-center text-[6px] text-secondary/40 font-bold overflow-hidden">
                           <img src={`https://i.pravatar.cc/100?u=${protocol.id}${j}`} alt="user" className="w-full h-full object-cover opacity-60" />
                        </div>
                      ))
                    )}
                  </div>
                  <button 
                    onClick={() => setSelectedPeptide(protocol)}
                    className="text-[8px] font-black text-secondary/40 uppercase tracking-widest hover:text-accent transition-all flex items-center gap-1 group/btn"
                  >
                    Ver Bula <ArrowUpRight size={12} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center space-y-4">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-secondary/20">
            <Search size={24} />
          </div>
          <p className="text-secondary/40 font-black uppercase tracking-widest text-[10px]">Nenhum composto encontrado para "{searchTerm}"</p>
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

