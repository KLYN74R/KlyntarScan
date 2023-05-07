import React, { useEffect, useState } from 'react';
import styles from './style.module.css';
import { api } from '../../utils/axios';
import { ENDPOINTS } from '../../types/endpoints';
import moment from 'moment/moment';
import { v4 as uuidv4 } from 'uuid';
import JSONPretty from 'react-json-pretty';

import { HomeLayout } from '../../layouts';
import Loader from '../../components/ui/Loader';
import EyeIcon from '../../assets/img/icons/eye.png';
import LoadMoreBtn from '../../components/ui/LoadMoreBtn';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const numberOfBlocks = 25;

const LatestTransactions: React.FC = () => {
    const [blocks, setBlocks] = useState<Array<any>>([]);
    const [transactions, setTransactions] = useState<Array<any>>([]);
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
            await getBlocks(response.data.GRID);
        } catch (e) {
            setIsError('Connection failed');
            throw e;
        } finally {
            setTimeout(() => setIsLoading(false), 300);
        }
    }

    const getBlocks = async (lastBlockId: number) => {
        const response = await api.get(ENDPOINTS.GET_LATEST_BLOCKS + `/${lastBlockId}/${numberOfBlocks}`);
        const newBlocks = response.data;
        setBlocks(() => [...blocks, ...newBlocks]);
        saveTransactions(newBlocks);
    }

    const handleLoadNextBlocks = async () => {
        if (blocks.length > 0) {
            setIsUpdating(true);
            await getBlocks(blocks[blocks.length - 1].grid - 1)
                .catch(e => { throw e })
                .finally(() => setTimeout(() => setIsUpdating(false), 150));
        }
    }

    const saveTransactions = (blocks: Array<any>) => {
        const txs: Array<any> = [];
        blocks.forEach((block: any) => {
            txs.push(...block.transactions.map((transaction: any) => {
                return {
                    ...transaction,
                    grid: block.grid,
                    time: block.time,
                    id: uuidv4()
                }
            }))
        });
        setTransactions(() => [...transactions, ...txs]);
    }

    const lastBlockShowed = blocks.length > 0 && blocks[blocks.length - 1].grid === 0;

    const openTransactionDetails = (transaction: any) => {
        MySwal.fire({
            title: <strong className='text-xl leading-normal'>Transaction<br/>in Block #{transaction.grid}</strong>,
            html: <div className='text-left text-black text-base'>
                <p className='mt-3'>
                    <span><span className='text-red-600'>Creator:</span> <span className='pl-1 font-mono'>{transaction.creator}</span></span>
                </p>
                <p className='mt-3'>
                    <span><span className='text-red-600'>Type:</span> <span className='pl-1 font-mono'>{transaction.type}</span></span>
                </p>
                <p className='mt-3'>
                    <span><span className='text-red-600'>Published at:</span> <span className='pl-1 font-mono'>{moment(transaction.time).utc().format('hh:mm A MM/DD/YYYY')} UTC+0</span></span>
                </p>
                <div className='mt-3'>
                    <span><span className='text-red-600'>Payload:</span></span>
                    <JSONPretty id="json-pretty" data={transaction.payload} className='mt-2' />
                </div>
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
                    <h2 className='uppercase mb-8'>Latest transactions</h2>
                    {blocks.length > 0 && (
                        <h2 className='uppercase mb-8 text-red-600'>
                            Blocks: <span className='text-black'>{blocks[0].grid} - {blocks[blocks.length - 1].grid}</span>
                        </h2>
                    )}

                    {isError ? <p className='text-base text-red-600'>Connection failed.</p> : (<>
                        <div className='relative overflow-x-auto bg-slate-50 pb-5'>
                            <table
                                className="table-fixed w-full text-sm text-left"
                                style={{ minWidth: 1075 }}
                            >
                                <thead className="text-red-600 uppercase bg-slate-50 border-b text-center">
                                <tr>
                                    <th scope="col" className="px-3 py-4 w-1/5">In block</th>
                                    <th scope="col" className="px-3 py-4 w-1/5">Creator</th>
                                    <th scope="col" className="px-3 py-4 w-1/5">Type</th>
                                    <th scope="col" className="px-0 py-4 w-1/5">Age</th>
                                    <th scope="col" className="px-3 py-4 w-1/5">Payload</th>
                                </tr>
                                </thead>
                                <tbody>
                                {transactions.map(transaction => (
                                    <tr
                                        key={transaction.id}
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
                                                    onClick={() => openTransactionDetails(transaction)}
                                                />
                                                <span className='block'>{transaction.grid}</span>
                                            </div>
                                        </th>
                                        <td className="px-3 py-4 whitespace-nowrap w-1/5 truncate">{transaction.creator}</td>
                                        <td className="px-6 py-4 whitespace-nowrap w-1/5 truncate">{transaction.type}</td>
                                        <td className="px-6 py-4 whitespace-nowrap w-1/5">{moment(transaction.time).utc().fromNow()}</td>
                                        <td className="px-3 py-4 whitespace-nowrap w-1/5">
                                            <button
                                                className={styles.openToSeeBtn}
                                                onClick={() => openTransactionDetails(transaction)}
                                            >show</button>
                                        </td>
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
};

export default LatestTransactions;