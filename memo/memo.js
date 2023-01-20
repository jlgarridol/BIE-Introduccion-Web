score = 0;
let firstCard = null;
let secondCard = null;
timer = 0.5;


function main() {
    let cards = createCards();
    cards = shuffleCards(cards);
    putCardsOnBoard(cards);
}

function createCards() {
    let cards = [];
    for (let i = 0; i < 16; i++) {
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
    let img = card.childNodes[0];
    let swap = img.src;
    img.src = img.alternative_src;
    img.alternative_src = swap;
    if (firstCard == null) {
        firstCard = card;
    }
    else {
        secondCard = card;
        if (firstCard.game_id == secondCard.game_id) {
            score++;
            document.getElementById('points').innerHTML = score;
            firstCard = null;
            secondCard = null;
        }
        else {
            setTimeout(function() {
                let img1 = firstCard.childNodes[0];
                let img2 = secondCard.childNodes[0];
                let swap = img1.src;
                img1.src = img1.alternative_src;
                img2.src = img2.alternative_src;
                img1.alternative_src = swap;
                img2.alternative_src = swap;
                firstCard = null;
                secondCard = null;
            }, timer * 1000);
        }
    }
}   

function putCardsOnBoard(cards) {
    let table = document.getElementById('board');
    for (let i = 0; i < cards.length; i++) {
        table.appendChild(cards[i]);
    }
}

function shuffleCards(cards) {
    cards.sort(() => Math.random() - 0.5);
    return cards;
}


main();