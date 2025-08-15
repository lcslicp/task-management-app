import React, { Dispatch, SetStateAction, useState } from "react";
import { useFormReset } from "../../utils/useFormReset";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { tabDataInterface } from "../../types/task";

const TabNavigation = ({
  popup,
  setPopup,
  activeStatusTab,
  setActiveStatusTab,
  tabdata,
}: {
  popup: boolean;
  setPopup: Dispatch<SetStateAction<boolean>>;
  activeStatusTab: string;
  setActiveStatusTab: Dispatch<SetStateAction<string>>;
  tabdata: tabDataInterface[];
}) => {
  const resetForm = useFormReset();
  const { todoTasks, inProgressTasks, completedTasks } = useSelector(
    (state: RootState) => state.tasks
  );

  const statusTabTitles = tabdata.map((tab, id) => (
    <li
      key={id}
      onClick={() => setActiveStatusTab(tab.id)}
      className={`font-normal py-2 ${
        activeStatusTab === tab.id
          ? "inline-block text-brandblack border-black cursor-pointer bg-offwhite rounded-lg px-5"
          : "inline-block text-coolgray cursor-pointer px-3"
      }`}
    >
      <h6>
        {tab.tabTitle}{" "}
        <span
          className={`rounded-md py-1 px-2 text-white text-xs ml-1 ${
            activeStatusTab === tab.id
              ? "bg-brandblack"
              : "bg-coolgray text-offwhite"
          }`}
        >
          {tab.numberOfCards ? tab.numberOfCards : "0"}
        </span>
      </h6>
    </li>
  ));

  const tabContents = tabdata.map((content, id) => (
    <div
      className="w-full"
      key={id}
      style={activeStatusTab === content.id ? {} : { display: "none" }}
    >
      {content.tabContent}
    </div>
  ));

  const handleModalOpen = () => {
    setPopup(!popup);
    resetForm();
  };

  return (
    <div className="px-16">
      <div
        className="flex font-medium text-center bg-offwhite justify-between items-center p-3 z-20 m rounded-xl mt-6 mb-2"
        id="navigation"
      >
        <ul className="bg-white p-2 rounded-lg">{statusTabTitles}</ul>
        <button
          className="text-white bg-brandblack hover:bg-hovergray focus:outline-nonefont-medium rounded-lg text-sm px-8 py-2.5 text-center cursor-pointer"
          type="button"
          onClick={handleModalOpen}
        >
          + New Task
        </button>
      </div>
      <div className="py-4">
        <div
          id="tab-contents"
          className="w-full columns-4 break-inside-avoid gap-3"
        >
          {tabContents}
        </div>
      </div>
      <div
        className="fixed w-full h-full -z-10 inset-0 border bg-white"
        id="background"
      ></div>
    </div>
  );
};

export default TabNavigation;
