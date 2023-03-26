import React from 'react';
import { Link } from 'react-router-dom';

import doowitLogo from '../assets/icons/doowit-logo-colored.svg';
import homepageImage from '../assets/images/homepage-img.png'

const LandingPage = () => {

  return (
    <section className='w-screen h-screen flex flex-row place-content-between'>
      <div className='flex flex-col w-3/5 pl-24 pt-12'>
        <div id='header' className='flex flex-row items-center'>
          <img src={doowitLogo} className='w-1/5 h-auto pr-8' />
          
        </div>

        <div id='slogan' className='w-2/3 '>
          <h1 className='text-6xl text-darkblue pt-40'>
            A step ahead in managing tasks.
          </h1>
          <p className='text-base w-2/3 pt-8 pb-14'>
            Streamline tasks, track productivity, <br /> build projects like no other.
            Do it with{' '}
            <em>
              <strong>Doowit</strong>
            </em>
            .
          </p>
          <Link
            to={'/signup'}
            className='text-white font-bold bg-brightblue hover:bg-brighterblue hover:scale-110 rounded-lg text-sm px-5 py-2.5 text-center '
          >
            Get Started
          </Link>
        </div>
      </div>
      <div className='flex flex-col bg-brightblue w-fit pt-12'>
        <div id='header' className='flex flex-row items-center justify-end px-24 gap-10 z-10'>
          <Link
            to={'/login'}
            className='text-white font-bold hover:brightness-90 text-sm px-5 py-2.5 text-center '
          >
            Log in
          </Link>
          <Link
            to={'signup'}
            className='text-darkblue font-bold bg-white hover:brightness-95 rounded-lg text-sm px-6 py-2.5 text-center '
          >
            Sign Up
          </Link>
        </div>
      </div>
      <div className='absolute right-12 w-1/2 pt-40 px-10 mr-16'>
        <img src={homepageImage} alt='Doowit' />
        </div>
    </section>
  );
};

export default LandingPage;
