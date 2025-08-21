import React from "react";

const UserSkeletonUI = () => {
  return (
    <header className="flex 2xs:items-start md:items-center justify-between pt-10 bg-white animate-pulse 2xs:gap-8 md:gap-20 w-full 2xs:flex-col-reverse md:flex-row">
      <div className="flex flex-col gap-2 " id="left-header">
        <span className="bg-cardwhite rounded-md h-8 w-48" id="h2"></span>
        <span className="bg-cardwhite rounded-md h-4 w-32" id="date"></span>
      </div>

      <div
        className="flex 2xs:flex-col-reverse lg:flex-row 2xs:gap-0 w-[50%] 2xs:items-start md:items-end lg:items-center lg:gap-5 justify-end"
        id="right-header"
      >
        <div>
          <span
            className="block bg-cardwhite rounded-md 2xs:w-[400px] lg:w-72 px-4 lg:px-12 h-8 xs:mt-2 lg:mt-0"
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
