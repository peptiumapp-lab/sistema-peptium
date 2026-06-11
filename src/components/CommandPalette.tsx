import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calculator, BookOpen, Layers, ShieldAlert, Sparkles, Activity, Dna, Clock, Flame, Calendar, Brain, Shield, BookText } from 'lucide-react';
import type { View } from '../App';

interface CommandPaletteProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  setView: (view: View) => void;
}

export function CommandPalette({ isOpen, setIsOpen, setView }: CommandPaletteProps) {
  const [query, setQuery] = useState('');

  // Handle Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  const routes = [
    { icon: <BookText size={16} />, label: 'Manual de Uso Tático', view: 'manual' as View },
    { icon: <Search size={16} />, label: 'Explorador (Biblioteca Core)', view: 'library' as View },
    { icon: <Sparkles size={16} />, label: 'Atlas AI Builder (Gerador)', view: 'ai-generator' as View },
    { icon: <ShieldAlert size={16} />, label: 'Cofre Atlas (Protocol Vault)', view: 'cofre-atlas' as View },
    { icon: <Layers size={16} />, label: 'Cofre de Stacks', view: 'stacks' as View },
    { icon: <ShieldAlert size={16} />, label: 'Guardião de Segurança', view: 'interactions' as View },
    { icon: <MapPin size={16} />, label: 'Mapa de Bio-Hacking', view: 'map' as View },
    { icon: <Activity size={16} />, label: 'Scan De Exames (OCR)', view: 'lab-scanner' as View },
    { icon: <Clock size={16} />, label: 'Relógio Longevidade', view: 'longevity-clock' as View },
    { icon: <Flame size={16} />, label: 'Tracker de Jejum Celular', view: 'fasting-tracker' as View },
    { icon: <Calendar size={16} />, label: 'Macro Cycle Planner', view: 'cycle-planner' as View },
    { icon: <Dna size={16} />, label: 'Análise de Genoma (DNA)', view: 'genome-analyzer' as View },
    { icon: <Shield size={16} />, label: 'Tracker de Microbioma', view: 'microbiome-tracker' as View },
    { icon: <Brain size={16} />, label: 'Neuro Matrix', view: 'neuro-matrix' as View },
    { icon: <Calculator size={16} />, label: 'Calculadora de Reconstituição', view: 'calculator' as View },
  ];

  const filtered = routes.filter(r => r.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/80 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
      <div 
        className="w-full max-w-2xl bg-black border border-cyan-900/50 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 py-4 border-b border-gray-800">
          <Search className="w-5 h-5 text-cyan-500 mr-3" />
          <input 
            autoFocus
            type="text" 
            placeholder="Buscar módulo ou rota... (LabScanner, Neuro, Stacks)" 
            className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-600 text-lg"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className="text-xs uppercase font-mono text-gray-600 border border-gray-700 px-2 py-1 rounded tracking-wider">ESC</span>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-gray-500">Nenhum módulo encontrado no Data-Core.</div>
          ) : (
            filtered.map((route, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setView(route.view);
                  setIsOpen(false);
                }}
                className="w-full flex items-center px-4 py-3 hover:bg-cyan-900/20 rounded-xl transition text-left group"
              >
                <div className="p-2 bg-gray-900 rounded-lg text-cyan-400 group-hover:text-white group-hover:bg-cyan-500 transition mr-4">
                  {route.icon}
                </div>
                <span className="text-gray-300 font-medium group-hover:text-cyan-400 transition">{route.label}</span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
