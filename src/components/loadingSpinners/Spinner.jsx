import React from 'react';
import styles from './Spinner.module.css';

function Spinner() {
  return (
    <div className={`${styles['sk-chase']}`}>
      <div className={`${styles['sk-chase-dot']}`} />
      <div className={`${styles['sk-chase-dot']}`} />
      <div className={`${styles['sk-chase-dot']}`} />
      <div className={`${styles['sk-chase-dot']}`} />
      <div className={`${styles['sk-chase-dot']}`} />
      <div className={`${styles['sk-chase-dot']}`} />
    </div>
  );
}

export default Spinner;
