import React from 'react';

const Image = ({ photo }) => {
  return (
    <figure>
      <img
        className='mt-6 w-full object-contain'
        src={photo.urls.full}
        alt={photo.description}
      />
    </figure>
  );
};

export default Image;
