import React, { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import './Movies.css';
import { SHORT_FILM_LENGTH } from '../../utils/constants';

const Movies = ({ movies, savedMovies, onLikeMovie, serverError }) => {
  const searchedMovies = localStorage.getItem('searchedMovies');
  const searchQueryMovies = localStorage.getItem('searchQueryMovies');

  const [searchQuery, setSearchQuery] = useState({});
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Достаем найденные фильмы из localStorage
  useEffect(() => {
    if (searchedMovies) {
      setFilteredMovies(JSON.parse(searchedMovies));
    }
  }, [searchedMovies]);

  // Достаем поисковый запрос из localStorage
  useEffect(() => {
    if (searchQueryMovies) {
      setSearchQuery(JSON.parse(searchQueryMovies));
    }
  }, [searchQueryMovies]);

  // Фильтрация фильмов
  const filterMovies = (query) => {
    setIsLoading(true);
    localStorage.setItem('searchQueryMovies', JSON.stringify(query));

    let filtered = movies.filter((movie) => {
      // Проверка на соответствие длине короткометражного фильма
      if (query.isShortFilmChecked && movie.duration > SHORT_FILM_LENGTH) {
        return false;
      }
      // Проверка на соответствие поисковому запросу
      return movie.nameRU
        .toLowerCase()
        .trim()
        .includes(query.searchText.toLowerCase());
    });

    setFilteredMovies(filtered);
    localStorage.setItem('searchedMovies', JSON.stringify(filtered));

    // Остановить preloader с задержкой в 1 секунду
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="movies">
      <SearchForm
        onFilter={filterMovies}
        searchQuery={searchQuery}
        serverError={serverError}
      />
      {serverError?.movies && Object.keys(serverError?.movies).length !== 0 ? (
        <p className="movies__api-error">
          Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз.
        </p>
      ) : (
        ''
      )}

      {isLoading ? (
        <Preloader />
      ) : filteredMovies.length ? (
        <MoviesCardList
          movies={filteredMovies}
          savedMovies={savedMovies}
          onLikeMovie={onLikeMovie}
        />
      ) : (
        searchedMovies && <p className="movies__not-found">Ничего не найдено</p>
      )}
    </section>
  );
};

export default Movies;
