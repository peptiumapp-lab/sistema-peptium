import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, deleteDoc, doc, orderBy } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Sparkles, Brain, Clock, AlertTriangle, Play, ChevronRight, Activity, Calendar, Trash2, Code2, CheckCircle2, ChevronLeft, ShieldAlert } from 'lucide-react';
import type { View } from '../App';


interface CofreAtlasProps {
  setView?: (view: View) => void;
}
export default function CofreAtlas({ setView }: CofreAtlasProps) {
  const { user } = useAuth();
  const [protocols, setProtocols] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProtocol, setSelectedProtocol] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchProtocols = async () => {
      try {
        const q = query(
          collection(db, 'protocols'), 
          where('userId', '==', user.uid),
          // orderBy('createdAt', 'desc') // we'd need index for orderBy often, but since client filters are fine let's just get them
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as any[];
        
        // sort by date descending clientside to avoid index requirements
        data.sort((a, b) => {
           const timeA = a.createdAt ? a.createdAt.toMillis() : 0;
           const timeB = b.createdAt ? b.createdAt.toMillis() : 0;
           return timeB - timeA;
        });

        setProtocols(data);
      } catch (err: any) {
        setError(`Erro ao carregar protocolos: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProtocols();
  }, [user]);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Deseja realmente apagar este protocolo do cofre?')) return;

    try {
      await deleteDoc(doc(db, 'protocols', id));
      setProtocols(prev => prev.filter(p => p.id !== id));
      if (selectedProtocol?.id === id) {
        setSelectedProtocol(null);
      }
    } catch (err: any) {
      alert(`Erro ao apagar: ${err.message}`);
    }
  };

  if (!user) {
    return (
      <div className="py-24 px-4 text-center">
         <h2 className="text-2xl font-black text-white mb-4">Acesso Negado</h2>
         <p className="text-gray-400">Faça o login para visualizar seu Cofre Atlas.</p>
      </div>
    );
  }

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {selectedProtocol ? (
        <div className="space-y-6">
          <button 
            onClick={() => setSelectedProtocol(null)}
            className="flex items-center text-accent text-sm font-bold uppercase tracking-wider hover:text-white transition-colors"
          >
            <ChevronLeft size={16} /> Voltar para o Cofre
          </button>
          
          <ProtocolViewer protocol={selectedProtocol.data} />
        </div>
      ) : (
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none">
              Cofre <span className="text-accent">Atlas</span>
            </h2>
            <p className="text-white/50 text-xs md:text-sm max-w-2xl mx-auto font-medium leading-loose">
              Dossiês e protocolos estratégicos gerados pelo Atlas AI Builder, salvos com criptografia na sua conta.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
               <div className="w-8 h-8 border-4 border-accent border-r-transparent rounded-full animate-spin" />
            </div>
          ) : error ? (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm text-center">
              {error}
            </div>
          ) : protocols.length === 0 ? (
            <div className="text-center py-12 border border-white/15 bg-white/[0.02] rounded-3xl">
              <ShieldAlert className="w-12 h-12 text-white/60 mx-auto mb-4" />
              <p className="text-white/50 text-sm">Seu cofre está vazio.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {protocols.map(p => (
                 <div 
                   key={p.id} 
                   onClick={() => setSelectedProtocol(p)}
                   className="bg-[#0B0C10] border border-white/20 hover:border-accent/40 hover:bg-white/[0.02] p-6 rounded-2xl cursor-pointer transition-all flex flex-col group relative overflow-hidden"
                 >
                   <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-[50px]" />
                   <div className="flex justify-between items-start mb-4 relative z-10">
                     <h3 className="text-xl font-black text-white italic uppercase tracking-tighter line-clamp-2 pr-8">
                       {p.data.protocolName || 'Protocolo Sem Nome'}
                     </h3>
                     <button 
                       onClick={(e) => handleDelete(p.id, e)}
                       className="text-white/50 hover:text-red-500 transition-colors p-1"
                       title="Deletar protocolo"
                     >
                       <Trash2 size={16} />
                     </button>
                   </div>
                   
                   <p className="text-xs text-white/50 line-clamp-2 flex-grow relative z-10">
                     {p.data.physiologicalRationale}
                   </p>
                   
                   <div className="mt-6 flex items-center justify-between text-xs text-white/60 uppercase font-black tracking-wider relative z-10">
                     <span className="flex items-center gap-1">
                       <Clock size={12} /> {p.createdAt ? new Date(p.createdAt.toMillis()).toLocaleDateString('pt-BR') : 'Data desconhecida'}
                     </span>
                     <span className="text-accent flex items-center">
                       Visualizar <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                     </span>
                   </div>
                 </div>
               ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ProtocolViewer({ protocol: result }: { protocol: any }) {
  if (!result) return null;
  return (
    <div className="border border-white/20 rounded-[2.5rem] p-6 lg:p-10 relative bg-[#0B0C10] shadow-2xl overflow-hidden">
      {/* Copied from AiGenerator.tsx display area */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 space-y-12">
        <div className="text-center space-y-4">
          <h3 className="text-2xl md:text-4xl font-black text-white italic tracking-tighter uppercase mb-4 leading-tight">
            {result.protocolName}
          </h3>
        </div>

        <div className="border border-white/15 rounded-[1.5rem] p-6 lg:p-8 bg-white/[0.02]">
          <div className="flex items-center gap-2 text-accent text-xs font-black uppercase tracking-wider mb-6">
            <Sparkles size={16}/> Vantagens Diretas
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {(result.directAdvantages || []).map((adv: string, idx: number) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-accent shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-white/90 leading-tight">{adv}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 px-2">
          <div className="flex items-center gap-2 text-accent text-xs font-black uppercase tracking-wider">
            <Brain size={16} /> Racionalidade Fisiológica
          </div>
          <p className="text-sm text-white/80 leading-loose font-medium">
            {result.physiologicalRationale}
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-xl text-accent text-xs font-black uppercase tracking-wider">
            <Calendar size={14} /> Duração: {result.cycleDuration}
          </div>
        </div>

        <div className="space-y-6 pt-6">
           <div className="flex items-center gap-2 text-white text-sm font-black uppercase tracking-wider mb-6 border-b border-white/15 pb-4">
              <Activity className="text-accent" size={18}/> Matriz de Compostos Core
           </div>
           
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {(result.coreCompounds || []).map((comp: any, idx: number) => (
                 <div key={idx} className="p-6 rounded-[2rem] border border-white/20 bg-[#070707] flex flex-col hover:border-accent/20 transition-all">
                    <h4 className="text-xl font-black text-accent uppercase italic tracking-tighter mb-2">{comp.name}</h4>
                    <div className="inline-block border border-white/20 text-white/50 text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded mb-4 w-fit">
                       {comp.name.toLowerCase()}
                    </div>
                    <p className="text-xs text-white/70 mb-6 flex-grow">{comp.action}</p>
        
                    <div className="mt-auto border border-white/15 rounded-xl p-4 bg-white/[0.02] space-y-3">
                       <div className="flex justify-between items-center pb-3 border-b border-white/15">
                          <span className="text-xs uppercase tracking-wider text-white/60 font-bold">Dose Inicial</span>
                          <span className="text-xs font-bold text-white text-right ml-4">{comp.initialDose}</span>
                       </div>
                       <div className="flex justify-between items-center pb-3 border-b border-white/15">
                          <span className="text-xs uppercase tracking-wider text-white/60 font-bold">Dose Manutenção</span>
                          <span className="text-xs font-bold text-accent text-right ml-4">{comp.maintenanceDose}</span>
                       </div>
                       <div className="flex justify-between items-center pt-1">
                          <span className="text-xs uppercase tracking-wider text-white/60 font-bold flex items-center gap-1 shrink-0"><Clock size={12}/> Horário</span>
                          <span className="text-xs font-medium text-white/80 max-w-[200px] text-right">{comp.bestTime}</span>
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          <div className="space-y-4 px-2">
            <div className="flex items-center gap-2 text-fuchsia-400 text-xs font-black uppercase tracking-wider">
              <Code2 size={16} /> Sinergia Receptorial
            </div>
            <p className="text-xs md:text-sm text-white/60 leading-loose font-medium">
              {result.receptorSynergy}
            </p>
          </div>
          <div className="space-y-4 px-2">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-black uppercase tracking-wider">
              <Play size={16} /> Estruturação Tática
            </div>
            <p className="text-xs md:text-sm text-white/60 leading-loose font-medium">
              {result.structuralTactics}
            </p>
          </div>
        </div>

        <div className="space-y-6 pt-8">
           <div className="flex items-center gap-2 text-white text-sm font-black uppercase tracking-wider mb-6 border-b border-white/15 pb-4">
              <Shield className="text-orange-500" size={18}/> Matriz de Mitigação
           </div>
           
           <div className="space-y-4">
              {(result.mitigationMatrix || []).map((item: any, idx: number) => (
                 <div key={idx} className="flex flex-col md:flex-row items-start md:items-center p-5 rounded-xl border border-orange-500/20 bg-[#070707] gap-4">
                     <div className="md:w-1/3 lg:w-1/4 space-y-1">
                         <div className="text-xs md:text-xs font-black uppercase text-orange-500 tracking-wider">
                            Risco: {item.risk}
                         </div>
                     </div>
                     <div className="text-accent shrink-0 hidden md:flex items-center">
                         <ChevronRight size={16} className="-mr-2 text-accent/50"/>
                         <ChevronRight size={16} className="text-accent"/>
                     </div>
                     <div className="md:w-2/3 lg:w-3/4">
                         <p className="text-xs md:text-sm text-white/90 font-medium leading-loose">
                            {item.mitigation}
                         </p>
                     </div>
                 </div>
              ))}
           </div>
        </div>

        {result.applicationManual && (
           <div className="space-y-6 pt-8 border-t border-white/15 mt-8">
              <div className="flex items-center gap-2 text-white text-sm font-black uppercase tracking-wider mb-6 pb-4">
                 <AlertTriangle className="text-fuchsia-500" size={18}/> Manual Prático de Aplicação
              </div>
              
              <div className="bg-gradient-to-br from-fuchsia-900/20 to-[#070707] border border-fuchsia-500/20 rounded-2xl p-6 lg:p-8">
                 <p className="text-sm font-medium text-white/80 leading-loose whitespace-pre-line">
                    {result.applicationManual}
                 </p>
              </div>
           </div>
        )}
      </div>
    </div>
  );
}
