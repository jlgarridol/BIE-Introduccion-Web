score = 0;
let firstCard = null;
let secondCard = null;
timer = 0.5;
const numberOfCards = 12;

function clearBoard() {
    let table = document.getElementById('board');
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
}

function newGame() {
    clearBoard();
    let winboard = document.getElementById('winboard');
    winboard.style.display = 'none';
    score = 0;
    document.getElementById('points').innerHTML = score;
    main();
}


function main() {
    let cards = createCards();
    cards = shuffleCards(cards);
    putCardsOnBoard(cards);
}

function createCards() {
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


function flipCard(){
    let card = this;

    // Reproduce un sonido al voltear la carta
    // Selecciona un sonido al azar entre 1 y 9
    let sound = Math.floor(Math.random() * 9) + 1;
    let audio = new Audio('effects/effect-0'+sound+'.mp3');
    audio.play();


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
            }, timer * 1000);
        }
    }

    if (score == numberOfCards) {
        finalizeGame();
    }
}   

function putCardsOnBoard(cards) {
    let table = document.getElementById('board');
    for (let i = 0; i < cards.length; i++) {
        table.appendChild(cards[i]);
    }
}

function shuffleCards(cards) {
    for (let i = 0; i < cards.length; i++) {
        let j = Math.floor(Math.random() * cards.length);
        let swap = cards[i];
        cards[i] = cards[j];
        cards[j] = swap;
    }
    return cards;
}

function finalizeGame() {
    let winboard = document.getElementById('winboard');
    let winpoints = document.getElementById('winpointsvalue');
    winpoints.innerHTML = score;
    winboard.style.display = 'block';
}


main();
