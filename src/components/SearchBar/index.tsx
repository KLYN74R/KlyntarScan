import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/axios';
import { ENDPOINTS } from '../../types/endpoints';
import cls from 'classnames';
import styles from './style.module.css';

type Props = {
    isMobile?: boolean;
}

const SearchBar: React.FC<Props> = ({ isMobile }) => {
  const [query, setQuery] = useState('');
  const [entity, setEntity] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChangeQuery = (e: any) => setQuery(e.target.value);

  const handleSubmitSearch = async () => {
      if (query !== '') {
          await requestData(query).then(() => {
              navigate('/entity_search', { state: { entity } });
          });
      }
  }

  const requestData = async (query: string) => {
      setEntity({});
      setIsLoading(true);
      setError('');
      try {
          const responses: any = await Promise.all(
              [
                  await api.get(ENDPOINTS.REQUEST_ACCOUNT + `/${query}`),
                  await api.get(ENDPOINTS.REQUEST_BLOCK_BY_ID + `/${query}`),
                  await api.get(ENDPOINTS.REQUEST_BLOCK_BY_RID + `/${query}`),
                  await api.get(ENDPOINTS.REQUEST_EVENT_RECEIPT + `/${query}`),
                  await api.get(ENDPOINTS.REQUEST_SUPER_FINALIZATION_PROOF + `/${query}`),
                  await api.get(ENDPOINTS.REQUEST_SUBCHAIN_SKIP_PROOF + `/${query}`),
              ]
          );

          let found = false;
          responses.forEach((response: any) => {
            if (typeof response.data === 'object' && Object.keys(response.data).length > 1) {
                setEntity(response.data);
                found = true;
            }
            return;
          });

          if (!found) {
              throw new Error('Entity not found for this request.');
          }
      } catch (e) {
          setError('Entity not found for this request.')
          throw e;
      } finally {
          setIsLoading(false);
      }
  };

  return (
      <>
          {!isMobile ? (
              <>
                  <div className={cls(styles.searchBar, ' flex justify-center items-center')}>
                      <input
                          type='text'
                          maxLength={1000}
                          minLength={1}
                          placeholder='Find by:    symbioteID   |   blockid   |   RID   |   txid   |   mutationid   |   alias'
                          onChange={handleChangeQuery}
                      />
                      <button
                          className={styles.cybrBtn}
                          onClick={handleSubmitSearch}
                          disabled={isLoading}
                      >
                          Find<span aria-hidden>_</span>
                          <span aria-hidden className={styles.cybrBtn__glitch}>Event</span>
                          <span aria-hidden className={styles.cybrBtn__tag}>KLY</span>
                      </button>
                  </div>
                  {error !== '' && (
                      <div className='mt-10 px-20'>
                          <span className={cls(styles.error, 'text-red-600')}>{error}</span>
                      </div>
                  )}
              </>
          ) : (
              <>
                  <div className={cls(styles.searchBar, styles.searchBarMobile, ' flex flex-col justify-center items-center')}>
                      <input
                          type='text'
                          maxLength={1000}
                          minLength={1}
                          placeholder='Find by any entity ID'
                          onChange={handleChangeQuery}
                      />
                      <button
                          className={styles.cybrBtn}
                          onClick={handleSubmitSearch}
                          disabled={isLoading}
                      >
                          Find<span aria-hidden>_</span>
                          <span aria-hidden className={styles.cybrBtn__glitch}>Event</span>
                          <span aria-hidden className={styles.cybrBtn__tag}>KLY</span>
                      </button>
                  </div>
                  {error !== '' && (
                      <div className='mt-10'>
                          <span className={cls(styles.error, 'text-red-600 text-base')}>{error}</span>
                      </div>
                  )}
              </>
          )}
      </>
  );
};

export default SearchBar;