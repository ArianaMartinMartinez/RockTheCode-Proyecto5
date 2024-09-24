import { printGame } from '../games/games';
import './list.css';

const gamesNames = ['Tic Tac Toe', 'Memory', 'Hangman'];

export const printList = () => {
    const header = document.querySelector('header');

    const logo = document.createElement('img');
    logo.id = 'logo';
    logo.src = '../../../public/icon.png';
    logo.alt = 'Logo';

    const nav = document.createElement('nav');
    const ul = document.createElement('ul');

    for(let game of gamesNames) {
        const li = document.createElement('li');
        const button = document.createElement('button');

        button.textContent = game;
        button.addEventListener('click', () => printGame(game));
        
        li.appendChild(button);
        ul.appendChild(li);
    }
    nav.appendChild(ul);

    header.appendChild(logo);
    header.appendChild(nav);
}