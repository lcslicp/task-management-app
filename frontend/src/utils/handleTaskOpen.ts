import { AppDispatch } from "../app/store";
import { fetchSingleTaskData } from "../features/tasks/taskThunks";
import { setTaskOpen } from "../features/tasks/taskUIslice";
import { NavigateFunction } from "react-router-dom";

export const handleTaskOpen = (id: string, navigate: NavigateFunction) => (dispatch: AppDispatch) => {
    dispatch(fetchSingleTaskData(id));
    dispatch(setTaskOpen(true));
    navigate(`/${id}`);
}