document.addEventListener('DOMContentLoaded', () => {
  const mainContent = document.getElementById('main-content');
  const navItems = document.querySelectorAll('.nav-item');
  let appData = {};
  let userProgress = {};

  // Cargar datos del JSON
  fetch('../data/fulldata.json')
    .then(res => res.json())
    .then(data => {
      appData = data;
      loadProgress();
      renderProgress();
    });

  // Templates
  const templates = {
    progress: document.getElementById('progress-template'),
  };

  // 🔹 Cargar progreso desde localStorage
  function loadProgress() {
    const saved = localStorage.getItem('wordwiz_progress');
    if (saved) {
      userProgress = JSON.parse(saved);
    } else {
      userProgress = appData.user.progress;
    }
  }

  // 🔹 Guardar progreso en localStorage
  function saveProgress() {
    localStorage.setItem('wordwiz_progress', JSON.stringify(userProgress));
  }

  // 🔹 Renderizar progreso completo
  function renderProgress() {
    mainContent.innerHTML = templates.progress.innerHTML;

    document.getElementById('progress-level').textContent = `Nivel actual: ${userProgress.level}`;
    document.getElementById('progress-points').textContent = `Puntos acumulados: ${userProgress.points}`;
    document.getElementById('streak-days').textContent = `${userProgress.streak || 0} días`;

    renderMedals();
  }

  // 🔹 Verificar y desbloquear medallas
  function checkMedals() {
    appData.medals.forEach(medal => {
      if (!medal.unlocked) {
        if (medal.id === 1 && userProgress.level >= 2) {
          medal.unlocked = true;
          userProgress.medals.push(medal.name);
          alert(`🏅 Has desbloqueado la medalla: ${medal.name}!`);
        }
        if (medal.id === 2 && userProgress.points >= 200) {
          medal.unlocked = true;
          userProgress.medals.push(medal.name);
          alert(`🏅 Has desbloqueado la medalla: ${medal.name}!`);
        }
        if (medal.id === 3 && userProgress.level >= 3) {
          medal.unlocked = true;
          userProgress.medals.push(medal.name);
          alert(`🏅 Has desbloqueado la medalla: ${medal.name}!`);
        }
      }
    });
    saveProgress();
  }

  // 🔹 Renderizar medallas
  function renderMedals() {
    const medalsContainer = document.getElementById('medals-container');
    medalsContainer.innerHTML = '';

    appData.medals.forEach(medal => {
      const div = document.createElement('div');
      div.className = `medal-card ${medal.unlocked ? 'unlocked' : 'locked'}`;
      div.innerHTML = `
        <h3>${medal.icon || '🎖️'} ${medal.name}</h3>
        <p>${medal.description}</p>
        <p>${medal.unlocked ? "✅ Desbloqueada" : "🔒 Bloqueada"}</p>
      `;
      medalsContainer.appendChild(div);
    });
  }

  // Navegación
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const section = item.dataset.section;
      if (section === 'progress') renderProgress();
      if (section === 'profile') renderProfile();
      if (section === 'lessons') renderLessons();
    });
  });
});
