import { createSpiner } from "./preloader.js";
import { createClient } from "./createClient.js";

// создание шапки таблицы
export const createHeaderForTable = () => {
  const $sectionTable = document.createElement("section"),
    $container = document.createElement("div"),
    $title = document.createElement("h2"),
    $tableBody = document.createElement("table"),
    $clientBody = document.createElement("tbody"),
    $head = document.createElement("thead"),
    $row = document.createElement("tr"),
    $id = document.createElement("th"),
    $name = document.createElement("th"),
    $dataOfCreate = document.createElement("th"),
    $dataOfChange = document.createElement("th"),
    $conacts = document.createElement("th"),
    $actions = document.createElement("th"),
    $btnContainer = document.createElement("div"),
    $btn = document.createElement("button");

  $sectionTable.classList.add("main", "container-1024", "color-main");
  $container.classList.add(
    "container-fluid",
    "pt-5",
    "pb-5",
    "shadow",
    "table-layout"
  );
  $title.classList.add("main-title", "mb-4");
  $title.textContent = "Клиенты";
  $tableBody.classList.add("table", "table-light", "mb-4");
  $row.classList.add("table-title");

  $clientBody.classList.add("client__table");
  $name.classList.add("name-section")
  $btnContainer.classList.add("text-center");
  $btn.classList.add("btn", "btn-img", "btn-main", "btn-text");
  $btn.textContent = "Добавить клиента";

  $id.textContent = "ID";
  $name.textContent = "Фамилия имя отчество";
  $dataOfCreate.textContent = "Дата и время создания";
  $dataOfChange.textContent = "Последние изменения";
  $conacts.textContent = "Контакты";
  $actions.textContent = "Действия";

  $row.append($id, $name, $dataOfCreate, $dataOfChange, $conacts, $actions);
  $head.append($row);
  $tableBody.append($head, $clientBody);
  $head.append(createSpiner());
  $btnContainer.append($btn);
  $container.prepend($title, $tableBody, $btnContainer);
  $sectionTable.append($container);

  //создание атрибуов для сортировки
  $id.setAttribute("data-path", "id"),
    $name.setAttribute("data-path", "name"),
    $dataOfCreate.setAttribute("data-path", "create"),
    $dataOfChange.setAttribute("data-path", "change");

  //открытие модального окна по клику на кнопку "Добавить клиента"
  $btn.addEventListener("click", () => {
    document.body.append(createClient());
  });

  //добавление классов для элементов и стрелок в шапке таблицы
  let btnArr = [$id, $name, $dataOfCreate, $dataOfChange];

  btnArr.forEach((value) => {
    value.classList.add("active-arrow");
    value.setAttribute("role", "button");

    value.addEventListener("click", () => {
      btnArr.forEach((button) => {
        if (button !== value) {
          button.classList.remove("is-active");
          button.classList.remove("is-colored");
        }
      });
      value.classList.toggle("is-active");
      value.classList.add("is-colored");
    });
  });

  //присваивает элементам через цикл повторяющиеся атрибуты
  let elements = [$conacts, $actions, ...btnArr];

  for (let items of elements) {
    items.setAttribute("scope", "col");
    items.classList.add("table-title");
  }

  return { $sectionTable, $tableBody, $container, $clientBody };
};
