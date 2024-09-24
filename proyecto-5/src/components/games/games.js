import './games.css';
import { printHangman } from './hangman/hangman';
import { printMemory } from './memory/memory';
import { printTicTacToe } from './ticTacToe/ticTacToe';

export const printGame = (gameName) => {
    const main = document.querySelector('main');

    if(gameName === 'Tic Tac Toe') {
        main.innerHTML = '';
        printTicTacToe();
    }

    if(gameName === 'Memory') {
        main.innerHTML = '';
        printMemory();
    }

    if(gameName === 'Hangman') {
        main.innerHTML = '';
        printHangman();
    }
}