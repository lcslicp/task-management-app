import React, { useRef, useState, useEffect, useContext  } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from '../api/axios.js';
import { UserContext } from '../context/userContext';
import doowitLogo from '../assets/icons/doowit-logo-colored.svg';


const LOGIN_URL = '/login';

const LoginPage = () => {
  const navigate = useNavigate();

  const emailRef = useRef();
  const errRef = useRef();

  const [userEmail, setUserEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [setLoggedUser] = useContext(UserContext);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [userEmail, pwd]);


  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
       const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email: userEmail, password: pwd }),
        {
          headers: {
            'Content-Type': 'application/json' },
            withCredentials: true,
        }
        );
      localStorage.setItem('token', JSON.stringify(response?.data?.token))
      // setLoggedUser(response?.data?.token);
      // setHeader('x-auth-token', response?.data?.token)
      
      navigate('/dashboard');
      setUserEmail('');
      setPwd('');
    } catch (error) {
      if (!error?.response) {
        setErrMsg('No Server Response');
      } else if (error.response?.status === 400) {
        setErrMsg('Invalid credentials, please try again.');
      } else if (error.response?.status === 401) {
        setErrMsg('Invalid credentials, please try again.');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  };

  return (
    <section className='w-screen h-screen flex flex-row'>
      <div className='flex flex-col w-2/5 pl-32 pt-48'>
      <img src={doowitLogo} className='w-1/4 h-auto pr-8' />
        <h2  className='text-5xl font-bold text-darkblue pt-4'>Log in</h2>
        <p className='text-sm w-2/3 pt-5 pb-8'>Please enter your login details.</p>
        <div>
          <div className={errMsg ? 'block' : 'hidden'}>
            <p
              ref={errRef}
              aria-live='assertive'
              className='text-xs bg-grey text-white w-2/3 p-4 rounded-lg'
            >
              {errMsg}
            </p>
          </div>

          <form onSubmit={handleLoginSubmit}>
            <label htmlFor='email'></label>
            <input
              type='email'
              id='email'
              placeholder='Email Address'
              value={userEmail}
              ref={emailRef}
              autoComplete='off'
              onChange={(e) => setUserEmail(e.target.value)}
              required
              className='bg-gray-50 border border-lightgray text-black text-sm rounded-lg focus:ring-brightblue focus:border-blue-500 block w-2/3 p-2.5 mt-6'
            />
            <label htmlFor='password'></label>
            <input
              type='password'
              id='password'
              placeholder='Password'
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required
              className='bg-gray-50 border border-lightgray text-black text-sm rounded-lg focus:ring-brightblue focus:border-blue-500 block w-2/3 p-2.5 mt-6'
            />
            <div>
              <button className='w-1/4 text-white bg-brightblue hover:bg-brighterblue hover:scale-110 focus:ring-4 focus:outline-none focus:ring-lightgray rounded-lg text-sm font-bold px-5 py-2.5 text-center disabled:bg-grey disabled:opacity-30 disabled:cursor-not-allowed mt-8'>
                Log in
              </button>
              <p className='text-xs pt-4'>
                Don't have an account?{' '}
                <Link
                  to='/signup'
                  className='font-bold hover:italic hover:underline'
                >
                  Sign Up.
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <div className='bg-brightblue w-2/3 flex flex-col'>
        <div  className='flex flex-row items-center justify-end gap-10 pt-12'>
        <ul className='flex mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium pr-24 gap-5 z-10'>
            <li>
              <a
                href='#'
                className='block py-2 pl-3 ml-12 text-white font-semibold hover:scale-110 md:p-0'
              >
                How It Works
              </a>
            </li>
            <li>
              <a
                href='#'
                className='block py-2 pl-3 text-white font-semibold hover:scale-110 md:p-0'
              >
                Support
              </a>
            </li>
            <li>
              <a
                href='#'
                className='block py-2 pl-3 text-white font-semibold hover:scale-110 md:p-0'
              >
                Help
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className='text-5xl text-white pt-24 pl-16 w-full'>Welcome back to Doowit!</h2>
          <p className='text-2xl text-white pt-1 pl-16 w-2/3'>Your tasks are waiting.</p>
        </div>
      
      </div>
    </section>
  );
};

export default LoginPage;
