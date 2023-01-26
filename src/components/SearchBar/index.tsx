import React, { useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import cls from 'classnames';
import styles from './style.module.css';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');

  const navigate = useNavigate();

  const handleChangeQuery = (e: any) => setQuery(e.target.value);
  const handleEnterInput = (e: any) => e.key === 'Enter' && handleSubmitSearch();

  const handleSubmitSearch = async () => {
      if (query !== '') {
          navigate({
              pathname: '/entity_search',
              search: `?${createSearchParams({ query })}`
          });
      }
  };

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
              >
                  Find<span aria-hidden>_</span>
                  <span aria-hidden className={styles.cybrBtn__glitch}>Event</span>
                  <span aria-hidden className={styles.cybrBtn__tag}>KLY</span>
              </button>
          </div>
      </>
  );
};

export default SearchBar;