const products = [
  {
    category: "Điện thoại",
    items: [
      { name: "Điện thoại iPhone 15", price: "$999", img: "image/.jpg" },
      { name: "Điện thoại Samsung Galaxy S23", price: "$899", img: "image/.jpg" },
      { name: "Điện thoại Xiaomi Mi 13", price: "$699", img: "image/.jpg" },
      { name: "Điện thoại Oppo Reno10", price: "$499", img: "image/.jpg" },
      { name: "Điện thoại Vivo V27", price: "$449", img: "image/.jpg" },
    ],
  },
  {
    category: "Quần áo",
    items: [
      { name: "Áo thun nam", price: "$15", img: "images/aothun.jpg" },
      { name: "Quần jeans nữ", price: "$25", img: "images/jeans.jpg" },
      { name: "Áo sơ mi", price: "$20", img: "images/somi.jpg" },
      { name: "Đầm dạo phố", price: "$30", img: "images/dam.jpg" },
      { name: "Áo khoác kaki", price: "$35", img: "images/khoac.jpg" },
    ],
  },
  {
    category: "Đồ gia dụng",
    items: [
      { name: "Nồi cơm điện", price: "$50", img: "images/noicom.jpg" },
      { name: "Máy xay sinh tố", price: "$40", img: "images/mayxay.jpg" },
      { name: "Quạt đứng", price: "$35", img: "images/quat.jpg" },
      { name: "Bếp hồng ngoại", price: "$60", img: "images/bep.jpg" },
      { name: "Máy hút bụi", price: "$80", img: "images/hutbui.jpg" },
    ],
  },
];


function searchProducts() {
  const keyword = document.getElementById("searchInput").value;
  renderProducts(keyword);
}

// Hiển thị sản phẩm dựa theo từ khóa
function renderProducts(filteredText = "") {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  if (filteredText.trim() === "") return; // Không nhập gì thì không hiện gì

  products.forEach((category) => {
    const keyword = filteredText.toLowerCase();
    const categoryMatch = category.category.toLowerCase().includes(keyword);

    // Nếu từ khóa khớp tên danh mục (vd: "điện thoại") thì hiển thị tất cả sản phẩm trong danh mục đó
    const filteredItems = categoryMatch ? category.items : [];

    if (filteredItems.length > 0) {
      const section = document.createElement("section");
      section.className = "category";
      section.innerHTML = `<h2>${category.category}</h2>`;

      const grid = document.createElement("div");
      grid.className = "product-grid";

      filteredItems.forEach((product) => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
          <img src="${product.img}" alt="${product.name}" />
          <h4>${product.name}</h4>
          <p>${product.price}</p>
          <button onclick='addToCart(${JSON.stringify(product)})'>Thêm vào giỏ hàng</button>
        `;
        grid.appendChild(card);
      });

      section.appendChild(grid);
      productList.appendChild(section);
    }
  });
}

// Lưu sản phẩm vào giỏ hàng
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const index = cart.findIndex(item => item.name === product.name);

  if (index !== -1) {
    cart[index].quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`✅ Đã thêm "${product.name}" vào giỏ hàng`);
  window.location.href = 'Cart.html';
}
