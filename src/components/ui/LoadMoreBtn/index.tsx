import React from 'react';
import styles from './style.module.css';

type Props = {
    action: () => void;
}

const LoadMoreBtn: React.FC<Props> = ({ action }) => {
    return (
        <a className={styles.arrowContainer} onClick={action}>
            <div className={styles.arrow}></div>
            <div className={styles.arrow}></div>
            <div className={styles.arrow}></div>
        </a>
    );
};

export default LoadMoreBtn;