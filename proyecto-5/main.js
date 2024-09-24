import { printList } from './src/components/list/list';
import './style.css';

const app = document.getElementById('app');
const header = document.createElement('header');
const main = document.createElement('main');

app.appendChild(header);
app.appendChild(main);

printList();