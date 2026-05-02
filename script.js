
console.log("SCRIPT LOADED");

/* ================= CART (PERSISTENT) ================= */

// load cart from storage or start empty
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Add item with quantity
function addToCart(name, price) {
    let existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    saveCart();
    alert(name + " added to cart");
}

// Remove item
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    displayCart();
}

// Change quantity
function changeQuantity(index, amount) {
    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCart();
    displayCart();
}

/* ================= SLIDESHOW ================= */
document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slide");
    let index = 0;

    if (slides.length > 0) {
        setInterval(() => {
            slides[index].classList.remove("active");
            index = (index + 1) % slides.length;
            slides[index].classList.add("active");
        }, 4000);
    }
});

/* ================= MENU (HAMBURGER FIXED) ================= */
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
});

/* ================= CHECKOUT ================= */
function goToCheckout() {
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "checkout.html";
}

function loadCheckout() {
    let savedCart = JSON.parse(localStorage.getItem("cart")) || [];

    let list = document.getElementById("checkout-items");
    let totalEl = document.getElementById("checkout-total");

    if (!list || !totalEl) return;

    list.innerHTML = "";

    let total = 0;

    savedCart.forEach(item => {
        let li = document.createElement("li");
        li.textContent = `${item.name} - KSh ${item.price}`;
        list.appendChild(li);
        total += item.price;
    });

    totalEl.textContent = total;
}

if (window.location.pathname.includes("checkout.html")) {
    loadCheckout();
}

/* ================= ORDER ================= */
function placeOrder() {
    alert("Order placed successfully! We will contact you on WhatsApp.");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
}

/* ================= CART DISPLAY ================= */
function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartDiv = document.getElementById("cart-items");
    let total = 0;

    if (!cartDiv) return;

    cartDiv.innerHTML = "";

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        cartDiv.innerHTML += `
        <p>
            ${item.name} - KSh ${item.price} x ${item.quantity}
            <span>
                <button onclick="changeQuantity(${index}, 1)">+</button>
                <button onclick="changeQuantity(${index}, -1)">-</button>
                <button onclick="removeItem(${index})">Remove</button>
            </span>
        </p>`;
    });

    const totalEl = document.getElementById("total");
    if (totalEl) {
        totalEl.innerText = "Total: KSh " + total;
    }
}
