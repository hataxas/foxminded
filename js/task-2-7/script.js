const regions = document.querySelector("#regions");
const search = document.querySelector("#search");
const wrapper = document.querySelector(".wrapper");
const mode = document.querySelector(".mode");
const countryService = new RestCountriesService();

mode.addEventListener('click', () => {
  wrapper.classList.toggle("dark");
  if (wrapper.classList.contains("dark")) {
    mode.innerHTML = "&#9788; Light Mode"
  } else {
    mode.innerHTML = "&#9790; Dark Mode"
  }
});

search.addEventListener('change', () => {
  if (search.value.trim()) {
    countryService.getCountryByName(search.value)
    .then((arr) => {
      renderCountryList(arr);
    })
    .catch((err) => {
      alert(`Could not find the country '${search.value}'`, err);
    });
  } else {
    loadAllCountries();
  }
});

regions.addEventListener('change', (event) => {
  if (event.target.value) {
    countryService.getCountriesByRegion(event.target.value)
    .then((arr) => {
      renderCountryList(arr);
    })
    .catch((err) => {
      alert(`Could not fetch data`, err);
    });
  } else {
    loadAllCountries();
  }
});

function loadAllCountries() {
  countryService.getAllCountries()
    .then((data) => {
      renderCountryList(data);
    })
    .catch((err) => {
      alert(`Could not fetch data`, err);
    });
}

function renderCountryList(arr) {
  const countryList = document.querySelector('.items');
  const fragment = document.createDocumentFragment();

  countryList.innerHTML = '';

  for (let i = 0; i < arr.length; i ++) {
    const item = document.createElement('div');
    const src = `${arr[i].flags.png}`;
    item.classList.add('item');

    item.innerHTML = `
      <div class="flag"><img src=${src}></div>
      <div class="info">
        <h2 class="country-name">${arr[i].name.common}</h2>
        <ul>
          <li><b>Population: </b><span class="population">${arr[i].population}</span></li>
          <li><b>Region: </b><span class="region">${arr[i].region}</span></li>
          <li><b>Capital: </b><span class="capital">${arr[i].capital}</span></li>
        </ul>
      </div>
    `
    fragment.appendChild(item);
  }

  countryList.appendChild(fragment);
}

window.onload = loadAllCountries;
