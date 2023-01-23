import React, { FC } from 'react';

import { Header, Footer } from '../../components';
import { Container } from '../index';

type Props = {
    children: React.ReactNode;
};

const HomeLayout: FC<Props> = ({ children }) => {
    return (
        <>
            <Header/>
            <Container>
                <main>{children}</main>
            </Container>
            <Footer
            />
        </>
    );
};

export default HomeLayout;
