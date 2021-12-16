import { Component } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.scss';

export class ImageGallery extends Component {
  pictureClickHandler = (largeImageURL, tags) => {
    this.props.toggleModal();
    this.props.getModalPicture(largeImageURL, tags);
  };

  render() {
    return (
      <ul className={s.ImageGallery}>
        {this.props.pictures.map(picture => {
          return (
            <ImageGalleryItem
              key={picture.id}
              picture={picture}
              clickHandler={this.pictureClickHandler}
            />
          );
        })}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  pictures: PropTypes.array.isRequired,
  toggleModal: PropTypes.func.isRequired,
  getModalPicture: PropTypes.func.isRequired,
};
