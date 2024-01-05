import { HelloWeb5, handleStateOnLoad } from './components/HelloWeb5.js';

document.querySelector('#app')!.innerHTML = HelloWeb5();
await handleStateOnLoad();