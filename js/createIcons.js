import { createTooltip } from "./tooltip.js";

//формируем год
export const getDateClientCreate = (data) => {
  const date = new Date(data),
    clientDate = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    },
    correctDateFormat = date.toLocaleDateString("ru", clientDate);

  return correctDateFormat;
}
//формируем время
export const getTimeClientCreate = (data) => {
  const date = new Date(data),
    clientTime = {
      hour: "numeric",
      minute: "numeric",
    },
    correctTimeFormat = date.toLocaleTimeString("ru", clientTime);

  return correctTimeFormat;
}

const createSocialLinks = (type, value, element, item) => {
  const getTooltip = createTooltip(type, value),
  link = document.createElement("li");
  element = document.createElement("a");
  const imgSpan = document.createElement("span");
  imgSpan.classList.add("item-img");

  link.classList.add("list-reset");

  if(type) {
    getTooltip.elementType.style.color = 'var(--color-white)'
    getTooltip.elementLink.style.textDecoration = 'none';
  }
  if (type === "Email") {
    element.href = `mailto:${value.trim()}`;
    imgSpan.classList.add("mail-img");
    element.setAttribute("aria-label", "Электронная почта клиента");
    
  }
  else if (type === "VK") {
    element.href = value.trim();
    imgSpan.classList.add("vk-img");
    element.setAttribute("aria-label", "страница клиента Bконтакте");
  }
  else if (type === "Телефон") {
    element.href = `tel:${value.trim()}`;
    imgSpan.classList.add("phone-img");
    element.setAttribute("aria-label", "Телефон клиента");
  }
  else if (type === "Доп.телефон") {
    element.href = `tel:${value.trim()}`;
    imgSpan.classList.add("phone-img");
    element.setAttribute("aria-label", "Телефон клиента");
  }
  else if (type === "Facebook") {
    element.href = value.trim();
    imgSpan.classList.add("fb-img");
    element.setAttribute("aria-label", "страница клиента в Facebook");
  }
  else if (type === "Другое") {
    element.href = value.trim();
    imgSpan.classList.add("other-img");
    element.setAttribute("aria-label", "Другие контакты клиента");
  } else {
    element.href = value.trim();
  }
  element.append(getTooltip.container,imgSpan);
  link.append(element)
  item.append(link);
}

export const createSocialItem = (type, value, item) => {
  switch (type) {
    case "Телефон":
      let phone;
      createSocialLinks(type, value, phone, item);
      break;
    case "Доп.телефон":
      let newPhone;
      createSocialLinks(type, value, newPhone, item);
      break;
    case "Email":
      let email;
      createSocialLinks(type, value, email, item);
      break;
    case "Facebook":
      let fb;
      createSocialLinks(type, value, fb, item);
      break;
    case "VK":
      let vk;
      createSocialLinks(type, value, vk, item);
      break;
    case "Другое":
      let other;
      createSocialLinks(type, value, other, item);
      break;
    default:
      break;
  }
}
