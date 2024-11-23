// ABRIR E FECHAR CARRINHO
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

// ABRIR CARRINHO
cartIcon.onclick = () => {
    cart.classList.add("active");
};
closeCart.onclick = () => {
    cart.classList.remove("active");
};

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {
    // REMOVER PRODUTO DO CARRINHO
    var removeCartButtons = document.getElementsByClassName("cart-remove");
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    // ADICIONAR PRODUTO AO CARRINHO
    var addCart = document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }

    loadCartItems();
}


let cartItems = [];
let totalPrice = 0;

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
    saveCartItems();
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
    saveCartItems();
    updateCartIcon();
}

function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerHTML;
    var price = parseFloat(shopProducts.getElementsByClassName("price")[0].innerHTML.replace("R$", "").replace(",", "."));
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;

    addProductCart(title, price, productImg);
    updateTotal();
    saveCartItems();
    updateCartIcon();
}

function addProductCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsName = cartItems.getElementsByClassName("cart-product-title");

    for (var i = 0; i < cartItemsName.length; i++) {
        if (cartItemsName[i].innerHTML == title) {
            alert("Você já adicionou este produto ao carrinho");
            return;
        }
    }

    var cartBoxContent = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">R$${price.toFixed(2).replace(".", ",")}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class="bi bi-trash3 cart-remove"></i>`;
    
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
    cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);
    saveCartItems();
    updateCartIcon();
    updateTotal();
}

function updateTotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    totalPrice = 0;

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerHTML.replace("R$", "").replace(",", "."));
        var quantity = quantityElement.value;
        totalPrice += price * quantity;
    }

    document.getElementsByClassName("total-price")[0].innerHTML = `R$ ${totalPrice.toFixed(2).replace(".", ",")}`;
    localStorage.setItem("cartTotal", totalPrice);
}

function saveCartItems() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    cartItems = [];

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var titleElement = cartBox.getElementsByClassName("cart-product-title")[0];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var productImg = cartBox.getElementsByClassName("cart-img")[0].src;

        var item = {
            title: titleElement.innerHTML,
            price: parseFloat(priceElement.innerHTML.replace("R$", "").replace(",", ".")),
            quantity: quantityElement.value,
            productImg: productImg,
        };
        cartItems.push(item);
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    updateCartIcon();
}

function loadCartItems() {
    var cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
        cartItems = JSON.parse(cartItems);

        for (var i = 0; i < cartItems.length; i++) {
            var item = cartItems[i];
            addProductCart(item.title, item.price, item.productImg);
            var cartBoxes = document.getElementsByClassName("cart-box");
            var cartBox = cartBoxes[cartBoxes.length - 1];
            var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
            quantityElement.value = item.quantity;
        }
    }

    var cartTotal = localStorage.getItem("cartTotal");
    if (cartTotal) {
        totalPrice = parseFloat(cartTotal);
        document.getElementsByClassName("total-price")[0].innerHTML = `R$ ${totalPrice.toFixed(2).replace(".", ",")}`;
    }
    updateCartIcon();
}

function updateCartIcon() {
    var cartBoxes = document.getElementsByClassName("cart-box");
    var quantity = 0;

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        quantity += parseInt(quantityElement.value);
    }

    cartIcon.setAttribute("data-quantity", quantity);
}


const buyButton = document.getElementById("buy-btn");
const modal = document.getElementById("login-modal");
const closeModalButton = document.getElementById("close-modal");
const loginForm = document.getElementById("login-form");
const totalPriceElement = document.getElementById("total-price"); // Elemento que exibe o valor do carrinho




buyButton.addEventListener("click", function () {
    modal.style.display = "block";
});


closeModalButton.addEventListener("click", function () {
    modal.style.display = "none"; 
});


window.addEventListener("click", function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});


loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    fetch('/gerar_link_pagamento', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            valor: totalPrice 
        })
    })
    .then(response => response.json())
    .then(data => {
        const link = data.link; 
        if (link) {
    
            window.location.href = link;
        } else {
         
            alert('Erro ao gerar o link de pagamento');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro na comunicação com o servidor');
    });
});

