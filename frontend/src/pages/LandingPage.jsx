import React from 'react';
import { Link } from 'react-router-dom';

import doowitLogo from '../assets/icons/doowit-logo-colored.svg';
import landingImage from '../assets/images/landingpage-img.png';

const LandingPage = () => {
  return (
    <section className='w-screen h-screen flex flex-row'>
      <div className='flex flex-col w-3/5 pl-24 pt-12'>
        <div id='header' className='flex flex-row items-center'>
          <img src={doowitLogo} className='w-1/5 h-auto pr-8' />
          <ul className='flex mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium pr-40 gap-5 z-10'>
            <li>
              <a
                href='#'
                className='block py-2 pr-4 pl-3 ml-12 text-black font-semibold hover:text-brightblue hover:scale-110 md:p-0'
              >
                How It Works
              </a>
            </li>
            <li>
              <a
                href='#'
                className='block py-2 pr-4 pl-3 text-black font-semibold hover:text-brightblue hover:scale-110 md:p-0'
              >
                Support
              </a>
            </li>
            <li>
              <a
                href='#'
                className='block py-2 pr-4 pl-3 text-black font-semibold hover:text-brightblue hover:scale-110 md:p-0'
              >
                Help
              </a>
            </li>
          </ul>
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
      <div className='flex flex-col  bg-brightblue w-2/5 pl-24 pt-12'>
        <div id='header' className='flex flex-row items-center justify-end pr-24 gap-10 z-10'>
          <Link
            to={'/login'}
            className='text-white font-bold hover:scale-110 text-sm px-5 py-2.5 text-center '
          >
            Log in
          </Link>
          <Link
            to={'signup'}
            className='text-darkblue font-bold bg-white hover:scale-110 rounded-lg text-sm px-6 py-2.5 text-center '
          >
            Sign Up
          </Link>
        </div>
      </div>
      <div id='animation' className='absolute right-12 w-2/3 pt-24 floating'>
        {landingImage}
        </div>
    </section>
  );
};

export default LandingPage;
