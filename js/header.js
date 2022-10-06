//создание шапки приложения
export const createHeader = () => {
  // создание элементов для секции header
  const $section = document.createElement("section"),
    $container = document.createElement("div"),
    $row = document.createElement("div"),
    $col = document.createElement("div"),
    $link = document.createElement("a"),
    $img = document.createElement("img"),
    $inputWrap = document.createElement("div"),
    $inputBody = document.createElement("div"),
    $input = document.createElement("input"),
    //контейнер списка при поиске по таблице
    $wrapper = document.createElement("div"),
    $list = document.createElement("div");

  // добавление элементам классов
  $section.classList.add(
    "header",
    "container-1024",
    "mb-2",
    "bg-white",
    "mt-3"
  );
  $container.classList.add("container-fluid", "py-2", "shadow");
  $row.classList.add("row");
  $col.classList.add("col-1");
  $link.classList.add("navbar-brand");
  $link.href = "#";
  $img.src = "img/logo.svg";
  $img.alt = "Логотип компании Skillbus";
  $inputWrap.classList.add("col-7", "py-2");
  $inputBody.classList.add("input-group");
  $input.classList.add("form-control", "search-input");
  $input.type = "text";
  $input.placeholder = "Введите запрос";
  $input.ariaLabel = "Поиск";

  $wrapper.classList.add("list-group", "search-list");
  $list.classList.add("list-group", "header-list", "btn-none")
  $link.append($img);
  $col.append($link);
  $row.append($col);

  $wrapper.append($list)
  $inputBody.append($input);
  $inputWrap.append($inputBody, $wrapper);
  $row.append($inputWrap);

  $container.append($row);
  $section.append($container);

  return {
    $section,
    $input,
  };
};
