import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';

import TaskCard from '../task-cards/completedTaskCard';
import EmptyState from '../EmptyState';

const CompletedTab = ({ completedTasks }) => {
  return (
    <div>
    {(completedTasks.length === 0)  ? < EmptyState /> :
    <div>
    {completedTasks.map((task, id) => {
      let dueDate = new Date(task.dueDate);
      let date = dueDate.toLocaleDateString('default', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
      return (
      <TaskCard
        id={task._id}
        key={id}
        title={task.title}
        description={task.description} 
        priority={task.priority}
        dueDate={date}
        createdAt={task.createdAt}
      ></TaskCard>
    )})} </div>
    }
  </div>
  );
};

export default CompletedTab;
