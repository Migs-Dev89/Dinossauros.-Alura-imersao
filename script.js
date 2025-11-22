let cardContainer = document.querySelector(".card-container");
let boasVindasArticle = document.querySelector("#boas-vindas");
let campoBusca = document.querySelector("#campo-busca"); // ⬅️ Novo: Seleciona o campo de busca
let dados = [];
let dadosCompletos = []; // ⬅️ Novo: Armazena a lista completa após o primeiro fetch
let tituloDinopedia = document.querySelector("#titulo-dinopedia");

async function iniciarApp() {
    // 1. Carrega os dados uma única vez ao iniciar o aplicativo
    let resposta = await fetch("data.json");
    dadosCompletos = await resposta.json();
    // Você pode decidir chamar carregandoCards(dadosCompletos) aqui para carregar tudo inicialmente
    // Ou deixar a tela inicial até a primeira busca
}

async function iniciandobusca() {
    // Esconde o artigo de boas-vindas (como fizemos antes)
    if (boasVindasArticle) {
        boasVindasArticle.style.display = 'none';
    }

    // 1. Pega o valor digitado no campo de busca e converte para minúsculas
    const termoBusca = campoBusca.value.toLowerCase(); 

    // 2. Filtra os dados
    const resultadosFiltrados = dadosCompletos.filter(dino => {
        // Verifica se o nome OU a descrição do dinossauro inclui o termo de busca
        return dino.nome.toLowerCase().includes(termoBusca) || 
               dino.descrição.toLowerCase().includes(termoBusca);
    });

    // 3. Carrega os cards com os resultados da busca
    carregandoCards(resultadosFiltrados);
}

function carregandoCards(dados) {
    // Limpa o container antes de adicionar os novos cards
    cardContainer.innerHTML = ''; 

    // Verifica se há resultados para exibir uma mensagem, se necessário
    if (dados.length === 0) {
        cardContainer.innerHTML = '<h2>Nenhum dinossauro encontrado com este termo.</h2>';
        return;
    }
    
    // ... O restante da sua função carregandoCards() ...
    for (let dado of dados) {
        let article = document.createElement("article");
        // ... (código para montar o article) ...
        article.classList.add("card"); 
        article.innerHTML = `
            <h2>${dado.nome}</h2>
            <img src="${dado.imagem}" alt="Imagem do ${dado.nome}"> 
            <p>"${dado.descrição}"</p>
            <a href="${dado.link}" target="_blank">Saiba Mais</a> 
            <p>"${dado.ano}"</p>
        `;
        cardContainer.appendChild(article);
    }
}
iniciarApp();
