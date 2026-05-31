import fs from 'fs';
const code = fs.readFileSync('src/constants.ts', 'utf8');

const regex = /({\s*id: ['"][^'"]+['"][\s\S]*?)secondaryCategories:\s*\[([\s\S]*?)\]/g;
let match;
let count = 0;
while ((match = regex.exec(code)) !== null) {
  if (match[2].includes('ANTIOXIDANTE')) {
    const idMatch = match[1].match(/id: ['"]([^'"]+)['"]/);
    if(idMatch) {
       console.log(idMatch[1]);
       count++;
       if(count > 20) break;
    }
  }
}
console.log('Total found in loop:', count);
