import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import Logo from '../../images/logo.svg';
import { useEffect } from 'react';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { validateEmail, validateName } from '../../utils/validation';

const Register = ({ onRegister, isLoggedIn, serverError }) => {
  const navigate = useNavigate();
  const { values, handleChange, errors, isValid } = useFormAndValidation();

  // При успешной авторизации редирект на /movies
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/movies');
    }
  }, [isLoggedIn, navigate]);

  return (
    <section className="register">
      <Link className="register__route" to="/">
        <img className="register__logo" src={Logo} alt="Логотип сайта" />
      </Link>
      <h1 className="register__title">Добро пожаловать!</h1>
      <form
        className="register-form"
        onSubmit={(e) => {
          e.preventDefault();
          onRegister(values);
        }}
      >
        <div className="register-form__input-field">
          <label className="register-form__label" htmlFor="user-name-input">
            Имя
          </label>
          <input
            className="register-form__input"
            placeholder="Введите имя"
            name="name"
            value={values.name || ''}
            id="user-name-input"
            type="text"
            minLength="2"
            maxLength="30"
            required
            onChange={handleChange}
          />
          <span className="register-form__input-error">
            {validateName(values.name).message}
          </span>
        </div>
        <div className="register-form__input-field">
          <label className="register-form__label" htmlFor="user-email-input">
            E-mail
          </label>
          <input
            className="register-form__input"
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
          />
          <span className="register-form__input-error">
            {validateEmail(values.email).message}
          </span>
        </div>
        <div className="register-form__input-field">
          <label className="register-form__label" htmlFor="user-password-input">
            Пароль
          </label>
          <input
            className="register-form__input"
            placeholder="Введите пароль"
            name="password"
            value={values.password || ''}
            id="user-password-input"
            autoComplete="off"
            type="password"
            minLength="2"
            required
            onChange={handleChange}
          />
          <span className="register-form__input-error"> {errors.password}</span>
          <span className="register-form__api-error">
            {serverError.register.message === 'Failed to fetch'
              ? 'При регистрации пользователя произошла ошибка.'
              : serverError.register.errorText}
          </span>
        </div>
        <button
          type="submit"
          className="register-form__button"
          disabled={
            !isValid ||
            validateEmail(values.email).inactiveButton ||
            validateName(values.name).inactiveButton
          }
        >
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
