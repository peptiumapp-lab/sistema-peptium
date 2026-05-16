import fs from 'fs';
let content = fs.readFileSync('src/constants.ts', 'utf8');

content = content.replace(/'\\{/g, "{");
content = content.replace(/'\\[/g, "[");
content = content.replace(/'\\]/g, "]");
content = content.replace(/'\\}/g, "}");
content = content.replace(/'\\s+id:/g, "id:");
content = content.replace(/'\\s+name:/g, "name:");
content = content.replace(/'([^']+?)':/g, (match, g1) => {
  // if g1 has NO spaces, unquote it
  if (!g1.includes(' ')) {
    return g1.trim() + ':';
  }
  return match;
});
// also fix `      'title':` which was originally `      title:`
content = content.replace(/'([a-zA-Z0-9_]+)':/g, "$1:");

fs.writeFileSync('src/constants.ts', content);
console.log('Fixed quotes broadly');
