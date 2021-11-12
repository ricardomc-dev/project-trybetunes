import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state= {
      inputArtist: '',
    };
  }

  render() {
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
            onClick={ this.handleClickButton }
            value={ inputName }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
