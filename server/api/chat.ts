import express, { Request, Response } from 'express';
import { GoogleGenAI } from "@google/genai";
import { createCircuitBreaker } from './circuitBreaker';

const router = express.Router();

const getAIClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error('GEMINI_API_KEY is not defined in the environment variables');
    }
    return new GoogleGenAI({ apiKey });
};

router.post('/', async (req: Request, res: Response): Promise<any> => {
    try {
        const ai = getAIClient();
        const { messages } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ success: false, error: 'Lista de mensagens inválida.' });
        }

        const systemInstruction = `
Você é a inteligência artificial embarcada no sistema Peptium Prime, um ecossistema focado no mercado de biohacking, performance extrema e suporte com peptídeos e compostos avançados.
Sua comunicação deve ser:
- Profissional, direta e fria, com uma estética 'Tech/Cybernetics'.
- Adapte o idioma automaticamente: responda no MESMO IDIOMA em que o usuário fizer a pergunta.
- EXTREMAMENTE CONCISA E DIRETA. Responda com no máximo 1 ou 2 frases curtas, a menos que o usuário peça detalhes.
- Vá direto ao ponto para economizar tempo e processamento.
- Você é focado no mercado da longevidade e otimização molecular.

Responda baseando-se no histórico da conversa fornecido.
`;

        const formattedContents = messages.map((msg: any) => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }]
        }));

        // Adiciona a instrução do sistema como primeira mensagem do user simulado, se necessário, ou usa systemInstruction (se suportado nas configs).
        // A API mais recente suporta systemInstruction no config
        const performChat = async () => {
            let lastError: any;
            const modelsToTry = ["gemini-3.5-flash", "gemini-3.1-pro-preview", "gemini-3.1-flash-lite", "gemini-flash-latest"];
            
            for (const model of modelsToTry) {
                try {
                    const response = await ai.models.generateContent({
                        model: model,
                        contents: formattedContents,
                        config: {
                             systemInstruction: systemInstruction,
                        }
                    });
                    return response;
                } catch (aiError: any) {
                    console.warn(`Aviso: Tentativa com ${model} falhou no chat:`, aiError.message);
                    lastError = aiError;
                }
            }
            throw new Error(`Atlas Neural Engine Chat temporariamente sobrecarregado. Último erro: ${lastError?.message}`);
        };

        const breaker = createCircuitBreaker(performChat);
        const response = await breaker.fire();

        if (response && response.text) {
            return res.status(200).json({ success: true, reply: response.text });
        } else {
            throw new Error("Resposta da IA vazia ou mal formatada.");
        }

    } catch (error: any) {
        console.error('Chat API Error:', error);
        return res.status(503).json({
            success: false,
            error: {
                message: error?.message || 'Atlas Neural Engine temporariamente sobrecarregado.',
            }
        });
    }
});

export default router;
