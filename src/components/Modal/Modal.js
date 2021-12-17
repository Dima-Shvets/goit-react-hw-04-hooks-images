import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.scss';

const modalRoot = document.getElementById('modal-root');

export function Modal({ toggleModal, picture }) {
  const overlayClickHandler = e => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', toggleModal);
    return () => {
      window.removeEventListener('keydown', toggleModal);
    };
  }, [toggleModal]);

  const { largeImageURL, tags } = picture;
  return createPortal(
    <div className={s.Overlay} onClick={overlayClickHandler}>
      <div className={s.Modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>,
    modalRoot,
  );
}

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  picture: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
