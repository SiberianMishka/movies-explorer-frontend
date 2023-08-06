import React from 'react';
import { useLocation } from 'react-router-dom';
import { timeConverter } from '../../utils/timeConverter.js';
import './MoviesCard.css';

const MoviesCard = ({ movie }) => {
  let location = useLocation();
  const isLikeButton = location.pathname === '/movies';
  const isDeleteButton = location.pathname === '/saved-movies';

  return (
    <li className="moviescard">
      <img
        className="moviescard__image"
        src={movie.thumbnail}
        alt={movie.nameRU}
      />
      <div className="moviescard__details">
        <p className="moviescard__name">{movie.nameRU}</p>
        <p className="moviescard__duration">{timeConverter(movie.duration)}</p>
      </div>
      {isLikeButton && (
        <button
          className={`moviescard__like-button ${
            movie.isLiked ? ' moviescard__like-button_liked' : ''
          }`}
        ></button>
      )}
      {isDeleteButton && (
        <button className={`moviescard__delete-button`}></button>
      )}
    </li>
  );
};

export default MoviesCard;
