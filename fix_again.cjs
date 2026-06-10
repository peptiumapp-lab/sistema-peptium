const fs = require('fs');
let content = fs.readFileSync('src/constants.ts', 'utf8');

const synergies = `export const SYNERGY_PROTOCOLS: any[] = [
  {
    id: 'syn-gordura-agressiva',
    title: 'Perda de Gordura Agressiva',
    description: 'Combina a supressão máxima do apetite com a queima de gordura localizada e o aumento do metabolismo mitocondrial.',
    peptides: ['retatrutida', 'aod-9604', 'mots-c'],
    effects: ['Supressão extrema de apetite', 'Gasto basal elevado', 'Lipólise direcionada'],
    duration: '12-16 semanas'
  },
  {
    id: 'syn-reparo-avancado',
    title: 'Reparo Avançado de Lesões',
    description: 'Oferece reparo localizado (BPC-157), cura sistêmica (TB-500) e potente controle da inflamação (KPV).',
    peptides: ['bpc-157', 'tb-500', 'kpv'],
    effects: ['Regeneração acelerada', 'Controle inflamatório sistêmico e local', 'Reparo de tendões e ligamentos'],
    duration: '4-8 semanas'
  },
  {
    id: 'syn-longevidade-antiaging',
    title: 'Antienvelhecimento & Longevidade',
    description: 'Foca na reparação do DNA, energia celular e saúde mitocondrial para um protocolo completo de longevidade.',
    peptides: ['epithalon', 'nad', 'ss-31'],
    effects: ['Reparo de DNA e telômeros', 'Energia celular (ATP)', 'Vitalidade do organismo todo'],
    duration: 'Ciclos de 10-20 dias (Epithalon) + Uso contínuo (NAD, SS-31)'
  },
  {
    id: 'syn-hipertrofia-maxima',
    title: 'Máximo Ganho Muscular',
    description: 'Aumenta drasticamente os pulsos de GH e os níveis de IGF-1, otimizando a síntese de proteínas e reparação.',
    peptides: ['cjc-1295-no-dac', 'ipamorelina', 'igf-1-lr3'],
    effects: ['Hipertrofia muscular', 'Síntese de proteína máxima', 'Recuperação noturna'],
    duration: '8-12 semanas'
  },
  {
    id: 'syn-beleza-cosmetica',
    title: 'Melhoria Cosmética (Pele & Cabelo)',
    description: 'Estimula colágeno e folículos (GHK-Cu), repara desgaste da pele (BPC-157) e desintoxica para brilho interno.',
    peptides: ['ghk-cu-liposomal', 'bpc-157', 'glutationa'],
    effects: ['Brilho e viço na pele', 'Remodelação de colágeno', 'Crescimento capilar acelerado'],
    duration: 'Uso contínuo e microagulhamento local'
  }
];`;

content = content.replace('export const SYNERGY_PROTOCOLS: any[] = [];', synergies);
content = content.replace('export const TOTAL_PEPTIDES = 560;', 'export const TOTAL_PEPTIDES = 563;');
fs.writeFileSync('src/constants.ts', content);
