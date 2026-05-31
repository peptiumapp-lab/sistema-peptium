import fs from 'fs';
const code = fs.readFileSync('src/constants.ts', 'utf8');
const bpc = code.match(/id: ['"]bpc-157['"][\s\S]*?(?=id: )/);
console.log(bpc ? bpc[0] : 'not found');
