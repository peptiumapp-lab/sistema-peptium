import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Activity, Zap } from 'lucide-react';

export function LongevityClock() {
  return (
    <div className="p-6 text-white w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-cyan-400 mb-8 tracking-tight">Relógio de Longevidade</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Mostrador Circular (Simulado) */}
        <div className="flex justify-center">
          <div className="relative w-64 h-64 rounded-full border-4 border-cyan-900/40 flex items-center justify-center p-4">
             <div className="absolute inset-0 border-4 border-t-cyan-400 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin-slow"></div>
             <div className="text-center z-10">
                <p className="text-sm text-gray-400 mb-1">Idade Biológica</p>
                <p className="text-5xl font-mono font-bold text-cyan-400">28.4</p>
                <p className="text-xs text-green-500 mt-2">-6.6 anos (Delta)</p>
             </div>
          </div>
        </div>

        <div className="space-y-4">
           <div className="bg-gray-900 border border-gray-800 p-5 rounded-xl">
              <div className="flex items-center space-x-3 mb-2">
                 <Clock className="w-5 h-5 text-gray-500" />
                 <h3 className="text-gray-300 font-medium">Idade Cronológica</h3>
              </div>
              <p className="text-3xl font-mono text-white">35.0</p>
           </div>
           
           <div className="bg-gray-900 border border-gray-800 p-5 rounded-xl">
              <div className="flex items-center space-x-3 mb-2">
                 <Activity className="w-5 h-5 text-green-500" />
                 <h3 className="text-gray-300 font-medium">Pace of Aging</h3>
              </div>
              <p className="text-3xl font-mono text-white">0.74 <span className="text-sm font-sans text-gray-500">anos/ano cronológico</span></p>
           </div>
           
           <div className="bg-cyan-950/20 border border-cyan-900/50 p-4 rounded-xl flex items-start space-x-3">
              <Zap className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
              <p className="text-sm text-cyan-200">Protocolo atual de Epitalon + NAD+ reduziu o ritmo de envelhecimento em 12% nos últimos 3 meses.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
