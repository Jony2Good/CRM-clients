import { createContact } from "./addContacts.js";

//создание элементов главного модального окна
export const createModalAddClient = () => {
  const $modal = document.createElement("div"),
    $modalDialog = document.createElement("div"),
    $modalContent = document.createElement("div"),
    $modalHeader = document.createElement("div"),
    $modalTitle = document.createElement("h5"),
    $btnClose = document.createElement("button"),
    $modalBody = document.createElement("div"),
    $modalForm = document.createElement("form"),
    $inputGroupSurname = document.createElement("div"),
    $labelSurname = document.createElement("label"),
    $inputSurname = document.createElement("input"),
    $inputGroupName = document.createElement("div"),
    $labelName = document.createElement("label"),
    $inputName = document.createElement("input"),
    $inputGroupPatronymic = document.createElement("div"),
    $labelPatronymic = document.createElement("label"),
    $requireSurname = document.createElement("span"),
    $requireName = document.createElement("span"),
    $inputPatronymic = document.createElement("input"),
    $buttonWrap = document.createElement("div"),
    $buttonAddClient = document.createElement("button"),
    $modalFooter = document.createElement("div"),
    $buttonSave = document.createElement("button"),
    $buttonDismiss = document.createElement("button"),
    $buttonSpan = document.createElement("span");

  //создание блока для вывода текста ошибки
  const $errorTxt = document.createElement("p"),
    $wrongSimbols = document.createElement("span"),
    $surnameError = document.createElement("span"),
    $nameError = document.createElement("span"),
    $lastnameError = document.createElement("span"),
    $valueError = document.createElement("span"),
    $contactError = document.createElement("span");

    //спинер
    const $spinnerForBtnSave = document.createElement("span"),
    classForSpinner = ["spinner-border", "spiner-icon", "btn-none", "ms-1"];
    $spinnerForBtnSave.classList.add(...classForSpinner, "spiner-save");
    $spinnerForBtnSave.setAttribute("role", "status");

  $modal.classList.add("modal", "modal-container", "modal-visible");
  $modalDialog.classList.add("modal-dialog");
  $modalContent.classList.add("modal-content", "modal-position");
  $modalHeader.classList.add("modal-header");
  $modalTitle.classList.add("modal-title", "mb-2");
  $modalTitle.textContent = "Новый клиент";
  $btnClose.classList.add("btn-close");
  $btnClose.setAttribute("type", "button");
  $btnClose.setAttribute("aria-label", "close button");

  const classForDiv = ["input-group", "mb-3", "modal-inner"],
    classForInput = ["form-control", "modal-input"];

  $modalBody.classList.add("modal-body", "modal-body-layout");
  $modalForm.classList.add("modal-form");

  $inputGroupSurname.classList.add(...classForDiv);
  $inputGroupName.classList.add(...classForDiv);
  $inputGroupPatronymic.classList.add(...classForDiv);

  $labelSurname.classList.add("modal-label");
  $labelName.classList.add("modal-label");
  $labelPatronymic.classList.add("modal-label");
  $labelSurname.setAttribute("for", "Surname");
  $labelName.setAttribute("for", "Name");
  $labelPatronymic.setAttribute("for", "Patronymic");

  $labelSurname.textContent = "Фамилия";
  $labelName.textContent = "Имя";
  $labelPatronymic.textContent = "Отчество";

  $requireName.textContent = "*";
  $requireSurname.textContent = "*";

  $inputSurname.classList.add(...classForInput);
  $inputSurname.setAttribute("aria-label", "Last name");
  $inputSurname.setAttribute("type", "text");
  $inputSurname.placeholder = "Фамилия";
  $inputSurname.id = "surname";

  $inputName.classList.add(...classForInput);
  $inputName.setAttribute("aria-label", "First name");
  $inputName.setAttribute("type", "text");
  $inputName.placeholder = "Имя";
  $inputName.id = "firstName";

  $inputPatronymic.classList.add(...classForInput);
  $inputPatronymic.setAttribute("aria-label", "Patronymic");
  $inputPatronymic.setAttribute("type", "text");
  $inputPatronymic.placeholder = "Отчество";
  $inputPatronymic.id = "lastname";

  $buttonWrap.classList.add("container-fluid", "modal-wrap", "text-center");
  $buttonAddClient.classList.add("btn", "btn-text", "modal-btn", "btn-active");
  $buttonAddClient.setAttribute("type", "button");
  $buttonAddClient.textContent = "Добавить контакт";

  $modalFooter.classList.add(
    "modal-footer",
    "d-flex",
    "flex-column",
    "modal-footer-layout"
  );
  $buttonSave.classList.add("btn", "modal-footer-save");
  $buttonSave.textContent = "Сохранить";
  $buttonAddClient.setAttribute("type", "submit");

  $buttonDismiss.classList.add("btn", "modal-footer-dismiss");
  $buttonSpan.classList.add("modal-underline");
  $buttonSpan.textContent = "Отмена";

  //добавление классов и ID для элементов вывода
  $errorTxt.classList.add("form-error");
  $wrongSimbols.id = "symbol";
  $surnameError.id = "surnameError";
  $nameError.id = "nameError";
  $lastnameError.id = "lastnameError";
  $valueError.id = "valueError";
  $contactError.id = "contactError";

  $buttonSave.append($spinnerForBtnSave)
  $buttonDismiss.append($buttonSpan);
  $modalFooter.append($buttonSave, $buttonDismiss);
  $buttonWrap.append($buttonAddClient);
  $labelSurname.append($requireSurname);
  $labelName.append($requireName);
  $errorTxt.append(
    $wrongSimbols,
    $surnameError,
    $nameError,
    $lastnameError,
    $valueError,
    $contactError
  );
  $modalForm.append(
    $inputGroupSurname,
    $inputGroupName,
    $inputGroupPatronymic,
    $buttonWrap,
    $errorTxt,
    $modalFooter
  );
  $modalBody.append($modalForm);
  $inputGroupSurname.append($inputSurname, $labelSurname);
  $inputGroupName.append($inputName, $labelName);
  $inputGroupPatronymic.append($inputPatronymic, $labelPatronymic);

  $modalHeader.append($modalTitle, $btnClose);
  $modalContent.append($modalHeader, $modalBody);
  $modalDialog.append($modalContent);
  $modal.append($modalDialog);

  //условие при котором нельза создать более 10 контактов
  $buttonAddClient.addEventListener("click", (e) => {
    e.preventDefault();
    const contactItems = document.getElementsByClassName("contact");
    if (contactItems.length < 9) {
      const contactItem = createContact();
      $buttonWrap.prepend(contactItem.$contactContainer);
    } else {
      const contactItem = createContact();
      $buttonWrap.prepend(contactItem.$contactContainer);
      $buttonAddClient.classList.add("btn-none");
      $buttonWrap.style.paddingBottom = 25 + "px";
    }
  });

  return {
    $modal,
    $modalForm,
    $btnClose,
    $buttonSpan,
    $modalTitle,
    $buttonDismiss,
    $modalDialog,
    $inputSurname,
    $inputName,
    $inputPatronymic,
    $buttonWrap,
    $buttonAddClient,
    $labelSurname,
  };
};
