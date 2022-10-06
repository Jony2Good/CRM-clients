export const sortingClients = () => {
  //получаем доступ к элементам таблицы
  const mainTable = document.querySelector("table"),
    headerTableItems = mainTable.querySelectorAll("th"),
    clientTable = document.querySelector("tbody");

  //создается из псевдомассива headerTableItems массив
  //метод map записывает в переменную новый массив отсортированных элементов
  const sortDirections = Array.from(headerTableItems).map(() => "");

  //функция принимает значения в заголовке таблицы (ID,ФИО и т.д.) и контент (конкретные данные клиента)
  const getItems = (value, content) => {
    switch (value) {
      case "id":
        return parseFloat(content);
      case "create":
      case "change":
        return content.split(".").reverse().join("-");
      case "name":
      default:
        return content;
    }
  };
  const sortItems = (index) => {
    //по индексу элемента записываем в переменную его атрибут
    const path = headerTableItems[index].getAttribute("data-path"),
      //в переменную записываем все строки с данными клиента
      items = clientTable.querySelectorAll("tr"),
      //записываем только тот элемент с индексомтпо которому произошел клик
      //первое нажатие идет занчение up
      sortDirection = sortDirections[index] || "up",
      //взависимости от переменной изменяется направление сортировки
      sortingDir = sortDirection === "up" ? 1 : -1,
      //преобразование NodeList в массив
      itemsArr = Array.from(items);

    itemsArr.sort((elemFirst, elemSecond) => {
      const firstCompareItem =
          elemFirst.querySelectorAll("td")[index].textContent,
        secondСompareItem =
          elemSecond.querySelectorAll("td")[index].textContent,
        a = getItems(path, firstCompareItem),
        b = getItems(path, secondСompareItem);

      switch (true) {
        case a > b:
          return 1 * sortingDir;
        case a < b:
          return -1 * sortingDir;
        default:
          break;
        case a === b:
          return 0;
      }
    });
    //удаляются все строки после сортировки
    items.forEach((row) => {
      clientTable.removeChild(row);
    });

    //изменение направления сортировки - если равно up то меняется на down
    sortDirections[index] = sortDirection === "up" ? "down" : "up";

    //после сортировки перезаписываются строки с данными клиента
    itemsArr.forEach((newItems) => {
      clientTable.appendChild(newItems);
    });
  };
  /*item - отдельный элемент th (ID, ФИО, дата и т.д.)
index - идекс каждого th
по клику на каждый th вызывается функция sortItem(index)*/
  headerTableItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      sortItems(index);
    });
  });
};
