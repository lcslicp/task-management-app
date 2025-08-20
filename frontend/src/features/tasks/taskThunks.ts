import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const fetchSingleTaskData = createAsyncThunk(
  "tasks/fetchSingleTaskData",
  async (id: string, thunkAPI) => {
    try {
      const token = JSON.parse(localStorage.getItem("token") || "{}");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      console.log(token)
      const response = await axios.get(`/task/${id}`, config);

      console.log(response)
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong."
      );
    }
  }
);
