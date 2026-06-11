import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Syringe, Shield, AlertCircle, RefreshCcw, MapPin, CheckCircle2, Info } from 'lucide-react';

interface InjectionGuideProps {
  onBack: () => void;
}

export default function InjectionArticle({ onBack }: InjectionGuideProps) {
  const sites = [
    { name: "Abdominal", desc: "2-3cm de distância do umbigo. Área de maior absorção.", icon: <MapPin size={18} /> },
    { name: "Coxas", desc: "Face lateral externa. Ideal para alternância de longo prazo.", icon: <MapPin size={18} /> },
    { name: "Glúteos", desc: "Quadrante superior externo. Menos sensibilidade sensorial.", icon: <MapPin size={18} /> }
  ];

  return (
    <div className="min-h-screen bg-primary pb-32">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-accent hover:text-white transition-all group mb-12"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Voltar aos Guias
        </button>

        <div className="space-y-12">
          {/* Header */}
          <div className="p-12 rounded-[48px] bg-secondary/[0.02] border border-white/15 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5">
              <Syringe size={150} />
            </div>
            <div className="relative z-10 space-y-6">
              <div className="inline-flex px-3 py-1 rounded-lg bg-accent/10 border border-accent/20 text-accent text-xs font-black uppercase tracking-wider">
                Técnica Biológica v2.0
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-[0.85]">
                INJEÇÃO SUB-Q <br />
                <span className="text-white/60">& ROTAÇÃO</span>
              </h1>
            </div>
          </div>

          {/* Section: Rotação */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tight flex items-center gap-3">
                <RefreshCcw className="text-accent" />
                A Importância da Rotação
              </h2>
              <div className="text-white/50 text-sm leading-loose space-y-4 font-medium">
                <p>
                  A aplicação repetida no mesmo local pode causar **lipohipertrofia** (acúmulo de gordura sob a pele) ou cicatrizes internas que prejudicam a absorção do peptídeo.
                </p>
                <p>
                  Utilize a "Técnica do Relógio": imagine um relógio ao redor do umbigo e mude a posição em 1 hora a cada nova aplicação.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {sites.map((site, i) => (
                <div key={i} className="p-4 rounded-2xl bg-secondary/[0.02] border border-white/15 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    {site.icon}
                  </div>
                  <div>
                    <div className="text-white font-black uppercase text-xs italic">{site.name}</div>
                    <div className="text-white/50 text-xs font-medium">{site.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Warning */}
          <div className="p-8 rounded-[32px] bg-red-400 text-primary">
            <div className="flex items-start gap-4">
              <AlertCircle size={28} className="shrink-0" />
              <div className="space-y-1">
                <h4 className="font-black uppercase italic leading-none">Atenção ao Ângulo</h4>
                <p className="text-xs font-bold uppercase leading-tight opacity-80">
                  A injeção deve ser em 90 graus para agulhas curtas (6mm) ou 45 graus para agulhas de 12.7mm, garantindo que o líquido fique no tecido adiposo e não no músculo.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-secondary/[0.02] border border-white/15 flex flex-col items-center text-center space-y-3">
              <div className="w-8 h-8 rounded-full bg-accent text-primary flex items-center justify-center text-xs font-black">1</div>
              <div className="text-xs font-black text-white uppercase tracking-wider">Pinçar a Pele</div>
            </div>
            <div className="p-6 rounded-3xl bg-secondary/[0.02] border border-white/15 flex flex-col items-center text-center space-y-3">
              <div className="w-8 h-8 rounded-full bg-accent text-primary flex items-center justify-center text-xs font-black">2</div>
              <div className="text-xs font-black text-white uppercase tracking-wider">Introdução Lenta</div>
            </div>
            <div className="p-6 rounded-3xl bg-secondary/[0.02] border border-white/15 flex flex-col items-center text-center space-y-3">
              <div className="w-8 h-8 rounded-full bg-accent text-primary flex items-center justify-center text-xs font-black">3</div>
              <div className="text-xs font-black text-white uppercase tracking-wider">Aguardar 5s</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
