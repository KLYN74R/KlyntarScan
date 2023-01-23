import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Home from './Home';
import CheckpointStats from './CheckpointStats';
import SymbioteInfo from './SymbioteInfo';

const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path='*' element={<Navigate to='/' replace />} />
            <Route path='/' element={<Home />} />
            <Route path='latest_checkpoint' element={<CheckpointStats />} />
            <Route path='symbiote_info' element={<SymbioteInfo />} />
        </Routes>
    );
};

export default AppRouter;
