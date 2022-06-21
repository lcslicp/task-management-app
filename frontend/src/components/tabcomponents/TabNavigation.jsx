import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// import EmptyState from '../EmptyState';
// import TaskCard from '../TaskCard';
import Tab from './Tab';

const TabNavigation = () => {
  return (
    <div>
      <div className='mb-4 border-b border-grey w-2/3 mx-8'>
        <ul
          className='flex flex-wrap -mb-px text-sm font-medium text-center'
          id='myTab'
          data-tabs-toggle='#myTabContent'
          role='tablist'
        >
          <li className='mr-2' role='presentation'>
            <button
              className='inline-block p-4 rounded-t-lg border-b-2 hover:text-brightblue'
              id='todo-tab'
              data-tabs-target='#todo'
              type='button'
              role='tab'
              aria-controls='todo'
              aria-selected='true'
            >
              TO DO
            </button>
          </li>
          <li className='mr-2' role='presentation'>
            <button
              className='inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-brightblue hover:border-gray-300'
              id='dashboard-tab'
              data-tabs-target='#dashboard'
              type='button'
              role='tab'
              aria-controls='dashboard'
              aria-selected='true'
            >
              Dashboard
            </button>
          </li>
          <li className='mr-2' role='presentation'>
            <button
              className='inline-block p-4 rounded-t-lg border-b-2 border-transparent v hover:border-gray-300 '
              id='settings-tab'
              data-tabs-target='#settings'
              type='button'
              role='tab'
              aria-controls='settings'
              aria-selected='true'
            >
              Settings
            </button>
          </li>
          <li role='presentation'>
            <button
              className='inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-brightblue hover:border-gray-300'
              id='contacts-tab'
              data-tabs-target='#contacts'
              type='button'
              role='tab'
              aria-controls='contacts'
              aria-selected='true'
            >
              Contacts
            </button>
          </li>
        </ul>
      </div>
      <div id='myTabContent'>
        <div
          className='hidden p-4 bg-gray-50 rounded-lg '
          id='profile'
          role='tabpanel'
          aria-labelledby='profile-tab'
        >
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            This is some placeholder content the{' '}
            <strong className='font-medium text-gray-800 '>
              Profile tab's associated content
            </strong>
            . Clicking another tab will toggle the visibility of this one for
            the next. The tab JavaScript swaps classes to control the content
            visibility and styling.
          </p>
        </div>
        <div
          className='hidden p-4 bg-gray-50 rounded-lg dark:bg-gray-800'
          id='dashboard'
          role='tabpanel'
          aria-labelledby='dashboard-tab'
        >
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            This is some placeholder content the{' '}
            <strong className='font-medium text-gray-800 dark:text-white'>
              Dashboard tab's associated content
            </strong>
            . Clicking another tab will toggle the visibility of this one for
            the next. The tab JavaScript swaps classes to control the content
            visibility and styling.
          </p>
        </div>
        <div
          className='hidden p-4 bg-gray-50 rounded-lg dark:bg-gray-800'
          id='settings'
          role='tabpanel'
          aria-labelledby='settings-tab'
        >
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            This is some placeholder content the{' '}
            <strong className='font-medium text-gray-800 dark:text-white'>
              Settings tab's associated content
            </strong>
            . Clicking another tab will toggle the visibility of this one for
            the next. The tab JavaScript swaps classes to control the content
            visibility and styling.
          </p>
        </div>
        <div
          className='hidden p-4 bg-gray-50 rounded-lg dark:bg-gray-800'
          id='contacts'
          role='tabpanel'
          aria-labelledby='contacts-tab'
        >
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            This is some placeholder content the{' '}
            <strong className='font-medium text-gray-800 dark:text-white'>
              Contacts tab's associated content
            </strong>
            . Clicking another tab will toggle the visibility of this one for
            the next. The tab JavaScript swaps classes to control the content
            visibility and styling.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;
