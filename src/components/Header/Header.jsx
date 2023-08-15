import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import useResize from '../../hooks/useResize.js';

const Header = ({ isLoggedIn }) => {
  const { width } = useResize();

  const NavigationComponent =
    width > 870 || !isLoggedIn ? (
      <Navigation isLoggedIn={isLoggedIn} />
    ) : (
      <BurgerMenu isLoggedIn={isLoggedIn} />
    );

  return (
    <header
      className={`header ${
        isLoggedIn ? 'header_type-white' : 'header_type-blue'
      }`}
    >
      <Link className="header__route" to="/">
        <img className="header__logo" src={Logo} alt="Логотип сайта" />
      </Link>
      {NavigationComponent}
    </header>
  );
};

export default Header;
