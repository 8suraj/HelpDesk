import React from 'react';
import './button.styles.scss';
// import ButtonRightArrow from '../../assets/Images/ButtonRightArrow.svg';

export default function Button({ text, className }) {
  return (
    <button type='submit' className={`btn ${className}`}>
      {text}
    </button>
  );
}

