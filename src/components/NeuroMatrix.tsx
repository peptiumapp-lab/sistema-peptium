import type { View } from '../App';
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Target } from 'lucide-react';


interface NeuroMatrixProps {
  setView?: (view: View) => void;
}
export function NeuroMatrix({ setView }: NeuroMatrixProps) {
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

      <div className="flex items-center space-x-3 mb-2">
        <Brain className="w-8 h-8 text-cyan-400" />
        <h2 className="text-3xl font-bold text-cyan-400 tracking-tight">Neuro Matrix</h2>
      </div>
      <p className="text-gray-400 mb-8">Centro de controle de neuroplasticidade e nootrópicos.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col items-center justify-center">
           {/* Radar simulado via CSS grid */}
           <div className="relative w-48 h-48 rounded-full border-2 border-cyan-900/30 flex items-center justify-center mb-6">
              <div className="absolute inset-4 rounded-full border border-cyan-900/40"></div>
              <div className="absolute w-full h-[1px] bg-cyan-900/40"></div>
              <div className="absolute h-full w-[1px] bg-cyan-900/40"></div>
              
              {/* Pontos de plotagem do radar mental */}
              <div className="absolute flex p-2 bg-black border border-cyan-500 rounded-sm text-xs font-mono text-cyan-400" style={{ top: '10px', left: '50%', transform: 'translateX(-50%)' }}>FOCO</div>
              <div className="absolute flex p-2 bg-black border border-green-500 rounded-sm text-xs font-mono text-green-400" style={{ right: '0px', top: '50%', transform: 'translateY(-50%)' }}>SPEED</div>
              <div className="absolute flex p-2 bg-black border border-orange-500 rounded-sm text-xs font-mono text-orange-400" style={{ left: '5px', bottom: '20px' }}>ANSIEDADE (BAIXA)</div>
           </div>
        </div>

        <div className="md:col-span-2 space-y-4">
           <h3 className="text-lg font-medium text-gray-200 mb-4">Biohacker Stack em Uso Cruzado</h3>
           
           <div className="bg-gradient-to-r from-gray-900 to-black border border-gray-800 p-5 rounded-xl flex items-start space-x-4">
              <div className="p-3 bg-cyan-900/20 rounded-lg">
                 <Zap className="w-6 h-6 text-cyan-400" />
              </div>
              <div className="flex-1">
                 <div className="flex justify-between">
                    <h4 className="font-bold text-white text-lg">Semax (0.1%)</h4>
                    <span className="text-xs font-mono bg-cyan-900 text-cyan-200 px-2 py-1 rounded">ATIVO (MANHÃ)</span>
                 </div>
                 <p className="text-sm text-gray-400 mt-2">Diferencial atencional rápido. Regulação do BDNF e neuroproteção aguda contra stress oxidativo mental.</p>
              </div>
           </div>

           <div className="bg-gradient-to-r from-gray-900 to-black border border-gray-800 p-5 rounded-xl flex items-start space-x-4">
              <div className="p-3 bg-green-900/20 rounded-lg">
                 <Target className="w-6 h-6 text-green-400" />
              </div>
              <div className="flex-1">
                 <div className="flex justify-between">
                    <h4 className="font-bold text-white text-lg">Dihexa</h4>
                    <span className="text-xs font-mono bg-green-900 text-green-200 px-2 py-1 rounded">ATIVO (TARDE)</span>
                 </div>
                 <p className="text-sm text-gray-400 mt-2">Acelerador intenso de sinaptogênese e formação de memórias. Carga mental profunda estrutural.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
