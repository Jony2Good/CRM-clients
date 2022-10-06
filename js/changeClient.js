import { createModalAddClient } from "./clientModal.js";
import { createClientDeleteModal } from "./deleteModal.js";
import { createContact } from "./addContacts.js";
import { changeClient } from "./clientData.js";
import { createClientsTableSection } from "./mainTable.js";
import { validateClient } from "./validationName.js";
import { validateContact } from "./validationContacts.js";

//создание модального окна при клике на кнопку изменить
export const changeClientModal = (client) => {
  //корректиовка главного модального окна
  const changeModal = createModalAddClient();
  changeModal.$modalTitle.textContent = "Изменить данные";
  changeModal.$buttonSpan.textContent = "Удалить клиента";

  //создание контейнера для ID
  const $titleId = document.createElement("span");
  $titleId.classList.add("table-title", "ms-2");
  changeModal.$modalTitle.append($titleId);

  //Присваивание значения ID
  $titleId.textContent = `ID: ${client._id.substring(0, 6)}`;

  //удаление кдиента по клику на кнопу "удалить"
  changeModal.$buttonDismiss.addEventListener("click", (e) => {
    e.preventDefault();
    //вызов модального окна "Удалить клиента"
    const deleteModal = createClientDeleteModal();
    document.body.append(deleteModal.$modal);

    //логика удаления клиента с сервера через динамический импорт
    deleteModal.$buttonDel.addEventListener("click", () => {
      import("./clientData.js").then(({ deleteClientFromTable }) => {
        try {
          deleteClientFromTable(client._id);
          document.getElementById(client._id).remove();
          changeModal.$modal.remove();
          deleteModal.$modal.remove();
        } catch (error) {
          console.log(error);
        }
      });
    });
  });

  //нажатие на крестик удаляется модалка
  changeModal.$btnClose.addEventListener("click", (e) => {
    changeModal.$modal.remove();
  });

  //нажатие на темное окно удаляется модалка
  document.addEventListener("click", (e) => {
    if (e.target === changeModal.$modal) {
      changeModal.$modal.remove();
    }
  });

  //данные клиента в таблице совпадают с данными в модальном окне "изменить"
  changeModal.$inputSurname.value = client.surname;
  changeModal.$inputName.value = client.name;
  changeModal.$inputPatronymic.value = client.lastName;

  //запускается цикл по массиву с контактами в объекте client
  //значение контактов присваивается в поля модального окна "Изменить"
  for (const items of client.contacts) {
    const contactChange = createContact();
    contactChange.$contactBtnMenu.textContent = items.type;
    contactChange.$contactInput.value = items.value;
    changeModal.$buttonWrap.prepend(contactChange.$contactContainer);
  }

  //кнопка пропадает даже в случае повторного вызова модалки "Изменить"
  if (client.contacts.length == 10) {
    changeModal.$buttonAddClient.classList.add("btn-none");
    changeModal.$buttonWrap.style.paddingBottom = 25 + "px";
  }

  //изменение данных в галвном модальном окне
  //фактически метод PATCH перезаписывает объект и массив на сервере
  changeModal.$modalForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    //запись в переменные массива NodeElements
    const contactName = document.querySelectorAll(".contact__name"),
      contactInput = document.querySelectorAll(".contact__input");
    //объявление переменной для хранения сведений о контактах (телефон, почта и т.д.)
    let contacts = [],
      // объект для хранения ФИО, Id, и массива contacts
      clients = {};

    /*получение на каждой итерации тип значения из инпута (телефон, Вк и т.д.)
    получение введенного в поле инпута значения (номер телефона, почты и т.д.)
    все пушится в ранее объявленный массив */
    for (let i = 0; i < contactName.length; i++) {
      contacts.push({
        type: contactName[i].innerHTML,
        value: contactInput[i].value,
      });
    }
    /*получение на каждой итерации тип значения из инпута (телефон, Вк и т.д.)
      получение введенного в поле инпута значения (номер телефона, почты и т.д.)
      все пушится в ранее объявленный массив */
    for (let i = 0; i < contactName.length; i++) {
      if (!validateContact(contactName[i], contactInput[i])) {
        return;
      }
    }
    //функция делающая первые буквы ФИО заглавными
    function capitalize(e) {
      return e.charAt(0).toUpperCase() + e.substr(1).toLowerCase();
    }
    // создание значений в объекте, которые приходят из инпутов
    //фамилия в объекте будет та, которую введет пользователь в инпут и т.д.
    clients.surname = capitalize(changeModal.$inputSurname.value.trim());
    clients.name = capitalize(changeModal.$inputName.value.trim());
    clients.lastName = capitalize(changeModal.$inputPatronymic.value.trim());

    clients.contacts = contacts;

    if (validateClient()) {
      //изменение данных клиента на сервере
      const dataClient = await changeClient(clients, "PATCH", client._id);
      //получение данных клиента по ID, удаление клиента по ID
      //обращение к обертке таблицы куда добавляется информация об измененном клиенте,
      // которая пришла из функции changeClient()
      document
        .querySelector("tbody")
        .replaceChild(
          createClientsTableSection(dataClient),
          document.getElementById(dataClient._id)
        );
      // после добавления нового клиента исчезает модальное окно "Новый клиент"
      changeModal.$modal.remove();
    }
  });

  return changeModal.$modal;
};
