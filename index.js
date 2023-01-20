//===============================================
// 👋 Imports
//===============================================
import { icons } from 'feather-icons';
import './style.scss';
import App from './classes/App.js';

//===============================================
// 👋 Skeleton
//===============================================
const ROOT = document.querySelector('#app');
ROOT.innerHTML = `
<div class='app-container'>
  <div id='root' class='root'></div>
  <a class='app-author' href='https://github.com/nagoev-alim' target='_blank'>${icons.github.toSvg()}</a>
</div>`;

//===============================================
// 👋 Class Instance
//===============================================
new App(document.querySelector('#root'));
