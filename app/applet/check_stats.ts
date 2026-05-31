import fs from 'fs';

const code = fs.readFileSync('./src/constants.ts', 'utf8');

const getTags = (regex) => (code.match(regex) || []).length;

console.log('ANTIOXIDANTE:', getTags(/ANTIOXIDANTE/g));
console.log('BIO_REPARO:', getTags(/BIO[-_]REPARO/g));
console.log('OSTEOGENESE:', getTags(/OSTEOG[EÊ]NESE/g));
console.log('SARCOPENIA:', getTags(/SARCOPENIA/g));
console.log('NEUROPROTECAO:', getTags(/NEUROPROTE[CÇ][AÃ]O/g));
console.log('SONO:', getTags(/SONO/g));
console.log('DOPAMINA:', getTags(/DOPAMINA/g));
console.log('FOCO HD:', getTags(/FOCO HD/g));
