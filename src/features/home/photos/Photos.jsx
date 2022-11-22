import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchPhotos,
  selectStatus,
  selectColumn_1,
  selectColumn_2,
  selectColumn_3,
} from './photosSlice';

import { PhotosLayout, Spinner } from '../../../components';

const Photos = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const column_1 = useSelector(selectColumn_1);
  const column_2 = useSelector(selectColumn_2);
  const column_3 = useSelector(selectColumn_3);

  useEffect(() => {
    const identifier = setTimeout(() => {
      dispatch(fetchPhotos(1));
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [dispatch]);

  return (
    <>
      {status === 'pending' ? (
        <div className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>
          <Spinner />
        </div>
      ) : null}

      {status === 'idle' && (
        <div className=''>
          <PhotosLayout
            column_1={column_1}
            column_2={column_2}
            column_3={column_3}
          />
        </div>
      )}
    </>
  );
};

export default Photos;
