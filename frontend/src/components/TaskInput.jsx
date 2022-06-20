import axios from 'axios';
import React, { useState } from 'react';

const TaskInput = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskStatus, setTaskStatus] = useState('');
  const [taskPriority, setTaskPriority] = useState('');
  const [taskDue, setTaskDue] = useState('');
  //   const [taskResult, setTaskResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/compose/newtask', {
        title: taskTitle,
        description: taskDescription,
        status: taskStatus,
        priority: taskPriority,
        dueDate: taskDue,
      })
      .then((response) => console.log('Posting data', response))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Enter your task title...'
          id='title'
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <select
          name='status'
          value={taskStatus}
          onChange={(e) => setTaskStatus(e.target.value)}
        >
          <option value='' disabled>
            Status
          </option>
          <option value='To Do'>To Do</option>
          <option value='In Progress'>In Progress</option>
          <option value='Completed'>Completed</option>
        </select>
        <select
          name='priority'
          value={taskPriority}
          onChange={(e) => setTaskPriority(e.target.value)}
        >
          <option value='' disabled>
            Priority
          </option>
          <option value='Low Priority'>Low Priority</option>
          <option value='Medium Priority'>Medium Priority</option>
          <option value='High Priority'>High Priority</option>
          <option value='Urgent'>Urgent</option>
        </select>
        <p>
          Due Date:{' '}
          <input
            type='date'
            name='duedate'
            value={taskDue}
            onChange={(e) => setTaskDue(e.target.value)}
          />
        </p>

        <textarea
          placeholder='Write your task description...'
          cols='30'
          rows='10'
          id='description'
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        ></textarea>
        <button type='submit'>Add Task</button>
        {/* <p>{taskResult ? <p>{taskResult}</p> : null}</p> */}
      </form>
    </div>
  );
};

export default TaskInput;
