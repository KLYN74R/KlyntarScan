import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Home from './Home';

const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path='*' element={<Navigate to='/' replace />} />
            <Route path='/' element={<Home />} />
        </Routes>
    );
};

export default AppRouter;
