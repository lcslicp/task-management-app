import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// import EmptyState from '../EmptyState';
// import TaskCard from '../TaskCard';
import Tab from './Tab';

const TabNavigation = () => {
  return (
    <div>
      <div class='mb-4 border-b border-lightergray'>
        <ul
          class='flex flex-wrap -mb-px text-sm font-medium text-center'
          id='myTab'
          data-tabs-toggle='#myTabContent'
          role='tablist'
        >
          <li class='mr-2' role='presentation'>
            <button
              className='inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-brightblue hover:border-lightergray'
              id='todo-tab'
              data-tabs-target='#todo'
              type='button'
              role='tab'
              aria-controls='todo'
              aria-selected='false'
            >
              TO DO
            </button>
          </li>
          <li class='mr-2' role='presentation'>
            <button
              className='inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-brightblue hover:border-lightergray'
              id='inprogress-tab'
              data-tabs-target='#inprogress'
              type='button'
              role='tab'
              aria-controls='inprogress'
              aria-selected='false'
            >
              IN PROGRESS
            </button>
          </li>
          <li class='mr-2' role='presentation'>
            <button
              className='inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-brightblue hover:border-lightergray'
              id='completed-tab'
              data-tabs-target='#completed'
              type='button'
              role='tab'
              aria-controls='completed'
              aria-selected='false'
            >
             COMPLETED
            </button>
          </li>
          <li role='presentation'>
            <button
             className='inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-brightblue hover:border-lightergray'
              id='overdue-tab'
              data-tabs-target='#overdue'
              type='button'
              role='tab'
              aria-controls='overdue'
              aria-selected='false'
            >
              OVERDUE
            </button>
          </li>
        </ul>
      </div>
      <div id='myTabContent'>
        <div
          className='hidden p-4 bg-gray-50 rounded-lg'
          id='todo'
          role='tabpanel'
          aria-labelledby='todo-tab'
        >
          <p class='text-sm text-gray-500 '>
            This is some placeholder content the{' '}
            <strong class='font-medium text-gray-800 '>
              Profile tab's associated content
            </strong>
            . Clicking another tab will toggle the visibility of this one for
            the next. The tab JavaScript swaps classes to control the content
            visibility and styling.
          </p>
        </div>
        <div
          className='hidden p-4 bg-gray-50 rounded-lg'
          id='inprogress'
          role='tabpanel'
          aria-labelledby='inprogress-tab'
        >
          <p class='text-sm text-gray-500 dark:text-gray-400'>
            This is some placeholder content the{' '}
            <strong class='font-medium text-gray-800 dark:text-white'>
              Dashboard tab's associated content
            </strong>
            . Clicking another tab will toggle the visibility of this one for
            the next. The tab JavaScript swaps classes to control the content
            visibility and styling.
          </p>
        </div>
        <div
          class='hidden p-4 bg-gray-50 rounded-lg'
          id='completed'
          role='tabpanel'
          aria-labelledby='completed-tab'
        >
          <p class='text-sm text-gray-500 dark:text-gray-400'>
            This is some placeholder content the{' '}
            <strong class='font-medium text-gray-800 dark:text-white'>
              Settings tab's associated content
            </strong>
            . Clicking another tab will toggle the visibility of this one for
            the next. The tab JavaScript swaps classes to control the content
            visibility and styling.
          </p>
        </div>
        <div
          class='hidden p-4 bg-gray-50 rounded-lg'
          id='overdue'
          role='tabpanel'
          aria-labelledby='overdue-tab'
        >
          <p class='text-sm text-gray-500 dark:text-gray-400'>
            This is some placeholder content the{' '}
            <strong class='font-medium text-gray-800 dark:text-white'>
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
