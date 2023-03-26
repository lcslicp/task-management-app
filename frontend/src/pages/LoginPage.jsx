import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/ui-states/loadingSpinner.jsx';

import axios from '../api/axios.js';
import doowitLogo from '../assets/icons/doowit-logo-colored.svg';
import loginImage from '../assets/images/loginpage-img.png';

const LOGIN_URL = '/login';

const LoginPage = () => {
  const navigate = useNavigate();

  const emailRef = useRef();
  const errRef = useRef();

  const [userEmail, setUserEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState('password');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [userEmail, pwd]);

  const togglePassword = () => {
    passwordVisibility === 'password'
      ? setPasswordVisibility('text')
      : setPasswordVisibility('password');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email: userEmail, password: pwd }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      localStorage.setItem('token', JSON.stringify(response?.data?.token));
      navigate('/dashboard');
      setUserEmail('');
      setPwd('');
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
        <a href='/'>
          <img src={doowitLogo} className='w-1/4 h-auto pr-8' />
        </a>
        <h2 className='text-5xl font-bold text-darkblue pt-4'>Log in</h2>
        <p className='text-sm w-2/3 pt-5 pb-8'>
          Please enter your login details.
        </p>
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
              type={passwordVisibility}
              id='password'
              placeholder='Password'
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required
              className='bg-gray-50 border border-lightgray text-black text-sm rounded-lg focus:ring-brightblue focus:border-blue-500 block w-2/3 p-2.5 mt-6'
            />
            <div className='pt-4'>
              <input
                type='checkbox'
                onClick={togglePassword}
                className='rounded-md'
              />
              <span className='text-sm pl-2'> Show Password</span>
            </div>

            <div>
              <button className='w-1/4 text-white bg-brightblue hover:bg-brighterblue focus:ring-4 focus:outline-none focus:ring-lightgray rounded-lg text-sm font-bold px-5 py-2.5 text-center disabled:bg-grey disabled:opacity-30 disabled:cursor-not-allowed mt-8 flex justify-center'>
                {loading ? <LoadingSpinner /> : 'Log in'}
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
        <div>
          <h2 className='text-5xl text-white pt-24 pl-24 w-full'>
            Welcome back to Doowit!
          </h2>
          <p className='text-2xl text-white pt-1 pl-24 w-2/3'>
            Your tasks are waiting.
          </p>
          <img
            src={loginImage}
            alt='task cards'
            className='pl-32 pr-8 pt-1 w-3/4  h-auto'
          />
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
