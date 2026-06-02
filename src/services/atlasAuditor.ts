import { PROTOCOLS, SYNERGY_PROTOCOLS } from '../constants';
import { SynergyProtocol } from '../types';

export interface AuditResult {
  availableSynergies: SynergyProtocol[];
  healthStatus: 'optimal' | 'imbalanced' | 'critical';
  recommendations: string[];
}

/**
 * Atlas Auditor - O motor lógico de integridade e inteligência preditiva cruzada.
 * Analisa as moléculas disponíveis e identifica sinergias latentes.
 */
export const auditInventory = (availablePeptideIds: string[] = []): AuditResult => {
  const ids = Array.isArray(availablePeptideIds) ? availablePeptideIds : [];
  
  const availableSynergies = (SYNERGY_PROTOCOLS || []).filter(protocol => 
    protocol && 
    protocol.peptides && 
    Array.isArray(protocol.peptides) && 
    protocol.peptides.every(peptideId => ids.includes(peptideId))
  );

  let healthStatus: 'optimal' | 'imbalanced' | 'critical' = 'imbalanced';
  if (availableSynergies.length >= 2) healthStatus = 'optimal';
  if (ids.length < 3) healthStatus = 'critical';

  const recommendations: string[] = [];
  
  // Lógica preditiva para Gut-Brain
  if (ids.includes('bpc-157') && ids.includes('selank') && !ids.includes('bpc-oral')) {
    recommendations.push('Atenção: Para o Gut-Brain Axis Reset completo, considere a variação estável BPC-157 Arginato (Oral).');
  }

  if (ids.includes('semax') && !ids.includes('selank')) {
    recommendations.push('Dica de Sinergia: Adicione Selank para equilibrar o foco executivo do Semax com biorregulação ansiolítica.');
  }

  return {
    availableSynergies,
    healthStatus,
    recommendations
  };
};
