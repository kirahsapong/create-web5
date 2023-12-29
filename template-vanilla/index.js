import './style.css';
import TbdBraces from './tbd.svg';
import { setupWeb5 } from '../web5.js';

document.querySelector('#app').innerHTML = `
  <main>
    <a href="https://developer.tbd.website" target="_blank">
      <img src="${TbdBraces}" class="logo" alt="TBD yellow curly braces icon" />
    </a>
    <h1>Hello, Web5!</h1>
    <div class="card">
      <button onclick="setupWeb5()"></button>
    </div>
    <p>
      Learn more about Web5 from the <a href="https://developer.tbd.website/docs/web5/" target="_blank">TBD Developer Docs</a>
    </p>
  </main>
`;