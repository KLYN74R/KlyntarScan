import React, { useEffect, useState } from 'react';
import { useSearchParams  } from 'react-router-dom';
import { api } from '../../utils/axios';
import { emptyResponse } from '../../types/endpoints';

import { HomeLayout } from '../../layouts';
import { getEndpointByEntityType } from '../../types/entities';
import Loader from '../../components/ui/Loader';
import JSONPretty from 'react-json-pretty';

const EntitySearch: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [entity, setEntity] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const responseType = searchParams.get('type') || '';
  const query = searchParams.get('query') || '';

  useEffect(() => {
      (async () => {
          const endpoint = getEndpointByEntityType(responseType);
          await requestEntity(endpoint);
      })();
  }, [responseType, query]);

  const requestEntity = async (endpoint: string) => {
    setIsLoading(true);
    setError('');
    setEntity({});

    try {
        const response = await api.get(endpoint + '/' + query);

        const data = response.data;
        if (emptyResponse.includes(data) || emptyResponse.includes(data.error)) {
            throw new Error('Entity not found for this request.');
        }

        setEntity(data);
    } catch (e: any) {
        setError(e.message);
        throw e;
    } finally {
        setTimeout(() => setIsLoading(false), 300);
    }
  };

  return (
      <HomeLayout>
          {isLoading ? (
              <Loader/>
          ) : (
              <div>
                  <h2 className='uppercase mb-8'>Latest blocks</h2>

                  {error !== '' ? <p className='text-xl text-red-600'>{error}</p> : (<>
                     <div className='md:text-lg text-base'>
                         <JSONPretty id="json-pretty" data={entity} />
                     </div>
                  </>)}
              </div>
          )}
      </HomeLayout>
  );
};

export default EntitySearch;