import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { updateUserProfile } from "../../features/auth/authThunks";
import {
  setEmail,
  setFirstName,
  setIsUserLoading,
  setLastName,
} from "../../features/auth/authSlice";
import { UserInterface } from "../../types/user";
import { useNavigate } from "react-router-dom";
import {
  setStatusColor,
  setStatusDisplay,
  setStatusMsg,
} from "../../features/tasks/taskUIslice";

const EditProfile = ({
  profileModalOpen,
  setPasswordModalOpen,
  setProfileModalOpen,
}: {
  profileModalOpen: boolean;
  setPasswordModalOpen: Dispatch<SetStateAction<boolean>>;
  setProfileModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const userData = useSelector((state: RootState) => state.user.userData);
  const dispatch = useDispatch<AppDispatch>();
  const { userId: id, firstName, lastName, email } = userData;
  const isUserLoading = useSelector(
    (state: RootState) => state.user.isUserLoading
  );
  const navigate = useNavigate();

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const handleProfileModalClose = () => {
    setProfileModalOpen(false);
    navigate("/dashboard");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: UserInterface["userData"] = {
      userId: id,
      firstName: firstNameRef.current?.value || "",
      lastName: lastNameRef.current?.value || "",
      email: emailRef.current?.value || "",
    };
    dispatch(setIsUserLoading(true));
    try {
      const response = await dispatch(updateUserProfile({ id, data })).unwrap();
      dispatch(setFirstName(response?.data?.firstName));
      dispatch(setLastName(response?.data?.lastName));
      dispatch(setEmail(response?.data?.email));
      dispatch(setIsUserLoading(false));
      handleProfileModalClose();
      dispatch(setStatusColor(["statusgreen", "softgreen"]));
      dispatch(setStatusMsg("User profile edited successfully."));
      dispatch(setStatusDisplay(true));
      setTimeout(() => {
        dispatch(setStatusDisplay(false));
      }, 10000);
      setProfileModalOpen(false);
    } catch (error) {
      console.error(error);
      dispatch(setStatusColor(["brandred", "softred"]));
      dispatch(setStatusMsg("Failed to edit user profile, try again."));
      dispatch(setStatusDisplay(true));
      setTimeout(() => {
        dispatch(setStatusDisplay(false));
      }, 10000);
    }
  };

  const openPasswordModal = () => {
    handleProfileModalClose();
    setPasswordModalOpen(true);
  };

  return (
    <>
      {profileModalOpen ? (
        <section>
          <div
            id="edit-profile"
            tabIndex={-1}
            className="overflow-y-auto overflow-x-hidden fixed z-50 top-0 right-0 left-0 z-50 flex justify-center items-center w-full inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div className="relative p-4 w-full max-w-2xl max-h-full">
              <div className="relative bg-white rounded-2xl shadow-sm">
                <div className="py-6 px-6 lg:px-8">
                  <div
                    className="flex justify-between items-center font-medium"
                    id="action-heading"
                  >
                    <h2 className="text-2xl text-brandblack">Edit Task</h2>
                    <button
                      type="button"
                      className="text-gray-400 bg-offwhite hover:bg-gray-200 hover:text-gray-900 rounded-2xl text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                      onClick={handleProfileModalClose}
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

                  <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                    <div className="flex flex-col" id="first-name">
                      <label
                        htmlFor="firstName"
                        className="uppercase font-medium text-xs text-togglegray pb-2"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        maxLength={11}
                        placeholder="Enter your first name..."
                        className="bg-offwhite border-none rounded-lg placeholder-coolgray h-10 placeholder:font-light placeholder:text-sm focus:ring-coolgray focus:ring-1"
                        autoComplete="off"
                        id="firstName"
                        name="firstName"
                        ref={firstNameRef}
                        defaultValue={firstName}
                        required
                      />
                    </div>
                    <div className="flex flex-col">
                      <label
                        htmlFor="lastName"
                        className="uppercase font-medium text-xs text-togglegray pb-2"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        maxLength={11}
                        className="bg-offwhite border-none rounded-lg placeholder-coolgray h-10 placeholder:font-light placeholder:text-sm focus:ring-coolgray focus:ring-1"
                        id="lastName"
                        name="lastName"
                        ref={lastNameRef}
                        defaultValue={lastName}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label
                        htmlFor="email"
                        className="uppercase font-medium text-xs text-togglegray pb-2"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your email address..."
                        className="bg-offwhite border-none rounded-lg placeholder-coolgray h-10 placeholder:font-light placeholder:text-sm focus:ring-coolgray focus:ring-1"
                        id="email"
                        name="email"
                        ref={emailRef}
                        defaultValue={email}
                      />
                    </div>

                    <div className="w-full flex justify-end">
                      <div className="flex flex-row gap-5 justify-end">
                        <button
                          id="cancel-btn"
                          data-modal-hide="default-modal"
                          type="button"
                          className="py-2.5 px-5 ms-3 text-sm font-medium text-hovergray focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-togglegray focus:z-10 focus:ring-gray-100"
                          onClick={handleProfileModalClose}
                        >
                          Cancel
                        </button>
                        <button
                          data-modal-hide="default-modal"
                          type="submit"
                          className={`${
                            isUserLoading ? "cursor-progress" : "cursor-pointer"
                          } text-white bg-brandblack hover:bg-hovergray focus:ring-4 focus:outline-nonefont-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                          disabled={isUserLoading ? true : false}
                        >
                          <div>
                            {isUserLoading ? (
                              <span className="flex items-center justify-center">
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
                              "Update Profile"
                            )}
                          </div>
                        </button>
                      </div>
                    </div>
                  </form>
                  <div className=" py-6 flex flex-row place-content-between items-center border-t border-offwhite mt-6">
                    <p className="text-xs font-bold opacity-80 uppercase">
                      Change Password
                    </p>
                    <button
                      onClick={openPasswordModal}
                      className="text-statusgreen font-semibold hover:underline text-xs"
                    >
                      Update Password
                    </button>
                  </div>
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

export default EditProfile;
