import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

const TaskCard = ({ id, title, description, priority, dueDate, createdAt }) => {
  const handleDelete = async () => {
    await axios
      .delete(`http://localhost:5000/${id}`)
      .catch((error) => console.error(error));
  };

  return (
    <Link
      to={`/${id}`}
      className='block p-6 max-w-sm pl-8 bg-grey bg-opacity-10 rounded-lg border hover:grey mx-4 my-5 w-1/4'
    >
      <div className='flex justify-end '>
        <button
          id='dropdownButton'
          data-dropdown-toggle='dropdown'
          className='hidden sm:inline-block text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg text-sm'
          type='button'
        >
          <svg
            className='w-4 h-4'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z'></path>
          </svg>
        </button>
        {/* <!-- Dropdown menu --> */}
        <div
          id='dropdown'
          className='hidden z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow '
        >
          <ul class='py-1' aria-labelledby='dropdownButton'>
            <li>
              <a
                href='#'
                className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100'
              >
                Edit
              </a>
            </li>
            <li>
              {/* <button onClick={handleEdit}>Edit</button> */}
              <button onClick={handleDelete}>Delete</button>
            </li>
          </ul>
        </div>
      </div>
      <div className='flex flex-col'>
        <h1 className='text-2xl font-bold tracking-tight text-black pb-2'>
          {title}
        </h1>
        <p
          className={(() => {
            switch (priority) {
              case 'Low Priority':
                return 'border border-grey text-xs text-grey rounded-full py-1 w-24 text-center';
              case 'Medium Priority':
                return 'bg-lightgray text-xs text-grey rounded-full py-1 w-32 text-center';
              case 'High Priority':
                return 'bg-darkblue text-xs text-white rounded-full py-1 w-24 text-center';
              case 'Urgent':
                return 'bg-brightblue text-xs text-white rounded-full py-1 w-16 text-center';
              default:
                return null;
            }
          })()}
        >
          {' '}
          {priority}
        </p>
        <p className='text-sm font-bold text-black  pt-4'>
          Due Date: {dueDate}
        </p>
        <p className='text-sm font-normal text-grey pr-2'>{description}</p>
        <p className='pt-5 pb-1 text-xs font text-grey opacity-40'>
          Date Added: {createdAt}
        </p>
      </div>
    </Link>
  );
};

export default TaskCard;
