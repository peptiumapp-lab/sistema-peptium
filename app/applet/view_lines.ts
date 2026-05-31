import fs from 'fs';
const lines = fs.readFileSync('src/constants.ts', 'utf8').split('\n');
console.log(lines.slice(43980, 44010).join('\n'));
