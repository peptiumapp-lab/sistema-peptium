export interface SideEffect {
  effect: string;
  mitigation: string;
}

export interface Interaction {
  substance: string;
  risk: 'low' | 'medium' | 'high';
  warning: string;
}

export enum PeptideCategory {
  PERFORMANCE = 'Performance',
  LONGEVIDADE = 'Longevidade',
  ESTETICA = 'Estética',
  RECUPERACAO = 'Recuperação',
  COGNICAO = 'Cognição',
  METABOLISMO = 'Metabolismo',
  IMUNOLOGIA = 'Imunologia',
  CARDIOVASCULAR = 'Cardiometabólico',
  SEXUAL = 'Sexual',
  ONCOLOGIA = 'Oncologia',
  OUTROS = 'Outros'
}

export interface PeptideDossier {
  // Base Identifiers
  id: string; // Slug em minúsculas (ex: bpc-157)
  name: string; // Nome Completo + Sigla
  category: PeptideCategory; // Categoria principal (Enum)
  secondaryCategories?: string[]; // Opcional: Categorias relacionadas
  synonyms?: string[]; // Nomes alternativos ou códigos de laboratório
  class: string; // (ex: Pentadecapeptídeo Gastrostável)
  
  // Imagem para a UI (Retrocompatibilidade)
  image: string;
  tag: string; // Retrocompatibilidade UI
  description: string; // Retrocompatibilidade UI
  features: string[]; // Retrocompatibilidade UI

  // Mecanismos e Benefícios
  mechanismOfAction: string[];
  clinicalBenefits: string[];

  // Protocolo de Dosagem Prime
  dosageProtocol: {
    standard: string;
    titration: string[];
    maintenance?: string;
    reconstitution: string;
  };

  // Detalhes Operacionais
  administrationWay: string;
  cycleAndDuration: string;
  stacksAndCombinations?: string[]; // IDs de Peptídeos Sinergistas

  // Farmacologia Avançada
  pharmacologyAndPharmacokinetics: {
    halfLife: string;
    bioavailability: string;
    metabolism: string;
    notes?: string[];
  };

  // Evidências e Efeitos Adversos
  adverseEffects: string[];
  scientificEvidence: string[];
  pmids: string[];
  
  // Matriz de Evidência SF
  evidenceMatrix: {
    humanStudies: number;
    animalStudies: number;
    inVitroStudies: number;
    safetyScore: number;
    efficacyScore: number;
  };

  importantNote: string;
  detailedNarrative: string;
  completenessScore: number;
  colorHex: string;
  
  // Retrocompatibilidade UI (onde for muito difícil remover por enquanto)
  synergies?: string[];
  researchLinks?: { title: string; url: string; pmid?: string }[];
  sideEffects?: SideEffect[];
  interactions?: Interaction[];
  
  // Backwards compatibility with the old properties used in UI
  mechanism?: string;
  dosage?: string;
  administration?: string;
  protocol?: string;
  halfLife?: string;
  bioavailability?: string;
  evidenceLevel?: string;
  regulatoryStatus?: {
    fda: string;
    anvisa: string;
    ema: string;
  };
  insight?: string;
  molecularTarget?: string;
  clinicalEfficacy?: string[];
  cycle?: string;
  clinicalBenefitsCategorized?: Record<string, string[]>;
  secondaryTags?: string[];
}
