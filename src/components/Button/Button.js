import PropTypes from 'prop-types';
import s from './Button.module.scss';

export function Button({ btnHandler }) {
  return (
    <button className={s.Button} type="button" onClick={() => btnHandler()}>
      Load More
    </button>
  );
}

Button.prototype = {
  btnHandler: PropTypes.func.isRequired,
};
