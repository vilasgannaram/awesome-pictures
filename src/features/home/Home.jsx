import React from 'react';

import HeroSection from './heroSection/HeroSection';
// import List from './topics/List';
import Photos from './photos/Photos';

const Home = () => {
  return (
    <div>
      <div className='my-3 text-3xl'>Home</div>
      <HeroSection />
      {/* <List /> */}
      <Photos />
    </div>
  );
};

export default Home;
