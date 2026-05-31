import fs from 'fs';

const filepath = './src/constants.ts';
let code = fs.readFileSync(filepath, 'utf8');

const keywordMap: Record<string, string[]> = {
  'ANTIOXIDANTE': ['antioxidant', 'estresse oxidativo', 'glutationa', 'radicais livres', 'ros', 'epitalon', 'ghk', 'mots-c', 'ss-31', 'humanina'],
  'BIO-REPARO': ['reparo', 'regeneração profunda', 'lesão', 'bpc-157', 'tb-500', 'kpv', 'ara-290', 'tecido mole', 'tendão', 'ligamento'],
  'OSTEOGÊNESE': ['osso', 'óssea', 'osteogênese', 'fratura', 'mineralização', 'calcitonina', 'osteo', 'densidade óssea'],
  'SARCOPENIA': ['sarcopenia', 'atrofia', 'perda muscular', 'idoso', 'fragilidade', 'follistatin', 'igf-1', 'mk-677'],
  'NEUROPROTEÇÃO': ['neuroproteção', 'neuroprotetor', 'alzheimer', 'parkinson', 'tce', 'cérebro', 'neurônio', 'axônio', 'bbarreira hematoencefálica', 'cognitivo'],
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

function ensureSecondaryCatSafe(id: string, newCat: string) {
  const marker1 = `id: '${id}',`;
  const marker2 = `id: "${id}",`;
  
  let idx = code.indexOf(marker1);
  if (idx === -1) idx = code.indexOf(marker2);
  if (idx === -1) return;
  
  const categoryIdxStr = "category: PeptideCategory.";
  const catIdx = code.indexOf(categoryIdxStr, idx);
  if (catIdx === -1) return;
  
  const endOfCat = code.indexOf(',', catIdx);
  const nextIdIdx = code.indexOf('id: ', catIdx);
  const secCatStr = "secondaryCategories:";
  const secCatIdx = code.indexOf(secCatStr, endOfCat);
  
  if (secCatIdx !== -1 && (nextIdIdx === -1 || secCatIdx < nextIdIdx)) {
    // Array exists!
    const openBrace = code.indexOf('[', secCatIdx);
    const closeBrace = code.indexOf(']', openBrace);
    const slice = code.slice(openBrace, closeBrace);
    
    if (slice.includes(`'${newCat}'`) || slice.includes(`"${newCat}"`)) {
      return; // Already has it
    }
    
    const beforePart = code.slice(0, closeBrace);
    const afterPart = code.slice(closeBrace);
    const existingStr = code.slice(openBrace, closeBrace + 1);
    
    if (existingStr.includes('\n')) {
      let toAppend = '';
      if (!beforePart.trim().endsWith(',')) {
        toAppend = `, '${newCat}'\n    `;
      } else {
        toAppend = ` '${newCat}'\n    `;
      }
      code = beforePart + toAppend + afterPart;
    } else {
      let toAppend = '';
      if (!beforePart.trim().endsWith(',') && existingStr.trim().length > 3) {
        toAppend = `, '${newCat}'`;
      } else {
        toAppend = `'${newCat}'`;
      }
      code = beforePart + toAppend + afterPart;
    }
  } else {
    // Create new array below category
    const beforeCatNL = code.slice(0, endOfCat + 1);
    const afterCatNL = code.slice(endOfCat + 1);
    code = beforeCatNL + `\n    secondaryCategories: ['${newCat}'],` + afterCatNL;
  }
}

// Find all peptides blocks. We can regex extract ids, description, tags, features, etc.
const peptideRegex = /id: ['"]([^'"]+)['"][\s\S]*?(?=id: ['"]|\n\];)/g;

let match;
while ((match = peptideRegex.exec(code)) !== null) {
  const block = match[0];
  const id = match[1];
  
  // We don't want to analyze the entire block if it's too long, but peptide defs are reasonably sized.
  const lowercaseBlock = block.toLowerCase();
  
  for (const [cat, keywords] of Object.entries(keywordMap)) {
    for (const kw of keywords) {
      if (lowercaseBlock.includes(kw.toLowerCase())) {
        ensureSecondaryCatSafe(id, cat);
        break; // Match one keyword, add cat and move to next cat
      }
    }
  }
}

fs.writeFileSync(filepath, code);
console.log('Categories updated!');
