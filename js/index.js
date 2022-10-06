import { createHeader } from "./header.js";
import { createHeaderForTable } from "./headerTable.js";
import { getClient } from "./clientData.js";
import { createClientsTableSection } from "./mainTable.js";
import { sortingClients } from "./sorting.js";
import { tableSearch } from "./searchingClient.js";
(() => {
// запуск приложения
const createApp = async () => {
  const header = createHeader();
  const headerTable = createHeaderForTable();
  document.body.append(header.$section, headerTable.$sectionTable);
  const spiner = document.querySelector(".spiner-contaner");
  let timeout;
  try {
    const clientData = await getClient();
    clearInterval(timeout);
    timeout = setTimeout(() => {
      tableSearch(clientData);
      for (const clients of clientData) {
        document
          .querySelector("tbody")
          .appendChild(createClientsTableSection(clients));
      }
    }, 300);
  } catch (error) {
    console.log(error);
  } finally {
    setTimeout(() => {
      spiner.remove();
    }, 300);
  }
};

window.createApp = createApp;
window.addEventListener("DOMContentLoaded", sortingClients);
})()