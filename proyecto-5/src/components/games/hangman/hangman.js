import './hangman.css';

localStorage.setItem("winHangman", 0);
localStorage.setItem("loseHangman", 0);

const images = [
    'https://res.cloudinary.com/dlnrzmzjf/image/upload/v1727265503/6_dzzeoz.jpg',
    'https://res.cloudinary.com/dlnrzmzjf/image/upload/v1727265502/5_dkr6hq.jpg',
    'https://res.cloudinary.com/dlnrzmzjf/image/upload/v1727265502/4_wzrxvm.jpg',
    'https://res.cloudinary.com/dlnrzmzjf/image/upload/v1727265502/3_xmze5z.jpg',
    'https://res.cloudinary.com/dlnrzmzjf/image/upload/v1727265502/2_dsacxw.jpg',
    'https://res.cloudinary.com/dlnrzmzjf/image/upload/v1727265502/1_ksad8l.jpg',
    'https://res.cloudinary.com/dlnrzmzjf/image/upload/v1727265502/0_mjz8m9.jpg',
];

const words = [
    'game',
    'software',
    'keyboard',
    'mouse',
    'developer',
    'binary',
    'script',
    'code',
    'memory',
    'router',
];

let wordGame;
let positionsFilled;
let numberOfLifes;
let correctLetters;

export const printHangman = () => {
    wordGame = '';
    positionsFilled = [];
    numberOfLifes = 6;
    correctLetters = 0;

    /** HTML **/
    const main = document.querySelector('main');

    const h2 = document.createElement('h2');
    h2.textContent = 'Hangman Game';

    const sectionResult = document.createElement('section');

    const articleWin = document.createElement('article');
    const h4Win = document.createElement('h4');
    h4Win.textContent = 'WON:';
    const pWIn = document.createElement('p');
    pWIn.textContent = localStorage.getItem('winHangman');
    pWIn.id = 'winHangmanResult';

    articleWin.appendChild(h4Win);
    articleWin.appendChild(pWIn);
    sectionResult.appendChild(articleWin);

    const articleLose = document.createElement('article');
    const h4Lose = document.createElement('h4');
    h4Lose.textContent = 'LOST:';
    const pLose = document.createElement('p');
    pLose.textContent = localStorage.getItem('loseHangman');
    pLose.id = 'loseHangmanResult';

    articleLose.appendChild(h4Lose);
    articleLose.appendChild(pLose);
    sectionResult.appendChild(articleLose);

    const sectionGame = document.createElement('section');

    const articleImg = document.createElement('article');
    articleImg.id = 'img_container';
    const img = document.createElement('img');
    img.src = `${images[6]}`;
    img.alt = 'Stick';
    img.id = 'hangman_img';
    articleImg.appendChild(img);

    const articleWord = document.createElement('article');
    articleWord.id = 'word_container';

    const articleKeyboard = document.createElement('article');
    articleKeyboard.id = 'keyboard_container';

    sectionGame.appendChild(articleImg);
    sectionGame.appendChild(articleWord);
    sectionGame.appendChild(articleKeyboard);

    main.appendChild(h2);
    main.appendChild(sectionResult);
    main.appendChild(sectionGame);

    /** GAME **/
    const selectedWord = selectWord();
    printWord(selectedWord);
    printKeyboard();
}

const selectWord = () => {
    const rand = (Math.random() * words.length-1).toFixed(0);
    const selectedWord = words[rand];
    console.log(selectedWord);
    wordGame = selectedWord;
    return selectedWord;
}

const printWord = (word) => {
    const articleWord = document.getElementById('word_container');
    const ul = document.createElement('ul');
    
    for(let i=0; i<word.length; i++) {
        const li = document.createElement('li');
        li.textContent = '_';
        li.className = "letter";
        li.id = i;

        ul.appendChild(li);
    }


    articleWord.appendChild(ul);
}

const printKeyboard = () => {
    const articleKeyboard = document.getElementById('keyboard_container');

    const alpha = Array.from(Array(26)).map((e, i) => i + 97);
    const alphabet = alpha.map((x) => String.fromCharCode(x));

    for(let i=0; i<alphabet.length; i++) {
        const div = document.createElement('div');
        div.id = alphabet[i];
        div.className = "key";
        div.textContent = alphabet[i].toUpperCase();
        div.addEventListener('click', () => validLetter(div));

        articleKeyboard.appendChild(div);
    }
}

const validLetter = (letter) => {
    let positions = [];

    for(let i=0; i<wordGame.length; i++) {
        if(wordGame.charAt(i) === letter.textContent.toLowerCase()) {
            positions.push(i);

            if(!positionsFilled.includes(i)) {
                positionsFilled.push(i);
            }
        }
    }

    if(positions.length === 0) {
        deleteLife();
    } else {
        for(let i=0; i<positions.length; i++) {
            const letterSpace = document.getElementById(positions[i]);
            letterSpace.textContent = letter.textContent.toLowerCase();
            correctLetters++;
        }
    }

    letter.textContent = '';

    if(correctLetters === wordGame.length) {
        winOrLose ('win');
    }
}

const deleteLife = () => {
    const img = document.getElementById('hangman_img');
    if(numberOfLifes > 1) {
        numberOfLifes--;
        img.src = `${images[numberOfLifes]}`;
    } else {
        img.src = `${images[0]}`;
        winOrLose('lose');
    }
}

const winOrLose = (result) => {
    if(result === 'win') {
        let win = parseInt(localStorage.getItem("winHangman"));
        win++;
        localStorage.setItem("winHangman", win);
        const pWin = document.getElementById('winHangmanResult');
        pWin.textContent = win;
        alert('Congrats! You won!');
    }
    if(result === 'lose') {
        let lose = parseInt(localStorage.getItem("loseHangman"));
        lose++;
        localStorage.setItem("loseHangman", lose);
        const pLose = document.getElementById('loseHangmanResult');
        pLose.textContent = lose;
        alert('Ups... you lost :(');
    }
}