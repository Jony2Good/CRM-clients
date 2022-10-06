import { changeClient } from "./clientData.js";
import { createModalAddClient } from "./clientModal.js";
import { validateClient } from "./validationName.js";
import { validateContact } from "./validationContacts.js";
import { createClientsTableSection } from "./mainTable.js";

//создаем объект клиента из введенных в инпут значений, пушим в массив
//отправляем данные клиента на сервер
export const createClient = () => {
  //функция создания главного модального окна
  const clientModal = createModalAddClient();
  // кнопка "Сохранить" - отправление данных клиента на сервер
  clientModal.$modalForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    //прекращение выполнения кода в случае непрохождения валидации
    if (!validateClient()) {
      return;
    }
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
      if (!validateContact(contactName[i], contactInput[i])) {
        return;
      }

      contacts.push({
        type: contactName[i].innerHTML,
        value: contactInput[i].value,
      });
    }

    //функция делающая первые буквы ФИО заглавными
    function capitalize(e) {
      return e.charAt(0).toUpperCase() + e.substr(1).toLowerCase();
    }
    // создание значений в объекте, которые приходят из инпутов
    //фамилия в объекте будет та, которую введет пользователь в инпут и т.д.
    clients.surname = capitalize(clientModal.$inputSurname.value.trim());
    clients.name = capitalize(clientModal.$inputName.value.trim());
    clients.lastName = capitalize(clientModal.$inputPatronymic.value.trim());

    clients.contacts = contacts;
    // clients.id = id;

    //если введены правильные данные в поля - происходит запрос на сервер
    if (validateClient()) {
      //data содержит объект с информациией о клиенте (возврат данных из функции)
      const data = await changeClient(clients, "POST");
      //обращение к обертке таблицы куда добавляется информация о клиенте,
      // которая пришла из функции changeClient(clients, "POST")
      const $iconsaveSpan = document.querySelector(".spiner-save");
      $iconsaveSpan.classList.remove("btn-none");
      setTimeout(() => {
        document.querySelector("tbody").append(createClientsTableSection(data));
        // после добавления нового клиента исчезает модальное окно "Новый клиент"
        clientModal.$modal.remove();
        $iconsaveSpan.classList.add("btn-none");
      }, 500);
    }
  });

  //логика закрытия главного модального окна
  clientModal.$btnClose.addEventListener("click", () => {
    clientModal.$modal.remove();
  });

  clientModal.$buttonDismiss.addEventListener("click", (e) => {
    e.preventDefault();
    clientModal.$modal.remove();
  });

  document.addEventListener("click", (e) => {
    if (e.target === clientModal.$modal) {
      clientModal.$modal.remove();
    }
  });
  return clientModal.$modal;
};
