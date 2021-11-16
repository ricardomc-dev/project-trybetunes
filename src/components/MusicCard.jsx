import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      isChecked: false,
      isLoading: false,
    };
    this.handleCheckedSongs = this.handleCheckedSongs.bind(this);
    this.handleFavoriteSongs = this.handleFavoriteSongs.bind(this);
  }

  componentDidMount() {
    this.handleFavoriteSongs();
  }

  handleFavoriteSongs() {
    const { trackId } = this.props;
    getFavoriteSongs()
      .then((data) => this.setState(
        { isChecked: data.some((item) => item.trackId === trackId) },
      ));
  }

  handleCheckedSongs({ target: { checked } }) {
    const { music } = this.props;
    this.setState({ isLoading: true });
    if (checked) {
      addSong(music)
        .then(() => this.handleFavoriteSongs())
        .then(() => this.setState({ isLoading: false, isChecked: true }));
    }
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isChecked, isLoading } = this.state;
    return (
      <div>
        {isLoading ? <Loading /> : (
          <>
            <p>{ trackName }</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
            <label htmlFor={ trackId }>
              Favorita
              <input
                type="checkbox"
                data-testid={ `checkbox-music-${trackId}` }
                name="favoriteSong"
                id={ trackId }
                onChange={ this.handleCheckedSongs }
                checked={ isChecked }
              />
            </label>
          </>

        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  music: PropTypes.shape({
    trackId: PropTypes.number,
  }).isRequired,
};

export default MusicCard;
