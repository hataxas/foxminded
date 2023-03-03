function initApplication() {
  const body = document.querySelector('body');
  const cart = document.querySelector('.cart');
  const cross = document.querySelector('.cross');
  const cartIcon = document.querySelector('.cart-icon');
  const cartData = getCartData();

  loadJSON();
  renderCart(cartData);

  cartIcon.addEventListener('click', () => {
    cart.classList.add('active');
    body.classList.add('overflow-hidden');
  });

  cross.addEventListener('click', () => {
    cart.classList.remove('active');
    body.classList.remove('overflow-hidden');
  });
}

function loadJSON() {
  fetch('http://localhost:4321/data/furniture.json')
    .then(response => {
      return response.json()
    })
    .then(data => {
      if(window.location.pathname == '/products.html') {
        renderProducts(data);
        initFilters(data);
      }

      if(window.location.pathname == '/index.html') {
        renderFeaturedProducts(data);
        initButtonAllProducts(data);
      }
    })
    .catch(err => {
      alert(err)
    });
}

function setCartData(cartData){
  localStorage.setItem('cart', JSON.stringify(cartData));
  return false;
}

function getCartData(){
  return JSON.parse(localStorage.getItem('cart'));
}

function renderProducts(products) {
  const items = document.querySelector('.items');
  items.innerHTML = '';

  products.forEach(element => {
    const item = document.createElement('div');
    item.classList.add('item');

    item.innerHTML += `
      <img src="${element.imgSrc}">
      <div class="name">${element.name}</div>
      <div class="cost">
        <div class="price">$${element.price}</div>
        <div class="item-cart" data-id="${element.id}"><img src="images/cart-black.svg"></div>
      </div>
    `;

    items.appendChild(item);
  });

  initItemsCartIcons(products);
}

function addProductToCart(product) {
  const cartData = getCartData() || {};
  if (cartData[product.id] === undefined) {
    cartData[product.id] = {
      imgSrc: product.imgSrc,
      name: product.name,
      count: 1,
      price: product.price,
    };
  } else {
    cartData[product.id].count++;
  }

  setCartData(cartData);
  renderCart(cartData);
}

function showCartTotalAmount(cartData) {
  const counter = document.querySelector('.counter');
  let amount = 0;

  for (let id in cartData) {
    amount += cartData[id].count;
  }
  counter.innerHTML = amount;
}

function showCartTotalPriсe(cartData) {
  const totalPrice = document.querySelector('.total');
  let sum = 0;

  for (let id in cartData) {
    sum += cartData[id].count * cartData[id].price;
  }
  totalPrice.innerHTML = `$${sum.toFixed(2)}`;
}

function initItemsCartIcons(products) {
  const itemCarts = document.querySelectorAll('.item-cart');

  for (let i = 0; i < itemCarts.length; i++) {
    itemCarts[i].addEventListener('click', () => {
      const productId = itemCarts[i].dataset.id;
      const product = products.find(element => element.id === productId);

      addProductToCart(product);
    });
  }
}

function initCartButtons() {
  const cartData = getCartData();
  const cartButtons = document.querySelectorAll('.cart-button');

  for (let i = 0; i < cartButtons.length; i++) {
    cartButtons[i].addEventListener("click", () => {
      const productId = cartButtons[i].dataset.id;

      if (cartButtons[i].classList.contains('plus')) {
        cartData[productId].count++;
      }

      if (cartButtons[i].classList.contains('minus')) {
        if(cartData[productId].count - 1 == 0) {
          delete cartData[productId];
        } else {
          cartData[productId].count--;
        }
      }

      if (cartButtons[i].classList.contains('remove')) {
        delete cartData[productId];
      }

      setCartData(cartData);
      renderCart(cartData);
    });
  }
}

