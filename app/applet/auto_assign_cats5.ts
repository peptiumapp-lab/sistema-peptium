import fs from 'fs';

const filepath = './src/constants.ts';
let code = fs.readFileSync(filepath, 'utf8');

const keywordMap: Record<string, string[]> = {
  'ANTIOXIDANTE': ['antioxidante', 'estresse oxidativo', 'glutationa', 'radicais livres', 'epitalon', 'ghk', 'mots-c', 'ss-31', 'humanina'],
  'BIO-REPARO': ['reparo', 'regeneração profunda', 'lesão', 'bpc\\-157', 'tb\\-500', 'kpv', 'ara\\-290', 'tecido mole', 'tendão', 'ligamento', 'regenera', 'cura'],
  'OSTEOGÊNESE': ['osso', 'óssea', 'osteogênese', 'fratura', 'mineralização', 'calcitonina', 'osteo', 'densidade óssea'],
  'SARCOPENIA': ['sarcopenia', 'atrofia', 'perda muscular', 'idoso', 'fragilidade', 'follistatin', 'igf\\-1', 'mk\\-677'],
  'NEUROPROTEÇÃO': ['neuroproteção', 'neuroprotetor', 'alzheimer', 'parkinson', 'tce', 'cérebro', 'neurônio', 'axônio', 'barreira hematoencefálica', 'cognitivo'],
  'SONO': ['sono', 'insônia', 'melatonina', 'ciclo circadiano', 'pineal', 'delta', 'epitalon', 'dsip'],
  'DOPAMINA': ['dopamina', 'bromantane', 'motivação', 'recompensa', 'tirosina', 'fenda sináptica', 'humor'],
  'FOCO HD': ['foco', 'concentração', 'atenção', 'memória', 'tdah', 'dihexa', 'semax', 'cerebrolysin', 'cognição'],
  'MASSA MAGRA': ['massa magra', 'hipertrofia', 'músculo', 'anabolismo', 'anabólico', 'síntese proteica', 'ganho muscular'],
  'GORDURA VISCERAL': ['gordura visceral', 'abdominal', 'adiposo', 'lipólise', 'adipócito', 'emagrecimento', 'perda de peso'],
  'INFLAMAÇÃO': ['inflamação', 'anti\\-inflamatório', 'citocina', 'crônica', 'interleucina', 'tnf', 'nf\\-kb', 'vip', 'kpv'],
  'VASCULAR': ['vascular', 'angiogênese', 'endotélio', 'fluxo sanguíneo', 'vasodilatação', 'óxido nítrico', 'ara\\-290', 'tb\\-500'],
  'GLICEMIA': ['glicemia', 'insulina', 'resistência à insulina', 'diabetes', 'metabólico', 'hba1c', 'glp\\-1', 'gip'],
  'CICATRIZAÇÃO': ['cicatrização', 'ferida', 'colágeno', 'fibroblasto', 'queimadura', 'ghk', 'pele'],
  'SEXUAL': ['sexual', 'libido', 'ereção', 'desejo', 'anorgasmia', 'pt\\-141', 'melanotan', 'mc4r'],
  'IMUNOLOGIA': ['imune', 'imunidade', 'thymosin', 't\\-cell', 'linfócitos', 'natural killer', 'macrófago', 'timalina', 'thymalin'],
  'ESTÉTICA': ['estética', 'ruga', 'cabelo', 'rejuvenescimento', 'anti\\-aging', 'ghk\\-cu', 'melanocortina', 'pele', 'bronzeamento'],
  'DIGESTIVO': ['digestivo', 'intestino', 'gástrico', 'colite', 'crohn', 'leaky gut', 'microbioma', 'barreira intestinal', 'bpc\\-157', 'kpv'],
  'CARDIOMETABÓLICO': ['cardio', 'coração', 'miocárdio', 'infarto', 'cardioprotetor', 'ss\\-31', 'cardiometabólico']
};

const enumCatMap: Record<string, string> = {
  'RECUPERACAO': 'RECUPERAÇÃO',
  'COGNICAO': 'COGNIÇÃO',
  'LONGEVIDADE': 'LONGEVIDADE',
  'PERFORMANCE': 'PERFORMANCE',
  'METABOLISMO': 'METABOLISMO',
  'ESTETICA': 'ESTÉTICA',
  'IMUNOLOGIA': 'IMUNOLOGIA',
  'SEXUAL': 'SEXUAL',
  'NEUROPROTECAO': 'NEUROPROTEÇÃO',
  'SARCOPENIA': 'SARCOPENIA',
  'CICATRIZACAO': 'CICATRIZAÇÃO',
  'SONO': 'SONO',
  'GLICEMIA': 'GLICEMIA',
  'VASCULAR': 'VASCULAR',
  'INFLAMACAO': 'INFLAMAÇÃO',
  'DOPAMINA': 'DOPAMINA',
  'FOCO_HD': 'FOCO HD',
  'MASSA_MAGRA': 'MASSA MAGRA',
  'GORDURA_VISCERAL': 'GORDURA VISCERAL',
  'BIO_REPARO': 'BIO-REPARO',
  'OSTEOGENESE': 'OSTEOGÊNESE',
  'ANTIOXIDANTE': 'ANTIOXIDANTE',
  'NEURAL': 'NEURAL',
  'DIGESTIVO': 'DIGESTIVO',
  'CARDIOMETABOLICO': 'CARDIOMETABÓLICO'
};

const regex = /({\s*id: ['"][^'"]+['"][\s\S]*?)(,?\s*})?(?=\s*(?:,|\];))/g;

let match;
let newCode = code;

while ((match = regex.exec(code)) !== null) {
  let block = match[1];
  const oldBlock = block;
  
  const catMatch = block.match(/category: PeptideCategory\.([A-Z_]+)/);
  if (!catMatch) continue;
  
  const primaryCat = enumCatMap[catMatch[1]] || catMatch[1];
  let cats = new Set<string>();
  cats.add(primaryCat);
  
  // Extract only the meaningful parts (name, description, features, insight, tag) to avoid boilerplate matching
  let textToAnalyze = "";
  
  const extractField = (fieldName: string) => {
    const fieldRegex = new RegExp(`${fieldName}:\\s*(['"\\[][\\s\\S]*?)(?=(?:,\\s*[a-zA-Z]+:)|(?:\\s*}))`);
    const fm = block.match(fieldRegex);
    if (fm) textToAnalyze += fm[1] + " ";
  };
  
  extractField('name');
  extractField('tag');
  extractField('description');
  extractField('features');
  extractField('insight');
  extractField('synonyms');
  
  const lowercaseBlock = textToAnalyze.toLowerCase();
  
  for (const [cat, keywords] of Object.entries(keywordMap)) {
    for (const kw of keywords) {
      const kwRegex = new RegExp(`\\b${kw}\\b`, 'i');
      if (kwRegex.test(lowercaseBlock)) {
        cats.add(cat);
        break;
      }
    }
  }
  
  const newArrayStr = Array.from(cats).map(c => `'${c}'`).join(', ');
  
  if (block.includes('secondaryCategories: [')) {
    block = block.replace(/secondaryCategories:\s*\[([\s\S]*?)\]/, `secondaryCategories: [${newArrayStr}]`);
  } else {
    block = block.replace(/(category: PeptideCategory\.[A-Z_]+,)/, `$1\n    secondaryCategories: [${newArrayStr}],`);
  }
  
  newCode = newCode.replace(oldBlock, block);
}

fs.writeFileSync(filepath, newCode);
console.log('Categories cleansed and reassigned perfectly!');
