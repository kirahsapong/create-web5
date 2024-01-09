import { HelloWeb5, handleStateOnLoad } from './src/components/HelloWeb5.js';
import './src/style.css'

document.querySelector('#app')!.innerHTML = HelloWeb5();
await handleStateOnLoad();