function renderCart(cartData) {
  const productsInCart = document.querySelector('.products-list');
  productsInCart.innerHTML = '';

  for (let id in cartData) {
    const productElement = document.createElement('li');
    productElement.classList.add('product');

    productElement.innerHTML += `
      <div class="row">
        <img src="${cartData[id].imgSrc}">
        <div class="description">
          <div>
            <div class="name">${cartData[id].name}</div>
            <div class="price">$${cartData[id].price}</div>
          </div>
          <div class="remove cart-button" data-id="${id}">remove</div>
        </div>
      </div>
      <div class="controls">
        <div class="plus cart-button" data-id="${id}">&#43;</div>
        <div class="amount" data-id="${id}">${cartData[id].count}</div>
        <div class="minus cart-button" data-id="${id}">&#8722;</div>
      </div>
    `;

    productsInCart.appendChild(productElement);
  }
  showCartTotalAmount(cartData);
  showCartTotalPriсe(cartData);
  initCartButtons();
}

function initButtonAllProducts(products) {
  const buttonAllProducts = document.querySelector('.button-all');
  const title = document.querySelector('.title-featured');
  const items = document.querySelector('.items');

  buttonAllProducts.addEventListener('click', () => {
    buttonAllProducts.classList.toggle('button-featured');

    if(buttonAllProducts.classList.contains('button-featured')) {
      title.innerHTML = `<span class="slash"></span>All Products`;
      buttonAllProducts.textContent = "FEATURED";
      items.classList.remove('featured-items');
      renderProducts(products);
    } else {
      title.innerHTML = `<span class="slash"></span>Featured`;
      buttonAllProducts.textContent = "ALL PRODUCTS";
      items.classList.add('featured-items');
      renderFeaturedProducts(products);
    }
  });
}

function applyFilterProductsByCompany(products) {
  const checkboxAll = document.querySelector('#all');
  const checkboxesCompanyName = document.querySelectorAll('.company');
  let checkedCompanies = [];
  let result = [];

  if (checkboxAll.checked) {
    result = products;
  } else {
    for (let i = 0; i < checkboxesCompanyName.length; i++) {
      if (checkboxesCompanyName[i].checked) {
        checkedCompanies.push(checkboxesCompanyName[i].getAttribute('value'));
      }
    }

    result = products.filter((product) => {
      return checkedCompanies.includes(product.company.toLowerCase());
    });
  }

  return result;
}

function applyFilterProductsByPrice(products) {
  const result = products.filter((product) => {
    return Math.round(product.price) <= Math.round(price.value)
  });

  return result;
}

function applySearchProducts(products) {
  const result = products.filter((product) => {
    const productName = product.name.toLowerCase();

    return productName.includes(search.value.toLowerCase())
  });

  return result;
}

function onFilterChange(products) {
  const rangeValue = document.querySelector('#rangeValue');
  const checkboxAll = document.querySelector('#all');
  const price = document.querySelector('#price');
  const search = document.querySelector('#search');
  const maximumPrice = 2000;
  let filteredProducts = products;

  if (!checkboxAll.checked) {
    filteredProducts = applyFilterProductsByCompany(filteredProducts);
  }
  if (price.value !== maximumPrice) {
    filteredProducts = applyFilterProductsByPrice(filteredProducts);
  }
  if (search.value) {
    filteredProducts = applySearchProducts(filteredProducts);
  }

  rangeValue.innerHTML = '$' + price.value;

  renderProducts(filteredProducts);
}

function initFilters(products) {
  const checkboxesCompanyName = document.querySelectorAll('.company');
  const price = document.querySelector('#price');
  const search = document.querySelector('#search');

  search.addEventListener('keyup', () => onFilterChange(products));
  price.addEventListener('change', () => onFilterChange(products));
  for (let i = 0; i < checkboxesCompanyName.length; i++) {
    checkboxesCompanyName[i].addEventListener('change', () => onFilterChange(products));
  }
}

function renderFeaturedProducts(products) {
  const featuredProducts = [];
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * products.length);

    featuredProducts.push(products[randomIndex]);
  }
  renderProducts(featuredProducts);
}

window.onload = initApplication;
