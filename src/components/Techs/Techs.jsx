import React from 'react';
import './Techs.css';

const TECHS_LIST = [
  'HTML',
  'CSS',
  'JS',
  'React',
  'Git',
  'Express.js',
  'mongoDB',
];

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
        {TECHS_LIST.map((tech) => (
          <li key={tech} className="techs__item">
            {tech}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Techs;
