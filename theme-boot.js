// Aplica o estilo salvo antes do primeiro paint para evitar flash visual.
(function () {
  var colors = {
    escuro: "#0d0e0f",
    serra: "#0b130e",
    bistro: "#e4dccb",
    neon: "#0a0614"
  };
  var id = "escuro";
  try {
    var stored = window.localStorage.getItem("sabores.theme.v1");
    if (stored && Object.prototype.hasOwnProperty.call(colors, stored)) id = stored;
  } catch (error) {
    // Storage bloqueado: usa o padrão Escuro Gourmet.
  }
  var root = document.documentElement;
  root.setAttribute("data-theme", id);
  root.style.colorScheme = id === "bistro" ? "light" : "dark";
  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", colors[id]);
})();
