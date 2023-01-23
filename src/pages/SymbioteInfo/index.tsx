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

  useEffect(() => {
      setIsLoading(true);
      (async () => {
          await api.get(ENDPOINTS.SYMBIOTE_INFO)
              .then(response => setSymbioteData(response.data))
              .catch(e => { throw e })
              .finally(() => setTimeout(() => setIsLoading(false), 300));
      })();
  }, []);

  return (
      <HomeLayout>
          {isLoading ? (
              <Loader/>
          ) : (
              <div>
                  <JSONPretty id="json-pretty" data={symbioteData}></JSONPretty>
              </div>
          )}
      </HomeLayout>
  );
};

export default SymbioteInfo;