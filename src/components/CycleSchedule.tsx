import type { View } from '../App';
import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Activity, Zap, Play, CheckCircle2 } from 'lucide-react';

interface CycleScheduleProps {
  isStandalone?: boolean;
  setView?: (view: View) => void;
}

export default function CycleSchedule({ isStandalone, setView }: CycleScheduleProps) {
  const [activeTab, setActiveTab] = useState<'timeline' | 'active'>('timeline');

  // Simple mock data for cycles
  const days = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    isActive: i >= 5 && i <= 15,
    isPeak: i === 10,
  }));

  return (
    <div className={`space-y-6 ${!isStandalone ? "pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" : ""}`}>
      {setView && (
        <button 
          onClick={() => setView('home')}
          className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-secondary/60 hover:text-accent transition-all group mb-4 px-4 pt-4 z-50 relative"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left group-hover:-translate-x-1 transition-transform"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          Voltar para a Home
        </button>
      )}

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full mb-2">
            <Calendar size={10} className="text-accent" />
            <span className="text-xs font-black uppercase tracking-wider text-accent">Gestor Temporal</span>
          </div>
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic">
            CRONOGRAMA <span className="text-accent">DE CICLOS</span>
          </h2>
          <p className="text-xs text-white/60 font-bold uppercase tracking-wider">Sincronização de meia-vida e faseamento de protocolos</p>
        </div>
      </div>

      <div className="bg-white/10 border border-white/20 rounded-3xl p-6 md:p-10 backdrop-blur-sm">
        <div className="flex items-center gap-4 border-b border-white/15 pb-6 mb-8">
          <button 
            onClick={() => setActiveTab('timeline')}
            className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              activeTab === 'timeline' ? 'bg-accent text-black' : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
          >
            Linha do Tempo
          </button>
          <button 
            onClick={() => setActiveTab('active')}
            className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
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
                <span className="uppercase tracking-wider">Semana 2</span>
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
                        : 'bg-white/10 border-white/15 text-white/60'
                  }`}
                >
                  <span className="text-xs font-black">{day.day}</span>
                  {day.isPeak && <Zap size={10} className="mt-1" />}
                  {day.isActive && !day.isPeak && <Activity size={8} className="mt-1 opacity-50" />}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-6 text-xs uppercase font-bold text-white/60 mt-6 bg-black/20 p-4 rounded-xl">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-accent/20 border border-accent"></div> Pico Plasmático</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-white/10 border border-white/20"></div> Fase Ativa</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-white/10 border border-white/15"></div> Off-Cycle</div>
            </div>
          </div>
        )}

        {activeTab === 'active' && (
          <div className="grid gap-4">
            <div className="bg-black/30 border border-white/20 rounded-2xl p-6 flex items-center justify-between group hover:border-accent/20 transition-all">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                  <Play size={20} className="ml-1" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-white italic uppercase">BPC-157 + TB-500</h4>
                  <p className="text-xs text-white/60 font-bold tracking-wider uppercase">Reparo Tecidual e Cicatrização</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-black text-accent">DIA 14 / 30</div>
                <div className="text-xs text-white/60 font-bold uppercase tracking-wider mt-1">Saturação 85%</div>
              </div>
            </div>
            
            <div className="bg-black/30 border border-white/20 rounded-2xl p-6 flex items-center justify-between opacity-50">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white/60">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h4 className="text-lg font-black text-white italic uppercase">Semaglutida</h4>
                  <p className="text-xs text-white/60 font-bold tracking-wider uppercase">Otimização Metabólica</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-black text-white/60">CONCLUÍDO</div>
                <div className="text-xs text-white/60 font-bold uppercase tracking-wider mt-1">Ciclo de 8 Semanas</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
