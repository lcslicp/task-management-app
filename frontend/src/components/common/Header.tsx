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
      let initials = 
      setInitials((User.userData.firstName[0] + User.userData.lastName[0]).toUpperCase());
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
        <header className="flex flex-col gap-8 justify-end items-end lg:w-[calc(100%-12rem)] 2xs:px-8 lg:px-16 2xs:w-[calc(100%-5rem)]">
          <div className="flex 2xs:items-start md:items-center justify-between pt-10 bg-white  w-full 2xs:flex-col xs:flex-row">
            <div className="flex flex-col pr-14 w-fit">
              <h2 className="text-2xl font-medium text-gray whitespace-nowrap">
                Your Task Hub
              </h2>
              <p className="text-hovergray text-sm whitespace-nowrap">Today is {now}.</p>
            </div>

            <div className="flex 2xs:flex-col-reverse md:flex-row w-[90%] 2xs:items-end md:items-center gap-3 justify-end">
              <div className="w-full">
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
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
