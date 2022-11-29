import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchUserCollections,
  selectCollections,
} from './userCollectionsSlice';

const Collections = () => {
  const { username } = useParams();
  const dispatch = useDispatch();

  const [pageNumber, setPageNumber] = useState(1);
  // const [loadMore, setLoadMore] = useState(false);
  // const [initial, setInitial] = useState(true);

  const COLLECTIONS = useSelector(selectCollections);

  useEffect(() => {
    const collections_identifier = setTimeout(() => {
      dispatch(fetchUserCollections({ username, pageNumber }));
    }, 500);

    return () => {
      clearTimeout(collections_identifier);
    };
  }, [dispatch, pageNumber, username]);

  // console.log(COLLECTIONS);

  return <div>Collections</div>;
};

export default Collections;
