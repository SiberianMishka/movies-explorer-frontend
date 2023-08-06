import React from 'react';
import './Profile.css';

const Profile = () => {
  return (
    <section className="profile">
      <h1 className="profile__header">Привет, Виталий!</h1>
      <form className="profile-form">
        <div className="profile-form__input-field">
          <label className="profile-form__label">Имя</label>
          <input className="profile-form__input" defaultValue="Виталий" />
          <span className="profile-form__input-error"></span>
        </div>
        <div className="profile-form__input-field">
          <label className="profile-form__label">E-mail</label>
          <input
            className="profile-form__input"
            defaultValue="pochta@yandex.ru"
          />
          <span className="profile-form__input-error"></span>
        </div>
        <button
          type="submit"
          className="profile-form__button profile-form__button-edit"
        >
          Редактировать
        </button>
        <button
          type="submit"
          className="profile-form__button profile-form__button-signout"
        >
          Выйти из аккаунта
        </button>
      </form>
    </section>
  );
};

export default Profile;
