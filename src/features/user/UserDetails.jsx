import React from 'react';
import { Link } from 'react-router-dom';

import insta from '../../assets/instagram.gif';
import twitter from '../../assets/twitter.gif';
import portfolio from '../../assets/earth-globe.gif';

const UserDetails = ({ user }) => {
  return (
    <div className='mx-auto w-[95%] md:flex md:w-[70%] lg:w-[50%]'>
      <figure className='w-[120px] drop-shadow-sm md:min-w-[150px]'>
        <img
          className='w-full rounded-[50%] object-contain font-arial text-sm shadow '
          src={user.profile_image.large}
          alt={user.username}
        />
      </figure>

      <div className='mt-6 font-arial text-[15px] leading-6 text-gray_1 md:mt-0 md:ml-8 lg:ml-12'>
        {user.first_name || user.last_name ? (
          <h1 className='text-[21px] font-bold leading-[25px] text-black_1 md:text-3xl lg:text-4xl'>
            {`${user.first_name ? user.first_name : ''} ${
              user.last_name ? user.last_name : ''
            }`}
          </h1>
        ) : null}

        {user.bio ? <p className='mt-3 text-black_1'>{user.bio}</p> : null}

        {user.for_hire ? (
          <div className='mt-3 flex items-center text-blue_1'>
            <span className='material-icons text-base'>check_circle</span>
            <p className='ml-3'>Available for hire</p>
          </div>
        ) : null}

        {user.location ? (
          <div className='mt-1.5 flex items-center'>
            <span className='material-icons text-base'>location_on</span>
            <p className='ml-3'>{user.location}</p>
          </div>
        ) : null}

        {user.social.portfolio_url ||
        user.social.twitter_username ||
        user.social.instagram_username ? (
          <div className='mt-1.5 flex items-start'>
            <span className='material-icons -rotate-45 text-base'>link</span>
            <p className='ml-3 flex items-center'>
              <span>Connect with {user.first_name}</span>
              <span className='mt-2 ml-3 flex'>
                {user.social.instagram_username && (
                  <a
                    href={`https://www.instagram.com/${user.social.instagram_username}`}
                  >
                    <img className='mx-1 w-6' src={insta} alt='instagram' />
                  </a>
                )}

                {user.social.twitter_username && (
                  <a
                    href={`https://twitter.com/${user.social.twitter_username}`}
                  >
                    <img className='mx-1 w-6' src={twitter} alt='twitter' />
                  </a>
                )}

                {user.social.portfolio_url && (
                  <a href={`${user.social.portfolio_url}`}>
                    <img className='mx-1 w-6' src={portfolio} alt='portfolio' />
                  </a>
                )}
              </span>
            </p>
          </div>
        ) : null}

        {user.tags.custom.length ? (
          <div className='mt-6'>
            <h1 className='text-black_1'>Interests</h1>
            <div className='mt-1.5 flex flex-wrap'>
              {user.tags.custom.map((tag) => (
                <Link
                  to=''
                  key={tag.title}
                  className='mr-2 mt-2 bg-gray_2 px-2 py-0.5 capitalize'
                >
                  {tag.title}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UserDetails;
