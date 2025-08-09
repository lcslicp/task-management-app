import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TaskUIState } from "../../types/task";

const initialState: TaskUIState = {
    taskOpen: false,
}

const taskUISlice = createSlice({
    name: "taskUI",
    initialState,
    reducers: {
        setTaskOpen: (state, action: PayloadAction<boolean>) => {
            state.taskOpen = action.payload
        }
    }
})

export const {
    setTaskOpen
} = taskUISlice.actions;

export default taskUISlice.reducer;