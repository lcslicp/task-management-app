import React, { Dispatch, SetStateAction, useState } from "react";
import ToDoTab from "../tabs/ToDoTab";
import InProgressTab from "../tabs/InProgressTab";
import CompletedTab from "../tabs/CompletedTab";
import { useFormReset } from "../../utils/useFormReset";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const TabNavigation = ({
  popup,
  setPopup,
}: {
  popup: boolean;
  setPopup: Dispatch<SetStateAction<boolean>>;
}) => {
  const resetForm = useFormReset();
  const { todoTasks, inProgressTasks, completedTasks } = useSelector(
    (state: RootState) => state.tasks
  );
  const tabdata = [
    {
      id: "1",
      key: "1",
      tabTitle: "Todo",
      numberOfCards: todoTasks.length,
      tabContent: <ToDoTab />,
    },
    {
      id: "2",
      key: "2",
      tabTitle: "In Progress",
      numberOfCards: inProgressTasks.length,
      tabContent: <InProgressTab />,
    },
    {
      id: "3",
      key: "3",
      tabTitle: "Completed",
      numberOfCards: completedTasks.length,
      tabContent: <CompletedTab />,
    },
  ];
  const [activeStatusTab, setActiveStatusTab] = useState<string>(tabdata[0].id);

  const statusTabTitles = tabdata.map((tab, id) => (
    <li
      key={id}
      onClick={() => setActiveStatusTab(tab.id)}
      className={`font-normal px-5 py-2 ${
        activeStatusTab === tab.id
          ? "inline-block text-brandblack border-black cursor-pointer bg-white rounded-lg"
          : "inline-block text-coolgray cursor-pointer"
      }`}
    >
      <h6>
        {tab.tabTitle}{" "}
        <span
          className={` rounded-md py-1 px-2 text-white text-xs ml-1 ${
            activeStatusTab === tab.id
              ? "bg-brandblack"
              : "bg-softblue text-offwhite"
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
    <div className="">
      <div
        className="flex font-medium text-center bg-white z-10 fixed w-[85%] top-[15%] left-[15%] right-0 items-center justify-between px-10 pt-4 pb-2"
        id="navigation"
      >
        <ul className="bg-offwhite py-1 px-1 rounded-lg">{statusTabTitles}</ul>
        <button
          className="text-white bg-brandblack hover:bg-hovergray focus:outline-nonefont-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
          type="button"
          onClick={handleModalOpen}
        >
          + New Task
        </button>
      </div>
      <div className=" pt-[18%] pb-5">
        <div
          id="tab-contents"
          className="w-full columns-3 break-inside-avoid gap-5 px-10"
        >
          {tabContents}
        </div>
      </div>
      <div className="fixed w-full h-full -z-10 inset-0 border bg-offwhite"></div>
    </div>
  );
};

export default TabNavigation;
