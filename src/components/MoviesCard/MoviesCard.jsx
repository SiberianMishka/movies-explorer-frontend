import React from 'react';
import { useLocation } from 'react-router-dom';
import { timeConverter } from '../../utils/timeConverter.js';
import './MoviesCard.css';
import { MOVIES_URL } from '../../utils/constants';

const MoviesCard = ({ movie, savedMovies, onLikeMovie, onDeleteMovie }) => {
  let location = useLocation();
  const isLikeButton = location.pathname === '/movies';
  const isDeleteButton = location.pathname === '/saved-movies';
  const savedMovie = savedMovies
    ? savedMovies.find((item) => item.movieId === movie.id)
    : '';
  const isLiked = savedMovies
    ? savedMovies.some((i) => i.movieId === movie.id)
    : false;
  const imageUrl = movie.image.url
    ? `${MOVIES_URL}${movie.image.url}`
    : movie.image;

  return (
    <li className="moviescard">
      <a
        className="moviescard__image-link"
        href={movie.trailerLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="moviescard__image"
          src={imageUrl}
          alt={`Кадр из фильма ${movie.nameRU}`}
        />
      </a>

      <div className="moviescard__details">
        <p className="moviescard__name">{movie.nameRU}</p>
        <p className="moviescard__duration">{timeConverter(movie.duration)}</p>
      </div>
      {isLikeButton && (
        <button
          onClick={() => onLikeMovie(movie, isLiked, savedMovie?._id)}
          className={`moviescard__like-button ${
            isLiked ? ' moviescard__like-button_liked' : ''
          }`}
        ></button>
      )}
      {isDeleteButton && (
        <button
          onClick={() => onDeleteMovie(movie._id)}
          className={`moviescard__delete-button`}
        ></button>
      )}
    </li>
  );
};

export default MoviesCard;
