let celdas = document.getElementsByClassName("celda");
let jugador = "X";
let tableroInicio = ["", "", "", "", "", "", "", "", ""];
let celdasVacias = [];
let numGanadores = [ [0,1,2], [0,4,8], [0,3,6], [1,4,7], [2,5,8], [3,4,5], [6,7,8]];
let juego = true;




//Se asigna un EvenListener a las celdas
for (let i = 0; i < celdas.length; i++) {
    celdas[i].addEventListener("click", function() {
        if (!juego || this.innerHTML !== "") {
        return;
        }

        if (!this.innerHTML) {
            this.innerHTML = jugador;
            tableroInicio[i] = jugador;

            if (jugador === "X") {
                jugador = "O";
                turnoComputadora();

            } else {
                jugador = "X";
            }
        }
    });
}

function turnoComputadora() {
    // Encuentra las celdas vacías    
    for (let i = 0; i < tableroInicio.length; i++) {
        if (tableroInicio[i] === "") {
            celdasVacias.push(i);
        }
    }

    // Valida si hay celdas vacias para usar Random
    if (celdasVacias.length > 0) {        
        let numeroRandom = celdasVacias[Math.floor(Math.random() * celdasVacias.length)];
        tableroInicio[numeroRandom] = "O";
        celdas[numeroRandom].innerHTML = "O";        
        
        // Cambia de Jugador
        jugador = "X"; 
    }
}

function reiniciarJuego() {
    // Limpia el contenido de las celdas en el DOM
    for (let i = 0; i < celdas.length; i++) {
        celdas[i].innerHTML = "";
    }

    // Limpia el estado del tablero
    tableroInicio = ["", "", "", "", "", "", "", "", ""];
    celdasVacias = [];
    
    // Cambia el turno al jugador humano
    jugador = "X";
    juego = true;
}



let botonReinicio = document.getElementById("Reinicio");
botonReinicio.addEventListener("click", reiniciarJuego);

















































// for (let i = 0; i < celda.length; i++) {
//     celda[i].addEventListener("click", turnojugador )
// }

