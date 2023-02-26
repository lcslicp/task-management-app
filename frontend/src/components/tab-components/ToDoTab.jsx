import React from 'react';

import TaskCard from '../task-cards/defaultTaskCard';
import EmptyState from '../EmptyState';

const ToDoTab = ({ todoTasks, priorityFilter }) => {
  return (
    <div>
      {todoTasks.length === 0 ||
      (priorityFilter.length === 0
        ? false
        : todoTasks.filter((task) => priorityFilter.includes(task.priority))
            .length === 0) ? (
        <EmptyState />
      ) : (
        (priorityFilter.length === 0
          ? todoTasks
          : todoTasks.filter((task) => priorityFilter.includes(task.priority))
        ).map((task, id) => {
          let dueDate = new Date(task.dueDate);
          let date = dueDate.toLocaleDateString('default', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          });
          return (
            <TaskCard
              id={task._id}
              key={id}
              title={task.title}
              description={task.description}
              priority={task.priority}
              dueDate={date}
              createdAt={task.createdAt}
            />
          );
        })
      )}
    </div>
  );
};

export default ToDoTab;
