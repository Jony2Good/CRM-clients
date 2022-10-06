//создание блока добавить клиента
export const createContact = () => {
  const $contactContainer = document.createElement("div"),
    $contactBody = document.createElement("div"),
    $contactBtnMenu = document.createElement("button"),
    $contactList = document.createElement("ul"),
    $contactPhone = document.createElement("li"),
    $contactEmail = document.createElement("li"),
    $contactVk = document.createElement("li"),
    $contactFb = document.createElement("li"),
    $contactUser = document.createElement("li"),
    $contactInput = document.createElement("input"),
    $contactBtnDelete = document.createElement("button"),
    $contactDeleteTooltip = document.createElement("span");

  $contactContainer.classList.add("contact");
  $contactDeleteTooltip.classList.add("contact-tooltip", "site-tooltip");
  $contactBody.classList.add("contact__type");
  $contactBtnMenu.classList.add("contact__name");
  $contactList.classList.add("contact__list", "list-reset");
  $contactPhone.classList.add("contact__item");
  $contactVk.classList.add("contact__item");
  $contactFb.classList.add("contact__item");
  $contactEmail.classList.add("contact__item");
  $contactUser.classList.add("contact__item");
  $contactInput.classList.add("contact__input");
  $contactBtnDelete.classList.add("contact__delete", "unvisible");

  $contactBtnMenu.textContent = "Телефон";
  $contactDeleteTooltip.textContent = "Удалить контакт";
  $contactPhone.textContent = "Телефон";
  $contactVk.textContent = "VK";
  $contactEmail.textContent = "Email";
  $contactFb.textContent = "Facebook";
  $contactUser.textContent = "Другое";
  $contactInput.placeholder = "Введите данные контакта";
  $contactInput.type = "text";

  $contactBtnDelete.append($contactDeleteTooltip);
  $contactContainer.append($contactBody, $contactInput, $contactBtnDelete);
  $contactBody.append($contactBtnMenu, $contactList);
  $contactList.append(
    $contactPhone,
    $contactEmail,
    $contactVk,
    $contactFb,
    $contactUser
  );

  //кнопка удаления контакта
  $contactBtnDelete.addEventListener("click", (e) => {
    e.preventDefault();
    $contactContainer.remove();
    document.querySelector(".modal-btn").classList.remove("btn-none");
    document.querySelector(".modal-wrap").style.paddingBottom = 0;
  });

  //если в поле ввода введены данные появлятся кнопка "удалить контакт"
  $contactInput.addEventListener("input", () => {
    if ($contactInput.value) {
      $contactBtnDelete.classList.remove("unvisible");
    } else {
      $contactBtnDelete.classList.add("unvisible");
    }
  });

  //кнопка со списком----------------------------------
  $contactBtnMenu.addEventListener("click", (e) => {
    e.preventDefault();
    $contactList.classList.toggle("contact__list--active");
    $contactBtnMenu.classList.toggle("contact__list--active");
  });
  $contactBody.addEventListener("mouseleave", () => {
    $contactList.classList.remove("contact__list--active");
    $contactBtnMenu.classList.remove("contact__list--active");
  });

  // элемент в выпадающем списке при клике попадает в название кнопки
  const setNameButton = (item) => {
    item.addEventListener("click", () => {
      $contactBtnMenu.textContent = item.textContent;
      $contactList.classList.remove("contact__list--active");
      $contactBtnMenu.classList.remove("contact__list--active");
    });
  };

  const itemArr = [
    $contactPhone,
    $contactVk,
    $contactEmail,
    $contactFb,
    $contactUser,
  ];

  //проходясь по каждому элементу массива вызывается функция setNameButton
  //при клике на элемент списка он попадает в кнопку $contactBtnMenu
  for (const item of itemArr) {
    setNameButton(item);
  }

  return {
    $contactContainer,
    $contactBody,
    $contactBtnMenu,
    $contactInput,
    $contactBtnDelete,
  };
};
