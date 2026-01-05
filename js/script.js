const products = {
  rings: [
    { id: 1, name: "Floral Resin Ring", price: 499, img: "images/ring1.jpg" },
    { id: 2, name: "Gold Flake Ring", price: 599, img: "images/ring2.jpg" }
  ],
  earrings: [
    { id: 3, name: "Crystal Drop Earrings", price: 699, img: "images/earring1.jpg" },
    { id: 4, name: "Stud Resin Earrings", price: 549, img: "images/earring2.jpg" }
  ],
  pendants: [
    { id: 5, name: "Rose Resin Pendant", price: 799, img: "images/pendant1.jpg" }
  ],
  bracelets: [
    { id: 6, name: "Elegant Resin Bracelet", price: 899, img: "images/bracelet1.jpg" }
  ],
  keychains: [
    { id: 7, name: "Custom Resin Keychain", price: 299, img: "images/keychain1.jpg" }
  ]
};

function renderProducts(category, containerId) {
  const container = document.getElementById(containerId);
  let html = "";

  products[category].forEach(product => {
    html += `
      <div class="col-md-4 col-lg-3">
        <div class="card product-card h-100 text-center">

          <div class="product-image-wrapper">
            <img src="${product.img}" alt="${product.name}">
          </div>

          <div class="card-body">
            <h6 class="fw-semibold">${product.name}</h6>
            <p class="price">₹${product.price}</p>

            <button class="btn btn-dark btn-sm add-to-cart"
              data-id="${product.id}"
              data-name="${product.name}"
              data-price="${product.price}">
              Add to Cart
            </button>
          </div>

        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

/* INITIAL LOAD */
renderProducts("rings", "ringsRow");

/* TAB LOAD */
const tabMap = {
  "#ringsTab": ["rings", "ringsRow"],
  "#earringsTab": ["earrings", "earringsRow"],
  "#pendantsTab": ["pendants", "pendantsRow"],
  "#braceletsTab": ["bracelets", "braceletsRow"],
  "#keychainsTab": ["keychains", "keychainsRow"]
};

document.querySelectorAll('[data-bs-toggle="tab"]').forEach(tab => {
  tab.addEventListener("shown.bs.tab", e => {
    const map = tabMap[e.target.getAttribute("href")];
    if (map) renderProducts(map[0], map[1]);
  });
});

/* ===== CART ===== */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById("cartCount").textContent = count;
}

function renderCart() {
  const cartItemsDiv = document.getElementById("cartItems");
  const cartTotalSpan = document.getElementById("cartTotal");

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p class='text-center'>Your cart is empty</p>";
    cartTotalSpan.textContent = "0";
    return;
  }

  let total = 0;
  let html = "";

  cart.forEach(item => {
    const subtotal = item.price * item.qty;
    total += subtotal;

    html += `
      <div class="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
        <div>
          <h6 class="mb-1">${item.name}</h6>
          <small>₹${item.price} × ${item.qty}</small>
        </div>

        <div class="d-flex align-items-center gap-2">
          <button class="btn btn-sm btn-outline-secondary qty-btn" data-id="${item.id}" data-action="dec">−</button>
          <span>${item.qty}</span>
          <button class="btn btn-sm btn-outline-secondary qty-btn" data-id="${item.id}" data-action="inc">+</button>
          <button class="btn btn-sm btn-outline-danger remove-btn" data-id="${item.id}">✕</button>
        </div>
      </div>
    `;
  });

  cartItemsDiv.innerHTML = html;
  cartTotalSpan.textContent = total;
}

/* ADD TO CART */
document.addEventListener("click", e => {
  if (e.target.classList.contains("add-to-cart")) {
    const btn = e.target;

    const product = {
      id: btn.dataset.id,
      name: btn.dataset.name,
      price: Number(btn.dataset.price),
      qty: 1
    };

    const existing = cart.find(i => i.id === product.id);
    if (existing) existing.qty++;
    else cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCart();

    btn.textContent = "Added ✔";
    setTimeout(() => btn.textContent = "Add to Cart", 800);
  }
});

/* QUANTITY & REMOVE */
document.addEventListener("click", e => {

  if (e.target.classList.contains("qty-btn")) {
    const id = e.target.dataset.id;
    const action = e.target.dataset.action;
    const item = cart.find(i => i.id === id);

    if (action === "inc") item.qty++;
    if (action === "dec" && item.qty > 1) item.qty--;

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCart();
  }

  if (e.target.classList.contains("remove-btn")) {
    const id = e.target.dataset.id;
    cart = cart.filter(i => i.id !== id);

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCart();
  }
});

/* LOAD CART WHEN MODAL OPENS */
document.getElementById("cartModal")
  .addEventListener("show.bs.modal", renderCart);

updateCartCount();

document.getElementById("checkoutBtn").addEventListener("click", () => {
  alert("Redirecting to payment gateway...");
});
