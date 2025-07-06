function loadCheckout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const orderItems = document.getElementById("order-items");
  const orderTotal = document.getElementById("order-total");
  let total = 0;

  if (cart.length === 0) {
    orderItems.innerHTML = "<p>Giỏ hàng trống.</p>";
    return;
  }

  let html = '';
  cart.forEach(item => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    html += `
      <div class="order-item">
        <img src="${item.image}" width="50" />
        <span>${item.name}</span>
        <span>$${subtotal}</span>
      </div>`;
  });

  orderItems.innerHTML = html;
  orderTotal.textContent = `$${total}`;
}

function placeOrder() {
  alert("Cảm ơn bạn! Đơn hàng của bạn đã được đặt thành công.");
  localStorage.removeItem("cart");
  window.location.href = "CheckOut.html";
}

window.onload = loadCheckout;

function toggleCardForm() {
  const bankRadio = document.querySelector('input[name="payment"][value="bank"]');
  const cardForm = document.getElementById("card-form");
  cardForm.style.display = bankRadio.checked ? "block" : "none";
}

function formatCardName(input) {
  // Chuyển sang in hoa và bỏ dấu
  input.value = input.value
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, '')  // loại bỏ dấu tiếng Việt
    .replace(/[^A-Z\s]/g, ''); // chỉ cho phép chữ in hoa và khoảng trắng
}

function formatCardNumber(input) {
  let value = input.value.replace(/\D/g, '').slice(0, 12); // chỉ lấy 12 chữ số
  let parts = value.match(/.{1,4}/g); // chia thành nhóm 4 số
  input.value = parts ? parts.join('-') : '';
}

// Gọi khi trang tải
window.onload = () => {
  loadCheckout();
  toggleCardForm(); // Khởi động hiển thị đúng form
};

function loadOrderItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("order-items");
  const totalElem = document.getElementById("order-total");

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = `<p>Giỏ hàng trống</p>`;
    totalElem.textContent = "$0";
    return;
  }

  let total = 0;
  cart.forEach(item => {
    const price = parseFloat(item.price.replace("$", ""));
    const lineTotal = price * item.quantity;
    total += lineTotal;

    const div = document.createElement("div");
    div.innerHTML = `${item.name} x ${item.quantity} - $${lineTotal}`;
    container.appendChild(div);
  });

  totalElem.textContent = `$${total}`;
}

loadOrderItems();
