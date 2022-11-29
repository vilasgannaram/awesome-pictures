import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import {
  reset,
  selectStatus,
  fetchUserCollections,
  selectCollections,
  selectTotalCollections,
} from './userCollectionsSlice';

const Collections = () => {
  const { username } = useParams();
  const dispatch = useDispatch();

  const [pageNumber, setPageNumber] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [initial, setInitial] = useState(true);

  const COLLECTIONS = useSelector(selectCollections);
  const TOTAL_COLLECTIONS = useSelector(selectTotalCollections);
  const STATUS = useSelector(selectStatus);

  useEffect(() => {
    const collections_identifier = setTimeout(() => {
      if (loadMore || initial) {
        if (initial) dispatch(reset());
        if (TOTAL_COLLECTIONS === COLLECTIONS.length) return;

        dispatch(fetchUserCollections({ username, pageNumber }));
        setInitial(false);
        setLoadMore(false);
        setPageNumber((prevPageNum) => prevPageNum + 1);
      }
    }, 500);

    return () => {
      clearTimeout(collections_identifier);
    };
  }, [
    dispatch,
    pageNumber,
    username,
    COLLECTIONS.length,
    TOTAL_COLLECTIONS,
    initial,
    loadMore,
  ]);

  window.addEventListener('scroll', () => {
    const { clientHeight, scrollHeight, scrollTop } = document.documentElement;
    if (TOTAL_COLLECTIONS === COLLECTIONS.length) return;
    if (scrollTop + clientHeight + 1 >= scrollHeight) {
      setLoadMore(true);
    }
  });
  console.log(COLLECTIONS);

  return (
    <>
      {STATUS === 'idle' && COLLECTIONS.length > 0 && (
        <div className='mx-auto grid gap-6 md:w-[90%] md:grid-cols-2 lg:w-[80%] lg:grid-cols-3'>
          {COLLECTIONS.map((collection) => (
            <div key={collection.id}>
              <figure className='shadow drop-shadow'>
                <img
                  className='h-72 w-full object-center'
                  src={collection?.cover_photo?.urls.full}
                  alt=''
                />
              </figure>

              <div className='mt-2 font-arial text-black_1'>
                <p className='text-sm text-gray_1'>
                  {collection.total_photos} photos, Curated by{' '}
                  <span>
                    {collection.user.first_name && collection.user.first_name}
                    {collection.user.last_name && collection.user.last_name}
                  </span>
                </p>
                <h1 className='mt-2 text-lg'>{collection.title}</h1>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Collections;
