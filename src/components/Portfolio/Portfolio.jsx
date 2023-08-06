import React from 'react';
import './Portfolio.css';
import ArrowLinkDiagonal from '../../images/arrow-link-diagonal.svg';

const Portfolio = () => {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <div className="portfolio__links">
        <a
          className="portfolio__link"
          href="https://github.com/SiberianMishka/how-to-learn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Статичный сайт</span>
          <img
            className="portfolio__link-arrow"
            src={ArrowLinkDiagonal}
            alt="Ссылка на статичный сайт"
          />
        </a>
        <a
          className="portfolio__link"
          href="https://siberianmishka.github.io/russian-travel/index.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Адаптивный сайт</span>
          <img
            className="portfolio__link-arrow"
            src={ArrowLinkDiagonal}
            alt="Ссылка на адаптивный сайт"
          />
        </a>
        <a
          className="portfolio__link"
          href="https://github.com/SiberianMishka/react-mesto-api-full-gha"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Одностраничное приложение</span>
          <img
            className="portfolio__link-arrow"
            src={ArrowLinkDiagonal}
            alt="Ссылка на одностраничное приложение"
          />
        </a>
      </div>
    </section>
  );
};

export default Portfolio;
