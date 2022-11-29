import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Spinner } from '../../components';

import { createApi } from 'unsplash-js';
const unsplash = createApi({ accessKey: process.env.REACT_APP_ACCESS_KEY });

const Photo = () => {
  const { photoId } = useParams();
  const [photo, setPhoto] = useState(null);

  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const photo_identifier = setTimeout(async () => {
      setLoading(true);
      const result = await unsplash.photos.get({ photoId: photoId });
      setPhoto(result.response);
      setLoading(false);
    }, 500);

    return () => {
      clearTimeout(photo_identifier);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className='mx-auto w-[95%] md:w-[90%]'>
      {loading && (
        <div className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>
          <Spinner />
        </div>
      )}

      {photo && (
        <div className='mt-12'>
          <figure className='mx-auto w-full lg:w-1/3'>
            <img
              className='w-full rounded-lg object-contain shadow-lg drop-shadow-lg'
              src={photo.urls.full}
              alt={photo.description}
            />
            <figcaption className='my-3 font-arial text-sm text-gray_1'>
              <p>Views {photo.views}</p>
            </figcaption>
          </figure>

          <div className='mt-6 mb-4 flex items-center'>
            <img
              className='w-8 rounded-[50%] shadow-sm drop-shadow-sm '
              src={photo.user.profile_image.large}
              alt={photo.user.name}
            />
            <h1 className='ml-3 font-seoge text-black_1'>{photo.user.name}</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Photo;
