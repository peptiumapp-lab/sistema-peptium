import type { View } from '../App';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Timer, Dna, Flame } from 'lucide-react';


interface FastingTrackerProps {
  setView?: (view: View) => void;
}
export function FastingTracker({ setView }: FastingTrackerProps) {
  const [hours, setHours] = useState(16);
  const [stage, setStage] = useState('Autofagia Leve');

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

      <h2 className="text-3xl font-bold text-cyan-400 mb-8 tracking-tight">Tracker de Jejum Celular</h2>
      
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Dna className="w-32 h-32 text-cyan-400" />
        </div>
        
        <Timer className="w-10 h-10 text-cyan-500 mx-auto mb-4" />
        <h3 className="text-gray-400 text-sm tracking-wider uppercase mb-2">Tempo Atual de Jejum</h3>
        <p className="text-6xl font-mono font-bold text-white mb-4">
          16<span className="text-3xl text-gray-500">h</span> 45<span className="text-3xl text-gray-500">m</span>
        </p>
        
        <div className="inline-flex items-center space-x-2 bg-green-950/30 text-green-400 px-4 py-1.5 rounded-full border border-green-900/50">
          <Flame className="w-4 h-4" />
          <span className="text-sm font-medium">Estágio: Geração de Corpos Cetônicos Ativa</span>
        </div>
      </div>

      <div>
        <h4 className="text-gray-400 text-sm mb-4">Curva de Esgotamento & Autofagia</h4>
        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-800 before:to-transparent">
           {[
             { h: '12h', t: 'Esgotamento de Glicogênio', a: true },
             { h: '16h', t: 'Pico de GH Hormônio do Crescimento', a: true },
             { h: '24h', t: 'Autofagia Celular Profunda', a: false },
           ].map((s, i) => (
             <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
               <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 shrink-0 transition md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow flex-shrink-0 ${s.a ? 'bg-cyan-900 border-cyan-400 text-cyan-400' : 'bg-gray-900 border-gray-800 text-gray-600'}`}>
                 <span className="text-xs font-mono">{s.h}</span>
               </div>
               <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border ${s.a ? 'bg-gray-900 border-cyan-900/50' : 'bg-black border-gray-800'}`}>
                 <p className={`font-medium ${s.a ? 'text-cyan-100' : 'text-gray-600'}`}>{s.t}</p>
               </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
