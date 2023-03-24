import React, { FC } from 'react';
import cls from 'classnames';
import styles from './style.module.css';

import { Container } from '../../layouts';
import Navigation from './Navigation';
import SocialsWidget from '../SocialsWidget';
import { SearchBar } from '../index';


// Delete when site will be in prod
import Marquee from "react-fast-marquee";




const Header: FC = () => {
    return (
        <header className=''>
            <div className='bg-slate-50 md:pt-10 pt-8 md:pb-10 pb-8'>
                <Container>
                    <div className='text-center'>

                    <div id="nav_container" className={cls(styles.textLogo, 'text-2xl')}>

                        <Marquee speed={150} gradient={false}>

                            <h2>🧑‍🔧the site is under construction🧑‍🔧</h2>

                        </Marquee>

                    </div>

                    <hr/><br/><br/><br/>

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
