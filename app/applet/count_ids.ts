import fs from 'fs';
const code = fs.readFileSync('src/constants.ts', 'utf8');
console.log('Total IDs:', (code.match(/id:\s*['"]/g) || []).length);
