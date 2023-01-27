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
                    TIMESTAMP: new Date(response.data.TIMESTAMP).toUTCString(),
                    TX: response.data.TX
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
                <h2 className='uppercase mb-8'>Latest checkpoint stats</h2>

                {isError ? <p className='text-xl text-red-600'>Connection failed.</p> : <div>
                    {checkpointData && (
                        <div className='bg-slate-50 md:p-8 p-4 overflow-x-auto md:text-lg text-base'>
                            <h3 className='text-xl text-red-600 italic mb-4'>Header</h3>

                            <p>
                                <span>INDEX: <span className='pl-1 font-mono text-xl'>{checkpointData.ID}</span></span>
                                {/*{checkpointData.ID === -1 && (<span className='text-blue-600 italic ml-2'>(genesis)</span>)}*/}
                            </p>

                            <p className='mt-3'>
                                <span>PAYLOAD HASH: <span className='pl-1 font-mono'>{checkpointData.PAYLOAD_HASH}</span></span>
                                {checkpointData.PAYLOAD_HASH === '' && (<>
                                    <span className='text-blue-600 italic'>(genesis)</span>
                                </>)}
                            </p>

                            <p className='mt-3'>
                                <span>AFK SIGNERS: </span>
                                {checkpointData.AFK_VALIDATORS.length === 0 ? (<>
                                    <span className='font-mono'>[]</span>
                                    <span className='text-blue-600 italic ml-2'>(genesis)</span>
                                </>) : (
                                    <div>
                                        [
                                        <ul>
                                            {checkpointData.AFK_VALIDATORS.map((validator: string, idx: number) => (
                                                <li key={idx} className='font-mono ml-3 mt-2 first:mt-0'>{validator}</li>
                                            ))}
                                        </ul>
                                        ]
                                    </div>
                                )}
                            </p>

                            <p className='mt-3'>
                                <span>PUBLISHED AT: <span className='pl-1 font-mono'>{checkpointData.TIMESTAMP}</span></span>
                            </p>

                            <p className='mt-3'>
                                <span>VIA TX: <span className='pl-1 font-mono'>{checkpointData.TX}</span></span>
                            </p>

                            <p className='mt-3'>
                                <span className='italic text-blue-600'>AGGREGATED DATA OF QUORUM</span>
                            </p>

                            <p className='mt-3'>
                                <span>PUBLIC KEY: <span className='pl-1 font-mono'>{checkpointData.QUORUM_AGGREGATED_SIGNERS_PUBKEY}</span></span>
                                {checkpointData.QUORUM_AGGREGATED_SIGNERS_PUBKEY === '' && (<>
                                    <span className='text-blue-600 italic'>(genesis)</span>
                                </>)}
                            </p>

                            <p className='mt-3'>
                                <span>SIGNATURE: <span className='pl-1 font-mono'>{checkpointData.QUORUM_AGGREGATED_SIGNATURE}</span></span>
                                {checkpointData.QUORUM_AGGREGATED_SIGNATURE === '' && (<>
                                    <span className='text-blue-600 italic'>(genesis)</span>
                                </>)}
                            </p>

                            <h3 className='text-xl text-red-600 italic mt-8 mb-4'>Payload info</h3>

                            <p>
                                <span>PREVIOUS PAYLOAD CHECKPOINT HASH: <span className='pl-1 font-mono'>{checkpointData.PREV_CHECKPOINT_PAYLOAD_HASH}</span></span>
                                {checkpointData.PREV_CHECKPOINT_PAYLOAD_HASH === '' && (<>
                                    <span className='text-blue-600 italic ml-2'>(genesis)</span>
                                </>)}
                            </p>

                            <div className='mt-3'>
                                <span>SPECIAL OPERATIONS: </span>
                                <JSONPretty id="json-pretty-1" className='mt-3' data={{
                                    OPERATIONS: checkpointData.OPERATIONS
                                }} />
                            </div>

                            <div className='mt-3'>
                                <span>HIVEMIND DATA: </span>
                                <JSONPretty id="json-pretty-2" className='mt-3' data={{
                                    OTHER_SYMBIOTES: checkpointData.OTHER_SYMBIOTES
                                }} />
                            </div>

                            <div className='mt-3'>
                                <span>SUBCHAINS METADATA: </span>
                                <JSONPretty id="json-pretty-3" className='mt-3' data={{
                                    SUBCHAINS_METADATA: checkpointData.SUBCHAINS_METADATA
                                }} />
                            </div>
                        </div>
                    )}
                </div>}
            </div>
        )}
    </HomeLayout>
  );
};

export default CheckpointStats;