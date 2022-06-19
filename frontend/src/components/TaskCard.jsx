import React from 'react';
import { Link } from 'react-router-dom';

const TaskCard = ({ id, title, description, status, priority, dueDate, createdAt }) => {
  return (
    <Link to={`/edit/${id}`}>
      <h1>{title}</h1>
      <p>{status}</p>
      <p>{priority}</p>
      <p>{dueDate}</p>
      <p>{description}</p>
      <p>Date Added: {createdAt}</p>
    </Link>
  );
};

export default TaskCard;
