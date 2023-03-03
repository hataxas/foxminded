const newItem = document.querySelector('#add-input');
const addNewItemButton = document.querySelector('#add-button');
const clearItemsButton = document.querySelector('#clear-items');
const items = document.querySelector('.items');

let groceryList = [];

function init() {
  initForm();
  renderGroceryList();
  initClearButton();
}

function initForm() {
  addNewItemButton.addEventListener('click', () => {

    if (newItem.value.trim()) {
      groceryList.push(newItem.value);
      const groseryIndex = groceryList.length - 1;
      renderItem(newItem.value, groseryIndex);
      initDeleteButton(groceryList, groseryIndex);
      initEditButton(groceryList, groseryIndex);
      setCookie('groceryList', groceryList, 10);
    }

    newItem.value = '';
  });

  // add a new item when the enter key is pressed
  newItem.addEventListener('keydown', (e) => {
    if (e.keyCode == 13) {
      addNewItemButton.click();
    }
  });
}

function initClearButton() {
  clearItemsButton.addEventListener('click', () => {
    groceryList = [];
    items.innerHTML = '';
    deleteAllCookies();
  });
}

function renderGroceryList() {
  const json_str = getCookie('groceryList');

  if (json_str) {
    groceryList = JSON.parse(json_str);

    for (let i = 0; i < groceryList.length; i++) {
      renderItem(groceryList[i], i);
      initDeleteButton(groceryList, i);
      initEditButton(groceryList, i)
    }
  }
}

function renderItem(groseryName, groseryIndex) {
  const item = document.createElement('li');
  item.classList.add('item');

  const input = document.createElement('input');
  input.classList.add('name');
  input.id = `name-${groseryIndex}`;
  input.type = 'text';
  input.setAttribute("value", groseryName);

  item.appendChild(input);

  item.innerHTML += `
    <div class="buttons">
      <button class="edit" id="edit-${groseryIndex}"><img src="icons/pen.svg"></button>
      <button class="delete" id="delete-${groseryIndex}"><img src="icons/trash.svg"></button>
    </div>
  `;

  items.appendChild(item);
}

function initDeleteButton(groceryList, groseryIndex) {
  const deleteButton = document.querySelector(`#delete-${groseryIndex}`);

  deleteButton.addEventListener('click', () => {
    groceryList.splice(groseryIndex, 1);
    deleteButton.closest('li').remove();
    setCookie('groceryList', groceryList, 10);
  });
}

function initEditButton(groceryList, groseryIndex) {
  const editButton = document.querySelector(`#edit-${groseryIndex}`);
  const editInput = document.querySelector(`#name-${groseryIndex}`);

  editButton.addEventListener('click', () => {
    if (editInput.value.trim()) {
      groceryList.splice(groseryIndex, 1, editInput.value);
      setCookie('groceryList', groceryList, 10);
    }
  });
}

function setCookie(cookieName, cookieValue, expiresInDays) {
  const jsonString = JSON.stringify(cookieValue);
  const date = new Date();
  date.setTime(date.getTime() + (expiresInDays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + date.toUTCString();
  document.cookie = cookieName + "=" + jsonString + ";" + expires + ";path=/;SameSite=Lax";
}

function deleteAllCookies() {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const equalSignPosition = cookie.indexOf("=");
    const name = equalSignPosition > -1 ? cookie.substr(0, equalSignPosition) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax";
  }
}

function getCookie(cookieName) {
  const name = cookieName + "=";
  let cookiesArray = document.cookie.split(';');
  for(let i = 0; i < cookiesArray.length; i++) {
    let cookie = cookiesArray[i];
    while (cookie.charAt(0) == ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) == 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return "";
}

window.onload = init;
