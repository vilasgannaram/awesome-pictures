import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Image = ({ photo }) => {
  const [showUser, setShowUser] = useState(false);

  return (
    <div className='mb-12 max-h-min md:mt-6 md:mb-0'>
      {/* mobile:: user name */}
      <div className='ml-3 mb-3 flex items-center md:hidden'>
        <Link to={`/${photo.user.username}`}>
          <img
            className='w-8 rounded-[50%] object-contain'
            src={photo.user.profile_image.large}
            alt={photo.user.username}
          />
        </Link>

        <Link to={`/${photo.user.username}`}>
          <h1 className='ml-4 text-black_1'>
            {`${photo.user.first_name ? photo.user.first_name : ''} ${
              photo.user.last_name ? photo.user.last_name : ''
            }`}
          </h1>
        </Link>
      </div>

      <figure
        className='relative'
        onMouseEnter={() => setShowUser(true)}
        onMouseLeave={() => setShowUser(false)}
      >
        <img
          className='w-full object-contain'
          src={photo.urls.full}
          loading='lazy'
          alt={photo.description}
        />

        <Link
          to={`/photos/${photo.id}`}
          className='absolute top-0 left-0 right-0 bottom-0 z-10 md:hover:shadow-3xl'
        />

        <div className='absolute left-0 bottom-0 top-0 right-0 hidden hover:shadow-3xl md:inline-block'>
          {showUser && (
            <div className='absolute bottom-4 left-6 z-20 flex items-center'>
              <Link to={`/${photo.user.username}`}>
                <img
                  className='w-8 rounded-[50%] object-contain'
                  src={photo.user.profile_image.large}
                  alt={photo.user.username}
                />
              </Link>

              <Link to={`/${photo.user.username}`}>
                <h1 className='ml-4 text-[white]'>
                  {`${photo.user.first_name ? photo.user.first_name : ''} ${
                    photo.user.last_name ? photo.user.last_name : ''
                  }`}
                </h1>
              </Link>
            </div>
          )}
        </div>
      </figure>
    </div>
  );
};

export default Image;
