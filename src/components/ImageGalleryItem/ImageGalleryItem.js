import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.scss';

export class ImageGalleryItem extends Component {
  clickHandler = e => {
    this.props.clickHandler(e.target.id);
  };

  render() {
    const { webformatURL, largeImageURL, tags, id } = this.props.picture;
    return (
      <li
        className={s.ImageGalleryItem}
        onClick={() => this.props.clickHandler(largeImageURL, tags)}
      >
        <img
          className={s['ImageGalleryItem-image']}
          src={webformatURL}
          alt={tags}
          id={id}
        />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  picture: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }),
};
