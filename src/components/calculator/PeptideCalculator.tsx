import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { Calculator, Beaker, Zap, ArrowLeft, Info, Droplets, Target, ArrowUpRight, Search, Activity, Clock } from 'lucide-react';
import { PROTOCOLS } from '../../constants';

const SYRINGE_TYPES = [
  { id: '1ml', label: '1.0mL (100 UI)', max: 100, step: 2, majorStep: 10 },
  { id: '05ml', label: '0.5mL (50 UI)', max: 50, step: 1, majorStep: 5 },
  { id: '03ml', label: '0.3mL (30 UI)', max: 30, step: 0.5, majorStep: 5 },
];

function SyringeVisual({ units, type }: { units: number, type: typeof SYRINGE_TYPES[0] }) {

  const percentage = Math.min((units / type.max) * 100, 100);
  const BODY_WIDTH = 300;
  
  return (
    <div className="relative w-full max-w-[500px] h-56 mx-auto bg-transparent flex items-center justify-center select-none py-10">
      {/* Container Centralizado para a Seringa */}
      <div className="relative h-20 flex items-center" style={{ width: `${BODY_WIDTH + 180}px` }}>
        
        {/* 1. Agulha e Bocal (Totalmente à Esquerda) */}
        <div className="absolute left-0 flex items-center z-30">
          <div className="w-[50px] h-[0.5px] bg-slate-400/60 shadow-[0_0_2px_rgba(255,255,255,0.1)]" />
          <div className="w-10 h-6 bg-[#ff8c00] rounded-sm shadow-lg flex items-center justify-center border border-white/20 relative overflow-hidden">
            <div className="w-full h-[1px] bg-white/20 absolute top-1" />
            <div className="w-full h-[1px] bg-black/10 absolute bottom-1" />
          </div>
          {/* Conector transparente reduzido para não sobrepor marcas */}
          <div className="w-2 h-4 bg-white/10" />
        </div>
        
        {/* 2. Corpo da Seringa (Cilindro Transparente) */}
        {/* Posicionado após o bocal com folga de segurança (50 + 40 + 8 = 98px -> Usando 100px para garantir) */}
        <div className="absolute left-[100px] h-8 bg-white/[0.07] border-y border-white/20 z-20 flex items-center shadow-[inset_0_2px_8px_rgba(0,0,0,0.4)]" 
             style={{ width: `${BODY_WIDTH}px` }}>
          
          {/* Líquido */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ type: "spring", stiffness: 45, damping: 15 }}
            className="h-full bg-accent/40 backdrop-blur-[1px] border-r border-accent shadow-[0_0_15px_rgba(45,212,191,0.2)] relative z-10"
          >
            <div className="absolute inset-x-0 top-0 h-[30%] bg-white/10 opacity-40" />
          </motion.div>

          {/* Graduações - Agora totalmente visíveis desde o marco zero */}
          <div className="absolute inset-0 flex justify-between px-0 pointer-events-none opacity-90 z-20">
            {Array.from({ length: type.max + 1 }).map((_, i) => {
               const isMajor = i % type.majorStep === 0;
               const isHalf = type.max === 100 ? i % 5 === 0 && !isMajor : false; 
               return (
                 <div key={i} className="flex flex-col items-center justify-end relative h-full pb-1">
                   <div className={`w-[0.5px] bg-white/40 ${isMajor ? 'h-full bg-white/90' : isHalf ? 'h-[60%]' : 'h-[30%]'}`} />
                   {isMajor && (
                      <span className="absolute -bottom-6 text-[9px] font-black text-white tracking-tighter">
                        {i}
                      </span>
                   )}
                 </div>
               );
            })}
          </div>
          
          {/* Brilho de reflexo do vidro */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/20 pointer-events-none" />
        </div>

        {/* 3. Conjunto do Êmbolo (Pistão) */}
        {/* Ajustado para alinhar a borracha com o marco zero (100px - 20px da borracha = 80px) */}
        <motion.div 
          animate={{ x: `${(percentage / 100) * BODY_WIDTH}px` }}
          transition={{ type: "spring", stiffness: 45, damping: 15 }}
          className="absolute left-[80px] flex items-center z-10"
        >
          {/* Borracha (Stopper) - Começa exatamente no zero */}
          <div className="w-5 h-[28px] bg-[#020617] border-r-2 border-accent/80 rounded-sm shadow-xl flex flex-col justify-around py-1 overflow-hidden">
             <div className="w-full h-1 bg-white/5" />
             <div className="w-full h-1 bg-white/5" />
          </div>

          {/* Haste */}
          <div className="w-[300px] h-3 bg-gradient-to-b from-white/10 via-white/20 to-white/10 border-y border-white/5" />

          {/* Grip do Polegar */}
          <div className="w-4 h-16 bg-white/10 border border-white/20 rounded-full flex items-center justify-center shadow-xl backdrop-blur-sm -ml-1">
             <div className="w-[1.5px] h-10 bg-white/20 rounded-full" />
          </div>
        </motion.div>

        {/* Flanges de Apoio (Fixo no final do cilindro: 100 + 300 = 400px) */}
        <div className="absolute left-[400px] h-20 w-4 bg-white/10 border border-white/20 rounded-sm z-30" />
      </div>
    </div>
  );
}

