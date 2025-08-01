import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "../api/axios.js";
import { AxiosError } from "axios";
import doowitLogo from "../assets/icons/doowitlogo-colored.svg";
import loginImage from "../assets/images/login-mockup.svg";

const LOGIN_URL = "/login";

const LoginPage = () => {
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLInputElement>(null);

  const [userEmail, setUserEmail] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");
  const [passwordVisibility, setPasswordVisibility] =
    useState<string>("password");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [userEmail, pwd]);

  const togglePassword = () => {
    passwordVisibility === "password"
      ? setPasswordVisibility("text")
      : setPasswordVisibility("password");
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email: userEmail, password: pwd }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      localStorage.setItem("token", JSON.stringify(response?.data?.token));
      navigate("/dashboard");
      setUserEmail("");
      setPwd("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const err = error as AxiosError;
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Invalid credentials, please try again.");
      } else if (err.response?.status === 401) {
        setErrMsg("Invalid credentials, please try again.");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current?.focus();
    }
  };

  return (
    <section className="flex w-full h-screen" id="login-screen">
      <div
        className="flex flex-col items-center justify-center gap-4 w-[45%] bg-brandblack text-white px-24 "
        id="leftside-content"
      >
        <div className="flex flex-col items-start w-fit -mb-8 pl-14">
          <div
            id="leftside-copy"
            className="flex flex-col gap-4 justify-start w-fit"
          >
            <h2 className="text-4xl font-semibold">
              {" "}
              <span className="text-softgreen">
                {" "}
                Welcome Back.{" "}
              </span> <br /> Let&#39;s Get Productive.
            </h2>
            <p className="text-base font-light text-left">
              Log in and take charge of your workflow. <br /> Your dashboard is
              ready.
            </p>
          </div>
          <img
            src={loginImage}
            alt="login page task cards mockup"
            className=" pt-8 w-[90%] h-auto"
          />
        </div>
      </div>
      <div
        id="rightside-content"
        className="flex flex-col justify-center w-[45%] px-20 gap-6 mx-auto"
      >
        <div id="rightside-copy" className="w-full">
          <h2 className="text-2xl font-semibold">Log in</h2>
          <p className="text-darkgray">Please enter your login details.</p>
        </div>

        <div
          className={`${
            errMsg ? "block" : "hidden"
          } bg-softred text-togglegray border border-brandred rounded-lg px-3 py-2`}
          id="error-msg"
        >
          <p
            ref={errRef}
            aria-live="assertive"
            className="text-sm font-light text-red-500"
          >
            {errMsg}
          </p>
        </div>
        <form
          onSubmit={handleLoginSubmit}
          className="w-full flex flex-col gap-4"
          id="login-form"
        >
          <div className="flex flex-col" id="email">
            <label
              htmlFor="email"
              className="uppercase font-medium text-xs text-togglegray pb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
              value={userEmail}
              ref={emailRef}
              autoComplete="off"
              onChange={(e) => setUserEmail(e.target.value)}
              required
              className="bg-offwhite border-none rounded-lg placeholder-coolgray h-10 placeholder:font-light placeholder:text-sm focus:ring-coolgray focus:ring-1"
            />
          </div>

          <div className="flex flex-col" id="password">
            <label
              htmlFor="password"
              className="uppercase font-medium text-xs text-togglegray pb-2"
            >
              Password
            </label>
            <div className="relative">
              <div
                className="absolute inset-y-0 right-0 flex items-center pe-3 pr-3"
                onClick={() => togglePassword()}
              >
                {passwordVisibility === "text" ? (
                  <svg
                    id="hide-icon"
                    className="w-4 h-auto hover:cursor-pointer"
                    viewBox="0 0 20 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.8675 8.38732C19.0612 6.6886 18.1017 5.3032 16.9889 4.23112L15.8219 5.39816C16.7735 6.30762 17.6025 7.49736 18.3193 8.9791C16.4109 12.9289 13.702 14.8051 9.99999 14.8051C8.88876 14.8051 7.86523 14.634 6.9294 14.2918L5.66488 15.5563C6.96465 16.1565 8.40968 16.4566 9.99999 16.4566C14.4085 16.4566 17.6977 14.1606 19.8675 9.56858C19.9548 9.3839 20 9.1822 20 8.97795C20 8.77371 19.9548 8.572 19.8675 8.38732ZM18.4094 1.03277L17.4316 0.0538171C17.4146 0.0367562 17.3943 0.0232218 17.372 0.0139874C17.3498 0.0047531 17.3259 0 17.3018 0C17.2777 0 17.2538 0.0047531 17.2315 0.0139874C17.2092 0.0232218 17.189 0.0367562 17.172 0.0538171L14.6633 2.5613C13.2802 1.85484 11.7258 1.50161 9.99999 1.50161C5.59148 1.50161 2.3023 3.79761 0.132451 8.38962C0.0452334 8.5743 0 8.776 0 8.98025C0 9.18449 0.0452334 9.38619 0.132451 9.57088C0.99932 11.3967 2.04296 12.8601 3.26336 13.9613L0.836161 16.3878C0.801775 16.4222 0.782458 16.4688 0.782458 16.5175C0.782458 16.5661 0.801775 16.6128 0.836161 16.6472L1.81535 17.6264C1.84975 17.6608 1.89641 17.6801 1.94505 17.6801C1.9937 17.6801 2.04035 17.6608 2.07476 17.6264L18.4094 1.29242C18.4265 1.27538 18.44 1.25514 18.4492 1.23286C18.4585 1.21059 18.4632 1.18671 18.4632 1.1626C18.4632 1.13848 18.4585 1.1146 18.4492 1.09233C18.44 1.07005 18.4265 1.04981 18.4094 1.03277ZM1.6807 8.9791C3.59136 5.02933 6.30023 3.15308 9.99999 3.15308C11.251 3.15308 12.3884 3.36777 13.4204 3.80426L11.8079 5.41674C11.0442 5.00929 10.1699 4.85808 9.31372 4.9854C8.45759 5.11272 7.66505 5.51184 7.05301 6.12387C6.44098 6.73591 6.04186 7.52845 5.91454 8.38458C5.78722 9.24071 5.93843 10.1151 6.34588 10.8787L4.43247 12.7922C3.37346 11.8575 2.46057 10.5911 1.6807 8.9791ZM7.33928 8.9791C7.33969 8.57464 7.43549 8.17597 7.61891 7.81549C7.80234 7.45501 8.0682 7.14288 8.39492 6.90446C8.72164 6.66604 9.09999 6.50804 9.49924 6.44332C9.89849 6.37859 10.3074 6.40895 10.6927 6.53194L7.46108 9.76355C7.38008 9.50996 7.33899 9.24531 7.33928 8.9791Z"
                      fill="#AFB1D9"
                    />
                    <path
                      d="M9.90819 11.5481C9.82883 11.5481 9.75061 11.5444 9.67309 11.5373L8.46155 12.7488C9.19024 13.0279 9.98416 13.0899 10.7473 12.9274C11.5105 12.7648 12.2103 12.3847 12.762 11.833C13.3138 11.2812 13.6939 10.5815 13.8564 9.81827C14.019 9.05508 13.957 8.26116 13.6779 7.53247L12.4664 8.74401C12.4735 8.82154 12.4771 8.89975 12.4771 8.97911C12.4773 9.31652 12.411 9.65066 12.282 9.96242C12.1529 10.2742 11.9637 10.5575 11.7251 10.796C11.4865 11.0346 11.2033 11.2238 10.8915 11.3529C10.5797 11.4819 10.2456 11.5482 9.90819 11.5481Z"
                      fill="#AFB1D9"
                    />
                  </svg>
                ) : (
                  <svg
                    id="display-icon"
                    className="w-4 h-auto hover:cursor-pointer"
                    viewBox="0 0 20 15"
                    fill="none"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.8675 6.90644C17.6931 2.31212 14.4062 0 9.99999 0C5.59148 0 2.30689 2.31212 0.132451 6.90874C0.0452335 7.09398 0 7.29629 0 7.50115C0 7.70601 0.0452335 7.90832 0.132451 8.09356C2.30689 12.6879 5.59378 15 9.99999 15C14.4085 15 17.6931 12.6879 19.8675 8.09126C20.0442 7.71856 20.0442 7.28604 19.8675 6.90644ZM9.99999 13.3436C6.30024 13.3436 3.59137 11.4617 1.68071 7.5C3.59137 3.53834 6.30024 1.65644 9.99999 1.65644C13.6998 1.65644 16.4086 3.53834 18.3193 7.5C16.4109 11.4617 13.702 13.3436 9.99999 13.3436ZM9.90825 3.45092C7.67876 3.45092 5.87132 5.2638 5.87132 7.5C5.87132 9.7362 7.67876 11.5491 9.90825 11.5491C12.1377 11.5491 13.9452 9.7362 13.9452 7.5C13.9452 5.2638 12.1377 3.45092 9.90825 3.45092ZM9.90825 10.0767C8.48844 10.0767 7.33929 8.92408 7.33929 7.5C7.33929 6.07592 8.48844 4.92331 9.90825 4.92331C11.3281 4.92331 12.4772 6.07592 12.4772 7.5C12.4772 8.92408 11.3281 10.0767 9.90825 10.0767Z"
                      fill="#AFB1D9"
                    />
                  </svg>
                )}
              </div>
              <input
                type={passwordVisibility}
                id="password"
                placeholder="Enter your password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                required
                className="bg-offwhite border-none rounded-lg placeholder-coolgray h-10 placeholder:font-light placeholder:text-sm focus:ring-coolgray focus:ring-1 pr-10 w-full"
              />
            </div>
          </div>

          <div>
            <button
              className={`${
                loading ? "cursor-progress" : "cursor-pointer"
              } bg-brandblack text-white h-10 rounded-lg w-full text-sm font-light hover:bg-hovergray mt-5`}
              disabled={loading ? true : false}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  {" "}
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 me-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>{" "}
                  Loading...{" "}
                </span>
              ) : (
                "Log in"
              )}
            </button>
            <p className="text-sm text-darkgray text-center pt-2">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-brandblue font-semibold hover:underline"
              >
                Sign Up.
              </Link>{" "}
            </p>
          </div>
        </form>

        <div
          id="copyright"
          className="flex flex-col items-center gap-3 justify-end pt-10"
        >
          <img src={doowitLogo} alt="Doowit Logo" className="w-[20%]" />
          <p className="text-coolgray text-xs font-light">
            © 2025 Doowit | All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
