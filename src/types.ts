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
  CARDIOMETABOLICO = 'CARDIOMETABÓLICO'
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

export interface SupplementInfo {
  nutrient: string;
  dose?: string;
  reason: string;
}

export interface CofactorInfo {
  cofactor: string;
  reason: string;
  importance: 'critical' | 'important' | 'moderate';
}

export interface TimelinePhase {
  duration: string;
  phase: string;
  expectedEffects: string[];
}

export interface Complication {
  effect: string;
  description: string;
}

export interface PeptideDossier {
  // Base Identifiers
  id: string; // Slug em minúsculas (ex: bpc-157)
  name: string; // Nome Completo + Sigla
  category: PeptideCategory; // Categoria principal (Enum)
  secondaryCategories?: string[]; // Opcional: Categorias relacionadas
  synonyms?: string[]; // Nomes alternativos ou códigos de laboratório
  class: string; // (ex: Pentadecapeptídeo Gastrostável)
  
  // Visão Geral Estratégica
  whatItIs?: string;
  makesSenseFor?: string[];
  doesNotMakeSenseFor?: string[];

  // Reconstitution
  reconstitutionAlert?: ReconstitutionAlert;

  // Imagem para a UI
  image: string;
  tag: string; // Retrocompatibilidade UI
  description: string; // Retrocompatibilidade UI
  features: string[]; // Retrocompatibilidade UI

  // Mecanismos e Benefícios
  mechanismOfAction: string[];
  technicalMechanism?: string; // Mecanismo técnico detalhado (nível avançado)
  clinicalBenefits: string[];
  
  // O Que Esperar - Linha do Tempo
  timeline?: TimelinePhase[];

  // Protocolo de Dosagem Prime
  dosageProtocol: {
    standard: string;
    titration: string[];
    maintenance?: string;
    reconstitution: string;
    shelfLifeReconstituted?: string;
  };

  // Detalhes Operacionais
  administrationWay: string;
  cycleAndDuration: string;
  stacksAndCombinations?: string[]; // IDs de Peptídeos Sinergistas
  strategicCombinations?: { name: string, reason: string }[]; // Combinações Específicas Detalhadas
  advancedClinicalProtocol?: string; // Protocolos táticos fechados (e.g. Protocolo RE-SET)

  // Cofatores e Suplementação
  requiredSupplements?: SupplementInfo[];
  recommendedSupplements?: SupplementInfo[];
  toAvoid?: { substance: string; reason: string }[];
  criticalCofactors?: CofactorInfo[];

  // Riscos e Mitigações
  commonErrors?: string[];
  mildComplications?: Complication[];
  moderateComplications?: Complication[];
  severeComplications?: Complication[];

  // Farmacologia Avançada
  pharmacologyAndPharmacokinetics: {
    halfLife: string;
    bioavailability: string;
    metabolism: string;
    sinalizacao?: string;
    picoClinico?: string;
    picoBiologico?: string;
    notes?: string[];
  };

  // Evidências e Efeitos Adversos
  adverseEffects: string[];
  sideEffectsAndMitigation?: { effect: string; mitigation: string; risk?: 'low' | 'medium' | 'high' }[];
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
