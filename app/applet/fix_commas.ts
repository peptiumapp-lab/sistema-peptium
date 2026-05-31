import fs from 'fs';
const filepath = 'src/constants.ts';
let code = fs.readFileSync(filepath, 'utf8');

code = code.replace(/\]\s+researchLinks:/g, '],\n    researchLinks:');

fs.writeFileSync(filepath, code);
console.log('Fixed commas!');
