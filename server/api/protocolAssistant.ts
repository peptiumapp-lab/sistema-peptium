import express, { Request, Response } from 'express';
import { GoogleGenAI } from "@google/genai";

const router = express.Router();

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

router.post('/protocol-assistant', async (req: Request, res: Response) => {
  try {
    const { intent } = req.body;

    if (!intent) {
      return res.status(400).json({ 
        success: false, 
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Nenhum objetivo clínico informado.'
        }
      });
    }

    console.log('--- INICIANDO GERAÇÃO ATLAS AI BUILDER V4.0 ---');
    const ai = getAIClient();

    const prompt = `
      Aja como um Arquiteto Biohacker de Elite da Matrix Prime Labs.
      O cliente informou o seguinte objetivo fisiológico/clínico em linguagem natural:
      "${intent}"
      
      Gere um protocolo cirúrgico (stack) contendo as melhores moléculas e peptídeos da nossa base de ponta.
      Responda em formato JSON estrito (sem markdown) com os seguintes campos:
      - protocolName: (Nome oficial do protocolo gerado, ex: "Projeto Fênix Termogênica")
      - physiologicalRationale: (Racional fisiológico, como a bioquímica vai agir no corpo)
      - coreCompounds: (array de objetos com { name: string, action: string } sugerindo moléculas - ex: Tirzepatida, TB-500, etc. e suas ações precisas)
      - mitigationMatrix: (array de objetos com { risk: string, mitigation: string } detalhando os riscos projetados e manobras clínicas para contorná-los - ex: alternação de dosagem e proteção receptora)
      - structuralTactics: (Texto explicando a estruturação tática, como e por que tomar cada uma)
      - receptorSynergy: (Explicação de como essas drogas vão interagir pacificamente sem conflito de vias)

      Responda APENAS com o JSON documentado em Português do Brasil.
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
    console.log('Atlas AI Builder: Geração Concluída.');
    
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
    console.error('Atlas AI Builder Error:', error);
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
