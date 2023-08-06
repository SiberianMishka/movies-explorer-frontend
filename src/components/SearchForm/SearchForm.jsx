import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = () => {
  return (
    <section className="search">
      <form className="search__form">
        <input
          className="search__form-input"
          type="search"
          placeholder="Фильм"
          required
        />
        <button type="submit" className="search__form-button">
          Найти
        </button>
      </form>
      <FilterCheckbox />
    </section>
  );
};

export default SearchForm;
