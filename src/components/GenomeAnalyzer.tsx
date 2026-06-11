import type { View } from '../App';
import React from 'react';
import { motion } from 'framer-motion';
import { Dna, AlertOctagon, CheckSquare } from 'lucide-react';


interface GenomeAnalyzerProps {
  setView?: (view: View) => void;
}
export function GenomeAnalyzer({ setView }: GenomeAnalyzerProps) {
  const snps = [
    { name: 'MTHFR C677T', status: 'Mutação Detectada', impact: 'Absorção de Folato Comprometida', protocol: 'SAM-e / Metilfolato' },
    { name: 'APOE4', status: 'Variante de Risco', impact: 'Cleareance Neurológico Lento', protocol: 'Cerebrolysin / Dieta Cetogênica' },
    { name: 'ACTN3', status: 'Genótipo RR', impact: 'Explosão Muscular Rápida', protocol: 'Otimização com TB-500' },
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

      <div className="flex items-center space-x-3 mb-6">
        <Dna className="w-8 h-8 text-cyan-400" />
        <h2 className="text-3xl font-bold text-cyan-400 tracking-tight">Analista DNA Profiler</h2>
      </div>
      
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
           <h3 className="text-lg font-medium text-gray-200">Painel de Polimorfismos (SNPs)</h3>
           <span className="text-xs font-mono bg-cyan-900 text-cyan-200 px-2 py-1 rounded">RAW DATA LOADED</span>
        </div>
        
        <div className="space-y-4">
          {snps.map((snp, i) => (
            <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-black border border-gray-800 rounded-lg">
              <div className="flex items-start space-x-3 mb-3 md:mb-0">
                 {snp.status.includes('Mutação') || snp.status.includes('Risco') ? 
                   <AlertOctagon className="w-5 h-5 text-orange-500 mt-0.5" /> : 
                   <CheckSquare className="w-5 h-5 text-green-500 mt-0.5" />
                 }
                 <div>
                   <p className="font-mono text-cyan-100">{snp.name}</p>
                   <p className="text-xs text-gray-500 mt-1">{snp.impact}</p>
                 </div>
              </div>
              <div className="md:text-right bg-gray-900 p-2 md:p-0 md:bg-transparent rounded">
                 <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Intervenção Epigenética</p>
                 <p className="font-medium text-cyan-400">{snp.protocol}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
