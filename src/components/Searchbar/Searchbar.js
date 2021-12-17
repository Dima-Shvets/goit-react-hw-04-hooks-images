import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.scss';

export function Searchbar({ formSubmitHandler }) {
  const [searchQuery, setSearchQuery] = useState('');

  const inputHandler = e => {
    setSearchQuery(e.target.value);
  };

  const submitHandler = e => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      return;
    }

    formSubmitHandler(searchQuery);
    setSearchQuery('');
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={submitHandler}>
        <button type="submit" className={s['SearchForm-button']}>
          <span className={s['SearchForm-button-label']}>Search</span>
        </button>

        <input
          className={s['SearchForm-input']}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={inputHandler}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  formSubmitHandler: PropTypes.func.isRequired,
};
