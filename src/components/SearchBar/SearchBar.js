import React from "react";
import { Component } from "react";
import PropTypes from "prop-types";
import styles from "./SearchBar.module.css";

class SearchBar extends Component {
  state = {
    query: "",
  };

  InputChange = (e) => {
    this.setState({
      query: e.target.value,
    });
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({ query: "" });
  };

  render() {
    const { query } = this.state;
    return (
      <header className={styles.SearchBar}>
        <form className={styles.SearchForm} onSubmit={this.onFormSubmit}>
          <button type="submit" className={styles.button}>
            <span className={styles.buttonLabel}>Search</span>
          </button>
          <input
            className={styles.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.InputChange}
            value={query}
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
