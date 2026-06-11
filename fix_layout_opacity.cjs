const fs = require('fs');

let content = fs.readFileSync('src/components/Layout.tsx', 'utf8');
content = content.replace(/text-secondary\/80/g, 'text-secondary/90');
content = content.replace(/text-white\/80/g, 'text-white/90');
content = content.replace(/text-white\/60/g, 'text-white/80');
fs.writeFileSync('src/components/Layout.tsx', content);
