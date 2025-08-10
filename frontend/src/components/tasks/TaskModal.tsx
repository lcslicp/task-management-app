import React, { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import editIcon from "../../assets/icons/edit-icon.svg";
import deleteIcon from "../../assets/icons/delete-icon.svg";
import LoadingSpinner from "../ui-states/loadingSpinner";
import LoadingSpinnerBlue from "../ui-states/loadingSpinnerBlue";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { setTaskOpen, setTaskLoading } from "../../features/tasks/taskUIslice";
import {
  setTaskDueDate,
  setTaskDescription,
  setTaskPriority,
  setTaskStatus,
  setTaskTitle,
} from "../../features/tasks/taskSlice";
import { deleteTask, updateTask } from "../../features/tasks/tasksThunks";
import { TaskInterface } from "../../types/task";

const TaskModal = ({
  isEditing,
  setIsEditing,
}: {
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const currentTask = useSelector((state: RootState) => state.currentTask);
  const loading = useSelector((state: RootState) => state.taskUI.taskLoading);

  const taskOpen = useSelector((state: RootState) => state.taskUI.taskOpen);
  const [editedTask, setEditedTask] = useState(currentTask);
  const navigate = useNavigate();

  const handleModalClose = () => {
    dispatch(setTaskOpen(false));
    navigate("/dashboard");
    setIsEditing(false);
  };

  const { taskId, title, description, status, priority, createdAt, dueDate } =
    currentTask;

  const handleEdit = () => {
    setIsEditing(true);
    setEditedTask(currentTask);
  };

  const handleDelete = async (taskId: string, taskStatus: string) => {
    dispatch(deleteTask({ taskId, taskStatus }));
  };

  const handleInputChange = (name: string, value: string) => {
    setEditedTask((oldTask) => ({ ...oldTask, [name]: value }));
  };

  const handleUpdate = (updatedTask: TaskInterface) => {
    dispatch(setTaskTitle(updatedTask.title));
    dispatch(setTaskDescription(updatedTask.description));
    dispatch(setTaskPriority(updatedTask.priority));
    dispatch(setTaskStatus(updatedTask.status));
    dispatch(setTaskDueDate(updatedTask.dueDate));
  };

  const getRelativeTime = (createdAt: string) => {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setTaskLoading(true));
    try {
      const updateResult = await dispatch(
        updateTask({
          id: currentTask.taskId,
          updatedData: editedTask,
          status: currentTask.status,
        })
      );
      if (updateTask.fulfilled.match(updateResult)) {
        const updated = updateResult.payload;
        handleUpdate(updated);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Update failed", error);
    } finally {
      dispatch(setTaskLoading(false));
    }
  };

  let due = new Date(dueDate);
  let createdDate = new Date(createdAt);
  let dueDateFormatted = due.toLocaleDateString("default", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  let createdDateFormatted = createdDate.toLocaleDateString("default", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div>
      {taskOpen ? (
        <section>
          <div
            id="task-modal"
            tabIndex={-1}
            className="overflow-y-auto overflow-x-hidden fixed z-50 top-0 right-0 left-0 z-50 flex justify-center items-center w-full inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div className="relative p-4 w-full max-w-2xl max-h-full">
              {/* <!-- Modal content --> */}
              <div className="relative bg-white rounded-2xl shadow-sm">
                {isEditing ? (
                  <div className="py-6 px-6 lg:px-8">
                    <form onSubmit={handleSubmit} className="space-y-6 ">
                      <input
                        type="text"
                        placeholder="Enter your task title..."
                        className="bg-gray-50 border border-lightgray text-black text-sm rounded-lg focus:ring-brightblue focus:border-blue-500 block w-full p-2.5 mt-6"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) =>
                          handleInputChange(e.target.name, e.target.value)
                        }
                        required
                      />
                      <div
                        id="selections"
                        className="flex flex-row items-center"
                      >
                        <select
                          name="status"
                          className="w-32 h-8 border-none bg-darkblue text-white text-xs rounded-md mr-4 "
                          value={status}
                          onChange={(e) =>
                            handleInputChange(e.target.name, e.target.value)
                          }
                          required
                        >
                          <option value="" disabled>
                            Status
                          </option>
                          <option value="To Do">To Do</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                        <select
                          name="priority"
                          className="w-32 h-8 border-darkblue text-xs rounded-md"
                          value={priority}
                          onChange={(e) =>
                            handleInputChange(e.target.name, e.target.value)
                          }
                          required
                        >
                          <option value="" disabled>
                            Priority
                          </option>
                          <option value="Low Priority">Low Priority</option>
                          <option value="Medium Priority">
                            Medium Priority
                          </option>
                          <option value="High Priority">High Priority</option>
                          <option value="Urgent">Urgent</option>
                        </select>
                        <div
                          id="due-date"
                          className="flex-row items-center ml-auto inline-flex"
                        >
                          <p className="text-sm font-bold mr-4">DUE DATE: </p>
                          <input
                            type="date"
                            name="dueDate"
                            className="bg-lightgray border-none text-xs rounded-md"
                            value={dueDate}
                            onChange={(e) =>
                              handleInputChange(e.target.name, e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <textarea
                        placeholder="Write your task description..."
                        cols={30}
                        rows={10}
                        className="bg-gray-50 border border-lightgray text-black text-sm rounded-lg focus:ring-blue-500 focus:border-brightblue block w-full p-2.5"
                        id="description"
                        name="description"
                        value={description || ""}
                        onChange={(e) =>
                          handleInputChange(e.target.name, e.target.value)
                        }
                      ></textarea>
                      <div className="w-full flex justify-end">
                        <div className="flex flex-row w-2/3 space-x-4">
                          <button
                            type="submit"
                            className="w-full text-black bg-lightgray focus:outline-none focus:ring-lightgray rounded-lg text-sm font-bold px-5 py-2.5 text-center hover:brightness-90"
                            onClick={handleModalClose}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="w-full text-white bg-brightblue hover:bg-brighterblue focus:ring-4 focus:outline-none focus:ring-lightgray rounded-lg text-sm font-bold px-5 py-2.5 text-center"
                          >
                            <div>
                              {loading ? <LoadingSpinner /> : "Save Task"}
                            </div>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                ) : loading ? (
                  <div className="w-full">
                    <LoadingSpinnerBlue />
                  </div>
                ) : (
                  <div
                    id="task_modal"
                    className="flex flex-col relative p-8 w-full max-w-2xl max-h-full"
                  >
                    <div
                      id="main-headline"
                      className="flex justify-between items-center font-medium"
                    >
                      <h2 className="text-2xl text-brandblack pb-4">{title}</h2>
                      <button
                        type="button"
                        className="text-gray-400 bg-offwhite hover:bg-gray-200 hover:text-gray-900 rounded-2xl text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                        onClick={handleModalClose}
                        data-modal-hide="static-modal"
                      >
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 14"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                          />
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                    </div>
                    <div
                      id="dates-container"
                      className="flex items-center gap-4 text-sm"
                    >
                      <div className="flex items-center gap-4">
                        <p className="flex flex-col m-0 p-0 text-sm">
                          {" "}
                          <span className="text-brandgray text-xs -mb-1 p-0">
                            Due Date
                          </span>{" "}
                          {dueDateFormatted}
                        </p>{" "}
                      </div>
                      <span className="h-10 w-1 border-r border-brandgray opacity-50"></span>

                      <div className="flex items-center gap-2">
                        <p className="flex flex-col m-0 p-0 text-sm text-brandgray">
                          {" "}
                          <span className=" text-xs -mb-1 p-0">
                            Created
                          </span>{" "}
                          {getRelativeTime(createdAt)}
                        </p>{" "}
                      </div>
                    </div>
                    <span className="w-full h-1 border-b border-brandgray pt-4 opacity-50"></span>
                    <div
                      id="task-description"
                      className="pt-6 pb-10 text-togglegray"
                    >
                      <p>{description}</p>
                    </div>
                    <div
                      id="modal-footer"
                      className="flex items-center justify-between"
                    >
                      <div id="modal-tags" className="flex gap-2">
                        <p
                          className={(() => {
                            switch (priority) {
                              case "Low Priority":
                                return "text-sm bg-softgreen border border-brandgreen rounded-lg px-3 h-fit py-1 text-center text-brandgreen";
                              case "Medium Priority":
                                return "text-sm bg-softblue border border-brandblue text-brandblue rounded-lg px-3 h-fit py-1 text-center";
                              case "High Priority":
                                return "text-sm bg-softyellow border border-brandyellow text-brandyellow  rounded-lg px-3 h-fit py-1 text-center";
                              case "Urgent":
                                return "text-sm bg-softred border border-brandred text-brandred rounded-lg px-3 h-fit py-1 text-center";
                              default:
                                return undefined;
                            }
                          })()}
                        >
                          {priority}
                        </p>
                        <p
                          className={(() => {
                            switch (status) {
                              case "To Do":
                                return "text-sm bg-gray-100 border border-brandgray rounded-lg px-3 h-fit py-1 text-center text-brandgray";
                              case "In Progress":
                                return "text-sm bg-softyellow border border-brandyellow text-brandyellow rounded-lg px-3 h-fit py-1 text-center";
                              case "Completed":
                                return "text-sm bg-softgreen border border-brandgreen text-brandgreen rounded-lg px-3 h-fit py-1 text-center ";
                              default:
                                return undefined;
                            }
                          })()}
                        >
                          {" "}
                          {status}
                        </p>
                      </div>

                      <div id="modal-footer-icons" className="flex gap-2">
                        <button
                          id="edit-icon"
                          className="bg-offwhite hover:bg-gray-200 rounded-full text-sm w-9 h-9 ms-auto inline-flex justify-center items-center"
                          onClick={handleEdit}
                        >
                          <svg
                            width="30"
                            height="31"
                            viewBox="0 0 30 31"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="bg-transparent"
                          >
                            <rect
                              y="0.0959473"
                              width="35"
                              height="35"
                              rx="15"
                              className="fill-none"
                            />
                            <path
                              d="M10.582 18.7101C10.6145 18.7101 10.647 18.7068 10.6795 18.7019L13.4127 18.2226C13.4452 18.2161 13.4761 18.2014 13.4989 18.1771L20.3872 11.2887C20.4023 11.2736 20.4142 11.2558 20.4224 11.2361C20.4306 11.2165 20.4348 11.1954 20.4348 11.1741C20.4348 11.1528 20.4306 11.1318 20.4224 11.1121C20.4142 11.0924 20.4023 11.0746 20.3872 11.0596L17.6865 8.35718C17.6556 8.32631 17.615 8.31006 17.5711 8.31006C17.5272 8.31006 17.4866 8.32631 17.4557 8.35718L10.5674 15.2456C10.543 15.2699 10.5284 15.2992 10.5219 15.3317L10.0425 18.0649C10.0267 18.152 10.0323 18.2416 10.0589 18.326C10.0856 18.4103 10.1323 18.487 10.1952 18.5492C10.3025 18.6532 10.4374 18.7101 10.582 18.7101ZM11.6772 15.8761L17.5711 9.98381L18.7622 11.1749L12.8684 17.0672L11.4237 17.3223L11.6772 15.8761ZM20.6944 20.0751H8.73436C8.44673 20.0751 8.21436 20.3074 8.21436 20.5951V21.1801C8.21436 21.2516 8.27286 21.3101 8.34436 21.3101H21.0844C21.1559 21.3101 21.2144 21.2516 21.2144 21.1801V20.5951C21.2144 20.3074 20.982 20.0751 20.6944 20.0751Z"
                              className="fill-togglegray"
                            />
                          </svg>
                        </button>
                        <button
                          id="delete-icon"
                          className="bg-offwhite hover:bg-gray-200 rounded-full text-sm w-9 h-9 ms-auto inline-flex justify-center items-center"
                          onClick={() => handleDelete(taskId, status)}
                        >
                          <svg
                            width="30"
                            height="31"
                            viewBox="0 0 30 31"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              y="0.0959473"
                              width="30"
                              height="30"
                              rx="15"
                            />
                            <path
                              d="M12.4271 9.76595H12.2917C12.3661 9.76595 12.4271 9.70745 12.4271 9.63595V9.76595H17.5729V9.63595C17.5729 9.70745 17.6339 9.76595 17.7083 9.76595H17.5729V10.9359H18.7917V9.63595C18.7917 9.06232 18.3059 8.59595 17.7083 8.59595H12.2917C11.6941 8.59595 11.2083 9.06232 11.2083 9.63595V10.9359H12.4271V9.76595ZM20.9583 10.9359H9.04167C8.74206 10.9359 8.5 11.1683 8.5 11.4559V11.9759C8.5 12.0474 8.56094 12.1059 8.63542 12.1059H9.65781L10.0759 20.6047C10.103 21.1588 10.5803 21.5959 11.1576 21.5959H18.8424C19.4214 21.5959 19.897 21.1604 19.9241 20.6047L20.3422 12.1059H21.3646C21.4391 12.1059 21.5 12.0474 21.5 11.9759V11.4559C21.5 11.1683 21.2579 10.9359 20.9583 10.9359ZM18.7121 20.4259H11.2879L10.8783 12.1059H19.1217L18.7121 20.4259Z"
                              fill="#575757"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="fixed inset-0 w-full h-full bg-black z-30 opacity-40"></div>
        </section>
      ) : (
        ""
      )}
    </div>
  );
};

export default TaskModal;
