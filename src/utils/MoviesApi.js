import { MOVIES_URL } from './constants';

class MoviesApi {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  // Метод для получения списка фильмов
  getMovies() {
    return fetch(`${this._url}`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }
}

export const moviesApi = new MoviesApi({
  url: `${MOVIES_URL}/beatfilm-movies`,
  headers: {
    'Content-Type': 'application/json',
  },
});
