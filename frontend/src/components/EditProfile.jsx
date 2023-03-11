import React, { useRef } from 'react';
import axios from '../api/axios';
import profilePic from '../assets/icons/default-displayphoto.svg';

const EditProfile = ({
  handleProfileModalClose,
  profileModalOpen,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  userId,
}) => {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);

  const token = JSON.parse(localStorage.getItem('token'));
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .put(
        `/edit/user/${userId}`,
        {
          firstName: firstNameRef.current.value,
          lastName: lastNameRef.current.value,
          email: emailRef.current.value,
          password: 'doowit',
        },
        config
      )
      .then((response) => {
        setFirstName(response?.data?.firstName);
        setLastName(response?.data?.lastName);
        setEmail(response?.data?.email);
        handleProfileModalClose();
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      {profileModalOpen ? (
        <section>
          <div
            id='edit-profile'
            tabIndex='-1'
            className='overflow-y-auto overflow-x-hidden fixed z-50 pt-2 w-full inset-0 h-modal md:h-full'
          >
            <div className='relative p-4 w-1/3 h-full md:h-auto inset-x-1/3 inset-y-16'>
              <div className='relative bg-white rounded-lg shadow'>
                <button
                  type='button'
                  className='absolute top-3 right-2.5 text-black bg-transparent hover:bg-lightgray hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'
                  onClick={() => handleProfileModalClose()}
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
                  <h1 className='text-xl font-bold tracking-tight text-darkblue pb-6 pt-2'>
                    Edit Profile
                  </h1>

                  <form onSubmit={handleSubmit} className='space-y-6'>
                    <div className='flex flex-col gap-4'>
                      <div className='flex flex-row pr-8 gap-6 '>
                        <img
                          src={profilePic}
                          alt=''
                          className=' border-lightergray w-16 h-16 rounded-full'
                        />
                        <button className='text-xs  font-bold py-2 px-3 rounded-lg text-brightblue border border-brightblue text-center hover:opacity-80 self-center my-auto'>
                          Update Photo
                        </button>
                        <button className='text-xs bg-lightgray font-bold py-2 px-3 rounded-lg text-grey border border-lightgray text-center hover:opacity-80 self-center my-auto'>
                          Remove
                        </button>
                      </div>
                      <div className='flex flex-col w-full'>
                        <div className='pt-4'>
                          <label
                            htmlFor='firstName'
                            className='text-sm opacity-50  mb-40 uppercase'
                          >
                            First Name
                          </label>
                          <input
                            type='text'
                            maxLength={11}
                            className='bg-gray-50 border border-lightgray text-black text-sm rounded-lg focus:ring-brightblue focus:border-blue-500 block p-2.5 w-full'
                            id='firstName'
                            name='firstName'
                            defaultValue={firstName}
                            ref={firstNameRef}
                          />
                        </div>
                        <div className='pt-4'>
                          <label
                            htmlFor='lastName'
                            className='text-sm opacity-50  mb-40 uppercase'
                          >
                            Last Name
                          </label>
                          <input
                            type='text'
                            maxLength={11}
                            className='bg-gray-50 border border-lightgray text-black text-sm rounded-lg focus:ring-brightblue focus:border-blue-500 block p-2.5 w-full'
                            id='lastName'
                            name='lastName'
                            defaultValue={lastName}
                            ref={lastNameRef}
                          />
                        </div>
                        <div className='pt-4'>
                          <label
                            htmlFor='email'
                            className='text-sm opacity-50  mb-40 uppercase'
                          >
                            Email Address
                          </label>
                          <input
                            type='email'
                            className='bg-gray-50 border border-lightgray text-black text-sm rounded-lg focus:ring-brightblue focus:border-blue-500 block p-2.5 w-full'
                            id='email'
                            name='email'
                            defaultValue={email}
                            ref={emailRef}
                          />
                        </div>
                        <div className='pt-8 pb-4 flex flex-row place-content-between items-center'>
                          <p className='text-xs font-bold opacity-80 uppercase'>
                            Change Password
                          </p>
                          <button
                            className='text-xs  font-bold py-2 px-3 rounded-lg
                        bg-lightergray text-gray border text-center hover:opacity-80 self-center my-auto'
                          >
                            Update Password
                          </button>
                        </div>
                        <span className='w-full border-b'></span>
                        <div className='flex flex-row w-full space-x-4 pt-9'>
                          <button
                            type='submit'
                            className='w-full text-white bg-brightblue hover:bg-brighterblue focus:ring-4 focus:outline-none focus:ring-lightgray rounded-lg text-sm font-bold text-center'
                          >
                            Update Profile
                          </button>

                          <button
                            type='submit'
                            className='w-full text-black bg-lightgray focus:outline-none focus:ring-lightgray rounded-lg text-sm font-bold px-5 py-2.5 text-center hover:brightness-90'
                            onClick={() => handleProfileModalClose()}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className='fixed inset-0 w-full h-full bg-black z-30 opacity-40'></div>
        </section>
      ) : (
        ''
      )}
    </>
  );
};

export default EditProfile;
