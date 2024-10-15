import './ticTacToe.css';

localStorage.setItem('winX', 0);
localStorage.setItem('winO', 0);

let turn;
let board;

export const printTicTacToe = () => {
    turn = 0;
    board = [];

    const main = document.querySelector('main');
    
    const h2 = document.createElement('h2');
    h2.textContent = 'Tic Tac Toe Game';

    const sectionResult = document.createElement('section');

    const articleX = document.createElement('article');
    const h4X = document.createElement('h4');
    h4X.textContent = 'X:';
    const pX = document.createElement('p');
    pX.textContent = localStorage.getItem('winX');
    pX.id = 'winTicTacToeX';

    articleX.appendChild(h4X);
    articleX.appendChild(pX);
    sectionResult.appendChild(articleX);

    const articleO = document.createElement('article');
    const h4O = document.createElement('h4');
    h4O.textContent = 'O:';
    const pO = document.createElement('p');
    pO.textContent = localStorage.getItem('winO');
    pO.id = 'winTicTacToeO';

    articleO.appendChild(h4O);
    articleO.appendChild(pO);
    sectionResult.appendChild(articleO);

    const sectionGame = document.createElement('section');
    sectionGame.id = 'sectionGame';

    for(let i=0; i<9; i++) {
        const button = document.createElement('button');
        button.id = 'box';
        button.addEventListener('click', (e) => {
            buttonClicked(e, i);
        });

        sectionGame.appendChild(button);
    }

    main.appendChild(h2);
    main.appendChild(sectionResult);
    main.appendChild(sectionGame);
}

const buttonClicked = (e, pos) => {
    turn++;
    const btn = e.target;
    const player = turn%2 ? 'X' : 'O';
    btn.textContent = player;
    board[pos] = player;

    if(checkWin()) {
        let win = parseInt(localStorage.getItem(`win${player}`));
        win++;
        localStorage.setItem(`win${player}`, win);
        const pWin = document.getElementById(`winTicTacToe${player}`);
        pWin.textContent = win;
        alert(`The player ${player} won!`);
    }
}

const checkWin = () => {
    //horizontal
    if(board[0] === board[1] && board[0] === board[2] && board[0]) {
        return true;
    }
    if(board[3] === board[4] && board[3] === board[5] && board[3]) {
        return true;
    }
    if(board[6] === board[7] && board[6] === board[8] && board[6]) {
        return true;
    }

    // vertical
    if(board[0] === board[3] && board[0] === board[6] && board[0]) {
        return true;
    }
    if(board[1] === board[4] && board[1] === board[7] && board[1]) {
        return true;
    }
    if(board[2] === board[5] && board[2] === board[8] && board[2]) {
        return true;
    }

    //diagonal
    if(board[0] === board[4] && board[0] === board[8] && board[0]) {
        return true;
    }
    if(board[2] === board[4] && board[2] === board[6] && board[2]) {
        return true;
    }
    return false;
}