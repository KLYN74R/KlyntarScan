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
        setEntityContent(generateContent(data.responseType,data.data));
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
                    
                    <p>
                        <span className='text-red-600 font-bold'>ID:</span><span className='font-mono font-bold'>{entity.id}</span>
                    </p>
                    <p className='mt-3'>
                    <span className='text-red-600 font-bold'>Block ID:</span><span className='pl-1 font-mono'>{entity.blockID}</span>
                    </p>
                    <p className='mt-3'>
                        <span className='text-red-600 font-bold'>Is OK:</span><span className='pl-1 font-mono'>{entity.isOk ? 'true' : 'false'}</span>
                    </p>
                </div>
            break;
        case ENTITIES.BLOCK_BY_ID:
            content = <div className='bg-slate-50 md:p-8 p-4 overflow-x-auto'>
                
                <p>
                    <span className='text-red-600 font-bold'>Index:</span><span className='font-mono font-bold'>{entity.index}</span>
                </p>
                <p className='mt-3'>
                    <span className='text-red-600 font-bold'>Creator:</span><span className='pl-1 font-mono'>{entity.creator}</span>
                </p>
                <p className='mt-3'>
                    <span className='text-red-600 font-bold'>PrevHash:</span><span className='pl-1 font-mono'>{entity.prevHash}</span>
                </p>
                <p className='mt-3'>
                    <span className='text-red-600 font-bold'>Signature:</span><span className='pl-1 font-mono'>{entity.sig}</span>
                </p>
                <p className='mt-3'>
                    <span className='text-red-600 font-bold'>Published at:</span><span className='pl-1 font-mono'>{moment(entity.time).utc().format('hh:mm A MM/DD/YYYY')} UTC+0</span>
                </p>
                <div className='mt-3'>
                    <span className='text-red-600 font-bold'>Events:</span><span className='pl-1 font-mono'>{entity.events.length}</span>
                    {entity.events.length > 0 && (<>
                        <div className='mt-1'>
                            <JSONPretty id='json-pretty' data={entity.events}/>
                        </div>
                    </>)}
                </div>
            </div>
            break;
        case ENTITIES.BLOCK_BY_GRID:
            content = <div className='bg-slate-50 md:p-8 p-4 overflow-x-auto'>
                
                <p>
                    <span className='text-red-600 font-bold'>Index:</span><span className='font-mono'>{entity.index}</span>
                </p>
                <p className='mt-3'>
                    <span className='text-red-600 font-bold'>Creator:</span><span className='pl-1 font-mono'>{entity.creator}</span>
                </p>
                <p className='mt-3'>
                    <span className='text-red-600 font-bold'>PrevHash:</span><span className='pl-1 font-mono'>{entity.prevHash}</span>
                </p>
                <p className='mt-3'>
                    <span className='text-red-600 font-bold'>Signature:</span><span className='pl-1 font-mono'>{entity.sig}</span>
                </p>
                <p className='mt-3'>
                    <span className='text-red-600 font-bold'>Published at:</span><span className='pl-1 font-mono'>{moment(entity.time).utc().format('hh:mm A MM/DD/YYYY')} UTC+0</span>
                </p>
                <div className='mt-3'>
                    <span className='text-red-600 font-bold'>Events:</span><span className='pl-1 font-mono'>{entity.events.length}</span>
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
                
                <p>
                    <span className='text-red-600 font-bold'>Block ID:</span><span className='font-mono font-bold'>{entity.blockID}</span>
                </p>
                <p className='mt-3'>
                    <span className='text-red-600 font-bold'>Block Hash:</span><span className='pl-1 font-mono'>{entity.blockHash}</span>
                </p>
                <p className='mt-3'>
                    <span className='text-red-600 font-bold'>Aggregated Pub:</span><span className='pl-1 font-mono'>{entity.aggregatedPub}</span>
                </p>
                <p className='mt-3'>
                    <span className='text-red-600 font-bold'>Aggregated Signature:</span><span className='pl-1 font-mono'>{entity.aggregatedSignature}</span>
                </p>
                <div className='mt-3'>
                    <span className='text-red-600 font-bold'>AFK Voters:</span><span className='pl-1 font-mono'>{entity.afkVoters.length}</span>
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
                
                <p>
                    <span className='text-red-600 font-bold'>Index:</span><span className='font-mono font-bold'>{entity.index}</span>
                </p>
                <p className='mt-3'>
                    <span className='text-red-600 font-bold'>Hash:</span><span className='pl-1 font-mono'>{entity.hash}</span>
                </p>
                <p className='mt-3'>
                    <span className='text-red-600 font-bold'>Subchain:</span><span className='pl-1 font-mono'>{entity.subchain}</span>
                </p>
                <p className='mt-3'>
                    <span className='text-red-600 font-bold'>Aggregated Pub:</span><span className='pl-1 font-mono'>{entity.aggregatedPub}</span>
                </p>
                <p className='mt-3'>
                    <span className='text-red-600 font-bold'>Aggregated Signature:</span><span className='pl-1 font-mono'>{entity.aggregatedSignature}</span>
                </p>
                <div className='mt-3'>
                    <span className='text-red-600 font-bold'>AFK Voters:</span><span className='pl-1 font-mono'>{entity.afkVoters.length}</span>
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

                <h2 style={{textAlign:'center'}} className='uppercase mb-8 text-red-600'><b>Result</b></h2>

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