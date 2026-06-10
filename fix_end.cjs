const fs = require('fs');
let text = fs.readFileSync('src/constants.ts', 'utf8');
const idrIdx = text.indexOf("{\n    id: 'idr-1018',");
if (idrIdx > -1) {
  text = text.substring(0, idrIdx);
  text += '];\n\n' +
    'export const SYNERGY_PROTOCOLS: any[] = [];\n' +
    'export const TOTAL_PEPTIDES = 560;\n' + 
    'export const SUPPORT_LINK = \'https://wa.me/something\';\n' +
    'export const INSTAGRAM_HANDLE = \'@peptiumprime\';\n' +
    'export const INSTAGRAM_LINK = \'https://instagram.com/peptiumprime\';\n' +
    'export const SITE_URL = \'peptiumprime.com\';\n' +
    'export const SITE_LINK = \'https://peptiumprime.com\';\n';
  fs.writeFileSync('src/constants.ts', text);
  console.log('Fixed end of file');
} else {
  console.log('Could not find idr-1018');
}
