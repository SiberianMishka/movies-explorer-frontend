import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import useResize from '../../hooks/useResize.js';
import MoviesCard from '../MoviesCard/MoviesCard';
import {
  TABLET_WIDTH,
  DESKTOP_WIDTH,
  RENDERED_CARDS_MIN,
  RENDERED_CARDS_MEDIUM,
  RENDERED_CARDS_MAX,
  ADDED_CARDS_MIN,
  ADDED_CARDS_MAX,
} from '../../utils/constants';

const MoviesCardList = ({
  movies,
  savedMovies,
  onLikeMovie,
  onDeleteMovie,
}) => {
  let size = useResize();
  let location = useLocation();
  const [cardsToAdd, setCardsToAdd] = useState(0);

  useEffect(() => {
    setCardsToAdd(0);
  }, [movies]);

  // Вычисляем количество карточек для отображения на основе размера экрана
  const cardsToDisplay = useMemo(() => {
    let cardsToDisplayCount;

    if (size.width < TABLET_WIDTH) {
      cardsToDisplayCount = RENDERED_CARDS_MIN;
    } else if (size.width < DESKTOP_WIDTH) {
      cardsToDisplayCount = RENDERED_CARDS_MEDIUM;
    } else {
      cardsToDisplayCount = RENDERED_CARDS_MAX;
    }

    return movies.slice(0, cardsToDisplayCount + cardsToAdd);
  }, [movies, cardsToAdd, size]);

  // В /movies показываем cardsToDisplay, в /saved-movies все карточки
  const cardsToRender =
    location.pathname === '/movies'
      ? cardsToDisplay
      : location.pathname === '/saved-movies'
      ? movies
      : [];

  return (
    <>
      <ul className="movies-cardlist">
        {cardsToRender.map((movie) => {
          return (
            <MoviesCard
              movie={movie}
              savedMovies={savedMovies}
              onLikeMovie={onLikeMovie}
              onDeleteMovie={onDeleteMovie}
              key={movie.id || movie.movieId}
            />
          );
        })}
      </ul>

      {/* В /movies показываем кнопку, если еще есть фильмы  */}
      {location.pathname === '/movies' &&
        movies.length > cardsToDisplay.length && (
          <button
            onClick={() => {
              setCardsToAdd(
                (prev) =>
                  prev +
                  (size.width >= DESKTOP_WIDTH
                    ? ADDED_CARDS_MAX
                    : ADDED_CARDS_MIN)
              );
            }}
            className="movies-cardlist__more-button"
          >
            Ещё
          </button>
        )}
    </>
  );
};

export default MoviesCardList;
