export const validateContact = (type, name) => {
  const errorSymbol = document.getElementById("symbol"),
    validPhone = /[^0-9]+$/g,
    validEmail = /[^a-zA-Z|@|.]+$/g;

  const validInput = (e) => {
    e.addEventListener("input", () => {
      e.style.borderColor = "var(--grey)";
      errorSymbol.textContent = "";
    });
    e.oncut =
      e.oncopy =
      e.onpaste =
        () => {
          e.style.borderColor = "var(--grey)";
          errorSymbol.textContent = "";
        };
  };
  const createErrorTxt = (msg, txt, input) => {
    txt.textContent = msg;
    input.style.borderColor = "var(--color-orange)";
  };

  validInput(name);
  if (!name.value) {
    createErrorTxt("Заполните поле", errorSymbol, name);
    return false;
  }
  switch (type.innerHTML) {
    case "Телефон":
      if (validPhone.test(name.value)) {
        createErrorTxt("Недопустимые символы!", errorSymbol, name);
        return false;
      } else if (name.value.length !== 11) {
        createErrorTxt(
          "Номер телефона должен состоять из 11 цифр!",
          errorSymbol,
          name
        );
        return false;
      }
      return true;
    case "Email":
      if (validEmail.test(name.value)) {
        createErrorTxt("Некорректные символы!", errorSymbol, name);
        return false;
      }
      return true;
    default:
      return true;
  }
};
