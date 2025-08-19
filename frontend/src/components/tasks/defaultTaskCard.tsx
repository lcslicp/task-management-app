import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { TaskInterface } from "../../types/task";
import { fetchSingleTaskData } from "../../features/tasks/taskThunks";
import {
  setTaskOpen,
  setTaskLoading,
  setStatusMsg,
  setStatusDisplay,
  setStatusColor,
} from "../../features/tasks/taskUIslice";
import { setCurrentTask } from "../../features/tasks/taskSlice";
import {
  deleteTask,
  fetchCompletedData,
  fetchInprogressData,
  fetchTodoData,
} from "../../features/tasks/tasksThunks";

const TaskCard = ({ task }: { task: TaskInterface }) => {
  type Visibility = "visible" | "hidden";
  const [dropdown, setDropdown] = useState<Visibility>("hidden");
  const dispatch = useDispatch<AppDispatch>();

  const { _id, title, description, status, priority, dueDate } = task;

  let dueDateFormatted = new Date(dueDate).toLocaleDateString("default", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const toggleTask = () => {
    dropdown === "hidden" ? setDropdown("visible") : setDropdown("hidden");
  };

  const onOpen = async (id: string) => {
    dispatch(setTaskLoading(true));
    try {
      const response = await dispatch(fetchSingleTaskData(id));
      dispatch(setTaskOpen(true));
      dispatch(setCurrentTask(response.payload));
      dispatch(setTaskLoading(false));
    } catch (error) {
      dispatch(setTaskLoading(false));
      console.error(error);
    }
  };

  const handleDelete = async (_id: string, taskStatus: string) => {
    try {
      await dispatch(deleteTask({ _id, taskStatus }));
      dispatch(setTaskOpen(false));
      if (taskStatus === "To Do") {
        await dispatch(fetchTodoData());
      } else if (taskStatus === "In Progress") {
        await dispatch(fetchInprogressData());
      } else if (taskStatus === "Completed") {
        await dispatch(fetchCompletedData());
      }
      dispatch(setStatusColor(["statusgreen", "softgreen"]));
      dispatch(setStatusMsg("Deleted task successfully."));
      dispatch(setStatusDisplay(true));
      setTimeout(() => {
        dispatch(setStatusDisplay(false));
      }, 10000);
    } catch (error) {
      console.error(error);
      dispatch(setStatusColor(["brandred", "softred"]));
      dispatch(setStatusMsg("Failed to delete task. Please try again."));
      dispatch(setStatusDisplay(true));
      setTimeout(() => {
        dispatch(setStatusDisplay(false));
      }, 10000);
    }
  };

  return (
    <div
      className={(() => {
        switch (priority) {
          case "Low Priority":
            return "rounded-2xl h-fit break-inside-avoid cursor-pointer w-full p-3 mb-3 bg-softgreen border-[0.5px] border-transparent hover:border-statusgreen";
          case "Medium Priority":
            return "rounded-2xl h-fit break-inside-avoid cursor-pointer w-full p-3 mb-3 bg-softblue border-[0.5px] border-transparent hover:border-brandblue";
          case "High Priority":
            return "rounded-2xl h-fit break-inside-avoid cursor-pointer w-full p-3 mb-3 bg-softyellow border-[0.5px] border-transparent hover:border-darkyellow";
          case "Urgent":
            return "rounded-2xl h-fit break-inside-avoid cursor-pointer w-full p-3 mb-3 bg-softred border-[0.5px] border-transparent hover:border-brandred";
          default:
            return undefined;
        }
      })()}
    >
      <div
        className="flex justify-between w-full pb-6 px-2 py-2"
        id="upper-card"
      >
        <p
          className={(() => {
            switch (priority) {
              case "Low Priority":
                return "text-sm bg-white border border-statusgreen rounded-lg px-2 h-fit py-0.5 text-center flex items-center gap-1 text-statusgreen";
              case "Medium Priority":
                return "text-sm bg-white border border-brandblue  rounded-lg px-2 h-fit py-0.5 text-center flex items-center gap-1 text-brandblue";
              case "High Priority":
                return "text-sm bg-white border border-darkyellow  rounded-lg px-2 h-fit py-0.5 text-center flex items-center gap-1 text-darkyellow";
              case "Urgent":
                return "text-sm bg-white border border-brandred  rounded-lg px-2 h-fit py-0.5 text-center inline-flex items-center gap-1 text-brandred";
              default:
                return undefined;
            }
          })()}
        >
          {priority}
        </p>
        <div id="toggle-button" className="flex flex-col justify-end items-end">
          <button
            id="dropdownButton"
            type="button"
            onClick={toggleTask}
            className={(() => {
              switch (priority) {
                case "Low Priority":
                  return "bg-white border-[0.5px]  border-white hover:border-statusgreen rounded-full w-7 h-7 ms-auto inline-flex justify-center items-center";
                case "Medium Priority":
                  return "bg-white border-[0.5px] border-white hover:border-brandblue rounded-full w-7 h-7 ms-auto inline-flex justify-center items-center";
                case "High Priority":
                  return "bg-white border-[0.5px] border-white hover:border-darkyellow rounded-full w-7 h-7 ms-auto inline-flex justify-center items-center";
                case "Urgent":
                  return "bg-white border-[0.5px]  border-white hover:border-brandred rounded-full w-7 h-7 ms-auto inline-flex justify-center items-center";
                default:
                  return undefined;
              }
            })()}
          >
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
          <div
            id="dropdown"
            style={{ visibility: `${dropdown}` }}
            className="z-10"
          >
            <button
              onClick={() => handleDelete(_id, status)}
              className="py-2 px-4 w-full text-sm hover:bg-cardwhite -mt-3 rounded-lg bg-white flex shadow items-center gap-2 -mb-16"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.92708 1.17H3.79167C3.86615 1.17 3.92708 1.1115 3.92708 1.04V1.17H9.07292V1.04C9.07292 1.1115 9.13385 1.17 9.20833 1.17H9.07292V2.34H10.2917V1.04C10.2917 0.466375 9.80586 0 9.20833 0H3.79167C3.19414 0 2.70833 0.466375 2.70833 1.04V2.34H3.92708V1.17ZM12.4583 2.34H0.541667C0.242057 2.34 0 2.57237 0 2.86V3.38C0 3.4515 0.0609375 3.51 0.135417 3.51H1.15781L1.57591 12.0087C1.60299 12.5629 2.08034 13 2.65755 13H10.3424C10.9214 13 11.397 12.5645 11.4241 12.0087L11.8422 3.51H12.8646C12.9391 3.51 13 3.4515 13 3.38V2.86C13 2.57237 12.7579 2.34 12.4583 2.34ZM10.2121 11.83H2.78789L2.37826 3.51H10.6217L10.2121 11.83Z"
                  fill="#AFB1D9"
                />
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>
      {
        <div
          className="flex flex-col -mt-3"
          onClick={() => onOpen(_id)}
          id="taskcard_content"
        >
          <div className="rounded-lg px-3 py-2 flex flex-col gap-2">
            <h3
              className={(() => {
                switch (priority) {
                  case "Low Priority":
                    return "text-xl text-statusgreen font-normal leading-1 pb-2";
                  case "Medium Priority":
                    return "text-xl text-brandblue font-normal leading-1 pb-2";
                  case "High Priority":
                    return "text-xl text-darkyellow font-normal leading-1 pb-2";
                  case "Urgent":
                    return "text-xl text-brandred font-normal leading-1 pb-2";
                  default:
                    return undefined;
                }
              })()}
            >
              {title}
            </h3>
            <p
              className={(() => {
                switch (priority) {
                  case "Low Priority":
                    return "text-sm font-light text-statusgreen whitespace-pre-line pb-4";
                  case "Medium Priority":
                    return "text-sm font-light text-brandblue whitespace-pre-line pb-4";
                  case "High Priority":
                    return "text-sm font-light text-darkyellow whitespace-pre-line pb-4";
                  case "Urgent":
                    return "text-sm font-light text-brandred whitespace-pre-line pb-4";
                  default:
                    return undefined;
                }
              })()}
              id="taskcard-desc"
            >
              {description ? (
                description.length > 250 ? (
                  description.substring(0, 250) + "..."
                ) : (
                  description
                )
              ) : (
                <span className="italic text-brandgray text-xs">
                  No Description Available
                </span>
              )}
            </p>
          </div>

          <div
            className={(() => {
              switch (priority) {
                case "Low Priority":
                  return "flex flex-row items-center justify-start px-3 text-statusgreen py-1 border-[0.5px] border-statusgreen rounded-lg w-fit text-xs";
                case "Medium Priority":
                  return "flex flex-row items-center justify-start px-3 text-brandblue py-1 border-[0.5px] border-brandblue rounded-lg w-fit text-xs";
                case "High Priority":
                  return "flex flex-row items-center justify-start px-3 text-darkyellow py-1 border-[0.5px] border-darkyellow rounded-lg w-fit text-xs";
                case "Urgent":
                  return "flex flex-row items-center justify-start px-2 text-brandred py-1 border-[0.5px] border-brandred rounded-lg w-fit text-xs";
                default:
                  return undefined;
              }
            })()}
          >
            <svg
              width="10"
              height="11"
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              <path
                className={(() => {
                  switch (priority) {
                    case "Low Priority":
                      return "fill-statusgreen";
                    case "Medium Priority":
                      return "fill-brandblue";
                    case "High Priority":
                      return "fill-darkyellow";
                    case "Urgent":
                      return "fill-brandred";
                    default:
                      return undefined;
                  }
                })()}
                d="M13.44 1.76H10.5V0.64C10.5 0.563 10.437 0.5 10.36 0.5H9.38C9.303 0.5 9.24 0.563 9.24 0.64V1.76H4.76V0.64C4.76 0.563 4.697 0.5 4.62 0.5H3.64C3.563 0.5 3.5 0.563 3.5 0.64V1.76H0.56C0.25025 1.76 0 2.01025 0 2.32V13.94C0 14.2498 0.25025 14.5 0.56 14.5H13.44C13.7498 14.5 14 14.2498 14 13.94V2.32C14 2.01025 13.7498 1.76 13.44 1.76ZM12.74 13.24H1.26V6.59H12.74V13.24ZM1.26 5.4V3.02H3.5V3.86C3.5 3.937 3.563 4 3.64 4H4.62C4.697 4 4.76 3.937 4.76 3.86V3.02H9.24V3.86C9.24 3.937 9.303 4 9.38 4H10.36C10.437 4 10.5 3.937 10.5 3.86V3.02H12.74V5.4H1.26Z"
              />
            </svg>
            <p className="text-xs font-medium" id="taskcard-duedate">
              {dueDateFormatted == "Invalid Date"
                ? "No Due Date"
                : `Due Date: ${dueDateFormatted}`}
            </p>{" "}
          </div>
        </div>
      }
    </div>
  );
};

export default React.memo(TaskCard);
