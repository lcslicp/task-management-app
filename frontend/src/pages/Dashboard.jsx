import React from 'react';

import TaskInput from '../components/TaskInput';
import Header from '../components/Header';
import TabNavigation from '../components/tabcomponents/TabNavigation';
import Sidebar from '../components/Sidebar';
// import ToDoTab from '../components/tabcomponents/ToDoTab';
// import InProgressTab from '../components/tabcomponents/InProgressTab';

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