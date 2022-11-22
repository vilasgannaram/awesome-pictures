import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import {
  reset,
  fetchUserPhotos,
  selectStatus,
  selectPhotos,
  selectColumn_1,
  selectColumn_2,
  selectColumn_3,
} from './userPhotosSlice';

import { PhotosLayout, BounceSpinner } from '../../../components';

const Photos = () => {
  const { username } = useParams();
  const dispatch = useDispatch();

  const status = useSelector(selectStatus);
  const photos = useSelector(selectPhotos);
  const column_1 = useSelector(selectColumn_1);
  const column_2 = useSelector(selectColumn_2);
  const column_3 = useSelector(selectColumn_3);

  useEffect(() => {
    const identifier = setTimeout(() => {
      dispatch(reset());
      dispatch(fetchUserPhotos(username));
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {status === 'pending' ? <BounceSpinner /> : null}

      {status === 'idle' && photos.length ? (
        <PhotosLayout
          column_1={column_1}
          column_2={column_2}
          column_3={column_3}
        />
      ) : null}

      {status === 'rejected' ? <p>No photos found</p> : null}
    </div>
  );
};

export default Photos;
