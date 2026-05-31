import fs from 'fs';
const code = fs.readFileSync('src/constants.ts', 'utf8');

const regex = /({\s*id: ['"][^'"]+['"][\s\S]*?)secondaryCategories:\s*\[([\s\S]*?)\]/g;
let match;
let antiCount = 0;
let bioreparoCount = 0;
while ((match = regex.exec(code)) !== null) {
  if (match[2].includes('ANTIOXIDANTE')) antiCount++;
  if (match[2].includes('BIO-REPARO')) bioreparoCount++;
}
console.log('ANTIOXIDANTE in array:', antiCount);
console.log('BIO-REPARO in array:', bioreparoCount);
