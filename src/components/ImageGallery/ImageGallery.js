import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.scss';

export function ImageGallery({ toggleModal, getModalPicture, pictures }) {
  const pictureClickHandler = (largeImageURL, tags) => {
    toggleModal();
    getModalPicture(largeImageURL, tags);
  };

  return (
    <ul className={s.ImageGallery}>
      {pictures.map(picture => {
        return (
          <ImageGalleryItem
            key={picture.id}
            picture={picture}
            clickHandler={pictureClickHandler}
          />
        );
      })}
    </ul>
  );
}

ImageGallery.propTypes = {
  pictures: PropTypes.array.isRequired,
  toggleModal: PropTypes.func.isRequired,
  getModalPicture: PropTypes.func.isRequired,
};
