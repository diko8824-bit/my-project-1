AOS.init({ duration: 800 });

document.querySelectorAll('.navbar-nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        targetElement.scrollIntoView({ behavior: 'smooth' });
    });
});

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

const typed = new Typed('.typed-text', {
    strings: ['Elite Store', 'Shop Exclusive', 'Unleash Style'],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    loop: true
});

const products = [
    { name: 'Smartphone Pro', price: 299.99, category: 'electronics', image: 'product1.jpg' },
    { name: 'Ultra Laptop', price: 999.99, category: 'electronics', image: 'product2.jpg' },
    { name: 'Winter Jacket', price: 79.99, category: 'fashion', image: 'product3.jpg' },
    { name: 'Sport Sneakers', price: 129.99, category: 'fashion', image: 'product4.jpg' }
];

const productsContainer = document.getElementById('products-container');
products.forEach((product, index) => {
    const delay = 100 + index * 100;
    const card = `
        <div class="col-md-3 mb-4 product-item" data-category="${product.category}" data-aos="fade-up" data-aos-delay="${delay}">
            <div class="card">
                <img src="images/${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">$${product.price.toFixed(2)}</p>
                    <button class="btn btn-primary add-to-cart" data-product="${product.name}" data-price="${product.price}"><i class="fas fa-cart-plus"></i> Add to Cart</button>
                </div>
            </div>
        </div>
    `;
    productsContainer.innerHTML += card;
});

let cart = [];
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const checkoutBtn = document.getElementById('checkout-btn');

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart')) {
        const product = e.target.getAttribute('data-product');
        const price = parseFloat(e.target.getAttribute('data-price'));
        cart.push({ product, price });
        updateCart();
    }
});

function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `${item.product} - $${item.price.toFixed(2)} <button class="btn btn-danger btn-sm remove-item" data-index="${index}">Remove</button>`;
        cartItems.appendChild(li);
    });
    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.length;
    checkoutBtn.disabled = cart.length === 0;

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            cart.splice(index, 1);
            updateCart();
        });
    });
}

document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        document.querySelectorAll('.product-item').forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

function simulateGoogleLogin() {
    alert('Simulated Google Sign-In. In a real app, this would redirect to Google OAuth.');
    document.querySelector('.btn-close').click();
}

const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    themeToggle.classList.add('theme-toggle-animate');
    document.documentElement.setAttribute('data-theme', newTheme);
    themeToggle.innerHTML = newTheme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    localStorage.setItem('theme', newTheme);
    setTimeout(() => {
        themeToggle.classList.remove('theme-toggle-animate');
    }, 500);
});

const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
themeToggle.innerHTML = savedTheme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';