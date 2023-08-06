import React from 'react';
import './Techs.css';

const Techs = () => {
  return (
    <section className="techs">
      <h3 className="techs__title">Технологии</h3>
      <hr className="techs__line" />
      <div className="techs__description">
        <h2 className="techs__descripion-title">7 технологий</h2>
        <p className="techs__description-text">
          На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые
          применили в&nbsp;дипломном проекте.
        </p>
      </div>
      <ul className="techs__list">
        <li className="techs__item">HTML</li>
        <li className="techs__item">CSS</li>
        <li className="techs__item">JS</li>
        <li className="techs__item">React</li>
        <li className="techs__item">Git</li>
        <li className="techs__item">Express.js</li>
        <li className="techs__item">mongoDB</li>
      </ul>
    </section>
  );
};

export default Techs;
