let posX = 0;
let posY = 0;
let size = 0;
let table = null;

function crearBola(x, y) {
  const cell = table.rows[y].cells[x];
  const bola = document.createElement("div");
  bola.className = "bola";
  const colorInput = document.getElementById('colorPicker');
  const sizeInput = document.getElementById('sizeSlider');
  const color = colorInput ? colorInput.value : 'red';
  const sizeValue = sizeInput ? sizeInput.value : 40;
  bola.style.backgroundColor = color;
  bola.style.width = `${sizeValue}px`;
  bola.style.height = `${sizeValue}px`;
  cell.appendChild(bola);
}

function moverBola(x, y) {
  if (x < 0 || y < 0 || x >= size || y >= size) return;
  const oldCell = table.rows[posY].cells[posX];
  oldCell.innerHTML = "";
  posX = x;
  posY = y;
  crearBola(posX, posY);
}

function toggleTabla() {
  const container = document.getElementById("tablaContainer");
  const btn = document.getElementById("toggleBtn");
  const input = document.getElementById("sizeInput");
  const contenedorBotones = document.getElementById("contenedorBotones");
  if (container.innerHTML === "") {
    size = parseInt(input.value);
    table = document.createElement("table");
    for (let i = 0; i < size; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < size; j++) {
        const cell = document.createElement("td");
        row.appendChild(cell);
      }
      table.appendChild(row);
    }
    container.appendChild(table);
    input.disabled = true;
    btn.textContent = "Borrar tabla";
    crearControlesExtras();
    posX = 0;
    posY = 0;
    crearBola(posX, posY);
    const controlDiv = document.createElement("div");
    controlDiv.className = "control-buttons";
    const botones = ["", "^", "", "<", "O", ">", "", "v", ""];
    botones.forEach(simbolo => {
      const div = document.createElement("div");
      if (simbolo !== "") {
        const button = document.createElement("button");
        button.textContent = simbolo;
        button.onclick = () => manejarMovimiento(simbolo);
        div.appendChild(button);
      }
      controlDiv.appendChild(div);
    });
    contenedorBotones.appendChild(controlDiv);
  } else {
    container.innerHTML = "";
    contenedorBotones.innerHTML = "";
    document.getElementById('controlsColor').innerHTML = "";
    document.getElementById('controlsSize').innerHTML = "";
    input.disabled = false;
    btn.textContent = "Crear tabla";
  }
}

function crearControlesExtras() {
  const controlsColor = document.getElementById('controlsColor');
  const controlsSize = document.getElementById('controlsSize');
  controlsColor.innerHTML = '<label for="colorPicker">Color de la bola:</label><input type="color" id="colorPicker" value="#ff0000">';
  controlsSize.innerHTML = '<label for="sizeSlider">Tamaño de la bola:</label><input type="range" id="sizeSlider" min="5" max="50" value="40">';
  document.getElementById('colorPicker').addEventListener('input', actualizarBola);
  document.getElementById('sizeSlider').addEventListener('input', actualizarBola);
}

function actualizarBola() {
  const bolas = document.querySelectorAll('.bola');
  const color = document.getElementById('colorPicker').value;
  const sizeValue = document.getElementById('sizeSlider').value;
  bolas.forEach(bola => {
    bola.style.backgroundColor = color;
    bola.style.width = `${sizeValue}px`;
    bola.style.height = `${sizeValue}px`;
  });
}

function manejarMovimiento(direccion) {
  let nuevoX = posX;
  let nuevoY = posY;
  switch (direccion) {
    case "^": nuevoY--; break;
    case "v": nuevoY++; break;
    case "<": nuevoX--; break;
    case ">": nuevoX++; break;
    case "O":
      if (size % 2 === 1) {
        nuevoX = Math.floor(size / 2);
        nuevoY = Math.floor(size / 2);
      } else {
        nuevoX = size / 2 - 1;
        nuevoY = size / 2 - 1;
      }
      break;
  }
  moverBola(nuevoX, nuevoY);
}