const board = document.getElementById("board");
const rows = 5;
const cols = 5;
let currentRow = 0;
let currentCol = 0;

// Tạo bảng 5x5
function createBoard() {
  board.innerHTML = "";
  for (let i = 0; i < rows * cols; i++) {
    const cell = document.createElement("div");
    cell.classList.add("w-16", "h-16", "flex", "items-center", "justify-center", "rounded", "text-sm");

    const row = Math.floor(i / cols);
    const col = i % cols;

    // Nếu là ô đen
    if (row === currentRow && col === currentCol) {
      cell.classList.add("bg-black-100", "text-white", "font-bold", "bg-black");
      cell.textContent = "Đen";
    } else {
      cell.classList.add("bg-green-100", "text-green-500", "border", "border-gray-300");
    }

    board.appendChild(cell);
  }
}

createBoard();

// Xử lý phím bấm
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
    case "w":
    case "W":
      if (currentRow > 0) currentRow--;
      break;
    case "ArrowDown":
    case "s":
    case "S":
      if (currentRow < rows - 1) currentRow++;
      break;
    case "ArrowLeft":
    case "a":
    case "A":
      if (currentCol > 0) currentCol--;
      break;
    case "ArrowRight":
    case "d":
    case "D":
      if (currentCol < cols - 1) currentCol++;
      break;
  }
  createBoard();
});
