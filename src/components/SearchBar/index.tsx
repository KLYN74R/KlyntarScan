import React, { useEffect, useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { api } from '../../utils/axios';
import { ENDPOINTS } from '../../types/endpoints';
import { ENTITIES } from '../../types/entities';
import cls from 'classnames';
import styles from './style.module.css';

type Props = {
    isMobile?: boolean;
}

const SearchBar: React.FC<Props> = ({ isMobile }) => {
  const [query, setQuery] = useState('');
  const [entityType, setEntityType] = useState(ENTITIES.EMPTY);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChangeQuery = (e: any) => setQuery(e.target.value);

  const handleSubmitSearch = async () => query !== '' ? await requestData(query) : undefined;

  const requestData = async (query: string) => {
      setIsLoading(true);
      setError('');

      try {
          const response = await api.get(ENDPOINTS.GET_SEARCH_RESULT + '/' + query);
          const data = response.data;

          if (data.data === ENTITIES.EMPTY) {
              throw new Error('Entity not found for this request.');
          }

          setEntityType(data.responseType);
      } catch (e: any) {
          setError(e.message);
          throw e;
      } finally {
          setIsLoading(false);
      }
  };

  useEffect(() => {
      if (entityType !== ENTITIES.EMPTY) {
          navigate({
              pathname: '/entity_search',
              search: `?${createSearchParams({ type: entityType, query })}`
          });
      }
  }, [entityType]);

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