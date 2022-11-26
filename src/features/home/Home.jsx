import React from 'react';

import HeroSection from './heroSection/HeroSection';
// import List from './topics/List';
import Photos from './photos/Photos';

const Home = () => {
  return (
    <div>
      <div className='mt-6 mb-12 ml-6 font-seoge text-2xl'>
        Awesome Pictures
      </div>
      <HeroSection />
      {/* <List /> */}
      <Photos />
    </div>
  );
};

export default Home;
