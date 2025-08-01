import axios from "../../api/axios";
import { useState } from "react";
import { TaskCardtype } from "../../types/task";

const TaskCard: React.FC<TaskCardtype> = ({
  id,
  title,
  description,
  priority,
  status,
  dueDate,
  createdAt,
  setTodoTasks,
  setInProgressTasks,
  setCompletedTasks,
  handleTaskOpen,
  bgColor,
}) => {
  const [dropdown, setDropdown] = useState("hidden");
  const token = JSON.parse(localStorage.getItem("token") || "{}");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const toggleTask = () => {
    dropdown === "hidden" ? setDropdown("visible") : setDropdown("hidden");
  };

  const handleDelete = async () => {
    let taskStatus;
    status === "To Do" ? (taskStatus = 1) : (taskStatus = 2);
    try {
      await axios.delete(`${id}`, config);
      taskStatus === 1
        ? setTodoTasks((prevTasks) =>
            prevTasks.filter((task) => task._id !== id)
          )
        : setInProgressTasks((prevTasks) =>
            prevTasks.filter((task) => task._id !== id)
          );
    } catch (error) {
      console.error(error);
    }
  };

  const getRelativeTime = (createdAt: Date) => {
    const now = new Date().getTime();
    const dateCreated = new Date(createdAt).getTime();
    const diffInMs = now - dateCreated;

    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) {
      return "Just now";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    } else {
      const diffInWeeks = Math.floor(diffInDays / 7);
      return `${diffInWeeks} week${diffInWeeks > 1 ? "s" : ""} ago`;
    }
  };

  return (
    <div
      className={`rounded-2xl h-fit break-inside-avoid cursor-pointer ${bgColor} w-full py-6 px-7 mb-5`}
    >
      <div className="flex justify-between w-full pb-6" id="upper-card">
        <p
          className={(() => {
            switch (priority) {
              case "Low Priority":
                return "text-sm bg-softgreen border border-green-300 rounded-full px-3 h-fit py-1 text-center flex items-center gap-2 ";
              case "Medium Priority":
                return "text-sm bg-softblue border border-blue-300  rounded-full px-3 h-fit py-1 text-center flex items-center gap-2";
              case "High Priority":
                return "text-sm bg-softyellow border border-yellow-300  rounded-full px-3 h-fit py-1 text-center flex items-center gap-2";
              case "Urgent":
                return "text-sm bg-softred border border-red-300  rounded-full px-3 h-fit py-1 text-center inline-flex items-center gap-2";
              default:
                return undefined;
            }
          })()}
        >
          <span
            className={(() => {
              switch (priority) {
                case "Low Priority":
                  return "rounded-full bg-green-300 h-3 w-3";
                case "Medium Priority":
                  return "rounded-full bg-blue-400 h-3 w-3";
                case "High Priority":
                  return "rounded-full bg-yellow-300 h-3 w-3";
                case "Urgent":
                  return "rounded-full bg-red-400 h-3 w-3";
                default:
                  return undefined;
              }
            })()}
          ></span>{" "}
          {priority}
        </p>
        <button id="dropdownButton" type="button" onClick={toggleTask}>
          <svg
            className="w-5 h-auto"
            viewBox="0 0 18 3"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="2" cy="1.5" r="1.5" fill="#AFB1D9" />
            <circle cx="9" cy="1.5" r="1.5" fill="#AFB1D9" />
            <circle cx="16" cy="1.5" r="1.5" fill="#AFB1D9" />
          </svg>
        </button>
        {/* <div
          id='dropdown'
          style={{ visibility: `${dropdown}` }}
          className='relative -left-5 -top-8 z-10 w-24 text-base list-none bg-lightergray rounded divide-y divide-gray-100 shadow'
        >
          <ul aria-labelledby='dropdownButton'>
            <li>
              <button
                onClick={handleDelete}
                className='block py-2 px-4 w-full text-sm text-gray-700 hover:bg-gray-100'
              >
                Delete
              </button>
            </li>
          </ul>
        </div> */}
      </div>
      <div
        className="flex flex-col"
        onClick={() => handleTaskOpen(id)}
        id="taskcard_content"
      >
        <h2 className="text-2xl text-black font-medium" id="taskcard-title">
          {title}
        </h2>
        <p
          className="text-sm font-light text-gray-500 pr-2 py-3 whitespace-pre-line"
          id="taskcard-desc"
        >
          {description
            ? description.length > 250
              ? description.substring(0, 250) + "..."
              : description
            : ""}
        </p>
        <span className="block border-t border-black opacity-25 h-1 my-4 w-full"></span>
        <div className="flex flex-row gap-2 items-center">
          <svg
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.44 1.76H10.5V0.64C10.5 0.563 10.437 0.5 10.36 0.5H9.38C9.303 0.5 9.24 0.563 9.24 0.64V1.76H4.76V0.64C4.76 0.563 4.697 0.5 4.62 0.5H3.64C3.563 0.5 3.5 0.563 3.5 0.64V1.76H0.56C0.25025 1.76 0 2.01025 0 2.32V13.94C0 14.2498 0.25025 14.5 0.56 14.5H13.44C13.7498 14.5 14 14.2498 14 13.94V2.32C14 2.01025 13.7498 1.76 13.44 1.76ZM12.74 13.24H1.26V6.59H12.74V13.24ZM1.26 5.4V3.02H3.5V3.86C3.5 3.937 3.563 4 3.64 4H4.62C4.697 4 4.76 3.937 4.76 3.86V3.02H9.24V3.86C9.24 3.937 9.303 4 9.38 4H10.36C10.437 4 10.5 3.937 10.5 3.86V3.02H12.74V5.4H1.26Z"
              fill="black"
            />
          </svg>
          <p className="text-sm text-black font-light" id="taskcard-duedate">
            {dueDate == "Invalid Date" ? "No Due Date" : dueDate}
          </p>{" "}
          <svg
            width="4"
            height="5"
            viewBox="0 0 4 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="2" cy="2.5" r="2" fill="#BABABA" />
          </svg>
          <p
            className="text-sm text-gray-500 font-light"
            id="taskcard-date_created"
          >
            Created {getRelativeTime(createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
