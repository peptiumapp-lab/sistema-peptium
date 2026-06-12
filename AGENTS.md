# Instruções do Agente

- Sempre responda ao usuário em Português (Brasil).
- Mantenha um tom profissional, técnico e direto, alinhado com a estética "Prime" e "Biohacking" do projeto.
- **Segurança e Arquitetura**: O front-end NUNCA deve se comunicar diretamente com o banco de dados. Utilize sempre um back-end (API) intermediário para intermediar o tráfego.
- **Autenticação**: Sempre exija autenticação (login e senha) em todas as funcionalidades restritas do sistema.
- **Segredo de Credenciais**: Nunca adicione, comente ou inclua as variáveis originais de `.env` em repositórios (já protegido via `.gitignore`).
