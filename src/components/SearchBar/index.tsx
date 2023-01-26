import React, { useEffect, useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { api } from '../../utils/axios';
import { ENDPOINTS } from '../../types/endpoints';
import { ENTITIES } from '../../types/entities';
import cls from 'classnames';
import styles from './style.module.css';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [entityType, setEntityType] = useState(ENTITIES.EMPTY);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChangeQuery = (e: any) => setQuery(e.target.value);
  const handleEnterInput = (e: any) => e.key === 'Enter' && handleSubmitSearch();

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
          setTimeout(() => setIsLoading(false), 300);
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
          <div className={cls(styles.searchBar, ' flex flex-row justify-center items-center')}>
              <input
                  type='text'
                  maxLength={1000}
                  minLength={1}
                  placeholder={'Find by any ID:    symbioteID   |   blockid   |   RID   |   txid   |   mutationid   |   alias'}
                  onChange={handleChangeQuery}
                  onKeyDown={handleEnterInput}
              />
              <button
                  className={styles.cybrBtn}
                  onClick={handleSubmitSearch}
                  disabled={isLoading}
              >
                  {!isLoading ? 'Find' : 'Wait'}<span aria-hidden>_</span>
                  <span aria-hidden className={styles.cybrBtn__glitch}>Event</span>
                  <span aria-hidden className={styles.cybrBtn__tag}>KLY</span>
              </button>
          </div>
          {error !== '' && (
              <div className={cls(styles.errorWrapper, 'mt-10')}>
                  <span className={cls(styles.error, 'text-red-600')}>{error}</span>
              </div>
          )}
      </>
  );
};

export default SearchBar;