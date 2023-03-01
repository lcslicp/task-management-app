import React from 'react';

import TaskCard from '../task-cards/defaultTaskCard';
import EmptyState from '../EmptyState';

const InProgressTab = ({
  inProgressTasks,
  sort,
  priorityFilter,
  fetchTasksData,
  setTaskOpen,
}) => {
  let sortedTasks = [...inProgressTasks];

  if (sort === 'newest') {
    sortedTasks = [...inProgressTasks].sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  } else if (sort === 'oldest') {
    sortedTasks = [...inProgressTasks].sort((a, b) => {
      return new Date(a.createdAt) - new Date(b.createdAt);
    });
  } else if (sort === 'duedate') {
    sortedTasks = [...inProgressTasks].sort((a, b) => {
      if (a.dueDate === '' && b.dueDate === '') {
        return 0;
      } else if (a.dueDate === '') {
        return 1;
      } else if (b.dueDate === '') {
        return -1;
      } else {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
    });
    sortedTasks = sortedTasks
      .filter((task) => task.dueDate !== 'Invalid Date')
      .concat(sortedTasks.filter((task) => task.dueDate === 'Invalid Date'));
  }

  return (
    <div>
      {sortedTasks.length === 0 ||
      (priorityFilter.length === 0
        ? false
        : sortedTasks.filter((task) => priorityFilter.includes(task.priority))
            .length === 0) ? (
        <EmptyState />
      ) : (
        (priorityFilter.length === 0
          ? sortedTasks
          : sortedTasks.filter((task) => priorityFilter.includes(task.priority))
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
              key={task._id}
              title={task.title}
              description={task.description}
              priority={task.priority}
              dueDate={date}
              createdAt={task.createdAt}
              fetchTasksData={fetchTasksData}
              setTaskOpen={setTaskOpen}
            />
          );
        })
      )}
    </div>
  );
};

export default InProgressTab;
