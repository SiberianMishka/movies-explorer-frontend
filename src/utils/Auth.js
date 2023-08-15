import { BASE_URL } from './constants';

class Auth {
  constructor({ url }) {
    this._url = url;
  }

  _checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }

    return res.text().then((text) => {
      const data = JSON.parse(text);
      const errorText =
        data.message === 'Validation failed'
          ? data.validation.body.message
          : data.message;

      return Promise.reject({
        status: res.status,
        errorText,
      });
    });
  };

  // Метод для регистрации нового пользователя
  register = (name, email, password) => {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  };

  // Метод для авторизации пользователя
  authorize = (email, password) => {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => this._checkResponse(res));
  };

  // Метод для проверки токена
  checkToken = (token) => {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._checkResponse(res));
  };
}

export const auth = new Auth({
  url: BASE_URL,
});
