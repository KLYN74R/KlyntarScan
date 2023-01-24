import React from 'react';
import styles from './style.module.css';

const Loader: React.FC = () => {
  return (
      <div className='flex justify-center items-center'>
        <div className={styles.ldsDualRing}></div>
      </div>
  );
};

export default Loader;