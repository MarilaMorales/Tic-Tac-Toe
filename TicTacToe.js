let celdas = document.getElementsByClassName("celda");
let player1 = document.getElementById("player1");
let player2 = document.getElementById("player2");
let turno= document.getElementsByClassName("turno");
let jugador = "X";
let tableroInicio = ["", "", "", "", "", "", "", "", ""];
let celdasVacias = [];
let numGanadores = [ [0,1,2], [0,4,8], [0,3,6], [1,4,7], [2,5,8], [3,4,5], [6,7,8]];
let juego = true;
let puntajeX = 0;
let puntajeO = 0;

// Se asigna un EventListener a las celdas
for (let i = 0; i < celdas.length; i++) {
    celdas[i].addEventListener("click", function() {
        if (!juego || this.innerHTML !== "") {
            return;
        }
        if (!this.innerHTML) {
            this.innerHTML = jugador;
            tableroInicio[i] = jugador;

            if (verificarGanador(jugador)) {
                alert(jugador + " es el ganador!");
                if (jugador === "X") {
                    puntajeX++;
                    player1.textContent = puntajeX;
                } else {
                    puntajeO++;
                    player2.textContent = puntajeO;
                }
                juego = false;
                return;
            }

            if (jugador === "X") {
                jugador = "O";
                turno.innerHTML="Turno de X"
                turnoComputadora();
            } else {
                turno.innerHTML="Turno de O"
                jugador = "X";
            }
        }
    });
}

function turnoComputadora() {
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

        if (verificarGanador("O")) {
            alert("O es el ganador!");
            puntajeO++;
            player2.textContent = puntajeO;
            juego = false;
            return;
        }
        
        jugador = "X"; 
    }
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
        alert("Empate!");
        juego = false;
    }

    return false;
}

function reiniciarJuego() {
    for (let i = 0; i < celdas.length; i++) {
        celdas[i].innerHTML = "";
    }
    tableroInicio = ["", "", "", "", "", "", "", "", ""];
    celdasVacias = [];
    jugador = "X";
    juego = true;
}

let botonReinicio = document.getElementById("reinicio");
botonReinicio.addEventListener("click", reiniciarJuego);






































