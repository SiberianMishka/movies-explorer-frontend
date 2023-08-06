import React from 'react';
import './AboutMe.css';
import StudentPhoto from '../../images/student-photo.jpg';

const AboutMe = () => {
  return (
    <section className="about-me">
      <h3 className="about-me__title">Студент</h3>
      <hr className="about-me__line" />
      <div className="about-me__container">
        <div className="about-me__bio">
          <p className="about-me__bio-name">Виталий</p>
          <p className="about-me__bio-about">
            Фронтенд-разработчик, 30&nbsp;лет
          </p>
          <p className="about-me__bio-text">
            Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове, закончил факультет
            экономики СГУ. У&nbsp;меня есть жена и&nbsp;дочь. Я&nbsp;люблю
            слушать музыку, а&nbsp;ещё увлекаюсь бегом. Недавно начал кодить.
            С&nbsp;2015 года работал в&nbsp;компании &laquo;СКБ Контур&raquo;.
            После того, как прошёл курс по&nbsp;веб-разработке, начал заниматься
            фриланс-заказами и&nbsp;ушёл с&nbsp;постоянной работы.
          </p>
          <a
            className="about-me__bio-link"
            href="https://github.com/SiberianMishka"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </div>
        <img
          className="about-me__student-photo"
          src={StudentPhoto}
          alt="Фотография студента"
        />
      </div>
    </section>
  );
};

export default AboutMe;
