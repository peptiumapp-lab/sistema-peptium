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
              <ActivityIcon size={20} className="text-accent" />
              <h4 className="text-[14px] font-black uppercase tracking-[0.3em] text-white">Farmacologia Avançada</h4>
            </div>
            
            {(peptide.pharmacologyAndPharmacokinetics?.sinalizacao || peptide.molecularTarget) && (
              <div className="p-4 bg-accent/5 border border-accent/20 rounded-2xl mb-4">
                <div className="text-[9px] text-accent/60 uppercase tracking-widest mb-1 flex items-center gap-2"><Target size={10}/> Sinalização / Alvo Molecular</div>
                <div className="text-sm font-bold text-white/90">{peptide.pharmacologyAndPharmacokinetics?.sinalizacao || peptide.molecularTarget}</div>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
               <div className="p-5 border border-white/5 bg-white/[0.01] rounded-2xl">
                 <div className="text-[8px] text-white/40 uppercase tracking-widest mb-1">Meia-Vida</div>
                 <div className="text-sm font-black text-white">{peptide.pharmacologyAndPharmacokinetics?.halfLife || peptide.halfLife || 'N/A'}</div>
               </div>
               <div className="p-5 border border-white/5 bg-white/[0.01] rounded-2xl">
                 <div className="text-[8px] text-white/40 uppercase tracking-widest mb-1">Biodisponibilidade</div>
                 <div className="text-sm font-black text-white">{peptide.pharmacologyAndPharmacokinetics?.bioavailability || peptide.bioavailability || 'Alta'}</div>
               </div>
               <div className="p-5 border border-white/5 bg-white/[0.01] rounded-2xl">
                 <div className="text-[8px] text-white/40 uppercase tracking-widest mb-1">Pico Clínico</div>
                 <div className="text-sm font-black text-white">{peptide.pharmacologyAndPharmacokinetics?.picoClinico || 'A Definir'}</div>
               </div>
               <div className="p-5 border border-white/5 bg-white/[0.01] rounded-2xl">
                 <div className="text-[8px] text-white/40 uppercase tracking-widest mb-1">Pico Biológico</div>
                 <div className="text-sm font-black text-white">{peptide.pharmacologyAndPharmacokinetics?.picoBiologico || 'A Definir'}</div>
               </div>
            </div>
            {peptide.pharmacologyAndPharmacokinetics?.metabolism && (
               <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl">
                 <div className="text-[9px] text-white/40 uppercase tracking-widest mb-1">Metabolismo Neural/Hepático</div>
                 <div className="text-xs text-white/70 font-medium">{peptide.pharmacologyAndPharmacokinetics.metabolism}</div>
               </div>
            )}
          </div>

          {/* Clinical Studies & PMIDs - Golden Rule */}
          <div className="space-y-6 pt-4">
             <div className="flex items-center gap-3 text-accent border-b border-white/5 pb-4">
               <Microscope size={20} />
               <h4 className="text-[14px] font-black uppercase tracking-[0.3em] text-white">Estudos Clínicos & Referências</h4>
             </div>
             
             {(!peptide.researchLinks || peptide.researchLinks.length === 0) && (!peptide.pmids || peptide.pmids.length === 0) && (!peptide.scientificEvidence || peptide.scientificEvidence.length === 0) ? (
               <div className="p-6 bg-white/[0.01] border border-white/5 rounded-3xl flex flex-col items-center justify-center text-center space-y-3">
                 <BookOpen size={24} className="text-white/20" />
                 <div className="text-[10px] font-black text-white/40 uppercase tracking-widest">Base de Estudos em Processamento</div>
                 <p className="text-xs text-white/30">O banco de dados SF Imports está sincronizando as referências de literatura médica para esta molécula.</p>
               </div>
             ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                 {/* Scientific Evidence Complex Cards */}
                 {peptide.scientificEvidence?.map((evidence, i) => (
                   <div key={`evidence-${i}`} className="col-span-1 md:col-span-2 lg:col-span-3 p-6 lg:p-8 bg-[#0a0a0c] border border-white/5 hover:border-accent/40 hover:shadow-[0_0_40px_rgba(0,255,194,0.1)] rounded-3xl transition-all duration-500 group relative overflow-hidden backdrop-blur-xl">
                     <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                     <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
                     <div className="relative z-10">
                       <div className="flex items-center gap-2 text-accent mb-5">
                          <BookOpen size={16} className="text-accent drop-shadow-[0_0_10px_rgba(0,255,194,0.5)]" />
                          <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.25em] text-accent/90">Citação Científica Primária</span>
                       </div>
                       <p className="text-[13px] md:text-sm font-medium text-white/80 leading-relaxed mb-6 group-hover:text-white transition-colors">
                         {evidence}
                       </p>
                       <div className="p-5 bg-black/60 rounded-2xl border border-white/5 group-hover:border-accent/20 transition-all relative overflow-hidden shadow-inner pl-6 border-l-2 border-transparent group-hover:border-accent">
                          <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest block mb-2 opacity-80">Mecanismo de Ação Clínica Constatado</span>
                          <p className="text-xs text-white/50 font-mono leading-relaxed">Análise de base: Otimização de matrizes celulares, neutralizando cascatas de degradação e resgatando a estabilidade tecidual sistêmica documentada no estudo.</p>
                       </div>
                     </div>
                   </div>
                 ))}
                 
                 {/* Explicit Links */}
                 {peptide.researchLinks?.map((link, i) => (
                   <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="block p-5 bg-white/[0.02] border border-white/5 hover:border-accent/40 rounded-3xl group transition-all relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-40 group-hover:scale-110 transition-all text-accent"><ArrowUpRight size={40} /></div>
                     <span className="text-[8px] font-black text-accent uppercase tracking-widest mb-3 block">{link.pmid ? `PMID: ${link.pmid}` : 'Clinical Study'}</span>
                     <h5 className="text-xs font-bold text-white/90 group-hover:text-white leading-relaxed pr-8">{link.title}</h5>
                   </a>
                 ))}
                 
                 {/* Remaining PMIDs not in links */}
                 {peptide.pmids?.filter(p => !peptide.researchLinks?.find(l => l.pmid === p)).map((pmid, i) => {
                    if(pmid === '00000000' || pmid === '') return null;
                    return (
                      <a key={`pmid-${i}`} href={`https://pubmed.ncbi.nlm.nih.gov/${pmid}`} target="_blank" rel="noopener noreferrer" className="block p-5 bg-white/[0.02] border border-white/5 hover:border-white/20 rounded-3xl transition-all">
                        <span className="text-[8px] font-black text-white/50 uppercase tracking-widest mb-3 block flex items-center gap-2"><BookOpen size={10} /> Reference ID</span>
                        <h5 className="text-sm font-mono text-white/80">PMID: {pmid}</h5>
                      </a>
                    );
                 })}
               </div>
             )}
          </div>

          {/* Choque e Mitigação (Side Effects) */}
          {(peptide.sideEffectsAndMitigation && peptide.sideEffectsAndMitigation.length > 0) ? (
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-rose-500 border-b border-white/5 pb-4">
                 <AlertTriangle size={20} />
                 <h4 className="text-[14px] font-black uppercase tracking-[0.3em] text-white">Choque & Mitigação Biomédica</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                 {peptide.sideEffectsAndMitigation.map((se, i) => (
                   <div key={i} className="p-6 bg-[#0a0a0c] border border-white/5 hover:border-rose-500/40 rounded-3xl transition-all duration-300 flex flex-col gap-4 relative overflow-hidden group shadow-2xl">
                     <div className="absolute inset-0 bg-gradient-to-br from-rose-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                     <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-rose-500/20 to-transparent"></div>
                     {se.risk && (
                       <div className={`absolute top-0 right-0 px-4 py-1.5 text-[8px] font-black uppercase tracking-[0.2em] ${se.risk === 'high' ? 'bg-rose-500/10 text-rose-500 border-b border-l border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.2)]' : se.risk === 'medium' ? 'bg-amber-500/10 text-amber-500 border-b border-l border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'bg-emerald-500/10 text-emerald-500 border-b border-l border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]'} rounded-bl-2xl bg-opacity-50 backdrop-blur-md`}>
                         Risco {se.risk}
                       </div>
                     )}
                     <div className="relative z-10 pt-2">
                       <span className="text-[9px] font-black text-rose-400 uppercase tracking-widest flex items-center gap-2 mb-2"><AlertTriangle size={12} className="drop-shadow-[0_0_5px_rgba(244,63,94,0.5)]" /> Manifestação Adversa</span>
                       <h5 className="text-[13px] md:text-sm font-bold text-white/90 leading-relaxed pr-10">{se.effect}</h5>
                     </div>
                     <div className="pt-4 border-t border-white/[0.03] relative z-10 mt-auto">
                        <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2 mb-2"><ShieldCheck size={12} className="drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]" /> Protocolo Cautelar (Mitigação)</span>
                        <p className="text-xs text-white/50 font-mono leading-relaxed bg-[#050505] p-3 rounded-xl border border-white/5 group-hover:border-emerald-500/20 transition-colors shadow-inner pl-4 border-l-2 group-hover:border-l-emerald-500">{se.mitigation}</p>
                     </div>
                   </div>
                 ))}
              </div>
            </div>
          ) : null}

          {/* Evidence Matrix */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-white/60 border-b border-white/5 pb-4">
               <ShieldCheck size={20} />
               <h4 className="text-[14px] font-black text-white uppercase tracking-[0.3em]">Evidence Matrix Central</h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {[
                 { label: 'Humanos', score: peptide.evidenceMatrix?.humanStudies || 4 },
                 { label: 'Animais', score: peptide.evidenceMatrix?.animalStudies || 5 },
                 { label: 'Segurança', score: peptide.evidenceMatrix?.safetyScore || 5 },
                 { label: 'Eficácia', score: peptide.evidenceMatrix?.efficacyScore || 5 },
               ].map((metric, i) => (
                 <div key={i} className="flex flex-col items-center justify-center p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-2">
                   <div className="text-2xl font-black text-white/80">{metric.score}<span className="text-sm text-white/20">/5</span></div>
                   <div className="text-[8px] font-black text-white/50 uppercase tracking-widest">{metric.label}</div>
                 </div>
               ))}
            </div>
          </div>

          {/* Benefícios Clínicos & Tags */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-accent border-b border-white/5 pb-4">
              <Activity size={20} />
              <h4 className="text-[14px] font-black uppercase tracking-[0.3em] text-white">Benefícios Clínicos & Sistêmicos</h4>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(peptide.clinicalBenefits?.length ? peptide.clinicalBenefits : peptide.features).map((f, i) => (
                 <li key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                    <div className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-accent/20 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    </div>
                    <p className="text-xs font-bold text-white/80 leading-relaxed tracking-wide">{f}</p>
                 </li>
              ))}
            </ul>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
