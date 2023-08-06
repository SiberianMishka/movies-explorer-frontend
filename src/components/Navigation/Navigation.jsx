import React from 'react';
import './Navigation.css';
import { useLocation, Link } from 'react-router-dom';
import AccoutIcon from '../../images/icon-account.svg';
import useResize from '../../hooks/useResize';

const Navigation = ({ isLoggedIn }) => {
  let location = useLocation();
  let size = useResize();

  const routeClass =
    size.width <= 870 ? 'navigation__route-burger-menu ' : 'navigation__route ';
  const activeRouteClass =
    size.width <= 870
      ? ' navigation__route-burger-menu_active '
      : ' navigation__route_active ';

  return (
    <nav className="navigation">
      {isLoggedIn ? (
        <>
          <div className="navigation__movies">
            <Link
              className={`${routeClass} navigation__route-main${
                location.pathname === '/' ? activeRouteClass : ''
              }`}
              to="/"
            >
              Главная
            </Link>

            <Link
              className={`${routeClass} navigation__movies-route${
                location.pathname === '/movies' ? activeRouteClass : ''
              }`}
              to="/movies"
            >
              Фильмы
            </Link>

            <Link
              className={`${routeClass} navigation__movies-route${
                location.pathname === '/saved-movies' ? activeRouteClass : ''
              }`}
              to="/saved-movies"
            >
              Сохранённые фильмы
            </Link>
          </div>

          <Link
            className={`navigation__route navigation__route-account`}
            to="/profile"
          >
            <img
              src={AccoutIcon}
              alt="!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!Изображение иконки аккаунта"
            />{' '}
            Аккаунт
          </Link>
        </>
      ) : (
        <div className="navigation__main">
          <Link className="navigation__route" to="/signup">
            Регистрация
          </Link>

          <Link
            className="navigation__route navigation__route-button"
            to="/signin"
          >
            Войти
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
