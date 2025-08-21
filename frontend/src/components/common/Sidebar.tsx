import React, { Dispatch, SetStateAction } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import logoutIcon from "../../assets/icons/logout-icon.svg";
import githubIcon from "../../assets/icons/github-icon.svg";
import feedbackIcon from "../../assets/icons/feedback-icon.svg";
import DoowitLogo from "../../assets/icons/doowit-logo.svg";
import Logomark from "../../assets/icons/doowit-logomark.svg"
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../features/auth/authSlice";
import {
  setCompletedTasks,
  setInprogressTasks,
  setTodoTasks,
} from "../../features/tasks/tasksSlice";
import { RootState } from "../../app/store";
import { setStatusMsg } from "../../features/tasks/taskUIslice";

const Sidebar = ({
  sort,
  setSort,
  priorityFilter,
  setPriorityFilter,
}: {
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
  priorityFilter: string[];
  setPriorityFilter: Dispatch<SetStateAction<string[]>>;
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [toggleSort, setToggleSort] = useState(false);
  const [toggleFilter, setToggleFilter] = useState(false);
  const [dashboardSelected, setDashboardSelected] = useState(true);
  const [sortCheckedItems, setSortCheckedItems] = useState<
    Record<string, boolean>
  >({});
  const todoTasks = useSelector((state: RootState) => state.tasks.todoTasks);

  const sortOldest = () => {
    setSort("oldest");
  };
  const sortDueDate = () => {
    setSort("duedate");
  };
  const handleLogout = async () => {
    navigate("/logging-out");
    try {
      await Promise.all([
        dispatch(setTodoTasks([])),
        dispatch(setInprogressTasks([])),
        dispatch(setCompletedTasks([])),
        dispatch(logout()),
      ]);
      navigate("/login");
    } catch (error) {
      setStatusMsg("Failed to logout. Try again.");
      console.error("Logout error:", error);
    }
  };

  const toggleSortDropdown = () => {
    const newToggleState = !toggleSort;
    setToggleSort(newToggleState);

    if (newToggleState) {
      setToggleFilter(false);
    }
  };

  const handleSortSelected = (label: string) => {
    setSortCheckedItems((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
    const isSelected = sort.includes(label);
    if (isSelected) {
      setSort("newest");
    } else {
      setSort(label);
    }
    setDashboardSelected(!toggleSort && label === "newest");
  };

  const toggleFilterDropdown = () => {
    const newToggleState = !toggleFilter;
    setToggleFilter(newToggleState);

    if (newToggleState) {
      setToggleSort(false);
    }
  };

  const handleFiltersSelected = (label: string) => {
    const isSelected = priorityFilter.includes(label);
    const newFilter = isSelected
      ? priorityFilter.filter((item) => item !== label)
      : [...priorityFilter, label];

    setPriorityFilter(newFilter);
  };

  useEffect(() => {
    const shouldSelectDashboard =
      sort === "newest" &&
      priorityFilter.length === 0 &&
      !toggleFilter &&
      !toggleSort;

    setDashboardSelected((prev) => {
      if (prev !== shouldSelectDashboard) {
        return shouldSelectDashboard;
      }
      return prev;
    });
  }, [sort, priorityFilter, toggleFilter, toggleSort]);

  const sortItems = [
    { id: 1, label: "Oldest Added", function: sortOldest, sortLabel: "oldest" },
    {
      id: 2,
      label: "By Due Date",
      function: sortDueDate,
      sortLabel: "duedate",
    },
  ];

  const filterItems = [
    {
      id: 1,
      label: "Low Priority",
    },
    {
      id: 2,
      label: "Medium Priority",
    },
    {
      id: 3,
      label: "High Priority",
    },
    { id: 4, label: "Urgent" },
  ];

  return (
    <div className="pl-6 ml-4 py-10 text-white h-full flex flex-col justify-between font-light w-[90%]">
      <div id="main-links">
        <img src={DoowitLogo} alt="Doowit Logo" className="2xs:hidden lg:block w-[80%] h-auto" />
        <img src={Logomark} alt="Doowit Logomark" className="2xs:block lg:hidden w-[80%] h-auto -ml-4"/>
        <ul className="space-y-2 flex flex-col mt-16">
          <li className="flex flex-row justify-between">
            <a
              href="/dashboard"
              className={`flex items-center 2xs:justify-center lg:justify-start w-full rounded-lg py-2 lg:px-4 2xs:-ml-5 lg:-ml-4  ${
                dashboardSelected
                  ? "text-black bg-white font-normal"
                  : "text-white bg-transparent"
              }`}
            >
              <svg
                className={`h-auto 2xs:w-4 lg:w-3 opacity-50 ${
                  dashboardSelected ? "fill-black" : "fill-white"
                }`}
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6.08696 0H0.304348C0.136957 0 0 0.136957 0 0.304348V6.08696C0 6.25435 0.136957 6.3913 0.304348 6.3913H6.08696C6.25435 6.3913 6.3913 6.25435 6.3913 6.08696V0.304348C6.3913 0.136957 6.25435 0 6.08696 0ZM5.09783 5.09783H1.29348V1.29348H5.09783V5.09783ZM13.6957 0H7.91304C7.74565 0 7.6087 0.136957 7.6087 0.304348V6.08696C7.6087 6.25435 7.74565 6.3913 7.91304 6.3913H13.6957C13.863 6.3913 14 6.25435 14 6.08696V0.304348C14 0.136957 13.863 0 13.6957 0ZM12.7065 5.09783H8.90217V1.29348H12.7065V5.09783ZM6.08696 7.6087H0.304348C0.136957 7.6087 0 7.74565 0 7.91304V13.6957C0 13.863 0.136957 14 0.304348 14H6.08696C6.25435 14 6.3913 13.863 6.3913 13.6957V7.91304C6.3913 7.74565 6.25435 7.6087 6.08696 7.6087ZM5.09783 12.7065H1.29348V8.90217H5.09783V12.7065ZM13.6957 7.6087H7.91304C7.74565 7.6087 7.6087 7.74565 7.6087 7.91304V13.6957C7.6087 13.863 7.74565 14 7.91304 14H13.6957C13.863 14 14 13.863 14 13.6957V7.91304C14 7.74565 13.863 7.6087 13.6957 7.6087ZM12.7065 12.7065H8.90217V8.90217H12.7065V12.7065Z" />
              </svg>

              <h3 className="ml-3 whitespace-nowrap text-sm 2xs:hidden lg:block">Dashboard</h3>
            </a>
          </li>
          <li className="w-full">
            <button
              type="button"
              className={`flex items-center 2xs:justify-center lg:justify-start w-full rounded-lg py-2 lg:px-4 2xs:-ml-5 lg:-ml-4 hover:cursor-pointer ${
                sort !== "newest"
                  ? "bg-white text-black font-normal"
                  : sort === "newest" && toggleSort
                  ? "bg-hovergray text-white"
                  : "bg:transparent text-white hover:bg-hovergray"
              }`}
              onClick={toggleSortDropdown}
            >
              <svg
                className={`h-auto 2xs:w-4 lg:w-3 opacity-50 opacity-50  ${
                  sort !== "newest"
                    ? "fill-black"
                    : sort === "newest" && toggleSort
                    ? "fill-white"
                    : "fill-white"
                }`}
                viewBox="0 0 14 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="14" height="1.5" rx="0.3" />
                <rect y="3.5" width="14" height="1.5" rx="0.3" />
                <rect y="7" width="14" height="1.5" rx="0.3" />
                <rect y="10.5" width="14" height="1.5" rx="0.3" />
              </svg>

              <h3 className="ml-3 whitespace-nowrap text-sm 2xs:hidden lg:block">Sort</h3>
            </button>
            {toggleSort && (
              <ul className="bg-togglegray rounded-lg cursor-pointer -ml-4 pl-4 w-full border-[0.5px] border-gray-500 py-4 mt-2 border flex flex-col gap-2">
                {sortItems.map((item) => (
                  <li
                    className="flex w-full rounded-full items-center"
                    key={item.id}
                    onClick={() => item.function()}
                  >
                    <input
                      type="checkbox"
                      name={item.label}
                      value={item.label}
                      className={
                        "w-4 h-4 text-black bg-transparent border border-gray focus:ring-gray-500 checked:border-white focus:ring-0 rounded-lg cursor-pointer"
                      }
                      checked={sortCheckedItems[item.sortLabel] || false}
                      key={item.id}
                      onChange={() => handleSortSelected(item.sortLabel)}
                    />
                    <label
                      htmlFor={item.label}
                      className="ml-2 text-sm font-light text-whitecursor-pointer"
                    >
                      {item.label}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li className="w-full">
            <button
              type="button"
              className={`flex items-center 2xs:justify-center lg:justify-start w-full rounded-lg py-2 lg:px-4 2xs:-ml-5 lg:-ml-4 hover:cursor-pointer ${
                priorityFilter.length === 0 && toggleFilter
                  ? "bg-hovergray text-white"
                  : priorityFilter.length !== 0
                  ? "bg-white text-black font-normal"
                  : "bg:transparent text-white hover:bg-hovergray"
              }`}
              onClick={toggleFilterDropdown}
            >
              <svg
                className={`h-auto 2xs:w-4 lg:w-3 opacity-50 ${
                  priorityFilter.length === 0 ? "fill-white" : "fill-black"
                }`}
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M15.3622 0H0.636888C0.146843 0 -0.159185 0.522067 0.0868377 0.938547L4.73926 8.86536V13.3743C4.73926 13.7204 5.02329 14 5.37532 14H10.6238C10.9758 14 11.2599 13.7204 11.2599 13.3743V8.86536L15.9143 0.938547C16.1583 0.522067 15.8523 0 15.3622 0ZM9.82773 12.5922H6.1714V9.69832H9.82973V12.5922H9.82773ZM10.0197 8.16145L9.85173 8.44693H6.14539L5.97738 8.16145L4.44724 5.55307H11.5519L10.0197 8.16145ZM12.286 4.30168H3.71317L2.01301 1.40782H13.9861L12.286 4.30168Z" />
              </svg>

              <h3 className="ml-3 whitespace-nowrap text-sm 2xs:hidden lg:block">Filter</h3>
            </button>
            {toggleFilter && (
              <ul className="bg-togglegray rounded-lg cursor-pointer -ml-4 pl-4 w-full border-[0.5px] border-gray-500 py-4 mt-2 border flex flex-col gap-2">
                {filterItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex w-full rounded-full items-center"
                    onClick={() =>
                      setPriorityFilter([...priorityFilter, item.label])
                    }
                  >
                    <input
                      type="checkbox"
                      name={item.label}
                      value={item.label}
                      checked={priorityFilter.includes(item.label)}
                      className={
                        "w-4 h-4 text-black bg-transparent border border-gray focus:ring-gray-500 checked:border-white focus:ring-0 rounded-lg cursor-pointer"
                      }
                      key={item.id}
                      onChange={() => handleFiltersSelected(item.label)}
                    />
                    <label
                      htmlFor={item.label}
                      className="ml-2 text-sm font-light text-white cursor-pointer"
                    >
                      {item.label}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
        <div>
          <span className="block border-t border-white opacity-25 h-1 my-4 2xs:w-full 2xs:-ml-6 lg:-ml-4"></span>
          <a
            href="#"
            className="flex items-center 2xs:justify-center lg:justify-start w-full rounded-lg py-2 lg:px-4 2xs:-ml-5 lg:-ml-4 hover:cursor-pointer hover:bg-hovergray"
          >
            <img
              src={logoutIcon}
              className="h-auto 2xs:w-4 lg:w-3 opacity-50"
            />
            <button
              className="2xs:ml-0 lg:ml-3 whitespace-nowrap text-sm"
              type="button"
              onClick={handleLogout}
            >
              <h3 className="2xs:hidden lg:block">Log Out</h3>
            </button>
          </a>
        </div>
      </div>
      <div id="secondary-links">
        <ul className="space-y-2 text-sm flex flex-col">
          <li className="flex items-center font-base hover:bg-hovergray rounded-lg w-full py-2 2xs:-ml-6 lg:-ml-4 2xs:pl-5 lg:pl-4 hover:cursor-pointer">
            <a href="mailto:lcslicp.dev@gmail.com" className="flex items-center">
              <img
                src={feedbackIcon}
                className="h-auto 2xs:w-8 lg:w-4 2xs:-ml-2 lg:ml-0 opacity-50"
              />
              <h3 className="ml-3 2xs:hidden lg:block">Give Feedback</h3>
            </a>
          </li>

          <li className="flex items-center font-base hover:bg-hovergray rounded-lg w-full py-2 2xs:-ml-6 lg:-ml-4 2xs:pl-6 lg:pl-4 hover:cursor-pointer">
            <a
              href="https://github.com/lcslicp/task-management-app"
              className="flex items-center"
              target="_blank"
            >
              <img
                src={githubIcon}
                className="h-auto 2xs:w-7 lg:w-4 2xs:-ml-2 lg:ml-0 opacity-50"
              />
              <h3 className="ml-3 2xs:hidden lg:block">Github</h3>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
