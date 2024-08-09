let celdas = document.getElementsByClassName("celda");
let player1 = document.getElementById("player1");
let player2 = document.getElementById("player2");
let turno = document.getElementById("turno");
let ganoX = document.getElementById("ganoX");
let ganoO = document.getElementById("ganoO");
let imagenGanoX = document.getElementById("imagenGanoX");
let imagenGanoO = document.getElementById("imagenGanoO");
let Empate = document.getElementById("Empate");
let click = document.getElementById("click");
let empateClick = document.getElementById("empateClick");
let clickStar = document.getElementById("clickStar");
let clickGanador = document.getElementById("clickGanador");
let reinicioSound = document.getElementById("reinicioSound");
let jugador = "X";
let tableroInicio = ["", "", "", "", "", "", "", "", ""];
let celdasVacias = [];
let numGanadores = [
    [0, 1, 2], [0, 4, 8], [0, 3, 6], [1, 4, 7],
    [2, 5, 8], [3, 4, 5], [6, 7, 8], [6, 4, 2]
];
let juego = true;
let puntajeX = 0;
let puntajeO = 0;

cargarLocal();

// Se asigna un EventListener a las celdas
for (let i = 0; i < celdas.length; i++) {
    celdas[i].addEventListener("click", function() {
        if (!juego || this.innerHTML !== "") {
            return;
        }

        click.play();

        if (!this.innerHTML) {
            this.innerHTML = jugador;
            tableroInicio[i] = jugador;

            if (verificarGanador(jugador)) {
                mostrarGanador(jugador);
                clickGanador.play();
                if (jugador === "X") {
                    puntajeX++;
                    player1.textContent = puntajeX;
                } else {
                    puntajeO++;
                    player2.textContent = puntajeO;
                }
                guardarLocal();
                juego = false;
                return;
            }

            if (jugador === "X") {
                jugador = "O";
                turnoComputadora();
            } else {
                jugador = "X";
            }
            actualizarTurno(); 
        }
    });
}

function turnoComputadora() {
    setTimeout(function() { 
        celdasVacias = [];
        for (let i = 0; i < tableroInicio.length; i++) {
            if (tableroInicio[i] === "") {
                celdasVacias.push(i);
            }
        }

        if (celdasVacias.length > 0) {        
            let numeroRandom = celdasVacias[Math.floor(Math.random() * celdasVacias.length)];
            tableroInicio[numeroRandom] = "O";
            celdas[numeroRandom].innerHTML = "O";        
            clickStar.play();

            if (verificarGanador("O")) {
                mostrarGanador("O");
                clickGanador.play();
                puntajeO++;
                player2.textContent = puntajeO;
                juego = false;
                return;
            }
            
            jugador = "X";
            actualizarTurno()
        }
    }, 1000); // Retraso de 1000 ms (1 segundo)
}

function verificarGanador(jugador) {
    for (let i = 0; i < numGanadores.length; i++) {
        let combinacion = numGanadores[i];
        if (tableroInicio[combinacion[0]] === jugador && 
            tableroInicio[combinacion[1]] === jugador && 
            tableroInicio[combinacion[2]] === jugador) {
            return true;
        }
    }

    // Verificar si hay un empate (todas las celdas están llenas)
    let empate = true;
    for (let i = 0; i < tableroInicio.length; i++) {
        if (tableroInicio[i] === "") {
            empate = false;
            break;
        }
    }
    
    if (empate) {
        empateClick.play();
        Empate.src = "IMG/Empate.png";
        Empate.style.display = "block";
        imagenGanoO.style.display = "none";
        imagenGanoX.style.display = "none";
        juego = false;
    }

    return false;
}

// Cambiar de Turno
function actualizarTurno() {
    if (jugador === "X") {
        turno.innerHTML = "Es el turno del jugador X";
    } else {
        turno.innerHTML = "Es el turno del jugador O";
    }
}

// Mostrar el ganador
function mostrarGanador(jugador) {
    if (jugador === "X") {
        imagenGanoX.src = "IMG/GanadorX.png";
        imagenGanoX.style.display = "block";
        imagenGanoO.style.display = "none";
        Empate.style.display = "none";
    } else {
        imagenGanoO.src = "IMG/GanadorO.png";
        imagenGanoO.style.display = "block";
        imagenGanoX.style.display = "none";
        Empate.style.display = "none";
    }
}

function reiniciarJuego() {
    reinicioSound.play();
    for (let i = 0; i < celdas.length; i++) {
        celdas[i].innerHTML = "";
    }
    tableroInicio = ["", "", "", "", "", "", "", "", ""];
    celdasVacias = [];
    jugador = "X";
    imagenGanoX.style.display = "none";
    imagenGanoO.style.display = "none";
    Empate.style.display = "none";
    juego = true;
    actualizarTurno(); 
}

let botonReinicio = document.getElementById("reinicio");
botonReinicio.addEventListener("click", reiniciarJuego);

// Inicializar el turno al cargar la página
actualizarTurno();

// Guardar en el LocalStorage
function guardarLocal() {
    localStorage.setItem("puntajeX", puntajeX);
    localStorage.setItem("puntajeO", puntajeO);
}

function cargarLocal() {
    if (localStorage.getItem('puntajeX')) {
        puntajeX = parseInt(localStorage.getItem('puntajeX'));
    }
    if (localStorage.getItem('puntajeO')) {
        puntajeO = parseInt(localStorage.getItem('puntajeO'));
    }
    player1.textContent = puntajeX;
    player2.textContent = puntajeO;
}


