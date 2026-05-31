import fs from 'fs';

const filepath = './src/constants.ts';
let code = fs.readFileSync(filepath, 'utf8');

const validCats = [
  'RECUPERAÇÃO', 'COGNIÇÃO', 'LONGEVIDADE', 'PERFORMANCE', 'METABOLISMO', 'ESTÉTICA',
  'IMUNOLOGIA', 'SEXUAL', 'NEUROPROTEÇÃO', 'SARCOPENIA', 'CICATRIZAÇÃO', 'SONO', 'GLICEMIA',
  'VASCULAR', 'INFLAMAÇÃO', 'DOPAMINA', 'FOCO HD', 'MASSA MAGRA', 'GORDURA VISCERAL', 'BIO-REPARO',
  'OSTEOGÊNESE', 'ANTIOXIDANTE', 'NEURAL', 'DIGESTIVO', 'CARDIOMETABÓLICO'
];

const keywordMap: Record<string, string[]> = {
  'ANTIOXIDANTE': ['antioxidante', 'estresse oxidativo', 'glutationa', 'radicais livres', 'epitalon', 'ghk', 'mots-c', 'ss-31', 'humanina'],
  'BIO-REPARO': ['reparo', 'regeneração profunda', 'lesão', 'bpc-157', 'tb-500', 'kpv', 'ara-290', 'tecido mole', 'tendão', 'ligamento', 'regenera'],
  'OSTEOGÊNESE': ['osso', 'óssea', 'osteogênese', 'fratura', 'mineralização', 'calcitonina', 'osteo', 'densidade óssea'],
  'SARCOPENIA': ['sarcopenia', 'atrofia', 'perda muscular', 'idoso', 'fragilidade', 'follistatin', 'igf-1', 'mk-677'],
  'NEUROPROTEÇÃO': ['neuroproteção', 'neuroprotetor', 'alzheimer', 'parkinson', 'tce', 'cérebro', 'neurônio', 'axônio', 'barreira hematoencefálica', 'cognitivo'],
  'SONO': ['sono', 'insônia', 'melatonina', 'ciclo circadiano', 'pineal', 'delta', 'epitalon', 'dsip'],
  'DOPAMINA': ['dopamina', 'bromantane', 'motivação', 'recompensa', 'tirosina', 'fenda sináptica', 'humor'],
  'FOCO HD': ['foco', 'concentração', 'atenção', 'memória', 'tdah', 'dihexa', 'semax', 'cerebrolysin'],
  'MASSA MAGRA': ['massa magra', 'hipertrofia', 'músculo', 'anabolismo', 'anabólico', 'síntese proteica', 'ganho muscular'],
  'GORDURA VISCERAL': ['gordura visceral', 'abdominal', 'adiposo', 'lipólise', 'adipócito'],
  'INFLAMAÇÃO': ['inflamação', 'anti-inflamatório', 'citocina', 'crônica', 'interleucina', 'tnf', 'nf-kb', 'vip', 'kpv'],
  'VASCULAR': ['vascular', 'angiogênese', 'endotélio', 'fluxo sanguíneo', 'vasodilatação', 'óxido nítrico', 'ara-290', 'tb-500'],
  'GLICEMIA': ['glicemia', 'insulina', 'resistência à insulina', 'diabetes', 'metabólico', 'hba1c', 'glp-1', 'gip'],
  'CICATRIZAÇÃO': ['cicatrização', 'ferida', 'pele', 'colágeno', 'fibroblasto', 'queimadura', 'ghk'],
  'SEXUAL': ['sexual', 'libido', 'ereção', 'desejo', 'anorgasmia', 'pt-141', 'melanotan', 'mc4r'],
  'IMUNOLOGIA': ['imune', 'imunidade', 'thymosin', 't-cell', 'linfócitos', 'natural killer', 'macrófago', 'timalina', 'thymalin'],
  'ESTÉTICA': ['estética', 'ruga', 'cabelo', 'rejuvenescimento', 'anti-aging', 'ghk-cu', 'melanocortina'],
  'DIGESTIVO': ['digestivo', 'intestino', 'gástrico', 'colite', 'crohn', 'leaky gut', 'microbioma', 'barreira intestinal', 'bpc-157', 'kpv'],
  'CARDIOMETABÓLICO': ['cardio', 'coração', 'miocárdio', 'infarto', 'cardioprotetor', 'ss-31']
};

// Map enum keys to strings for the primary category
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

function processCode(code: string) {
  // Regex matches from id: up to secondaryCategories:
  // We'll capture the primary category along the way to seed the Set
  const regex = /(id: ['"][^'"]+['"][\s\S]*?category: PeptideCategory\.)([A-Z_]+)(,[\s\S]*?secondaryCategories: )\[(.*?)\]/g;
  
  return code.replace(regex, (match, part1, enumVal, part3, arrayContent) => {
    
    // The primary category value
    const primaryCat = enumCatMap[enumVal] || enumVal;
    
    // We wipe out all previous categories. We only start with primary.
    let cats = new Set<string>();
    cats.add(primaryCat);
    
    // Then we search the block text for keywords. But wait! The block text from regex only goes up to secondaryCategories.
    // Let's search the whole match, plus it has features, etc. But if features are below secondaryCategories, they aren't included in `part1` + `part3`.
    return match;
  });
}
