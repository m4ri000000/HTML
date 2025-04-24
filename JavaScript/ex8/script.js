let posX = 0;
    let posY = 0;
    let size = 0;
    let table = null;

    function crearBola(x, y) {
      const cell = table.rows[y].cells[x];
      const bola = document.createElement("div");
      bola.className = "bola";
      cell.appendChild(bola);
    }

    function moverBola(x, y) {
      if (x < 0 || y < 0 || x >= size || y >= size) return;

      // Borrar bola actual
      const oldCell = table.rows[posY].cells[posX];
      oldCell.innerHTML = "";

      // Colocar nueva bola
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
        btn.textContent = "Borrar tabla";
        input.disabled = true;

        // Colocar bolita en la esquina superior izquierda
        posX = 0;
        posY = 0;
        crearBola(posX, posY);

        // Crear botones
        const controlDiv = document.createElement("div");
        controlDiv.className = "control-buttons";

        const botones = [
          "", "↑", "",
          "←", "O", "→",
          "", "↓", ""
        ];

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
        input.disabled = false;
        btn.textContent = "Crear tabla";
      }
    }

    function manejarMovimiento(direccion) {
      let nuevoX = posX;
      let nuevoY = posY;

      switch (direccion) {
        case "↑":
          nuevoY--;
          break;
        case "↓":
          nuevoY++;
          break;
        case "←":
          nuevoX--;
          break;
        case "→":
          nuevoX++;
          break;
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