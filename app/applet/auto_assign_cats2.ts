import fs from 'fs';

const filepath = './src/constants.ts';
let code = fs.readFileSync(filepath, 'utf8');

// remove currently assigned categories
// Wait, I can't just remove them easily since I added them inside the array.
// I can just replace `secondaryCategories: [ ... ]` with empty and rebuild. But maybe I should just use the exact list from standard categories and filter.

const validCats = [
  'RECUPERAÇÃO', 'COGNIÇÃO', 'LONGEVIDADE', 'PERFORMANCE', 'METABOLISMO', 'ESTÉTICA',
  'IMUNOLOGIA', 'SEXUAL', 'NEUROPROTEÇÃO', 'SARCOPENIA', 'CICATRIZAÇÃO', 'SONO', 'GLICEMIA',
  'VASCULAR', 'INFLAMAÇÃO', 'DOPAMINA', 'FOCO HD', 'MASSA MAGRA', 'GORDURA VISCERAL', 'BIO-REPARO',
  'OSTEOGÊNESE', 'ANTIOXIDANTE', 'NEURAL', 'DIGESTIVO', 'CARDIOMETABÓLICO'
];

const keywordMap: Record<string, string[]> = {
  'ANTIOXIDANTE': ['antioxidant', 'estresse oxidativo', 'glutationa', 'radicais livres', 'epitalon', 'ghk', 'mots-c', 'ss-31', 'humanina'],
  'BIO-REPARO': ['reparo', 'regeneração profunda', 'lesão', 'bpc-157', 'tb-500', 'kpv', 'ara-290', 'tecido mole', 'tendão', 'ligamento', 'regenera'],
  'OSTEOGÊNESE': ['osso', 'óssea', 'osteogênese', 'fratura', 'mineralização', 'calcitonina', 'osteo', 'densidade óssea'],
  'SARCOPENIA': ['sarcopenia', 'atrofia', 'perda muscular', 'idoso', 'fragilidade', 'follistatin', 'igf-1', 'mk-677'],
  'NEUROPROTEÇÃO': ['neuroproteção', 'neuroprotetor', 'alzheimer', 'parkinson', 'tce', 'cérebro', 'neurônio', 'axônio', 'barreira hematoencefálica', 'cognitivo', 'cérebro'],
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
  'ESTÉTICA': ['estética', 'ruga', 'cabelo', 'rejuvenescimento', 'anti-aging', 'ghk-cu', 'melanocortina', 'pele'],
  'DIGESTIVO': ['digestivo', 'intestino', 'gástrico', 'colite', 'crohn', 'leaky gut', 'microbioma', 'barreira intestinal', 'bpc-157', 'kpv'],
  'CARDIOMETABÓLICO': ['cardio', 'coração', 'miocárdio', 'infarto', 'cardioprotetor', 'ss-31']
};

function processCode(code: string) {
  // We'll replace the whole secondaryCategories array for each block using a regex.
  // Then we rebuild it.
  // Warning: existing secondaryCategories might have base categories we want to keep.
  return code.replace(/(id: ['"][^'"]+['"][\s\S]*?)secondaryCategories: \[([\s\S]*?)\]/g, (match, prefix, arrayContent) => {
    // extract current categories
    const currentCats = arrayContent
      .split(',')
      .map(s => s.trim().replace(/^['"]|['"]$/g, ''))
      .filter(s => s.length > 0 && validCats.includes(s));
    
    let cats = new Set(currentCats);
    
    // search text for keywords
    const lowercaseBlock = prefix.toLowerCase();
    for (const [cat, keywords] of Object.entries(keywordMap)) {
      for (const kw of keywords) {
        // Use word boundary to avoid partial matches
        // Also remove accents for matching if needed, but let's just stick to the regex
        const regex = new RegExp(`\\b${kw}\\b`, 'i');
        if (regex.test(lowercaseBlock)) {
          cats.add(cat);
          break;
        }
      }
    }
    
    // Special cleanup:
    // If we have 'DOPAMINA', ensure we don't have 'DOPAMINA' 500 times. Set handles uniqueness.
    
    const newArrayStr = Array.from(cats).map(c => `'${c}'`).join(', ');
    return `${prefix}secondaryCategories: [${newArrayStr}]`;
  });
}

const newCode = processCode(code);
fs.writeFileSync(filepath, newCode);
console.log('Categories updated surgically!');
