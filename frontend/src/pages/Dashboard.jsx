import React from 'react';

import TaskInput from '../components/TaskInput';
import Header from '../components/Header';
import TabNavigation from '../components/TabNavigation';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {

  return (
    <div className='flex flex-row'>
      <Sidebar />
      <div className='flex flex-col w-full'>
      <Header />
       <TabNavigation />
       <TaskInput />
      </div>
      
    </div>
  )
}

export default Dashboard;