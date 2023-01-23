import React, { useState } from 'react';
import cls from 'classnames';
import styles from './style.module.css';

import { NavLink } from 'react-router-dom';
import arrowDown from '../../../assets/img/icons/arrow-down.png';

const navigation = [
    {
        title: 'checkpoint stAts',
        path: '/latest_checkpoint'
    },
    {
        title: 'lAtest trAnsActions',
        path: '/latest_transaction'
    },
    {
        title: 'lAtest blocks',
        path: '/latest_blocks'
    },
    {
        title: 'symbiote info',
        path: '/symbiote_info'
    },
];

const Navigation: React.FC = () => {
    const [isOpened, setIsOpened] = useState(false);
    const handleToggleMenu = () => setIsOpened(isOpened => !isOpened);

    return (
      <nav className={cls(styles.navigation, 'md:mt-16 mt-10 md:mb-20 mb-10')}>

          <div className='lg:block hidden'>
              <h2 className='block text-center text-xl text-green-600'>choose a wAy to work</h2>
              <hr className='mt-8 mb-8'/>

              <ul className='flex justify-between items-center'>
                  {navigation.map((item, idx) => (
                      <li key={idx}>
                          <NavLink
                              to={item.path}
                              className={({ isActive }) => isActive ? styles.activeLink : undefined}
                          >
                              {item.title}
                          </NavLink >
                      </li>
                  ))}
              </ul>
          </div>

          {/*Mobile*/}

          <div className='lg:hidden block'>
              <div
                  className='flex justify-center items-center cursor-pointer'
                  onClick={handleToggleMenu}
              >
                  <h2 className='block text-center text-xl text-green-600 mr-5'>choose a wAy to work</h2>
                  <img
                      src={arrowDown}
                      alt='open'
                      width={25}
                      className={cls(styles.openIcon, isOpened ? styles.openIconActive : '')}
                  />
              </div>
              <hr className='mt-8'/>

              {isOpened && (
                  <ul className='flex flex-col items-center mt-8'>
                      {navigation.map((item, idx) => (
                          <li key={idx} className='mb-8'>
                              <NavLink
                                  to={item.path}
                                  className={({ isActive }) => isActive ? styles.activeLink : undefined}
                                  end
                              >
                                  {item.title}
                              </NavLink >
                          </li>
                      ))}
                  </ul>
              )}
          </div>

      </nav>
  );
};

export default Navigation;