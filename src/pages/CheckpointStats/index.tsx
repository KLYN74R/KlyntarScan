import React, { useEffect, useState } from 'react';
import { api } from '../../utils/axios';
import { ENDPOINTS } from '../../types/endpoints';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/1337.css';

import { HomeLayout } from '../../layouts';
import Loader from '../../components/ui/Loader';

const CheckpointStats: React.FC = () => {
  const [checkpointData, setCheckpointData] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<null|string>(null);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
        await api.get(ENDPOINTS.CHECKPOINT_STATS)
            .then(response => {
                setCheckpointData({
                    ...response.data.HEADER,
                    ...response.data.PAYLOAD,
                    TIMESTAMP: new Date(response.data.TIMESTAMP).toString()
                });
            })
            .catch(e => {
                setIsError('Connection failed');
                throw e;
            })
            .finally(() => setTimeout(() => setIsLoading(false), 300));
    })();
  }, []);

  return (
    <HomeLayout>
        {isLoading ? (
            <Loader/>
        ) : (
            <div>
                <h2 className='uppercase tracking-wide mb-8'>Latest checkpoint stats</h2>
                <JSONPretty id="json-pretty" data={checkpointData}></JSONPretty>
                {isError && <p className='text-xl text-red-600'>Connection failed.</p>}
            </div>
        )}
    </HomeLayout>
  );
};

export default CheckpointStats;