import React, { useEffect, useState } from 'react';
import axios from 'axios';

import TaskCard from '../task-cards/completedTaskCard';
// import EmptyState from '../EmptyState';

const CompletedTab = () => {
  const [completedTasks, setCompletedTasks] = useState([]);

  const fetchTasksData = async () => {
    await axios.get('http://localhost:5000/tasks/completed').then((response) => {
      setCompletedTasks(response.data);
    });
  };

  useEffect(() => {
    fetchTasksData();
  }, []);

  return (
    <div>
      {completedTasks.map((task) => (
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

export default CompletedTab;
