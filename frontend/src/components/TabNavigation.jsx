import React from 'react';

const TabNavigation = ({ tabdata, activeStatusTab, setActiveStatusTab }) => {
  const statusTabTitles = tabdata.map((tab, id) => (
    <li
      key={id}
      onClick={() => setActiveStatusTab(tab.id)}
      className={
        activeStatusTab === tab.id
          ? 'px-8 inline-block p-4 rounded-t-lg border-b-2 text-black border-black hover:text-brightblue hover:border-brighterblue cursor-pointer '
          : 'px-8 inline-block p-4 text-gray rounded-t-lg border-b cursor-pointer'
      }
    >
      {tab.tabTitle}
    </li>
  ));

  const tabContents = tabdata.map((content, id) => (
    <div
      className='w-full'
      key={id}
      style={activeStatusTab === content.id ? {} : { display: 'none' }}
    >
      {content.tabContent}
    </div>
  ));

  return (
    <div className='pt-28'>
      <div className='text-normal font-medium text-center border-b fixed bg-white z-10 w-full '>
        <ul className='flex flex-row -mb-px px-8 mt-4'>{statusTabTitles}</ul>
      </div>
      <div className='px-5 pt-24 pb-5'>
        <div
          id='tab-contents'
          className='w-full columns-3 break-inside-avoid gap-5'
        >
          {tabContents}
        </div>
      </div>
      <div className='fixed w-full h-full -z-10 inset-0'></div>
    </div>
  );
};

export default TabNavigation;
