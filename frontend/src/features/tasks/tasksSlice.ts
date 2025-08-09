import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TaskInterface, TasksInterface } from "../../types/task";
import {
  fetchTodoData,
  fetchInprogressData,
  fetchCompletedData,
  deleteTask,
  updateTask,
  createTask,
} from "./tasksThunks";

const initialState: TasksInterface = {
  todoTasks: [],
  inProgressTasks: [],
  completedTasks: [],
  priorityFilter: [],
  sort: "newest",
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTodoTasks: (state, action) => {
      state.todoTasks = action.payload;
    },
    setInprogressTasks: (state, action) => {
      state.inProgressTasks = action.payload;
    },
    setCompletedTasks: (state, action) => {
      state.completedTasks = action.payload;
    },
    setPriorityFilter: (state, action) => {
      state.priorityFilter = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    addTodo: (state, action) => {
      state.todoTasks.push(action.payload);
    },
    addInProgress: (state, action) => {
      state.inProgressTasks.push(action.payload);
    },
    addCompleted: (state, action) => {
      state.completedTasks.push(action.payload);
    },
    updateTodo: (state, action) => {
      const updatedTask = action.payload;
      const index = state.todoTasks.findIndex(
        (task) => task.taskId === updatedTask.taskId
      );
      if (index !== -1) {
        state.todoTasks[index] = updatedTask;
      }
    },
    updateInProgress: (state, action) => {
      const updatedTask = action.payload;
      const index = state.inProgressTasks.findIndex(
        (task) => task.taskId === updatedTask.taskId
      );
      if (index !== -1) {
        state.inProgressTasks[index] = updatedTask;
      }
    },
    updateCompleted: (state, action) => {
      const updatedTask = action.payload;
      const index = state.completedTasks.findIndex(
        (task) => task.taskId === updatedTask.taskId
      );
      if (index !== -1) {
        state.completedTasks[index] = updatedTask;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodoData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodoData.fulfilled, (state, action) => {
        state.loading = false;
        state.todoTasks = action.payload;
      })
      .addCase(fetchTodoData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchInprogressData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInprogressData.fulfilled, (state, action) => {
        state.inProgressTasks = action.payload;
        state.loading = false;
      })
      .addCase(fetchInprogressData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCompletedData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompletedData.fulfilled, (state, action) => {
        state.completedTasks = action.payload;
        state.loading = false;
      })
      .addCase(fetchCompletedData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createTask.fulfilled,
        (state, action: PayloadAction<TaskInterface>) => {
          const taskData = action.payload;

          if (taskData.status === "To Do") state.todoTasks.push(taskData);
          else if (taskData.status === "In Progress")
            state.inProgressTasks.push(taskData);
          else state.completedTasks.push(taskData);
        }
      )
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const { taskId, taskStatus } = action.payload;

        if (taskStatus === "To Do") {
          state.todoTasks = state.todoTasks.filter(
            (task) => task.taskId !== taskId
          );
        } else if (taskStatus === "In Progress") {
          state.inProgressTasks = state.inProgressTasks.filter(
            (task) => task.taskId !== taskId
          );
        } else {
          state.completedTasks = state.completedTasks.filter(
            (task) => task.taskId !== taskId
          );
        }
      })
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        const allTasks = [
          state.todoTasks,
          state.inProgressTasks,
          state.completedTasks,
        ];
        allTasks.forEach((arr) => {
          const index = arr.findIndex(
            (task) => task.taskId === updatedTask.taskId
          );
          if (index !== -1) arr.splice(index, 1);
        });
        switch (updatedTask.taskStatus) {
          case "To Do":
            state.todoTasks.push(updatedTask);
            break;
          case "In Progress":
            state.inProgressTasks.push(updatedTask);
            break;
          case "Completed":
            state.completedTasks.push(updatedTask);
            break;
        }
        state.loading = false;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Update failed.";
      });
  },
});

export const {
  setTodoTasks,
  setInprogressTasks,
  setCompletedTasks,
  setPriorityFilter,
  setSort,
  addTodo,
  addInProgress,
  addCompleted,
  updateTodo,
  updateInProgress,
  updateCompleted,
} = tasksSlice.actions;

export default tasksSlice.reducer;
