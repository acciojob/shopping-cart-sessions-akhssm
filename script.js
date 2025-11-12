// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Retrieve cart from sessionStorage (always return an array)
function getCart() {
  const cart = sessionStorage.getItem("cart");
  try {
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
}

// Save cart (ensure it’s not nested)
function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// --- Render Products ---
function renderProducts() {
  productList.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price}
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(li);
  });

  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = parseInt(btn.getAttribute("data-id"));
      addToCart(productId);
    });
  });
}

// --- Render Cart ---
function renderCart() {
  cartList.innerHTML = "";
  const cart = getCart();

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// --- Add to Cart ---
function addToCart(productId) {
  const cart = getCart();
  const product = products.find((p) => p.id === productId);

  if (product) {
    cart.push({ id: product.id, name: product.name, price: product.price });
    saveCart(cart);
    renderCart();
  }
}

// --- Clear Cart ---
function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}

// --- Event Listeners ---
clearCartBtn.addEventListener("click", clearCart);

// --- Initial Render ---
renderProducts();
renderCart();