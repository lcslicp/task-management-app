import React from "react";

const UserSkeletonUI = () => {
  return (
    <header className="flex items-center justify-between px-16 pt-10 bg-white animate-pulse">
      <div className="flex flex-col gap-2">
        <span className="bg-cardwhite rounded-md h-8 w-48" id="h2"></span>
        <span className="bg-cardwhite rounded-md h-4 w-32" id="date"></span>
      </div>

      <div className="flex flex-row w-[50%] items-center gap-5 justify-end ">
        <div className="flex-grow">
          <span
            className="bg-cardwhite rounded-md w-full text-2xl px-48"
            id="search"
          >
            &nbsp;
          </span>
        </div>
        <div className="flex flex-row flex-shrink-0 items-center gap-3">
          <span
            className="w-10 h-10 bg-cardwhite rounded-full"
            id="image"
          ></span>

          <span
            className="bg-cardwhite rounded-md h-6 w-32"
            id="user-name"
          ></span>
        </div>
      </div>
    </header>
  );
};

export default UserSkeletonUI;
