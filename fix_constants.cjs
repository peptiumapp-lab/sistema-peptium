const fs = require('fs');
let content = fs.readFileSync('src/constants.ts', 'utf-8');

const newSynergy = `export const SYNERGY_PROTOCOLS: SynergyProtocol[] = [
  { id: 'sn-1', name: 'Wolverine Stack', target: 'Regeneração Extrema', peptides: ['BPC-157', 'TB-500'], description: 'Protocolo padrão-ouro para cura acelerada, recuperação de lesões musculares e articulares. Efeito sinérgico potente na angiogênese e modulação inflamatória.', duration: '4 - 8 semanas', benefits: ['Regeneração Tecidual', 'Redução de Dor', 'Recuperação Articular'], icon: 'Shield' },
  { id: 'sn-2', name: 'God Mode Stack', target: 'Foco e Cognição', peptides: ['Semax', 'Selank', 'Cerebrolysin'], description: 'Combinação focada em neurogênese profunda, hiperfoco a laser e redução de névoa mental. Melhora o processamento cognitivo sob estresse.', duration: '3 - 6 semanas', benefits: ['Foco a Laser', 'Neuroproteção', 'Memória Otimizada'], icon: 'Brain' },
  { id: 'sn-3', name: 'Fountain of Youth', target: 'Longevidade & Anti-Aging', peptides: ['Epitalon', 'GHK-Cu', 'MOTS-c'], description: 'Protocolo avançado focado na modulação de telômeros, integridade do DNA, expressão gênica saudável e otimização mitocondrial. Reverte biomarcadores de envelhecimento.', duration: '8 - 12 semanas', benefits: ['Extensão de Telômeros', 'Pele Jovem', 'Energia Celular'], icon: 'Sparkles' },
  { id: 'sn-4', name: 'Alpha Shred', target: 'Quebra de Gordura', peptides: ['CJC-1295', 'Ipamorelin', 'AOD-9604', 'Tesofensine'], description: 'Aceleração brutal do metabolismo basal e lipólise. Atua de forma dupla aumentando o GH pulsátil periférico e ativando o eixo metabólico diretamente.', duration: '8 - 16 semanas', benefits: ['Lipólise Extrema', 'Preservação Muscular', 'Apetite Reduzido'], icon: 'Zap' },
  { id: 'sn-5', name: 'Titan Muscle', target: 'Hipertrofia Acelerada', peptides: ['IGF-1 LR3', 'PEG MGF', 'CJC-1295 DAC'], description: 'Gatilho anabólico persistente e proliferação de células satélites. Aumenta hiperplasia muscular de forma duradoura para rompimento de platô.', duration: '4 - 6 semanas', benefits: ['Volume Muscular', 'Hiperplasia', 'Força Absoluta'], icon: 'Activity' },
  { id: 'sn-6', name: 'Iron Immune', target: 'Otimização Imunológica', peptides: ['Thymosin Alpha-1', 'LL-37', 'KPV'], description: 'Reconstrução da imunidade celular, eliminação de patógenos ocultos e modulação imunológica anti-inflamatória em doenças crônicas ou autoimunes.', duration: '6 semanas', benefits: ['Combate a Patógenos', 'Modulação Autoimune', 'Sistema Imune Blindado'], icon: 'ShieldAlert' },
  { id: 'sn-7', name: 'Vulcan Sleep', target: 'Sono Profundo & Reparo', peptides: ['DSIP', 'Epitalon'], description: 'Restaura a arquitetura circadiana e promove ondas delta prolongadas no sono, o que maximiza a recuperação neurológica e a liberação de GH endógeno.', duration: '2 - 4 semanas', benefits: ['Sono Reparador', 'Ondas Delta', 'Ajuste Circadiano'], icon: 'Star' },
  { id: 'sn-8', name: 'Gut Restorer', target: 'Saúde Intestinal', peptides: ['BPC-157 ARG', 'KPV', 'Larazotide Acetate'], description: 'Reparo focado na permeabilidade intestinal (Leaky Gut), remissão em síndromes inflamatórias e reparação direta da mucosa gastrointestinal.', duration: '8 semanas', benefits: ['Reparo Mucoso', 'Anti-Leaky Gut', 'Microbioma'], icon: 'Hexagon' },
  { id: 'sn-9', name: 'Apollo Aesthetics', target: 'Pele e Bronzeado', peptides: ['Melanotan II', 'GHK-Cu', 'PT-141'], description: 'Estimulação profunda de melanócitos somada a colagenogênese capilar e epidérmica. Proporciona bronzeado saudável, brilho cutâneo e libido revitalizada.', duration: 'Contínuo', benefits: ['Pele Bronzeada', 'Colágeno Duplo', 'Aumento de Libido'], icon: 'CheckCircle2' },
  { id: 'sn-10', name: 'Limitless Energy', target: 'Otimização Mitocondrial', peptides: ['SS-31', 'MOTS-c', 'NAD+'], description: 'Desbloqueio metabólico focado na respiração intracelular em mitocôndrias disfuncionais. Eliminação da fadiga crônica persistente no nível subcelular.', duration: '6 semanas', benefits: ['Cardio Otimizado', 'Resistência', 'Fadiga Zero'], icon: 'Zap' },
  { id: 'sn-11', name: 'Elysium Mood', target: 'Elevador de Humor', peptides: ['Selank', 'PE-22-28', 'Tianeptine'], description: 'Modulação de receptores serotoninérgicos e dopaminérgicos sem os efeitos colaterais de SSRIs clássicos. Retira a névoa mental associada com anedonia.', duration: '4 semanas', benefits: ['Abolição de Ansiedade', 'Anedonia Zero', 'Estabilidade Mental'], icon: 'Star' },
  { id: 'sn-12', name: 'Cardio Shield', target: 'Saúde Cardiovascular', peptides: ['TB-500', 'GHK-Cu', 'Cerebrolysin'], description: 'Focado em elasticidade endotelial, reparo microvascular e reversão do envelhecimento cardiovascular primário.', duration: '12 semanas', benefits: ['Elasticidade Endotelial', 'Fluxo Sanguíneo', 'Proteção Cardíaca'], icon: 'Activity' }
];`;

content = content.replace(/export const TOTAL_PEPTIDES = [0-9]+;/, 'export const TOTAL_PEPTIDES = 560;');

const synergyRegex = /export const SYNERGY_PROTOCOLS:\s*SynergyProtocol\[\]\s*=\s*\[[^]*?\];/g;
const synergyRegex2 = /export const SYNERGY_PROTOCOLS\s*=\s*[0-9]+;/g;

if (content.match(synergyRegex)) {
  content = content.replace(synergyRegex, newSynergy);
} else if (content.match(synergyRegex2)) {
  content = content.replace(synergyRegex2, newSynergy);
} else {
  content += '\n' + newSynergy;
}

fs.writeFileSync('src/constants.ts', content);
