import React, {
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import axios from "../../api/axios";
import { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";
import {
  setStatusColor,
  setStatusDisplay,
  setStatusMsg,
} from "../../features/tasks/taskUIslice";
axios;

const ChangePassword = ({
  passwordModalOpen,
  setPasswordModalOpen,
  setProfileModalOpen,
}: {
  passwordModalOpen: boolean;
  setPasswordModalOpen: Dispatch<SetStateAction<boolean>>;
  setProfileModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [oldPwdView, setOldPwdView] = useState<string>("password");
  const [newPwdView, setNewPwdView] = useState<string>("password");
  const [confirmNewPwdView, setConfirmNewPwdView] = useState("password");
  const [newPwd, setNewPwd] = useState<string>("");
  const [confirmPwd, setConfirmPwd] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [pwdFocus, setPwdFocus] = useState<boolean>(false);
  const [isValidPwd, setIsValidPwd] = useState<boolean>(false);
  const [validMatch, setValidMatch] = useState<boolean>(false);
  const [matchFocus, setMatchFocus] = useState<boolean>(false);
  const [pwdUpdated, setpwdUpdated] = useState<boolean>(false);
  const oldPwdRef = useRef<HTMLInputElement>(null);
  const userId = useSelector((state: RootState) => state.user.userData.userId);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%,.]).{8,24}$/;
  const isPwdLengthValid = newPwd.length >= 8 && newPwd.length <= 24;
  const pwdContainsSpecialChar = /[!@#$,.]/.test(newPwd);
  const isPWdCharValid =
    /[a-z]/.test(newPwd) &&
    /[A-Z]/.test(newPwd) &&
    /\d/.test(newPwd) &&
    pwdContainsSpecialChar;

  const token = JSON.parse(localStorage.getItem("token") || "{}");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const togglePassword = (field: string) => {
    if (field === "oldpassword") {
      setOldPwdView((prev) => (prev === "password" ? "text" : "password"));
    } else if (field === "newpassword") {
      setNewPwdView((prev) => (prev === "password" ? "text" : "password"));
    } else if (field === "confirmpassword") {
      setConfirmNewPwdView((prev) =>
        prev === "password" ? "text" : "password"
      );
    }
  };

  const handleClosePwdModal = () => {
    setPasswordModalOpen(false);
    setpwdUpdated(false);
    setIsValidPwd(false);
    setValidMatch(false);
    setOldPwdView("password");
    setNewPwdView("password");
    setConfirmNewPwdView("password");
  };

  const handleCancelChange = () => {
    handleClosePwdModal();
    setProfileModalOpen(true);
  };

  useEffect(() => {
    if (newPwd === null) return;
    const result = PWD_REGEX.test(newPwd);
    setIsValidPwd(result);
    const match = newPwd === confirmPwd;
    setValidMatch(match);
  }, [newPwd, confirmPwd]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const pwd = {
      oldPassword: oldPwdRef.current?.value,
      newPassword: newPwd,
    };
    if (isValidPwd && validMatch) {
      setLoading(true);
      try {
        const response = await axios.put(`/edit/pwd/${userId}`, pwd, config);
        setpwdUpdated(true);
        setNewPwd("");
        setConfirmPwd("");
        dispatch(setStatusColor(["statusgreen", "softgreen"]));
        dispatch(setStatusMsg("Password updated successfully."));
        dispatch(setStatusDisplay(true));
        setTimeout(() => {
          dispatch(setStatusDisplay(false));
        }, 10000);
        setLoading(false);
        handleClosePwdModal();
      } catch (error) {
        const err = error as AxiosError;
        console.error(err);
        setLoading(false);
        dispatch(setStatusColor(["brandred", "softred"]));
        dispatch(setStatusDisplay(true));
        if (err?.response?.status) {
          dispatch(setStatusMsg("Old password is wrong, try again."));
        } else {
          dispatch(setStatusMsg("Failed to update password, try again."));
        }

        setTimeout(() => {
          dispatch(setStatusDisplay(false));
        }, 10000);
      }
    }
  };
  return (
    <>
      {passwordModalOpen ? (
        <section>
          <div
            id="edit-profile"
            tabIndex={-1}
            className="overflow-y-auto overflow-x-hidden fixed z-50 top-0 right-0 left-0 z-50 flex justify-center items-center w-full inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div className="relative p-4 w-full max-w-xl max-h-full">
              <div className="relative bg-white rounded-2xl shadow-sm">
                <div className="py-6 px-6 lg:px-8">
                  <div
                    className="flex justify-between items-center font-medium"
                    id="action-heading"
                  >
                    <h2 className="text-2xl text-brandblack">
                      Change Password
                    </h2>
                    <button
                      type="button"
                      className="text-gray-400 bg-offwhite hover:bg-gray-200 hover:text-gray-900 rounded-2xl text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                      onClick={handleClosePwdModal}
                      data-modal-hide="static-modal"
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  {!pwdUpdated ? (
                    <div className="space-y-6">
                      <div className="flex flex-col gap-4">
                        <form
                          onSubmit={handleSubmit}
                          className="space-y-6 pt-4"
                        >
                          <div className="flex flex-col" id="old-password">
                            <label
                              htmlFor="old-pwd"
                              className="uppercase font-medium text-xs text-togglegray pb-2"
                            >
                              Old Password
                            </label>
                            <div className="relative">
                              <div
                                className="absolute inset-y-0 right-0 flex items-center pe-3 pr-3"
                                onClick={() => togglePassword("oldpassword")}
                              >
                                {oldPwdView === "text" ? (
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
                                type={oldPwdView}
                                id="old-pwd"
                                placeholder="Enter old password..."
                                required
                                aria-invalid={isValidPwd ? "false" : "true"}
                                aria-describedby="pwdnote"
                                className="bg-offwhite border-none rounded-lg placeholder-coolgray h-10 placeholder:font-light placeholder:text-sm focus:ring-coolgray focus:ring-1 pr-10 w-full"
                                ref={oldPwdRef}
                              />
                            </div>
                          </div>

                          <div className="flex flex-col" id="new-password">
                            <label
                              htmlFor="pwd"
                              className="uppercase font-medium text-xs text-togglegray pb-2"
                            >
                              New Password
                            </label>
                            <div className="relative">
                              <div
                                className="absolute inset-y-0 right-0 flex items-center pe-3 pr-3"
                                onClick={() => togglePassword("newpassword")}
                              >
                                {newPwdView === "text" ? (
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
                                type={newPwdView}
                                id="new-pwd"
                                placeholder="Enter new password..."
                                required
                                aria-invalid={isValidPwd ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                                className="bg-offwhite border-none rounded-lg placeholder-coolgray h-10 placeholder:font-light placeholder:text-sm focus:ring-coolgray focus:ring-1 pr-10 w-full"
                                value={newPwd}
                                onChange={(e) => setNewPwd(e.target.value)}
                              />
                            </div>

                            <div
                              id="pwdnote"
                              className={pwdFocus ? "block pt-2" : "hidden"}
                            >
                              <p className="text-xs text-darkgray pt-1 flex flex-col gap-1">
                                <span
                                  className={`flex gap-1 ${
                                    !isPwdLengthValid
                                      ? "grayscale opacity-50"
                                      : ""
                                  }`}
                                >
                                  <svg
                                    className="w-3.5 h-3.5 me-2 text-brandgreen shrink-0"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                  </svg>{" "}
                                  8 to 24 characters.
                                </span>
                                <span
                                  className={`flex gap-1 ${
                                    !isPWdCharValid
                                      ? "grayscale opacity-50"
                                      : ""
                                  }`}
                                >
                                  <svg
                                    className="w-3.5 h-3.5 me-2 text-brandgreen shrink-0"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                  </svg>{" "}
                                  Must include uppercase and lowercase letters,
                                  a number and a special character.
                                </span>
                                <span
                                  className={`flex gap-1 ${
                                    !pwdContainsSpecialChar
                                      ? "grayscale opacity-50"
                                      : ""
                                  }`}
                                >
                                  <svg
                                    className="w-3.5 h-3.5 me-2 text-brandgreen shrink-0"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                  </svg>{" "}
                                  Allowed special characters: !@#$,.
                                </span>
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col" id="confirm-pwd">
                            <label
                              htmlFor="confirmpwd"
                              className="uppercase font-medium text-xs text-togglegray pb-2"
                            >
                              Confirm Password
                            </label>
                            <div className="relative">
                              <div
                                className="absolute inset-y-0 right-0 flex items-center pe-3 pr-3"
                                onClick={() =>
                                  togglePassword("confirmpassword")
                                }
                              >
                                {confirmNewPwdView === "text" ? (
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
                                type={confirmNewPwdView}
                                id="confirmpwd"
                                placeholder="Confirm your password"
                                value={confirmPwd}
                                onChange={(e) => setConfirmPwd(e.target.value)}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                                className="bg-offwhite border-none rounded-lg placeholder-coolgray h-10 placeholder:font-light placeholder:text-sm focus:ring-coolgray focus:ring-1 pr-10 w-full"
                              />
                            </div>

                            <div
                              id="confirmnote"
                              className={
                                matchFocus && !validMatch ? "block" : "hidden"
                              }
                            >
                              <p className="text-xs pt-1 text-darkgray">
                                Password does not match.
                              </p>
                            </div>
                          </div>

                          <div
                            id="buttons"
                            className="flex flex-row gap-5 justify-end"
                          >
                            <button
                              data-modal-hide="default-modal"
                              type="button"
                              className="py-2.5 px-5 ms-3 text-sm font-medium text-hovergray focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-togglegray focus:z-10 focus:ring-gray-100 "
                              onClick={handleCancelChange}
                            >
                              Cancel
                            </button>
                            <button
                              disabled={
                                !isValidPwd || !validMatch || loading
                                  ? true
                                  : false
                              }
                              data-modal-hide="default-modal"
                              type="submit"
                              className={`${
                                loading ? "cursor-progress" : "cursor-pointer"
                              } text-white bg-brandblack hover:bg-hovergray focus:ring-4 focus:outline-nonefont-medium rounded-lg text-sm px-5 py-2.5 text-center`}
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
                                "Update password"
                              )}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 w-full h-full bg-black z-30 opacity-40"></div>
        </section>
      ) : (
        ""
      )}
    </>
  );
};

export default ChangePassword;
