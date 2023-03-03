const buttons = document.querySelectorAll('button');

function filterMenu(e) {
  clearMenu();
  buttons.forEach((button) => button.classList.remove('active'));

  let buttonId = e.currentTarget.id;
  let menuCategory = [];

  e.currentTarget.classList.add('active');

  if(buttonId === 'all') {
    menuCategory = menuList;
  } else {
    menuCategory = menuList.filter(item => item.category === buttonId);
  }

  renderMenu(menuCategory);
}

buttons.forEach((button) => button.addEventListener('click', filterMenu));

window.addEventListener("load", renderMenu(menuList));

function renderMenu(menu) {
  const menuItems = document.querySelector('.items');
  const fragment = document.createDocumentFragment();

  menu.forEach((menuItem) => {
    const item = document.createElement('div');
    item.classList.add('item');

    item.innerHTML = `
      <div class="image" style="background-image: url(${menuItem.image});"></div>
      <div class="content">
        <div class="title">
          <div class="name">${menuItem.name}</div>
          <div class="cost">$${menuItem.cost}</div>
        </div>
        <div class="description">${menuItem.description}</div>
      </div>
    `;

    fragment.appendChild(item);
  });

  menuItems.appendChild(fragment);
}

function clearMenu() {
  const menuItems = document.querySelector('.items');
  menuItems.innerHTML = '';
}
