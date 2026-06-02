import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Shield } from 'lucide-react';

export function MicrobiomeTracker() {
  return (
    <div className="p-6 text-white w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-cyan-400 mb-2 tracking-tight">Microbiome Matrix</h2>
      <p className="text-gray-400 mb-8">Rastreio de Permeabilidade Intestinal e Blindagem de Mucosa.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-5">
             <Activity className="w-48 h-48 text-orange-500" />
           </div>
           
           <h3 className="text-lg font-medium text-gray-200 mb-6">Índice Leaky Gut (Permeabilidade)</h3>
           <div className="space-y-6">
             <div>
               <div className="flex justify-between text-sm mb-1">
                 <span className="text-gray-400">Zonulina</span>
                 <span className="text-orange-400 font-mono">Elevado</span>
               </div>
               <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                 <div className="h-full bg-orange-500 w-[78%]"></div>
               </div>
             </div>
             <div>
               <div className="flex justify-between text-sm mb-1">
                 <span className="text-gray-400">LPS (Lipopolissacarídeo)</span>
                 <span className="text-red-400 font-mono">Crítico</span>
               </div>
               <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                 <div className="h-full bg-red-500 w-[85%]"></div>
               </div>
             </div>
           </div>
        </div>

        <div className="bg-gray-900 border border-cyan-900/50 rounded-xl p-6">
           <div className="flex items-center space-x-2 mb-6">
              <Shield className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-medium text-cyan-100">Protocolos Ativos na Matriz</h3>
           </div>
           
           <div className="space-y-4">
             <div className="bg-black border border-gray-800 p-4 rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-bold text-cyan-400">BPC-157 (Oral)</p>
                  <p className="text-xs text-gray-500 mt-1">Regeneração do epitélio gastrointestinal</p>
                </div>
                <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></span>
             </div>
             
             <div className="bg-black border border-gray-800 p-4 rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-bold text-cyan-400">KPV (Gástrico)</p>
                  <p className="text-xs text-gray-500 mt-1">Supressão inflamatória em mucosa</p>
                </div>
                <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></span>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
