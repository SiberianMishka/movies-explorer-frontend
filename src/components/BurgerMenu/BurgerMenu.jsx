import React, { useState, useEffect, useCallback } from 'react';
import Navigation from '../Navigation/Navigation';
import './BurgerMenu.css';

const BurgerMenu = ({ isLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleBurgerMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  const closeBurgerMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeBurgerMenu();
      }
    };

    document.addEventListener('keydown', closeByEscape);
    return () => document.removeEventListener('keydown', closeByEscape);
  }, [isOpen, closeBurgerMenu]);

  return (
    <div className="burger-menu">
      <button
        className="burger-menu__burger-button"
        onClick={toggleBurgerMenu}
        aria-label="Открыть меню"
      ></button>

      {isOpen && (
        <div className="burger-menu__overlay" onClick={closeBurgerMenu}></div>
      )}

      <div
        onClick={(e) => (e.target.href ? closeBurgerMenu() : '')}
        className={`burger-menu__container ${
          isOpen ? 'burger-menu__container_open' : ''
        }`}
      >
        <button
          className="burger-menu__close-button"
          onClick={closeBurgerMenu}
          aria-label="Закрыть меню"
        ></button>

        <Navigation isLoggedIn={isLoggedIn} />
      </div>
    </div>
  );
};

export default BurgerMenu;
