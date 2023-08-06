import React from 'react';
import './Promo.css';
import NavTab from '../NavTab/NavTab';
import PromoLogo from '../../images/landing-logo.svg';

const Promo = () => {
  return (
    <section className="promo">
      <div className="promo__container">
        <div>
          <h1 className="promo__title">
            Учебный проект студента факультета Веб-разработки.
          </h1>
          <p className="promo__text">
            Листайте ниже, чтобы узнать больше про этот проект и&nbsp;его
            создателя.
          </p>
        </div>
        <img
          className="promo__logo"
          src={PromoLogo}
          alt="Логотип планета Земля"
        />
      </div>
      <NavTab />
    </section>
  );
};

export default Promo;
