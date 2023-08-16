import React from 'react';
import './Profile.css';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { useContext, useState, useEffect } from 'react';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { validateEmail, validateName } from '../../utils/validation';

const Profile = ({
  onSignOut,
  onUpdateUser,
  serverError,
  isProfileOk,
  isSubmitting,
}) => {
  const { values, handleChange, isValid, setValues, setIsValid } =
    useFormAndValidation();
  const { currentUser } = useContext(CurrentUserContext);
  const [showSaveButton, setshowSaveButton] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setValues(currentUser);
      setIsValid(true);
    }
  }, [currentUser, setIsValid, setValues]);

  const onSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(values);
  };

  // Скрываем кнопку сохранить, если isProfileOk
  useEffect(() => {
    if (isProfileOk) {
      setshowSaveButton(false);
      setShowSuccessMsg(true);
    }
  }, [isProfileOk, serverError]);

  return (
    <section className="profile">
      <h1 className="profile__header">Привет, {currentUser.name}!</h1>
      <form className="profile-form" onSubmit={onSubmit}>
        <div className="profile-form__input-field">
          <label className="profile-form__label" htmlFor="user-name-input">
            Имя
          </label>
          <input
            className="profile-form__input"
            placeholder="Введите имя"
            name="name"
            value={values.name || ''}
            id="user-name-input"
            autoComplete="off"
            type="text"
            minLength="2"
            maxLength="30"
            required
            onChange={handleChange}
            disabled={!showSaveButton || isSubmitting}
          />
          <span className="profile-form__input-error">
            {validateName(values.name).message}
          </span>
        </div>
        <div className="profile-form__input-field">
          <label className="profile-form__label" htmlFor="user-email-input">
            E-mail
          </label>
          <input
            className="profile-form__input"
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
            disabled={!showSaveButton || isSubmitting}
          />

          <span className="profile-form__input-error">
            {validateEmail(values.email).message}
          </span>
        </div>

        <div className="profile-form__buttons">
          {serverError.profile && (
            <span className="profile-form__error-message">
              {serverError.profile.errorText}
            </span>
          )}

          {showSuccessMsg && (
            <span className="profile-form__success-message">
              Данные успешно обновлены!
            </span>
          )}

          {showSaveButton ? (
            <button
              type="submit"
              className="profile-form__button profile-form__button-save"
              disabled={
                !isValid ||
                (values.name === currentUser.name &&
                  values.email === currentUser.email) ||
                validateEmail(values.email).inactiveButton ||
                validateName(values.name).inactiveButton ||
                isSubmitting
              }
            >
              Сохранить
            </button>
          ) : (
            <button
              type="button"
              className="profile-form__button profile-form__button-edit"
              onClick={(e) => {
                e.preventDefault();
                setshowSaveButton(true);
                setShowSuccessMsg(false);
              }}
            >
              Редактировать
            </button>
          )}

          <button
            // type="submit"
            onClick={onSignOut}
            className="profile-form__button profile-form__button-signout"
          >
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </section>
  );
};

export default Profile;
