import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Beaker, Droplet, AlertCircle, CheckCircle2, Info, Timer, Eye } from 'lucide-react';

interface ReconstitutionGuideProps {
  onBack: () => void;
}

export default function ReconstitutionGuide({ onBack }: ReconstitutionGuideProps) {
  const steps = [
    {
      title: "Higiene e Preparação",
      desc: "Lave as mãos e limpe o topo dos frascos (peptídeo e diluente) com álcool 70%. Espere secar completamente.",
      icon: <CheckCircle2 className="text-accent" />
    },
    {
      title: "Coleta do Diluente",
      desc: "Aspire a quantidade exata de água bacteriostática recomendada para o seu protocolo (ex: 2ml para 5mg).",
      icon: <Droplet className="text-accent" />
    },
    {
      title: "Inserção Ângulada",
      desc: "Insira a agulha no frasco do peptídeo e deixe o diluente escorrer pela parede interna do frasco. JAMAIS jogue o jato diretamente no pó.",
      icon: <Beaker className="text-accent" />
    },
    {
      title: "Equalização de Pressão",
      desc: "Remova a agulha por um momento para permitir que o vácuo interno se estabilize antes de prosseguir.",
      icon: <Timer className="text-accent" />
    }
  ];

  return (
    <div className="min-h-screen bg-primary pb-32">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-accent hover:text-white transition-all group mb-12"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Voltar aos Guias
        </button>

        <div className="space-y-12">
          {/* Header */}
          <div className="p-12 rounded-[48px] bg-secondary/[0.02] border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5">
              <Beaker size={150} />
            </div>
            <div className="relative z-10 space-y-6">
              <div className="inline-flex px-3 py-1 rounded-lg bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest">
                Protocolo Técnico v4.2
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-tight">
                RECONSTITUIÇÃO <br />
                <span className="text-white/40">PASSO A PASSO</span>
              </h1>
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="p-8 rounded-3xl bg-secondary/[0.01] border border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  {step.icon}
                  <span className="text-[10px] font-black text-white/20 italic">0{i + 1}</span>
                </div>
                <h3 className="text-lg font-black text-white uppercase italic tracking-tight">{step.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed font-medium">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-8 rounded-[32px] bg-red-500/5 border border-red-500/20 flex gap-6">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-400 shrink-0">
              <AlertCircle size={24} />
            </div>
            <div className="space-y-2">
              <div className="text-red-400 text-[10px] font-black uppercase tracking-widest">ALERTA DE SEGURANÇA</div>
              <p className="text-white text-sm font-black italic uppercase leading-tight">
                NUNCA agite o frasco. Peptídeos são estruturas frágeis. Movimentos bruscos podem quebrar as ligações moleculares, inutilizando o composto. Gire suavemente entre as palmas das mãos se necessário.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tight">Armazenamento Pós-Mistura</h2>
            <div className="prose prose-invert max-w-none text-white/50 text-sm leading-relaxed space-y-4">
              <p>Após a reconstituição, a maioria dos peptídeos torna-se instável em temperatura ambiente. Devem ser conservados em refrigeração constante (2°C a 8°C).</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>BPC-157: Estável por até 60 dias sob refrigeração.</li>
                <li>Ipamorelin: Sensível à luz, manter em embalagem opaca.</li>
                <li>HGH: Altamente frágil, vida útil reduzida após reconstituição.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
