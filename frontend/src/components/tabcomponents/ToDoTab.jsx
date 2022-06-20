import React, { useEffect, useState } from 'react';
import axios from 'axios';

import TaskCard from '../TaskCard';
import EmptyState from '../EmptyState';

const ToDoTab = () => {
  const [todoTasks, setTodoTasks] = useState([]);
  const [todoFilter, setTodoFilter] = useState([]);

  const fetchTasksData = async () => {
    await axios.get('http://localhost:5000/tasks').then((response) => {
      setTodoTasks(response.data);
    })        
};

  useEffect(() => {
    fetchTasksData();
  }, []);

  useEffect(() => {
    const todos = todoTasks.filter(response => response.status === 'To Do');
    if (!todos) {
      return <EmptyState />
    } else
    setTodoFilter(todos)
    console.log('Displaying to do tasks.')
  }, []);

  return (
    <div>
      {todoFilter.map((task) => (
        <TaskCard
          id={task._id}
          key={task._id}
          title={task.title}
          description={task.description}
          priority={task.priority}
          status={task.status}
          dueDate={task.dueDate}
          createdAt={task.createdAt}
        ></TaskCard>
      ))}
      todos
    </div>
  );
};

export default ToDoTab;
