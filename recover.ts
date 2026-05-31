import fs from 'fs';

const filepath = 'src/constants.ts';
let code = fs.readFileSync(filepath, 'utf8');

code += "r potencial adversos'\n      ]\n    },\n    adverseEffects: [],\n    scientificEvidence: [],\n    pmids: [],\n    evidenceMatrix: { humanStudies: 3, animalStudies: 4, inVitroStudies: 5, safetyScore: 4, efficacyScore: 4 },\n    importantNote: '',\n    detailedNarrative: '',\n    completenessScore: 50,\n    colorHex: '#FFFFFF'\n  }\n];\n\nexport const SYNERGY_PROTOCOLS = [];\nexport const TOTAL_PEPTIDES = PROTOCOLS.length;\nexport const SUPPORT_LINK = 'https://wa.me/xxx';\nexport const INSTAGRAM_LINK = 'https://instagram.com/xxx';\nexport const SITE_LINK = 'https://xxx.com';\n";

fs.writeFileSync(filepath, code);
console.log("Recovered file ends!");
