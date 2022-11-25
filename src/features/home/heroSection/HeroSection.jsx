import React, { useState, useEffect } from 'react';

import { createApi } from 'unsplash-js';
const unsplash = createApi({ accessKey: process.env.REACT_APP_ACCESS_KEY });

const HeroSection = () => {
  const [photo, setPhoto] = useState({});

  useEffect(() => {
    const photo_identifier = setTimeout(async () => {
      const result = await unsplash.photos.getRandom({
        count: 1,
        query: 'night city',
        orientation: 'landscape',
      });
      const { response } = result;
      setPhoto(response[0]);
    }, 500);

    return () => {
      clearTimeout(photo_identifier);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <figure className='border-0 outline-none'>
        <img
          className='h-[600px] w-full border-0 object-cover outline-none'
          src={photo?.urls?.full}
          alt=''
        />
      </figure>
    </div>
  );
};

export default HeroSection;
