import React, { useState, useEffect } from 'react';
import axios from 'axios';

import TaskCard from '../components/TaskCard';
import TaskInput from '../components/TaskInput';
import Header from '../components/Header';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);

    const fetchTasksData = async () => {
        await axios.get('http://localhost:5000/tasks').then((response) => {
          setTasks(response.data);
        })        
    };

    useEffect(() => {
        fetchTasksData();
    }, []);


  return (
    <div>
       <Header />
       <TaskInput />
        {tasks.map((task) => (
           <TaskCard
           id={task._id}
           key={task._id}
           title={task.title}
           description={task.description}
           priority={task.priority}
           dueDate={task.dueDate}
           createdAt={task.createdAt}></TaskCard> 
        ))}
    </div>
  )
}

export default Dashboard;