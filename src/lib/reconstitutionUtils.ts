import { ReconstitutionAlert } from '../types';

export function getReconstitutionAlert(id: string, name: string): ReconstitutionAlert | undefined {
  const normalizedId = id.toLowerCase();
  const normalizedName = name.toLowerCase();
  const searchString = `${normalizedId} ${normalizedName}`;

  // A) AOD-9604 / HGH Frag 176-191 / SLU-PP-332
  if (
    searchString.includes('frag-176-191') ||                
    searchString.includes('hgh-fragment') ||                
    searchString.includes('gh-frag') ||                     
    searchString.includes('aod') ||                         
    searchString.includes('slu-pp') ||                      
    searchString.includes('slupp')
  ) {
    return {
      diluent: 'Ácido Acético',
      instruction: 'Reconstituição conforme protocolo específico de ácidos.',
      reason: 'A molécula é instável e o ácido acético evita a vitrificação e perda de eficácia. Para o SLU-PP, aumenta a solubilidade, evitando falha na diluição.'
    };
  }

  // B) Fatores de Crescimento Instáveis (IGF-1, IGF-2, Mechano, MGF)
  if (
    searchString.includes('igf-1') ||
    searchString.includes('igf-2') ||
    searchString.includes('mechano') ||
    searchString.includes('mgf')
  ) {
    return {
      diluent: 'Ácido Acético (0.6%)',
      instruction: 'Diluição com extremo cuidado para evitar adesão às paredes do frasco.',
      reason: 'Estes fatores aderem facilmente às paredes de vidro. O ácido acético previne a perda de potência e aumenta a meia-vida no frasco.'
    };
  }

  // C) Inibidores da Miostatina e Proteínas Grandes (Follistatin, ACE-031, Trevogrumab, Bimagrumab)
  if (
    searchString.includes('follistatin') ||
    searchString.includes('ace-031') ||
    searchString.includes('trevogrumab') ||
    searchString.includes('bimagrumab')
  ) {
    return {
      diluent: 'Água Bacteriostática',
      instruction: 'Diluir extremamente lentamente. NUNCA espirre a água diretamente no pó. NUNCA agite o frasco (rolar ou rodar levemente apenas).',
      reason: 'As ligações moleculares são extremamente frágeis e podem ser destruídas por trauma físico (agitação).'
    };
  }

  // D) Peptídeos Estáveis Populares (BPC-157, GHK-Cu, PT-141, Melanotan, Semax, Selank, TB-500)
  if (
    searchString.includes('bpc-157') ||
    searchString.includes('ghk-cu') ||
    searchString.includes('pt-141') ||
    searchString.includes('melanotan') ||
    searchString.includes('semax') ||
    searchString.includes('selank') ||
    searchString.includes('tb-500')
  ) {
    return {
      diluent: 'Água Bacteriostática',
      instruction: 'Reconstituição padrão com água bacteriostática.',
      reason: 'Moléculas estáveis onde a água bacteriostática garante preservação prolongada (30 a 60 dias) com alta segurança térmica.'
    };
  }

  // E) Todos os Restantes (Padrão / Default)
  return {
    diluent: 'Água Bacteriostática',
    instruction: 'Reconstituição padrão com água bacteriostática.',
    reason: 'A maioria dos liofilizados utiliza água bacteriostática por oferecer excelente estabilidade térmica e segurança para via subcutânea.'
  };
}
