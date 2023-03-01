import React from 'react';

const Task = ({
  cardTitle,
  cardDescription,
  cardStatus,
  cardPriority,
  cardDue,
  cardDate,
  taskOpen,
  setTaskOpen,
}) => {
  const handleModalClose = () => {
    setTaskOpen(false);
  };

  let due = new Date(cardDue);
  let createdAt = new Date(cardDate);
  let dueDate = due.toLocaleDateString('default', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  let createdDate = createdAt.toLocaleDateString('default', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div>
      {taskOpen ? (
        <section>
          <div
            id='task-input'
            tabIndex='-1'
            className='overflow-y-auto overflow-x-hidden fixed z-50 pt-14 w-full md:inset-0 h-modal md:h-full'
          >
            <div className='relative p-4 w-1/2 h-full md:h-auto inset-x-1/3 inset-y-16'>
              {/* <!-- Modal content --> */}
              <div className='relative bg-white rounded-lg shadow'>
                <button
                  type='button'
                  className='absolute top-3 right-2.5 text-black bg-transparent hover:bg-lightgray hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'
                  onClick={handleModalClose}
                >
                  <svg
                    className='w-5 h-5'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                </button>
                <div className='py-6 px-6 lg:px-8'>
                  <h1 className='text-3xl font-bold tracking-tight text-darkblue pb-6 pt-6'>
                    {cardTitle}
                  </h1>
                  <div className='flex flex-row gap-4 pb-2'>
                    <p
                      className={(() => {
                        switch (cardPriority) {
                          case 'Low Priority':
                            return 'border border-grey text-xs text-grey rounded-full px-2 py-2 w-28 text-center';
                          case 'Medium Priority':
                            return 'bg-lightgray text-xs text-grey rounded-full px-2 py-2 w-36 text-center';
                          case 'High Priority':
                            return 'bg-darkblue text-xs text-white rounded-full px-3 py-2 w-28 text-center';
                          case 'Urgent':
                            return 'bg-brightblue text-xs text-white rounded-full px-2 py-2 w-24 text-center';
                          default:
                            return null;
                        }
                      })()}
                    >
                      {' '}
                      {cardPriority}
                    </p>
                    <p
                      className={(() => {
                        switch (cardStatus) {
                          case 'To Do':
                            return 'border border-grey text-xs text-grey rounded-full px-1 py-2 w-24 text-center';
                          case 'In Progress':
                            return 'bg-lightgray text-xs text-grey rounded-full px-2 py-2 w-36 text-center';
                          case 'Completed':
                            return 'bg-darkblue text-xs text-white rounded-full px-2 py-2 w-28 text-center';
                          case 'Overdue':
                            return 'bg-brightblue text-xs text-white rounded-full px-2 py-2 w-36 text-center';
                          default:
                            return null;
                        }
                      })()}
                    >
                      {' '}
                      {cardStatus}
                    </p>
                  </div>
                  <p className='text-grey text-xs pt-4 pb-1 font-normal '>
                    Date Added: {createdDate}
                  </p>
                  <p className='text-xs font-bold text-darkblue '>
                    Due Date: {dueDate == 'Invalid Date' ? 'Unknown' : dueDate}{' '}
                  </p>

                  <p className='text-sm font-normal text-grey pr-2 py-10 whitespace-pre-line leading-6'>
                    {cardDescription}
                  </p>
                </div>
                {/* <div className='py-6 px-6 lg:px-8'>
                  <button
                    type='submit'
                    className='w-full text-black bg-lightgray focus:outline-none focus:ring-lightgray rounded-lg text-sm font-bold px-5 py-2.5 text-center hover:brightness-90'
                    onClick={handleModalClose}
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='w-full text-white bg-brightblue hover:bg-brighterblue focus:ring-4 focus:outline-none focus:ring-lightgray rounded-lg text-sm font-bold px-5 py-2.5 text-center'
                  >
                    Add Task
                  </button>
                </div> */}
              </div>
            </div>
          </div>
          <div className='fixed inset-0 w-full h-full bg-black z-30 opacity-40'></div>
        </section>
      ) : (
        ''
      )}
    </div>
  );
};

export default Task;
