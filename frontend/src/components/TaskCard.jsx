import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

const TaskCard = ({
  id,
  title,
  description,
  priority,
  status,
  dueDate,
  createdAt,
}) => {
  
  const handleDelete = async () => {

      await axios.delete(`http://localhost:5000/${id}`)
      .catch((error) => console.error(error));
     
  };

  return (
    <Link to={`/${id}`}>
      <h1>{title}</h1>
      <p>{priority}</p>
      <p>{status}</p>
      <p>Due Date: {dueDate}</p>
      <p>{description}</p>
      <p>Date Added: {createdAt}</p>
      <div>
        {/* <button onClick={handleEdit}>Edit</button> */}
        <button onClick={handleDelete}>Delete</button>
      </div>
    </Link>
  );
};

export default TaskCard;
