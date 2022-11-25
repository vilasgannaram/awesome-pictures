import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link, Outlet } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, selectUser, selectStatus } from './userSlice';

import UserDetails from './UserDetails';
import { Spinner } from '../../components';

const User = () => {
  const { username } = useParams();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const status = useSelector(selectStatus);

  useEffect(() => {
    const user_identfier = setTimeout(() => {
      dispatch(fetchUser(username));
    }, 500);

    return () => {
      clearTimeout(user_identfier);
    };
  }, [username, dispatch]);

  return (
    <>
      {status === 'pending' ? (
        <div className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>
          <Spinner />
        </div>
      ) : null}

      {status === 'fulfilled' ? (
        <div className='bounce-in-top mt-8 md:mt-12 lg:mt-16'>
          <UserDetails user={user} />

          <nav className='mt-12 flex items-center border-b border-gray_2 pl-[2.5%] font-arial text-[15px] font-medium leading-[25px] text-gray_1'>
            <Link
              to={`/${username}`}
              className='mr-8 border-b border-[white] pb-3 hover:border-b-black_1 hover:text-black_1'
            >
              Photos
              <span className='ml-1 hidden md:inline-block'>
                {user.total_photos}
              </span>
            </Link>

            <Link
              to={`/${username}/likes`}
              className='mr-8 border-b border-[white] pb-3 hover:border-b-black_1 hover:text-black_1'
            >
              Likes
              <span className='ml-1 hidden md:inline-block'>
                {user.total_likes}
              </span>
            </Link>

            <Link
              to={`/${username}/collections`}
              className='mr-8 border-b border-[white] pb-3 hover:border-b-black_1 hover:text-black_1'
            >
              Collections{' '}
              <span className='ml-1 hidden md:inline-block'>
                {user.total_collections}
              </span>
            </Link>
          </nav>

          <div className='mt-8 mb-20 md:mt-10 lg:mt-12'>
            <Outlet />
          </div>
        </div>
      ) : null}

      {status === 'rejected' ? <p>No user found</p> : null}
    </>
  );
};

export default User;
