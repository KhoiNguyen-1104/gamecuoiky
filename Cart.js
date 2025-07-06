function updateCart() {
  const rows = document.querySelectorAll('tbody tr');
  let subtotal = 0;

  rows.forEach(row => {
    const price = parseFloat(row.querySelector('.price').textContent);
    const qty = parseInt(row.querySelector('.quantity').value);
    const itemSubtotal = price * qty;
    row.querySelector('.subtotal').textContent = itemSubtotal.toFixed(2);
    subtotal += itemSubtotal;
  });

  document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('total').textContent = `$${subtotal.toFixed(2)}`;
}

function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const tbody = document.getElementById("cart-body");
  const subtotalElem = document.getElementById("subtotal");
  const totalElem = document.getElementById("total");

  tbody.innerHTML = "";

  if (cart.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;">Giỏ hàng trống</td></tr>`;
    subtotalElem.textContent = "$0";
    totalElem.textContent = "$0";
    return;
  }

  let subtotal = 0;
  cart.forEach((item) => {
    const priceNum = parseFloat(item.price.replace("$", ""));
    const lineTotal = priceNum * item.quantity;
    subtotal += lineTotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${item.img}" alt="${item.name}"> ${item.name}</td>
      <td>$${priceNum}</td>
      <td>
      <input type="number" class="quantity" value="${item.quantity}" min="1" onchange="updateQuantity('${item.name}', this.value)">
      <button onclick="removeFromCart('${item.name}')" style="color:red; margin-left: 10px;">Xóa</button>
      </td>
      <td>$${lineTotal}</td>
  `;

    tbody.appendChild(row);
  });

  subtotalElem.textContent = `$${subtotal}`;
  totalElem.textContent = `$${subtotal}`;
}

function updateQuantity(name, newQty) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const index = cart.findIndex(item => item.name === name);
  if (index !== -1) {
    cart[index].quantity = parseInt(newQty);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
  }
}

loadCart();

function removeFromCart(name) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.name !== name); // Loại bỏ sản phẩm theo tên
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart(); // Cập nhật lại giao diện giỏ hàng
}
