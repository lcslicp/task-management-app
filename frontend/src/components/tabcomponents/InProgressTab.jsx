import React, { useEffect, useState } from 'react';
import axios from 'axios';

import TaskCard from '../TaskCard';
import EmptyState from '../EmptyState';

const InProgressTab = () => {
    const [inprogressTasks, setInprogressTasks] = useState([]);
    const [inprogressFilter, setInprogressFilter] = useState([]);

    const fetchTasksData = async () => {
        await axios.get('http://localhost:5000/tasks').then((response) => {
            setInprogressTasks(response.data);
        })        
    };

    useEffect(() => {
        fetchTasksData();
      }, []);

      useEffect(() => {
        const inprogress = inprogressTasks.filter(response => response.status === 'In Progress');
        if (!inprogress) {
          return <EmptyState />
        } else {
        setInprogressFilter(inprogress)
        console.log('Displaying tasks that are in progress.')}
      }, []);
    

  return (
    <div>inprogress tasks
        {inprogressFilter.map((task) => (
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
      ))}</div>
  )
}

export default InProgressTab