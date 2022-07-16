import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';

import TaskCard from '../task-cards/defaultTaskCard';
import EmptyState from '../EmptyState';

const InProgressTab = () => {
  const [inProgressTasks, setInProgressTasks] = useState([]);

  const INPROGRESS_TASK_URL = '/compose/newtask';

  const fetchTasksData = async () => {
    await axios.get(INPROGRESS_TASK_URL).then((response) => {
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
    {inProgressTasks.map((task, id) => (
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

export default InProgressTab;
