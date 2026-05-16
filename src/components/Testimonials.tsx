import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'M. Carvalho',
    role: 'Atleta IFBB Pro & Preparador',
    content: 'O Atlas condensou anos de pesquisa em minutos. A precisão técnica na meia-vida e sinergias evita os erros clássicos de administração que costumam custar caro em finalizações. Nível de detalhe absurdo.',
    image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop',
  },
  {
    name: 'Dr. Rodrigo A.',
    role: 'Fisiologista e Médico do Esporte',
    content: 'Finalmente uma plataforma que tira o amadorismo da área. A bibliografia referenciada direto do PubMed e os protocolos baseados em bioequivalência dão muita segurança clínica.',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop',
  },
  {
    name: 'A. Fontenelle',
    role: 'Pesquisador de Longevidade',
    content: 'O sistema de arquitetura de dosagem somado à biblioteca centralizada de SARMs e Peptídeos... não tem concorrente. O plano anual se paga só com o tempo que economizo não tendo que cruzar referências cruzadas em PDFs.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden bg-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold mb-6"
          >
            <Star size={14} fill="currentColor" />
            VOTADO #1 EM PRECISÃO
          </motion.div>
          <h2 className="text-4xl font-bold">O que a comunidade <span className="text-accent underline decoration-accent/20 underline-offset-8">Elite</span> diz</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-3xl border border-secondary/10 relative"
            >
              <Quote className="absolute top-6 right-8 text-accent/10" size={40} />
              <div className="flex items-center gap-4 mb-6">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full border-2 border-accent/20 object-cover" />
                <div>
                  <h4 className="font-bold text-sm">{t.name}</h4>
                  <p className="text-accent text-xs">{t.role}</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed italic">
                "{t.content}"
              </p>
              <div className="mt-6 flex gap-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
