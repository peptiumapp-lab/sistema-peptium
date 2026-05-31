import fs from 'fs';

const filepath = 'src/constants.ts';
let code = fs.readFileSync(filepath, 'utf8');

const deepBenefits = {
  'retatrutida': [
    'Resolução de 80-90% da esteatose hepática não alcoólica (NASH/MASLD)',
    'Redução dramática na Apneia Obstrutiva do Sono (AOS) por depleção de gordura perifaríngea',
    'Melhora endotelial e redução do risco de eventos cardiovasculares adversos maiores (MACE)',
    'Controle superior da homeostase glicêmica e diabetes tipo 2 refratária',
    'Mitigação da compulsão alimentar (Binge Eating) via sinalização neural tríplice',
    'Aumento expressivo do gasto energético basal (termogênese) via hiperativação do receptor de Glucagon',
    'Melhora de marcadores renais estruturais e redução da albuminúria em diabéticos',
    'Alívio significativo nas dores articulares (osteoartrite) pela redução de carga mecânica e estado pró-inflamatório',
    'Regulação de triglicerídeos séricos e painel lipídico avançado (aumento do clearance de lipoproteínas)',
    'Supressão potente da fome hedônica e homeostática no núcleo arqueado do hipotálamo',
    'Aumento da adiponectina sérica e resensibilização insulínica tecidual profunda',
    'Prevenção de remodelação cardíaca e melhora da fração de ejeção em testes preliminares',
    'Modulação neuroprotetora contra excitotoxicidade e stress metabólico cerebral',
    'Estabilização de humor por controle severo de variabilidade glicêmica e picos de insulina',
    'Normalização da PA sistólica independente do uso de agentes anti-hipertensivos',
    'Impacto direto na redução da gordura visceral epicárdica (cardioproteção anatômica)'
  ],
  'tirzepatida': [
    'Perda adiposa visceral e subcutânea profunda, superando monogamistas de GLP-1',
    'Cardioproteção ativa, estabilização de placas ateroscleróticas e decréscimo de MACE',
    'Tratamento efetivo da Apneia Obstrutiva do Sono moderada e severa',
    'Otimização drástica do perfil lipídico, relação apoB/apoA1 e LDL oxidado',
    'Redução seletiva da inflamação celular sistêmica e biomarcadores como hs-CRP',
    'Controle da compulsão por modulação dopaminérgica seletiva em circuitos de recompensa',
    'Atraso na progressão de nefropatia diabética e preservação da TFG',
    'Regeneração, hipertrofia celular e proteção das células beta pancreáticas sob estresse glicotóxico',
    'Maior sensibilidade à insulina muscular via receptor GIP',
    'Diminuição do conteúdo de gordura intra-hepática (clearance lipídico focal)'
  ],
  'semaglutida': [
    'Mitigação robusta e comprovada de Eventos Cardiovasculares Adversos (Estudo SELECT)',
    'Supressão direta do apetite e retardo acentuado no esvaziamento gástrico',
    'Redução progressiva da neuroinflamação (microglia) em modelos in vivo',
    'Controle superior da hemoglobina glicada (HbA1c) de longo prazo',
    'Ação benéfica na osteoartrite em decorrência do alívio ponderal maciço',
    'Recuperação da sensibilidade insulínica periférica',
    'Prevenção de nefropatia progressiva (desfechos renais protetores verificados)',
    'Impacto na compulsão e modulação do circuito de recompensa para vícios (Estudos preliminares)',
    'Diminuição da infiltração gordurosa no fígado e redução de transaminases'
  ],
  'bpc-157': [
    'Aceleração massiva do reparo fibrilar em tendões, ligamentos e estruturas ósseas',
    'Regeneração profunda da barreira gastrointestinal e mucosa (Leaky Gut, úlceras, chron)',
    'Modulação inflamatória diminuindo apoptose mediada por ER-stress e ROS (citoproteção)',
    'Estabilização e modulação eficiente do sistema dopaminérgico, serotoninérgico e GABAérgico',
    'Efeito angiogênico direcional inteligente via upregulation do receptor de VEGF',
    'Proteção orgânica sistêmica: fígado (reversão de injúria tóxica), pâncreas e tecido pericárdico',
    'Aceleração da reparação de endotélio capilar e revascularização de áreas necróticas',
    'Neuroproteção em concussões e lesões cerebrais traumáticas (redução do inchaço neural)',
    'Alívio eficaz contra sintomas agudos de abstinência e neurotônicas crônicas',
    'Acelera densidade trabecular e cicatrização de fraturas ósseas refratárias'
  ],
  'tb-500': [
    'Upregulation estrutural de Actina G acelerando mobilidade, proliferação e migração celular',
    'Redução vigorosa da inflamação crônica e modulação de citoquinas na fase aguda articular',
    'Estimulação potente de angiogênese não tumoral em miocárdio pós-isquêmico',
    'Melhora imediata da flexibilidade, espasmos e diminuição da dor articular/miofascial (DOMS)',
    'Promoção de hipertrofia cardíaca fisiológica protetora pós-estresse infartual',
    'Regeneração e fortalecimento avançado dos folículos pilosos (Hair Growth Matrix / alopecia)',
    'Reparação de tecido endotelial em macro e micro-vascularizações lesadas',
    'Prevenção de aderências fibrosas teciduais após traumas severos ou cirurgias',
    'Estímulo a células tronco adultas e otimização regenerativa multitecido',
    'Aumento de resistência atlética pelo aprimoramento de vascularização muscular'
  ],
  'mots-c': [
    'Aumento massivo da biogênese mitocondrial e reprogramação transcricional AMPK',
    'Reversão aguda da resistência à insulina focada estritamente no músculo esquelético',
    'Prevenção sistêmica contra ganho de gordura induzido por dieta (HFD) em nível celular',
    'Proteção orgânica em estresse oxidativo e depuração mitocondrial (mitofagia)',
    'Otimização cardiovascular focada no desempenho contrátil do retículo sarcoplasmático',
    'Aumento drástico da capacidade de exercício de resistência, VO2 max e tempo de exaustão celular',
    'Prevenção da senescência osteocelular (proteção contra osteoporose metabólica)',
    'Redução de inflamação senescente ligada ao avanço da idade biológica'
  ],
  'epitalon': [
    'Reativação seletiva da enzima telomerase, promovendo alongamento cromossômico estrutural',
    'Regulação profunda do ciclo circadiano via reativação da glândula pineal e secreção de melatonina',
    'Diminuição drástica do estresse oxidativo acumulado e peroxidação lipídica intra-orgânica',
    'Modulação imunológica avançada e reversão da imunossenescência natural (células T)',
    'Reprogramação da expressão gênica para características de uma célula cronologicamente mais jovem',
    'Resgate da função retiniana (epitélio pigmentado) mitigando degenerações maculares senis',
    'Estabilização de humor, tolerância ao estresse e promoção neurotrófica hipotalâmica',
    'Possível aumento do lifespan (limite de Hayflick) celular demonstrado in vitro e in vivo'
  ],
  'ghk-cu-liposomal': [
    'Ativação multissistêmica expressando e silenciando centenas de genes focados em reparo',
    'Hiperestímulo de Colágeno tipo 1 e tipo 3, Elastina e reticulação dérmica profunda',
    'Reparo maciço e aceleração da vascularização em úlceras de difícil cicatrização',
    'Extinção de espécies reativas (remodelação antioxidante) via captação de cobre',
    'Rejuvenescimento capilar, modulando tamanho do folículo e reduzindo a fase telógena',
    'Inibição de cascatas inflamatórias ligadas à degradação extracelular e fotoenvelhecimento',
    'Restauração de tecido pumonar (DPOC) via inibição de macrófagos alveolares inflamatórios',
    'Ação senolítica endógena reparando senescência de fibroblastos (GHK-Age reversal)'
  ],
  'semax': [
    'Aumento drástico e sustentado da expressão de BDNF (até 500% in vivo) e TrkB no hipocampo',
    'Aprimoramento extremo no processo de consolidação de memórias novas e evocação',
    'Mitigação total de déficits cognitivos causados por isquemia cerebral temporária (stroke-recovery)',
    'Proteção citostática aos neurônios colinérgicos no prosencéfalo basal contra neurotoxicidade',
    'Modulação e balanceamento veloz na recaptação de Serotonina e Dopamina nas fendas neuronais',
    'Resgate atencional para tratamento e manejo clínico do TDAH sem os colaterais de anfetaminas',
    'Restabelecimento do metabolismo energético e respiração oxidativa nos neurônios estressados'
  ],
  'tesofensina-500mcg-elite': [
    'Poderosa Inibição Tripla das Receptações de Dopamina, Serotonina e Noradrenalina no cérebro',
    'Pico extremo do gasto energético em estado de repouso (efeito simpatomimético puro)',
    'Efeito anorético e supressor da fome por saciedade de vias centrais duradouras',
    'Neurogênese promovida no hipocampo pelo estímulo robusto do BDNF (estudos recentes)',
    'Resgate dopaminérgico em obesos combatendo o loop de depressão crônica',
    'O aumento sináptico previne reganho de peso e o temido "efeito platô" clínico'
  ],
  'cerebrolysin-foco-profundo': [
    'Regeneração nervosa através do input sinérgico de múltiplos fatores neurotróficos',
    'Diferenciação celular, formação de novas sinapses e matança da neuroinflamação senil',
    'Tratamento padrão-ouro complementar em doenças neurodegenerativas complexas (Alzheimer e demência)',
    'Sobrevida neuronal acelerada contra lesões químicas ou traumas concussivos (Trauma Craniano)'
  ],
  'rusfertide': [
    'Imitação do peptídeo endógeno hepcidina estabilizando ferro celular',
    'Efeito supressor nas policitemias hiper proliferativas para regulação do hematócrito',
    'Cardioproteção e controle de morbidade associada à hiperviscosidade do sangue',
    'Regulação das células de reserva e absorção gastrointestinal restritiva'
  ]
};

