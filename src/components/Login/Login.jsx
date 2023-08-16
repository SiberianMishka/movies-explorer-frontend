import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import Logo from '../../images/logo.svg';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { validateEmail } from '../../utils/validation';

const Login = ({ onLogin, isLoggedIn, serverError, isSubmitting }) => {
  const navigate = useNavigate();
  const { values, handleChange, errors, isValid } = useFormAndValidation();

  // При успешной авторизации редирект на /movies
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/movies');
    }
  }, [isLoggedIn, navigate]);

  return (
    <section className="login">
      <Link className="login__route" to="/">
        <img className="login__logo" src={Logo} alt="Логотип сайта" />
      </Link>
      <h1 className="login__title">Рады видеть!</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onLogin(values);
        }}
        className="login-form"
      >
        <div className="login-form__input-field">
          <label className="login-form__label" htmlFor="user-email-input">
            E-mail
          </label>
          <input
            className="login-form__input"
            placeholder="Введите почту"
            name="email"
            value={values.email || ''}
            id="user-email-input"
            autoComplete="off"
            type="email"
            minLength="2"
            maxLength="30"
            required
            onChange={handleChange}
            disabled={isSubmitting}
          />
          <span className="login-form__input-error">
            {validateEmail(values.email).message}
          </span>
        </div>
        <div className="login-form__input-field">
          <label className="login-form__label" htmlFor="user-password-input">
            Пароль
          </label>
          <input
            className="login-form__input"
            placeholder="Введите пароль"
            name="password"
            value={values.password || ''}
            id="user-password-input"
            autoComplete="off"
            type="password"
            minLength="2"
            required
            onChange={handleChange}
            disabled={isSubmitting}
          />
          <span className="login-form__input-error">{errors.password}</span>
          <span className="login-form__api-error">
            {serverError.login.message === 'Failed to fetch'
              ? 'При авторизации произошла ошибка.'
              : serverError.login.errorText}
          </span>
        </div>
        <button
          type="submit"
          className="login-form__button"
          disabled={
            !isValid ||
            validateEmail(values.email).inactiveButton ||
            isSubmitting
          }
        >
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
