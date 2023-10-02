import React, { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ onClick, largeImageURL }) => {

  const keyDownEvent = (e) => {
    if (e.code === 'Escape') {
      onClick();
    };
  };

  const onClickEvent = (e) => {
    if (e.srcElement.localName !== 'img') {
      onClick();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', keyDownEvent);
    document.addEventListener('click', onClickEvent);

    return () => {
      document.removeEventListener('keydown', keyDownEvent);
      document.removeEventListener('click', onClickEvent);
    }
  }, [])

  return (
    <div className={css.overlay}>
      <div className={css.modal}>
        <img src={largeImageURL} alt="largeCard" className={css.overlayImg} />
      </div>
    </div>
  )
}
