  // Objeto de perguntas e respostas
  const faq = {
    "o que e uma landing page e por que preciso de uma?": "Uma Landing Page é uma página da web projetada para converter visitantes em leads ou clientes. Ela é otimizada para gerar uma ação específica, como o preenchimento de um formulário ou a compra de um produto.",
    "como posso medir o sucesso das minhas campanhas de social media?": "O sucesso pode ser medido através de métricas como engajamento (curtidas, comentários e compartilhamentos), alcance, cliques no link e conversões. Ferramentas de análise, como o Google Analytics, também podem ajudar.",
    "o que e trafego pago e como funciona?": "Tráfego pago refere-se a visitantes que chegam ao seu site por meio de anúncios pagos, como Google Ads ou anúncios em redes sociais. Você paga por cliques ou impressões para direcionar o tráfego.",
    "como o copywriting pode ajudar meu negocio?": "O copywriting é a arte de escrever textos persuasivos que incentivam o leitor a realizar uma ação, como comprar um produto ou se inscrever em uma lista de e-mails. Um bom copy pode aumentar suas taxas de conversão.",
    "qual e a importancia de uma estrategia para as redes sociais?": "Uma estratégia sólida ajuda a definir seu público-alvo, o tipo de conteúdo a ser criado e como medir os resultados. Isso maximiza o engajamento e o alcance da sua marca nas redes sociais.",
    "que tipo de edicao de video/foto voces oferecem?": "Oferecemos edição profissional de vídeos e fotos, incluindo cortes, adição de efeitos, otimização de imagens e criação de conteúdo visual que se alinha à sua marca.",
    "o que e a estruturacao de bancos de dados?": "A estruturação de bancos de dados envolve o design e a implementação de um sistema que organiza e armazena dados de forma eficiente, garantindo que as informações sejam acessíveis e utilizáveis.",
    "quanto tempo leva para construir um site?": "O tempo de construção depende da complexidade do site. Um site simples pode ser concluído em algumas semanas, enquanto um site mais complexo pode levar meses.",
    "voces também constroem aplicativos?": "Sim, desenvolvemos aplicativos personalizados para atender às suas necessidades específicas, tanto para dispositivos móveis quanto para desktop, focando na experiência do usuário e na funcionalidade.",
    "como funciona a automatizacao de processos?": "A automatização de processos utiliza tecnologia para executar tarefas repetitivas, economizando tempo e reduzindo erros. Isso pode incluir desde envio de e-mails automáticos até integração de sistemas.",
    "o que e analise de dados e como pode ajudar meu negocio?": "A análise de dados envolve a coleta e interpretação de dados para identificar padrões e tendências. Isso ajuda a tomar decisões informadas e a otimizar estratégias de negócios.",
    "como a integracao com sistemas funciona?": "Integração com sistemas envolve conectar diferentes plataformas e aplicativos para permitir que eles compartilhem dados e funcionem de forma sinérgica, melhorando a eficiência operacional.",
    "voces oferecem serviços de formatação de relatórios?": "Sim, oferecemos serviços de formatação de relatórios para apresentar dados de maneira clara e visualmente atraente, ajudando na comunicação de informações importantes para sua equipe ou clientes."
};

// Função para normalizar texto (remover acentos e converter para minúsculas)
function normalizeText(text) {
    return text
        .toLowerCase() // Converte para minúsculas
        .normalize("NFD") // Normaliza a string
        .replace(/[\u0300-\u036f]/g, ""); // Remove os acentos
}

document.getElementById('sendBtn').addEventListener('click', sendMessage);
document.getElementById('userInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') sendMessage();
});

function sendMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();

    if (message) {
        addMessage('user', message);
        userInput.value = ''; // Limpa o campo após enviar

        // Normaliza a mensagem do usuário
        const normalizedMessage = normalizeText(message);

        // Verifica se a mensagem normalizada está nas perguntas frequentes
        if (faq[normalizedMessage]) {
            setTimeout(() => {
                addMessage('bot', faq[normalizedMessage]);
            }, 1000);
        } else {
            // Resposta padrão se a pergunta não estiver nas FAQ
            setTimeout(() => {
                addMessage('bot', 'Essa é uma resposta automática.');
            }, 1000);
        }
    }
}

function addMessage(sender, text) {
    const chatBody = document.getElementById('chatBody');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    const messageContent = document.createElement('p');
    const icon = sender === 'user' 
    ? '<i class="fas fa-user"></i>' 
    : '';
    messageContent.innerHTML = `${icon}  ${text}`;
    messageDiv.appendChild(messageContent);
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight; // Scroll automático
}

function sendQuickMessage(text) {
    addMessage('user', text);
    const normalizedText = normalizeText(text); // Normaliza o texto antes de buscar a resposta
    setTimeout(() => {
        if (faq[normalizedText]) {
            addMessage('bot', faq[normalizedText]);
        } else {
            addMessage('bot', 'Essa é uma resposta automática.');
        }
    }, 1000);
}