import React from "react";
import UserSkeletonUI from "../../components/ui-states/UserSkeletonUI";
import CardSkeletonUI from "../../components/ui-states/CardSkeletonUI";

const DashboardLoadingUI = () => {
  return (
    <div className="flex flex-col gap-8 justify-end items-end lg:w-[calc(100%-12rem)] 2xs:px-8 lg:px-16 md:px-8 2xs:w-[calc(100%-5rem)]">
      <UserSkeletonUI />
      <div className="h-16 w-full 2xs:ml-20 lg:ml-48">
        <span className="block bg-cardwhite rounded-lg animate-pulse h-full w-full"></span>
      </div>

      <div className="w-full h-auto xl:columns-4 xs:columns-2 md:columns-3">
        <CardSkeletonUI />
      </div>
    </div>
  );
};

export default DashboardLoadingUI;
