import { combineReducers } from "@reduxjs/toolkit";
import tasksReducer from "../features/tasks/tasksSlice";
import taskReducer, { currentTaskReducer } from "../features/tasks/taskSlice";
import taskUIReducer, { statusUIReducer } from "../features/tasks/taskUIslice";
import userReducer from "../features/auth/authSlice";

const rootReducer = combineReducers({
  task: taskReducer,
  tasks: tasksReducer,
  currentTask: currentTaskReducer,
  taskUI: taskUIReducer,
  user: userReducer,
  statusUI: statusUIReducer,
});

export default rootReducer;
