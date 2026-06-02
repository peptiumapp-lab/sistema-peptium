import express, { Request, Response } from 'express';
import { GoogleGenAI } from "@google/genai";

const router = express.Router();

// Inicialização de acordo com o skill gemini-api
const getAIClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    throw new Error('CONFIGURAÇÃO PENDENTE: Clique em "Settings" > "Secrets" e adicione sua GEMINI_API_KEY.');
  }

  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
};

interface StackAnalysisResponse {
  score: number;
  compatibility: string;
  synergySummary: string;
  receptorSynergy: string;
  redFlags: string[];
  mitigationMatrix: string[];
  advice: string;
}

router.post('/', async (req: Request, res: Response) => {
  try {
    const { peptides } = req.body;

    if (!peptides || !Array.isArray(peptides) || peptides.length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Nenhum peptídeo selecionado para análise.'
        }
      });
    }

    console.log('--- INICIANDO AUDITORIA ATLAS V3.1 ---');
    const ai = getAIClient();

    const prompt = `
      Aja como um Arquiteto Biohacker de Elite da Matrix Prime Labs.
      Analise o seguinte "Stack" personalizado de peptídeos:
      
      ${peptides.map((p: any) => `- ${p.name}: ${p.description}`).join('\n')}
      
      Gere um relatório técnico de sinergia em formato JSON estrito (sem markdown) com os seguintes campos:
      - score: (número 0-100 refletindo a eficiência geral sinérgica)
      - compatibility: (string curta representando a compatibilidade, ex: "Ótima", "Crítica")
      - synergySummary: (uma frase de impacto resumindo a interação molecular)
      - receptorSynergy: (texto explicando como as moléculas se ajudam nos receptores, criando efeito multiplicador)
      - redFlags: (array de strings com alertas biológicos de colisões de vias, sobrecarga hepática, ou excesso de GH)
      - mitigationMatrix: (array de strings explicando as táticas defensivas para proteger o organismo usando este stack)
      - advice: (uma dica de biohacking de elite para otimizar esse stack)

      Responda APENAS com o JSON documentado em Português do Brasil.
    `;

    const modelsToTry = ["gemini-3.5-flash", "gemini-3.1-pro-preview", "gemini-3.1-flash-lite", "gemini-flash-latest"];
    let response;
    let lastError: any;

    for (const model of modelsToTry) {
      try {
        console.log(`Tentando análise com o modelo: ${model}`);
        response = await ai.models.generateContent({
          model: model,
          contents: prompt,
          config: {
            responseMimeType: "application/json",
          }
        });
        break; // Success!
      } catch (aiError: any) {
        console.warn(`Aviso: Tentativa com ${model} falhou:`, aiError.message);
        lastError = aiError;
      }
    }

    if (!response) {
      console.error('AI Analysis Error após tentar todos os modelos:', lastError?.message);
      return res.status(503).json({
        success: false,
        error: {
          code: 'AI_SERVICE_ERROR',
          message: 'Atlas Neural Engine temporariamente sobrecarregado (Alta Demanda). Os modelos de contingência também falharam. Tente novamente em instantes.',
          details: lastError?.message
        }
      });
    }

    const text = response.text;
    console.log('Atlas Neural: Análise Concluída.');
    
    // Pequena limpeza caso o modelo retorne markdown ```json
    const cleanedText = text.replace(/```json\n?|```/g, '').trim();
    let analysis;
    try {
      analysis = JSON.parse(cleanedText);
    } catch (parseError: any) {
      return res.status(500).json({
        success: false,
        error: {
          code: 'PARSE_ERROR',
          message: 'Falha ao processar a resposta da inteligência artificial.'
        }
      });
    }

    return res.status(200).json({
      success: true,
      data: analysis
    });
  } catch (error: any) {
    console.error('Atlas Analysis Error:', error);
    return res.status(500).json({ 
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'FALHA NA TRANSMISSÃO NEURAL',
        details: error.message
      }
    });
  }
});

export default router;
