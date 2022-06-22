import React, { useEffect, useState } from 'react';
import axios from 'axios';

import TaskCard from '../task-cards/defaultTaskCard';
// import EmptyState from '../EmptyState';

const ToDoTab = () => {
  const [todoTasks, setTodoTasks] = useState([]);

  const fetchTasksData = async () => {
    await axios.get('http://localhost:5000/tasks/todo').then((response) => {
      setTodoTasks(response.data);
    });
  };

  useEffect(() => {
    fetchTasksData();
  }, []);

  return (
    <div>
      {todoTasks.map((task) => (
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

export default ToDoTab;
