import React from 'react';
import { Link } from 'react-router-dom';
import './PageNotFound.css';

const PageNotFound = () => {
  return (
    <section className="not-found">
      <div className="not-found__container">
        <p className="not-found__code">404</p>
        <h2 className="not-found__text">Страница не&nbsp;найдена</h2>
        <Link className="not-found__back-button" to="/">
          Назад
        </Link>
      </div>
    </section>
  );
};

export default PageNotFound;
