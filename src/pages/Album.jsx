import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      musics: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    getMusics(id)
      .then((data) => this.setState({ musics: data },
        () => this.setState({ isLoading: false })));
  }

  render() {
    const { musics, isLoading } = this.state;

    const renderName = !isLoading
      && <p data-testid="artist-name">{musics[0].artistName}</p>;
    const renderAlbumName = !isLoading
      && <p data-testid="album-name">{musics[0].collectionName}</p>;

    return (
      <div data-testid="page-album">
        <Header />
        { isLoading && <Loading /> }
        { renderName }
        { renderAlbumName }
        { !isLoading && musics.filter((music) => music.trackId !== undefined)
          .map((music) => (<MusicCard
            key={ music.trackId }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
            trackId={ music.trackId }
            music={ music }
          />))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
