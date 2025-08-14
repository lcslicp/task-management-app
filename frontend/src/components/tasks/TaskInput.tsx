import React, { Dispatch, SetStateAction, useState } from "react";
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
import { useFormReset } from "../../utils/useFormReset";

const TaskInput = ({
  popup,
  setPopup,
}: {
  popup: boolean;
  setPopup: Dispatch<SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { status, title, description, priority, dueDate } = useSelector(
    (state: RootState) => state.task
  );

  const resetForm = useFormReset();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const task = await dispatch(
        createTask({ title, description, status, priority, dueDate })
      ).unwrap();
      if (task.status === "To Do") {
        dispatch(addTodo(task));
        
      } else if (task.status === "In Progress") {
        dispatch(addInProgress(task));
      } else {
        dispatch(addCompleted(task));
      }
      setLoading(false);
      setPopup(false);
      resetForm();
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

   

  return (
    <div>
      {popup ? (
        <section>
          <div
            id="task-input"
            tabIndex={-1}
            className="overflow-y-auto overflow-x-hidden fixed z-50 ptop-0 right-0 left-0 z-50 flex justify-center items-center w-full inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div className="relative p-4 w-full max-w-2xl max-h-full">
              {/* <!-- Modal content --> */}
              <div className="relative bg-white rounded-2xl shadow-sm">
                <div className="py-6 px-6 lg:px-8">
                  <div
                    className="flex justify-between items-center font-medium"
                    id="action-heading"
                  >
                    <h2 className="text-2xl text-brandblack">Add Task</h2>
                    <button
                      type="button"
                      className="text-gray-400 bg-offwhite hover:bg-gray-200 hover:text-gray-900 rounded-2xl text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                      onClick={() => setPopup(false)}
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
                        id="title"
                        value={title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          dispatch(setTaskTitle(e.target.value))
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
                          name="due-date"
                          id="due-date"
                          className="bg-offwhite border-none rounded-lg h-8 focus:ring-coolgray focus:ring-1 text-xs"
                          value={dueDate}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            dispatch(setTaskDueDate(e.target.value))
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
                        value={description}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                          dispatch(setTaskDescription(e.target.value))
                        }
                      ></textarea>
                    </div>

                    <div className="w-full flex justify-end">
                      <div className="flex flex-row gap-5 justify-end">
                        <button
                          type="button"
                          className="py-2.5 px-5 ms-3 text-sm font-medium text-hovergray focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-togglegray focus:z-10 focus:ring-gray-100 "
                          disabled={loading ? true : false}
                          onClick={() => setPopup(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className={`${
                            loading ? "cursor-progress" : "cursor-pointer"
                          } text-white bg-brandblack hover:bg-hovergray focus:ring-4 focus:outline-nonefont-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                          disabled={loading ? true : false}
                        >
                          <div id="button-text">
                            {loading ? (
                              <span className="flex items-center justify-center gap-2">
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
                              "Add Task"
                            )}
                          </div>
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
