import React from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

import doowitLogo from '../assets/icons/doowit-logo.svg';
import defaultDisplayphoto from '../assets/icons/default-displayphoto.svg';

const Sidebar = () => {
  const LOGOUT_URL = '/logout';
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
    .get(LOGOUT_URL);
    navigate('/login');

  }
  return (
    <aside className='w-72 fixed z-30' aria-label='Sidebar'>
      <div className='h-screen overflow-y-auto py-4 px-8 bg-darkblue'>
        <ul className='space-y-2'>
          <li id='logo'>
            <img src={doowitLogo} className='w-2/3 h-auto pt-14 pb-8' />
          </li>
          <li className='flex items-center space-x-4 pb-6' id='user-info'>
            <img
              src={defaultDisplayphoto}
              className='w-10 h-10 rounded-full border-4 border-white'
            />
            <div className='space-y-1'>
              <div className='font-bold text-white text-base'>
                Hardcoded Name
              </div>
              <div className='text-xs text-white'>hardcoded@email.com</div>
            </div>
          </li>
          <li selected>
            <a
              href='#'
              className='flex items-center p-2 text-base font-normal text-white rounded-full hover:bg-darkerblue hover:px-4'
            >
              <svg
                className='w-6 h-6 text-white transition duration-75'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z'></path>
                <path d='M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z'></path>
              </svg>
              <span className='ml-3'>Dashboard</span>
            </a>
          </li>
          <li>
            <button
              type='button'
              className='flex items-center p-2 text-base font-normal text-white rounded-full hover:bg-darkerblue hover:px-4'
              aria-controls='sort-dropdown'
              data-collapse-toggle='sort-dropdown'
            >
              <svg
                className='flex-shrink-0 w-6 h-6 text-white transition duration-75'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z'
                  clipRule='evenodd'
                ></path>
              </svg>
              <span
                className='flex-1 ml-3 text-left whitespace-nowrap'
                sidebar-toggle-item
              >
                Sort
              </span>
              <svg
                sidebar-toggle-item
                className='w-6 h-6'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </button>
            <ul id='sort-dropdown' className='hidden py-2 space-y-2'>
              <li>
                <a
                  href='#'
                  className='flex items-center p-2 text-base font-normal text-white rounded-full hover:bg-darkerblue hover:px-4'
                >
                  Low Priority to Urgent
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='flex items-center p-2 text-base font-normal text-white rounded-full hover:bg-darkerblue hover:px-4'
                >
                  Urgent to Low Priority
                </a>
              </li>
            </ul>
          </li>
          <li>
            <button
              type='button'
              className='flex items-center p-2 text-base font-normal text-white rounded-full hover:bg-darkerblue hover:px-4'
              aria-controls='sort-dropdown'
              data-collapse-toggle='sort-dropdown'
            >
              <svg
                className='flex-shrink-0 w-6 h-6 text-white transition duration-75'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z'
                  clipRule='evenodd'
                ></path>
              </svg>
              <span
                className='flex-1 ml-3 text-left whitespace-nowrap'
                sidebar-toggle-item
              >
                Filter
              </span>
              <svg
                sidebar-toggle-item
                className='w-6 h-6'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </button>
            <ul id='sort-dropdown' className='hidden py-2 space-y-2'>
              <li>
                <a
                  href='#'
                  className='flex items-center p-2 text-base font-normal text-white rounded-full hover:bg-darkerblue hover:px-4'
                >
                  Low Priority
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='flex items-center p-2 text-base font-normal text-white rounded-full hover:bg-darkerblue hover:px-4e'
                >
                  Medium Priority
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a
              href='#'
              className='flex items-center self-end p-2 text-base font-normal text-white rounded-full hover:bg-darkerblue hover:px-4'
            >
              <svg
                className='flex-shrink-0 w-6 h-6 text-white transition duration-75'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z'
                  clipRule='evenodd'
                ></path>
              </svg>
              <span className='flex-1 ml-3 whitespace-nowrap' onClick={handleLogout}>Log Out</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
