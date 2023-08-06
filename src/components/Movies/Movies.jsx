import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { moviesData } from '../../utils/moviesData.js';

const Movies = () => {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList movies={moviesData} />
      <button className="movies__more-button">Ещё</button>
    </section>
  );
};

export default Movies;
