import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';

import TaskCard from '../task-cards/completedTaskCard';
import EmptyState from '../EmptyState';

const CompletedTab = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const COMPLETED_TASK_URL = '/tasks/completed';
  const token = JSON.parse(localStorage.getItem('token'));
  const config = {
    headers: { Authorization: `Bearer ${token}` }
};

  const fetchTasksData = async () => {
    await axios.get(COMPLETED_TASK_URL,
      config
      ).then((response) => {
      setCompletedTasks(response.data);
    });
  };

  useEffect(() => {
    fetchTasksData();
  }, []);

  return (
    <div>
    {(completedTasks.length === 0)  ? < EmptyState /> :
    <div>
    {completedTasks.map((task, id) => (
      <TaskCard
        id={task._id}
        key={id}
        title={task.title}
        description={task.description} 
        priority={task.priority}
        dueDate={task.dueDate}
        createdAt={task.createdAt}
      ></TaskCard>
    ))} </div>
    }
  </div>
  );
};

export default CompletedTab;
