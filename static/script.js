window.onload = function() {
    var cartItems = JSON.parse(localStorage.getItem("cartItems"));
    var totalPrice = 0;

    if (cartItems && cartItems.length > 0) {
        var cartItemsContainer = document.getElementById('cart-items-container');

        cartItems.forEach(function(item) {
            var itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            cartItemsContainer.appendChild(itemElement);

            totalPrice += item.price * item.quantity;
        });

        document.getElementById('total-price').innerText = totalPrice.toFixed(2).replace('.', ',');
        document.getElementById('totalprice').value = totalPrice.toFixed(2);
        document.getElementById('whatsapp-total-price').innerText = totalPrice.toFixed(2).replace('.', ',');
        document.getElementById('whatsapp-totalprice').value = totalPrice.toFixed(2);
    } else {
        document.getElementById('cart-items-container').innerHTML = '<p>Não há itens no carrinho.</p>';
    }
};


document.querySelectorAll('input[name="pagamento"]').forEach((input) => {
    input.addEventListener('change', function() {
        if (this.value === 'debito' || this.value === 'credito') {
            document.getElementById('payment-form').style.display = 'block';
            document.querySelector('.whatsapp-form').style.display = 'none';
        } else if (this.value === 'whatsapp') {
            document.getElementById('payment-form').style.display = 'none';
            document.querySelector('.whatsapp-form').style.display = 'block';
        }
    });
});


document.getElementById('whatsapp-button').addEventListener('click', function() {
    var totalPrice = document.getElementById('whatsapp-totalprice').value;
    var phone = document.getElementById('phone').value.trim();  

  
    if (!phone) {
        alert("Por favor, insira o número de telefone.");
        return;
    }

    var message = `Pagamento de R$ ${totalPrice} via WhatsApp.`;
    

    var whatsappLink = `https://wa.me/55${961131288}?text=${encodeURIComponent(message)}`;
    console.log("Link do WhatsApp:", whatsappLink); 

    window.location.href = '/'; 
});
