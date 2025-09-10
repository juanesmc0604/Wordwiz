document.addEventListener("DOMContentLoaded", () => {
  const leccionesContainer = document.getElementById("lecciones");
  const categoryBtns = document.querySelectorAll(".category-btn");
  let currentLevel = "Principiante";

  // Cargar lecciones dinámicas
  function cargarLecciones() {
    fetch("../data/fulldata.json") // 👈 revisa que la ruta sea correcta
      .then(res => res.json())
      .then(data => {
        leccionesContainer.innerHTML = "";

        // Filtrar por nivel (Principiante, Intermedio, Avanzado)
        const filtradas = data.lessons.filter(l => l.level === currentLevel);

        if (filtradas.length === 0) {
          leccionesContainer.innerHTML = `<p>No hay lecciones en este nivel.</p>`;
          return;
        }

        filtradas.forEach(lesson => {
          const card = document.createElement("div");
          card.className = "lesson-item";
          card.innerHTML = `
            <span class="lesson-name">${lesson.name}</span>
            <button class="start-btn" onclick="location.href='../palaformas/preguntas.html?lesson=${lesson.id}'">
              Empezar
            </button>
          `;
          leccionesContainer.appendChild(card);
        });
      })
      .catch(err => {
        console.error("Error cargando lecciones:", err);
        leccionesContainer.innerHTML = `<p>Error al cargar las lecciones</p>`;
      });
  }

  // Cambiar categoría
  categoryBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      categoryBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentLevel = btn.textContent; // 👈 Principiante / Intermedio / Avanzado
      cargarLecciones();
    });
  });

  cargarLecciones();
});
