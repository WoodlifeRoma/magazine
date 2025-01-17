                 // Масив для зберігання товарів у кошику
let cart = [];

// Функція для додавання товару до кошика
function addToCart(productName, price) {
    // Перевіряємо, чи товар уже є в кошику
    const existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        existingProduct.quantity += 1; // Збільшуємо кількість
    } else {
        cart.push({ name: productName, price: price, quantity: 1 }); // Додаємо новий товар
    }

    updateCartUI(); // Оновлюємо відображення кошика
}

// Функція для збільшення кількості товару
function increaseQuantity(productName) {
    const product = cart.find(item => item.name === productName);
    if (product) {
        product.quantity += 1;
        updateCartUI();
    }
}

// Функція для зменшення кількості товару
function decreaseQuantity(productName) {
    const product = cart.find(item => item.name === productName);
    if (product && product.quantity > 1) {
        product.quantity -= 1;
        updateCartUI();
    } else if (product && product.quantity === 1) {
        removeFromCart(productName);
    }
}

// Функція для видалення товару з кошика
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCartUI(); // Оновлюємо відображення кошика
}

// Функція для оновлення відображення кошика
function updateCartUI() {
    const cartContainer = document.getElementById('cart-items');
    const totalContainer = document.getElementById('cart-total');

    // Очищаємо попередній вміст
    cartContainer.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <span>${item.name}</span>
            <span>${item.quantity} x ${item.price} грн</span>
            <button onclick="increaseQuantity('${item.name}')">+</button>
            <button onclick="decreaseQuantity('${item.name}')">-</button>
            <button onclick="removeFromCart('${item.name}')">Видалити</button>
        `;
        cartContainer.appendChild(cartItem);

        total += item.quantity * item.price;
    });

    totalContainer.textContent = `Загальна сума: ${total} грн`;
}

// Додаємо обробники подій для кнопок "Купити"
document.querySelectorAll('.add-to-card').forEach(button => {
    button.addEventListener('click', event => {
        const productElement = event.target.closest('.product');
        const productName = productElement.querySelector('h3').textContent.trim();
        const priceText = productElement.querySelector('.price').textContent.trim();
        const price = parseFloat(priceText.replace(/[^0-9]/g, ''));

        addToCart(productName, price);
    });
});
