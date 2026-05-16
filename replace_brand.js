import fs from 'fs';
import path from 'path';

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;

  content = content.replace(/SF PERFORMANCE/g, 'PEPTIUM');
  content = content.replace(/SF PERFORMANCE<span/g, 'PEPTIUM<span');
  content = content.replace(/SF Performance Prime/g, 'Peptium Prime');
  content = content.replace(/Equipe SF Performance/g, 'Equipe Peptium');
  content = content.replace(/SF PRIME/g, 'PEPTIUM PRIME');
  content = content.replace(/SF Prime/g, 'Peptium Prime');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Updated: ' + filePath);
  }
}

function traverseDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      traverseDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      replaceInFile(fullPath);
    }
  }
}

traverseDir('./src');
