import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import jwt_decode from "jwt-decode";
import { UserInterface } from "../../types/user";

export const loginUser = createAsyncThunk(
  "/login",
  async (
    { email, pwd }: { email: string; pwd: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "/login",
        JSON.stringify({ email, password: pwd }),
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );
      localStorage.setItem("token", JSON.stringify(response.data.token));
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        return rejectWithValue("No Server Response");
      } else if ([401].includes(error.response.status)) {
        return rejectWithValue("Invalid credentials, please try again.");
      } else if ([404].includes(error.response.status)) {
        return rejectWithValue("User not found.");
      } else {
        return rejectWithValue("Login Failed");
      }
    }
  }
);

export const getUser = createAsyncThunk("auth/getUser", async (_, thunkAPI) => {
  try {
    const token = JSON.parse(localStorage.getItem("token") || "{}");

    if (!token) {
      return thunkAPI.rejectWithValue("No token found.");
    }
    const decoded = jwt_decode(token) as { user: string };
    const decodedId = decoded.user;
    const USER_URL = `/user/${decodedId}`;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.get(USER_URL, config);
    const { id, firstName, lastName, email, password, userImage } =
      response.data;

    return { id, firstName, lastName, email, password, userImage };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data || "Failed to fetch user."
    );
  }
});

export const updateUserProfile = createAsyncThunk(
  "auth/updateUser",
  async (
    { id, data }: { id: string; data: UserInterface["userData"] },
    { rejectWithValue }
  ) => {
    try {
      const token = JSON.parse(localStorage.getItem("token") || "{}");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.put(`/edit/user/${id}`, data, config);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);
