import { useDispatch } from "react-redux";
import {
  setTaskTitle,
  setTaskDescription,
  setTaskStatus,
  setTaskPriority,
  setTaskDueDate,
} from "../features/tasks/taskSlice";

export const useFormReset = () => {
  const dispatch = useDispatch();

  return () => {
    dispatch(setTaskTitle(""));
    dispatch(setTaskDescription(""));
    dispatch(setTaskStatus(""));
    dispatch(setTaskPriority(""));
    dispatch(setTaskDueDate(""));
  };
};
