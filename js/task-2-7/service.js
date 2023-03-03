class RestCountriesService {
  _apiBase = 'https://restcountries.com/v3.1';

  sortCountriesByName(list) {
    return list.sort((a, b) => a.name.common.localeCompare(b.name.common, 'en'));
  }

  async getResourse(path) {
    const res = await fetch(`${this._apiBase}${path}`);
    if(!res.ok) {
      throw new Error(`Could not fetch ${path} , received ${res.status}`);
    }
    return await res.json();
  }

  async getAllCountries() {
    const data = await this.getResourse(`/all`);
    return this.sortCountriesByName(data);
  }

  async getCountriesByRegion(region) {
    const data = await this.getResourse(`/region/${region}`);
    return this.sortCountriesByName(data);
  }

  async getCountryByName(name) {
    return await this.getResourse(`/name/${name}`);
  }
}
