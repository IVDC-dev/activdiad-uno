// ============================================================
// Actividad práctica III – 5 eventos de JavaScript
// Página: Parásitos (2019)
// ============================================================

// ------------------------------------------------------------
// EVENTO 1: click
// El botón del encabezado cambia entre modo oscuro y modo claro.
// ------------------------------------------------------------
const btnModo = document.getElementById("btn-modo");

btnModo.addEventListener("click", function () {
  document.body.classList.toggle("claro");
  const esClaro = document.body.classList.contains("claro");
  btnModo.textContent = esClaro ? "Modo oscuro" : "Modo claro";
});

// ------------------------------------------------------------
// EVENTO 2: mouseover y mouseout
// Al pasar el mouse por una tarjeta de premio se resalta y muestra
// un dato extra (guardado en el atributo data-extra del HTML).
// ------------------------------------------------------------
const tarjetas = document.querySelectorAll(".tarjeta");

tarjetas.forEach(function (tarjeta) {
  const extra = tarjeta.querySelector(".extra");

  tarjeta.addEventListener("mouseover", function () {
    tarjeta.classList.add("resaltada");
    extra.textContent = tarjeta.dataset.extra;
  });

  tarjeta.addEventListener("mouseout", function () {
    tarjeta.classList.remove("resaltada");
    extra.textContent = "";
  });
});

// ------------------------------------------------------------
// EVENTO 3: scroll
// El botón "Volver arriba" aparece cuando se baja en la página
// y al hacer clic regresa suavemente al inicio.
// ------------------------------------------------------------
const btnArriba = document.getElementById("btn-arriba");

window.addEventListener("scroll", function () {
  btnArriba.style.display = window.scrollY > 300 ? "block" : "none";
});

btnArriba.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ------------------------------------------------------------
// EVENTO 4: submit
// Formulario para calificar la película. Se valida que se elija
// una calificación y se muestra un mensaje de agradecimiento.
// ------------------------------------------------------------
const formulario = document.getElementById("form-calificacion");
const mensaje = document.getElementById("mensaje-form");

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault(); // evita que la página se recargue

  const estrellas = document.getElementById("estrellas").value;
  const comentario = document.getElementById("comentario").value.trim();

  if (estrellas === "") {
    mensaje.textContent = "Por favor elige una calificación.";
    mensaje.className = "error";
    return;
  }

  let texto = "¡Gracias por calificar con " + estrellas + " de 5!";
  if (comentario !== "") {
    texto += " Tu comentario fue recibido.";
  }
  mensaje.textContent = texto;
  mensaje.className = "ok";
  formulario.reset();
});

// ------------------------------------------------------------
// EVENTO 5: keydown
// Con las teclas + y - se cambia el tamaño de la letra de la página.
// (No actúa mientras se escribe en el formulario.)
// ------------------------------------------------------------
let tamanoLetra = 100; // porcentaje
const avisoLetra = document.getElementById("aviso-letra");
let temporizador;

document.addEventListener("keydown", function (evento) {
  const etiqueta = evento.target.tagName;
  if (etiqueta === "INPUT" || etiqueta === "TEXTAREA" || etiqueta === "SELECT") {
    return;
  }

  if (evento.key === "+" || evento.key === "=") {
    tamanoLetra = Math.min(tamanoLetra + 10, 150);
  } else if (evento.key === "-") {
    tamanoLetra = Math.max(tamanoLetra - 10, 70);
  } else {
    return;
  }

  document.documentElement.style.fontSize = tamanoLetra + "%";
  avisoLetra.textContent = "Tamaño de letra: " + tamanoLetra + "%";
  avisoLetra.style.display = "block";
  clearTimeout(temporizador);
  temporizador = setTimeout(function () {
    avisoLetra.style.display = "none";
  }, 1500);
});
