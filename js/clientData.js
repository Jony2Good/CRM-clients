export const getClient = async () => {
  try {
    const response = await fetch("https://afternoon-basin-66284.herokuapp.com/api/clients", {
      method: "GET",
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

//отправка на сервер и изменение данных
export const changeClient = async (client, method, id = null) => {
  try {
    /*если в функцию аргументом приходит метод POST, то на сервер 
    в теле запроса отправляются введенные данные клиента;
    если приходит запрос с методом PATCH (изменить клиента), то к URL добаляется ID
    выбранного для изменения клиента*/
    const response = await fetch(
      `https://afternoon-basin-66284.herokuapp.com/api/clients/${method == "POST" ? "" : id}`,
      { headers: {
        'Content-Type': 'application/json'
    },
        method,
        body: JSON.stringify(client),
      }
    );
   
    //функция не только отправляет данные на сервер, но и возвращает ответ с сервера
    //ввиде объекта с веденными в инпуты данными клиента (ФИО, контакты и т.д.)
    let result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

// удадение клиента с сервера по id
export const deleteClientFromTable = async (id) => {
  try {
    await fetch(`https://afternoon-basin-66284.herokuapp.com/api/clients/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
  }
};

export const findClient = async (item) => {
  try {
    const response = await fetch(
      `https://afternoon-basin-66284.herokuapp.com/api/clients?search=${item}`,
      {
        method: "GET",
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
