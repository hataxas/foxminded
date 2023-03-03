const cross = document.querySelector('.button');
const inputCity = document.querySelector('#city');
let city = 'Malmo';

inputCity.addEventListener('change', () => {
  city = inputCity.value;
  loadData();
});

cross.addEventListener('click', () => {
  inputCity.value = '';
});

function loadData() {
  const weathermap = new WeathermapService();

  weathermap.getWeatherForCurrentCity(city)
    .then((w) => {
      const src = `http://openweathermap.org/img/wn/${w.weather[0].icon}@2x.png`

      document.querySelector('.selected-city').innerHTML = [w.name, w.sys.country].join(', ');
      document.querySelector('.temp').innerHTML = `${Math.floor(w.main.temp)}&#8451;`;
      document.querySelector('.feels-like').innerHTML = `${Math.floor(w.main.feels_like)}&#8451;`;
      document.querySelector('.description').innerHTML = w.weather[0].main;
      document.querySelector('.icon').innerHTML = `<img src=${src} width="80px">`;
      document.querySelector('.place').innerHTML = [w.name, w.sys.country].join(', ');
    })
    .catch((err) => {
      alert(`Could not find the city '${city}'`, err);
    });

  weathermap.getForecastForFiveDays(city).then((w) => {
    const fewDaysForecast = document.querySelector('.few-days-forecast');
    const fragment = document.createDocumentFragment();
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    fewDaysForecast.innerHTML = '';

    for (let i = 7; i < w.list.length; i += 8) {
      const date = new Date(w.list[i].dt * 1000);
      const dayIndex = date.getDay();
      const src = `http://openweathermap.org/img/wn/${w.list[i].weather[0].icon}@2x.png`
      const item = document.createElement('div');

      item.classList.add('item');

      item.innerHTML = `
        <div class="day">${daysOfWeek[dayIndex]}</div>
        <div><img class="image" src=${src}></div>
        <div class="text">${w.list[i].weather[0].description}</div>
        <div class="columns">
          <div class="temp-limit">${Math.floor(w.list[i].main.temp_max)}&#8451;</div>
          <div class="temp-limit">${Math.floor(w.list[i].main.temp_min)}&#8451;</div>
        </div>
      `;

      fragment.appendChild(item);
    }

    fewDaysForecast.appendChild(fragment);
  });
}

window.onload = loadData;
