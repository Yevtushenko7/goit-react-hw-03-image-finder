import React from "react";
import PropTypes from "prop-types";
import ImageGalleryItem from "./ImageGalleryItem";
import styles from "./ImageGallery.module.css";

const ImageGallery = ({ images, onClick }) => (
  <ul className={styles.ImageGallery} onClick={onClick}>
    {images.map(({ id, webformatURL, tags, largeImageURL }) => (
      <ImageGalleryItem
        key={id}
        webformatURL={webformatURL}
        tags={tags}
        largeImageURL={largeImageURL}
      />
    ))}
  </ul>
);

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGallery;
