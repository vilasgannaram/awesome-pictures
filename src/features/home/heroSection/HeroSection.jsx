import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
      <figure className='relative'>
        <img
          className='mb-16 max-h-[600px] w-full border-0 object-cover shadow drop-shadow md:mb-6'
          src={photo?.urls?.full}
          alt=''
        />

        {photo?.user?.first_name && (
          <h2 className='absolute bottom-3 left-6 z-20 font-seoge text-base text-[white]'>
            <Link to={`/photos/${photo.id}`} className=' font-medium'>
              photo
            </Link>{' '}
            by{' '}
            <Link
              to={`/${photo?.user.username}`}
              className='font-medium underline'
            >
              {photo.user.first_name ? photo.user.first_name : ''}{' '}
              {photo.user.last_name ? photo.user.last_name : ''}
            </Link>
          </h2>
        )}
      </figure>
    </div>
  );
};

export default HeroSection;
