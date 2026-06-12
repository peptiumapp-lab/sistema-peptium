import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Cpu, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Neural Link estabelecido. Como posso otimizar sua performance hoje?' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputVal.trim() || isLoading) return;

    const userText = inputVal.trim();
    setInputVal('');
    
    const newMessages: Message[] = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      
      const data = await resp.json();
      
      if (data.success && data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: `[FALHA DE CONEXÃO] ${data.error?.message || 'Erro de comunicação.'}` }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: '[FALHA DE CONEXÃO] Enlace com Atlas Neural Engine perdido.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="mb-4 w-80 sm:w-96 h-[500px] max-h-[80vh] bg-secondary border border-accent/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="px-4 py-3 bg-secondary/80 backdrop-blur-sm border-b border-white/5 flex justify-between items-center z-10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-xs font-black uppercase text-white tracking-wider">Atlas IA</span>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/10 rounded-md transition-colors text-white/50 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Chat Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-accent/20 scrollbar-track-transparent">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                      msg.role === 'user' 
                        ? 'bg-accent text-black font-medium rounded-tr-sm' 
                        : 'bg-white/5 text-white border border-white/10 rounded-tl-sm'
                    }`}>
                      {msg.role === 'assistant' ? (
                        <div className="markdown-body text-[13px] leading-relaxed prose prose-invert prose-p:my-1 text-white/90">
                           <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                      ) : (
                        <span>{msg.content}</span>
                      )}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white/5 text-white/50 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-2 flex items-center gap-2">
                      <Loader2 size={14} className="animate-spin text-accent" />
                      <span className="text-xs uppercase tracking-wider font-bold">Processando...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Footer */}
              <div className="p-3 bg-secondary/80 border-t border-white/5">
                <form 
                  onSubmit={handleSend}
                  className="flex items-center gap-2 bg-black/50 border border-white/10 rounded-xl p-1"
                >
                  <input 
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="Terminal AI..."
                    className="flex-1 bg-transparent border-none outline-none text-white text-sm px-3 placeholder-white/30"
                  />
                  <button 
                    type="submit"
                    disabled={!inputVal.trim() || isLoading}
                    className="p-2 bg-accent text-black rounded-lg disabled:opacity-50 hover:bg-white transition-colors"
                  >
                    <Send size={16} className={inputVal.trim() && !isLoading ? 'opacity-100' : 'opacity-50'} />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-4 shadow-2xl transition-all duration-300 flex items-center gap-3 font-bold tracking-wide ${
            isOpen ? 'rounded-full bg-secondary text-white border border-white/10 hover:border-white/30' : 'rounded-full bg-accent text-black hover:bg-white hover:scale-105 px-6'
          }`}
        >
          {isOpen ? (
            <X size={24} />
          ) : (
            <>
              <MessageSquare size={24} />
              <span className="text-sm tracking-tight">Assistente IA</span>
            </>
          )}
        </button>
      </div>
    </>
  );
}
