

/*MENU MOBILE*/
let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');

}

let section = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header .navbar a');

window.onscroll = () => {
    
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
    section.forEach(sec => {
        let top = window.scrollY;
        let height = sec.offsetHeight;
        let offset = sec.offsetTop - 150;
        let id = sec.getAttribute('id');

        if (top => offset && top < offset + height){
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header .navbar a[href*='+id+']').classList.add('active');
            })
        };
        
    });

}


//categorias

function filterItems(category) {
    // Seleciona todos os elementos com a classe 'product-box'
    const items = document.querySelectorAll('.product-box');

    // Itera sobre todos os itens
    items.forEach(item => {
        // Se a categoria for 'all' ou o item contém a classe da categoria, exibe o item
        // Caso contrário, oculta o item
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

      /*HOME*/
      
      var swiper = new Swiper(".home-slide", {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 2300,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
       
        loop: true,
      });
        /*TESTEMUNHO DOS CLIENTES*/
  var swiper = new Swiper(".review-slider", {
    spaceBetween: 10,
    centeredSlides: true,
    autoplay: {
      delay: 4500,
      disableOnInteraction: false,
    },
   
   loop: true,
   breakpoints : {
    0: {
        slidePerView: 1,
    },
    640: {
        slidePerView: 2,
    },
    768: {
        slidePerView: 2,
    },
    1024: {
        slidePerView: 3,
    },
   },
  });

  //CATEGORIA
 
  
  document.addEventListener('DOMContentLoaded', () => {
    const botoesVisualizar = document.querySelectorAll('.visualizar');
    
    botoesVisualizar.forEach(botao => {
        botao.addEventListener('click', (event) => {
            // Esconde todas as informações dos produtos
            document.querySelectorAll('.produto-info').forEach(info => {
                info.style.display = 'none';
            });
            
            // Mostra a informação do produto clicado
            const produtoId = event.target.getAttribute('data-produto');
            const infoProduto = document.getElementById(produtoId);
            infoProduto.style.display = 'block';
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const readMoreButton = document.getElementById('read-more-button');
    const moreContent = document.getElementById('more-content');
    const shortDescription = document.getElementById('short-description');

    readMoreButton.addEventListener('click', () => {
        if (moreContent.style.display === 'none') {
            moreContent.style.display = 'inline';
            readMoreButton.textContent = 'Ler Menos';
        } else {
            moreContent.style.display = 'none';
            readMoreButton.textContent = 'Ler Mais';
        }
    });
});
