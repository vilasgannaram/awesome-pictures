import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Blurhash } from 'react-blurhash';

const Image = ({ photo }) => {
  const [showUser, setShowUser] = useState(false);

  // const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const ref = useRef(null);

  useEffect(() => {
    setWidth(ref.current.offsetWidth);

    setHeight(() => {
      const aspectRatio = photo.height / photo.width;
      return aspectRatio * ref.current.offsetWidth;
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div className='mb-12 max-h-min md:mt-6 md:mb-0'>
      {/* mobile:: user name */}
      <div className='ml-3 mb-2 flex items-center md:hidden'>
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
        ref={ref}
        className='relative'
        onMouseEnter={() => setShowUser(true)}
        onMouseLeave={() => setShowUser(false)}
      >
        <div className='relative'>
          <LazyLoadImage
            className='w-full object-contain shadow drop-shadow'
            src={photo.urls.full}
            alt={photo.description}
            width={width}
            height={height}
            afterLoad={() => setLoaded(true)}
            // beforeLoad={() => setLoading(true)}
            threshold={40}
          />
          <div className={`${loaded && 'hidden'} absolute top-0 left-0`}>
            <Blurhash
              width={width}
              height={height}
              hash={photo.blur_hash}
              resolutionX={32}
              resolutionY={32}
              punch={1}
            />
          </div>
        </div>

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
