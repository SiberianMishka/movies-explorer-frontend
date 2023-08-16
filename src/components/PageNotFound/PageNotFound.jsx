import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PageNotFound.css';

const PageNotFound = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    isLoggedIn ? navigate(-2) : navigate('/');
  };

  return (
    <section className="not-found">
      <div className="not-found__container">
        <p className="not-found__code">404</p>
        <h2 className="not-found__text">Страница не&nbsp;найдена</h2>
        <button className="not-found__back-button" onClick={handleGoBack}>
          Назад
        </button>
      </div>
    </section>
  );
};

export default PageNotFound;
