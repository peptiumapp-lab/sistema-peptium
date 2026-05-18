import React from 'react';
import { motion } from 'motion/react';
import { Printer, Download, Search, ChevronRight, FileText, ExternalLink, ShieldCheck, Zap, Beaker, ArrowLeft, ShieldAlert } from 'lucide-react';
import { PROTOCOLS } from '../constants';
import { getReconstitutionAlert } from '../lib/reconstitutionUtils';

interface DossierProps {
  setView?: (view: any) => void;
}

export default function Dossier({ setView }: DossierProps) {
  const handlePrint = () => {
    window.print();
  };

  const protocolsWithAlerts = PROTOCOLS.map(p => ({
    ...p,
    reconstitutionAlert: getReconstitutionAlert(p.id, p.name)
  }));

  return (
    <div className="space-y-8 pb-20">
      {/* Header - Hidden on Print */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 print:hidden">
        <div className="space-y-4">
          {setView && (
            <button 
              onClick={() => setView('home')}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-secondary/40 hover:text-accent transition-all group mb-2"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Voltar para a Home
            </button>
          )}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full">
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
            <span className="text-[9px] font-black text-accent uppercase tracking-[0.4em]">Confidential Sci. Edition</span>
          </div>
          <h1 className="text-4xl font-sans font-black text-white tracking-tighter uppercase italic italic">
            DOSSIÊ <span className="text-accent underline decoration-2 underline-offset-8">MOLECULAR</span>
          </h1>
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">
            Inteligência Farmacodinâmica e Protocolos de Elite V1.0
          </p>
        </div>
      </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-6 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all"
          >
            <Printer size={16} />
            Imprimir / Exportar PDF
          </button>
        </div>
      </div>

      {/* Dossier Content - Styled for Print and Web */}
      <div className="print:bg-white print:text-black print:p-0 font-sans">
        <div className="bg-[#0A0A0A] border border-white/5 rounded-[40px] overflow-hidden print:border-none print:bg-transparent">
          
          {/* Cover Page (Only Visible on Print) */}
          <div className="hidden print:flex flex-col items-center justify-center min-h-[1050px] p-20 text-center space-y-10 border-b-2 border-gray-100">
            <div className="text-[12px] font-black tracking-[0.8em] uppercase mb-20 text-gray-400">Referência Médica Absoluta</div>
            <div className="space-y-4">
              <h1 className="text-[100px] font-black tracking-tighter leading-none text-black">PEPTIUM PRIME</h1>
              <h2 className="text-4xl italic font-serif text-gray-800">Dossiê Molecular</h2>
            </div>
            <div className="w-32 h-1 bg-gray-200 mx-auto !my-12" />
            <div className="text-lg font-bold tracking-[0.3em] uppercase pt-10 text-gray-500">Volume I — Registro Técnico</div>
            <p className="max-w-2xl text-xs leading-relaxed uppercase tracking-[0.2em] text-gray-400 line-clamp-3">
               INTELIGÊNCIA FARMACODINÂMICA, PROTOCOLOS DE ELITE E EVIDÊNCIAS CIENTÍFICAS DE VANGUARDA COMPENDIADOS PARA PRESCRIPTORES DE ALTA PERFORMANCE.
            </p>
            <div className="absolute bottom-20 left-0 right-0 flex justify-between w-full px-20 text-[8px] font-black uppercase tracking-widest text-gray-300">
               <span>PEPTIUM PRIME // VOLUME I</span>
               <span>REGISTRO CLÍNICO</span>
               <span>CONFIDENTIAL SCI. EDITION</span>
            </div>
          </div>

          {/* Catalog of Peptides */}
          {protocolsWithAlerts.map((peptide, index) => (
            <div key={peptide.id} className="p-8 md:p-12 border-b border-white/5 last:border-0 print:break-before-page print:min-h-screen print:bg-white print:text-black print:border-gray-200">
              <div className="max-w-6xl mx-auto space-y-8">
                
                {/* ID & Category Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4 print:border-gray-100">
                   <div className="flex items-center gap-4 text-accent print:text-gray-500">
                      <span className="text-[9px] font-black uppercase tracking-[0.3em] px-2 py-0.5 bg-accent/5 border border-accent/20 rounded-full print:border-gray-200">
                         {peptide.tag}
                      </span>
                      <span className="text-[9px] font-bold text-white/30 print:text-gray-300">REG: #00{index + 1}</span>
                   </div>
                   <div className="text-[8px] font-black text-white/20 uppercase tracking-widest print:text-gray-300 italic">Molecular Intelligence Registry — PEPTIUM PRIME Official</div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  
                  {/* Left: Identity & Key Metrics (Dense Header) */}
                  <div className="lg:col-span-12 flex flex-col md:flex-row gap-8 items-start pb-8 border-b border-white/5 print:border-gray-100">
                    <div className="w-32 h-32 shrink-0 rounded-2xl overflow-hidden border border-white/10 print:border-gray-100 bg-accent/5">
                      <img src={peptide.image} alt={peptide.name} className="w-full h-full object-cover grayscale opacity-60 contrast-125" />
                    </div>
                    <div className="flex-grow space-y-4">
                       <h2 className="text-4xl md:text-5xl font-sans font-black text-white tracking-tighter uppercase italic print:text-black leading-none">
                          {peptide.name}
                       </h2>
                       {peptide.insight && (
                         <p className="text-sm font-bold text-accent print:text-gray-600 uppercase tracking-tight italic">
                            {peptide.insight}
                         </p>
                       )}
                       {peptide.clinicalBenefitsCategorized && (
                         <div className="space-y-4 pt-4 border-t border-white/5 print:border-gray-100">
                           {Object.entries(peptide.clinicalBenefitsCategorized).map(([category, benefits]) => (
                             <div key={category} className="space-y-3">
                               <div className="text-[10px] font-black text-accent uppercase tracking-[0.4em] print:text-black">
                                 {category}
                               </div>
                               <div className="flex flex-wrap gap-2">
                                 {benefits.map((benefit, bIdx) => (
                                   <span key={bIdx} className="px-3 py-1 bg-accent/20 border border-accent/30 rounded-lg text-[9px] font-black text-white print:text-black uppercase tracking-tighter">
                                     {benefit}
                                   </span>
                                 ))}
                               </div>
                             </div>
                           ))}
                         </div>
                       )}
                       <div className="flex flex-wrap gap-x-8 gap-y-4 pt-6">
                          <div className="space-y-0.5">
                             <div className="text-[7px] font-black text-white/20 uppercase tracking-tighter print:text-gray-400 leading-none">Alvo Molecular</div>
                             <div className="text-[10px] font-black text-white print:text-black uppercase leading-none">{peptide.molecularTarget || 'Geral'}</div>
                          </div>
                          <div className="space-y-0.5">
                             <div className="text-[7px] font-black text-white/20 uppercase tracking-tighter print:text-gray-400 leading-none">Meia-Vida</div>
                             <div className="text-[10px] font-black text-white print:text-black uppercase leading-none">{peptide.halfLife || 'N/A'}</div>
                          </div>
                          <div className="space-y-0.5">
                             <div className="text-[7px] font-black text-white/20 uppercase tracking-tighter print:text-gray-400 leading-none">Biodisponibilidade</div>
                             <div className="text-[10px] font-black text-white print:text-black uppercase leading-none">{peptide.bioavailability || 'Alta'}</div>
                          </div>
                          <div className="space-y-0.5">
                             <div className="text-[7px] font-black text-white/20 uppercase tracking-tighter print:text-gray-400 leading-none">Evidência</div>
                             <div className="text-[10px] font-black text-white print:text-black uppercase leading-none">{peptide.evidenceLevel || 'Translacional'}</div>
                             <button 
                               onClick={() => window.open(`https://www.openevidence.com/search?q=${encodeURIComponent(peptide.name)}`, '_blank')}
                               className="inline-flex items-center gap-1.5 text-accent hover:text-white transition-colors print:hidden"
                             >
                               <Search size={10} />
                               <span className="text-[8px] font-black uppercase tracking-widest">OpenEvidence</span>
                             </button>
                          </div>
                       </div>
                    </div>
                  </div>

                  {/* Column 1: Science & Mechanism */}
                  <div className="lg:col-span-4 space-y-8">
                    <div className="space-y-3">
                      <h4 className="text-[9px] font-black text-accent uppercase tracking-[0.4em] print:text-black border-l-2 border-accent pl-2">
                         I. Mecânica Molecular
                      </h4>
                      <p className="text-[10px] text-white/60 leading-relaxed print:text-gray-800 text-justify">
                         {peptide.mechanism || 'Descrição técnica pendente de validação clínica.'}
                      </p>
                    </div>

                    {peptide.clinicalEfficacy && (
                      <div className="space-y-3">
                        <h4 className="text-[9px] font-black text-accent uppercase tracking-[0.4em] print:text-black border-l-2 border-accent pl-2">
                           II. Eficácia Clínica
                        </h4>
                        <ul className="space-y-2">
                           {peptide.clinicalEfficacy.map((item, i) => (
                             <li key={i} className="flex gap-2 text-[9px] font-bold text-white/70 print:text-gray-700 leading-tight uppercase">
                                <ShieldCheck size={10} className="text-accent shrink-0 mt-0.5" /> {item}
                             </li>
                           ))}
                        </ul>
                      </div>
                    )}

                    <div className="space-y-3">
                      <h4 className="text-[9px] font-black text-accent uppercase tracking-[0.4em] print:text-black border-l-2 border-accent pl-2">
                         III. Status Regulatório
                      </h4>
                      <div className="grid grid-cols-3 gap-2">
                         <div className="bg-white/5 p-1.5 rounded-lg border border-white/5 print:bg-gray-50 print:border-gray-100">
                            <div className="text-[6px] font-black text-white/20 uppercase print:text-gray-400">FDA</div>
                            <div className="text-[8px] font-black text-white print:text-black truncate">{peptide.regulatoryStatus?.fda || 'N/A'}</div>
                         </div>
                         <div className="bg-white/5 p-1.5 rounded-lg border border-white/5 print:bg-gray-50 print:border-gray-100">
                            <div className="text-[6px] font-black text-white/20 uppercase print:text-gray-400">ANVISA</div>
                            <div className="text-[8px] font-black text-white print:text-black truncate">{peptide.regulatoryStatus?.anvisa || 'N/A'}</div>
                         </div>
                         <div className="bg-white/5 p-1.5 rounded-lg border border-white/5 print:bg-gray-50 print:border-gray-100">
                            <div className="text-[6px] font-black text-white/20 uppercase print:text-gray-400">EMA</div>
                            <div className="text-[8px] font-black text-white print:text-black truncate">{peptide.regulatoryStatus?.ema || 'N/A'}</div>
                         </div>
                      </div>
                    </div>
                  </div>

                  {/* Column 2: Prescribing Guidelines & Safety */}
                  <div className="lg:col-span-4 space-y-8">
                    <div className="space-y-3 bg-accent/5 p-4 rounded-2xl border border-accent/10 print:bg-gray-50 print:border-gray-200">
                      <h4 className="text-[9px] font-black text-accent uppercase tracking-[0.4em] print:text-black">IV. Diretrizes de Uso</h4>
                      <div className="space-y-3">
                         <div>
                            <span className="text-[7px] font-black text-white/30 uppercase tracking-[0.2em]">Dosagem Ativa</span>
                            <div className="text-xl font-black text-white print:text-black tracking-tight">{peptide.dosage || 'Individual'}</div>
                         </div>
                         <div className="text-[10px] font-medium text-white/60 print:text-gray-600 leading-relaxed italic">
                            {peptide.protocol || 'Protocolo técnico indisponível no banco de dados principal.'}
                         </div>
                      </div>
                    </div>

                    {peptide.reconstitutionAlert && (
                      <div className="space-y-3 bg-amber-500/5 p-4 rounded-2xl border border-amber-500/20 print:bg-amber-50 print:border-amber-200">
                        <div className="flex items-center gap-2 text-amber-500">
                          <ShieldAlert size={16} />
                          <h4 className="text-[9px] font-black uppercase tracking-[0.4em]">Informação Crítica de Reconstituição</h4>
                        </div>
                        <div className="space-y-2">
                           <div>
                              <span className="text-[7px] font-black text-amber-500/50 uppercase tracking-[0.2em]">Diluente Obrigatório</span>
                              <div className="text-[10px] font-black text-amber-100 print:text-black uppercase">{peptide.reconstitutionAlert.diluent}</div>
                           </div>
                           <div>
                              <span className="text-[7px] font-black text-amber-500/50 uppercase tracking-[0.2em]">Instruções</span>
                              <div className="text-[10px] font-medium text-amber-100/80 print:text-gray-800 leading-tight">{peptide.reconstitutionAlert.instruction}</div>
                           </div>
                           <div className="text-[9px] font-medium text-amber-500/60 italic leading-tight pt-1">
                              {peptide.reconstitutionAlert.reason}
                           </div>
                        </div>
                      </div>
                    )}

                    {(peptide.sideEffects && peptide.sideEffects.length > 0) && (
                      <div className="space-y-3">
                        <h4 className="text-[9px] font-black text-yellow-500 uppercase tracking-[0.4em] print:text-black border-l-2 border-yellow-500 pl-2">
                           V. Colaterais & Mitigação
                        </h4>
                        <div className="space-y-2">
                           {peptide.sideEffects.map((se, i) => (
                             <div key={i} className="text-[9px] print:text-gray-800">
                                <span className="font-black text-white print:text-black uppercase tracking-tight">{se.effect}:</span>
                                <span className="text-white/50 print:text-gray-500 ml-1 italic leading-tight">{se.mitigation}</span>
                             </div>
                           ))}
                        </div>
                      </div>
                    )}

                    {peptide.reconstitutionAlert && (
                      <div className="space-y-3 bg-amber-500/5 p-4 rounded-2xl border border-amber-500/20 print:bg-amber-50 print:border-amber-200">
                        <div className="flex items-center gap-2 text-amber-500">
                          <ShieldAlert size={16} />
                          <h4 className="text-[9px] font-black uppercase tracking-[0.4em]">Informação Crítica de Reconstituição</h4>
                        </div>
                        <div className="space-y-2">
                           <div>
                              <span className="text-[7px] font-black text-amber-500/50 uppercase tracking-[0.2em]">Diluente Obrigatório</span>
                              <div className="text-[10px] font-black text-amber-100 print:text-black uppercase">{peptide.reconstitutionAlert.diluent}</div>
                           </div>
                           <div>
                              <span className="text-[7px] font-black text-amber-500/50 uppercase tracking-[0.2em]">Instruções</span>
                              <div className="text-[10px] font-medium text-amber-100/80 print:text-gray-800 leading-tight">{peptide.reconstitutionAlert.instruction}</div>
                           </div>
                           <div className="text-[9px] font-medium text-amber-500/60 italic leading-tight pt-1">
                              {peptide.reconstitutionAlert.reason}
                           </div>
                        </div>
                      </div>
                    )}

                    {(peptide.sideEffects && peptide.sideEffects.length > 0) && (
                      <div className="space-y-3">
                        <h4 className="text-[9px] font-black text-yellow-500 uppercase tracking-[0.4em] print:text-black border-l-2 border-yellow-500 pl-2">
                           V. Colaterais & Mitigação
                        </h4>
                        <div className="space-y-2">
                           {peptide.sideEffects.map((se, i) => (
                             <div key={i} className="text-[9px] print:text-gray-800">
                                <span className="font-black text-white print:text-black uppercase tracking-tight">{se.effect}:</span>
                                <span className="text-white/50 print:text-gray-500 ml-1 italic leading-tight">{se.mitigation}</span>
                             </div>
                           ))}
                        </div>
                      </div>
                    )}

                    {(peptide.interactions && peptide.interactions.length > 0) && (
                      <div className="space-y-3">
                        <h4 className="text-[9px] font-black text-red-500 uppercase tracking-[0.4em] print:text-black border-l-2 border-red-500 pl-2">
                           VI. Interações Críticas
                        </h4>
                        <div className="space-y-3">
                           {peptide.interactions.map((int, i) => (
                             <div key={i} className="p-2 rounded-lg bg-red-500/5 border border-red-500/20 print:bg-red-50 print:border-red-100">
                                <div className="flex justify-between items-center mb-1">
                                   <span className="text-[8px] font-black text-white print:text-black uppercase">{int.substance}</span>
                                   <span className={`text-[6px] font-black px-1.5 py-0.5 rounded uppercase ${
                                     int.risk === 'high' ? 'bg-red-500 text-white' : 'bg-yellow-500 text-black'
                                   }`}>{int.risk}</span>
                                </div>
                                <div className="text-[8px] text-white/40 print:text-gray-500 italic leading-tight">{int.warning}</div>
                             </div>
                           ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Column 3: Synergies & Research */}
                  <div className="lg:col-span-4 space-y-8">
                    {(peptide.synergies && peptide.synergies.length > 0) && (
                      <div className="space-y-3">
                        <h4 className="text-[9px] font-black text-accent uppercase tracking-[0.4em] print:text-black border-l-2 border-accent pl-2">
                           VII. Sinergias de Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                           {peptide.synergies.map((syn, i) => (
                             <span key={i} className="px-2 py-1 bg-white/5 border border-white/5 rounded-md text-[8px] font-black text-white/60 uppercase print:bg-gray-100 print:text-gray-600">
                                {syn}
                             </span>
                           ))}
                        </div>
                      </div>
                    )}

                    {peptide.researchLinks && (
                      <div className="space-y-3 h-full">
                        <h4 className="text-[9px] font-black text-accent uppercase tracking-[0.4em] print:text-black border-l-2 border-accent pl-2">
                           VIII. Publicações Científicas
                        </h4>
                        <div className="space-y-4">
                           {peptide.researchLinks.map((link, i) => (
                             <div key={i} className="space-y-1">
                                <div className="flex items-start gap-2">
                                   <ExternalLink size={10} className="text-accent shrink-0 mt-0.5" />
                                   <div className="text-[9px] font-black text-white/80 uppercase tracking-tight leading-tight print:text-gray-900 line-clamp-2">{link.title}</div>
                                </div>
                                {link.pmid && (
                                  <div className="text-[7px] font-black text-white/20 print:text-gray-400 pl-4 uppercase">PMID: {link.pmid}</div>
                                )}
                             </div>
                           ))}
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Print Info Footer */}
      <div className="hidden print:block text-center pt-20 text-[10px] font-black text-gray-400 uppercase tracking-[0.5em]">
        © 2026 PEPTIUM PRIME GROUP — CONFIDENTIAL MOLECULAR DOSSIER
      </div>
    </div>
  );
}
