import React, { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import './SavedMovies.css';
import { SHORT_FILM_LENGTH } from '../../utils/constants';

const SavedMovies = ({ savedMovies, onDeleteMovie }) => {
  const localSavedMovies = localStorage.getItem('localSavedMovies');
  const searchQuerySavedMovies = localStorage.getItem('searchQuerySavedMovies');

  const [searchQuery, setSearchQuery] = useState({});
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (localSavedMovies) {
      setFilteredMovies(JSON.parse(localSavedMovies));
    } else {
      setFilteredMovies(savedMovies);
    }
  }, [localSavedMovies, savedMovies, searchQuery]);

  useEffect(() => {
    if (searchQuerySavedMovies) {
      setSearchQuery(JSON.parse(searchQuerySavedMovies));
    } else {
      setSearchQuery({ ...searchQuerySavedMovies, searchText: '' });
    }
  }, [searchQuerySavedMovies, savedMovies]);

  const filterMovies = (query) => {
    setIsLoading(true);
    localStorage.setItem('searchQuerySavedMovies', JSON.stringify(query));

    let filtered = savedMovies.filter((movie) => {
      if (query.isShortFilmChecked && movie.duration > SHORT_FILM_LENGTH) {
        return false;
      }

      return movie.nameRU
        .toLowerCase()
        .trim()
        .includes(query.searchText.toLowerCase());
    });

    setFilteredMovies(filtered);
    localStorage.setItem('localSavedMovies', JSON.stringify(filtered));
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="saved-movies">
      <SearchForm onFilter={filterMovies} searchQuery={searchQuery} />

      {isLoading ? (
        <Preloader />
      ) : filteredMovies.length ? (
        <MoviesCardList movies={filteredMovies} onDeleteMovie={onDeleteMovie} />
      ) : (
        localSavedMovies && (
          <p className="saved-movies__not-found">Ничего не найдено</p>
        )
      )}
    </section>
  );
};

export default SavedMovies;
