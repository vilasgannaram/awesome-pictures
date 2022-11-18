import React, { useEffect } from 'react';
import { useParams } from 'react-router';

import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import {
  fetchUser,
  selectUser,
  selectStatus,
} from '../../features/user/userSlice';

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
      {status === 'pending' ? <p>loading</p> : null}
      {status === 'fulfilled' ? (
        <div className='mx-auto mt-8 w-[95%]'>
          <div>
            <div>
              <img src={user.profile_image.large} alt='' />
            </div>

            <div className='mt-6 font-arial'>
              <h1 className='text-[21px] font-bold leading-[25px]'>{`${user?.first_name} ${user?.last_name}`}</h1>
              <p className='mt-6 text-[15px] leading-6'>{user?.bio}</p>

              <div className='mt-6 text-[15px] leading-6'>
                <h2>Interests</h2>
                <div className='flex items-center text-[14px] leading-[26px]'>
                  {user?.tags?.custom.map((tag) => (
                    <Link
                      key={tag?.title}
                      to={`/s/photos/${tag?.title}`}
                      className='uppercase'
                    >
                      {tag?.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default User;
