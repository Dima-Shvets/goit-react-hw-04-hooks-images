import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.scss';

const modalRoot = document.getElementById('modal-root');

export class Modal extends Component {
  escPressHandler = () => {
    this.props.toggleModal();
  };

  overlayClickHandler = e => {
    if (e.target === e.currentTarget) {
      this.props.toggleModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.escPressHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.escPressHandler);
  }

  render() {
    const { largeImageURL, tags } = this.props.picture;
    return createPortal(
      <div className={s.Overlay} onClick={this.overlayClickHandler}>
        <div className={s.Modal}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>,
      modalRoot,
    );
  }
}

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  picture: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
