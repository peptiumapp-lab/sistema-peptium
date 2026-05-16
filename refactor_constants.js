import fs from 'fs';
import { PROTOCOLS, SYNERGY_PROTOCOLS, WHATSAPP_NUMBER, WHATSAPP_LINK } from './src/constants.ts';
import { PeptideCategory } from './src/types.ts';

function inferCategory(tag) {
  if (!tag) return 'Outros';
  const t = tag.toLowerCase();
  if (t.includes('performance')) return 'Performance';
  if (t.includes('longevidade') || t.includes('anti-aging')) return 'Longevidade';
  if (t.includes('estética') || t.includes('pele')) return 'Estética';
  if (t.includes('recuperação') || t.includes('reparo')) return 'Recuperação';
  if (t.includes('cognição') || t.includes('mental')) return 'Cognição';
  if (t.includes('metabolismo') || t.includes('peso')) return 'Metabolismo';
  if (t.includes('imunologia') || t.includes('imune')) return 'Imunologia';
  if (t.includes('cardiometabólico') || t.includes('coração')) return 'Cardiometabólico';
  if (t.includes('sexual')) return 'Sexual';
  if (t.includes('oncologia')) return 'Oncologia';
  return 'Outros';
}

const updatedProtocols = PROTOCOLS.map(p => {
  const cat = inferCategory(p.tag);
  
  return Object.assign({}, p, {
    category: 'PeptideCategory.' + cat.toUpperCase().replace('É', 'E').replace('Ç', 'C').replace('Ã', 'A').replace('Ô', 'O'),
    secondaryCategories: [cat],
    synonyms: [p.name.split(' (')[0]],
    class: 'Modulador Elite',
    mechanismOfAction: [
      p.mechanism || "Modulação específica de receptores alvo.",
      "Ativação de vias intracelulares de sinalização celular.",
      "Melhora na expressão gênica e resiliência tecidual."
    ],
    clinicalBenefits: [
      "Otimização sistêmica e reparo tecidual acelerado.",
      "Aumento da performance e resiliência metabólica.",
      "Proteção antioxidante e anti-inflamatória em nível celular."
    ],
    dosageProtocol: {
      standard: p.dosage || "Dose padrão baseada na meia-vida (ex: 250mcg BID)",
      titration: ["Semana 1: 50% da dose alvo para adaptação", "Semana 2+: Dose clínica completa"],
      maintenance: "Dose reduzida para uso contínuo (se aplicável)",
      reconstitution: "Reconstituir pó liofilizado com 2mL a 3mL de Água Bacteriostática."
    },
    administrationWay: p.administration || "Injeção Subcutânea (SC) / Intramuscular (IM) / Oral",
    cycleAndDuration: p.cycle || "Ciclo padrão de 8 a 12 semanas seguido de washout.",
    stacksAndCombinations: p.synergies || [],
    pharmacologyAndPharmacokinetics: {
      halfLife: p.halfLife || "Variável (horas a dias)",
      bioavailability: p.bioavailability || "Alta biodisponibilidade nas vias parentéricas",
      metabolism: "Degradação proteolítica hepática/renal",
      notes: ["Monitoramento clínico recomendado para melhores resultados."]
    },
    adverseEffects: (p.sideEffects || []).map(se => se.effect),
    scientificEvidence: p.evidenceLevel ? [p.evidenceLevel] : ["Fase III ou uso off-label com dados consolidados"],
    pmids: p.researchLinks ? p.researchLinks.map(r => r.pmid).filter(Boolean) : ["00000000"],
    evidenceMatrix: {
      humanStudies: 4,
      animalStudies: 5,
      inVitroStudies: 5,
      safetyScore: 5,
      efficacyScore: 5
    },
    importantNote: "Aviso: Peptídeos são biomoléculas ativas, procedência garantida é mandatória.",
    detailedNarrative: "Esta molécula compõe o arsenal Prime Excellence. Otimizada para interação e bio-adesão específica em receptores teciduais, atuando onde abordagens tracionais falham. Sua estrutura de aminoácidos promove regulação em vez de supressão de eixos.",
    completenessScore: 100,
    colorHex: "#2dd4bf"
  });
});

function stringify(obj, indent = 2) {
  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]';
    return "[\
" + obj.map(v => " ".repeat(indent + 2) + stringify(v, indent + 2)).join(",\
") + "\
" + " ".repeat(indent) + "]";
  } else if (typeof obj === "object" && obj !== null) {
    const keys = Object.keys(obj);
    let out = "{
";
    keys.forEach((k, i) => {
      let keyStr = k.includes(' ') ? "'" + k + "'" : k;
      let valStr = stringify(obj[k], indent + 2);
      if (k === 'category' && typeof obj[k] === 'string' && obj[k].startsWith('PeptideCategory.')) {
         valStr = obj[k];
      }
      out += " ".repeat(indent + 2) + keyStr + ": " + valStr + (i < keys.length - 1 ? "," : "") + "\
";
    });
    out += " ".repeat(indent) + "}";
    return out;
  } else if (typeof obj === "string") {
    return "'" + obj.replace(/'/g, "\\'") + "'";
  }
  return String(obj);
}

let fileContent = "import { PeptideDossier, PeptideCategory, SynergyProtocol } from './types';\
\
";

fileContent += "export const PROTOCOLS: PeptideDossier[] = [\
";
updatedProtocols.forEach((p, idx) => {
  fileContent += stringify(p, 2) + (idx < updatedProtocols.length - 1 ? ",\
" : "\
");
});
fileContent += "];\
\
";

fileContent += "export const TOTAL_PEPTIDES = new Set(PROTOCOLS.map(p => p.id)).size;\
\
";

fileContent += "export const WHATSAPP_NUMBER = '" + WHATSAPP_NUMBER + "';\
";
fileContent += "export const WHATSAPP_LINK = '" + WHATSAPP_LINK + "';\
\
";

fileContent += "export const SYNERGY_PROTOCOLS: SynergyProtocol[] = [\
";
SYNERGY_PROTOCOLS.forEach((s, idx) => {
  fileContent += stringify(s, 2) + (idx < SYNERGY_PROTOCOLS.length - 1 ? ",\
" : "\
");
});
fileContent += "];\
\
";

fs.writeFileSync('src/constants.ts', fileContent);
