document.addEventListener("DOMContentLoaded", function () {
    const cartItems = document.getElementById("cart-items"); // Блок для отображения товаров
    const totalPriceElement = document.getElementById("total-price"); // Элемент для общей суммы

    let cart = []; // Массив корзины
    let totalPrice = 0; // Общая сумма

    // Находим все кнопки "Купить"
    document.querySelectorAll(".add-to-card").forEach(button => {
        button.addEventListener("click", function () {
            // Получаем информацию о товаре
            const productElement = this.closest(".product");
            const productName = productElement.querySelector("h3").textContent.trim();
            const productPrice = parseInt(productElement.querySelector(".price").textContent.replace("грн", "").trim());

            addToCart(productName, productPrice); // Добавляем товар в корзину
        });
    });

    // Функция добавления товара в корзину
    function addToCart(name, price) {
        // Проверяем, есть ли уже такой товар в корзине
        const existingProduct = cart.find(item => item.name === name);
        if (existingProduct) {
            existingProduct.quantity += 1; // Увеличиваем количество
        } else {
            cart.push({ name, price, quantity: 1 }); // Добавляем новый товар
        }

        totalPrice += price; // Обновляем общую сумму
        updateCart(); // Обновляем отображение корзины
    }

    // Обновляем содержимое корзины
    function updateCart() {
        cartItems.innerHTML = ""; // Очищаем корзину
        cart.forEach(item => {
            const itemElement = document.createElement("div");
            itemElement.textContent = `${item.name} x${item.quantity} - ${item.price * item.quantity} грн`;
            cartItems.appendChild(itemElement);
        });

        totalPriceElement.textContent = totalPrice; // Отображаем обновленную сумму
    }
});