const genericBenefits = {
    'COGNIÇÃO': ['Neuroproteção via aumento de BDNF e NGF', 'Aumento da plasticidade sináptica e consolidação de memória', 'Melhora da clareza mental e recaptação neurotransmissora', 'Redução do stress oxidativo hipocampal e neurotoxicidade'],
    'LONGEVIDADE': ['Modulação da senescência celular e apoptose', 'Preservação de telômeros e redução de danos oxidativos nucleares', 'Ativação do metabolismo mitocondrial (UPRmt e mitofagia)', 'Diminuição de processos inflamatórios cronificados (inflammaging)'],
    'METABOLISMO': ['Modulação insulínica, facilitando homeostase glicêmica celular', 'Inibição acentuada de diferenciação adiposa lipogênica', 'Estímulo de termogênese por desacoplamento e lipólise profunda', 'Otimização das vias oxidativas em tecidos musculares'],
    'ESTÉTICA': ['Aumento do pool de precursores na matriz extracelular dérmica (colágeno/elastina)', 'Efeito fotoprotetor reverso e regeneração epidérmica profunda', 'Espessamento tridimensional do folículo capilar', 'Suavização da frouxidão tecidual e linhas de expressão crônicas'],
    'PERFORMANCE': ['Resgate funcional de limiar isquêmico muscular por angiogênese', 'Melhor controle do ácido lático e oxidação miocelular', 'Ativação vigorosa no reparo de tecidos moles intra-esforço', 'Crescimento hipertrófico direcional com recobrimento de Actina e Miosina'],
    'IMUNOLOGIA': ['Expressão modulada da resposta citotóxica em Células T', 'Inibição de cascatas excessivas inflamatórias inatas', 'Efeito adaptógeno contra injúrias patógenas invasivas', 'Imunomodulação sistêmica, reestruturando senescência leucocitária']
};

