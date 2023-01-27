import React, { useEffect, useState } from 'react';
import { api } from '../../utils/axios';
import { ENDPOINTS } from '../../types/endpoints';
import moment from 'moment';

import { HomeLayout } from '../../layouts';
import Loader from '../../components/ui/Loader';
import LoadMoreBtn from '../../components/ui/LoadMoreBtn';
import EyeIcon from '../../assets/img/icons/eye.png';
import JSONPretty from 'react-json-pretty';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const numberOfBlocks = 25;

const LatestBlocks: React.FC = () => {
    const [blocks, setBlocks] = useState<Array<any>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [isError, setIsError] = useState<null|string>(null);

    useEffect(() => {
        setIsLoading(true);
        (async () => await initBlocks())();
    }, []);

    const initBlocks = async () => {
        try {
            const response = await api.get(ENDPOINTS.LATEST_BLOCK_ID);
            await getBlocks(response.data.RID);
        } catch (e) {
            setIsError('Connection failed');
            throw e;
        } finally {
            setTimeout(() => setIsLoading(false), 300);
        }
    }

    const getBlocks = async (lastBlockId: number) => {
        const response = await api.get(ENDPOINTS.GET_LATEST_BLOCKS + `/${lastBlockId}/${numberOfBlocks}`);
        setBlocks(() => [...blocks, ...response.data]);
    }

    const handleLoadNextBlocks = async () => {
        if (blocks.length > 0) {
            setIsUpdating(true);
            await getBlocks(blocks[blocks.length - 1].rid - 1)
                .catch(e => { throw e })
                .finally(() => setTimeout(() => setIsUpdating(false), 150));
        }
    }

    const lastBlockShowed = blocks.length > 0 && blocks[blocks.length - 1].rid === 0;

    const showEventsDetails = (e: any) => {
        const btn = e.target;
        const div = btn.parentNode;
        div.querySelector('div').classList.toggle('hidden');
        btn.textContent = 'close';
    }

    const openBlockDetails = (block: any) => {
        MySwal.fire({
            title: <strong className='text-xl'>Block #{block.rid}</strong>,
            html: <div className='text-left text-black text-base'>
                <p className='mt-3'>
                    <span><span className='text-red-600'>Hash:</span> <span className='pl-1 font-mono'>{block.hash}</span></span>
                </p>
                <p className='mt-3'>
                    <span><span className='text-red-600'>Subchain (pool):</span> <span className='pl-1 font-mono'>{block.creator}</span></span>
                </p>
                <p className='mt-3'>
                    <span><span className='text-red-600'>Subchain index:</span> <span className='pl-1 font-mono'>{block.index}</span></span>
                </p>
                <div className='mt-3'>
                    <span><span className='text-red-600'>Events:</span> <span className='pl-1 font-mono'>{block.events.length}</span></span>
                    {block.events.length > 0 && (<>
                       <span
                           onClick={showEventsDetails}
                           className='inline-block ml-3 underline cursor-pointer'
                       >open</span>
                        <div className='mt-1 hidden'>
                            <JSONPretty id='json-pretty' data={block.events}/>
                        </div>
                    </>)}
                </div>
                <p className='mt-3'>
                    <span><span className='text-red-600'>Published at:</span> <span className='pl-1 font-mono'>{moment(block.time).utc().format('hh:mm A MM/DD/YYYY')} UTC+0</span></span>
                </p>
            </div>,
            icon: 'info',
            cancelButtonText: 'Dismiss',
            showCancelButton: true,
            showConfirmButton: false
        })
    }

    return (
        <HomeLayout>
            {isLoading ? (
                <Loader/>
            ) : (
                <div>
                    <h2 className='uppercase mb-8'>Latest blocks</h2>

                    {isError ? <p className='text-base text-red-600'>Connection failed.</p> : (<>
                        <div className='relative overflow-x-auto bg-slate-50 pb-5'>
                            <table
                                className="table-fixed w-full text-sm text-left"
                                style={{ minWidth: 1075 }}
                            >
                                <thead className="text-red-600 uppercase bg-slate-50 border-b text-center">
                                    <tr>
                                        <th scope="col" className="px-3 py-4 w-1/12">Real<br/>index</th>
                                        <th scope="col" className="px-3 py-4 w-1/6">Hash</th>
                                        <th scope="col" className="px-3 py-4 w-1/6">Subchain (pool)</th>
                                        <th scope="col" className="px-0 py-4 w-1/12">Subchain index</th>
                                        <th scope="col" className="px-3 py-4 w-1/12">Events</th>
                                        <th scope="col" className="px-3 py-4 w-1/12">Age</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {blocks.map(block => (
                                    <tr
                                        key={block.rid}
                                        className="bg-slate-50 border-b last:border-0 font-mono text-gray-900 text-center"
                                        style={{ fontSize: 16 }}
                                    >
                                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap font-bold w-1/12">
                                            <div className='flex justify-center items-center'>
                                                <img
                                                    src={EyeIcon}
                                                    alt='open'
                                                    width={25}
                                                    className='block p-1 border border-slate-400 rounded mr-2 cursor-pointer'
                                                    onClick={() => openBlockDetails(block)}
                                                />
                                                <span className='block'>{block.rid}</span>
                                            </div>
                                        </th>
                                        <td className="px-3 py-4 whitespace-nowrap w-1/6 truncate">{block.hash}</td>
                                        <td className="px-6 py-4 whitespace-nowrap w-1/6 truncate">{block.creator}</td>
                                        <td className="px-6 py-4 whitespace-nowrap w-1/12">{block.index}</td>
                                        <td className="px-3 py-4 whitespace-nowrap w-1/12">{block.events.length}</td>
                                        <td className="px-3 py-4 whitespace-nowrap w-1/12 truncate">{moment(block.time).utc().fromNow(true)}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                        {!lastBlockShowed && (
                            <div className='flex justify-center p-20'>
                                {isUpdating ? (
                                    <Loader />
                                ) : (
                                    <LoadMoreBtn action={handleLoadNextBlocks} />
                                )}
                            </div>
                        )}
                    </>)}
                </div>
            )}
        </HomeLayout>
    );
}

export default LatestBlocks;