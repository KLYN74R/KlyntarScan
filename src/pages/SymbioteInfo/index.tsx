import React, { useEffect, useState } from 'react';
import { api } from '../../utils/axios';
import { ENDPOINTS } from '../../types/endpoints';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/1337.css';

import { HomeLayout } from '../../layouts';
import Loader from '../../components/ui/Loader';

const SymbioteInfo: React.FC = () => {
  const [symbioteData, setSymbioteData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<null|string>(null);

  useEffect(() => {
      setIsLoading(true);
      (async () => {
          await api.get(ENDPOINTS.SYMBIOTE_INFO)
              .then(response => setSymbioteData(response.data))
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
                  <h2 className='uppercase mb-8'>current symbiote info</h2>
                  <div className='text-base'>
                      <JSONPretty id="json-pretty" data={symbioteData} />
                      {isError && <p className='text-xl text-red-600'>Connection failed.</p>}
                  </div>
              </div>
          )}
      </HomeLayout>
  );
};

export default SymbioteInfo;