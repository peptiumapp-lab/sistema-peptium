import fs from 'fs';

const filepath = 'src/constants.ts';
let code = fs.readFileSync(filepath, 'utf8');

const benefitsUpdates: Record<string, string[]> = {
  'retatrutida': [
    'Resolução de 80-90% da esteatose hepática não alcoólica (NASH/MASLD)',
    'Redução dramática na Apneia Obstrutiva do Sono (AOS) por depleção de gordura perifaríngea',
    'Melhora endotelial e redução do risco de eventos cardiovasculares adversos maiores (MACE)',
    'Controle superior da homeostase glicêmica e diabetes tipo 2 refratária',
    'Mitigação da compulsão alimentar (Binge Eating) via sinalização neural tríplice',
    'Aumento expressivo do gasto energético basal via hiperativação do receptor de Glucagon',
    'Melhora de marcadores renais e redução da albuminúria',
    'Alívio significativo nas dores articulares (osteoartrite) pela redução de carga mecânica e inflamação',
    'Regulação de triglicerídeos séricos e painel lipídico (aumento TGL-clearance)',
    'Supressão potente da fome hedônica e homeostática no hipotálamo',
    'Aumento de adiponectina e resensibilização insulínica tecidual global'
  ],
  'tirzepatida': [
    'Perda adiposa visceral profunda superando monogamistas de GLP-1',
    'Cardioproteção e estabilização de placas ateroscleróticas',
    'Tratamento efetivo da Apneia do Sono moderada e severa',
    'Otimização do perfil lipídico e apolipoproteínas',
    'Redução seletiva da inflamação celular sistêmica (hs-CRP)',
    'Controle da compulsão por modulação dopaminérgica seletiva em circuitos de recompensa',
    'Atraso na progressão de nefropatia diabética',
    'Regeneração e proteção das células beta pancreáticas'
  ],
  'bpc-157': [
    'Aceleração massiva do reparo em tendões, ligamentos e estruturas ósseas',
    'Regeneração da barreira gastrointestinal (Leaky Gut / Disbiose)',
    'Ação citoprotetora sistêmica contra danos celulares tóxicos e químicos',
    'Estabilização e modulação do sistema dopaminérgico e serotoninérgico',
    'Efeito angiogênico direcional (criação de novos vasos em áreas necrosadas/lesionadas)',
    'Proteção orgânica de fígado, pâncreas e tecido cardíaco sob estresse isquêmico',
    'Modulação inflamatória diminuindo apoptose mediada por ROS',
    'Neuroproteção em lesões cerebrais traumáticas (TBI)'
  ],
  'tb-500': [
    'Upregulation de actina G acelerando a mobilidade, proliferação e migração celular',
    'Redução vigorosa da inflamação crônica e fase aguda nas articulações',
    'Estimulação de angiogênese em tecidos isquêmicos',
    'Melhora imediata da flexibilidade e diminuição da dor articular/miofascial',
    'Promoção de hipertrofia cardíaca fisiológica protetora pós-estresse',
    'Regeneração dos folículos pilosos (Hair Growth Matrix)'
  ],
  'motsc': [
    'Aumento massivo da biogênese mitocondrial e transcrição gênica (AMPK)',
    'Reversão da resistência à insulina focada no músculo esquelético',
    'Aumento da capacidade de exercício, tolerância ao esforço físico e VO2 max',
    'Prevenção contra ganho de gordura induzido por dieta de alto impacto hipercalórico',
    'Proteção orgânica e celular na mitigação sistêmica de espécies reativas de oxigênio',
    'Otimização cardiovascular focada em eficiência contrátil celular'
  ]
};

for (const [id, benefits] of Object.entries(benefitsUpdates)) {
  const regex = new RegExp(`(id:\\s*['"]${id}['"][\\s\\S]*?clinicalBenefits:\\s*\\[)([^\\]]*)(\\])`, 'i');
  code = code.replace(regex, (match, prefix, content, suffix) => {
    const formatted = benefits.map(b => `\n      '${b}'`).join(',') + '\n    ';
    return `${prefix}${formatted}${suffix}`;
  });
}

fs.writeFileSync(filepath, code);
console.log('Benefits enhanced successfully!');
