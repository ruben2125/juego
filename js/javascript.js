var grupoTarjetas = ["🦄", "🍦", "🌈", "👽", "👾", "🤖", "👹", "👺"];
var totalTarjetas = grupoTarjetas.concat(grupoTarjetas); // Duplicamos las cartas
var tarjetasDescubiertas = [];
var emparejadas = 0;
var tiempo = 0;
var intervalo;
var tiempoLimite = 30; // Tiempo límite en segundos

function barajaTarjetas() {
    for (let i = totalTarjetas.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [totalTarjetas[i], totalTarjetas[j]] = [totalTarjetas[j], totalTarjetas[i]];
    }
}

function iniciarCronometro() {
    intervalo = setInterval(function () {
        tiempo++;
        document.getElementById("cronometro").innerText = "Tiempo: " + (tiempoLimite - tiempo) + "s";
        if (tiempo >= tiempoLimite) {
            clearInterval(intervalo); // Detener el cronómetro
            mostrarMensajeFinJuego();
        }
    }, 1000);
}

function mostrarMensajeFinJuego() {
    var mensaje = document.getElementById("mensajeFinJuego");
    mensaje.innerText = "¡Intentenlo de nuevo!";
    mensaje.style.display = "block"; // Mostrar el mensaje
    document.getElementById("botonIntentar").style.display = "inline-block"; // Mostrar el botón de reiniciar
}

function mostrarMensajeVictoria() {
    var mensaje = document.getElementById("mensajeVictoria");
    mensaje.innerText = "¡Enhorabuena, campeón!";
    mensaje.style.display = "block"; // Mostrar el mensaje de victoria
}

function reparteTarjetas() {
    var mesa = document.getElementById("mesa");
    mesa.innerHTML = ""; // Limpiar la mesa antes de repartir

    totalTarjetas.forEach(function (elemento, index) {
        var tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta");
        tarjeta.setAttribute("data-id", index); // Asignar un ID único a cada carta

        // Crear el contenido interno de la tarjeta
        tarjeta.innerHTML = `<div class="tarjeta__contenido">${elemento}</div>`;

        // Agregar la tarjeta a la mesa
        mesa.appendChild(tarjeta);

        // Añadir un evento de clic a cada tarjeta para revelarla
        tarjeta.addEventListener("click", function () {
            if (tarjetasDescubiertas.length < 2) {
                tarjeta.classList.add("descubierta");
                tarjetasDescubiertas.push(tarjeta);
            }

            if (tarjetasDescubiertas.length === 2) {
                checkMatch();
            }
        });
    });

    // Iniciar el cronómetro cuando se reparten las cartas
    tiempo = 0;
    document.getElementById("cronometro").innerText = "Tiempo: 30s"; // Mostrar 30s iniciales
    iniciarCronometro();
}

// Verificar si las dos tarjetas descubiertas son iguales
function checkMatch() {
    var tarjeta1 = tarjetasDescubiertas[0];
    var tarjeta2 = tarjetasDescubiertas[1];

    if (tarjeta1.innerHTML === tarjeta2.innerHTML) {
        emparejadas++;
        tarjetasDescubiertas = [];
        if (emparejadas === grupoTarjetas.length) {
            clearInterval(intervalo); // Detener el cronómetro cuando se emparejan todas las cartas
            mostrarMensajeVictoria();
        }
    } else {
        // Si no son iguales, voltear las tarjetas nuevamente después de un pequeño retraso
        setTimeout(function () {
            tarjeta1.classList.remove("descubierta");
            tarjeta2.classList.remove("descubierta");
            tarjetasDescubiertas = [];
        }, 1000);
    }
}

// Evento para el botón "Repartir cartas"
document.getElementById("btnRepartir").addEventListener("click", function () {
    barajaTarjetas(); // Barajar antes de repartir
    reparteTarjetas();
});

// Evento para el botón de reiniciar el juego
document.getElementById("botonIntentar").addEventListener("click", function () {
    emparejadas = 0;
    tiempo = 0;
    document.getElementById("cronometro").innerText = "Tiempo: 30s";
    document.getElementById("mensajeFinJuego").style.display = "none"; // Ocultar mensaje de fin de juego
    document.getElementById("mensajeVictoria").style.display = "none"; // Ocultar mensaje de victoria
    document.getElementById("botonIntentar").style.display = "none"; // Ocultar botón de reiniciar
    barajaTarjetas();
    reparteTarjetas();
});