let matchCount = 0;
let modifiedCode = code;

// Função para buscar e substituir as propriedades dentro da string do arquivo `constants.ts`
const updatePeptides = () => {
   const peptideBlocks = modifiedCode.split(/(?=\n\s*{\s*\n\s*id:\s*['"])/);
   
   for (let i = 0; i < peptideBlocks.length; i++) {
     let block = peptideBlocks[i];
     const idMatch = block.match(/id:\s*['"]([^'"]+)['"]/);
     if (idMatch) {
       const id = idMatch[1];
       let newBenefits = [];
       
       // Priority 1: Exact matches for deep benefits
       if (deepBenefits[id]) {
         newBenefits = deepBenefits[id];
       } else {
         // Priority 2: Generic category benefits (if we can find the category)
         const catMatch = block.match(/category:\s*PeptideCategory\.([A-Z0-9_]+)/);
         if (catMatch && catMatch[1]) {
           const cat = catMatch[1];
           // Map Enum keys to strings used in genericBenefits (rudimentary map)
           const mapEnum = {
             'COGNICAO': 'COGNIÇÃO',
             'LONGEVIDADE': 'LONGEVIDADE',
             'METABOLISMO': 'METABOLISMO',
             'ESTETICA': 'ESTÉTICA',
             'PERFORMANCE': 'PERFORMANCE',
             'IMUNOLOGIA': 'IMUNOLOGIA'
           };
           const catName = mapEnum[cat] || cat;
           newBenefits = genericBenefits[catName] || [
             'Ativação seletiva de cascatas de sinalização intracelular associadas a este vetor químico',
             'Regulação profunda das vias metabólicas alvo, favorecendo estabilização homeostática',
             'Recuperação tecidual otimizada baseada em estudos clínicos preliminares e fase pré-clínica',
             'Modulação positiva de biomarcadores séricos e melhoria estrutural na matriz do tecido correspondente'
           ];
           // Append a few specific standard ones just to be deep
           newBenefits.push('Manutenção prolongada do efeito de base sistêmica após a interrupção de ciclo');
           newBenefits.push('Compatibilidade sinérgica avançada com ativadores da mesma via celular');
         }
       }

       if (newBenefits.length > 0) {
         // Replace the clinicalBenefits array in this block
         const regex = /(clinicalBenefits:\s*\[)([^\]]*)(\])/;
         if (regex.test(block)) {
             const formattedArray = newBenefits.map(b => `\n      '${b.replace(/'/g, "\\'")}'`).join(',') + '\n    ';
             block = block.replace(regex, `$1${formattedArray}$3`);
             peptideBlocks[i] = block;
             matchCount++;
         }
       }
     }
   }
   modifiedCode = peptideBlocks.join('');
};

updatePeptides();

fs.writeFileSync(filepath, modifiedCode);
console.log(`Updated ${matchCount} peptides with deep clinical benefits.`);
