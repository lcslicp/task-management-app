import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const TaskPage = () => {
  const { id } = useParams();
  const [taskTitle, setTaskTitle] = useState();
  const [taskDescription, setTaskDescription] = useState();
  const [taskPriority, setTaskPriority] = useState();
  const [taskStatus, setTaskStatus] = useState();
  const [due, setDue] = useState();
  const [createdAt, setCreatedAt] = useState();

  const [dropdown, setDropdown] = useState('hidden');
  const token = JSON.parse(localStorage.getItem('token'));
  const TASK_URL = `/task/${id}`;
  const config = {
    headers: { Authorization: `Bearer ${token}` }
};
  const toggleTask = () => {
    dropdown === 'hidden' ? setDropdown('visible') : setDropdown('hidden');
  };
  const handleEdit = async () => {
    await axios.put(`/edit/${id}`).catch((error) => console.error(error));
  };
  const handleDelete = async () => {
    await axios.delete(`/${id}`).catch((error) => console.error(error));
  };

  const fetchTasksData = async () => {
    const { data } = await axios.get(TASK_URL,
      config
      )
      console.log(data)
      const { title, description, priority, status, dueDate, createdAt } = data;
      setTaskTitle(title);
      setTaskDescription(description);
      setTaskStatus(status);
      setTaskPriority(priority);
      setDue(dueDate);
      setCreatedAt(createdAt);
  };

  useEffect(() => {
    fetchTasksData();
  }, []);


  return (
    <div className='flex flex-row'>
      <Sidebar />
      <div className='flex flex-col w-full'>
        <Header />
        <div className='bg-lightgray w-full fixed inset-0'>
          <div
            className='absolute top-0 bottom-0 w-2/3 h-auto bg-white z-10 ml-96 pt-32 px-12'
          >
            <div className='flex justify-end '>
              <button
                id='dropdownButton'
                className='sm:inline-block text-gray-500 rounded-lg text-sm'
                type='button'
                onClick={toggleTask}
              >
                <svg
                  className='w-4 h-4 relative left-24 -top-8 hover:bg-gray-100 focus:outline-none border-1 rounded-full'
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
                style={{ visibility: `${dropdown}` }}
                className='relative -left-5 z-10 w-24 text-base list-none bg-lightergray rounded divide-y divide-gray-100 shadow'
              >
                <ul className='py-1' aria-labelledby='dropdownButton'>
                  <li>
                    <button
                      onClick={handleEdit}
                      className='block py-2 px-4 w-full text-sm text-gray-700 hover:bg-gray-100'
                    >
                      Edit
                    </button>
                  </li>
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

            <h1 className='text-2xl font-bold tracking-tight text-black pb-4 capitalize'>
              {taskTitle}
            </h1>
            <div className='flex flex-row'>
            <p
              className={(() => {
                switch (taskPriority) {
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
              {taskPriority}
            </p>
            <p
              className='ml-2 bg-darkblue text-xs text-white rounded-full py-1 w-24 text-center'
            >
              {' '}
              {taskStatus}
            </p>
            </div>
            <p className='text-sm font-bold text-black py-4'>
              Due Date: {due}
            </p>
            <p className='text-base leading-7 font-normal text-grey pr-2 pt-8 pb-5'>{taskDescription}</p>
            <p className='pt-5 pb-1 text-xs font text-grey opacity-40'>
              Date Added: {createdAt}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
