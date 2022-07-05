import React from 'react';

const Header = () => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const now = new Date().toLocaleTimeString('en-us', options);
  return (
    <header className='flex flex-col pt-8 px-8 border-2 bg-white '>
      <nav className='bg-white border-lightgray px-8 sm:px-4 py-2.5 rounded '>
        <div className='container flex flex-row justify-between items-center mx-auto'>
          <div>
            <p className='text-2xl font-semibold whitespace-nowrap text-black'>
              Hi, firstName!
            </p>
            <p className='text-sm'>{now}</p>
          </div>
          <div className='flex flex-row items-center'>
          <ul className='flex mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium pr-20'>
            <li>
              <a
                href='#'
                className='block py-2 pr-4 pl-3 text-black font-semibold hover:text-brightblue md:p-0'
              >
                How It Works
              </a>
            </li>
            <li>
              <a
                href='#'
                className='block py-2 pr-4 pl-3 text-black font-semibold hover:text-brightblue md:p-0'
              >
                Support
              </a>
            </li>
            <li>
              <a
                href='#'
                className='block py-2 pr-4 pl-3 text-black font-semibold hover:text-brightblue md:p-0'
              >
                Help
              </a>
            </li>
          </ul>
          <input
            type='text'
            id='search-navbar'
            className='block p-2 pl-10 w-60 h-1/3 text-gray-900 bg-lightgray rounded-lg border border-gray-300 sm:text-sm focus:ring-lightgray focus:border-grey  '
            placeholder='Search...'
          />
        </div>
         
        </div>
      </nav>
    </header>
  );
};

export default Header;