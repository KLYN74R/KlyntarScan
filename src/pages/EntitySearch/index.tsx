import React, { useEffect, useState } from 'react';
import { useSearchParams  } from 'react-router-dom';
import { api } from '../../utils/axios';
import { ENDPOINTS } from '../../types/endpoints';
import { ENTITIES } from '../../types/entities';
import moment from 'moment/moment';

import { HomeLayout } from '../../layouts';
import Loader from '../../components/ui/Loader';
import JSONPretty from 'react-json-pretty';

const EntitySearch: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [responseType, setResponseType] = useState(ENTITIES.EMPTY);
  const [entityContent, setEntityContent] = useState(<div>No data.</div>);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const query = searchParams.get('query') || '';

  useEffect(() => {
      (async () => {
          await requestEntity();
      })();
  }, [query]);

  const requestEntity = async () => {
    setIsLoading(true);
    setError('');
    setEntityContent(<div>No data.</div>);

    try {
        const response = await api.get(ENDPOINTS.GET_SEARCH_RESULT + '/' + query);
        const data = response.data;

        if (data.data === ENTITIES.EMPTY) {
            throw new Error('Entity not found for this request.');
        }

        setResponseType(data.responseType);
        setEntityContent(generateContent(data.responseType, data.data));
    } catch (e: any) {
        setError(e.message);
        throw e;
    } finally {
        setTimeout(() => setIsLoading(false), 300);
    }
  };

  const generateContent = (responseType: string, entity: any) => {
    let content;

    switch (responseType) {
        case ENTITIES.EVENT_RECEIPT:
            content = <div className='bg-slate-50 md:p-8 p-4 overflow-x-auto'>
                    <h3 className='text-red-600 italic mb-4'>DATA</h3>
                    <p>
                        <span>ID: <span className='font-mono font-bold'>{entity.id}</span></span>
                    </p>
                    <p className='mt-3'>
                        <span>Block ID: <span className='pl-1 font-mono'>{entity.blockID}</span></span>
                    </p>
                    <p className='mt-3'>
                        <span>Is OK: <span className='pl-1 font-mono'>{entity.isOk ? 'true' : 'false'}</span></span>
                    </p>
                </div>
            break;
        case ENTITIES.BLOCK_BY_ID:
            content = <div className='bg-slate-50 md:p-8 p-4 overflow-x-auto'>
                <h3 className='text-red-600 italic mb-4'>DATA</h3>
                <p>
                    <span>Index: <span className='font-mono font-bold'>{entity.index}</span></span>
                </p>
                <p className='mt-3'>
                    <span>Creator: <span className='pl-1 font-mono'>{entity.creator}</span></span>
                </p>
                <p className='mt-3'>
                    <span>PrevHash: <span className='pl-1 font-mono'>{entity.prevHash}</span></span>
                </p>
                <p className='mt-3'>
                    <span>Signature: <span className='pl-1 font-mono'>{entity.sig}</span></span>
                </p>
                <p className='mt-3'>
                    <span>Published at: <span className='pl-1 font-mono'>{moment(entity.time).utc().format('hh:mm A MM/DD/YYYY')} UTC+0</span></span>
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
        case ENTITIES.BLOCK_BY_RID:
            content = <div className='bg-slate-50 md:p-8 p-4 overflow-x-auto'>
                <h3 className='text-red-600 italic mb-4'>DATA</h3>
                <p>
                    <span>Index: <span className='font-mono font-bold'>{entity.index}</span></span>
                </p>
                <p className='mt-3'>
                    <span>Creator: <span className='pl-1 font-mono'>{entity.creator}</span></span>
                </p>
                <p className='mt-3'>
                    <span>PrevHash: <span className='pl-1 font-mono'>{entity.prevHash}</span></span>
                </p>
                <p className='mt-3'>
                    <span>Signature: <span className='pl-1 font-mono'>{entity.sig}</span></span>
                </p>
                <p className='mt-3'>
                    <span>Published at: <span className='pl-1 font-mono'>{moment(entity.time).utc().format('hh:mm A MM/DD/YYYY')} UTC+0</span></span>
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
        case ENTITIES.SUPER_FINALIZATION_PROOF:
            content = <div className='bg-slate-50 md:p-8 p-4 overflow-x-auto'>
                <h3 className='text-red-600 italic mb-4'>DATA</h3>
                <p>
                    <span>Block ID: <span className='font-mono font-bold'>{entity.blockID}</span></span>
                </p>
                <p className='mt-3'>
                    <span>Block Hash: <span className='pl-1 font-mono'>{entity.blockHash}</span></span>
                </p>
                <p className='mt-3'>
                    <span>Aggregated Pub: <span className='pl-1 font-mono'>{entity.aggregatedPub}</span></span>
                </p>
                <p className='mt-3'>
                    <span>Aggregated Signature: <span className='pl-1 font-mono'>{entity.aggregatedSignature}</span></span>
                </p>
                <div className='mt-3'>
                    <span><span>AFK Voters:</span> <span className='pl-1 font-mono'>{entity.afkVoters.length}</span></span>
                    {entity.afkVoters.length > 0 && (<>
                        <div className='mt-1'>
                            <JSONPretty id='json-pretty' data={entity.afkVoters}/>
                        </div>
                    </>)}
                </div>
            </div>
            break;
        case ENTITIES.SKIP_STAGE_3:
            content = <div className='bg-slate-50 md:p-8 p-4 overflow-x-auto'>
                <h3 className='text-red-600 italic mb-4'>DATA</h3>
                <p>
                    <span>Index: <span className='font-mono font-bold'>{entity.index}</span></span>
                </p>
                <p className='mt-3'>
                    <span>Hash: <span className='pl-1 font-mono'>{entity.hash}</span></span>
                </p>
                <p className='mt-3'>
                    <span>Subchain: <span className='pl-1 font-mono'>{entity.subchain}</span></span>
                </p>
                <p className='mt-3'>
                    <span>Aggregated Pub: <span className='pl-1 font-mono'>{entity.aggregatedPub}</span></span>
                </p>
                <p className='mt-3'>
                    <span>Aggregated Signature: <span className='pl-1 font-mono'>{entity.aggregatedSignature}</span></span>
                </p>
                <div className='mt-3'>
                    <span><span>AFK Voters:</span> <span className='pl-1 font-mono'>{entity.afkVoters.length}</span></span>
                    {entity.afkVoters.length > 0 && (<>
                        <div className='mt-1'>
                            <JSONPretty id='json-pretty' data={entity.afkVoters}/>
                        </div>
                    </>)}
                </div>
            </div>
            break;
        default:
            content = <div className='bg-slate-50 md:p-8 p-4 overflow-x-auto'>
                <h3 className='text-red-600 italic mb-4'>DATA</h3>
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

                  {error !== '' ? <p className='text-red-600'>{error}</p> : (<>
                     <div className='text-base'>
                         {entityContent}
                     </div>
                  </>)}
              </div>
          )}
      </HomeLayout>
  );
};

export default EntitySearch;