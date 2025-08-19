import React from "react";

import emptyTaskIcon from "../../assets/icons/empty-task-icon.svg";

const EmptyState = () => {
  return (
    <section className="fixed w-[76%]">
      <div className="flex flex-col place-items-center w-full my-40">
        <img
          src={emptyTaskIcon}
          className="w-32 h-auto"
          alt="Empty Task Icon"
        />
        <p className="text-base italic mt-4 text-coolgray">No tasks found.</p>
      </div>
    </section>
  );
};

export default EmptyState;
