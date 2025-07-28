import React from 'react';

const TabNavigation = ({ tabdata, activeStatusTab, setActiveStatusTab }) => {
  const statusTabTitles = tabdata.map((tab, id) => (
    <li
      key={id}
      onClick={() => setActiveStatusTab(tab.id)}
      className={
        activeStatusTab === tab.id
          ? 'px-8 inline-block p-4 rounded-t-lg border-b-2 text-black border-black hover:text-brightblue  cursor-pointer '
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
    <div className='px-10'>
      <div className='flex font-medium text-center bg-white z-10 w-full bg-offwhite border border-red-500 items-center justify-center' id='navigation'>
        <ul className=''>{statusTabTitles}</ul>
      </div>
      <div className=' pt-24 pb-5'>
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
