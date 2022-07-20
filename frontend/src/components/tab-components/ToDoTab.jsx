import React, { useEffect, useState, useContext } from 'react';
import axios from '../../api/axios';

import TaskCard from '../task-cards/defaultTaskCard';
import EmptyState from '../EmptyState';

const ToDoTab = () => {
  const [todoTasks, setTodoTasks] = useState([]);
  const token = JSON.parse(localStorage.getItem('token'));
  const TODO_TASK_URL = '/tasks/todo';
  const config = {
    headers: { Authorization: `Bearer ${token}` }
};

  const fetchTasksData = async () => {
    await axios.get(TODO_TASK_URL,
      config
      ).then((response) => {
      setTodoTasks(response.data);
    });
  };

  useEffect(() => {
    fetchTasksData();
  }, []);

  return (
    <div>
      {(todoTasks.length === 0)  ? < EmptyState /> :
      <div>
      {todoTasks.map((task, id) => (
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

export default ToDoTab;
