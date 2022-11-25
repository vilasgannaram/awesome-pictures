import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import {
  reset,
  fetchUserPhotos,
  selectStatus,
  selectTotalPhotos,
  selectPhotos,
  selectColumn_1,
  selectColumn_2,
  selectColumn_3,
} from './userPhotosSlice';

import { PhotosLayout, BounceSpinner } from '../../../components';

const Photos = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [initial, setInitial] = useState(true);

  const { username } = useParams();
  const dispatch = useDispatch();

  const status = useSelector(selectStatus);
  const PHOTOS = useSelector(selectPhotos);
  const TOTAL_PHOTOS = useSelector(selectTotalPhotos);
  const COlUMN_1 = useSelector(selectColumn_1);
  const COlUMN_2 = useSelector(selectColumn_2);
  const COlUMN_3 = useSelector(selectColumn_3);

  useEffect(() => {
    const identifier = setTimeout(() => {
      if (loadMore || initial) {
        if (initial) dispatch(reset());
        if (TOTAL_PHOTOS === PHOTOS.length) return;

        dispatch(fetchUserPhotos({ username, pageNumber }));
        setInitial(false);
        setLoadMore(false);
        setPageNumber((prevPageNum) => prevPageNum + 1);
      }
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [
    dispatch,
    pageNumber,
    loadMore,
    username,
    initial,
    PHOTOS.length,
    TOTAL_PHOTOS,
  ]);

  window.addEventListener('scroll', () => {
    const { clientHeight, scrollHeight, scrollTop } = document.documentElement;
    if (TOTAL_PHOTOS === PHOTOS.length) return;
    if (scrollTop + clientHeight + 1 >= scrollHeight) {
      setLoadMore(true);
    }
  });

  return (
    <div>
      {status === 'pending' && PHOTOS.length === 0 ? <BounceSpinner /> : null}

      {PHOTOS.length > 0 && (
        <PhotosLayout
          column_1={COlUMN_1}
          column_2={COlUMN_2}
          column_3={COlUMN_3}
        />
      )}

      {/* {status === 'rejected' ? <p>No photos found</p> : null} */}
    </div>
  );
};

export default Photos;
