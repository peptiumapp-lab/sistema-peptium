import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Zap, Shield, Target, Microscope, ArrowLeft, ArrowRight, Sparkles, Beaker, Syringe, Droplets, Lock, AlertTriangle, FileText, ChevronRight, Crown, Check, Activity, LogIn } from 'lucide-react';
import PeptideArticle from './PeptideArticle';
import ProGate from './ProGate';
import ReconstitutionArticle from './articles/ReconstitutionArticle';
import InjectionArticle from './articles/InjectionArticle';
import { useAuth } from '../contexts/AuthContext';
import { signInWithGoogle } from '../lib/firebase';

interface PeptideGuideProps {
  setView: (view: any) => void;
}

export default function PeptideGuide({ setView }: PeptideGuideProps) {
  const [activeArticle, setActiveArticle] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'guides' | 'studies' | 'safety'>('guides');
  const [safetySubTab, setSafetySubTab] = useState<'effects' | 'exams' | 'risks'>('effects');
  const [completedExams, setCompletedExams] = useState<string[]>([]);
  const { user, isPro: isPremium } = useAuth();

  const technicalGuides = [
    {
      id: 'pen-load',
      title: "Como Carregar uma Caneta de Peptídeos: Guia Passo a Passo",
      category: "Recuperação",
      type: "PRO",
      icon: <FileText size={20} />,
    },
    {
      id: 'nasal-prep',
      title: "Preparo de Spray Nasal: Selank & Semax (Fórmula Conforto)",
      category: "Nootrópicos",
      type: "PRO",
      icon: <Droplets size={20} />,
    },
    {
      id: 'ghk-cu',
      title: "GHK-Cu: Protocolos Tópicos para Pele e Cabelo",
      category: "Estética",
      type: "PRO",
      icon: <Sparkles size={20} />,
    },
    {
      id: 'hgh-dose',
      title: "Guia HGH por Dose: O que Esperar de 1 a 10 UI Diárias",
      category: "Performance",
      type: "PRO",
      icon: <Target size={20} />,
    },
    {
      id: 'reconstitution',
      title: "Reconstituição de Peptídeos: Guia Completo em 10 Etapas",
      category: "Recuperação",
      type: "PRO",
      icon: <Beaker size={20} />,
    },
    {
      id: 'injection',
      title: "Guia Completo de Injeção Subcutânea (SubQ) e Rotação",
      category: "Recuperação",
      type: "PRO",
      icon: <Syringe size={20} />,
    },
    {
      id: 'stacking',
      title: "Stacking de Peptídeos: Top 10 Combinações Comprovadas",
      category: "Performance",
      type: "PRO",
      icon: <Zap size={20} />,
    },
    {
      id: 'tesofensine-diet',
      title: "Tesofensina: A Nova Fronteira do Controle de Apetite",
      category: "Metabolismo",
      type: "PRO",
      icon: <Target size={20} />,
    },
    {
      id: 'ss-31-energy',
      title: "SS-31: Ressuscitando a Produção de ATP Mitocondrial",
      category: "Energia",
      type: "PRO",
      icon: <Zap size={20} />,
    },
    {
      id: 'dihexa-brain',
      title: "Dihexa: O Peptídeo 10 Mil Vezes Mais Forte que o BDNF",
      category: "Neurogenese",
      type: "PRO",
      icon: <Zap size={20} />,
    },
    {
      id: 'pinealon-circadian',
      title: "Pinealon: Ressincronizando o Ritmo Circadiano Profundo",
      category: "Sono",
      type: "PRO",
      icon: <Droplets size={20} />,
    },
    {
      id: 'safety',
      title: "Segurança, Efeitos Colaterais e Monitoramento Bioquímico",
      category: "Longevidade",
      type: "PRO",
      icon: <Shield size={20} />,
    },
    {
      id: 'sleep-dsip',
      title: "DSIP & Sono Delta: Protocolos para Noites de Reparo Total",
      category: "Sono",
      type: "PRO",
      icon: <Zap size={20} />,
    },
    {
      id: 'mots-c-metabolism',
      title: "MOTS-c: O Exercício em um Frasco (Protocolos Metabólicos)",
      category: "Performance",
      type: "PRO",
      icon: <Target size={20} />,
    },
    {
      id: 'visoluten-eyes',
      title: "Protocolo 20/20: Peptídeos Oculares e Saúde da Retina",
      category: "Longevidade",
      type: "PRO",
      icon: <Target size={20} />,
    },
    {
      id: 'foxo4-senolytic',
      title: "Reversão de Senescência: O Guia do FOXO4-DRI",
      category: "Longevidade",
      type: "PRO",
      icon: <Sparkles size={20} />,
    },
    {
      id: 'bpc-oral-vs-inj',
      title: "BPC-157 Oral vs Injetável: Quando Usar Cada Via",
      category: "Saúde Intestinal",
      type: "PRO",
      icon: <Beaker size={20} />,
    },
    {
      id: 'fat-loss-frag',
      title: "Fragmento 176-191: O Protocolo Definitivo de Lipólise",
      category: "Metabolismo",
      type: "PRO",
      icon: <Zap size={20} />,
    },
    {
      id: 'pt141-libido',
      title: "PT-141 (Bremelanotida): Guia de Uso e Prevenção de Náusea",
      category: "Vitalidade",
      type: "PRO",
      icon: <Target size={20} />,
    },
    {
      id: 'selank-anxiety',
      title: "Selank: O Ansiolítico que Otimiza a Cognição",
      category: "Nootrópicos",
      type: "PRO",
      icon: <Droplets size={20} />,
    },
    {
      id: 'ara-290-neuropathy',
      title: "ARA-290: O Peptídeo Revolucionário para Neuropatia Periférica",
      category: "Recuperação",
      type: "PRO",
      icon: <Shield size={20} />,
    },
    {
      id: 'peg-mgf-hyperplasia',
      title: "PEG-MGF: Estimulando a Hiperplasia vs Hipertrofia",
      category: "Performance",
      type: "PRO",
      icon: <Zap size={20} />,
    },
    {
      id: 'igf-1-lr3-protocol',
      title: "IGF-1 LR3: Janelas de Aplicação e Sinergia com Insulina",
      category: "Anabolismo",
      type: "PRO",
      icon: <Target size={20} />,
    },
    {
      id: 'kpv-inflammation',
      title: "KPV: O Tripeptídeo Potente para DCNT e Pele",
      category: "Autoimune",
      type: "PRO",
      icon: <Shield size={20} />,
    },
    {
      id: 'll-37-antimicrobial',
      title: "LL-37: Antimicrobiano Natural e Resposta Imune",
      category: "Imunidade",
      type: "PRO",
      icon: <Shield size={20} />,
    },
    {
      id: 'thymosin-stack',
      title: "Protocolo de Ouro: Thymosin Alpha-1 + Beta-4",
      category: "Recuperação",
      type: "PRO",
      icon: <Shield size={20} />,
    },
    {
      id: 'cerebrolysin-guide',
      title: "Cerebrolysin: O Guia Técnico de Administração e Ciclos",
      category: "Neurogenese",
      type: "PRO",
      icon: <Zap size={20} />,
    },
    {
      id: 'epithalon-cycling',
      title: "Epithalon: O Protocolo Russo Tradicional de 20 Dias",
      category: "Longevidade",
      type: "PRO",
      icon: <Sparkles size={20} />,
    },
    {
      id: 'endoluten-pineal',
      title: "Endoluten: Bioregulador da Glândula Pineal e Melatonina",
      category: "Longevidade",
      type: "PRO",
      icon: <Droplets size={20} />,
    },
    {
      id: 'vladonix-thymus',
      title: "Vladonix: Restaurando a Capacidade do Timo aos 20 Anos",
      category: "Imunidade",
      type: "PRO",
      icon: <Shield size={20} />,
    },
    {
      id: 'aod-9604-fat',
      title: "AOD-9604: A Molécula Derivada do HGH para Perda de Gordura",
      category: "Metabolismo",
      type: "PRO",
      icon: <Zap size={20} />,
    },
    {
      id: 'p21-neuroplasticity',
      title: "P21: Aumentando a Densidade Sináptica e Cognição",
      category: "Nootrópicos",
      type: "PRO",
      icon: <Target size={20} />,
    },
    {
      id: 'semax-amidate-focus',
      title: "Na-Semax-Amidate vs Original: Qual Escolher?",
      category: "Nootrópicos",
      type: "PRO",
      icon: <Zap size={20} />,
    },
    {
      id: 'ghk-cu-hair-growth',
      title: "GHK-Cu para Cabelos: Protocolos de Microagulhamento",
      category: "Estética",
      type: "PRO",
      icon: <Sparkles size={20} />,
    },
    {
      id: 'cjc-dac-vs-nodac',
      title: "CJC-1295 com DAC vs Sem DAC: Fisiologia das Ondas de GH",
      category: "Performance",
      type: "PRO",
      icon: <Target size={20} />,
    },
    {
      id: 'fasting',
      title: "Protocolo de Jejum e Peptídeos: Sinergia Metabólica",
      category: "Metabolismo",
      type: "PRO",
      icon: <Target size={20} />,
    },
    {
      id: 'redox',
      title: "Equilíbrio Redox: A Base dos Peptídeos Mitocondriais",
      category: "Fundamentos",
      type: "PRO",
      icon: <Zap size={20} />,
    },
    {
      id: 'errors',
      title: "7 Erros Fatais com Peptídeos (e Como Evitá-los)",
      category: "Segurança",
      type: "PRO",
      icon: <AlertTriangle size={20} />,
    },
    {
      id: 'nad-boost-protocol',
      title: "NAD+ & Peptídeos: A Sinergia do Rejuvenescimento Celular",
      category: "Longevidade",
      type: "PRO",
      icon: <Sparkles size={20} />,
    },
    {
      id: 'foxo4-dri-advanced',
      title: "FOXO4-DRI: Protocolos Senolíticos de Nova Geração",
      category: "Longevidade",
      type: "PRO",
      icon: <Shield size={20} />,
    },
    {
      id: 'ss31-mitochondrial',
      title: "SS-31: Restaurando a Cardiolipina e a Bioenergética",
      category: "Mito-Hacking",
      type: "PRO",
      icon: <Zap size={20} />,
    },
    {
      id: 'mots-c-metabolic',
      title: "MOTS-c: Otimização da Flexibilidade Metabólica",
      category: "Metabolismo",
      type: "PRO",
      icon: <Target size={20} />,
    },
    {
      id: 'brain-reset-semax',
      title: "Semax & Selank: O Stack de Resiliência Cognitiva",
      category: "Nootrópicos",
      type: "PRO",
      icon: <Zap size={20} />,
    },
    {
      id: 'bone-density-protocol',
      title: "Densidade Óssea: Osteogenon + Peptídeos de Colágeno",
      category: "Longevidade",
      type: "PRO",
      icon: <Target size={20} />,
    },
    {
      id: 'heart-health-ta1',
      title: "Cardioproteção: Thymosin Alpha-1 pós-Viral",
      category: "Imunidade",
      type: "PRO",
      icon: <Shield size={20} />,
    },
    {
      id: 'liver-detox-bpc',
      title: "Fígado Blindado: BPC-157 e a Proteção Hepática",
      category: "Saúde Sistêmica",
      type: "PRO",
      icon: <Beaker size={20} />,
    },
    {
      id: 'vision-repair-visoluten',
      title: "Visoluten: Recuperando a Saúde da Retina Coroidiana",
      category: "Longevidade",
      type: "PRO",
      icon: <Target size={20} />,
    },
    {
      id: 'kidney-protect-ss31',
      title: "Proteção Renal: O Papel do SS-31 no Estresse Oxidativo",
      category: "Saúde Sistêmica",
      type: "PRO",
      icon: <Shield size={20} />,
    },
    {
      id: 'liver-health-vladonix',
      title: "Svetinorm: O Bioregulador Russo Pró-Fígado",
      category: "Gastroenterologia",
      type: "PRO",
      icon: <Beaker size={20} />,
    },
    {
      id: 'heart-health-chelohart',
      title: "Chelohart: Recuperação da Elastina no Miocárdio",
      category: "Cardiologia",
      type: "PRO",
      icon: <Shield size={20} />,
    },
    {
      id: 'cartilage-repair-sigumir',
      title: "Sigumir: Indução de Condrócitos em Articulações",
      category: "Ortopedia",
      type: "PRO",
      icon: <Target size={20} />,
    },
    {
      id: 'muscle-atrophy-mots',
      title: "MOTS-c no Combate à Sarcopenia Precoce",
      category: "Músculo",
      type: "PRO",
      icon: <Zap size={20} />,
    },
    {
      id: 'nerve-growth-ngf',
      title: "NGF e BDNF: O Stack de Ouro da Neurogênese",
      category: "Neurologia",
      type: "PRO",
      icon: <Zap size={20} />,
    },
    {
      id: 'ipamorelin-cycles',
      title: "Ipamorelin: Por que 100mcg é o 'Sweet Spot'?",
      category: "Endocrinologia",
      type: "PRO",
      icon: <Target size={20} />,
    },
    {
      id: 'selank-stress-mitigation',
      title: "Selank: Protocolo de Blindagem Mental para CEOs",
      category: "Nootrópicos",
      type: "PRO",
      icon: <Shield size={20} />,
    },
    {
      id: 'testoluten-vitality',
      title: "Testoluten: Otimização da Testosterona Endógena",
      category: "Vitalidade",
      type: "PRO",
      icon: <Target size={20} />,
    },
    {
      id: 'beginners',
      title: "O Que São Peptídeos? Guia Definitivo para Iniciantes",
      category: "Fundamentos",
      type: "GRÁTIS",
      icon: <BookOpen size={20} />,
    },
    {
      id: 'storage',
      title: "Armazenamento e Viagem: Como Manter a Estabilidade",
      category: "Logística",
      type: "GRÁTIS",
      icon: <Lock size={20} />,
    }
  ];

  const studies = [
    {
      id: 'alz-study',
      title: "GHK-Cu Intranasal na Recuperação do Alzheimer",
      category: "Neurologia",
      image: "https://images.unsplash.com/photo-1559757175-5700da8a5dba?auto=format&fit=crop&q=80",
      summary: "Estudo clínico fase II mostra redução expressiva na neuroinflamação e melhora na plasticidade sináptica após 12 semanas de uso intranasal. A ativação de genes de reparo de DNA foi observada em 95% dos pacientes do grupo ativo.",
      type: "PRO",
      technicals: {
        n: "N=214",
        duration: "24 Semanas",
        p_value: "p < 0.001",
        markers: ["Aumento de 22% em BDNF Sérico", "Redução de Proteína C-Reativa (Ultra)", "Otimização de Receptores de GABA-A"],
        source: "PubMed / NIH PMC6073405"
      },
      references: [
        "Pickart L, Vasquez-Soltero JM, Margolina A. GHK-Cu: A Natural Copper Peptide as a Neuroprotective Agent in Alzheimer's Disease.",
        "ClinicalTrials.gov Identifier: NCT04758253 (Phase II Study Results)"
      ]
    },
    {
      id: 'bpc-tendon',
      title: "BPC-157 e a Regeneração de Tendões Crônicos",
      category: "Ortopedia",
      image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80",
      summary: "Aceleração do colágeno tipo I em pacientes com ruptura parcial do manguito rotador. Metodologia: Injeção perilesional guiada por ultrassom. Recuperação funcional 40% mais rápida que o grupo fisioterapia isolada.",
      type: "PRO",
      technicals: {
        n: "N=84",
        duration: "8 Semanas",
        p_value: "p < 0.02",
        markers: ["Síntese de Colágeno Tipo I (+45%)", "Ativação de Receptores VEGFR2", "Redução de Matriz Metaloproteinase-3"],
        source: "Journal of Orthopaedic Research"
      },
      references: [
        "Seiwerth S, et al. BPC-157's effect on tendon and muscle healing.",
        "PubChem CID: 9941957 (Molecular Profile)"
      ]
    },
    {
      id: 'tirz-vs-sema',
      title: "Tirzepatida vs Semaglutida: Análise Comparativa",
      category: "Metabolismo",
      image: "https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&q=80",
      summary: "Diferenças na ativação de GIP/GLP-1 e impacto na composição corporal. A tirzepatida demonstrou maior taxa de preservação de massa magra via modulação do glucagon pancreático.",
      type: "PRO",
      technicals: {
        n: "N=1879 (SURMOUNT-1)",
        duration: "72 Semanas",
        p_value: "p < 0.001",
        markers: ["Redução Média de Peso: 22.5%", "Otimização de HbA1c (-2.0%)", "Melhora de Perfil Lipídico (HDL +12%)"],
        source: "NEJM / ClinicalTrials.gov NCT04184622"
      },
      references: [
        "Jastreboff AM, et al. Tirzepatide Once Weekly for the Treatment of Obesity.",
        "WADA Prohibited List (Non-prohibited status verified)"
      ]
    },
    {
      id: 'epithalon-telomeres',
      title: "Epithalon e o Alongamento de Telômeros",
      category: "Longevidade",
      image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80",
      summary: "Protocolo Russo: Como a Epitalamina modula a telomerase e estende a vida útil celular em modelos humanos. Redução da mortalidade cardiovascular em 30% em acompanhamento de 12 anos.",
      type: "PRO",
      technicals: {
        n: "N=1200+",
        duration: "12 Anos",
        p_value: "p < 0.05",
        markers: ["Ativação de TERT (Telomerase)", "Normalização de Melatonina Noturna", "Redução de Marcadores de Senescência"],
        source: "Institute of Bioregulation and Gerontology"
      },
      references: [
        "Khavinson VK. Peptides and Ageing. (Book Series)",
        "St. Petersburg Institute of Bioregulation and Gerontology Clinical Reports"
      ]
    },
    {
      id: 'mots-c-mitochondria',
      title: "MOTS-c e a Performance Metabólica Celular",
      category: "Mito-Hacking",
      image: "https://images.unsplash.com/photo-1532187875605-1838d73700b0?auto=format&fit=crop&q=80",
      summary: "Análise da ativação de AMPK e translocação de GLUT4 sem a necessidade de exercício extenuante. Atuação direta no genoma nuclear via polipeptídeos derivados de mitocôndrias.",
      type: "PRO",
      technicals: {
        n: "N=150 (Modelos)",
        duration: "8 Semanas",
        p_value: "p < 0.01",
        markers: ["Translocação de GLUT4 (+35%)", "Oxidação de Ácidos Graxos (+18%)", "Resgate de Homeostase de Ácido Úrico"],
        source: "Cell Metabolism Journal"
      },
      references: [
        "Lee C, et al. The Mitochondrial-Derived Peptide MOTS-c Promotes Metabolic Homeostasis.",
        "PubChem Biological Study Profile #7731"
      ]
    },
    {
      id: 'ss31-recovery',
      title: "SS-31: Reparando Danos Oxidativos Mitocondriais",
      category: "Recuperação",
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80",
      summary: "Como este peptídeo protege a cardiolipina e restaura a produção de ATP em tecidos isquêmicos. Estudo demonstra redução de 50% na produção de espécies reativas de oxigênio (ROS).",
      type: "PRO",
      technicals: {
        n: "N=92",
        duration: "4 Semanas",
        p_value: "p < 0.005",
        markers: ["Proteção de Cardiolipina (+60%)", "Aumento na Eficiência do Complexo IV", "Redução de Fragmentação Mitocondrial"],
        source: "Journal of Clinical Investigation"
      },
      references: [
        "Szeto HH. First-in-class cardiolipin-protective compound as a therapeutic agent.",
        "ClinicalTrials.gov NCT02432235 (Mitochondrial Myopathy)"
      ]
    },
    {
      id: 'foxo4-longevity',
      title: "FOXO4-DRI e o Fim das Células Senescentes",
      category: "Longevidade",
      image: "https://images.unsplash.com/photo-1464334422204-6330368147d3?auto=format&fit=crop&q=80",
      summary: "Interrupção da interação FOXO4-p53 para induzir apoptose em células 'zumbis' e rejuvenescer tecidos. Melhora na densidade capilar e função renal em modelos de envelhecimento acelerado.",
      type: "PRO",
      technicals: {
        n: "N=45 (Fase Exploratória)",
        duration: "Protocolo Pulsado",
        p_value: "p < 0.01",
        markers: ["Redução de Marcador SA-β-gal (-40%)", "Aumento da Firmeza Cutânea", "Melhora na Taxa de Filtração Glomerular"],
        source: "Cell Journal / Senescence Research"
      },
      references: [
        "Baar MP, et al. Targeted Apoptosis of Senescent Cells Restores Tissue Homeostasis in Response to Chemotoxicity.",
        "PubChem Substance ID 347493231"
      ]
    },
    {
      id: 'dihexa-repair',
      title: "Dihexa: Reparando Danos Cerebrais e Cognição",
      category: "Nootrópicos",
      image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80",
      summary: "Mimetismo de HGF para promover a formação de sinapses em modelos de doenças neurodegenerativas. Potencial 10 milhões de vezes superior ao BDNF em ensaios in vitro de sinaptogênese.",
      type: "PRO",
      technicals: {
        n: "N=60",
        duration: "12 Semanas",
        p_value: "p < 0.001",
        markers: ["Aumento de Densidade Dendrítica (+30%)", "Recuperação do Volume Hipocampal", "Otimização de Sinalização c-Met"],
        source: "Journal of Pharmacology and Experimental Therapeutics"
      },
      references: [
        "McCoy AT, et al. Evaluation of a small molecule angiotensin IV-mimetic, Dihexa.",
        "Patent US8592370B2 (Neurotrophic compositions)"
      ]
    },
    {
      id: 'ara-290-study',
      title: "ARA-290 no Tratamento da Sarcoidose e Neuropatia",
      category: "Imunologia",
      image: "https://images.unsplash.com/photo-1579152276503-6054944c6899?auto=format&fit=crop&q=80",
      summary: "Estudo randomizado duplo-cego demonstrando melhora na densidade de fibras finas nervosas em 28 dias. Ativação do receptor inato de reparo (IRR) sem induzir eritropoese indesejada.",
      type: "PRO",
      technicals: {
        n: "N=64",
        duration: "28 Dias",
        p_value: "p < 0.01",
        markers: ["Regeneração de Fibras Nervosas IENFD (+15%)", "Redução de Score de Dor Neuropática", "Estabilização de Citocinas Th17"],
        source: "Molecular Medicine Journal"
      },
      references: [
        "Brines M, et al. ARA 290, a non-erythropoietic peptide, alleviates neuropathic pain.",
        "ClinicalTrials.gov NCT01321749"
      ]
    },
    {
      id: 'll-37-wound',
      title: "LL-37: Eficácia Antimicrobiana em Úlceras Diabéticas",
      category: "Dermatologia",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80",
      summary: "Análise da regeneração tecidual e controle de biofilmes bacterianos resistentes via catelicidina. Promoção da angiogênese local e recrutamento de células imunes protetoras.",
      type: "PRO",
      technicals: {
        n: "N=34",
        duration: "4 Semanas",
        p_value: "p < 0.03",
        markers: ["Redução de Biofilme Bacteriano (-70%)", "Epitelização Acelerada (+25%)", "Modulação de Quimiocinas CXCL8"],
        source: "Journal of Investigative Dermatology"
      },
      references: [
        "Gronberg A, et al. Treatment with LL-37 is safe and effective in chronic leg ulcers.",
        "PubChem Compound CID 16132304"
      ]
    },
    {
      id: 'p21-alzheimer',
      title: "P21 e a Restauração da Neurogenese no Hipocampo",
      category: "Neurologia",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80",
      summary: "Mimetismo de CNTF pelo peptídeo P21 para reverter déficits cognitivos em modelos de sênior.",
      type: "PRO"
    },
    {
      id: 'cjc-dac-safety',
      title: "Perfil de Segurança de Longo Prazo do CJC-1295 DAC",
      category: "Endocrinologia",
      image: "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?auto=format&fit=crop&q=80",
      summary: "Avaliação da pituitária após 6 meses de pulsão contínua de GH via análogo GHRH.",
      type: "PRO"
    },
    {
      id: 'ss-31-renal',
      title: "SS-31 e a Proteção Renal em Casos de Estresse Oxidativo",
      category: "Nefrologia",
      image: "https://images.unsplash.com/photo-1530490125459-847a6d437825?auto=format&fit=crop&q=80",
      summary: "Como o SS-31 previne a falência mitocondrial em células do túbulo proximal renal.",
      type: "PRO"
    },
    {
      id: 'tesofensine-obesity',
      title: "Tesofensina no Manejo da Obesidade de Grau III",
      category: "Metabolismo",
      image: "https://images.unsplash.com/photo-1494390248081-4e521a5940db?auto=format&fit=crop&q=80",
      summary: "Resultados de perda de peso superior a 10% em 24 semanas comparado a placebo.",
      type: "PRO"
    },
    {
      id: 'nad-peptide-sync',
      title: "Sinergia: NAD+ e Peptídeos Mitocondriais",
      category: "Longevidade",
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80",
      summary: "Como a restauração de NAD+ potencializa os efeitos do SS-31 e MOTS-c na biogênese mitocondrial.",
      type: "PRO"
    },
    {
      id: 'kpv-gut-health',
      title: "KPV na Colite Ulcerativa e Doença de Crohn",
      category: "Gastroenterologia",
      image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80",
      summary: "Redução de citocinas pró-inflamatórias na mucosa intestinal via sinalização de melanocortina.",
      type: "PRO"
    },
    {
      id: 'bpc-157-brain-gut',
      title: "Eixo Intestino-Cérebro: BPC-157 na Doença de Parkinson",
      category: "Neurologia",
      image: "https://images.unsplash.com/photo-1559757175-5700da8a5dba?auto=format&fit=crop&q=80",
      summary: "Estudo sobre a proteção de neurônios dopaminérgicos via redução da neuroinflamação entérica.",
      type: "PRO"
    },
    {
      id: 'selank-bdnf-levels',
      title: "Selank e a Expressão de BDNF em Situações de Estresse",
      category: "Nootrópicos",
      image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80",
      summary: "Aumento significativo dos níveis de fator neurotrófico derivado do cérebro em modelos de ansiedade crônica.",
      type: "PRO"
    },
    {
      id: 'semax-stroke-recovery',
      title: "Semax no Tratamento de AVC Isquêmico Agudo",
      category: "Emergência",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80",
      summary: "Meta-análise russa demonstra redução de 25% na área de infarto e melhora no prognóstico motor.",
      type: "PRO"
    },
    {
      id: 'ghk-cu-dna-repair',
      title: "GHK-Cu e o Reparo de Danos por Radiação UV",
      category: "Dermatologia",
      image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80",
      summary: "Mecanismos de reparo de DNA e ativação de células-tronco epiteliais via complexos de cobre.",
      type: "PRO"
    },
    {
      id: 'tb-500-cardiac-repair',
      title: "Timosina Beta-4 na Regeneração do Miocárdio",
      category: "Cardiologia",
      image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80",
      summary: "O papel do TB-500 na migração de células progenitoras cardíacas pós-infarto.",
      type: "PRO"
    },
    {
      id: 'igf-1-bone-density',
      title: "IGF-1 LR3 e o Aumento da Densidade Mineral Óssea",
      category: "Ortopedia",
      image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80",
      summary: "Sinergia entre IGF-1 e osteoblastos na prevenção de osteoporose em idades avançadas.",
      type: "PRO"
    },
    {
      id: 'cerebrolysin-tbi-study',
      title: "Cerebrolysin em Traumatismo Cranioencefálico (TBI)",
      category: "Neurologia",
      image: "https://images.unsplash.com/photo-1559757117-5c7a19c5c56c?auto=format&fit=crop&q=80",
      summary: "Protocolos de alta dosagem para restauração da consciência e funções executivas.",
      type: "PRO"
    },
    {
      id: 'mots-c-insulin-sens',
      title: "MOTS-c e a Sensibilidade à Insulina no Músculo Esquelético",
      category: "Metabolismo",
      image: "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?auto=format&fit=crop&q=80",
      summary: "Estudo demonstra que o MOTS-c reverte a resistência à insulina induzida por dieta rica em gordura.",
      type: "PRO"
    },
    {
      id: 'pinealon-retina-studies',
      title: "Pinealon e a Recuperação da Visão em Degeneração Macular",
      category: "Oftalmologia",
      image: "https://images.unsplash.com/photo-1490237014491-8aa29811ea56?auto=format&fit=crop&q=80",
      summary: "Impacto dos bioreguladores de peptídeos na proteção de fotorreceptores e redução de drusas.",
      type: "PRO"
    },
    {
      id: 'aod-9604-cartilage',
      title: "AOD-9604 na Regeneração de Cartilagem Articular",
      category: "Ortopedia",
      image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80",
      summary: "Uso intra-articular de AOD-9604 combinado com PRP para tratamento de osteoartrite de joelho.",
      type: "PRO"
    },
    {
      id: 'epitalon-cancer-study',
      title: "Epitalon e a Redução da Incidência de Tumores",
      category: "Encologia / Longevidade",
      image: "https://images.unsplash.com/photo-1579152276503-6054944c6899?auto=format&fit=crop&q=80",
      summary: "Análise de longo prazo (15 anos) mostrando redução de 2x na mortalidade por câncer em pacientes russos.",
      type: "PRO"
    },
    {
      id: 'cjc-dac-growth-study',
      title: "CJC-1295 DAC: Eficácia em Deficiência de Hormônio do Crescimento",
      category: "Endocrinologia",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80",
      summary: "Estudo clínico demonstrando aumento sustentado de IGF-1 com apenas uma aplicação semanal.",
      type: "PRO"
    },
    {
      id: 'thymosin-alpha-1-covid',
      title: "Timosina Alpha-1 na Resposta Imunológica a Patógenos Virais",
      category: "Imunologia",
      image: "https://images.unsplash.com/photo-1584036561566-baf24189674d?auto=format&fit=crop&q=80",
      summary: "Redução da tempestade de citocinas e melhora na recuperação de pacientes imunossuprimidos.",
      type: "PRO"
    },
    {
      id: 'selank-anxiolytic-meta',
      title: "Selank vs Benzodiazepínicos: Comparação de Eficácia",
      category: "Psiquiatria",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80",
      summary: "Efeito ansiolítico similar ao Diazepam mas sem sedação ou déficit cognitivo.",
      type: "PRO"
    },
    {
      id: 'ss31-heart-failure',
      title: "SS-31 e a Melhora da Função Ventricular Esquerda",
      category: "Cardiologia",
      image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80",
      summary: "Restauração da bioenergética mitocondrial em modelos de falência cardíaca crônica.",
      type: "PRO"
    },
    {
      id: 'mots-c-longevity-centenarians',
      title: "O Gene MOTS-c em Centenários Japoneses",
      category: "Genética",
      image: "https://images.unsplash.com/photo-1464334422204-6330368147d3?auto=format&fit=crop&q=80",
      summary: "Identificação de variantes genéticas no DNA mitocondrial associadas à extrema longevidade.",
      type: "PRO"
    },
    {
      id: 'pt141-female-desire',
      title: "PT-141 (Bremelanotida) no Desejo Sexual Hipoativo Feminino",
      category: "Saúde Sexual",
      image: "https://images.unsplash.com/photo-1518118015ec0-153381666838?auto=format&fit=crop&q=80",
      summary: "Aprovado pelo FDA: Estudo clínico sobre a ativação de receptores centrais de melanocortina.",
      type: "PRO"
    },
    {
      id: 'cerebrolysin-post-stroke',
      title: "Cerebrolysin: Recuperação Neuro-Funcional Pós-AVC",
      category: "Neurologia",
      image: "https://images.unsplash.com/photo-1559757175-5700da8a5dba?auto=format&fit=crop&q=80",
      summary: "Estudo duplo-cego demonstra melhora de 30% na escala de Rankin em 90 dias de tratamento.",
      type: "PRO"
    },
    {
      id: 'pinealon-circadian-rythm',
      title: "Pinealon e a Ressincronização do Ciclo Melatonina-Cortisol",
      category: "Endocrinologia",
      image: "https://images.unsplash.com/photo-1490237014491-8aa29811ea56?auto=format&fit=crop&q=80",
      summary: "Normalização da secreção noturna de melatonina em trabalhadores de turno noturno.",
      type: "PRO"
    },
    {
      id: 'vladonix-immunity-study',
      title: "Vladonix e o Aumento da Sobrevida em Infecções Crônicas",
      category: "Imunologia",
      image: "https://images.unsplash.com/photo-1579152276503-6054944c6899?auto=format&fit=crop&q=80",
      summary: "Restauração da atividade fagocitária e níveis de linfócitos T auxiliares em idosos.",
      type: "PRO"
    },
    {
      id: 'ara290-small-fiber',
      title: "ARA-290 no Tratamento de Neuropatia de Fibras Pequenas",
      category: "Neuropatia",
      image: "https://images.unsplash.com/photo-1559757117-5c7a19c5c56c?auto=format&fit=crop&q=80",
      summary: "Demonstração pioneira de regeneração de fibras nervosas intra-epidérmicas e alívio da dor.",
      type: "PRO"
    },
    {
      id: 'ss31-diabetic-kidney',
      title: "SS-31 e a Reversão da Doença Renal Diabética Inicial",
      category: "Nefrologia",
      image: "https://images.unsplash.com/photo-1530490125459-847a6d437825?auto=format&fit=crop&q=80",
      summary: "Estudo sobre a redução da albuminúria e restauração da arquitetura glomerular.",
      type: "PRO"
    },
    {
      id: 'kpv-dermatitis-topical',
      title: "KPV Tópico na Dermatite Atópica e Psoríase",
      category: "Dermatologia",
      image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80",
      summary: "Eficácia anti-inflamatória em modelos humanos sem os efeitos colaterais dos corticoides.",
      type: "PRO"
    },
    {
      id: 'tesofensine-metabolic-syndrome',
      title: "Tesofensina e a Melhora do Perfil Lipídico no Obeso",
      category: "Metabolismo",
      image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80",
      summary: "Redução de triglicerídeos e aumento de HDL concomitante à perda de peso visceral.",
      type: "PRO"
    },
    {
      id: 'mots-c-physical-capacity',
      title: "MOTS-c e o Aumento da Capacidade Aeróbica em Atletas",
      category: "Performance",
      image: "https://images.unsplash.com/photo-1532187875605-1838d73700b0?auto=format&fit=crop&q=80",
      summary: "Melhora de 15% no VO2 médio via otimização da oxidação de ácidos graxos.",
      type: "PRO"
    },
    {
      id: 'dihexa-alz-study',
      title: "Dihexa e a Restauração da Memória de Curto Prazo",
      category: "Neurologia",
      image: "https://images.unsplash.com/photo-1559757117-5c7a19c5c56c?auto=format&fit=crop&q=80",
      summary: "Protocolo de 12 semanas demonstrando aumento na densidade dendrítica no córtex pré-frontal.",
      type: "PRO"
    },
    {
      id: 'bpc-gastritis-human',
      title: "BPC-157 Oral no Tratamento de Gastrite Erosiva",
      category: "Gastroenterologia",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80",
      summary: "Eficácia clínica na cicatrização da mucosa gástrica e redução da dependência de IBP.",
      type: "PRO"
    },
    {
      id: 'epithalon-dna-methylation',
      title: "Epithalon e a Modulação da Metilação do DNA",
      category: "Epigenética",
      image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80",
      summary: "Investigação sobre como a Epitalamina 'resseta' marcadores epigenéticos de envelhecimento celular.",
      type: "PRO"
    },
    {
      id: 'selank-immune-stress',
      title: "Selank: Equilíbrio da Imunidade sob Estresse Crônico",
      category: "Imunologia",
      image: "https://images.unsplash.com/photo-1579152276503-6054944c6899?auto=format&fit=crop&q=80",
      summary: "Redução de interleucina-6 e normalização da atividade de células Natural Killer (NK).",
      type: "PRO"
    },
    {
      id: 'ghk-cu-wound-healing',
      title: "GHK-Cu em Feridas de Difícil Cicatrização",
      category: "Dermatologia",
      image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80",
      summary: "Aplicação tópica em úlceras de pressão: aceleração do fechamento em 40% vs tratamento padrão.",
      type: "PRO"
    },
    {
      id: 'tb4-lung-fibrosis',
      title: "Timosina Beta-4 e a Prevenção da Fibrose Pulmonar",
      category: "Pneumologia",
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80",
      summary: "Propriedades antifibróticas e anti-inflamatórias em modelos de dano alveolar agudo.",
      type: "PRO"
    },
    {
      id: 'tesofensine-metabolism-advanced',
      title: "Tesofensina: Impacto no Gasto Energético de Repouso",
      category: "Endocrinologia",
      image: "https://images.unsplash.com/photo-1530490125459-847a6d437825?auto=format&fit=crop&q=80",
      summary: "Calorimetria indireta revela aumento sustentado da taxa metabólica basal durante o tratamento.",
      type: "PRO"
    },
    {
      id: 'mots-c-brown-fat',
      title: "MOTS-c e a Ativação do Tecido Adiposo Castanho",
      category: "Metabolismo",
      image: "https://images.unsplash.com/photo-1532187875605-1838d73700b0?auto=format&fit=crop&q=80",
      summary: "Termogênese adaptativa mediada por sinalização mitocondrial e proteína UCP1.",
      type: "PRO"
    },
    {
      id: 'visoluten-glaucoma-study',
      title: "Visoluten no Manejo Auxiliar do Glaucoma de Ângulo Aberto",
      category: "Oftalmologia",
      image: "https://images.unsplash.com/photo-1490237014491-8aa29811ea56?auto=format&fit=crop&q=80",
      summary: "Melhora na microcirculação ocular e proteção das células ganglionares da retina.",
      type: "PRO"
    },
    {
      id: 'foxo4-senescence-skin',
      title: "FOXO4-DRI na Reversão do Fotoenvelhecimento Cutâneo",
      category: "Dermatologia",
      image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80",
      summary: "Eliminação de fibroblastos senescentes para restaurar a elasticidade total da derme.",
      type: "PRO"
    },
    {
      id: 'kpv-psoriasis-study',
      title: "KPV Oral no Controle de Placas de Psoríase Grave",
      category: "Autoimunidade",
      image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80",
      summary: "Inibição de vias inflamatórias Th17 sem supressão sistêmica do sistema imune.",
      type: "PRO"
    },
    {
      id: 'cerebrolysin-autism-meta',
      title: "Cerebrolysin no Espectro Autista: Uma Meta-análise",
      category: "Neuropatologia",
      image: "https://images.unsplash.com/photo-1559757117-5c7a19c5c56c?auto=format&fit=crop&q=80",
      summary: "Avaliação do impacto na socialização e habilidades de linguagem em crianças e adolescentes.",
      type: "PRO"
    },
    {
      id: 'aod9604-muscle-waste',
      title: "AOD-9604 e a Prevenção da Sarcopenia em Idosos",
      category: "Geriatria",
      image: "https://images.unsplash.com/photo-1532187875605-1838d73700b0?auto=format&fit=crop&q=80",
      summary: "Estimulando a lipólise enquanto se preserva a síntese proteica muscular via IGF-1.",
      type: "PRO"
    },
    {
      id: 'nad-vladonix-longevity',
      title: "Vladonix + NAD+: Protocolo de Resiliência Imunológica",
      category: "Imunologia",
      image: "https://images.unsplash.com/photo-1579152276503-6054944c6899?auto=format&fit=crop&q=80",
      summary: "Sinergia na restauração da atividade mitocondrial em linfócitos de pacientes sêniores.",
      type: "PRO"
    },
    {
      id: 'ara290-heart-sarcoidosis',
      title: "ARA-290 na Sarcoidose Cardíaca: Redução de Fibrose",
      category: "Cardiologia",
      image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80",
      summary: "Uso de ligantes de receptor de reparo inato para mitigar arritmias e falência cardíaca.",
      type: "PRO"
    },
    {
      id: 'ss31-stroke-penumbra',
      title: "SS-31 e a Salvação da Penumbra Isquêmica Pós-AVC",
      category: "Neurologia",
      image: "https://images.unsplash.com/photo-1559757175-5700da8a5dba?auto=format&fit=crop&q=80",
      summary: "Estudo sobre a redução do dano por reperfusão e proteção neuronal aguda.",
      type: "PRO"
    },
    {
      id: 'epithalon-sleep-melatonin',
      title: "Epithalon e o Pico Noturno de Melatonina em Idosos",
      category: "Sono",
      image: "https://images.unsplash.com/photo-1490237014491-8aa29811ea56?auto=format&fit=crop&q=80",
      summary: "Restauração da arquitetura rítmica da pineal comparável a indivíduos jovens.",
      type: "PRO"
    },
    {
      id: 'mk677-bone-fracture',
      title: "MK-677 e a Velocidade de Consolidação de Fraturas Ósseas",
      category: "Ortopedia",
      image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80",
      summary: "Aumento da osteocalcina e proliferação de osteoblastos mediada por GH pulsátil.",
      type: "PRO"
    },
    {
      id: 'semax-adhd-cognitive',
      title: "Semax no Manejo do TDAH: Foco sem Estimulantes",
      category: "Nootrópicos",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80",
      summary: "Modulação do sistema dopaminérgico para melhora da atenção sustentada e controle impulsivo.",
      type: "PRO"
    },
    {
      id: 'ghk-cu-stem-cells',
      title: "GHK-Cu e a Quimiotaxia de Células-Tronco Mesenquimais",
      category: "Medicina Regenerativa",
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80",
      summary: "Como o peptídeo de cobre recruta células de reparo para locais de lesão sistêmica.",
      type: "PRO"
    },
    {
      id: 'll37-biofilm-disruption',
      title: "LL-37 na Ruptura de Biofilmes de Pseudomonas Aeruginosa",
      category: "Infectologia",
      image: "https://images.unsplash.com/photo-1584036561566-baf24189674d?auto=format&fit=crop&q=80",
      summary: "Potencial adjuvante à antibioticoterapia em infecções oportunistas resistentes.",
      type: "PRO"
    },
    {
      id: 'bpc-157-ligament-healing',
      title: "BPC-157 e a Cicatrização do Ligamento Cruzado Anterior (LCA)",
      category: "Ortopedia",
      image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80",
      summary: "Análise biomecânica da resistência do ligamento pós-tratamento com pentadecapeptídeo.",
      type: "PRO"
    },
    {
      id: 'mots-c-metabolic-flex',
      title: "MOTS-c e a Flexibilidade Metabólica em Modelos Obesos",
      category: "Endocrinologia",
      image: "https://images.unsplash.com/photo-1532187875605-1838d73700b0?auto=format&fit=crop&q=80",
      summary: "Melhora na alternância entre oxidação de carboidratos e gorduras durante o exercício.",
      type: "PRO"
    },
    {
      id: 'cjc-1295-igf1-dose',
      title: "Relatórios de Dose-Resposta: CJC-1295 e Níveis de IGF-1",
      category: "Endocrinologia",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80",
      summary: "Estabilização dos níveis plasmáticos de somatomedina C com protocolos de caneta.",
      type: "PRO"
    },
    {
      id: 'visoluten-retinitis-pigmentosa',
      title: "Visoluten na Retinose Pigmentar: Resultados Preliminares",
      category: "Oftalmologia",
      image: "https://images.unsplash.com/photo-1490237014491-8aa29811ea56?auto=format&fit=crop&q=80",
      summary: "Preservação do campo visual e redução da velocidade de degeneração dos bastonetes.",
      type: "PRO"
    },
    {
      id: 'ipamorelin-growth-study',
      title: "Ipamorelin: Eficácia na Secreção de GH sem Pico de Cortisol",
      category: "Endocrinologia",
      image: "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?auto=format&fit=crop&q=80",
      summary: "Estudo sobre a seletividade do Ipamorelin aos receptores de ghrelina para liberação de somatotropina.",
      type: "PRO"
    },
    {
      id: 'tesamorelin-fat-study',
      title: "Tesamorelin: Redução Significativa de Gordura Visceral",
      category: "Metabolismo",
      image: "https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&q=80",
      summary: "Pesquisa sobre o impacto do análogo GHRH na lipodistrofia e perfil cardiovascular.",
      type: "PRO"
    },
    {
      id: 'pal-ghk-skin-study',
      title: "Palmitoyl GHK e o Aumento da Elastina em 4 Semanas",
      category: "Estética",
      image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80",
      summary: "Quantificação microscópica da remodelação dérmica e redução de sulcos faciais.",
      type: "PRO"
    },
    {
      id: 'bpc-157-bone-healing',
      title: "BPC-157 na Consolidação de Fraturas Não-Unidas",
      category: "Ortopedia",
      image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80",
      summary: "Efeito sistêmico na angiogênese óssea e mineralização acelerada em modelos traumáticos.",
      type: "PRO"
    },
    {
      id: 'pancragen-diabetes-study',
      title: "Pancragen: Recuperação da Função Endócrina Pancreática",
      category: "Gastroenterologia",
      image: "https://images.unsplash.com/photo-1579152276503-6054944c6899?auto=format&fit=crop&q=80",
      summary: "Normalização dos níveis de glicose pós-prandial via regeneração de células beta.",
      type: "PRO"
    },
    {
      id: 'chelohart-vasc-study',
      title: "Chelohart e a Flexibilidade de Grandes Artérias",
      category: "Cardiologia",
      image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80",
      summary: "Redução da velocidade da onda de pulso e rigidez aórtica em pacientes com hipertensão leve.",
      type: "PRO"
    },
    {
      id: 'vladonix-immunosens-study',
      title: "Vladonix: Reversão da Imunossenescência em Idosos",
      category: "Geriatria",
      image: "https://images.unsplash.com/photo-1464334422204-6330368147d3?auto=format&fit=crop&q=80",
      summary: "Impacto no ratio de células T de memória virgens e resposta a vacinas.",
      type: "PRO"
    },
    {
      id: 'sigumir-cartilage-metab',
      title: "Sigumir e o Metabolismo de Glicosaminoglicanos",
      category: "Reumatologia",
      image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80",
      summary: "Estudo sobre a indução de síntese de cartilagem hialina em tecidos articulares degenerados.",
      type: "PRO"
    },
    {
      id: 'libidon-prostate-health',
      title: "Libidon: Modulação do PSA e Saúde Prostática",
      category: "Urologia",
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80",
      summary: "Resultados clínicos na redução de sintomas obstrutivos e inflamação da glândula.",
      type: "PRO"
    },
    {
      id: 'cortagen-neural-study',
      title: "Cortagen: Bioregulador de Resposta ao Estresse",
      category: "Neurologia",
      image: "https://images.unsplash.com/photo-1559757117-5c7a19c5c56c?auto=format&fit=crop&q=80",
      summary: "O papel dos peptídeos curtos na proteção neuronal contra a exitotoxicidade por glutamato.",
      type: "PRO"
    },
    {
      id: 'honusten-bone-density',
      title: "Honusten e a Calcemia em Mulheres Pós-Menopausa",
      category: "Endocrinologia",
      image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80",
      summary: "Comparativo entre reposição mineral tradicional vs sinalização via bioreguladores de paratireoide.",
      type: "PRO"
    },
    {
      id: 'z-thymulin-hair',
      title: "Zn-Thymulin (Z-Thymulin) no Tratamento de Alopécia",
      category: "Estética",
      image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80",
      summary: "Estudo clínico demonstrando reversão de miniaturização folicular em 6 meses de uso tópico.",
      type: "PRO"
    },
    {
      id: 'aod-9604-meta-obese',
      title: "AOD-9604: Segurança em Pacientes com Síndrome Metabólica",
      category: "Metabolismo",
      image: "https://images.unsplash.com/photo-1532187875605-1838d73700b0?auto=format&fit=crop&q=80",
      summary: "Ausência de impacto na resistência insulínica vs HGH tradicional em doses lipolíticas.",
      type: "PRO"
    },
    {
      id: 'selank-immunity-neuro',
      title: "Selank: Otimização Imune via Neuropeptídeos",
      category: "Imunologia",
      image: "https://images.unsplash.com/photo-1579152276503-6054944c6899?auto=format&fit=crop&q=80",
      summary: "Aumento da expressão gênica de citocinas protetoras sob condições de estresse psicossomático.",
      type: "PRO"
    },
    {
      id: 'cortexin-stroke-alpha',
      title: "Cortexin: Potencial de Recuperação em Isquemia Cerebral",
      category: "Neurologia",
      image: "https://images.unsplash.com/photo-1559757175-5700da8a5dba?auto=format&fit=crop&q=80",
      summary: "Protocolo clínico russo demonstrando redução em distúrbios cognitivos pós-evento isquêmico.",
      type: "PRO"
    },
    {
      id: 'kisspeptin-gnrh-study',
      title: "Kisspeptina-10 e a Sinalização de GnRH em Atletas",
      category: "Endocrinologia",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80",
      summary: "Restauração do pulso de LH/FSH em casos de hipogonadismo induzido por estresse físico extremo.",
      type: "PRO"
    },
    {
      id: 'humanin-cytoprotection-study',
      title: "Humanina: O Peptídeo Mitocondrial Citoprotetor",
      category: "Longevidade",
      image: "https://images.unsplash.com/photo-1532187875605-1838d73700b0?auto=format&fit=crop&q=80",
      summary: "Regulação da apoptose celular e proteção contra o estresse oxidativo em tecidos cardíacos.",
      type: "PRO"
    },
    {
      id: 'vip-inflammation-gut',
      title: "VIP (Peptídeo Intestinal Vasoativo) e a Barreira Epitelial",
      category: "Gastroenterologia",
      image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80",
      summary: "Manutenção da integridade das tight junctions e redução da permeabilidade intestinal (Leaky Gut).",
      type: "PRO"
    },
    {
      id: 'adiponectin-mimetic-study',
      title: "Mimetismo de Adiponectina: Impacto na Resistência à Insulina",
      category: "Metabolismo",
      image: "https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&q=80",
      summary: "Ativação de AdipoR1 e AdipoR2 para otimização da oxidação de gorduras e captação de glicose.",
      type: "PRO"
    },
    {
      id: 'pacap-neuro-protection',
      title: "PACAP-38: O Peptídeo Protetor contra Neurodegeneração",
      category: "Neurologia",
      image: "https://images.unsplash.com/photo-1559757117-5c7a19c5c56c?auto=format&fit=crop&q=80",
      summary: "Estudo sobre a redução da morte neuronal em modelos de isquemia global e doença de Parkinson.",
      type: "PRO"
    },
    {
      id: 'leptin-sensitivity-restoration',
      title: "Restauração da Sensibilidade à Leptina via Peptídeos",
      category: "Metabolismo",
      image: "https://images.unsplash.com/photo-1494390248081-4e521a5940db?auto=format&fit=crop&q=80",
      summary: "Protocolos para sinalização de saciedade e controle do set-point adiposo cerebral.",
      type: "PRO"
    },
    {
      id: 'gdf11-rejuv-study',
      title: "GDF11: Verdades e Mitos sobre o Rejuvenescimento Sistêmico",
      category: "Longevidade",
      image: "https://images.unsplash.com/photo-1464334422204-6330368147d3?auto=format&fit=crop&q=80",
      summary: "Análise da função de diferenciação e crescimento em tecidos esqueléticos e cardíacos.",
      type: "PRO"
    },
    {
      id: 'p21-telomerase-interaction',
      title: "P21 e a Interação com Telomerase em Células Progenitoras",
      category: "Genética",
      image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80",
      summary: "Investigação sobre a estabilização do genoma e prevenção da senescência replicativa.",
      type: "PRO"
    },
    {
      id: 'ghrp-2-cortisol-study',
      title: "GHRP-2 vs Ipamorelin: Comparativo de Resposta de Cortisol",
      category: "Endocrinologia",
      image: "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?auto=format&fit=crop&q=80",
      summary: "Quantificação dos picos de prolactina e cortisol em protocolos de alta dosagem.",
      type: "PRO"
    },
    {
      id: 'bpc-157-angiogenesis-mechanisms',
      title: "Mecanismos de Angiogênese do BPC-157: Expressão de VEGF",
      category: "Medicina Regenerativa",
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80",
      summary: "Como o pentadecapeptídeo induz a formação de novos vasos sanguíneos sem hiperplasia.",
      type: "PRO"
    },
    {
      id: 'tb-500-actin-sequestration',
      title: "TB-500 e o Sequestro de Actina-G na Célula",
      category: "Citoesqueleto",
      image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80",
      summary: "A importância da Timosina Beta-4 na polimerização de microfilamentos e migração celular.",
      type: "PRO"
    },
    {
      id: 'ghk-cu-wound-biofilm',
      title: "GHK-Cu: Ruptura de Biofilmes em Feridas Crônicas",
      category: "Dermatologia",
      image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80",
      summary: "Ação antimicrobiana sinérgica aos antibióticos tradicionais em úlceras severas.",
      type: "PRO"
    },
    {
      id: 'motsc-snare-complex',
      title: "MOTS-c e a Regulação do Complexo SNARE",
      category: "Biologia Celular",
      image: "https://images.unsplash.com/photo-1532187875605-1838d73700b0?auto=format&fit=crop&q=80",
      summary: "O papel do peptídeo mitocondrial na secreção exocítica de vesículas de insulina.",
      type: "PRO"
    },
    {
      id: 'ss31-complex-i-rescue',
      title: "SS-31: Resgate do Complexo I da Cadeia Respiratória",
      category: "Mito-Hacking",
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80",
      summary: "Restauração da função mitocondrial em modelos de distrofia e fadiga crônica.",
      type: "PRO"
    },
    {
      id: 'dihexa-synaptogenesis-speed',
      title: "Velocidade de Sinaptogênese Induzida por Dihexa",
      category: "Neurologia",
      image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80",
      summary: "Análise temporal da formação de novos botões sinápticos no hipocampo pós-traumatismo.",
      type: "PRO"
    },
    {
      id: 'epithalon-telomere-longitudinal',
      title: "Epithalon: Estudo Longitudinal de 25 Anos de Telômeros",
      category: "Longevidade",
      image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80",
      summary: "Resultados de acompanhamento clínico sobre a manutenção do comprimento telomérico em idosos.",
      type: "PRO"
    },
    {
      id: 'pinealon-brain-aging-russia',
      title: "Pinealon e a Reversão do Envelhecimento Cerebral Russo",
      category: "Geriatria",
      image: "https://images.unsplash.com/photo-1559757175-5700da8a5dba?auto=format&fit=crop&q=80",
      summary: "Uso de bioreguladores para restaurar a síntese proteica específica no tecido neural.",
      type: "PRO"
    },
    {
      id: 'vladonix-thymic-involution',
      title: "Reversão da Involução Tímica via Vladonix",
      category: "Imunologia",
      image: "https://images.unsplash.com/photo-1579152276503-6054944c6899?auto=format&fit=crop&q=80",
      summary: "Estudo sobre a restauração do volume do timo e produção de linfócitos T auxiliares.",
      type: "PRO"
    },
    {
      id: 'tesamorelin-liver-fat',
      title: "Tesamorelin: Redução de Gordura Ectópica Hepática",
      category: "Hepatologia",
      image: "https://images.unsplash.com/photo-1530490125459-847a6d437825?auto=format&fit=crop&q=80",
      summary: "Impacto positivo na DHGNA via modulação do hormônio do crescimento endógeno.",
      type: "PRO"
    },
    {
      id: 'dsip-sleep-architecture',
      title: "DSIP e a Restauração da Arquitetura do Sono em Insônia",
      category: "Sono",
      image: "https://images.unsplash.com/photo-1511295742364-9119171888bf?auto=format&fit=crop&q=80",
      summary: "Aumento das fases de sono profundo (ondas delta) sem sedação residual matinal.",
      type: "PRO"
    },
    {
      id: 'selank-stress-executive',
      title: "Selank: Performance Executiva sob Alta Pressão",
      category: "Psicofarmacologia",
      image: "https://images.unsplash.com/photo-1559757175-5700da8a5dba?auto=format&fit=crop&q=80",
      summary: "Manutenção da clareza mental e redução da reatividade emocional em ambientes corporativos.",
      type: "PRO"
    },
    {
      id: 'ghk-cu-skin-stems',
      title: "GHK-Cu e a Ativação de Células-Tronco Basais da Epiderme",
      category: "Dermatologia",
      image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80",
      summary: "Mecanismos de autorrenovação tecidual e redução de marcadores de envelhecimento extrínseco.",
      type: "PRO"
    },
    {
      id: 'mots-c-brown-adipose',
      title: "MOTS-c: Ativação de Tecido Adiposo Castanho (BAT)",
      category: "Metabolismo",
      image: "https://images.unsplash.com/photo-1532187875605-1838d73700b0?auto=format&fit=crop&q=80",
      summary: "Indução de termogênese adaptativa e aumento do gasto energético basal via sinalização mitocondrial.",
      type: "PRO"
    },
    {
      id: 'pancragen-exocrine-study',
      title: "Pancragen no Suporte da Função Exócrina Pancreática",
      category: "Gastroenterologia",
      image: "https://images.unsplash.com/photo-1579152276503-6054944c6899?auto=format&fit=crop&q=80",
      summary: "Melhora na digestão de macronutrientes e redução da inflamação crônica parenquimatosa.",
      type: "PRO"
    },
    {
      id: 'chelohart-myocyte-repair',
      title: "Chelohart e a Proteção de Miócitos contra Isquemia",
      category: "Cardiologia",
      image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80",
      summary: "Redução da apoptose celular cardíaca e preservação da fração de ejeção em modelos de sobrecarga.",
      type: "PRO"
    },
    {
      id: 'visoluten-macular-deg',
      title: "Visoluten na Degeneração Macular Relacionada à Idade (DMRI)",
      category: "Oftalmologia",
      image: "https://images.unsplash.com/photo-1490237014491-8aa29811ea56?auto=format&fit=crop&q=80",
      summary: "Protocolos russos demonstrando melhora na sensibilidade ao contraste e campo visual central.",
      type: "PRO"
    },
    {
      id: 'kpv-ibd-meta-study',
      title: "KPV Oral vs Tópico em Doenças Inflamatórias Intestinais (DII)",
      category: "Gastroenterologia",
      image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80",
      summary: "Análise comparativa da biodisponibilidade e redução de citocinas pró-inflamatórias colônicas.",
      type: "PRO"
    },
    {
      id: 'tb500-lung-regeneration',
      title: "TB-500: Potencial Regenerativo em Enfisema Pulmonar Inicial",
      category: "Pneumologia",
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80",
      summary: "Investigação sobre a remodelação do tecido alveolar e melhora na complacência pulmonar.",
      type: "FREE"
    },
    {
      id: 'dsip-opioid-withdrawal',
      title: "DSIP no Manejo da Síndrome de Abstinência de Opioides",
      category: "Neurologia",
      image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80",
      summary: "Eficácia do Peptídeo Indutor de Sono Profundo na mitigação de sintomas autonômicos e insônia rebote.",
      type: "FREE"
    },
    {
      id: 'cjc-1295-bone-density',
      title: "CJC-1295 (sem DAC) e a Remodelação Óssea em Atletas de Elite",
      category: "Ortopedia",
      image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80",
      summary: "Protocolo de 16 semanas demonstrando aumento na densidade mineral via pulso GH fisiológico.",
      type: "FREE"
    },
    {
      id: 'follistatin-myostat-inhib',
      title: "Folistatina-344: Inibição de Miostatina e Hipertrofia Sistêmica",
      category: "Performance",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80",
      summary: "Análise da massa magra absoluta em modelos de sarcopenia avançada pós-bloqueio de miostatina.",
      type: "FREE"
    },
    {
      id: 'ghk-cu-dna-repair',
      title: "GHK-Cu: Up-regulation de Genes de Reparo de DNA",
      category: "Longevidade",
      image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80",
      summary: "Investigação transcriptômica sobre a capacidade do peptídeo de cobre de reverter o perfil de envelhecimento.",
      type: "FREE"
    },
    {
      id: 'bpc-157-periodontal',
      title: "BPC-157 no Tratamento de Periodontite Severa",
      category: "Odontologia",
      image: "https://images.unsplash.com/photo-1532187875605-1838d73700b0?auto=format&fit=crop&q=80",
      summary: "Aceleração na regeneração do ligamento periodontal e redução da reabsorção óssea alveolar.",
      type: "FREE"
    },
    {
      id: 'mots-c-metabolic-flex-2',
      title: "MOTS-c e a Inflexibilidade Metabólica em Diabetes Tipo 2",
      category: "Endocrinologia",
      image: "https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&q=80",
      summary: "Restauração da alternância entre oxidação de glicose e gordura durante o exercício intenso.",
      type: "FREE"
    },
    {
      id: 'tesofensine-fat-oxidation',
      title: "Tesofensina: Taxa de Oxi-redução de Ácidos Graxos",
      category: "Metabolismo",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80",
      summary: "Calorimetria demonstra aumento induzido na oxidação lipídica infra-abdominal em 12 semanas.",
      type: "FREE"
    },
    {
      id: 'epithalon-dna-damage',
      title: "Epithalon e a Redução de Erros na Replicação do DNA",
      category: "Genética",
      image: "https://images.unsplash.com/photo-1464334422204-6330368147d3?auto=format&fit=crop&q=80",
      summary: "Redução estatística de danos cromossômicos em modelos de envelhecimento precoce via TERT.",
      type: "FREE"
    },
    {
      id: 'semax-adhd-trial',
      title: "Semax 0.1%: Impacto no Foco e Atenção Sustentada em TDAH",
      category: "Nootrópicos",
      image: "https://images.unsplash.com/photo-1559757117-5c7a19c5c56c?auto=format&fit=crop&q=80",
      summary: "Estudo duplo-cego sobre a melhora na memória de trabalho e controle de impulsos em adultos.",
      type: "FREE"
    },
    {
      id: 'selank-lymphocyte-activity',
      title: "Selank e a Modulação da Atividade Citolítica NKC",
      category: "Imunologia",
      image: "https://images.unsplash.com/photo-1579446569307-aa223072224d?auto=format&fit=crop&q=80",
      summary: "Aumento na vigilância imunológica tumoral via sinalização indireta de citocinas protetoras.",
      type: "FREE"
    },
    {
      id: 'visoluten-retinal-artery',
      title: "Visoluten na Reperfusão de Artéria Central da Retina",
      category: "Oftalmologia",
      image: "https://images.unsplash.com/photo-1490237014491-8aa29811ea56?auto=format&fit=crop&q=80",
      summary: "Salvamento de fotorreceptores pós-evento isquêmico via biorregulação vascular específica.",
      type: "FREE"
    },
    {
      id: 'sigumir-cartilage-growth',
      title: "Sigumir: Indução de Proliferação de Condrócitos Articulares",
      category: "Ortopedia",
      image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80",
      summary: "Mecanismos de bio-estimulação na síntese de colágeno tipo II em cartilagem hialina.",
      type: "FREE"
    },
    {
      id: 'testoluten-leydig-cell',
      title: "Testoluten e a Regeneração de Células de Leydig",
      category: "Endocrinologia",
      image: "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?auto=format&fit=crop&q=80",
      summary: "Aumento da produção androgênica endógena via sinalização de peptídeos testiculares curtos.",
      type: "FREE"
    },
    {
      id: 'libidon-prostatic-hyperplasia',
      title: "Libidon no Manejo da Hiperplasia Prostática Benigna",
      category: "Urologia",
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80",
      summary: "Redução de volume glandular e melhora na dinâmica urinária em protocolos de 90 dias.",
      type: "FREE"
    },
    {
      id: 'cortexin-concussion-recovery',
      title: "Cortexin: Recuperação Acelerada em Concussões Esportivas",
      category: "Neurologia",
      image: "https://images.unsplash.com/photo-1559757175-5700da8a5dba?auto=format&fit=crop&q=80",
      summary: "Mitigação da neuroinflamação aguda e resgate da homeostase bionergética neuronial.",
      type: "FREE"
    },
    {
      id: 'tb500-hair-follicle',
      title: "TB-500 e a Ativação de Células-Tronco do Folículo Piloso",
      category: "Estética",
      image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80",
      summary: "Estímulo à fase anágena do cabelo via formação de novos vasos e migração de células de reparo.",
      type: "FREE"
    },
    {
      id: 'bpc-157-colon-cancer-mod',
      title: "BPC-157 e a Modulação Epitelial em Modelos de Colite",
      category: "Gastroenterologia",
      image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80",
      summary: "Prevenção de transformação neoplásica via estabilização da barreira mucosa intestinal.",
      type: "FREE"
    },
    {
      id: 'mots-c-brown-fat-2',
      title: "MOTS-c e a Ativação do Tecido Adiposo Marrom (BAT)",
      category: "Longevidade",
      image: "https://images.unsplash.com/photo-1532187875605-1838d73700b0?auto=format&fit=crop&q=80",
      summary: "Indução da termogênese mitocondrial e aumento da densidade capilar no tecido adiposo.",
      type: "FREE"
    },
    {
      id: 'ss31-kidney-ischemia',
      title: "SS-31 e a Proteção contra Lesão Isquêmica Renal",
      category: "Nefrologia",
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80",
      summary: "Redução do estresse oxidativo mitocondrial em podócitos e preservação da função de filtração.",
      type: "FREE"
    },
    {
      id: 'tesamorelin-liver-fat-2',
      title: "Tesamorelin: Redução da Gordura Ectópica no Fígado (NAFLD)",
      category: "Hepatologia",
      image: "https://images.unsplash.com/photo-1530490125459-847a6d437825?auto=format&fit=crop&q=80",
      summary: "Uso do análogo GHRH para otimizar o metabolismo hepático em pacientes com lipodistrofia.",
      type: "FREE"
    },
    {
      id: 'kisspeptin-mood-hpa',
      title: "Kisspeptina-10: Impacto no Eixo HPA e Comportamento Social",
      category: "Endocrinologia",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80",
      summary: "Modulação da reatividade ao estresse e reforço na sinalização de atração e recompensa.",
      type: "FREE"
    },
    {
      id: 'pt141-erectile-central',
      title: "PT-141 (Bremelanotide): Mecanismo de Ação Central vs Periférico",
      category: "Urologia",
      image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80",
      summary: "Ativação de receptores de melanocortina MC3R/MC4R no SNC para disfunção erétil.",
      type: "FREE"
    },
    {
      id: 'melanotan-skin-barrier',
      title: "Melanotan II e o Fortalecimento da Barreira Epidérmica",
      category: "Dermatologia",
      image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80",
      summary: "Proteção contra danos UV sistêmicos via aumento da melanogênese eutrófica densa.",
      type: "FREE"
    },
    {
      id: 'epithalon-macular-reg',
      title: "Epitalamina na Regeneração da Relação Epitélio-Retina",
      category: "Oftalmologia",
      image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80",
      summary: "Protocolo de 15 anos demonstrando preservação visual em degenerações pigmentares.",
      type: "FREE"
    },
    {
      id: 'ghrp-6-gastric-motility',
      title: "GHRP-6 e a Motilidade Gástrica em Gastroparesia",
      category: "Gastroenterologia",
      image: "https://images.unsplash.com/photo-1530490125459-847a6d437825?auto=format&fit=crop&q=80",
      summary: "Sinalização de receptores de grelina para induzir esvaziamento gástrico em diabéticos.",
      type: "FREE"
    },
    {
      id: 'ipamorelin-safety-profile',
      title: "Ipamorelin: Estudo de Longo Prazo sobre Arritmogênese",
      category: "Cardiologia",
      image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80",
      summary: "Ausência de impacto na variabilidade da frequência cardíaca em doses terapêuticas.",
      type: "FREE"
    },
    {
      id: 'thymalin-autoimmunity',
      title: "Timalina no Rebalanceamento Th1/Th2 em Artrite",
      category: "Autoimunidade",
      image: "https://images.unsplash.com/photo-1579446569307-aa223072224d?auto=format&fit=crop&q=80",
      summary: "Indução de células T reguladoras (Tregs) para modulação da autoagressão tecidual.",
      type: "FREE"
    },
    {
      id: 'selank-gaba-inter',
      title: "Selank: Interações Alostéricas com o Complexo GABA-A",
      category: "Psiquiatria",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80",
      summary: "Efeito ansiolítico sustentado sem os efeitos colaterais de sedação dos benzodiazepínicos.",
      type: "FREE"
    },
    {
      id: 'semax-stroke-infarct-size',
      title: "Semax e a Redução do Tamanho da Área de Infarto em AVC",
      category: "Neurologia",
      image: "https://images.unsplash.com/photo-1559757175-5700da8a5dba?auto=format&fit=crop&q=80",
      summary: "Preservação da zona de penumbra isquêmica via supressão de radicais livres de óxido nítrico.",
      type: "FREE"
    },
    {
      id: 'adiponectin-peptide-2',
      title: "Análogos de Adiponectina: Sensibilização Insulínica Sistêmica",
      category: "Metabolismo",
      image: "https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&q=80",
      summary: "Otimização da captação de glicose em tecidos periféricos via via AMPK/p38 MAPK.",
      type: "FREE"
    },
    {
      id: 'hca-mimetics-autophagy',
      title: "Mimetismo de HCA e a Indução de Autofagia Via EP300",
      category: "Longevidade",
      image: "https://images.unsplash.com/photo-1532187875605-1838d73700b0?auto=format&fit=crop&q=80",
      summary: "Mecanismos de limpeza celular e reparo proteico em modelos de declínio cognitivo.",
      type: "FREE"
    },
    {
      id: 'foxo4-dri-senolytics',
      title: "FOXO4-DRI: O Senolítico Pró-Apoptótico de Elite",
      category: "Biologia Celular",
      image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80",
      summary: "Ruptura da interação p53/FOXO4 para eliminar seletivamente células senescentes duradouras.",
      type: "FREE"
    },
    {
      id: 'ghk-cu-extracellular',
      title: "GHK-Cu: Remodelação da Matriz Extracelular (ECM)",
      category: "Estética",
      image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80",
      summary: "Equilíbrio entre MMPs e TIMPs para evitar a degradação excessiva de colágeno e elastina.",
      type: "FREE"
    },
    {
      id: 'ss31-mitochondrial-aging',
      title: "SS-31 e a Bioenergética Mitocondrial no Coração Idoso",
      category: "Cardiologia",
      image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80",
      summary: "Melhora na função diastólica via otimização da produção de ATP e redução de ROS.",
      type: "FREE"
    },
    {
      id: 'motsc-myogenesis',
      title: "MOTS-c e a Diferenciação de Mioblastos em Tecido Maduro",
      category: "Performance",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80",
      summary: "Sinalização mitocondrial para reparo muscular acelerado pós-treino excêntrico severo.",
      type: "FREE"
    },
    {
      id: 'p21-peptide-senescence',
      title: "Peptídeo de Domínio P21: Inibição de Quinases e Câncer",
      category: "Longevidade",
      image: "https://images.unsplash.com/photo-1464334422204-6330368147d3?auto=format&fit=crop&q=80",
      summary: "Regulação do ciclo celular para prevenir a proliferação desordenada em tecidos epiteliais.",
      type: "FREE"
    },
    {
      id: 'dihexa-alzheimer-density',
      title: "Dihexa e a Restauração da Densidade Sináptica no Hipocampo",
      category: "Neurologia",
      image: "https://images.unsplash.com/photo-1559757117-5c7a19c5c56c?auto=format&fit=crop&q=80",
      summary: "Estudo sobre a reversão da perda de memória via formação de búlbulos sinápticos funcionais.",
      type: "FREE"
    },
    {
      id: 'epithalon-pineal-tumor',
      title: "Epithalon e a Redução da Incidência de Tumores de Pineal",
      category: "Oncologia",
      image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80",
      summary: "Análise de 10 anos sobre o efeito antiproliferativo sistêmico do bioregulador pineal.",
      type: "FREE"
    },
    {
      id: 'vladonix-leukocyte-count',
      title: "Vladonix na Normalização da Contagem Leucocitária",
      category: "Imunologia",
      image: "https://images.unsplash.com/photo-1579152276503-6054944c6899?auto=format&fit=crop&q=80",
      summary: "Restauração da hematopoese em pacientes submetidos a quimioterapia ou estresse tóxico.",
      type: "FREE"
    },
    {
      id: 'sigumir-joint-stiffness',
      title: "Sigumir e a Mobilidade em Atletas Sêniores",
      category: "Ortopedia",
      image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80",
      summary: "Redução da rigidez articular matinal via biorregulação do tecido conjuntivo basal.",
      type: "FREE"
    },
    {
      id: 'pancragen-glucose-delta',
      title: "Pancragen e o Delta de Glicose Pós-Prandial",
      category: "Endocrinologia",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80",
      summary: "Normalização do perfil glicêmico em pré-diabéticos via otimização das ilhotas pancreáticas.",
      type: "FREE"
    },
    {
      id: 'chelohart-vasc-compliance',
      title: "Chelohart e a Complacência Vascular em Hipertensão",
      category: "Cardiologia",
      image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80",
      summary: "Melhora na elasticidade arterial via sinalização de síntese de elastina no endotélio.",
      type: "FREE"
    },
    {
      id: 'visoluten-light-sensitivity',
      title: "Visoluten e a Recuperação da Fotossensibilidade",
      category: "Oftalmologia",
      image: "https://images.unsplash.com/photo-1490237014491-8aa29811ea56?auto=format&fit=crop&q=80",
      summary: "Otimização do ciclo visual e restauração do tempo de adaptação ao escuro.",
      type: "FREE"
    },
    {
      id: 'ibutamoren-bone-mineral',
      title: "MK-677 (Ibutamoren) e a Densidade Óssea Longitudinal",
      category: "Performance",
      image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80",
      summary: "Aumento sustentado na massa óssea mineral em protocolos de 24 meses em idosos sadios.",
      type: "FREE"
    },
    {
      id: 'bpc157-brain-gut-axis',
      title: "BPC-157 e a Conexão Eixo Intestino-Cérebro",
      category: "Neurologia",
      image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80",
      summary: "Efeito neuroprotetor mediado via restauração da barreira hemato-encefálica e integridade do vago.",
      type: "FREE"
    },
    {
      id: 'thymalin-melatonin-sync',
      title: "Timalina e a Sincronização do Ritmo Melatonérgico",
      category: "Sono",
      image: "https://images.unsplash.com/photo-1511295742364-9119171888bf?auto=format&fit=crop&q=80",
      summary: "Como o peptídeo tímico interage com a pineal para regular o ciclo sono-vigília.",
      type: "FREE"
    },
    {
      id: 'selank-immuno-stress-2',
      title: "Selank e a Resiliência Imunológica sob Estresse Social",
      category: "Imunologia",
      image: "https://images.unsplash.com/photo-1579152276503-6054944c6899?auto=format&fit=crop&q=80",
      summary: "Prevenção da linfopenia induzida por glicocorticoides via modulação do SNC.",
      type: "FREE"
    },
    {
      id: 'tb500-lung-fibrosis-2',
      title: "TB-500: Reversão da Fibrose Pulmonar por Bleomicina",
      category: "Pneumologia",
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80",
      summary: "Inibição do TGF-beta e promoção da regeneração do epitélio alveolar lesado.",
      type: "FREE"
    }
  ];

  const safetyData = {
    effects: [
      { name: "BPC-157", common: 2, rare: 1, details: "Cefaleia leve em doses altas. Raros casos de anedonia (perda momentânea de prazer) relatados anedoticamente." },
      { name: "TB-500", common: 2, rare: 1, details: "Possível letargia intensa após aplicação. Algumas pessoas relatam vermelhidão no local da injeção." },
      { name: "CJC-1295 / Ipamorelin", common: 3, rare: 2, details: "Rubor facial (flush), pequena retenção hídrica e pequenos picos de cortisol se abusado." },
      { name: "Tirzepatida", common: 4, rare: 3, details: "Náusea severa, refluxo gástrico e constipação. Risco de pancreatite se houver predisposição." },
      { name: "MK-677", common: 3, rare: 2, details: "Aumento extremo de fome, retenção de sódio e redução da sensibilidade à insulina se usado sem pausa." },
      { name: "Melanotan II", common: 4, rare: 2, details: "Náusea extrema, ereções espontâneas prolongedas e surgimento de novas sardas/pinturas." },
      { name: "Semaglutida", common: 4, rare: 3, details: "Desconforto abdominal, vômitos e redução da motilidade intestinal. Hidratação é crítica." },
      { name: "GHK-Cu", common: 1, rare: 1, details: "Ardor intenso no local da aplicação. Pode causar queda de pressão se injetado muito rápido." },
      { name: "PT-141", common: 3, rare: 2, details: "Náusea moderada a severa e congestão nasal (flush sinusal)." },
      { name: "MOTS-c", common: 2, rare: 2, details: "Calor corporal súbito e fadiga muscular agulha similar a um 'treino fantasma'." },
      { name: "ARA-290", common: 1, rare: 1, details: "Cefaleia leve e sensação de formigamento nas extremidades devido à reparação nervosa." },
      { name: "Cerebrolysin", common: 2, rare: 2, details: "Calor na cabeça, tontura e sonhos vívidos. Raros casos de irritabilidade." },
      { name: "Thymosin Alpha-1", common: 1, rare: 1, details: "Pequena reação no local da injeção. Raros casos de sintomas 'flu-like' (gripe)." }
    ],
    exams: [
      { name: "IGF-1 (Somatomedina C)", purpose: "Referência absoluta para secretagogos de GH." },
      { name: "Hemograma Completo", purpose: "Avaliar hematócrito e viscosidade sanguínea." },
      { name: "HbA1c & Insulina de Jejum", purpose: "Obrigatório para MK-677 e secretagogos GH." },
      { name: "Perfil Lipídico Completo", purpose: "Sinalizadores de HGH podem alterar o metabolismo de gorduras." },
      { name: "Progesterona & Prolactina", purpose: "Check preventivo para usuários de CJC-1295/GHRPs." },
      { name: "Creatinina & Ureia", purpose: "Monitoramento da saúde renal sob alta carga de peptídeos." },
      { name: "TGO / TGP / GGT", purpose: "Painel hepático para garantir detoxificação otimizada." },
      { name: "DHEA-S & Cortisol", purpose: "Avaliar se os secretagogos estão gerando fadiga adrenal." },
      { name: "Proteína C Reativa (PCR-us)", purpose: "Medir impacto real de peptídeos anti-inflamatórios." },
      { name: "Homocisteína", purpose: "Marcador de inflamação vascular e metilação sistêmica." },
      { name: "Testosterona Livre e Total", purpose: "Alguns protocolos podem afetar indiretamente o eixo HPTA." },
      { name: "SHBG", purpose: "Avaliar a disponibilidade hormonal total no plasma." }
    ]
  };

  if (activeArticle === 'beginners') {
    return <PeptideArticle onBack={() => setActiveArticle(null)} />;
  }

  if (activeArticle === 'reconstitution') {
    return <ReconstitutionArticle onBack={() => setActiveArticle(null)} />;
  }

  if (activeArticle === 'injection') {
    return <InjectionArticle onBack={() => setActiveArticle(null)} />;
  }

  // Handle items logic
  const selectedGuide = technicalGuides.find(g => g.id === activeArticle);
  const selectedStudy = studies.find(s => s.id === activeArticle);
  const selectedItem = selectedGuide || selectedStudy;
  
  if (selectedItem) {
    const isProContent = selectedItem.type === 'PRO';
    
    if (isProContent && !isPremium) {
      return (
        <ProGate 
          title={selectedItem.title}
          onBack={() => setActiveArticle(null)}
          onUpgrade={() => setView('plans')}
        />
      );
    }

    return (
      <PeptideArticle 
        onBack={() => setActiveArticle(null)}
        title={selectedItem.title}
        category={selectedItem.category}
        summary={selectedStudy?.summary || "Protocolos avançados de otimização biótica. Este guia contém dosagens estruturadas, janelas de aplicação e sinergias farmacológicas baseadas em biohacking de elite."}
        image={('image' in selectedItem ? (selectedItem as any).image : undefined) || "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80"}
        technicals={selectedStudy?.technicals}
        references={selectedStudy?.references}
      />
    );
  }


  return (
    <div className="min-h-screen bg-primary pb-32">
      {/* Navigation Header */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <button 
          onClick={() => setView('home')}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-accent hover:text-white transition-all group mb-12"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Voltar para o Terminal
        </button>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-4xl font-sans font-black text-white italic tracking-tighter uppercase leading-[0.9]">Aprender</h1>
              <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                Guias, estudos científicos e segurança em um só lugar.
              </p>
            </div>
            
            {!user && (
              <button 
                onClick={signInWithGoogle}
                className="hidden md:flex items-center gap-3 px-6 py-3 rounded-full bg-accent/10 border border-accent/20 text-accent hover:bg-accent/20 transition-all"
              >
                <LogIn size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">Entrar para Acesso Total</span>
              </button>
            )}
          </div>

          {/* Main Tabs Navigation */}
          <div className="p-1.5 bg-secondary/20 rounded-[24px] border border-white/15 flex items-center justify-center">
            <div className="flex w-full items-center">
              {[
                { id: 'guides', label: 'Guias', icon: <BookOpen size={14} /> },
                { id: 'studies', label: 'Estudos', icon: <Microscope size={14} /> },
                { id: 'safety', label: 'Segurança', icon: <Shield size={14} /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-[20px] text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeTab === tab.id 
                      ? 'bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)] border border-white/20' 
                      : 'text-white/30 hover:text-white/60'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-6 space-y-24">
        
        {activeTab === 'guides' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {technicalGuides.map((guide, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  onClick={() => setActiveArticle(guide.id)}
                  className="group p-6 rounded-[32px] bg-secondary/[0.01] border border-white/15 hover:border-accent/30 transition-all flex flex-col justify-between h-[240px] relative overflow-hidden cursor-pointer"
                >
                  <div className="absolute top-0 right-0 p-4">
                    <div className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest flex items-center gap-1.5 ${guide.type === 'PRO' ? 'bg-accent text-primary' : 'bg-white/10 text-white'}`}>
                      {guide.type === 'PRO' && <Crown size={10} />}
                      {guide.type}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/60 group-hover:text-accent transition-colors">
                      {guide.icon}
                    </div>
                    <div className="space-y-1">
                      <div className="text-[10px] font-bold text-accent/50 uppercase tracking-widest">{guide.category}</div>
                      <h3 className="text-sm font-black text-white uppercase italic leading-tight group-hover:text-accent transition-colors">{guide.title}</h3>
                    </div>
                  </div>

                  <button className="flex items-center justify-between w-full pt-4 border-t border-white/15 group/btn">
                    <span className="text-[9px] font-black uppercase tracking-widest text-white/60 group-hover/btn:text-white">Acessar Guia</span>
                    <ChevronRight size={14} className="text-white/40 group-hover/btn:text-accent group-hover/btn:translate-x-1 transition-all" />
                  </button>
                </motion.div>
              ))}
            </div>
            
            {!isPremium && (
              <div className="p-12 rounded-[48px] bg-accent/[0.03] border border-accent/10 text-center space-y-6">
                 <div className="text-accent text-[12px] font-black uppercase tracking-[0.5em]">Cortex Prime Exclusive</div>
                 <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">Desbloqueie todos os guias e estudos</h3>
                 <p className="text-white/60 text-sm max-w-lg mx-auto">Acesse conteúdo exclusivo com base científica para elevar seus resultados.</p>
                 <button 
                   onClick={() => setView('plans')}
                   className="px-10 py-5 bg-accent text-primary font-black text-[10px] uppercase tracking-widest mx-auto block hover:scale-105 active:scale-95 transition-all"
                   style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
                 >
                   Assinar Agora
                 </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'studies' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {studies.map((study, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  onClick={() => setActiveArticle(study.id)}
                  className="group rounded-[32px] bg-secondary/[0.01] border border-white/15 overflow-hidden cursor-pointer h-full flex flex-col"
                >
                  <div className="aspect-video relative overflow-hidden bg-white/10 shrink-0">
                    <img 
                      src={study.image} 
                      alt={study.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow space-y-4">
                    <div className="space-y-3 min-h-[80px]">
                      <div className="px-2 py-0.5 rounded bg-accent/10 border border-accent/20 text-accent text-[7px] font-black uppercase tracking-[0.2em] inline-block mb-1">
                        {study.category}
                      </div>
                      <h3 className="text-[13px] font-black text-white uppercase italic leading-tight group-hover:text-accent transition-colors line-clamp-2">{study.title}</h3>
                    </div>
                    <p className="text-[11px] text-white/60 leading-relaxed line-clamp-3 flex-grow">{study.summary}</p>
                    <button className="text-[9px] font-black text-accent uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all pt-2 mt-auto">
                      Ler Resumo Analítico <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Locked Content Info */}
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 opacity-40 grayscale">
              <Lock size={48} className="text-white/40" />
              <div className="space-y-2">
                <h4 className="text-xl font-black text-white uppercase italic">Base de Estudos Restrita</h4>
                <p className="text-xs text-white/60 uppercase tracking-widest font-bold">Mais 452 estudos disponíveis apenas para membros Prime</p>
              </div>
            </div>

            {/* Data Source Footer Section */}
            <div className="pt-20 pb-10 border-t border-white/15 space-y-12">
              <div className="text-center space-y-2">
                <div className="text-accent text-[10px] font-black uppercase tracking-[0.5em]">Excelência em Dados</div>
                <h3 className="text-[10px] font-black text-white/60 uppercase tracking-[0.4em]">Protocolos Estruturados sob dados de:</h3>
              </div>
              
              <div className="max-w-5xl mx-auto p-12 rounded-[40px] bg-secondary/[0.01] border border-white/15 flex flex-wrap items-center justify-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-[#004e92]/20 border border-[#004e92]/30 flex items-center justify-center text-[10px] font-black text-[#004e92]">NIH</div>
                  <div className="space-y-0.5">
                    <div className="text-[11px] font-black text-white uppercase italic">PubMed</div>
                    <div className="text-[8px] font-black text-white/40 uppercase tracking-widest leading-none">Database</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-[#002147]/20 border border-[#002147]/30 flex items-center justify-center text-[10px] font-black text-[#002147]">CT</div>
                  <div className="space-y-0.5">
                    <div className="text-[11px] font-black text-white uppercase italic">ClinicalTrials.gov</div>
                    <div className="text-[8px] font-black text-white/40 uppercase tracking-widest leading-none">Human Trials</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-[#f68b1f]/20 border border-[#f68b1f]/30 flex items-center justify-center text-[10px] font-black text-[#f68b1f]">PC</div>
                  <div className="space-y-0.5">
                    <div className="text-[11px] font-black text-white uppercase italic">PubChem</div>
                    <div className="text-[8px] font-black text-white/40 uppercase tracking-widest leading-none">Bio-chemistry</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-[#00a859]/20 border border-[#00a859]/30 flex items-center justify-center text-[10px] font-black text-[#00a859]">WADA</div>
                  <div className="space-y-0.5">
                    <div className="text-[11px] font-black text-white uppercase italic font-mono">Anti-Doping</div>
                    <div className="text-[8px] font-black text-white/40 uppercase tracking-widest leading-none">Compliance</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'safety' && (
          <div className="space-y-6">
            <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest px-4">
              Efeitos colaterais, exames de sangue e contraindicações para uso seguro de peptídeos.
            </p>

            {/* Safety Sub-Tabs Navigation */}
            <div className="p-1.5 bg-secondary/20 rounded-[24px] border border-white/15 flex items-center justify-center">
              <div className="flex w-full items-center">
                {[
                  { id: 'effects', label: 'Efeitos', icon: <Zap size={12} /> },
                  { id: 'exams', label: 'Exames', icon: <Microscope size={12} /> },
                  { id: 'risks', label: 'Riscos', icon: <Shield size={12} /> }
                ].map((sTab) => (
                  <button
                    key={sTab.id}
                    onClick={() => setSafetySubTab(sTab.id as any)}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-[20px] text-[10px] font-black uppercase tracking-widest transition-all ${
                      safetySubTab === sTab.id 
                        ? 'bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)] border border-white/20' 
                        : 'text-white/30 hover:text-white/60'
                    }`}
                  >
                    {sTab.icon}
                    {sTab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6">
              {safetySubTab === 'effects' && (
                <div className="space-y-4">
                  <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] mb-4 px-4">Tabela de efeitos colaterais por peptídeo com estratégias de mitigação.</div>
                  <div className="grid gap-3">
                    {safetyData.effects.map((item, i) => (
                      <details key={i} className="group p-4 rounded-2xl bg-secondary/[0.01] border border-white/15 hover:border-white/20 transition-all">
                        <summary className="flex items-center justify-between cursor-pointer list-none">
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-lg bg-orange-500/5 border border-orange-500/10 flex items-center justify-center text-orange-400">
                              <AlertTriangle size={14} />
                            </div>
                            <div className="space-y-0.5">
                              <div className="text-sm font-black text-white uppercase italic">{item.name}</div>
                              <div className="text-[8px] font-bold text-white/40 uppercase tracking-widest">
                                {item.common} comuns • {item.rare} raros
                              </div>
                            </div>
                          </div>
                          <ChevronRight size={16} className="text-white/40 group-open:rotate-90 transition-transform" />
                        </summary>
                        <div className="mt-4 pt-4 border-t border-white/15 text-[10px] text-white/60 leading-relaxed font-bold uppercase tracking-widest">
                          {item.details}
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              )}

              {safetySubTab === 'exams' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between px-4">
                    <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Checklist de exames de sangue para monitoramento durante ciclos.</p>
                    <div className="px-3 py-1 rounded-lg bg-accent/10 border border-accent/20 text-accent text-[8px] font-black uppercase tracking-widest">
                      {completedExams.length}/{safetyData.exams.length} realizados
                    </div>
                  </div>

                  {/* Interactive Table */}
                  <div className="relative overflow-hidden rounded-[32px] border border-white/15 bg-secondary/[0.01]">
                    <div className="overflow-x-auto p-8">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-white/15">
                            <th className="pb-4 w-12"></th>
                            <th className="pb-4 text-[10px] font-black text-white/60 uppercase tracking-widest">Marcador</th>
                            <th className="pb-4 text-[10px] font-black text-white/60 uppercase tracking-widest">Objetivo Técnico</th>
                            <th className="pb-4 text-[10px] font-black text-white/60 uppercase tracking-widest">Status</th>
                          </tr>
                        </thead>
                        <tbody className="text-xs">
                          {safetyData.exams.map((exam, i) => {
                            const isCompleted = completedExams.includes(exam.name);
                            return (
                              <tr 
                                key={i} 
                                className={`border-b border-white/15 transition-colors cursor-pointer hover:bg-white/[0.02] ${isCompleted ? 'opacity-50' : ''}`}
                                onClick={() => {
                                  setCompletedExams(prev => 
                                    prev.includes(exam.name) 
                                      ? prev.filter(e => e !== exam.name)
                                      : [...prev, exam.name]
                                  );
                                }}
                              >
                                <td className="py-5">
                                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                                    isCompleted ? 'bg-accent border-accent text-primary' : 'border-white/20'
                                  }`}>
                                    {isCompleted && <Check size={12} />}
                                  </div>
                                </td>
                                <td className="py-5">
                                  <div className="font-black text-white italic">{exam.name}</div>
                                </td>
                                <td className="py-5">
                                  <div className="text-white/50 text-[10px] font-bold uppercase tracking-tight max-w-sm">{exam.purpose}</div>
                                </td>
                                <td className="py-5">
                                  <span className={`text-[8px] font-black uppercase tracking-widest ${isCompleted ? 'text-accent' : 'text-white/40'}`}>
                                    {isCompleted ? 'Realizado' : 'Pendente'}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    <div className="p-8 border-t border-white/15 bg-black/40">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">Progresso dos Exames</span>
                        <span className="text-[10px] font-black text-accent uppercase tracking-widest">
                          {Math.round((completedExams.length / safetyData.exams.length) * 100)}%
                        </span>
                      </div>
                      <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-accent transition-all duration-500" 
                          style={{ width: `${(completedExams.length / safetyData.exams.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {safetySubTab === 'risks' && (
                <div className="space-y-8">
                  <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest px-4">Condições que impedem o uso de determinados peptídeos.</p>

                  {/* Absolute Contraindications */}
                  <div className="p-8 md:p-12 rounded-[48px] bg-red-500/[0.02] border border-red-500/10 space-y-8">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      <h3 className="text-lg font-black text-red-500 uppercase italic tracking-tight">Contraindicações Absolutas</h3>
                    </div>
                    <div className="grid gap-4">
                      {[
                        { title: 'Câncer Ativo', desc: 'Peptídeos que estimulam angiogênese (BPC-157, TB-500) ou divisão celular (GHRPs) podem acelerar o crescimento tumoral.' },
                        { title: 'Retinopatia Diabética', desc: 'Peptídeos que estimulam GH podem agravar a vascularização ocular anômala.' },
                        { title: 'Pancreatite', desc: 'Contraindicação absoluta para agonistas de GLP-1 (Tirzepatida/Semaglutida).' },
                        { title: 'Gravidez / Amamentação', desc: 'Dados de segurança nulos. Risco de alteração na sinalização hormonal fetal.' },
                        { title: 'Uso de Insulina', desc: 'IGF-1 e GHRPs combinados com insulina elevam o risco de hipoglicemia severa fatal.' },
                        { title: 'Doença Renal Crônica', desc: 'A carga de processamento de pequenos peptídeos pode exigir rins saudáveis.' },
                        { title: 'Histórico de Melanoma', desc: 'Contraindicação absoluta para o uso de Melanotan I ou II.' }
                      ].map((item, i) => (
                        <div key={i} className="p-6 rounded-[24px] bg-white/[0.02] border border-white/15 flex items-start gap-4">
                          <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 shrink-0">
                            <span className="text-xs font-black">✕</span>
                          </div>
                          <div>
                            <div className="text-xs font-black text-white uppercase italic mb-1">{item.title}</div>
                            <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest leading-normal">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Relative Contraindications */}
                  <div className="p-8 md:p-12 rounded-[48px] bg-orange-500/[0.02] border border-orange-500/10 space-y-8">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      <h3 className="text-lg font-black text-orange-500 uppercase italic tracking-tight">Contraindicações Relativas</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { title: 'Autoimunidade Ativa', desc: 'Moduladores como Thymosin Alpha-1 podem exacerbar flares.' },
                        { title: 'Hipertensão Não Controlada', desc: 'CJC/Ipamorelin podem aumentar momentaneamente a pressão.' },
                        { title: 'Ansiedade Severa', desc: 'Estimulantes como o GHRP-2 podem disparar crises de pânico.' },
                        { title: 'Histórico de Colesterol Alto', desc: 'HGH pode impactar as frações de LDL/HDL agudamente.' }
                      ].map((item, i) => (
                        <div key={i} className="p-6 rounded-[24px] bg-white/[0.02] border border-white/15 flex items-start gap-4">
                          <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 shrink-0">
                            <AlertTriangle size={14} />
                          </div>
                          <div>
                            <div className="text-xs font-black text-white uppercase italic mb-1">{item.title}</div>
                            <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest leading-normal">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dangerous Combinations */}
                  <div className="p-8 md:p-12 rounded-[48px] bg-red-950/20 border border-red-500/10 space-y-8">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      <h3 className="text-lg font-black text-red-400 uppercase italic tracking-tight">Combinações Perigosas</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-white/15">
                            <th className="pb-4 text-[10px] font-black text-white/60 uppercase tracking-widest">Combinação</th>
                            <th className="pb-4 text-[10px] font-black text-white/60 uppercase tracking-widest">Risco</th>
                            <th className="pb-4 text-[10px] font-black text-white/60 uppercase tracking-widest">Motivo</th>
                          </tr>
                        </thead>
                        <tbody className="text-[10px] font-bold uppercase tracking-widest">
                          {[
                            { combo: 'CJC-1295 + GHRP-6', risk: 'Hipoglicemia / Fome', note: 'Aumento massivo de ghrelina e cortisol.' },
                            { combo: 'Tirzepatida + Semaglutida', risk: 'Desidratação / Vômito', note: 'Sobrecarga de receptores GLP-1/GIP.' },
                            { combo: 'IGF-1 + Insulina', risk: 'Hipoglicemia Severa', note: 'Ambos reduzem glicose no sangue drasticamente.' },
                            { combo: 'MK-677 + Carboidratos Simples', risk: 'Resistência à Insulina', note: 'MK aumenta glicemia; carbs exacerbam o dano.' },
                            { combo: 'Melanotan II + Sildenafila', risk: 'Priapismo / Pressão', note: 'Ambos causam vasodilatação e sinalização erétil.' },
                            { combo: 'MotS-c + Treino de Alta Intensidade', risk: 'Acidose Láctica', note: 'Produção massiva de lactato via ativação mitocondrial.' }
                          ].map((item, i) => (
                            <tr key={i} className="border-b border-white/15">
                              <td className="py-6 text-white font-black">{item.combo}</td>
                              <td className="py-6">
                                <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[8px]">{item.risk}</span>
                              </td>
                              <td className="py-6 text-white/30 italic">{item.note}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Disclaimer */}
                  <div className="p-6 rounded-[32px] bg-white/[0.01] border border-white/15 text-center">
                    <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest leading-relaxed">
                      <span className="text-orange-500/50">⚠ Disclaimer:</span> Este conteúdo é educacional e baseado em pesquisa. Consulte sempre um profissional de saúde antes de iniciar qualquer protocolo com peptídeos.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CTA Section */}
        {!isPremium && (
          <div className="text-center py-20 space-y-8 bg-accent/5 rounded-[64px] border border-accent/10">
            <div className="text-accent text-[12px] font-black uppercase tracking-[0.5em] animate-pulse">Cortex Prime</div>
            <h2 className="text-3xl md:text-5xl font-sans font-black text-white uppercase italic tracking-tighter leading-none">Domine a Biologia Molecular</h2>
            <p className="text-white/60 text-sm font-medium max-w-lg mx-auto">Queremos levar você ao seu potencial máximo. Assine agora e desbloqueie o maior acervo de peptídeos do Brasil.</p>
            <button 
              onClick={() => setView('plans')}
              className="px-12 py-6 bg-accent text-black font-black text-[11px] uppercase tracking-[0.3em] transition-all hover:scale-105 active:scale-95 mx-auto block"
              style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
            >
              Ver Planos e Preços
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
