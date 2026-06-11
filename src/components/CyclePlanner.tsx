import type { View } from '../App';
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, ShieldCheck, RefreshCw } from 'lucide-react';


interface CyclePlannerProps {
  setView?: (view: View) => void;
}
export function CyclePlanner({ setView }: CyclePlannerProps) {
  const trimesters = [
    { label: 'Q1 (Jan-Mar)', mode: 'Acelerador / TRT', icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
    { label: 'Q2 (Abr-Jun)', mode: 'Reconstrução Tecidual', icon: ShieldCheck, color: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400/20' },
    { label: 'Q3 (Jul-Set)', mode: 'Reset de Receptores', icon: RefreshCw, color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20' },
    { label: 'Q4 (Out-Dez)', mode: 'Manutenção Integrativa', icon: Calendar, color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20' },
  ];

  return (
    <div className="p-6 text-white w-full max-w-4xl mx-auto">
      {setView && (
        <button 
          onClick={() => setView('home')}
          className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-secondary/60 hover:text-accent transition-all group mb-4 px-4 pt-4 z-50 relative"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left group-hover:-translate-x-1 transition-transform"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          Voltar para a Home
        </button>
      )}

      <h2 className="text-3xl font-bold text-cyan-400 mb-2 tracking-tight">Macro Cycle Planner</h2>
      <p className="text-gray-400 mb-8">Planejamento biológico anual para otimização de performance e descanso.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {trimesters.map((t, idx) => (
          <div key={idx} className={`border ${t.border} bg-gray-900 rounded-xl overflow-hidden hover:-translate-y-1 transition duration-300`}>
            <div className={`p-4 ${t.bg} border-b ${t.border} flex items-center justify-between`}>
              <span className="font-mono text-xs font-bold text-gray-300">{t.label}</span>
              <t.icon className={`w-5 h-5 ${t.color}`} />
            </div>
            <div className="p-5">
              <h3 className={`font-semibold mb-3 ${t.color}`}>{t.mode}</h3>
              <ul className="space-y-2">
                 <li className="text-sm text-gray-400 flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-gray-600 before:rounded-full before:mr-2">Protocolo Primário</li>
                 <li className="text-sm text-gray-400 flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-gray-600 before:rounded-full before:mr-2">Dieta Alvo</li>
                 <li className="text-sm text-gray-500 flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-gray-800 before:rounded-full before:mr-2 italic">Bloqueios</li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
