import React from 'react';
import './AboutProject.css';

const AboutProject = () => {
  return (
    <section className="about-project" id="about-project">
      <h3 className="about-project__title">О проекте</h3>
      <hr className="about-project__line" />
      <div className="about-project__container">
        <div className="about-project__description">
          <p className="about-project__description-title">
            Дипломный проект включал 5&nbsp;этапов
          </p>
          <p className="about-project__description-text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и&nbsp;финальные доработки.
          </p>
        </div>
        <div className="about-project__description">
          <p className="about-project__description-title">
            На&nbsp;выполнение диплома ушло 5&nbsp;недель
          </p>
          <p className="about-project__description-text">
            У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые
            нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__timeline">
        <div className="about-project__timeline_one">1 неделя</div>
        <div className="about-project__timeline_four">4 недели</div>
      </div>
      <div className="about-project__stack">
        <div className="about-project__stack-back">Back-end</div>
        <div className="about-project__stack-front">Front-end</div>
      </div>
    </section>
  );
};

export default AboutProject;
