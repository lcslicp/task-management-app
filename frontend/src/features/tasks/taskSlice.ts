import { createSlice } from "@reduxjs/toolkit";
import { TaskInterface } from "../../types/task";
import { fetchSingleTaskData } from "./taskThunks";

const initialState: TaskInterface = {
  _id: "",
  title: "",
  description: "",
  priority: "",
  status: "",
  dueDate: "",
  createdAt: new Date().toISOString(),
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setId: (state, action) => {
      state._id = action.payload;
    },
    setTaskTitle: (state, action) => {
      state.title = action.payload;
    },
    setTaskDescription: (state, action) => {
      state.description = action.payload;
    },
    setTaskPriority: (state, action) => {
      state.priority = action.payload;
    },
    setTaskStatus: (state, action) => {
      state.status = action.payload;
    },
    setTaskDueDate: (state, action) => {
      state.dueDate = action.payload;
    },
    setTaskCreatedAt: (state, action) => {
      state.createdAt = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSingleTaskData.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

const currentTaskSlice = createSlice({
  name: "currentTask",
  initialState,
  reducers: {
    setCurrentTask: (state, action) => action.payload,
  },
});

export const {
  setId,
  setTaskTitle,
  setTaskDescription,
  setTaskPriority,
  setTaskStatus,
  setTaskDueDate,
  setTaskCreatedAt,
} = taskSlice.actions;

export const { setCurrentTask } = currentTaskSlice.actions;

export default taskSlice.reducer;
export const currentTaskReducer = currentTaskSlice.reducer;
