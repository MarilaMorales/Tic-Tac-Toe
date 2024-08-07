// Obtén todas las celdas del tablero desde el DOM
let celdas = document.getElementsByClassName("celda");
let jugador = "X"; // El jugador inicial es "X"
let tableroInicio = ["", "", "", "", "", "", "", "", ""]; // Estado inicial del tablero
let celdasVacias = []; // Lista para almacenar las celdas vacías
let numGanadores = [ [0,1,2], [0,4,8], [0,3,6], [1,4,7], [2,5,8], [3,4,5], [6,7,8]]; // Combinaciones ganadoras
let juego = true; // Indica si el juego está en curso





// Función para el turno de la computadora
function turnoComputadora() {
    // Limpia el arreglo de celdas vacías
    celdasVacias = [];
    
    // Encuentra las celdas vacías
    for (let i = 0; i < tableroInicio.length; i++) {
        if (tableroInicio[i] === "") {
            celdasVacias.push(i);
        }
    }

    // Si hay celdas vacías, la computadora elige una al azar
    if (celdasVacias.length > 0) {
        let numeroRandom = celdasVacias[Math.floor(Math.random() * celdasVacias.length)];
        
        tableroInicio[numeroRandom] = "O";
        celdas[numeroRandom].innerHTML = "O";
        
        // Cambia el turno al jugador humano
        jugador = "X"; 
    }
}

// Función para reiniciar el juego
function reiniciarJuego() {
    // Limpia el contenido de las celdas en el DOM
    for (let i = 0; i < celdas.length; i++) {
        celdas[i].innerHTML = "";
    }

    // Reinicia el estado del tablero
    tableroInicio = ["", "", "", "", "", "", "", "", ""];

    // Reinicia el estado de celdasVacias
    celdasVacias = [];

    // Cambia el turno al jugador humano
    jugador = "X";
}

// Encuentra el botón de reinicio usando getElementById
let botonReinicio = document.getElementById("Reinicio");
