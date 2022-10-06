import { findClient } from "./clientData.js";
import { createClientsTableSection } from "./mainTable.js";

export const tableSearch = (clients) => {
  //получение элемента из DOM дерева
  const listContainer = document.querySelector(".header-list"),
    input = document.querySelector(".search-input");

  //Формирование списка.Перебор каждого клиента, для которого создается элемент
  //в созданный элемент записывается ФИО клиента
  //элемент вставляется в контейнер
  clients.forEach((client) => {
    const $item = document.createElement("a");

    $item.classList.add(
      "list-group-item",
      "list-group-item-action",
      "search-link"
    );
    $item.href = "#" + `${client.id}`;
    $item.textContent = `${client.surname} ${client.name} ${client.lastName}`;

    listContainer.append($item);
  });

  //функция для перерисовки таблицы с клиентами при введении символов в инпут для поиска
  const changeTable = async (text) => {
    
    let response = await findClient(text),
      mainTable = document.querySelector(".client__table");
     
    //ввод текста в инпут чистит таблицу от элементов
    mainTable.innerHTML = "";
   
    //отрисовка клиентов в таблице после ввода текста для поиска
    for (const item of response) {
      mainTable.append(createClientsTableSection(item));
    }
  };


 input.addEventListener("input", async () => {
    const inputText = input.value.trim(),
      searchLinks = document.querySelectorAll(".search-link");
     
    //если в инпуте введено значение
    if (inputText !== "") {
      
      //вызов функции перерисовки таблицы согласно введеным значениям
      changeTable(inputText)

      searchLinks.forEach((item) => {
        //если после поиска в инпуте введенного текста
        //-1 -> нет совпадений в талице
        if (item.innerText.search(inputText) == -1) {
          item.classList.add("btn-none");
          item.innerHTML = item.innerText;
        } else {
          item.classList.remove("btn-none");
          listContainer.classList.remove("btn-none");
          const text = item.innerText;
          item.innerHTML = highlightingWords(
            text,
            item.innerText.search(inputText),
            inputText.length
          );
        }
      });
    } else {
      searchLinks.forEach((item) => {
        const mainTable = document.querySelector(".client__table");
        mainTable.innerHTML = "";

        clients.forEach((value) => {
          mainTable.append(createClientsTableSection(value));
        });
        item.classList.remove("btn-none");
        listContainer.classList.add("btn-none");
        item.innerHTML = item.innerText;
      });
    }
  });

  // //красит буквы при поиске. Функция принимает парамтром изначальный текст
  // //введенный в инпутб; текст по совпадению; длина строки введенная в инпут
  const highlightingWords = (str, textMatch, length) =>
    str.slice(0, textMatch) +
    "<strong>" +
    str.slice(textMatch, textMatch + length) +
    "</strong>" +
    str.slice(textMatch + length);
};
