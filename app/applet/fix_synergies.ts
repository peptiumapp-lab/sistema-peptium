import fs from 'fs';
const filepath = 'src/constants.ts';
let code = fs.readFileSync(filepath, 'utf8');

const synergiesIdx = code.indexOf('export const SYNERGY_PROTOCOLS');
if (synergiesIdx === -1) {
   const altIdx = code.indexOf('export const SYNERGIES');
   if (altIdx !== -1) {
     let syncCode = code.slice(altIdx);
     syncCode = syncCode.replace(/,?(\s*)researchLinks:\s*\[[\s\S]*?\n\s*\],?/g, '');
     code = code.slice(0, altIdx) + syncCode;
   }
} else {
   let syncCode = code.slice(synergiesIdx);
   syncCode = syncCode.replace(/,?(\s*)researchLinks:\s*\[[\s\S]*?\n\s*\],?/g, '');
   code = code.slice(0, synergiesIdx) + syncCode;
}

fs.writeFileSync(filepath, code);
console.log('Fixed synergies!');
