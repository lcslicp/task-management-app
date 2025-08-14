import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { TaskInterface } from "../../types/task";
import {
  setCompletedTasks,
  setInprogressTasks,
  setTodoTasks,
} from "./tasksSlice";

const TODO_TASK_URL = "/tasks/todo";
const INPROGRESS_TASK_URL = "/tasks/inprogress";
const COMPLETED_TASK_URL = "/tasks/completed";
const CREATE_TASK_URL = "/compose/newtask";

const token = JSON.parse(localStorage.getItem("token") || "{}");
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export const fetchTodoData = createAsyncThunk<TaskInterface[]>(
  "tasks/fetchTodoData",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(TODO_TASK_URL, config);
      setTodoTasks(response.data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch To Do tasks."
      );
    }
  }
);

export const fetchInprogressData = createAsyncThunk<TaskInterface[]>(
  "tasks/fetchInprogressData",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(INPROGRESS_TASK_URL, config);
      setInprogressTasks(response.data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch In Progress tasks."
      );
    }
  }
);

export const fetchCompletedData = createAsyncThunk<TaskInterface[]>(
  "tasks/fetchCompletedData",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(COMPLETED_TASK_URL, config);
      setCompletedTasks(response.data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch Completed tasks."
      );
    }
  }
);

export const createTask = createAsyncThunk(
  "tasks/addTask",
  async (
    {
      title,
      description,
      status,
      priority,
      dueDate,
    }: {
      title: string;
      description: string;
      status: string;
      priority: string;
      dueDate: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        CREATE_TASK_URL,
        { title, description, status, priority, dueDate },
        config
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to create task.");
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ updatedData }: { updatedData: TaskInterface }, thunkAPI) => {
    const response = await axios.put(
      `/edit/${updatedData._id}`,
      updatedData,
      config
    );
    return response.data.task;
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (
    { _id, taskStatus }: { _id: string; taskStatus: string },
    { rejectWithValue }
  ) => {
    try {
      await axios.delete(`${_id}`, config);

      return { _id, taskStatus };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to delete task");
    }
  }
);
