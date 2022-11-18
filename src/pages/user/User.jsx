import React, { useEffect } from 'react';
import { useParams, Outlet } from 'react-router';

import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import {
  fetchUser,
  selectUser,
  selectStatus,
} from '../../features/user/userSlice';

import { paypal } from '../../assets';
// microsoft365

const User = () => {
  const params = useParams();
  const user_name = params.username;

  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const status = useSelector(selectStatus);

  useEffect(() => {
    const identfier = setTimeout(() => {
      dispatch(fetchUser(user_name));
    }, 500);

    return () => {
      clearTimeout(identfier);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      User
      <Outlet />
    </>
  );
};

export default User;
