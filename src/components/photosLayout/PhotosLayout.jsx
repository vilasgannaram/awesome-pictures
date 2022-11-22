import React from 'react';
import Image from './Image';

const PhotosLayout = ({ column_1, column_2, column_3 }) => {
  return (
    <div className='mx-auto max-h-min gap-x-6 md:grid md:w-[90%] md:grid-cols-2 lg:w-[80%] lg:grid-cols-3 '>
      <div>
        {column_1.map((photo, index) => (
          <Image key={index} photo={photo} />
        ))}
      </div>

      <div>
        {column_2.map((photo, index) => (
          <Image key={index} photo={photo} />
        ))}
      </div>

      <div>
        {column_3.map((photo, index) => (
          <Image key={index} photo={photo} />
        ))}
      </div>
    </div>
  );
};
export default PhotosLayout;
