import React from 'react'

const TaskCard = ({title, description, createdAt}) => {
  return (
    <div>
        <h1>{title}</h1>
        <p>{description}</p>
        <p>Date Added: {createdAt}</p>
    </div>
  )
}

export default TaskCard