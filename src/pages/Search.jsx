import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      inputArtist: '',
      isDisabled: 'true',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange({ target: { value } }) {
    const DOIS = 2;
    this.setState({ inputArtist: value }, () => {
      this.setState({ isDisabled: value.length < DOIS });
    });
  }

  render() {
    const { isDisabled, inputArtist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            name="inputArtist"
            id="search-artist-input"
            placeholder="Nome do Artista"
            onChange={ this.handleInputChange }
            value={ inputArtist }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ isDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
