import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Home from './Home';
import CheckpointStats from './CheckpointStats';
import LatestTransactions from './LatestTransactions';
import LatestBlocks from './LatestBlocks';
import SymbioteInfo from './SymbioteInfo';
import EntitySearch from './EntitySearch';

const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path='*' element={<Navigate to='/' replace />} />
            <Route path='/' element={<Home />} />
            <Route path='latest_checkpoint' element={<CheckpointStats />} />
            <Route path='latest_transaction' element={<LatestTransactions />} />
            <Route path='latest_blocks' element={<LatestBlocks />} />
            <Route path='symbiote_info' element={<SymbioteInfo />} />
            <Route path='entity_search' element={<EntitySearch />} />
        </Routes>
    );
};

export default AppRouter;
