document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const lessonId = parseInt(params.get("lesson"));

  const lessonTitle = document.getElementById("lesson-title");
  const progressText = document.getElementById("progress-text");
  const preguntaContainer = document.getElementById("pregunta");
  const opcionesContainer = document.getElementById("opciones");
  const nextBtn = document.getElementById("next-btn");
  const resultado = document.getElementById("resultado");

  let currentLesson = null;
  let currentQuestionIndex = 0;
  let correctAnswers = 0;
  let fulldata = null;

  fetch("../data/fulldata.json")
    .then(res => res.json())
    .then(data => {
      fulldata = JSON.parse(localStorage.getItem("wordwizData")) || data;
      currentLesson = fulldata.lessons.find(l => l.id === lessonId);

      if (!currentLesson) {
        preguntaContainer.textContent = "❌ Lección no encontrada.";
        preguntaContainer.style.color = "#000";
        return;
      }

      lessonTitle.textContent = currentLesson.name;
      mostrarPregunta();
    })
    .catch(err => {
      console.error("Error cargando JSON:", err);
      preguntaContainer.textContent = "Error al cargar la lección.";
      preguntaContainer.style.color = "#000";
    });

  function mostrarPregunta() {
    const q = currentLesson.quiz[currentQuestionIndex];
    if (!q) {
      terminarLeccion();
      return;
    }

    preguntaContainer.textContent = q.question;
    preguntaContainer.style.color = "#222";
    progressText.textContent = `${currentQuestionIndex + 1}/${currentLesson.quiz.length}`;

    opcionesContainer.innerHTML = "";
    q.options.forEach(op => {
      const btn = document.createElement("button");
      btn.textContent = op;
      btn.className = "option-btn";
      btn.style.color = "#333";
      btn.onclick = () => verificarRespuesta(op, q.answer);
      opcionesContainer.appendChild(btn);
    });

    resultado.textContent = "";
    nextBtn.style.display = "none";
  }

  function verificarRespuesta(opcion, correcta) {
    if (opcion === correcta) {
      resultado.textContent = "✅ Correcto!";
      correctAnswers++;
    } else {
      resultado.textContent = "❌ Incorrecto. La respuesta era: " + correcta;
    }
    nextBtn.style.display = "block";
  }

  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentLesson.quiz.length) {
      mostrarPregunta();
    } else {
      terminarLeccion();
    }
  });

  function terminarLeccion() {
    preguntaContainer.textContent = "🎉 ¡Lección completada!";
    preguntaContainer.style.color = "#222";
    opcionesContainer.innerHTML = "";
    nextBtn.style.display = "none";
    progressText.textContent = "";
    resultado.textContent = `Puntaje: ${correctAnswers}/${currentLesson.quiz.length}`;

    // guardar progreso
    let userData = JSON.parse(localStorage.getItem("wordwizData")) || fulldata;
    const lessonIndex = userData.lessons.findIndex(l => l.id === lessonId);
    if (lessonIndex !== -1) userData.lessons[lessonIndex].completed = true;

    userData.user.progress.points += correctAnswers * 10;
    userData.user.progress.streak++;

    userData.medals.forEach(medal => {
      if (medal.id === 1 && !medal.unlocked) medal.unlocked = true;
      if (medal.id === 2 && userData.user.progress.points >= 200) medal.unlocked = true;
      if (medal.id === 3 && userData.user.progress.level >= 3) medal.unlocked = true;
    });

    localStorage.setItem("wordwizData", JSON.stringify(userData));

    // redirigir tras 3 segundos
    setTimeout(() => {
      window.location.href = "lecciones.html";
    }, 3000);
  }
});
