import fs from 'fs';

const filepath = './src/constants.ts';
let code = fs.readFileSync(filepath, 'utf8');

function addSecondaryCategory(id, newCat) {
  const marker = `id: '${id}',`;
  const index = code.indexOf(marker);
  if (index === -1) {
    console.log(`id ${id} not found`);
    return;
  }
  
  const secCatStartStr = `secondaryCategories: [`;
  let secCatStart = code.indexOf(secCatStartStr, index);
  const nextIdStart = code.indexOf(`id: '`, index + 10);
  
  if (secCatStart !== -1 && (nextIdStart === -1 || secCatStart < nextIdStart)) {
    // Array exists
    const secCatEnd = code.indexOf(']', secCatStart);
    const existingStr = code.slice(secCatStart, secCatEnd + 1);
    if (!existingStr.includes(newCat)) {
      if (existingStr.includes("['")) {
        // inline 
        code = code.replace(existingStr, existingStr.replace(']', `, '${newCat}']`));
      } else {
        // multiline
        code = code.replace(existingStr, existingStr.replace(']', `  '${newCat}',\n    ]`));
      }
      console.log(`Added ${newCat} to ${id} (updated)`);
    } else {
      console.log(`${id} already has ${newCat}`);
    }
  } else {
    // try to find where to put it
    const categoryStartStr = `category: `;
    const catStart = code.indexOf(categoryStartStr, index);
    if(catStart !== -1 && (nextIdStart === -1 || catStart < nextIdStart)) {
      const newLineIdx = code.indexOf('\n', catStart);
      const toInject = `\n    secondaryCategories: ['${newCat}'],`;
      code = code.slice(0, newLineIdx) + toInject + code.slice(newLineIdx);
      console.log(`Added ${newCat} to ${id} (created array)`);
    } else {
        console.log(`Category missing for ${id}`);
    }
  }
}

// GORDURA VISCERAL
const gorduraPeptides = [
  'retatrutida', 'tirzepatida', 'semaglutida', 'tesamorelin', 
  'survodutide', 'mazdutide', 'aod9604', 'cjc-1295-dac', 
  'cjc-1295-no-dac', 'frag-176-191'
];
gorduraPeptides.forEach(p => addSecondaryCategory(p, 'GORDURA VISCERAL'));

// INFLAMAÇÃO
const inflamacaoPeptides = [
  'bpc-157', 'tb-500', 'kpv', 'thymosin-alpha-1', 'll-37',
  'vip', 'ara-290'
];
inflamacaoPeptides.forEach(p => addSecondaryCategory(p, 'INFLAMAÇÃO'));

fs.writeFileSync(filepath, code);
console.log("Done!");
