import fs from 'fs';
const code = fs.readFileSync('src/constants.ts', 'utf8');
const match = code.match(/id: ['"]bpc-157['"][\s\S]*?(?=id: )/);
console.log('Did it match bpc-157?', !!match);
if (match) {
  let block = match[0];
  let textToAnalyze = "";
  
  const extractField = (fieldName: string) => {
    const fieldRegex = new RegExp(`${fieldName}:\\s*(['"\\[][\\s\\S]*?)(?:,(?:\\s|\n)*[a-zA-Z]+:|\\n\\s*})`);
    const fm = block.match(fieldRegex);
    if (fm) {
       console.log(`[${fieldName}] -> matched!`);
       textToAnalyze += fm[1] + " ";
    } else {
       console.log(`[${fieldName}] -> failed!`);
    }
  };
  
  extractField('name');
  extractField('tag');
  extractField('description');
  extractField('features');
  extractField('insight');
  extractField('synonyms');
  
  console.log("--- FINAL TEXT ---");
  console.log(textToAnalyze.substring(0, 500));
}
