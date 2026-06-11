import React from 'react';
import { Sparkles, MapPin, Calendar, ClipboardList } from 'lucide-react';

interface PlaceholderViewProps {
  view: 'scanner' | 'map' | 'schedule' | 'my-protocols' | 'quiz';
  setView: (view: any) => void;
}

export default function PlaceholderView({ view, setView }: PlaceholderViewProps) {
  const getViewDetails = () => {
    switch (view) {
      case 'scanner':
        return {
          icon: <Sparkles size={48} className="text-accent mb-6" />,
          title: 'BIO-SCANNER IA',
          description: 'A inteligência artificial do Peptium está processando seu perfil genético e metabólico. Este módulo estará disponível em breve para assinantes Prime.',
          status: 'Calibrando Algoritmo'
        };
      case 'map':
        return {
          icon: <MapPin size={48} className="text-accent mb-6" />,
          title: 'MAPA DE BIO-HACKING',
          description: 'O mapeamento de rotas metabólicas avançadas está recebendo um upgrade na nossa base de dados molecular.',
          status: 'Atualizando Satélites'
        };
      case 'schedule':
        return {
          icon: <Calendar size={48} className="text-accent mb-6" />,
          title: 'CRONOGRAMA DE CICLO',
          description: 'O gerenciador de ciclos e meia-vida está sendo aprimorado para suportar sinergias complexas de até 5 compostos simultâneos.',
          status: 'Sincronizando Tempos'
        };
      case 'my-protocols':
        return {
          icon: <ClipboardList size={48} className="text-accent mb-6" />,
          title: 'MEUS PROTOCOLOS',
          description: 'Sua área restrita de salvamento de stacks personalizados está em fase final de testes de criptografia local.',
          status: 'Criptografando Dados'
        };
      case 'quiz':
        return {
          icon: <Sparkles size={48} className="text-accent mb-6" />,
          title: 'TESTE DE PERFIL',
          description: 'O teste de mapeamento inicial está passando por calibração para sugerir compostos com precisão de 99.8%.',
          status: 'Calibrando Diagnóstico'
        };
      default:
        return {
          icon: <Sparkles size={48} className="text-accent mb-6" />,
          title: 'MÓDULO RESTRITO',
          description: 'Este módulo está recebendo uma atualização estrutural arquitetônica.',
          status: 'Processando'
        };
    }
  };

  const details = getViewDetails();

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[80vh] flex flex-col items-center justify-center text-center">
      <div className="bg-white/10 border border-white/20 rounded-3xl p-12 max-w-2xl w-full backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
        
        <div className="flex justify-center flex-col items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-accent/20 blur-2xl rounded-full" />
            <div className="relative z-10 bg-black border border-white/20 p-6 rounded-2xl mb-8">
              {details.icon}
            </div>
          </div>
          
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-accent">
              {details.status}
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-sans font-black tracking-tighter text-white uppercase italic leading-none mb-6">
            {details.title}
          </h2>
          
          <p className="text-white/60 text-xs md:text-sm font-medium leading-relaxed max-w-lg mb-10">
            {details.description}
          </p>

          <button 
            onClick={() => setView('home')}
            className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-xs rounded-xl hover:bg-accent hover:text-white transition-all duration-300"
          >
            Voltar ao Painel
          </button>
        </div>
      </div>
    </div>
  );
}
