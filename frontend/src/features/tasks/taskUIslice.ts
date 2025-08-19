import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StatusUIState, TaskUIState } from "../../types/task";

const initialState: TaskUIState = {
  taskOpen: false,
  taskLoading: false,
};

const statusInitialState: StatusUIState = {
  statusMsg: "",
  statusDisplay: false,
  statusColor: [],
};

const taskUISlice = createSlice({
  name: "taskUI",
  initialState,
  reducers: {
    setTaskOpen: (state, action: PayloadAction<boolean>) => {
      state.taskOpen = action.payload;
    },
    setTaskLoading: (state, action: PayloadAction<boolean>) => {
      state.taskLoading = action.payload;
    },
  },
});

const statusUISlice = createSlice({
  name: "statusUI",
  initialState: statusInitialState,
  reducers: {
    setStatusMsg: (state, action: PayloadAction<string>) => {
      state.statusMsg = action.payload;
    },
    setStatusDisplay: (state, action: PayloadAction<boolean>) => {
      state.statusDisplay = action.payload;
    },
    setStatusColor: (state: StatusUIState, action: PayloadAction<string[]>) => {
      state.statusColor = action.payload;
    },
  },
});

export const { setTaskOpen, setTaskLoading } = taskUISlice.actions;

export const { setStatusMsg, setStatusDisplay, setStatusColor } =
  statusUISlice.actions;

export default taskUISlice.reducer;

export const statusUIReducer = statusUISlice.reducer;
