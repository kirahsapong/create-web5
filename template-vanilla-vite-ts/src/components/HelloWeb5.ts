import { setupWeb5, web5, did } from '../../web5-config.js';
import { queryRecords } from '../web5-utils.js';
import TBDLogo from '../tbd.svg';

export function HelloWeb5() {
  return `
    <header>
      <img width="192" src=${TBDLogo} class="logo" alt="TBD yellow curly braces icon" />
      <h1>Hello, <span>Web5!</span></h1>
    </header>
    <main>
      <div id="card">
          <button id="connect">Connect me to Web5</button>
          <div id="list"></div>
        <p>Use the starter functions in <code>src/web5-utils.js</code> to build your Web5 app.</p>
      </div>
      <p>
        Learn more about Web5 from the <a href="https://developer.tbd.website/docs/web5/" target="_blank">TBD Developer Docs</a>
      </p>
    </main>
  `
}

export async function handleStateOnLoad() {
  if (localStorage.getItem('userExists')) {
    await renderUI();
  } else {
    document.querySelector('#connect')!.addEventListener('click', async() => {
      await renderUI();
    })
  }
}

async function renderUI() {
  const { web5Stats } = await addWeb5();
  await addWeb5StatsList(web5Stats);
}

async function addWeb5(): Promise<{ web5Stats: Record<string, string | number | undefined>}>  {
  const button: HTMLButtonElement = document.querySelector('#connect')!;
  button.textContent = "Connecting...";
  button.disabled = true;
  await setupWeb5();
  localStorage.setItem('userExists', 'true');
  button.textContent = "Connected";

  const storedRecords = (await queryRecords({
    message: {
      filter: {
        dataFormat: "application/json"
      },
    },
  }));
  const didDocument = (await web5.did.resolve(did))?.didDocument;
  return {
    web5Stats: {
      "User DID: ": did,
      "Records stored: ": storedRecords?.length,
      "Local DWN location: ": 'Browser Storage > <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API">IndexedDB</a>',
      //@ts-ignore
      "Remote DWN location: ": didDocument?.service?.find(service => service.id === "#dwn")?.serviceEndpoint['nodes'].join(', ')
    }
  }
}

function addWeb5StatsList(web5Stats: Record<string, string | number | undefined>) {
  const list: HTMLUListElement = document.querySelector('#list')!;
  const renderListItems = () => {
      let listItems = ``;
      for (const stat in web5Stats) {
        listItems += `
          <li>
            <p>
              <span>${stat}</span>
              ${web5Stats[stat]}
            </p>
          </li>
        `
      }
      return listItems;
    }
  list.innerHTML = `<ul> ${renderListItems()} </ul>`;
}