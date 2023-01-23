import React, { FC } from 'react';
import cls from 'classnames';
import styles from './style.module.css';

import { Container } from '../../layouts';

const Header: FC = () => {
    return (
        <header className='md:pt-24 pt-10 md:pb-24 pb-10'>
            <Container>
                <div className='text-center'>
                    <h1 className={cls(styles.textLogo, 'text-3xl')}>KlYntaRscan</h1>
                    <span className={cls(styles.version, 'block mt-2')}>v1.3.37</span>
                    <span className={cls(styles.subtitle, 'block mt-8')}>🚀future starts here🚀</span>
                </div>
            </Container>
        </header>
    );
};

export default Header;
