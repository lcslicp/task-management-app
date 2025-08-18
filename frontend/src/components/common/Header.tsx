import React, { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import { RootState } from "../../app/store";
import UserSkeletonUI from "../ui-states/UserSkeletonUI";

const Header = ({ setProfileModalOpen }: { setProfileModalOpen: Dispatch<SetStateAction<boolean>> }) => {
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    year: "numeric",
    day: "numeric",
  };

  const now = new Date().toLocaleDateString("default", options);
  const User = useSelector((state: RootState) => state.user);
  const isUserLoading = useSelector(
    (state: RootState) => state.user.isUserLoading
  );

  const { firstName, lastName, } = User.userData;

  const initials = firstName[0] + lastName[0];

  return (
    <>
      {isUserLoading ? (
        <UserSkeletonUI />
      ) : (
        <header className="flex items-center justify-between px-16 pt-10 bg-white">
          <div className="flex flex-col">
            <h2 className="text-3xl font-semibold text-gray">Your Task Hub</h2>
            <p className="text-gray-500 text-sm">Today is {now}.</p>
          </div>

          <div className="flex flex-row w-[50%] items-center gap-5 justify-end">
            <div className="flex-grow">
              <SearchBar />
            </div>
            <div className="flex flex-row flex-shrink-0 items-center gap-2 hover:cursor-pointer" id="user" onClick={() => setProfileModalOpen(true)}>
              
                <span className="w-10 h-10 bg-brandgreen text-white rounded-full border-2 border-softblue flex items-center justify-center text-base font-medium">
                  {" "}
                  {initials}
                </span>

              <p className="font-medium text-togglegray text-lg">
                {firstName} {lastName}
              </p>
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
