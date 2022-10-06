import {
  getDateClientCreate,
  getTimeClientCreate,
  createSocialItem,
} from "./createIcons.js";
import { createClientDeleteModal } from "./deleteModal.js";
import { changeClientModal } from "./changeClient.js";

//создание таблицы под получение данных клиента с сервера
export const createClientsTableSection = (client) => {
  const $trow = document.createElement("tr"),
    $thead = document.createElement("td"),
    $theadSpan = document.createElement("span"),
    $tdataName = document.createElement("td"),
    $tdataCreate = document.createElement("td"),
    $createDate = document.createElement("span"),
    $createTime = document.createElement("span"),
    $tdataChange = document.createElement("td"),
    $changeTime = document.createElement("span"),
    $changeDate = document.createElement("span"),
    $tdataContacts = document.createElement("td"),
    $listOfContacts = document.createElement("ul"),
    $tdataAction = document.createElement("td"),
    $buttonInner = document.createElement("div"),
    $buttonChangeInner = document.createElement("div"),
    $buttonChange = document.createElement("button"),
    $iconChangeSpan = document.createElement("span"),
    $buttonDeleteInner = document.createElement("div"),
    $buttonDelete = document.createElement("button"),
    $iconDeleteSpan = document.createElement("span"),
    classForBtn = ["btn", "main-text", "btn-reset", "btn-clients"],
    classForSpinner = ["spinner-border", "spiner-icon", "btn-none", "me-1"];

  const deleteModal = createClientDeleteModal();
  const changeModal = changeClientModal(client);

  $trow.classList.add("main-text");
  $thead.setAttribute("scope", "row");
  $tdataContacts.classList.add("list-group-contacts");
  $listOfContacts.classList.add(
    "list-group",
    "list-group-horizontal",
    "item-contacts"
  );

  $theadSpan.classList.add("table-title");
  $buttonChange.classList.add("btn");
  $createDate.classList.add("me-2");
  $createTime.classList.add("table-title");
  $changeDate.classList.add("me-2");
  $changeTime.classList.add("table-title");

  $buttonChange.classList.add(...classForBtn, "btn-change", "img-change");
  $buttonChange.textContent = "Изменить";
  $buttonDelete.classList.add(...classForBtn, "btn-delete", "img-delete");
  $buttonDelete.textContent = "Удалить";
  $buttonInner.classList.add("client-btn");
  $buttonChangeInner.classList.add("me-3", "btn-wrap");
  $iconChangeSpan.classList.add(...classForSpinner, "spiner-change");
  $iconChangeSpan.setAttribute("role", "status");
  $iconDeleteSpan.classList.add(...classForSpinner, "spiner-delete");
  $iconDeleteSpan.setAttribute("role", "status");

  $thead.append($theadSpan);
  $tdataCreate.append($createDate, $createTime);
  $tdataChange.append($changeDate, $changeTime);
  $buttonChangeInner.append($iconChangeSpan, $buttonChange);
  $buttonDeleteInner.append($iconDeleteSpan, $buttonDelete);
  $buttonInner.append($buttonChangeInner, $buttonDeleteInner);
  $tdataAction.append($buttonInner);
  $tdataContacts.append($listOfContacts);

  $trow.append(
    $thead,
    $tdataName,
    $tdataCreate,
    $tdataChange,
    $tdataContacts,
    $tdataAction
  );

  // получение с сервера данные клиента для отрисовки их в таблице
  $theadSpan.textContent = client._id.substring(client._id.length - 6);
  $tdataName.textContent =
    client.surname + " " + client.name + " " + client.lastName;

  $trow.id = client._id;
  // отрисовка даты создания и изменения данных клиента
  $createDate.textContent = getDateClientCreate(client.createdAt);
  $createTime.textContent = getTimeClientCreate(client.createdAt);
  $changeDate.textContent = getTimeClientCreate(client.updatedAt);
  $changeTime.textContent = getTimeClientCreate(client.updatedAt);

  //создание кнопки добавления дополнительных контактов
  client.contacts.forEach((a) => {
    createSocialItem(a.type, a.value, $listOfContacts);

    const contactNumber = client.contacts.indexOf(a) + 1,
      hiddenContacts = client.contacts.length - 4,
      $itemContacts = $listOfContacts.querySelectorAll("li"),
      $moreContacts = document.createElement("button");
    $moreContacts.classList.add("show-contacts");

    if (contactNumber > 4) {
      for (let i = 4; i < $itemContacts.length; i++) {
        $itemContacts[i].classList.add("unvisible");
      }
    }
    if (contactNumber === 5) {
      $moreContacts.textContent = `+${hiddenContacts}`;
      $listOfContacts.append($moreContacts);
    }

    $moreContacts.addEventListener("click", () => {
      $listOfContacts.childNodes.forEach((child) => {
        child.classList.remove("unvisible");
      });
      $moreContacts.remove();
    });
  });

  //появление модалки по клику на кнопку "изменить"
  $buttonChange.addEventListener("click", () => {
    $buttonChange.classList.remove("btn-clients");
    $iconChangeSpan.classList.remove("btn-none");

    setTimeout(() => {
      document.body.append(changeModal);
      $iconChangeSpan.classList.add("btn-none");
      $buttonChange.classList.add("btn-clients");
    }, 500);
  });

  //удаление клиента по ID
  const deleteClientById = () => {
    import("./clientData.js").then(({ deleteClientFromTable }) => {
      deleteModal.$buttonDel.addEventListener("click", () => {
        deleteClientFromTable(client._id);
        document.getElementById(client._id).remove();
        deleteModal.$modal.remove();
      });
    });
  };
  //кнопка удаления клиента
  $buttonDelete.addEventListener("click", () => {
    $buttonDelete.classList.remove("btn-clients");
    $iconDeleteSpan.classList.remove("btn-none");
    setTimeout(() => {
      deleteClientById();
      document.body.append(deleteModal.$modal);
      $iconDeleteSpan.classList.add("btn-none");
      $buttonDelete.classList.add("btn-clients");
    }, 500);
  });

  return $trow;
};
