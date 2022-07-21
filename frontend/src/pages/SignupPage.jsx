import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios.js';

import doowitLogo from '../assets/icons/doowit-logo-colored.svg';
import signUpImage from '../assets/images/signuppage-img.png';

const SIGNUP_URL = '/signup';

//Validate password
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const SignupPage = () => {
  const userRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');

  const [userEmail, setUserEmail] = useState('');

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState('password');

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('hidden');

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [pwd, matchPwd]);

  const handleFormReset = () => {
    setUserFirstName('');
    setUserLastName('');
    setUserEmail('');
    setPwd('');
    setMatchPwd('');
  };

  const togglePassword = () => {
    passwordVisibility === 'password' ? setPasswordVisibility('text') : setPasswordVisibility('password');
  }

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const valid = PWD_REGEX.test(pwd);
    if (!valid) {
      setErrMsg('Invalid entry, please try again.');
      return;
    }
    try {
      const response = await axios.post(
        SIGNUP_URL,
        JSON.stringify({
          firstName: userFirstName,
          lastName: userLastName,
          email: userEmail,
          password: pwd,
        }),

        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: false,
        }
      );
      localStorage.setItem('token', JSON.stringify(response?.data?.token));
      navigate('/dashboard');
      handleFormReset();
      console.log(data);
    } catch (error) {
      if (!error?.response) {
        setErrMsg('No Server Response');
        console.log(error);
      } else if (error.response?.status === 409) {
        setErrMsg('Email address already in use.');
      } else {
        setErrMsg('Failed to create account.');
      }
      errRef.current.focus();
    }
  };

  return (
    <section className='w-screen h-screen flex flex-row'>
      <div className='flex flex-col w-2/5 pl-32 pt-32'>
        <img src={doowitLogo} className='w-1/4 h-auto pr-8' />
        <h2 className='text-5xl font-bold text-darkblue pt-4'>Sign up</h2>
        <p className='text-sm w-2/3 pt-5 pb-4'>Create your account.</p>
        <div>
          <div className={errMsg ? 'block' : 'hidden'}>
            <p
              ref={errRef}
              className='text-xs bg-grey text-white w-2/3 p-4 rounded-lg'
              aria-live='assertive'
            >
              {errMsg}
            </p>
          </div>

          <form onSubmit={handleSignupSubmit}>
            <label htmlFor='firstname'></label>
            <input
              type='text'
              id='firstname'
              autoComplete='off'
              placeholder='First Name'
              ref={userRef}
              value={userFirstName}
              onChange={(e) => setUserFirstName(e.target.value)}
              required
              className='bg-gray-50 border border-lightgray text-black text-sm rounded-lg focus:ring-brightblue focus:border-blue-500 inline-block w-36 p-2.5 mt-6 mr-4'
            />
            <label htmlFor='lastname'></label>
            <input
              type='text'
              id='lastname'
              autoComplete='off'
              placeholder='Last Name'
              value={userLastName}
              onChange={(e) => setUserLastName(e.target.value)}
              required
              className='bg-gray-50 border border-lightgray text-black text-sm rounded-lg focus:ring-brightblue focus:border-blue-500 inline-block w-36 p-2.5 mt-6'
            />
            <label htmlFor='email'></label>
            <input
              type='email'
              id='email'
              placeholder='Email Address'
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
              className='bg-gray-50 border border-lightgray text-black text-sm rounded-lg focus:ring-brightblue focus:border-blue-500 block w-2/3 p-2.5 mt-6'
            />
            <label htmlFor='pwd'></label>
            <input
              type={passwordVisibility}
              id='pwd'
              placeholder='Set Password'
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required
              aria-invalid={validPwd ? 'false' : 'true'}
              aria-describedby='pwdnote'
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              className='bg-gray-50 border border-lightgray text-black text-sm rounded-lg focus:ring-brightblue focus:border-blue-500 block w-2/3 p-2.5 mt-6'
            />
            <div
              id='pwdnote'
              className={pwdFocus && !validPwd ? 'block' : 'hidden'}
            >
              <p className='text-xs bg-grey text-white w-2/3 p-4 rounded-lg'>
                8 to 24 characters. <br />
                Must include uppercase and lowercase letters, a number and a
                special character. <br />
                Allowed special characters:{' '}
                <span aria-label='exclamation mark'>!</span>
                <span aria-label='at symbol'>@</span>
                <span aria-label='hashtag'>#</span>
                <span aria-label='dollar sign'>$</span>
              </p>
            </div>
            <label htmlFor='confirmpwd'></label>
            <input
              type={passwordVisibility}
              id='confirmpwd'
              placeholder='Confirm Password'
              value={matchPwd}
              onChange={(e) => setMatchPwd(e.target.value)}
              required
              aria-invalid={validMatch ? 'false' : 'true'}
              aria-describedby='confirmnote'
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
              className='bg-gray-50 border border-lightgray text-black text-sm rounded-lg focus:ring-brightblue focus:border-blue-500 block w-2/3 p-2.5 mt-6'
            />
            <div
              id='confirmnote'
              className={matchFocus && !validMatch ? 'block' : 'hidden'}
            >
              <p className='text-xs bg-grey text-white w-2/3 p-4 rounded-lg'>
                Password does not match.
              </p>
            </div>
            <div className='pt-4'>
              <input type='checkbox' onClick={togglePassword} className='rounded-md' /><span className='text-sm pl-2'> Show Password</span></div>
            <div>
              <button
                disabled={!validPwd || !validMatch ? true : false}
                className='w-1/4 text-white bg-brightblue hover:bg-brighterblue hover:scale-110 focus:ring-4 focus:outline-none focus:ring-lightgray rounded-lg text-sm font-bold px-5 py-2.5 text-center disabled:bg-grey disabled:opacity-30 disabled:cursor-not-allowed mt-8'
              >
                Sign Up
              </button>
              <p className='text-xs pt-4'>
                Already have an account?{' '}
                <strong>
                  <Link to='/login' className='hover:underline hover:italic'>
                    Log in.
                  </Link>
                </strong>
              </p>
            </div>
          </form>
        </div>
      </div>
      <div className='bg-brightblue w-2/3 flex flex-col overflow-x-hidden'>
        <div className='flex flex-row items-center justify-end gap-10 pt-12'>
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
          <h2 className='text-5xl text-white pt-12 pl-24 w-2/3'>
            Join the Doowit community today!
          </h2>
          <img src={signUpImage} alt='task cards' className='ml-5 pl-12 pr-24 pt-1 w-full  h-auto' />
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
