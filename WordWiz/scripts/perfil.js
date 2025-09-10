document.addEventListener("DOMContentLoaded", () => {
  // Cargar datos del JSON base
  fetch("../data/fulldata.json")
    .then((res) => res.json())
    .then((data) => {
      // Mostrar datos básicos
      document.getElementById("name").textContent = data.nombre;
      document.querySelector(".username").textContent = `@${data.usuario}`;
      document.querySelector(".join-date").textContent = `Ingreso en ${data.ingreso}`;

      // Integrar con progreso
      let progress = JSON.parse(localStorage.getItem("wordwiz_progress")) || data.progress;

      document.getElementById("streak").textContent = `${progress.streak} DÍAS`;
      document.getElementById("exp").textContent = progress.points;
      document.getElementById("words").textContent = progress.words || 0;

      // Renderizar medallas
      const medalContainer = document.getElementById("medals");
      data.medals.forEach((medal) => {
        const div = document.createElement("div");
        div.className = `medal ${medal.unlocked ? "earned" : "locked"}`;
        div.textContent = medal.name;
        medalContainer.appendChild(div);
      });
    });

  // Botón de salida
  const exitButton = document.querySelector(".exit-btn");
  exitButton.addEventListener("click", () => {
    if (confirm("¿Seguro que deseas salir?")) {
      localStorage.removeItem("wordwiz_progress");
      window.location.href = "../palaformas/inicio.html";
    }
  });
});
