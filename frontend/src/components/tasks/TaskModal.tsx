import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalLoading from "../ui-states/ModalLoadingState";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import {
  setStatusColor,
  setStatusDisplay,
  setStatusMsg,
  setTaskOpen,
} from "../../features/tasks/taskUIslice";
import {
  setTaskDueDate,
  setTaskDescription,
  setTaskPriority,
  setTaskStatus,
  setTaskTitle,
  setCurrentTask,
} from "../../features/tasks/taskSlice";
import {
  deleteTask,
  fetchCompletedData,
  fetchInprogressData,
  fetchTodoData,
  updateTask,
} from "../../features/tasks/tasksThunks";
import { TaskInterface } from "../../types/task";

const TaskModal = ({
  isEditing,
  setIsEditing,
  setActiveStatusTab,
}: {
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  setActiveStatusTab: Dispatch<SetStateAction<string>>;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const currentTask = useSelector((state: RootState) => state.currentTask);
  const taskLoading = useSelector(
    (state: RootState) => state.taskUI.taskLoading
  );
  const taskOpen = useSelector((state: RootState) => state.taskUI.taskOpen);
  const [editedTask, setEditedTask] = useState(currentTask);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleModalClose = () => {
    dispatch(setTaskOpen(false));
    navigate("/dashboard");
    setIsEditing(false);
  };

  const { _id, title, description, status, priority, createdAt, dueDate } =
    currentTask;

  const handleEdit = () => {
    setIsEditing(true);
    dispatch(setCurrentTask(editedTask));
  };

  const handleDelete = async (_id: string, taskStatus: string) => {
    try {
      await dispatch(deleteTask({ _id, taskStatus }));
      dispatch(setTaskOpen(false));
      if (taskStatus === "To Do") {
        dispatch(fetchTodoData());
      } else if (taskStatus === "In Progress") {
        dispatch(fetchInprogressData());
      } else {
        dispatch(fetchCompletedData());
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
    setLoading(true);
    try {
      const updateResult = await dispatch(
        updateTask({
          updatedData: editedTask,
        })
      );
      if (updateTask.fulfilled.match(updateResult)) {
        const updated = updateResult.payload;
        handleUpdate(updated);
      }
      if (updateResult.payload.status === "To Do") {
        setActiveStatusTab("1");
      } else if (updateResult.payload.status === "In Progress") {
        setActiveStatusTab("2");
      } else if (updateResult.payload.status === "Completed") {
        setActiveStatusTab("3");
      }
      await dispatch(fetchTodoData());
      setLoading(false);
      setIsEditing(false);
      dispatch(setStatusColor(["statusgreen", "softgreen"]));

      dispatch(setStatusMsg("Task edited successfully."));
      dispatch(setStatusDisplay(true));
      setTimeout(() => {
        dispatch(setStatusDisplay(false));
      }, 10000);
    } catch (error) {
      console.error("Update failed", error);
      setLoading(false);
      dispatch(setStatusColor(["brandred", "softred"]));
      dispatch(setStatusMsg("Failed to edit task. Please try again"));
      dispatch(setStatusDisplay(true));
      setTimeout(() => {
        dispatch(setStatusDisplay(false));
      }, 10000);
    }
  };

  const formatDueDate = (dueDate: string) => {
    let due = new Date(dueDate);
    let dueDateFormatted = due.toLocaleDateString("default", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return dueDateFormatted;
  };

  useEffect(() => {
    setEditedTask(currentTask);
  }, [currentTask]);

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
              {/* <!-- Modal card starts here --> */}
              <div className="relative bg-white rounded-2xl shadow-sm">
                {/* <!-- Task input modal --> */}
                {isEditing ? (
                  <div className="py-6 px-6 lg:px-8">
                    <div
                      className="flex justify-between items-center font-medium"
                      id="action-heading"
                    >
                      <h2 className="text-2xl text-brandblack">Edit Task</h2>
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
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                          />
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                      <div className="flex flex-col" id="title-input">
                        <label
                          htmlFor="task-title"
                          className="uppercase font-medium text-xs text-togglegray pb-2"
                        >
                          Title
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your task title..."
                          className="bg-offwhite border-none rounded-lg placeholder-coolgray h-10 placeholder:font-light placeholder:text-sm focus:ring-coolgray focus:ring-1"
                          id="task-title"
                          name="title"
                          value={editedTask.title}
                          onChange={(e) =>
                            handleInputChange(e.target.name, e.target.value)
                          }
                          required
                        />
                      </div>
                      <div
                        id="selections"
                        className="flex flex-row items-center gap-5"
                      >
                        <div id="status-dropdown" className="flex flex-col">
                          <label
                            htmlFor="status"
                            className="uppercase font-medium text-xs text-togglegray pb-2"
                          >
                            Status
                          </label>
                          <select
                            name="status"
                            className="bg-offwhite border-none rounded-lg h-8 focus:ring-coolgray focus:ring-1 text-xs"
                            value={editedTask.status}
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
                        </div>

                        <div id="priority-dropdown" className="flex flex-col">
                          <label
                            htmlFor="priority"
                            className="uppercase font-medium text-xs text-togglegray pb-2"
                          >
                            Priority
                          </label>
                          <select
                            name="priority"
                            className="bg-offwhite border-none rounded-lg h-8 focus:ring-coolgray focus:ring-1 text-xs"
                            value={editedTask.priority}
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
                        </div>

                        <div id="due-date" className="flex flex-col">
                          <label
                            htmlFor="status"
                            className="uppercase font-medium text-xs text-togglegray pb-2"
                          >
                            Due Date
                          </label>
                          <input
                            type="date"
                            name="dueDate"
                            id="due-date"
                            className="bg-offwhite border-none rounded-lg h-8 focus:ring-coolgray focus:ring-1 text-xs"
                            value={editedTask.dueDate}
                            onChange={(e) =>
                              handleInputChange(e.target.name, e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div id="description" className="flex flex-col">
                        <label
                          htmlFor="description"
                          className="uppercase font-medium text-xs text-togglegray pb-2"
                        >
                          Description
                        </label>
                        <textarea
                          placeholder="Write your task description..."
                          cols={30}
                          rows={8}
                          className=" text-hovergray text-sm rounded-lg bg-offwhite border-none rounded-lg focus:ring-coolgray focus:ring-1 block w-full p-2.5"
                          id="description"
                          name="description"
                          value={editedTask.description || ""}
                          onChange={(e) =>
                            handleInputChange(e.target.name, e.target.value)
                          }
                        ></textarea>
                      </div>

                      <div className="w-full flex justify-end">
                        <div className="flex flex-row gap-5 justify-end">
                          <button
                            data-modal-hide="default-modal"
                            type="button"
                            className="py-2.5 px-5 ms-3 text-sm font-medium text-hovergray focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-togglegray focus:z-10 focus:ring-gray-100 "
                            onClick={() => setIsEditing(false)}
                          >
                            Cancel
                          </button>
                          <button
                            data-modal-hide="default-modal"
                            type="submit"
                            className={`${
                              loading ? "cursor-progress" : "cursor-pointer"
                            } text-white bg-brandblack hover:bg-hovergray focus:ring-4 focus:outline-nonefont-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                            disabled={loading ? true : false}
                          >
                            <div>
                              {loading ? (
                                <span className="flex items-center justify-center">
                                  {" "}
                                  <svg
                                    aria-hidden="true"
                                    role="status"
                                    className="inline w-4 h-4 me-3 text-white animate-spin"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                      fill="#E5E7EB"
                                    />
                                    <path
                                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                      fill="currentColor"
                                    />
                                  </svg>{" "}
                                  Loading...{" "}
                                </span>
                              ) : (
                                "Update Task"
                              )}
                            </div>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                ) : taskLoading ? (
                  <ModalLoading />
                ) : (
                  /* <!-- Static modal content --> */
                  <div
                    id="task-modal"
                    className="flex flex-col relative p-8 w-full max-w-2xl max-h-full"
                  >
                    <div
                      id="main-headline"
                      className="flex justify-between items-center font-medium"
                    >
                      <h2 className="text-2xl text-brandblack pb-4">
                        {editedTask.title}
                      </h2>
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
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
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
                          <span className="text-brandgray text-xs p-0">
                            Due Date
                          </span>{" "}
                          {editedTask.dueDate
                            ? formatDueDate(editedTask.dueDate)
                            : "None"}
                        </p>{" "}
                      </div>
                      <span className="h-10 w-1 border-r border-brandgray opacity-50"></span>

                      <div className="flex items-center gap-2">
                        <p className="flex flex-col m-0 p-0 text-sm text-brandgray">
                          {" "}
                          <span className=" text-xs p-0">Created</span>{" "}
                          {getRelativeTime(createdAt)}
                        </p>{" "}
                      </div>
                    </div>
                    <span className="w-full h-1 border-b border-brandgray pt-4 opacity-50"></span>
                    <div
                      id="task-description"
                      className="pt-6 pb-10 text-togglegray"
                    >
                      <p>{editedTask.description}</p>
                    </div>
                    <div
                      id="modal-footer"
                      className="flex items-center justify-between"
                    >
                      <div id="modal-tags" className="flex gap-2">
                        <p
                          className={(() => {
                            switch (editedTask.priority) {
                              case "Low Priority":
                                return "text-sm bg-softgreen border border-statusgreen rounded-lg px-3 h-fit py-1 text-center text-statusgreen";
                              case "Medium Priority":
                                return "text-sm bg-softblue border border-brandblue text-brandblue rounded-lg px-3 h-fit py-1 text-center";
                              case "High Priority":
                                return "text-sm bg-softyellow border border-darkyellow text-darkyellow  rounded-lg px-3 h-fit py-1 text-center";
                              case "Urgent":
                                return "text-sm bg-softred border border-brandred text-brandred rounded-lg px-3 h-fit py-1 text-center";
                              default:
                                return undefined;
                            }
                          })()}
                        >
                          {editedTask.priority}
                        </p>
                        <p
                          className={(() => {
                            switch (editedTask.status) {
                              case "To Do":
                                return "text-sm bg-gray-100 border border-brandgray rounded-lg px-3 h-fit py-1 text-center text-brandgray";
                              case "In Progress":
                                return "text-sm bg-softyellow border border-darkyellow text-darkyellow rounded-lg px-3 h-fit py-1 text-center";
                              case "Completed":
                                return "text-sm bg-softgreen border border-statusgreen text-statusgreen rounded-lg px-3 h-fit py-1 text-center ";
                              default:
                                return undefined;
                            }
                          })()}
                        >
                          {" "}
                          {editedTask.status}
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
                          onClick={() => handleDelete(_id, status)}
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
