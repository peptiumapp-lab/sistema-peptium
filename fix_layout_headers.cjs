const fs = require('fs');

let content = fs.readFileSync('src/components/Layout.tsx', 'utf8');
content = content.replace(/text-white\/60 uppercase tracking/g, 'text-secondary/80 uppercase tracking');
fs.writeFileSync('src/components/Layout.tsx', content);
