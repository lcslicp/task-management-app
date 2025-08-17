import React from "react";
import UserSkeletonUI from "../../components/ui-states/UserSkeletonUI";
import CardSkeletonUI from "../../components/ui-states/CardSkeletonUI";

const DashboardLoadingUI = () => {
  return (
    <div className="flex flex-col ml-[15%] gap-8 w-[85%]">
      <UserSkeletonUI />
      <span className="bg-cardwhite h-16 w-[90%] rounded-lg mx-auto"></span>

      <div className="w-full columns-4 break-inside-avoid gap-3 px-16">
        <CardSkeletonUI />
      </div>
    </div>
  );
};

export default DashboardLoadingUI;
