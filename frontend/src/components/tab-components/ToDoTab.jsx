import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';

import TaskCard from '../task-cards/defaultTaskCard';
import EmptyState from '../EmptyState';


const ToDoTab = () => {
  const [todoTasks, setTodoTasks] = useState([]);

  const TODO_TASK_URL = '/compose/newtask';

  const fetchTasksData = async () => {
    await axios.get(TODO_TASK_URL).then((response) => {
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
      ))} </div>
      }
    </div>
  );
};

export default ToDoTab;
