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
      return res.status(400).json({ error: 'Nenhum peptídeo selecionado para análise.' });
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

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text;
    console.log('Atlas Neural: Análise Concluída.');
    
    // Pequena limpeza caso o modelo retorne markdown ```json
    const cleanedText = text.replace(/```json\n?|```/g, '').trim();
    const analysis = JSON.parse(cleanedText);

    res.json(analysis);
  } catch (error: any) {
    console.error('Atlas Analysis Error:', error);
    res.status(500).json({ 
      error: 'FALHA NA TRANSMISSÃO NEURAL',
      details: error.message 
    });
  }
});

export default router;
