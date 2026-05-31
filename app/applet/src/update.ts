import fs from 'fs';

const filepath = './src/constants.ts';
let code = fs.readFileSync(filepath, 'utf8');

function ensureSecondaryCat(id: string, newCat: string) {
  // Find the block from `id: 'id'` up to `category: PeptideCategory.XXX,`
  // We use [\s\S]*? to match the shortest string across newlines.
  const regex = new RegExp(`id: '${id}'[\\s\\S]*?category: PeptideCategory\\.[A-Z_]+,(?:\\s*secondaryCategories: \\[[^\\]]*\\])?`, 'g');
  
  code = code.replace(regex, (match) => {
    if (match.includes('secondaryCategories:')) {
      if (match.includes(`'${newCat}'`)) {
        console.log(`${id} already has ${newCat}`);
        return match;
      }
      console.log(`Adding to existing array in ${id}: ${newCat}`);
      return match.replace(/]/, `, '${newCat}']`);
    } else {
      console.log(`Creating array in ${id} for: ${newCat}`);
      return match + `\n    secondaryCategories: ['${newCat}'],`;
    }
  });
}

const gordura = [
  'retatrutida', 'tirzepatida', 'semaglutida', 'tesamorelina', 
  'survodutide', 'mazdutide', 'aod-9604', 'ipamorelin-cjc', 
  'fragment-176-191'
];
gordura.forEach(p => ensureSecondaryCat(p, 'GORDURA VISCERAL'));

const inflamacao = [
  'bpc-157', 'tb-500', 'kpv', 'll-37', 'vip', 'ara-290'
];
inflamacao.forEach(p => ensureSecondaryCat(p, 'INFLAMAÇÃO'));

fs.writeFileSync(filepath, code);
console.log('Done!');
