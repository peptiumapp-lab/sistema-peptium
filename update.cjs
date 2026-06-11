const fs = require('fs');

const components = [
  'AdminDashboard', 'HowToUse', 'CycleSchedule', 'BioHackingMap', 
  'LabScanner', 'LongevityClock', 'FastingTracker', 'CyclePlanner', 
  'GenomeAnalyzer', 'MicrobiomeTracker', 'NeuroMatrix', 'CofreAtlas'
];

components.forEach(comp => {
  const path = `src/components/${comp}.tsx`;
  if (!fs.existsSync(path)) return;
  
  let content = fs.readFileSync(path, 'utf8');
  
  if (!content.includes('import type { View }')) {
    content = 'import type { View } from \'../App\';\n' + content;
  }

  const regex = new RegExp(`export default function ${comp}\\s*\\(\\s*([^)]*)\\s*\\)\\s*{`);
  const regex2 = new RegExp(`export function ${comp}\\s*\\(\\s*([^)]*)\\s*\\)\\s*{`);

  let matchList = content.match(regex) || content.match(regex2);
  
  if (matchList && !content.includes(`interface ${comp}Props`)) {
    const isExportDefault = !!content.match(regex);
    const existingArgs = matchList[1].trim();
    
    // For standalone cases
    let propsType = '';
    let propsDestruction = '{ setView }';
    if (existingArgs === '{ isStandalone }' || existingArgs === '{ isStandalone = false }') {
       propsType = `\ninterface ${comp}Props {\n  setView?: (view: View) => void;\n  isStandalone?: boolean;\n}\n`;
       propsDestruction = '{ setView, isStandalone }';
    } else {
       propsType = `\ninterface ${comp}Props {\n  setView?: (view: View) => void;\n}\n`;
    }
    
    content = content.replace(matchList[0], propsType + (isExportDefault ? `export default function ${comp}(${propsDestruction}: ${comp}Props) {` : `export function ${comp}(${propsDestruction}: ${comp}Props) {`));
  }

  if (!content.includes('Voltar para a Home') && !content.includes('Voltar para o Cofre')) {
    content = content.replace(/(return\s*\(\s*<div[^>]*>)/, `$1\n      {setView && (
        <button 
          onClick={() => setView('home')}
          className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-secondary/60 hover:text-accent transition-all group mb-4 px-4 pt-4 z-50 relative"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left group-hover:-translate-x-1 transition-transform"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          Voltar para a Home
        </button>
      )}\n`);
  }
  
  fs.writeFileSync(path, content);
});
