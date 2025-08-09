import React, { useState } from "react";
import LoadingSpinner from "../ui-states/loadingSpinner";
import {
  setTaskDescription,
  setTaskDueDate,
  setTaskPriority,
  setTaskStatus,
  setTaskTitle,
} from "../../features/tasks/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../../features/tasks/tasksThunks";
import { AppDispatch, RootState } from "../../app/store";
import {
  addCompleted,
  addInProgress,
  addTodo,
} from "../../features/tasks/tasksSlice";

const TaskInput = ({}) => {
  const [popup, setPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.task.status);
  const title = useSelector((state: RootState) => state.task.title);
  const description = useSelector(
    (state: RootState) => state.task.description
  );
  const priority = useSelector((state: RootState) => state.task.priority);
  const dueDate = useSelector((state: RootState) => state.task.dueDate);

  const handleFormReset = () => {
    dispatch(setTaskTitle(""));
    dispatch(setTaskDescription(""));
    dispatch(setTaskStatus(""));
    dispatch(setTaskPriority(""));
    dispatch(setTaskDueDate(""));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const task = await dispatch(
        createTask({ title, description, status, priority, dueDate })
      ).unwrap();

      if (task.status === "To Do") {
        addTodo(task);
      } else if (task.status === "In Progress") {
        addInProgress(task);
      } else {
        addCompleted(task);
      }
      setLoading(false);
      handleModalClose()
      handleFormReset();
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  const handleModalOpen = () => {
    setPopup(!popup);
    handleFormReset();
  };

  const handleModalClose = () => {
    setPopup(false);
  };

  return (
    <div>
      <div className="fixed right-0 top-24 pt-8 mr-12 z-10">
        <button
          className="block text-white bg-black hover:bg-transparent hover:text-black hover:border hover:border-black rounded-lg text-sm px-10 py-2.5 text-center"
          type="button"
          onClick={handleModalOpen}
        >
          + New Task
        </button>
      </div>

      {popup ? (
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
                <div className="py-6 px-6 lg:px-8">
                  <form onSubmit={handleSubmit} className="space-y-6 ">
                    <input
                      type="text"
                      placeholder="Enter your task title..."
                      className="bg-gray-50 border border-lightgray text-black text-sm rounded-lg focus:ring-brightblue focus:border-blue-500 block w-full p-2.5 mt-6"
                      id="title"
                      value={title}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        dispatch(setTaskTitle(e.target.value))
                      }
                      required
                    />
                    <div id="selections" className="flex flex-row items-center">
                      <select
                        name="status"
                        className="w-32 h-8 border-none bg-darkblue text-white text-xs rounded-md mr-4 "
                        value={status}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                          dispatch(setTaskStatus(e.target.value))
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
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                          dispatch(setTaskPriority(e.target.value))
                        }
                        required
                      >
                        <option value="" disabled>
                          Priority
                        </option>
                        <option value="Low Priority">Low Priority</option>
                        <option value="Medium Priority">Medium Priority</option>
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
                          name="duedate"
                          className="bg-lightgray border-none text-xs rounded-md"
                          value={dueDate}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            dispatch(setTaskDueDate(e.target.value))
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
                      value={description}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        dispatch(setTaskDescription(e.target.value))
                      }
                    ></textarea>
                    <div className="w-full flex justify-end">
                      <div className="flex flex-row w-2/3 space-x-4">
                        <button
                          type="submit"
                          className="w-full text-black bg-lightgray border border-transparent focus:outline-none focus:ring-lightgray rounded-lg text-sm px-5 py-2.5 text-center hover:border hover:border-black hover:bg-transparent"
                          onClick={handleModalClose}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="w-full text-white bg-black hover:bg-transparent border border-transparent hover:text-black hover:border-black focus:ring-4 focus:outline-none focus:ring-lightgray rounded-lg text-sm text-center"
                        >
                          <div>{loading ? <LoadingSpinner /> : "Add Task"}</div>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
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

export default TaskInput;
