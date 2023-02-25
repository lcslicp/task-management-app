import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';

import TaskCard from '../task-cards/defaultTaskCard';
import EmptyState from '../EmptyState';

const InProgressTab = () => {
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const INPROGRESS_TASK_URL = '/tasks/inprogress';
  const token = JSON.parse(localStorage.getItem('token'));
  const config = {
    headers: { Authorization: `Bearer ${token}` }
};

  const fetchTasksData = async () => {
    await axios.get(INPROGRESS_TASK_URL,
      config
      ).then((response) => {
      setInProgressTasks(response.data);
    });
  };

  useEffect(() => {
    fetchTasksData();
  }, []);

  return (
    <div>
    {(inProgressTasks.length === 0)  ? < EmptyState /> :
    <div>
    {inProgressTasks.map((task, id) => {
      let dueDate = new Date(task.dueDate);
      let date = dueDate.toLocaleDateString('default', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
      return (
      <TaskCard
        id={task._id}
        key={id}
        title={task.title}
        description={task.description} 
        priority={task.priority}
        dueDate={date}
        createdAt={task.createdAt}
      ></TaskCard>
    )})} </div>
    }
  </div>
  );
};

export default InProgressTab;
