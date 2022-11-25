import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import {
  reset,
  fetchUserLikes,
  selectTotalPhotos,
  selectStatus,
  selectPhotos,
  selectColumn_1,
  selectColumn_2,
  selectColumn_3,
} from './userLikesSlice';

import { PhotosLayout, BounceSpinner } from '../../../components';

const Likes = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [initial, setInitial] = useState(true);

  const { username } = useParams();
  const dispatch = useDispatch();

  const status = useSelector(selectStatus);
  const PHOTOS = useSelector(selectPhotos);
  const TOTAL_PHOTOS = useSelector(selectTotalPhotos);
  const COLUMN_1 = useSelector(selectColumn_1);
  const COLUMN_2 = useSelector(selectColumn_2);
  const COLUMN_3 = useSelector(selectColumn_3);

  useEffect(() => {
    const identifier = setTimeout(() => {
      if (loadMore || initial) {
        if (initial) dispatch(reset());
        if (TOTAL_PHOTOS === PHOTOS.length) return;

        dispatch(fetchUserLikes({ username, pageNumber }));
        setPageNumber((prevPageNum) => prevPageNum + 1);
        setLoadMore(false);
        setInitial(false);
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
      {status === 'pending' ? <BounceSpinner /> : null}

      {PHOTOS.length ? (
        <PhotosLayout
          column_1={COLUMN_1}
          column_2={COLUMN_2}
          column_3={COLUMN_3}
        />
      ) : null}

      {status === 'rejected' ? <p>No photos found</p> : null}
    </div>
  );
};

export default Likes;
