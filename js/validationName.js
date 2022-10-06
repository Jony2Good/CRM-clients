export const validateClient = () => {
  const inputSurname = document.getElementById("surname"),
    inputName = document.getElementById("firstName"),
    inputLastname = document.getElementById("lastname"),
    errorSurname = document.getElementById("surnameError"),
    errorName = document.getElementById("nameError"),
    errorLastname = document.getElementById("lastnameError"),
    errorValue = document.getElementById("valueError"),
    errorContact = document.getElementById("contactError"),
    errorSymbol = document.getElementById("symbol"),
    validArr = [
      errorSurname,
      errorName,
      errorLastname,
      errorValue,
      errorContact,
      errorSymbol,
    ],
    regexp = /[^а-яА-ЯёЁ]+$/g;

  const inputValue = (e) => {
    e.addEventListener("input", () => {
      e.style.borderColor = "var(--grey)";
      for (const items of validArr) {
        items.textContent = "";
      }
    });
    e.oncut =
      e.oncopy =
      e.onpaste =
        () => {
          e.style.borderColor = "var(--grey)";
          for (const items of validArr) {
            items.textContent = "";
          }
        };

    e.onchange = () => {
      e.style.borderColor = "var(--grey)";

      if (inputSurname.value && inputName.value && inputLastname.value) {
        for (const items of validArr) {
          items.textContent = "";
        }
      }
    };
  };
  inputValue(inputSurname);
  inputValue(inputName);
  inputValue(inputLastname);

  const validName = (input, message, txt) => {
    if (!input.value) {
      input.style.borderColor = "var(--color-orange)";
      message.textContent = `Введите ${txt} клиента!`;
      return false;
    } else {
      message.textContent = "";
    }

    return true;
  };

  const validSymbols = (input, regexp) => {
    if (regexp.test(input.value)) {
      input.style.borderColor = "var(--color-orange)";
      errorSymbol.textContent = "Недопустимые символы!";
      return false;
    }

    return true;
  };

  if (!validName(inputSurname, errorSurname, "фамилию")) {
    return false;
  }
  if (!validSymbols(inputSurname, regexp)) {
    return false;
  }
  if (!validName(inputName, errorName, "имя")) {
    return false;
  }
  if (!validSymbols(inputName, regexp)) {
    return false;
  }
  if (!validName(inputLastname, errorLastname, "отчество")) {
    return false;
  }
  if (!validSymbols(inputLastname, regexp)) {
    return false;
  }

  return true;
};
