import React, { FC } from 'react';
import cls from 'classnames';
import styles from './style.module.css';

import { Container } from '../../layouts';
import Navigation from './Navigation';
import SocialsWidget from '../SocialsWidget';
import { SearchBar } from '../index';

const Header: FC = () => {
    return (
        <header className=''>
            <div className='bg-slate-50 md:pt-10 pt-8 md:pb-10 pb-8'>
                <Container>
                    <div className='text-center'>
                        <h1 className={cls(styles.textLogo, 'text-2xl')}>KlYntaRscan</h1>
                        <span className={cls(styles.version, 'block mt-2')}>v1.3.37</span>
                        <span className={cls(styles.subtitle, 'block mt-8')}>🚀future starts here🚀</span>
                    </div>
                    <SocialsWidget/>
                </Container>
            </div>

            <Container>
                <Navigation>
                    <SearchBar/>
                </Navigation>
            </Container>
        </header>
    );
};

export default Header;
