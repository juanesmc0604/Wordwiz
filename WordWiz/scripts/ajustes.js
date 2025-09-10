// Ajustes de nombre, idioma y tema
document.addEventListener('DOMContentLoaded', () => {
  aplicarTema();
  document.getElementById("nombreInput").value   = usuario.nombre;
  document.getElementById("idiomaSelect").value  = usuario.idioma;
  document.getElementById("temaSelect").value    = usuario.tema;

  document.getElementById("nombreInput").addEventListener("input", e => {
    usuario.nombre = e.target.value; guardarUsuario();
  });
  document.getElementById("idiomaSelect").addEventListener("change", e => {
    usuario.idioma = e.target.value; guardarUsuario();
  });
  document.getElementById("temaSelect").addEventListener("change", e => {
    usuario.tema = e.target.value; guardarUsuario(); aplicarTema();
  });
});
