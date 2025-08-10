import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TaskUIState } from "../../types/task";

const initialState: TaskUIState = {
    taskOpen: false,
    taskLoading: false,
}

const taskUISlice = createSlice({
    name: "taskUI",
    initialState,
    reducers: {
        setTaskOpen: (state, action: PayloadAction<boolean>) => {
            state.taskOpen = action.payload
        },
        setTaskLoading: (state, action: PayloadAction<boolean>) => {
            state.taskLoading = action.payload
        }
    }
})

export const {
    setTaskOpen,
    setTaskLoading
} = taskUISlice.actions;

export default taskUISlice.reducer;