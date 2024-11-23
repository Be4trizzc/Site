document.addEventListener('DOMContentLoaded', () => {
    const searchBox = document.getElementById('search-box');
    const productList = document.getElementById('product-list');
    const searchForm = document.getElementById('search-form');
    const closeIcon = document.getElementById('close');
    const searchIcon = document.getElementById('search-icon');
    const searchButton = document.getElementById('search-button');

    // Lista de produtos
    const products = Array.from(productList.getElementsByClassName('box')).map(box => ({
        id: box.dataset.productId,
        name: box.querySelector('.product-title').textContent,
        element: box // Referência ao elemento do produto
    }));

    // Função para filtrar e exibir apenas o produto correspondente
    function filterProducts(query) {
        const boxes = productList.getElementsByClassName('box');
        let found = false; // Para rastrear se o produto correspondente foi encontrado

        Array.from(boxes).forEach(box => {
            const title = box.querySelector('.product-title').textContent.toLowerCase();
            if (title.includes(query)) {
                box.style.display = 'block'; // Exibe o produto correspondente
                box.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Rolagem suave até o produto
                found = true; // Produto correspondente foi encontrado
            } else {
                box.style.display = 'none'; // Oculta produtos que não correspondem
            }
        });

        // Se não houver produtos correspondentes, pode-se opcionalmente exibir uma mensagem
        if (!found && query !== '') {
            alert('Nenhum produto encontrado.'); // Ou qualquer outra ação que você queira
        }
    }

    // Evento para abrir o formulário de pesquisa
    searchIcon.addEventListener('click', () => {
        searchForm.classList.add('active');
        searchBox.focus(); // Foca no campo de pesquisa ao abrir
    });

    // Evento para fechar o formulário de pesquisa
    closeIcon.addEventListener('click', () => {
        searchForm.classList.remove('active'); // Fecha a barra de pesquisa
        // Não limpar o campo de pesquisa, apenas ocultar a barra
    });

    // Evento para o botão de pesquisa
    searchButton.addEventListener('click', () => {
        const query = searchBox.value.toLowerCase(); // Obtém e normaliza a consulta de pesquisa
        filterProducts(query); // Filtra os produtos com base na consulta
        searchBox.value = ''; // Limpa o campo de pesquisa após a busca
    });

    // Evento para pressionar a tecla no campo de pesquisa
    searchBox.addEventListener('input', () => {
        const query = searchBox.value.toLowerCase(); // Obtém e normaliza a consulta de pesquisa
        filterProducts(query); // Filtra os produtos com base na consulta
    });

    // Evento para fechar a barra de pesquisa ao clicar fora dela
    document.addEventListener('click', (e) => {
        if (!searchForm.contains(e.target) && !searchIcon.contains(e.target)) {
            searchForm.classList.remove('active'); // Fecha a barra de pesquisa
            // Não limpar o campo de pesquisa, apenas ocultar a barra
        }
    });
});
