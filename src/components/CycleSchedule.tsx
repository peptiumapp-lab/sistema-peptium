import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Activity, Zap, Play, CheckCircle2 } from 'lucide-react';

interface CycleScheduleProps {
  isStandalone?: boolean;
}

export default function CycleSchedule({ isStandalone }: CycleScheduleProps) {
  const [activeTab, setActiveTab] = useState<'timeline' | 'active'>('timeline');

  // Simple mock data for cycles
  const days = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    isActive: i >= 5 && i <= 15,
    isPeak: i === 10,
  }));

  return (
    <div className={`space-y-6 ${!isStandalone ? "pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" : ""}`}>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full mb-2">
            <Calendar size={10} className="text-accent" />
            <span className="text-[10px] font-black uppercase tracking-widest text-accent">Gestor Temporal</span>
          </div>
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic">
            CRONOGRAMA <span className="text-accent">DE CICLOS</span>
          </h2>
          <p className="text-[10px] text-white/60 font-bold uppercase tracking-[0.3em]">Sincronização de meia-vida e faseamento de protocolos</p>
        </div>
      </div>

      <div className="bg-white/10 border border-white/20 rounded-3xl p-6 md:p-10 backdrop-blur-sm">
        <div className="flex items-center gap-4 border-b border-white/15 pb-6 mb-8">
          <button 
            onClick={() => setActiveTab('timeline')}
            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === 'timeline' ? 'bg-accent text-black' : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
          >
            Linha do Tempo
          </button>
          <button 
            onClick={() => setActiveTab('active')}
            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
              activeTab === 'active' ? 'bg-accent text-black' : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            Ciclos Ativos
          </button>
        </div>

        {activeTab === 'timeline' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-white uppercase italic tracking-wider">Protocolo de Recuperação (Atual)</h3>
              <div className="flex items-center gap-2 text-xs font-bold text-white/60">
                <button className="p-2 hover:text-white transition-colors"><ChevronLeft size={16} /></button>
                <span className="uppercase tracking-widest">Semana 2</span>
                <button className="p-2 hover:text-white transition-colors"><ChevronRight size={16} /></button>
              </div>
            </div>

            <div className="grid grid-cols-7 sm:grid-cols-10 md:grid-cols-15 gap-2">
              {days.map((day) => (
                <div 
                  key={day.day}
                  className={`aspect-square flex flex-col items-center justify-center rounded-xl border transition-all ${
                    day.isPeak 
                      ? 'bg-accent/20 border-accent text-accent'
                      : day.isActive 
                        ? 'bg-white/10 border-white/20 text-white' 
                        : 'bg-white/10 border-white/15 text-white/40'
                  }`}
                >
                  <span className="text-xs font-black">{day.day}</span>
                  {day.isPeak && <Zap size={10} className="mt-1" />}
                  {day.isActive && !day.isPeak && <Activity size={8} className="mt-1 opacity-50" />}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-6 text-[10px] uppercase font-bold text-white/60 mt-6 bg-black/20 p-4 rounded-xl">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-accent/20 border border-accent"></div> Pico Plasmático</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-white/10 border border-white/20"></div> Fase Ativa</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-white/10 border border-white/15"></div> Off-Cycle</div>
            </div>
          </div>
        )}

        {activeTab === 'active' && (
          <div className="grid gap-4">
            <div className="bg-black/30 border border-white/20 rounded-2xl p-6 flex items-center justify-between group hover:border-accent/30 transition-all">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                  <Play size={20} className="ml-1" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-white italic uppercase">BPC-157 + TB-500</h4>
                  <p className="text-[10px] text-white/60 font-bold tracking-widest uppercase">Reparo Tecidual e Cicatrização</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-black text-accent">DIA 14 / 30</div>
                <div className="text-[9px] text-white/60 font-bold uppercase tracking-widest mt-1">Saturação 85%</div>
              </div>
            </div>
            
            <div className="bg-black/30 border border-white/20 rounded-2xl p-6 flex items-center justify-between opacity-50">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white/60">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h4 className="text-lg font-black text-white italic uppercase">Semaglutida</h4>
                  <p className="text-[10px] text-white/60 font-bold tracking-widest uppercase">Otimização Metabólica</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-black text-white/60">CONCLUÍDO</div>
                <div className="text-[9px] text-white/60 font-bold uppercase tracking-widest mt-1">Ciclo de 8 Semanas</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