interface PeptideCalculatorProps {
  setView?: (view: any) => void;
}

export default function PeptideCalculator({ setView }: PeptideCalculatorProps) {
  const [mg, setMg] = useState<number>(5);
  const [water, setWater] = useState<number>(2);
  const [dose, setDose] = useState<number>(250);
  const [result, setResult] = useState<number>(0);
  const [syringeType, setSyringeType] = useState(SYRINGE_TYPES[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPeptide, setSelectedPeptide] = useState<any>(null);

  const filteredPeptides = useMemo(() => {
    if (!searchQuery) return [];
    const query = searchQuery.toLowerCase();
    return PROTOCOLS.filter(p => 
      p.name.toLowerCase().includes(query) || 
      (p.tag && p.tag.toLowerCase().includes(query))
    ).slice(0, 10);
  }, [searchQuery]);

  useEffect(() => {
    if (mg > 0 && water > 0 && dose > 0) {
      // Formula: Units = (Dose / (Mg * 1000)) * (Water * 100)
      const res = (dose / (mg * 1000)) * (water * 100);
      setResult(Number(res.toFixed(1)));
    } else {
      setResult(0);
    }
  }, [mg, water, dose]);

  return (
    <div className="space-y-16 py-10">
      {setView && (
        <button 
          onClick={() => setView('home')}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-secondary/40 hover:text-accent transition-all group mb-4"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Voltar para a Home
        </button>
      )}

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic">
            CALCULADORA <span className="text-accent">PRIME</span>
          </h2>
          <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.3em]">Cálculo algorítmico e reconstituição avançada</p>
        </div>
        <div className="flex gap-2">
          {SYRINGE_TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => setSyringeType(type)}
              className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border ${
                syringeType.id === type.id 
                  ? 'bg-accent text-black border-accent' 
                  : 'bg-white/5 text-white/40 border-white/5 hover:bg-white/10'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 relative z-50">
        <label className="flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-[0.2em] pl-2">
          <Search size={12} className="text-accent" />
          Conectar Peptídeo do Banco de Dados
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Ex: BPC-157, Semaglutida, GHK-Cu..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (e.target.value === '') setSelectedPeptide(null);
            }}
            className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-sm font-medium text-white focus:border-accent/40 outline-none transition-all placeholder:text-white/20"
          />
          {filteredPeptides.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] max-h-[300px] overflow-y-auto">
              {filteredPeptides.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedPeptide(p);
                    setSearchQuery(p.name);
                    
                    // Simple heuristic to extract dose if available
                    const doseMatch = p.dosage?.match(/(\d+)\s*(mcg|mg)/i);
                    if (doseMatch) {
                      let parsedAmount = parseInt(doseMatch[1], 10);
                      if (doseMatch[2].toLowerCase() === 'mg') parsedAmount *= 1000;
                      if (!isNaN(parsedAmount) && parsedAmount > 0 && parsedAmount <= 10000) {
                        setDose(parsedAmount);
                      }
                    }
                  }}
                  className="w-full text-left p-4 hover:bg-white/5 border-b border-white/5 last:border-0 transition-colors flex justify-between items-center group"
                >
                  <div>
                    <div className="text-sm font-bold text-white group-hover:text-accent transition-colors">{p.name}</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-widest mt-1">{p.tag}</div>
                  </div>
                  <ArrowUpRight size={14} className="text-white/20 group-hover:text-accent" />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {selectedPeptide && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-6 rounded-2xl bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 flex flex-col md:flex-row gap-6 items-start"
          >
            <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
               <img src={selectedPeptide.image} alt={selectedPeptide.name} className="w-full h-full object-cover" />
            </div>
            <div className="space-y-4 flex-1">
              <div>
                <h3 className="text-lg font-black text-white">{selectedPeptide.name}</h3>
                <p className="text-sm text-white/60 leading-relaxed mt-1">{selectedPeptide.description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {selectedPeptide.dosage && (
                    <div className="space-y-1">
                       <span className="text-[10px] font-bold text-accent uppercase tracking-widest flex items-center gap-1"><Target size={10} /> Dosagem Padrão</span>
                       <p className="text-xs text-white/80">{selectedPeptide.dosage}</p>
                    </div>
                 )}
                 {selectedPeptide.protocol && (
                    <div className="space-y-1">
                       <span className="text-[10px] font-bold text-accent uppercase tracking-widest flex items-center gap-1"><Clock size={10} /> Protocolo Geral</span>
                       <p className="text-xs text-white/80">{selectedPeptide.protocol}</p>
                    </div>
                 )}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-10">
          {/* Inputs Section */}
          <div className="glass-card p-8 rounded-[40px] border-white/5 bg-white/[0.01] space-y-8 shadow-2xl">
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-[0.2em] pl-2">
                  <Beaker size={12} className="text-accent" />
                  Quantidade do Peptídeo (mg)
                </label>
                <div className="space-y-4">
                  <div className="relative">
                    <input 
                      type="number" 
                      value={mg} 
                      onChange={(e) => setMg(Number(e.target.value))}
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-6 text-2xl font-black text-white focus:border-accent/40 outline-none transition-all"
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-bold text-white/20 uppercase tracking-widest">Milligrams</div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[5, 10, 15, 20, 40, 60, 90].map((val) => (
                      <button 
                        key={val}
                        onClick={() => setMg(val)}
                        className={`px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest transition-all ${
                          mg === val ? 'bg-accent text-black' : 'bg-white/5 text-white/40 hover:bg-white/10'
                        }`}
                      >
                        {val}mg
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-[0.2em] pl-2">
                  <Droplets size={12} className="text-accent" />
                  Volume de Água Bacteriostática (mL)
                </label>
                <div className="space-y-4">
                  <div className="relative">
                    <input 
                      type="number" 
                      value={water} 
                      onChange={(e) => setWater(Number(e.target.value))}
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-6 text-2xl font-black text-white focus:border-accent/40 outline-none transition-all"
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-bold text-white/20 uppercase tracking-widest">Milliliters</div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3].map((val) => (
                      <button 
                        key={val}
                        onClick={() => setWater(val)}
                        className={`px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest transition-all ${
                          water === val ? 'bg-accent text-black' : 'bg-white/5 text-white/40 hover:bg-white/10'
                        }`}
                      >
                        {val}ml
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-[0.2em] pl-2">
                  <Target size={12} className="text-accent" />
                  Dose Desejada (mcg)
                </label>
                <div className="space-y-4">
                  <div className="relative">
                    <input 
                      type="number" 
                      value={dose} 
                      step={50}
                      onChange={(e) => setDose(Number(e.target.value))}
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-6 text-2xl font-black text-white focus:border-accent/40 outline-none transition-all"
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-bold text-white/20 uppercase tracking-widest">Micrograms</div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[100, 250, 500, 1000, 2000, 5000].map((val) => (
                      <button 
                        key={val}
                        onClick={() => setDose(val)}
                        className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${
                          dose === val ? 'bg-accent text-black' : 'bg-white/5 text-white/40 hover:bg-white/10'
                        }`}
                      >
                        {val >= 1000 ? `${val/1000}mg` : `${val}mcg`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 p-6 bg-accent/[0.02] border border-white/5 rounded-3xl">
            <Info size={16} className="text-accent shrink-0" />
            <p className="text-[10px] text-white/40 font-bold uppercase leading-relaxed tracking-wider">
              A fórmula utilizada é: (Dose Desejada / (Mg Peptídeo * 1000)) * (Volume Água * 100).
              Sempre verifique a graduação da sua seringa antes da aplicação. O visual acima é meramente ilustrativo para facilitar a compreensão da dose.
            </p>
          </div>
        </div>

        {/* Results Section */}
        <div className="relative flex flex-col items-center justify-center">
          <div className="absolute inset-0 bg-accent/5 rounded-[64px] blur-[120px] pointer-events-none" />
          
          <div className="relative w-full glass-card p-12 rounded-[56px] border-white/10 shadow-2xl text-center space-y-10 bg-black/40 backdrop-blur-3xl overflow-hidden min-h-[600px] flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-[40px] rounded-full -mr-10 -mt-10" />
            
            <div className="space-y-4 relative z-10">
              <span className="text-white/30 text-[10px] font-black uppercase tracking-[0.5em]">Puxe até a marcação</span>
              <div className="flex items-center justify-center gap-4">
                 <motion.div 
                  key={result}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-8xl font-black text-white tracking-tighter drop-shadow-[0_0_30px_rgba(45,212,191,0.4)]"
                 >
                  {result}
                 </motion.div>
                 <div className="text-left">
                    <div className="text-[14px] font-black text-accent uppercase tracking-widest">Unidades</div>
                    <div className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">Marcar na Seringa</div>
                 </div>
              </div>
            </div>

            <div className="py-12 border-y border-white/5 relative bg-white/[0.01] -mx-12 px-12">
               <SyringeVisual units={result} type={syringeType} />
               <div className="mt-8 flex justify-center gap-8">
                  <div className="text-center">
                    <div className="text-[11px] font-black text-white/60 uppercase">{result} UI</div>
                    <div className="text-[8px] font-bold text-white/20 uppercase tracking-widest mt-1">Dose Total</div>
                  </div>
                  <div className="w-[1px] h-8 bg-white/5" />
                  <div className="text-center">
                    <div className="text-[11px] font-black text-white/60 uppercase">{(result / 100).toFixed(2)} mL</div>
                    <div className="text-[8px] font-bold text-white/20 uppercase tracking-widest mt-1">Volume Líquido</div>
                  </div>
               </div>
            </div>

            <div className="pt-6">
              <button 
                onClick={() => window.print()}
                className="group w-full py-6 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black text-white uppercase tracking-[0.4em] hover:bg-accent hover:text-black hover:border-accent transition-all duration-500 flex items-center justify-center gap-4"
              >
                Imprimir Relatório <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
            
            <p className="text-[8px] font-bold text-white/10 uppercase tracking-widest pt-4">Calculadora Validada pela Equipe Peptium</p>
          </div>
        </div>
      </div>
    </div>
  );
}
