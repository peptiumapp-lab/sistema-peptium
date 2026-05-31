import fs from 'fs';
const code = fs.readFileSync('src/constants.ts', 'utf8');

const regex = /({\s*id: ['"]bpc-157['"][\s\S]*?)(,?\s*})?(?=\s*(?:,|\];))/g;
let match = regex.exec(code);
if (match) {
  let block = match[1];
  let textToAnalyze = "";
  
  const extractField = (fieldName: string) => {
    const fieldRegex = new RegExp(`${fieldName}:\\s*(['"\\[][\\s\\S]*?)(?=(?:,\\s*[a-zA-Z]+:)|(?:\\s*}))`);
    const fm = block.match(fieldRegex);
    if (fm) {
       console.log(`[${fieldName}] ->`, fm[1].substring(0, 50));
       textToAnalyze += fm[1] + " ";
    }
  };
  
  extractField('name');
  extractField('tag');
  extractField('description');
  extractField('features');
  extractField('insight');
  extractField('synonyms');
  
  console.log("--- FINAL TEXT ---");
  console.log(textToAnalyze);
}
