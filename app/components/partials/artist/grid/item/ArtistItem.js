import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {Button} from 'react-bootstrap';
import {getImage} from '../../../../../helpers/imageHelper';
import LoadingSpinner from '../../../../common/loading_spinner/LoadingSpinner';
import './ArtistItem.scss';

class ArtistItem extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  renderFollowBlock() {
    const {artist, onFollowClick} = this.props;

    if (artist.followed !== undefined) {
      let spinner = null;
      if (artist.isUpdating) spinner = <LoadingSpinner type="bubbles" width={32} height={32}/>;

      let buttons = (
        <Button
          bsStyle={classnames({'success': artist.followed}, {'default': !artist.followed})}
          onClick={() => onFollowClick(artist.id, !artist.followed)}>
          {artist.followed ? 'Followed' : 'Follow'}
        </Button>
      );

      return (
        <div className="artist-actions-follow">
          {spinner}
          {!artist.isUpdating && buttons}
        </div>
      );
    }
  }

  render() {
    const {artist, onArtistClick} = this.props;
    const image = getImage(artist.images);

    let artistImageStyle = {
      background: 'lightgray'
    };

    if (image && image.url) {
      artistImageStyle = {
        backgroundImage: `url(${image.url})`
      };
    }

    return (
      <div className="artist-container text-center">
        <div className="artist-image" style={artistImageStyle} onClick={() => onArtistClick(artist.id, artist.name)}>
          <i className="fa fa-search-plus fa-4x icon-discover"/>
        </div>
        <div className="artist-info">
          <h3>{artist.name}</h3>
          <span className="artist-likes"><i className="fa fa-thumbs-o-up"/> {artist.followers && artist.followers.total}</span>
          <div className="artist-actions">
            {this.renderFollowBlock()}
          </div>
        </div>
      </div>
    );
  }
}

ArtistItem.propTypes = {
  artist: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    images: PropTypes.array,
    followers: PropTypes.object
  }).isRequired,
  onArtistClick: PropTypes.func,
  onFollowClick: PropTypes.func
};

export default ArtistItem;
