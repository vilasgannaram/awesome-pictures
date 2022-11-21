import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link, Outlet } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { fetchUser, selectUser, selectStatus } from './userSlice';

import UserDetails from './UserDetails';
import { LoadingSpinner } from '../../components';

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
      {status === 'pending' ? (
        <div className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>
          <LoadingSpinner />
        </div>
      ) : null}

      {status === 'fulfilled' ? (
        <div className='bounce-in-top mt-8 md:mt-12 lg:mt-16'>
          <UserDetails user={user} />

          <nav className='mt-12 flex items-center border-b border-gray_2 pl-[2.5%]'>
            {['Photos', 'Likes', 'Collections'].map((link) => (
              <Link
                to={
                  link === 'Photos'
                    ? `/${user.username}`
                    : `/${user.username}/${link}`
                }
                key={link}
                // style={({ isActive }) => {
                //   return {
                //     color: isActive ? '#111' : '',
                //     borderBlockColor: isActive ? '#111' : '',
                //   };
                // }}
                className='mr-8 border-b border-[white] pb-3 font-arial text-[14px] font-medium leading-[22.4px] text-gray_1 hover:border-b-black_1 hover:text-black_1 active:text-black_1'
              >
                {link}
              </Link>
            ))}
          </nav>

          <div className='mx-auto mt-8 md:mt-10 md:w-[90%] lg:mt-12 lg:w-[80%]'>
            <Outlet />
          </div>
        </div>
      ) : null}
      {status === 'rejected' ? <p>No user found</p> : null}
    </>
  );
};

export default User;
