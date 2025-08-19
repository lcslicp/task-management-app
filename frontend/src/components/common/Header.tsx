import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import { RootState } from "../../app/store";
import UserSkeletonUI from "../ui-states/UserSkeletonUI";

const Header = ({
  setProfileModalOpen,
}: {
  setProfileModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    year: "numeric",
    day: "numeric",
  };

  const now = new Date().toLocaleDateString("default", options);
  const [initials, setInitials] = useState("NA");
  const [bgColor, setBgColor] = useState("");
  const User = useSelector((state: RootState) => state.user);
  const isUserLoading = useSelector(
    (state: RootState) => state.user.isUserLoading
  );
  const { firstName, lastName } = User.userData;

  useEffect(() => {
    if (User?.userData?.firstName && User?.userData?.lastName) {
      setInitials(User.userData.firstName[0] + User.userData.lastName[0]);
    }
  }, [User]);

  const colors = ["softgreen", "softblue", "softred", "softyellow"];

  useEffect(() => {
    if (User) {
      const chosenColor = colors[Math.floor(Math.random() * colors.length)];
      setBgColor(`bg-${chosenColor}`);
    }
  }, [User]);

  return (
    <>
      {isUserLoading ? (
        <UserSkeletonUI />
      ) : (
        <header className="flex items-center justify-between px-16 pt-10 bg-white">
          <div className="flex flex-col">
            <h2 className="text-3xl font-semibold text-gray">Your Task Hub</h2>
            <p className="text-hovergray text-sm">Today is {now}.</p>
          </div>

          <div className="flex flex-row w-[50%] items-center gap-5 justify-end">
            <div className="flex-grow">
              <SearchBar />
            </div>
            <div
              className="flex flex-row flex-shrink-0 items-center gap-2 hover:cursor-pointer"
              id="user"
              onClick={() => setProfileModalOpen(true)}
            >
              <span
                className={`w-10 h-10 ${bgColor} text-togglegray rounded-full flex items-center justify-center text-base font-medium`}
              >
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
