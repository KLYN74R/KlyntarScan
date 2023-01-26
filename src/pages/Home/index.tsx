import React from 'react';
import { HomeLayout } from '../../layouts';

const Home: React.FC = () => {
  return (
    <HomeLayout>
      <div className='lg:hidden block md:text-lg text-base'>
        Click &quot;Your Way to Explore&quot; to open the page navigation 👽
      </div>
    </HomeLayout>
  );
};

export default Home;