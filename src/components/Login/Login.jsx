import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import Logo from '../../images/logo.svg';

const Login = () => {
  return (
    <section className="login">
      <Link className="login__route" to="/">
        <img className="login__logo" src={Logo} alt="Логотип сайта" />
      </Link>
      <h1 className="login__title">Рады видеть!</h1>
      <form className="login-form">
        <div className="login-form__input-field">
          <label className="login-form__label">E-mail</label>
          <input
            className="login-form__input"
            placeholder="Введите почту"
            defaultValue="pochta@yandex.ru"
          />
          <span className="login-form__input-error login-form__input-error_active"></span>
        </div>
        <div className="login-form__input-field">
          <label className="login-form__label">Пароль</label>
          <input className="login-form__input" placeholder="Введите пароль" />
          <span className="login-form__input-error login-form__input-error_active"></span>
        </div>
        <button type="submit" className="login-form__button">
          Войти
        </button>
        <div className="login__text">
          <span>Ещё не&nbsp;зарегистрированы? </span>
          <Link to="/signup" className="login__link">
            Регистрация
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Login;
