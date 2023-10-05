import React, { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ onClick, largeImageURL }) => {

  const onClickEvent = (e) => {
    if (e.target?.localName !== 'img') {
      onClick();
    }
  }

  useEffect(() => {
    const keyDownEvent = (e) => {
      if (e.code === 'Escape') {
        onClick();
      };
    };

    document.addEventListener('keydown', keyDownEvent);

    return () => {
      document.removeEventListener('keydown', keyDownEvent);
    }
  }, [onClick])

  return (
    <div className={css.overlay} onClick={onClickEvent}>
      <div className={css.modal}>
        <img src={largeImageURL} alt="largeCard" className={css.overlayImg} />
      </div>
    </div>
  )
}
