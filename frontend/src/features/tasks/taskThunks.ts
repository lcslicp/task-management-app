import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const token = JSON.parse(localStorage.getItem("token") || "{}");
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export const fetchSingleTaskData = createAsyncThunk(
  "tasks/fetchSingleTaskData",
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.get(`/task/${id}`, config);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong."
      );
    }
  }
);
