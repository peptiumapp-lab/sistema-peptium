import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Zap, Activity, AlertTriangle, ShieldCheck as Shield, Pill, Clock, Info, ArrowUpRight, Activity as ActivityIcon, Microscope, Target, Droplets, BookOpen, Fingerprint } from 'lucide-react';
import { PeptideDossier } from '../../types';

interface PeptideDetailModalProps {
  peptide: PeptideDossier | null;
  onClose: () => void;
}

export default function PeptideDetailModal({ peptide, onClose }: PeptideDetailModalProps) {
  if (!peptide) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#020617]/90 backdrop-blur-xl"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 40 }}
        className="relative w-full max-w-5xl max-h-[90vh] bg-slate-950 border border-white/10 rounded-[40px] md:rounded-[56px] shadow-2xl overflow-y-auto lg:overflow-hidden flex flex-col lg:flex-row"
      >
        {/* Left Side - Core Identity */}
        <div className="w-full lg:w-2/5 relative min-h-[400px] lg:h-auto lg:overflow-y-auto scrollbar-hide bg-black shrink-0 flex flex-col">
          <div className="absolute inset-0">
             <img src={peptide.image} className="w-full h-full object-cover grayscale opacity-40 mix-blend-screen" alt={peptide.name} />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent lg:bg-gradient-to-r lg:from-black lg:via-black/90 lg:to-black/20" />
          </div>
          
          <div className="relative z-10 p-8 md:p-10 pb-12 lg:pb-10 pt-40 lg:pt-10 flex-grow flex flex-col justify-end">
            <span className="px-4 py-2 bg-accent/20 border border-accent/20 rounded-full text-[9px] font-black text-accent uppercase tracking-[0.2em] backdrop-blur-md mb-6 w-fit flex items-center gap-2">
              <Fingerprint size={12} />
              {peptide.category} | {peptide.class} 
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-tight mb-4 drop-shadow-2xl break-words" style={{ wordBreak: 'break-word' }}>
              {peptide.name}
            </h2>
            {peptide.synonyms && peptide.synonyms.length > 0 && (
              <p className="text-xs text-white/40 uppercase tracking-widest font-bold mb-6">
                Sinônimos: {peptide.synonyms.join(' • ')}
              </p>
            )}
            
            <div className="flex items-center gap-1 text-accent mb-6">
              {[...Array(5)].map((_, i) => <Shield key={i} size={12} fill="currentColor" />)}
              <span className="text-[10px] font-black uppercase tracking-widest ml-2 text-white/80">Prime Excellence Code: {peptide.id}</span>
            </div>

            <p className="text-sm font-medium text-white/50 leading-relaxed italic">
              {peptide.detailedNarrative || peptide.description}
            </p>
          </div>

          <button 
            onClick={onClose}
            className="absolute top-8 left-8 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all z-20"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* Right Side - Scientific & Protocol Details */}
        <div className="flex-1 lg:overflow-y-auto p-8 md:p-10 lg:p-14 space-y-12 scrollbar-hide bg-slate-950/50 backdrop-blur-3xl relative">
          
          {/* Mechanism of Action */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-accent border-b border-white/5 pb-4">
              <Target size={20} />
              <h4 className="text-[14px] font-black uppercase tracking-[0.3em]">Mecanismo de Ação (MOA)</h4>
            </div>
            <ul className="space-y-4">
               {peptide.mechanismOfAction?.map((moa, i) => (
                  <li key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                     <span className="text-accent font-black text-xs uppercase opacity-50 mt-0.5">0{i+1}</span>
                     <p className="text-xs font-bold text-white/80 leading-relaxed tracking-wide">{moa}</p>
                  </li>
               ))}
               {(!peptide.mechanismOfAction || peptide.mechanismOfAction.length === 0) && (
                  <p className="text-sm font-bold text-white/40">{peptide.mechanism || 'N/A'}</p>
               )}
            </ul>
          </div>

          {/* Dosagem VIP */}
          <div className="space-y-6">
             <div className="flex items-center gap-3 text-accent border-b border-white/5 pb-4">
              <Pill size={20} />
              <h4 className="text-[14px] font-black uppercase tracking-[0.3em]">Protocolo de Dosagem VIP</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="p-6 bg-accent/[0.03] border border-accent/20 rounded-3xl space-y-2">
                 <span className="text-[9px] font-black text-accent/60 uppercase tracking-widest flex items-center gap-2"><Clock size={10}/> Standard</span>
                 <p className="text-sm font-black text-white">{peptide.dosageProtocol?.standard || peptide.dosage || 'N/A'}</p>
               </div>
               <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl space-y-2">
                 <span className="text-[9px] font-black text-white/40 uppercase tracking-widest flex items-center gap-2"><Droplets size={10}/> Reconstituição</span>
                 <p className="text-sm font-black text-white/80">{peptide.dosageProtocol?.reconstitution || 'Reconstituir com Água Bacteriostática'}</p>
               </div>
               {peptide.dosageProtocol?.titration && peptide.dosageProtocol.titration.length > 0 && (
                 <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl space-y-4 col-span-1 md:col-span-2">
                   <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Plano de Titulação</span>
                   <div className="flex flex-col gap-2">
                      {peptide.dosageProtocol.titration.map((tit, i) => (
                        <div key={i} className="flex items-center gap-3 text-xs font-bold text-white/70">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent/50" />
                          {tit}
                        </div>
                      ))}
                   </div>
                 </div>
               )}
            </div>
          </div>

          {/* Farmacologia Avançada */}
          <div className="space-y-6">
             <div className="flex items-center gap-3 text-emerald-400 border-b border-white/5 pb-4">
              <ActivityIcon size={20} />
              <h4 className="text-[14px] font-black uppercase tracking-[0.3em] text-white">Farmacologia Avançada</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
               <div className="p-5 border border-white/5 bg-white/[0.01] rounded-2xl">
                 <div className="text-[8px] text-white/40 uppercase tracking-widest mb-1">Meia-Vida</div>
                 <div className="text-sm font-black text-white">{peptide.pharmacologyAndPharmacokinetics?.halfLife || peptide.halfLife || 'N/A'}</div>
               </div>
               <div className="p-5 border border-white/5 bg-white/[0.01] rounded-2xl">
                 <div className="text-[8px] text-white/40 uppercase tracking-widest mb-1">Biodisponibilidade</div>
                 <div className="text-sm font-black text-white">{peptide.pharmacologyAndPharmacokinetics?.bioavailability || peptide.bioavailability || 'Alta via SC'}</div>
               </div>
               <div className="p-5 border border-white/5 bg-white/[0.01] rounded-2xl">
                 <div className="text-[8px] text-white/40 uppercase tracking-widest mb-1">Via Sugerida</div>
                 <div className="text-sm font-black text-white">{peptide.administrationWay || peptide.administration || 'N/A'}</div>
               </div>
            </div>
            {peptide.pharmacologyAndPharmacokinetics?.metabolism && (
               <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl">
                 <div className="text-[9px] text-white/40 uppercase tracking-widest mb-1">Metabolismo Neural/Hepático</div>
                 <div className="text-xs text-white/70 font-medium">{peptide.pharmacologyAndPharmacokinetics.metabolism}</div>
               </div>
            )}
          </div>

          {/* Evidence Matrix */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-accent border-b border-white/5 pb-4">
               <ShieldCheck size={20} />
               <h4 className="text-[14px] font-black text-white uppercase tracking-[0.3em]">Evidence Matrix</h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {[
                 { label: 'Humanos', score: peptide.evidenceMatrix?.humanStudies || 4 },
                 { label: 'Animais', score: peptide.evidenceMatrix?.animalStudies || 5 },
                 { label: 'Segurança', score: peptide.evidenceMatrix?.safetyScore || 5 },
                 { label: 'Eficácia', score: peptide.evidenceMatrix?.efficacyScore || 5 },
               ].map((metric, i) => (
                 <div key={i} className="flex flex-col items-center justify-center p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-2">
                   <div className="text-2xl font-black text-accent">{metric.score}<span className="text-sm text-white/20">/5</span></div>
                   <div className="text-[8px] font-black text-white/50 uppercase tracking-widest">{metric.label}</div>
                 </div>
               ))}
            </div>
            {peptide.pmids && peptide.pmids.length > 0 && (
              <div className="mt-4 p-4 rounded-xl border border-white/5 flex items-start gap-4">
                 <BookOpen size={16} className="text-white/20 shrink-0" />
                 <div>
                    <h5 className="text-[9px] font-black text-white/50 uppercase tracking-widest mb-2">PubMed Tracking IDs (PMID)</h5>
                    <div className="flex flex-wrap gap-2">
                       {peptide.pmids.map((pmid, i) => (
                         <a href={`https://pubmed.ncbi.nlm.nih.gov/${pmid}`} target="_blank" rel="noopener noreferrer" key={i} className="px-2 py-1 bg-white/5 hover:bg-white/10 transition-colors rounded text-[10px] font-mono text-white/80">
                           {pmid !== '00000000' && pmid !== '' ? pmid : 'Dados Internos'}
                         </a>
                       ))}
                    </div>
                 </div>
              </div>
            )}
          </div>

          {/* Benefícios Clínicos & Tags */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 border-b border-white/5 pb-2">Benefícios Observados</h4>
            <div className="flex flex-wrap gap-2">
              {(peptide.clinicalBenefits?.length ? peptide.clinicalBenefits : peptide.features).map((f, i) => (
                <div key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black text-white/60 uppercase tracking-widest">
                  {f}
                </div>
              ))}
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
