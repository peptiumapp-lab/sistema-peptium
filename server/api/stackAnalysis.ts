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

router.post('/analyze-stack', async (req: Request, res: Response) => {
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
      - score: (número 0-100 refletindo a eficiência da sinergia)
      - compatibility: (string: "Ótima", "Boa", "Razoável", "Crítica")
      - synergySummary: (uma frase resumindo a interação molecular)
      - detailedAnalysis: (explicação técnica da biologia e mecanismos de ação combinados)
      - risks: (array de strings com colaterais, riscos sistêmicos ou avisos importantes)
      - advice: (uma dica de biohacking de elite para otimizar esse stack específico)

      Responda APENAS o JSON em Português do Brasil.
    `;

    let response;
    try {
      response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        }
      });
    } catch (aiError: any) {
      console.error('AI Generation Error:', aiError);
      return res.status(502).json({
        success: false,
        error: {
          code: 'AI_SERVICE_ERROR',
          message: 'Falha ao se comunicar com o serviço de inteligência artificial.',
          details: aiError.message
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
