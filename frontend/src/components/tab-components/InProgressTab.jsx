import React, { useEffect, useState } from 'react';
import axios from 'axios';

import TaskCard from '../task-cards/defaultTaskCard';
// import EmptyState from '../EmptyState';

const InProgressTab = () => {
  const [inProgressTasks, setInProgressTasks] = useState([]);

  const fetchTasksData = async () => {
    await axios.get('http://localhost:5000/tasks/inprogress').then((response) => {
      setInProgressTasks(response.data);
    });
  };

  useEffect(() => {
    fetchTasksData();
  }, []);

  return (
    <div>
      {inProgressTasks.map((task) => (
        <TaskCard
          id={task._id}
          key={task._id}
          title={task.title}
          description={task.description}
          priority={task.priority}
          dueDate={task.dueDate}
          createdAt={task.createdAt}
        ></TaskCard>
      ))}
    </div>
  );
};

export default InProgressTab;
