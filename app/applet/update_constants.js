const fs = require('fs');
const content = fs.readFileSync('src/constants.ts', 'utf8');

const os01Snippet = `{
    id: 'os-01',
    name: 'OS-01',
    tag: 'Longevidade & Mitocôndria ⚡',
    description: 'Ativador Pan-AMPK completo, o "interruptor mestre" para biogênese mitocondrial e mitofagia.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop',
    features: ['Ativador Pan-AMPK', 'Biogênese Mitocondrial', 'Mitofagia'],
    insight: 'Aumenta profundamente a resiliência celular.',
    halfLife: 'Não definido',
    bioavailability: 'Oral (Cápsulas)',
    molecularTarget: '12 isoformas da AMPK',
    evidenceLevel: 'ESTUDO CLÍNICO INICIAL',
    mechanism: 'Ativa todas as 12 formas de AMPK, aumentando a biogênese mitocondrial, mitofagia, oxidação de gordura e sensibilidade à insulina.',
    dosage: '0.5 mg/kg base, cápsulas de 100mg diárias.',
    administration: 'Oral',
    protocol: 'Ciclos de 4 a 8 semanas, seguidos por uma pausa equivalente.',
    sideEffects: [],
    synergies: ['ss-31', 'mots-c'],
    researchLinks: [],
    category: PeptideCategory.METABOLISM,
    secondaryCategories: ['LONGEVITY', 'METABOLISM'],
    synonyms: ['OS-01', 'Pan-AMPK Activator'],
    class: 'AMPK Activator',
    mechanismOfAction: ['Ativa todas as 12 isoformas da AMPK.', 'Acelera a mitofagia e biogênese mitocondrial.']
  },
`;

const updatedContent = content.replace("export const PROTOCOLS: PeptideDossier[] = [\n", "export const PROTOCOLS: PeptideDossier[] = [\n" + os01Snippet);
fs.writeFileSync('src/constants.ts', updatedContent);
console.log('OS-01 Added successfully');
