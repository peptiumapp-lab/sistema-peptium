const fs = require('fs');

let content = fs.readFileSync('src/components/Layout.tsx', 'utf8');
content = content.replace(/text-secondary\/50/g, 'text-secondary/80');
content = content.replace(/bg-white\/10 text-white\/60/g, 'bg-white/15 text-white/90');
fs.writeFileSync('src/components/Layout.tsx', content);
