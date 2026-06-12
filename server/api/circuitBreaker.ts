import CircuitBreaker from 'opossum';

// Configurações Globais do Circuit Breaker para chamadas de IA
const circuitBreakerOptions = {
  timeout: 45000, // Se a chamada demorar mais que 45 segundos, falhar.
  errorThresholdPercentage: 50, // Se 50% das chamadas falharem dentro de um período, abra o circuito.
  resetTimeout: 30000, // Após 30 segundos com o circuito aberto, tentar enviar uma requisição para ver se a API voltou.
};

// Singleton para o Circuit Breaker de Análise de Stack
export const createCircuitBreaker = (action: (...args: any[]) => Promise<any>) => {
  const breaker = new CircuitBreaker(action, circuitBreakerOptions);
  
  breaker.fallback((error: any) => {
    console.error('Circuit Breaker Fallback Acionado:', error?.message);
    throw new Error('ATLAS NEURAL OFFLINE (Circuit Breaker Tripped). As redes neurais estão temporariamente inacessíveis. Proteção contra falhas ativada.');
  });
  
  breaker.on('open', () => console.warn('Circuit Breaker ABERTO - Pare de enviar tráfego!'));
  breaker.on('halfOpen', () => console.info('Circuit Breaker MEIO-ABERTO - Testando recuperação da API...'));
  breaker.on('close', () => console.info('Circuit Breaker FECHADO - Tráfego restaurado normalmente.'));
  
  return breaker;
};
