import React, { useEffect, useState } from 'react';
import { api } from '../../utils/axios';
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
          await api.get('get_symbiote_info')
              .then(response => setSymbioteData(response.data))
              .catch(e => { throw e })
              .finally(() => setIsLoading(false));
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