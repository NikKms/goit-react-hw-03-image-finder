import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Img, Item } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  render() {
    const { image, openModal } = this.props;
    const { webformatURL, tags } = image;
    return (
      <Item onClick={() => openModal(image)}>
        <Img src={webformatURL} alt={tags} />
      </Item>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  openModal: PropTypes.func.isRequired,
};
