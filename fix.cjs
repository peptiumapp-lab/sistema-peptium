const fs = require('fs');
let content = fs.readFileSync('src/constants.ts', 'utf8');

content = content.replace(/'\{/g, "{");
content = content.replace(/'\[/g, "[");
content = content.replace(/'\]/g, "]");
content = content.replace(/'\}/g, "}");
content = content.replace(/'\s+id:/g, "id:");
content = content.replace(/'\s+name:/g, "name:");
content = content.replace(/'([^']+?)':/g, (match, g1) => {
  if (!g1.includes(' ')) {
    return g1.trim() + ':';
  }
  return match;
});
content = content.replace(/'([a-zA-Z0-9_]+)':/g, "$1:");

// let's also remove leading single quotes from any line
content = content.replace(/^\s*'(?!\s*const)/gm, (match) => {
  return match.replace(/'/, '');
});

fs.writeFileSync('src/constants.ts', content);
console.log('Fixed quotes broadly');
