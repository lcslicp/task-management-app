import React, { useState, useEffect } from 'react';
import axios from 'axios';

import EmptyState from '../EmptyState';
import TaskCard from '../TaskCard';

const TabNavigation = () => {
  const [tasksApi, setTasksApi] = useState();
  const [todoTasks, setTodoTasks] = useState();
  const [activeTab, setActiveTab] = useState('todo');

  const fetchTasksData = async () => {
    await axios
      .get('http://localhost:5000/tasks')
      .then((response) => {
        setTasksApi(response.data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchTasksData();
  }, []);

  // const filterTodoTasks = () => {
  //   const todoFilteredTasks = tasksApi.filter((task) => task.status === 'To Do');
  //   setTodoTasks(todoFilteredTasks);
  // }

  // useEffect(() => {
  //   filterTodoTasks();
  // }, [todoTasks]);

  const toggleTaskTab = (index) => {
    setActiveTab(index);
  };





  return (
    <div>
      <div id='tab-nav'>
        <button onClick={() => toggleTaskTab(1)} className={activeTab === 1 ? 'active-tabs' : 'tabs'}>To Do</button>

        <button onClick={() => toggleTaskTab(2)} className={activeTab === 1 ? 'active-tabs' : 'tabs'}>In Progress</button>

        <button onClick={() => toggleTaskTab(3)} className={activeTab === 1 ? 'active-tabs' : 'tabs'}>Completed</button>

        <button onClick={() => toggleTaskTab(4)} className={activeTab === 1 ? 'active-tabs' : 'tabs'}>OverDue</button>

      </div>
        <div className={activeTab === 1 ? 'active-content' : <EmptyState />}>
          {tasksApi.map((task) => (
           <TaskCard
           id={task._id}
           key={task._id}
           title={task.title}
           description={task.description}
           priority={task.priority}
           dueDate={task.dueDate}
           createdAt={task.createdAt}></TaskCard>))}todo display
        </div>

        <div className={activeTab === 2 ? 'active-content' : <EmptyState />}>
          inprogress display
        </div>
        <div className={activeTab === 3 ? 'active-content' : <EmptyState />}>
        completed display
        </div>
        <div className={activeTab === 4 ? 'active-content' : <EmptyState />}>
        overdue display
        </div>
    </div>
  );
};

export default TabNavigation;
