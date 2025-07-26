import axios from '../../api/axios';
import { useState } from 'react';

const TaskCard = ({
  id,
  title,
  description,
  priority,
  status,
  dueDate,
  createdAt,
  setTodoTasks,
  setInProgressTasks,
  handleTaskOpen,
  bgColor
}) => {
  const [dropdown, setDropdown] = useState('hidden');
  const token = JSON.parse(localStorage.getItem('token'));
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const toggleTask = () => {
    dropdown === 'hidden' ? setDropdown('visible') : setDropdown('hidden');
  };

  const handleDelete = async () => {
    let taskStatus;
    status === 'To Do' ? (taskStatus = 1) : (taskStatus = 2);
    try {
      await axios.delete(`${id}`, config);
      taskStatus === 1
        ? setTodoTasks((prevTasks) =>
            prevTasks.filter((task) => task._id !== id)
          )
        : setInProgressTasks((prevTasks) =>
            prevTasks.filter((task) => task._id !== id)
          );
    } catch (error) {
      console.error(error);
    }
  };

  const getRelativeTime = (createdAt) => {
    const now = new Date();
    const dateCreated = new Date(createdAt);
    const diffInMs = now - dateCreated;

    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else {
      const diffInWeeks = Math.floor(diffInDays / 7);
      return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
    }
  }

  return (
    <div className={`p-6 max-w-sm pl-8 rounded-2xl h-fit mb-5 break-inside-avoid cursor-pointer ${bgColor}`}>
      <div className='flex justify-end pt-7'>
        <button
          id='dropdownButton'
          className='sm:inline-block text-gray-500 rounded-lg text-sm'
          type='button'
          onClick={toggleTask}
        >
          <svg className='w-9 h-9 relative left-24 -top-8 focus:outline-none bg-white rounded-lg p-2' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3.293,20.707a1,1,0,0,1,0-1.414L17.586,5H12a1,1,0,0,1,0-2h8a1,1,0,0,1,1,1v8a1,1,0,0,1-2,0V6.414L4.707,20.707a1,1,0,0,1-1.414,0Z"/></svg>
        </button>
        {/* <!-- Dropdown menu --> */}
        <div
          id='dropdown'
          style={{ visibility: `${dropdown}` }}
          className='relative -left-5 -top-8 z-10 w-24 text-base list-none bg-lightergray rounded divide-y divide-gray-100 shadow'
        >
          <ul aria-labelledby='dropdownButton'>
            <li>
              <button
                onClick={handleDelete}
                className='block py-2 px-4 w-full text-sm text-gray-700 hover:bg-gray-100'
              >
                Delete
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className='flex flex-col -mt-14' onClick={() => handleTaskOpen(id)}>
        <h2 className='text-2xl text-black pb-2 w-72 font-medium'>
          {title}
        </h2>
        <p className='text-sm text-black font-light'>
          Due Date: {dueDate == 'Invalid Date' ? 'Unknown' : dueDate}
        </p>
        <p className='text-xs font-light text-gray pr-2 py-3 whitespace-pre-line opacity-50'>
        {description ? description.length > 250 ? description.substring(0, 250) + '...' : description : ''}
        </p>
        <p
          className={(() => {
            switch (priority) {
              case 'Low Priority':
                return 'text-sm bg-softgreen rounded-full py-1 px-3 w-fit text-center inline-flex items-center gap-2';
              case 'Medium Priority':
                return 'text-sm bg-softblue rounded-full py-1 px-3 w-fit text-center inline-flex items-center gap-2';
              case 'High Priority':
                return 'text-sm bg-softyellow rounded-full py-1 px-3 w-fit text-center inline-flex items-center gap-2';
              case 'Urgent':
                return 'text-sm bg-softred rounded-full py-1 px-3 w-fit text-center inline-flex items-center gap-2';
              default:
                return null;
            }
          })()}
        >
          <span  className={(() => {
            switch (priority) {
              case 'Low Priority':
                return 'rounded-full bg-green-300 h-3 w-3';
              case 'Medium Priority':
                return 'rounded-full bg-blue-400 h-3 w-3';
              case 'High Priority':
                return 'rounded-full bg-yellow-300 h-3 w-3';
              case 'Urgent':
                return 'rounded-full bg-red-400 h-3 w-3';
              default:
                return null;
            }
          })()}></span>
          {' '}
          {priority}
        </p>
        
        
        <p className='pt-5 pb-1 text-xs font text-grey opacity-40'>
          Date Added: {getRelativeTime(createdAt)}
        </p>
      </div>
    </div>
  );
};

export default TaskCard;
