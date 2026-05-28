export interface SideEffect {
  effect: string;
  mitigation: string;
}

export interface Interaction {
  substance: string;
  risk: 'low' | 'medium' | 'high';
  warning: string;
}

export interface ReconstitutionAlert {
  diluent: string;
  instruction: string;
  reason: string;
}

export enum PeptideCategory {
  RECUPERACAO = 'RECUPERAÇÃO',
  COGNICAO = 'COGNIÇÃO',
  LONGEVIDADE = 'LONGEVIDADE',
  PERFORMANCE = 'PERFORMANCE',
  METABOLISMO = 'METABOLISMO',
  ESTETICA = 'ESTÉTICA',
  IMUNOLOGIA = 'IMUNOLOGIA',
  SEXUAL = 'SEXUAL',
  NEUROPROTECAO = 'NEUROPROTEÇÃO',
  SARCOPENIA = 'SARCOPENIA',
  CICATRIZACAO = 'CICATRIZAÇÃO',
  SONO = 'SONO',
  GLICEMIA = 'GLICEMIA',
  VASCULAR = 'VASCULAR',
  INFLAMACAO = 'INFLAMAÇÃO',
  DOPAMINA = 'DOPAMINA',
  FOCO_HD = 'FOCO HD',
  MASSA_MAGRA = 'MASSA MAGRA',
  GORDURA_VISCERAL = 'GORDURA VISCERAL',
  BIO_REPARO = 'BIO-REPARO',
  OSTEOGENESE = 'OSTEOGÊNESE',
  ANTIOXIDANTE = 'ANTIOXIDANTE',
  NEURAL = 'NEURAL',
  DIGESTIVO = 'DIGESTIVO',
  CARDIOMETABOLICO = 'CARDIOMETABÓLICO',
  CARDIOMETABÓLICO = 'CARDIOMETABÓLICO'
}

export interface SynergyProtocol {
  id: string;
  name: string;
  target: string;
  peptides: string[];
  description: string;
  duration: string;
  benefits: string[];
  icon?: string;
  warning?: string;
  dosageInstructions?: string;
  administrationMode?: string;
  scientificBasis?: string[];
  clinicalMarkers?: string[];
}

export interface PeptideDossier {
  // Base Identifiers
  id: string; // Slug em minúsculas (ex: bpc-157)
  name: string; // Nome Completo + Sigla
  category: PeptideCategory; // Categoria principal (Enum)
  secondaryCategories?: string[]; // Opcional: Categorias relacionadas
  synonyms?: string[]; // Nomes alternativos ou códigos de laboratório
  class: string; // (ex: Pentadecapeptídeo Gastrostável)
  
  // Reconstitution - ADDED
  reconstitutionAlert?: ReconstitutionAlert;

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
