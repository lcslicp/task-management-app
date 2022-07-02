import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

//Validate User
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;

//Validate password
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const SignupPage = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');

  const [userEmail, setUserEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  // useEffect(() => {
  //  const result = USER_REGEX.test(user);
  //  console.log(result);
  //  console.log(user);
  //  setValidEmail(result);
  // }, [user])

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
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const valid = PWD_REGEX.test(pwd);
    if (!valid) {
      setErrMsg('Invalid entry, please try again.');
      return;
    }
    try {
      const response = await axios.post(
        'http://localhost:5000/signup',
        {
          firstName: userFirstName,
          lastName: userLastName,
          email: userEmail,
          password: pwd,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: false,
        }
      );
      handleFormReset();
    } catch (error) {
      if (!error?.response) {
        setErrMsg('No Server Response');
      } else if (error.response?.status === 409) {
        setErrMsg('Email address already in use.');
      } else {
        setErrMsg('Failed to create account.');
      }
      errRef.current.focus();
    }
  };

  return (
    <section>
      <div></div>
      <div>
        <img src='' alt='' />
        <h2>Sign up</h2>
        <p>Create your account.</p>
        <div>
          <div className='text-sm bg-darkerblue text-white'>
            <p
              ref={errRef}
              className={errMsg ? 'block' : 'hidden'}
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
            />
            <label htmlFor='email'></label>
            <input
              type='email'
              id='email'
              placeholder='Email Address'
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
            <label htmlFor='pwd'></label>
            <input
              type='password'
              id='pwd'
              placeholder='Set Password'
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required
              aria-invalid={validPwd ? 'false' : 'true'}
              aria-describedby='pwdnote'
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <div
              id='pwdnote'
              className={pwdFocus && !validPwd ? 'block' : 'hidden'}
            >
              <p className='text-sm bg-darkerblue text-white'>
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
              type='password'
              id='confirmpwd'
              placeholder='Confirm Password'
              value={matchPwd}
              onChange={(e) => setMatchPwd(e.target.value)}
              required
              aria-invalid={validMatch ? 'false' : 'true'}
              aria-describedby='confirmnote'
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <div
              id='confirmnote'
              className={matchFocus && !validMatch ? 'block' : 'hidden'}
            >
              <p className='text-sm bg-darkerblue text-white'>
                Password does not match.
              </p>
            </div>
            <div>
              <button
                disabled={!validPwd || !validMatch ? true : false}
                className='w-full text-white bg-brightblue hover:bg-brighterblue focus:ring-4 focus:outline-none focus:ring-lightgray rounded-lg text-sm font-bold px-5 py-2.5 text-center disabled:bg-grey disabled:opacity-40'
              >
                Sign Up
              </button>
              <p>
                Already have an account? <Link to='/login'>Log in</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
