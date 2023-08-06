import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import Logo from '../../images/logo.svg';

const Register = () => {
  return (
    <section className="register">
      <Link className="register__route" to="/">
        <img className="register__logo" src={Logo} alt="Логотип сайта" />
      </Link>
      <h1 className="register__title">Добро пожаловать!</h1>
      <form className="register-form">
        <div className="register-form__input-field">
          <label className="register-form__label">Имя</label>
          <input
            className="register-form__input"
            placeholder="Введите имя"
            defaultValue="Виталий"
          />
          <span className="register-form__input-error register-form__input-error_active"></span>
        </div>
        <div className="register-form__input-field">
          <label className="register-form__label">E-mail</label>
          <input
            className="register-form__input"
            placeholder="Введите почту"
            defaultValue="pochta@yandex.ru"
          />
          <span className="register-form__input-error register-form__input-error_active"></span>
        </div>
        <div className="register-form__input-field">
          <label className="register-form__label">Пароль</label>
          <input
            className="register-form__input"
            placeholder="Введите пароль"
            defaultValue="••••••••••••••"
          />
          <span className="register-form__input-error register-form__input-error_active"></span>
          <span className="register-form__api-error">
            Что-то пошло не так...
          </span>
        </div>
        <button type="submit" className="register-form__button">
          Зарегистрироваться
        </button>
        <div className="register__text">
          <span>Уже зарегистрированы? </span>
          <Link to="/signin" className="register__link">
            Войти
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Register;
