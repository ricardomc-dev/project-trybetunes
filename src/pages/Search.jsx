import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      inputArtist: '',
      isDisabled: true,
      albums: [],
      artistSearch: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearchButton = this.handleSearchButton.bind(this);
  }

  handleInputChange({ target: { value } }) {
    const DOIS = 2;
    this.setState({ inputArtist: value }, () => {
      this.setState({ isDisabled: value.length < DOIS });
    });
  }

  handleSearchButton(event) {
    event.preventDefault();
    const { inputArtist } = this.state;
    this.setState({ isLoading: true });
    searchAlbumsAPI(inputArtist)
      .then((data) => this.setState({ albums: data, artistSearch: inputArtist },
        () => this.setState({ inputArtist: '', isLoading: false })));
  }

  render() {
    const { isDisabled, inputArtist, isLoading, artistSearch, albums } = this.state;
    const artistSearchTag = <p>{`Resultado de álbuns de: ${artistSearch}`}</p>;
    const validateAlbum = (artistSearch && albums.length === 0);
    return (
      <div data-testid="page-search">
        <Header />
        { isLoading ? <Loading /> : (
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
              onClick={ this.handleSearchButton }
            >
              Pesquisar
            </button>
          </form>
        )}
        { artistSearch !== '' && artistSearchTag }
        <ul type="none">
          { albums && albums.map((item) => (
            <li key={ item.collectionId }>
              <Link
                to={ `/album/${item.collectionId}` }
                data-testid={ `link-to-album-${item.collectionId}` }
              >
                { item.collectionName }
              </Link>
            </li>
          ))}
        </ul>
        { validateAlbum && <p>Nenhum álbum foi encontrado</p>}
      </div>
    );
  }
}

export default Search;
