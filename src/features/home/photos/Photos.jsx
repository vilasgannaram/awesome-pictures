import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  reset,
  fetchPhotos,
  selectStatus,
  selectPhotos,
  selectColumn_1,
  selectColumn_2,
  selectColumn_3,
} from './photosSlice';

import { PhotosLayout, Spinner, BounceSpinner } from '../../../components';

const Photos = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);

  const PHOTOS = useSelector(selectPhotos);
  const COLUMN_1 = useSelector(selectColumn_1);
  const COLUMN_2 = useSelector(selectColumn_2);
  const COLUMN_3 = useSelector(selectColumn_3);

  const [pageNumber, setPageNumber] = useState(1);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    const identifier = setTimeout(() => {
      dispatch(reset);
      dispatch(fetchPhotos(pageNumber));
      setPageNumber((prevPageNum) => prevPageNum + 1);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const identifier = setTimeout(() => {
      if (loadMore) {
        dispatch(fetchPhotos(pageNumber));
        setPageNumber((prevPageNum) => prevPageNum + 1);
        setLoadMore(false);
      }
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [dispatch, pageNumber, loadMore]);

  window.addEventListener('scroll', () => {
    const { clientHeight, scrollHeight, scrollTop } = document.documentElement;
    if (scrollTop + clientHeight + 1 >= scrollHeight) {
      setLoadMore(true);
    }
  });

  return (
    <>
      {status === 'pending' ? (
        <div className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>
          <Spinner />
        </div>
      ) : null}

      {PHOTOS.length > 0 && (
        <div className=''>
          <PhotosLayout
            column_1={COLUMN_1}
            column_2={COLUMN_2}
            column_3={COLUMN_3}
          />
          {status === 'pending' && (
            <div className='my-8 mx-auto'>
              <BounceSpinner />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Photos;
