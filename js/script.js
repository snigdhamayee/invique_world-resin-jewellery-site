// ------------------ Cart ------------------ //
let cartCount = 0;
const cartCountEl = document.getElementById("cartCount");

// ------------------ Product Data ------------------ //
const products = {
  rings: {
    simple: [
      { name: "Simple Resin Ring 1", price: 499, discount: 699, image: "images/rings/ring1.jpg" },
      { name: "Simple Resin Ring 2", price: 549, discount: 799, image: "images/rings/ring2.jpg" }
    ],
    floral: [
      { name: "Floral Resin Ring", price: 599, discount: 899, image: "images/rings/ring3.jpg" }
    ]
  },
  earrings: {
    stud: [
      { name: "Stud Resin Earring 1", price: 499, discount: 699, image: "images/earrings/stud/stud1.jpg" },
      { name: "Stud Resin Earring 2", price: 549, discount: 799, image: "images/earrings/stud/stud2.jpg" }
    ],
    hanging: [
      { name: "Hanging Resin Earring", price: 599, discount: 799, image: "images/earrings/hanging/hang1.jpg" }
    ],
    silver_oxidized: [
      { name: "Silver Oxidized Resin Earring", price: 699, discount: 999, image: "images/earrings/silver/resin1.jpg" },
      { name: "Silver Oxidized Resin Earring 2", price: 749, discount: 1099, image: "images/earrings/silver/resin2.jpg" },
      { name: "Silver Oxidized Resin Earring 3", price: 799, discount: 1199, image: "images/earrings/silver/resin3.jpg" }
    ]
  },
  pendants: {
    small: [
      { name: "Small Resin Pendant", price: 399, discount: 599, image: "images/pendants/pendant1.jpg" }
    ],
    large: [
      { name: "Large Resin Pendant", price: 699, discount: 999, image: "images/pendants/pendant2.jpg" }
    ]
  },
  bracelets: {
    bead: [
      { name: "Resin Bead Bracelet", price: 799, discount: 999, image: "images/bracelets/bracelet1.jpg" }
    ],
    charm: [
      { name: "Charm Resin Bracelet", price: 899, discount: 1099, image: "images/bracelets/bracelet2.jpg" }
    ]
  },
  keychains: {
    flower: [
      { name: "Flower Resin Keychain", price: 299, discount: 499, image: "images/keychains/keychain1.jpg" }
    ],
    animal: [
      { name: "Animal Resin Keychain", price: 399, discount: 599, image: "images/keychains/keychain2.jpg" }
    ]
  }
};

// ------------------ Render Functions ------------------ //
function appendProduct(row, product) {
  const col = document.createElement("div");
  col.className = "col-md-4 mb-4 d-flex"; // d-flex ensures equal height cards
  col.innerHTML = `
    <div class="card flex-fill">
      <div class="card-img-container">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="card-body text-center d-flex flex-column">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text">₹${product.price} <span class="text-muted text-decoration-line-through">₹${product.discount}</span></p>
        <button class="btn btn-primary mt-auto addToCart">Add to Cart</button>
      </div>
    </div>
  `;
  row.appendChild(col);
}


function renderCategorySubcategories(category, subcatDivId, productsDivId) {
  const subcatDiv = document.getElementById(subcatDivId);
  const productsDiv = document.getElementById(productsDivId);

  subcatDiv.innerHTML = "";
  productsDiv.innerHTML = "";

  for (let subcat in products[category]) {
    const col = document.createElement("div");
    col.className = "col-md-4 mb-4";
    col.innerHTML = `<div class="card text-center subcat-box">${subcat.replace("_", " ")}</div>`;
    col.addEventListener("click", () => {
      productsDiv.innerHTML = "";

      const backBtn = document.createElement('button');
      backBtn.className = 'btn btn-secondary mb-3';
      backBtn.textContent = '← Back to Categories';
      backBtn.addEventListener('click', () => {
        productsDiv.style.display = 'none';
        subcatDiv.style.display = 'flex';
        subcatDiv.style.flexWrap = 'wrap';
      });
      productsDiv.appendChild(backBtn);

      products[category][subcat].forEach(product => appendProduct(productsDiv, product));

      productsDiv.style.display = "flex";
      productsDiv.style.flexWrap = "wrap";
      subcatDiv.style.display = "none";
    });
    subcatDiv.appendChild(col);
  }

  const tabLink = document.querySelector(`a[href="#${category}Tab"]`);
  tabLink.addEventListener('shown.bs.tab', function () {
    subcatDiv.style.display = "flex";
    subcatDiv.style.flexWrap = "wrap";
    productsDiv.style.display = "none";
  });
}

// ------------------ Initialize Categories ------------------ //
renderCategorySubcategories("rings", "ringsRow", "ringsProducts");
renderCategorySubcategories("earrings", "earringsSubcategories", "earringsProducts");
renderCategorySubcategories("pendants", "pendantsRow", "pendantsProducts");
renderCategorySubcategories("bracelets", "braceletsRow", "braceletsProducts");
renderCategorySubcategories("keychains", "keychainsRow", "keychainsProducts");

// ------------------ Add to Cart ------------------ //
document.addEventListener("click", e => {
  if (e.target && e.target.classList.contains("addToCart")) {
    cartCount++;
    cartCountEl.textContent = cartCount;
    alert("Item added to cart!");
  }
});
