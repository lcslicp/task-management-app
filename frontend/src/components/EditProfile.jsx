import React from 'react';
import profilePic from '../assets/icons/default-displayphoto.svg'

const EditProfile = () => {
  const handleModalClose = () => {};
  return (
    <>
      <section>
        <div
          id='task-input'
          tabIndex='-1'
          className='overflow-y-auto overflow-x-hidden fixed z-50 pt-14 w-full md:inset-0 h-modal md:h-full'
        >
          <div className='relative p-4 w-1/2 h-full md:h-auto inset-x-1/3 inset-y-16'>
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
                <h1 className='text-xl font-bold tracking-tight text-darkblue pb-6 pt-6'>
                  Edit Profile
                </h1>

                <form action='' className='space-y-6'>
                  <div className='flex flex-row pb-2 gap-4'>
                    <div className='pr-8'>
                      <img src={profilePic} alt='' className=' border-lightergray border-8 w-24 h-24 rounded-full' />
                      <button className='text-xs bg-lightgray font-bold py-2 px-3 rounded-lg text-grey text-center mt-4'>Update Photo</button>
                    </div>
                    <div>
                      <div>
                        <label
                          htmlFor='firstName'
                          className='text-sm opacity-50  mb-40 uppercase'
                        >
                          First Name
                        </label>
                        <input
                          type='text'
                          className='bg-gray-50 border border-lightgray text-black text-sm rounded-lg focus:ring-brightblue focus:border-blue-500 block p-2.5 w-64'
                          id='firstName'
                          name='firstName'
                          value='Johnny'
                          onChange={''}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor='firstName'
                          className='text-sm opacity-50  mb-40 uppercase'
                        >
                          Last Name
                        </label>
                        <input
                          type='text'
                          className='bg-gray-50 border border-lightgray text-black text-sm rounded-lg focus:ring-brightblue focus:border-blue-500 block p-2.5 w-64'
                          id='firstName'
                          name='firstName'
                          value='Johnny'
                          onChange={''}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor='firstName'
                          className='text-sm opacity-50  mb-40 uppercase'
                        >
                          Email Address
                        </label>
                        <input
                          type='text'
                          className='bg-gray-50 border border-lightgray text-black text-sm rounded-lg focus:ring-brightblue focus:border-blue-500 block p-2.5 w-full'
                          id='firstName'
                          name='firstName'
                          value='Johnny'
                          onChange={''}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditProfile;
