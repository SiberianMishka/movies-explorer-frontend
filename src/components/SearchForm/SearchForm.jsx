import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useState, useEffect } from 'react';

const SearchForm = ({ onFilter, searchQuery, serverError }) => {
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState('');
  const isChecked = JSON.parse(localStorage.getItem('filterCheckBox'));
  const [isShortFilmChecked, setIsShortFilmChecked] = useState(isChecked);

  useEffect(() => {
    if (searchQuery.searchText) {
      setSearchText(searchQuery.searchText);
    }
  }, [searchQuery.searchText]);

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const checkFilterCheckbox = () => {
    if (searchText !== '') {
      setIsShortFilmChecked(!isShortFilmChecked);

      onFilter({
        searchText: searchText,
        isShortFilmChecked: !isShortFilmChecked,
      });
    } else {
      setIsShortFilmChecked(!isShortFilmChecked);

      onFilter({
        searchText: searchQuery.searchText,
        isShortFilmChecked: !isShortFilmChecked,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!searchText) {
      setError('Нужно ввести ключевое слово');
      return;
    } else {
      onFilter({ searchText, isShortFilmChecked });
    }
  };

  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSubmit}>
        <input
          className="search__form-input"
          placeholder="Фильм"
          name="search"
          value={searchText || ''}
          autoComplete="off"
          type="search"
          minLength="1"
          required
          onChange={handleChange}
        />

        <span className={`search-form__input-error`}>
          {!searchText && error}
        </span>

        <button type="submit" className="search__form-button">
          Найти
        </button>
      </form>
      <FilterCheckbox
        isChecked={searchQuery.isShortFilmChecked}
        checkboxChange={checkFilterCheckbox}
      />
    </section>
  );
};

export default SearchForm;
