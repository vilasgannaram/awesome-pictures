import React from 'react';

import HeroSection from './heroSection/HeroSection';
// import List from './topics/List';
import Photos from './photos/Photos';
import logo from '../../assets/camera.gif';

const Home = () => {
  return (
    <div>
      <div className='my-3 ml-[10%] font-seoge'>
        <div className='flex items-center'>
          <img className='w-12' src={logo} alt='logo' />
          <h1 className='ml-3 text-xl font-semibold tracking-wide text-black_1 drop-shadow-md'>
            awesome pictures
          </h1>
        </div>
      </div>
      <HeroSection />
      {/* <List /> */}
      <Photos />
    </div>
  );
};

export default Home;
