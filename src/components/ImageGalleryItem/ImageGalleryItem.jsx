import React, { useState } from 'react';
import css from './ImageGalleryItem.module.css';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, id }) => {

  const [isShowModal, setIsShowModal] = useState(false)

  const handleModalOpen = () => {
    setIsShowModal(true)
  }

  const handleModalClose = () => {
    setIsShowModal(false)
  }

  return (
    <li
      className={css.imageGalleryItem}
      key={id}
    >
      <img
        className={css.imageGalleryItemImage}
        src={webformatURL}
        alt="webCard" onClick={handleModalOpen}
      />
      {isShowModal && (
        <Modal
          largeImageURL={largeImageURL}
          onClick={handleModalClose}
        />)}
    </li>
  )
}
