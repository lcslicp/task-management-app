import React, { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import editIcon from "../../assets/icons/edit-icon.svg";
import deleteIcon from "../../assets/icons/delete-icon.svg";
import LoadingSpinner from "../ui-states/loadingSpinner";
import LoadingSpinnerBlue from "../ui-states/loadingSpinnerBlue";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { setTaskOpen } from "../../features/tasks/taskUIslice";
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
  const [loading, setLoading] = useState(false);
  const currentTask = useSelector((state: RootState) => state.currentTask);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
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
      setLoading(false);
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
            id="task-input"
            tabIndex={-1}
            className="overflow-y-auto overflow-x-hidden fixed z-50 pt-14 w-full md:inset-0 h-modal md:h-full"
          >
            <div className="relative p-4 w-1/2 h-full md:h-auto inset-x-1/3 inset-y-16">
              {/* <!-- Modal content --> */}
              <div className="relative bg-white rounded-lg shadow">
                <button
                  type="button"
                  className="absolute top-3 right-2.5 text-black bg-transparent hover:bg-lightgray hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                  onClick={handleModalClose}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>

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
                  <div className="py-6 px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-brandblack pb-6 pt-6">
                      {title}
                    </h1>
                    <div className="flex flex-row gap-4 pb-2">
                      <p
                        className={(() => {
                          switch (priority) {
                            case "Low Priority":
                              return "border border-grey text-xs text-grey rounded-full px-2 py-2 w-28 text-center";
                            case "Medium Priority":
                              return "bg-lightgray text-xs text-grey rounded-full px-2 py-2 w-36 text-center";
                            case "High Priority":
                              return "bg-darkblue text-xs text-white rounded-full px-3 py-2 w-28 text-center";
                            case "Urgent":
                              return "bg-brightblue text-xs text-white rounded-full px-2 py-2 w-24 text-center";
                            default:
                              return undefined;
                          }
                        })()}
                      >
                        {" "}
                        {priority}
                      </p>
                      <p
                        className={(() => {
                          switch (status) {
                            case "To Do":
                              return "border border-grey text-xs text-grey rounded-full px-1 py-2 w-24 text-center";
                            case "In Progress":
                              return "bg-lightgray text-xs text-grey rounded-full px-2 py-2 w-36 text-center";
                            case "Completed":
                              return "bg-darkblue text-xs text-white rounded-full px-2 py-2 w-28 text-center";
                            case "Overdue":
                              return "bg-brightblue text-xs text-white rounded-full px-2 py-2 w-36 text-center";
                            default:
                              return undefined;
                          }
                        })()}
                      >
                        {" "}
                        {status}
                      </p>
                    </div>
                    <p className="text-grey text-xs pt-4 pb-1 font-normal ">
                      Date Added: {createdDateFormatted}
                    </p>
                    <p className="text-xs font-bold text-darkblue ">
                      Due Date:{" "}
                      {dueDate == "Invalid Date" ? "Unknown" : dueDate}{" "}
                    </p>

                    <p className="text-sm font-normal text-grey pr-2 py-10 whitespace-pre-line leading-6">
                      {description}
                    </p>

                    <button
                      type="button"
                      className="absolute bottom-3 right-3.5 bg-transparent hover:bg-lightgray hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center mr-6"
                      onClick={handleEdit}
                    >
                      {" "}
                      <img src={editIcon} className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      className="absolute bottom-3 right-2.5 bg-transparent hover:bg-lightgray hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                      onClick={() => handleDelete(taskId, status)}
                    >
                      <img src={deleteIcon} className="w-4 h-4" />{" "}
                    </button>
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
