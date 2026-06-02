const fs = require('fs');
let text = fs.readFileSync('src/constants.ts', 'utf8');

const rtd1Index = text.indexOf("id: 'rtd-1',");
if (rtd1Index !== -1) {
    const braceIndex = text.lastIndexOf("{", rtd1Index);
    
    let newText = text.substring(0, braceIndex);
    // ensure trailing comma isn't causing syntax error before `];`
    newText = newText.trim().replace(/,$/, '');
    newText += "\n];\n\nexport const TOTAL_PEPTIDES = 227;\nexport const SYNERGY_PROTOCOLS: any[] = [];\nexport const SUPPORT_LINK = 'https://wa.me/something';\nexport const INSTAGRAM_HANDLE = '@peptiumprime';\nexport const INSTAGRAM_LINK = 'https://instagram.com/peptiumprime';\nexport const SITE_URL = 'peptiumprime.com';\nexport const SITE_LINK = 'https://peptiumprime.com';\n";
    fs.writeFileSync('src/constants.ts', newText);
    console.log("purged rtd-1 completely.");
} else {
    console.log("Not found.");
}
