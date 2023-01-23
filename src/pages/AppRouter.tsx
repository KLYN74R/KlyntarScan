import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Home from './Home';
import Scanner from './Scanner';

const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path='*' element={<Navigate to='/' replace />} />
            <Route path='/' element={<Home />} />
            <Route path='/scanner' element={<Scanner />} />
        </Routes>
    );
};

export default AppRouter;
