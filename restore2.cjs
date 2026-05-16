const fs = require('fs');
let lines = fs.readFileSync('src/constants.ts', 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];

  const match = line.match(/^(\\s*)([0-9a-zA-ZÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÂÊÎÔÛâêîôûÃÕãõÇç"\\-].*?)',$/);
  if (match) {
    if (!line.includes(": '") && !line.match(/^\\s*'?(\\w+)'?:\\s*\\{/)) {
       lines[i] = match[1] + "'" + match[2] + "',";
    }
  }

  const match2 = line.match(/^(\\s*)([0-9a-zA-ZÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÂÊÎÔÛâêîôûÃÕãõÇç"\\-].*?)'$/);
  if (match2) {
    if (!line.includes(": '") && !line.match(/^\\s*'?(\\w+)'?:\\s*\\{/)) {
       lines[i] = match2[1] + "'" + match2[2] + "'";
    }
  }
}
fs.writeFileSync('src/constants.ts', lines.join('\n'));
console.log('Restored array items');
