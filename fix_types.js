const fs = require('fs');
let text = fs.readFileSync('src/constants.ts', 'utf8');
text = text.replace("category: 'Longevidade',", "category: PeptideCategory.LONGEVIDADE,");
text = text.replace("halfLife: 'indefinida',", "");
text = text.replace("dosingGuidelines: 'Seguir protocolos clinicos em sepse.',", "dosageProtocol: { standard: '', titration: [], reconstitution: '' },");
text = text.replace("sideEffects: [{ impact: 'Baixo', description: 'Cefaleia' }],", "administrationWay: 'SC',\ncycleAndDuration: '',\npharmacologyAndPharmacokinetics: { halfLife: 'indefinida', clearance: '' },\ninteractionsAndAdverseEffects: { interactions: [], warnings: [], adverseEffects: [{effect: 'Cefaleia', mitigation: ''}] },\nmedicalAndScientificObservations: [],");
text = text.replace("export const SYNERGY_PROTOCOLS = 50;", "export const SYNERGY_PROTOCOLS: any[] = [];");
fs.writeFileSync('src/constants.ts', text);
console.log("Fixed!");
