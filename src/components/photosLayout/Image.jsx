import React from 'react';
import { Link } from 'react-router-dom';

const Image = ({ photo }) => {
  return (
    <figure className='mb-12 max-h-min md:mb-0'>
      <Link
        to={`/${photo.user.username}`}
        className='mb-3 flex items-center md:hidden'
      >
        <img
          className='w-8 rounded-[50%] object-contain'
          src={photo.user.profile_image.large}
          alt={photo.user.username}
        />

        <h1 className='ml-4 text-black_1'>
          {`${photo.user.first_name ? photo.user.first_name : ''} ${
            photo.user.last_name ? photo.user.last_name : ''
          }`}
        </h1>
      </Link>

      <div className='relative'>
        <Link to={`/photos/${photo.id}`}>
          <img
            className='w-full object-contain'
            src={photo.urls.full}
            loading='lazy'
            alt={photo.description}
          />
        </Link>

        <div className='hidden opacity-0 hover:opacity-100 md:inline-block'>
          <div className='absolute bottom-6 left-0 top-0 right-0 shadow-3xl' />

          <Link
            to={`/${photo.user.username}`}
            className='absolute bottom-12 left-10 flex items-center'
          >
            <img
              className='w-8 rounded-[50%] object-contain'
              src={photo.user.profile_image.large}
              alt={photo.user.username}
            />

            <h1 className='ml-4 text-[white]'>
              {`${photo.user.first_name ? photo.user.first_name : ''} ${
                photo.user.last_name ? photo.user.last_name : ''
              }`}
            </h1>
          </Link>
        </div>
      </div>
    </figure>
  );
};

export default Image;
