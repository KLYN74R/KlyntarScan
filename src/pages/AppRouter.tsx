import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Home from './Home';
import CheckpointStats from './CheckpointStats';

const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path='*' element={<Navigate to='/' replace />} />
            <Route path='/' element={<Home />} />
            <Route path='latest_checkpoint' element={<CheckpointStats />} />
        </Routes>
    );
};

export default AppRouter;
