import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.scss';

export function ImageGalleryItem({ clickHandler, picture }) {
  const { webformatURL, largeImageURL, tags, id } = picture;

  return (
    <li
      className={s.ImageGalleryItem}
      onClick={() => clickHandler(largeImageURL, tags)}
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

ImageGalleryItem.propTypes = {
  picture: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }),
};
