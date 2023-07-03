import { Component } from 'react';
import PropTypes from 'prop-types';

import { ModalDisplay, Overlay } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = '';
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { image } = this.props;
    return (
      <Overlay onClick={this.handleOverlayClick}>
        <ModalDisplay>
          <img
            src={image.largeImageURL}
            alt={image.tags}
            style={{
              maxWidth: 'calc(100vw - 48px)',
              maxHeight: 'calc(100vh - 24px)',
            }}
          />
        </ModalDisplay>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
