class WeathermapService {
  _apiBase = 'http://api.openweathermap.org';
  _apiKey = '496295e49f0a5f6dca2a88aa4281ced3';

  async getResourse(path, city) {
    const query = [
      `q=${city}`,
      `appid=${this._apiKey}`,
      `units=metric`
    ].join('&');
    const res = await fetch(`${this._apiBase}${path}?${query}`);
    if(!res.ok) {
      throw new Error(`Could not fetch ${path} , received ${res.status}`);
    }
    return await res.json();
  }

  async getWeatherForCurrentCity(city) {
    const data = await this.getResourse(`/data/2.5/weather`, city);
    return data;
  }

  async getForecastForFiveDays(city) {
    const data = await this.getResourse(`/data/2.5/forecast`, city);
    return data;
  }
}
