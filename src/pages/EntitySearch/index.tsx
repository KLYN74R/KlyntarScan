import React, { useEffect, useState } from 'react';
import { useSearchParams  } from 'react-router-dom';
import { api } from '../../utils/axios';
import { emptyResponse } from '../../types/endpoints';

import { HomeLayout } from '../../layouts';
import { ENTITIES, getEndpointByEntityType } from '../../types/entities';
import Loader from '../../components/ui/Loader';
import JSONPretty from 'react-json-pretty';

const EntitySearch: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [entityContent, setEntityContent] = useState(<div>No data.</div>);
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
    setEntityContent(<div>No data.</div>);

    try {
        const response = await api.get(endpoint + '/' + getQueryParam(responseType, query));

        const data = response.data;
        if (emptyResponse.includes(data) || emptyResponse.includes(data.error)) {
            throw new Error('Entity not found for this request.');
        }

        setEntityContent(generateContent(responseType, data));
    } catch (e: any) {
        setError(e.message);
        throw e;
    } finally {
        setTimeout(() => setIsLoading(false), 300);
    }
  };

  const getQueryParam = (responseType: string, initial: string) => {
      let queryParam;

      switch (responseType) {
          case ENTITIES.BLOCK_BY_RID:
              queryParam = initial.split(':')[1];
              break;
          default:
              queryParam = initial;
              break;
      }

      return queryParam;
  }

  const generateContent = (responseType: string, entity: any) => {
    let content;

    switch (responseType) {
        case ENTITIES.EVENT_RECEIPT:
            content = <div className='bg-slate-50 md:p-8 p-4 overflow-x-auto'>
                    <h3 className='text-xl text-red-600 italic mb-4'>DATA</h3>
                    <p>
                        <span>ID: <span className='pl-1 font-mono text-xl'>{entity.id}</span></span>
                    </p>
                    <p className='mt-3'>
                        <span>Block ID: <span className='pl-1 font-mono'>{entity.blockID}</span></span>
                    </p>
                    <p className='mt-3'>
                        <span>Is OK: <span className='pl-1 font-mono'>{entity.isOk ? 'true' : 'false'}</span></span>
                    </p>
                </div>
            break;
        case ENTITIES.BLOCK_BY_RID:
            content = <div className='bg-slate-50 md:p-8 p-4 overflow-x-auto'>
                <h3 className='text-xl text-red-600 italic mb-4'>DATA</h3>
                <p>
                    <span>Index: <span className='pl-1 font-mono text-xl'>{entity.index}</span></span>
                </p>
                <p className='mt-3'>
                    <span>Creator: <span className='pl-1 font-mono'>{entity.creator}</span></span>
                </p>
                <p className='mt-3'>
                    <span>PrevHash: <span className='pl-1 font-mono'>{entity.prevHash}</span></span>
                </p>
                <p className='mt-3'>
                    <span>Sig: <span className='pl-1 font-mono'>{entity.sig}</span></span>
                </p>
                <div className='mt-3'>
                    <span><span>Events:</span> <span className='pl-1 font-mono'>{entity.events.length}</span></span>
                    {entity.events.length > 0 && (<>
                        <div className='mt-1'>
                            <JSONPretty id='json-pretty' data={entity.events}/>
                        </div>
                    </>)}
                </div>
            </div>
            break;
        default:
            content = <div className='bg-slate-50 md:p-8 p-4 overflow-x-auto'>
                <h3 className='text-xl text-red-600 italic mb-4'>DATA</h3>
                <JSONPretty id="json-pretty" data={entity} />
            </div>
            break;
    }

    return content;
  }

  return (
      <HomeLayout>
          {isLoading ? (
              <Loader/>
          ) : (
              <div>
                  <h2 className='uppercase mb-8'>{responseType.replaceAll('_', ' ')}</h2>

                  {error !== '' ? <p className='text-xl text-red-600'>{error}</p> : (<>
                     <div className='md:text-lg text-base'>
                         {entityContent}
                     </div>
                  </>)}
              </div>
          )}
      </HomeLayout>
  );
};

export default EntitySearch;