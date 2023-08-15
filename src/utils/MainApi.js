import { MOVIES_URL } from './constants';

export default class MainApi {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return res.text().then((text) => {
      const { message, validation } = JSON.parse(text);
      const errorText =
        message === 'Validation failed' ? validation.body.message : message;

      return Promise.reject({
        status: res.status,
        errorText,
      });
    });
  }

  // Метод для получения данных пользователя
  getUserInfo() {
    return fetch(`${this._url}/users/me`, { headers: this._headers }).then(
      (res) => this._checkResponse(res)
    );
  }

  // Метод для редактирования данных пользователя
  updateUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  // Метод для получения сохраненных фильмов
  getSavedMovies() {
    return fetch(`${this._url}/movies`, { headers: this._headers }).then(
      (res) => this._checkResponse(res)
    );
  }

  // Метод для сохранения фильма
  saveMovie(movie) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `${MOVIES_URL}${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `${MOVIES_URL}${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  // Метод для удаления фильма
  deleteMovie(id) {
    return fetch(`${this._url}/movies/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }
}
