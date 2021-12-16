import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.scss';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  inputHandler = e => {
    const searchQuery = e.target.value;

    this.setState({
      searchQuery,
    });
  };

  submitHandler = e => {
    e.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      return;
    }

    this.props.formSubmitHandler(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.submitHandler}>
          <button type="submit" className={s['SearchForm-button']}>
            <span className={s['SearchForm-button-label']}>Search</span>
          </button>

          <input
            className={s['SearchForm-input']}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.inputHandler}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  formSubmitHandler: PropTypes.func.isRequired,
};
