let cart = [];


function addToCart(productName, price) {
   
    const existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        existingProduct.quantity += 1; // Збільшуємо кількість
    } else {
        cart.push({ name: productName, price: price, quantity: 1 }); // Додаємо новий товар
    }

    updateCartUI(); 
}


function increaseQuantity(productName) {
    const product = cart.find(item => item.name === productName);
    if (product) {
        product.quantity += 1;
        updateCartUI();
    }
}


function decreaseQuantity(productName) {
    const product = cart.find(item => item.name === productName);
    if (product && product.quantity > 1) {
        product.quantity -= 1;
        updateCartUI();
    } else if (product && product.quantity === 1) {
        removeFromCart(productName);
    }
}


function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCartUI();
}

function updateCartUI() {
    const cartContainer = document.getElementById('cart-items');
    const totalContainer = document.getElementById('cart-total');

   
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


document.querySelectorAll('.add-to-card').forEach(button => {
    button.addEventListener('click', event => {
        const productElement = event.target.closest('.product');
        const productName = productElement.querySelector('h3').textContent.trim();
        const priceText = productElement.querySelector('.price').textContent.trim();
        const price = parseFloat(priceText.replace(/[^0-9]/g, ''));

        addToCart(productName, price);
    });
});

                   function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Викликайте `saveCartToLocalStorage()` після будь-якої зміни кошика
function addToCart(productName, price) {
    const existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name: productName, price: price, quantity: 1 });
    }

    updateCartUI();
    saveCartToLocalStorage(); // Зберігаємо зміни
}

function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCartUI();
    saveCartToLocalStorage(); // Зберігаємо зміни
}
document.querySelectorAll('.image img').forEach(container => {
    container.addEventListener('click', () => {
        // Якщо картка вже активна, знімаємо клас 'active'
        if (container.classList.contains('active')) {
            container.classList.remove('active');
        } else {
            // Видалення класу 'active' з усіх карток
            document.querySelectorAll('.image img').forEach(item => item.classList.remove('active'));

            // Додавання класу 'active' до натиснутої картки
            container.classList.add('active');
        }
    });
});

// Отримуємо всі зображення товарів
const images = document.querySelectorAll(".image img");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const closeModal = document.querySelector(".close");

// Додаємо подію для відкриття зображення
images.forEach(img => {
    img.addEventListener("click", function () {
        modal.style.display = "flex";
        modalImg.src = this.src;
    });
});

// Додаємо подію для закриття модального вікна
closeModal.addEventListener("click", function () {
    modal.style.display = "none";
});

// Закриття вікна при кліку поза зображенням
modal.addEventListener("click", function (e) {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});   
