import React, { useState, useEffect } from 'react';
import axios from 'axios';

import TaskCard from '../components/TaskCard';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);

    const fetchTasksData = async () => {
        const { data } = await axios.get('http://localhost:5000/tasks');

        setTasks(data);
    };

    useEffect(() => {
        fetchTasksData();
    }, []);


  return (
    <div>
        {tasks.map((task) => (
           <TaskCard
           id={task.id}
           key={task.id}
           title={task.title}
           description={task.description}
           createdAt={task.createdAt}></TaskCard> 
        ))}
    </div>
  )
}

export default Dashboard;