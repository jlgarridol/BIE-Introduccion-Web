let score = 0; //Puntuación del juego
let firstCard = null; //Primera carta que se ha volteado
let secondCard = null; //Segunda carta que se ha volteado
let timer = 0.5; //Tiempo en segundos que tarda en voltearse la carta
const numberOfCards = 12; //Número de cartas que se van a mostrar
let audio = null; // Variable para almacenar el audio actual 

// Códigos para añadir efectos de sonido
function sonidos(tipo){
    // Se para el audio actual
    if(audio != null){
        audio.pause();
    }
    switch(tipo){
        case 'victoria':
            audio = new Audio('effects/victory.mp3');
            break;
        case 'parejaIncorrecta':
            audio = new Audio('effects/wrongPair.mp3');
            break;
        case 'parejaCorrecta':
            audio = new Audio('effects/goodPair.mp3');
            break;
        case 'voltearCarta':
            let sound = Math.floor(Math.random() * 9) + 1;
            audio = new Audio('effects/effect-0'+sound+'.mp3');
            break;
        default:
            return;
    }
    audio.play();
}

function main() {
    /**
     * Crea las cartas
     * Las baraja
     * Las pone en el tablero
     */
    let cards = createCards();
    cards = shuffleCards(cards);
    putCardsOnBoard(cards);
}


function clearBoard() {
    /**
     * Elimina todas las cartas del tablero
     */
    
}

function newGame() {
    /**
     * Inicia un nuevo juego
     * Elimina todas las cartas del tablero
     * Inicializa la puntuación a 0
     * Vuelve a crear el tablero
     */

}


function createCards() {
    /**
     * Crea las cartas
     * Crea dos cartas por cada número de carta
     * Devuelve un array con todas las cartas
     * @returns {Array}
     */

}

function createCard(game_id){
    /**
     * Crea una carta. Cada carta tiene un número de carta y una imagen
     * La imagen se obtiene de la carpeta images asignando el número de carta.
     * Por defecto, las cartas están boca abajo. 
     * Cuando se hace click en una carta, se llama a la función flipCard
     * 
     * @param game_id {number} Número de la carta
     * @returns {HTMLDivElement} Carta
     */

}

function putCardsOnBoard(cards) {
    /**
     * Pone las cartas en el tablero
     */

}

function shuffleCards(cards) {
    /**
     * Baraja las cartas
     */
    for (let i = 0; i < cards.length; i++) {
        let j = Math.floor(Math.random() * cards.length);
        let swap = cards[i];
        cards[i] = cards[j];
        cards[j] = swap;
    }
    return cards;
}

function finalizeGame() {
    /**
     * Finaliza el juego
     */
    let winboard = document.getElementById('winboard');
    let winpoints = document.getElementById('winpointsvalue');
    winpoints.innerHTML = score;
    winboard.style.display = 'block';
}


function flipCard(){
    /**
     * Voltea la carta
     * Si es la primera carta que se ha volteado, la guarda en la variable firstCard
     * Si es la segunda carta que se ha volteado, la guarda en la variable secondCard
     * Si las dos cartas son iguales, las deja boca arriba
     * Si las dos cartas son distintas, las vuelve a poner boca abajo
     * Si se han volteado todas las cartas, finaliza el juego
     */
    let card = this;


}   


main();
