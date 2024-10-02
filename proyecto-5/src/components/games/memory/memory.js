import './memory.css';

localStorage.setItem('statsMemory', 0);

const totalCards = 8;
const availableCards = ['A', 'K', 'Q', 'J'];
let cards;
let selectedCards;
let valuesUsed;
let currentMove;

let cardTemplate = `
    <div class="card">
        <div class="back"></div>
        <div class="face"></div>
    </div>
`;

export const printMemory = () => {
    cards = [];
    selectedCards = [];
    valuesUsed = [];
    currentMove = 0;

    const main = document.querySelector('main');

    const h2 = document.createElement('h2');
    h2.textContent = 'Memory Game';

    main.appendChild(h2);

    const sectionStats = document.createElement('section');
    const h4Stats = document.createElement('h4');
    h4Stats.textContent = 'Tries:';
    const pStats = document.createElement('p');
    pStats.textContent = localStorage.getItem('statsMemory');
    pStats.id = 'triesMemory';

    sectionStats.appendChild(h4Stats);
    sectionStats.appendChild(pStats);
    main.appendChild(sectionStats);


    const section = document.createElement('section');
    section.id = 'game';

    main.appendChild(section);

    for(let i=0; i<totalCards; i++) {
        const div = document.createElement('div');
        div.innerHTML = cardTemplate;
        cards.push(div);
        document.querySelector('#game').appendChild(cards[i]);

        randomValue();

        cards[i].querySelectorAll('.face')[0].innerHTML = getFaceValue(valuesUsed[i]);
        cards[i].querySelectorAll('.card')[0].addEventListener('click', activate);
    }

    localStorage.setItem('statsMemory', 0);
}

const activate = (e) => {
    if(currentMove < 2) {
        if((!selectedCards[0] || selectedCards[0] !== e.target) && !e.target.classList.contains('active')) {
            e.target.classList.add('active');
            selectedCards.push(e.target);

            if(++currentMove == 2) {
                let attempts = parseInt(localStorage.getItem('statsMemory'));
                attempts++;
                localStorage.setItem('statsMemory', attempts);
                document.getElementById('triesMemory').textContent = attempts;

                if(selectedCards[0].querySelectorAll('.face')[0].innerHTML == selectedCards[1].querySelectorAll('.face')[0].innerHTML) {
                    selectedCards = [];
                    currentMove = 0;
                } else {
                    setTimeout(() => {
                        selectedCards[0].classList.remove('active');
                        selectedCards[1].classList.remove('active');
                        selectedCards = [];
                        currentMove = 0;
                    }, 600);
                }
            }
        }
    }
}

const randomValue = () => {
    let rnd = Math.floor(Math.random() * totalCards * 0.5);
    let values = valuesUsed.filter(value => value === rnd);

    if(values.length < 2) {
        valuesUsed.push(rnd);
    } else {
        randomValue();
    }
}

const getFaceValue = (value) => {
    let rtn = value;
    if(value < availableCards.length) {
        rtn = availableCards[value];
    }

    return rtn;
}