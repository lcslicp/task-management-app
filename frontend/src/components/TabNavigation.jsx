import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// import EmptyState from '../EmptyState';
import ToDoTab from './tab-components/ToDoTab';
import InProgressTab from './tab-components/InProgressTab';
import CompletedTab from './tab-components/CompletedTab';
import OverdueTab from './tab-components/Overdue';

const TabNavigation = () => {
  const tabdata = [
    { id: '1', key: '1', tabTitle: 'TO DO', tabContent: <ToDoTab /> },

    { id: '2', key: '2', tabTitle: 'IN PROGRESS', tabContent: <InProgressTab /> },

    { id: '3', key: '3', tabTitle: 'COMPLETED', tabContent: <CompletedTab /> },

    { id: '4', key: '4', tabTitle: 'OVERDUE', tabContent: <OverdueTab /> },
  ];

  const [activeStatusTab, setActiveStatusTab] = useState(tabdata[0].id);

  const statusTabTitles = tabdata.map((tab, id) => (
    <li
    key={id}
      onClick={() => setActiveStatusTab(tab.id)}
      className={
        
        activeStatusTab === tab.id
          ? 'px-8 inline-block p-4 rounded-t-lg border-b-2 text-brightblue font-bold border-brightblue hover:text-brightblue hover:border-brighterblue  '
          : 'px-8 inline-block p-4 text-grey rounded-t-lg border-b border-gray-300'
      }
    >
      {tab.tabTitle}
    </li>
  ));

  const tabContents = tabdata.map((content, id) => (
    <div className='w-full' key={id} style={activeStatusTab === content.id ? {} : { display: 'none' }} >
      {content.tabContent}
    </div>
  ));

  return (
    <div className='pl-72 pt-28'>
      <div className='text-normal font-medium text-center text-gray-500 border-b fixed bg-white z-20  w-full'>
        <ul className='flex flex-row -mb-px px-8 mt-4'>{statusTabTitles}</ul>
      </div>
      <div className='px-8 pt-28 pb-8 '>
        <div id='tab-contents' className='w-full columns-3 gap-8 break-inside-avoid'>{tabContents}</div>
      </div>
      <div className='fixed bg-lightergray w-full h-full -z-10 inset-0'></div>
    </div>
  );
};

export default TabNavigation;
