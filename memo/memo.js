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
            audio = new Audio('effects/win.mp3');
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


function clearBoard() {
    /**
     * Elimina todas las cartas del tablero
     */
    let table = document.getElementById('board');
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
}

function newGame() {
    /**
     * Inicia un nuevo juego
     * Elimina todas las cartas del tablero
     * Inicializa la puntuación a 0
     * Vuelve a crear el tablero
     */
    clearBoard();
    let winboard = document.getElementById('winboard');
    winboard.style.display = 'none';
    score = 0;
    document.getElementById('points').innerHTML = score;
    main();
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

function createCards() {
    /**
     * Crea las cartas
     * Crea dos cartas por cada número de carta
     * Devuelve un array con todas las cartas
     * @returns {Array}
     */
    let cards = [];
    for (let i = 0; i < numberOfCards; i++) {
        let card1 = createCard(i);
        let card2 = createCard(i);
        cards.push(card1);
        cards.push(card2);        
    }
    return cards;
}

function createCard(game_id){
    /**
     * Crea una carta
     * @param game_id {number} Número de la carta
     * @returns {HTMLDivElement} Carta
     */
    let card = document.createElement('div');
    card.className = 'card';
    card.game_id = game_id;
    img = document.createElement('img');
    img.src = 'images/reverso.png';
    img.alternative_src = 'images/'+game_id+'.png';
    img.alt = 'Imagen de la carta '+game_id+'.';
    card.appendChild(img);
    card.addEventListener('click', flipCard);
    return card;
}

function putCardsOnBoard(cards) {
    /**
     * Pone las cartas en el tablero
     */
    let table = document.getElementById('board');
    for (let i = 0; i < cards.length; i++) {
        table.appendChild(cards[i]);
    }
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

    sonidos('voltearCarta');

    let img = card.childNodes[0];
    let swap = img.src;
    img.src = img.alternative_src;
    img.alternative_src = swap;
    if (card == firstCard) {
        firstCard = null;
        return;
    }
    if (firstCard == null) {
        firstCard = card;
    }
    else {
        secondCard = card;
        if (firstCard.game_id == secondCard.game_id) {
            sonidos('parejaCorrecta');
            score++;
            document.getElementById('points').innerHTML = score;
            //The cards cannot flip back if the user clicks on them before the timer ends
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
            firstCard = null;
            secondCard = null;
        }
        else {
            setTimeout(function() {
                let img1 = firstCard.childNodes[0];
                let img2 = secondCard.childNodes[0];
                let swap1 = img1.src;
                let swap2 = img2.src;
                img1.src = img1.alternative_src;
                img2.src = img2.alternative_src;
                img1.alternative_src = swap1;
                img2.alternative_src = swap2;
                firstCard = null;
                secondCard = null;
                sonidos('parejaIncorrecta');
            }, timer * 1000);
        }
    }

    if (score == numberOfCards) {
        sonidos('victoria');
        finalizeGame();
    }
}   


main();
