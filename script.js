document.addEventListener("DOMContentLoaded", function () {
    const cartItems = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");

    let cart = [];
    let totalPrice = 0;

    // Обработчик кнопок "Купить"
    document.querySelectorAll(".add-to-card").forEach(button => {
        button.addEventListener("click", function () {
            const productElement = this.closest(".product");
            const productName = productElement.querySelector("h3").textContent.trim();
            const productPrice = parseInt(productElement.querySelector(".price").textContent.replace("грн", "").trim());

            addToCart(productName, productPrice);
        });
    });

    // Добавить товар в корзину
    function addToCart(name, price) {
        // Проверяем, есть ли товар уже в корзине
        const existingProduct = cart.find(item => item.name === name);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        totalPrice += price;
        updateCart();
    }

    // Обновить содержимое корзины
    function updateCart() {
        cartItems.innerHTML = "";
        cart.forEach(item => {
            const itemElement = document.createElement("div");
            itemElement.textContent = `${item.name} x${item.quantity} - ${item.price * item.quantity} грн`;
            cartItems.appendChild(itemElement);
        });

        totalPriceElement.textContent = totalPrice;
    }
});