import { createSlice } from "@reduxjs/toolkit";
import { UserInterface } from "../../types/user";
import { getUser, loginUser, updateUserProfile } from "./authThunks";

const initialState: UserInterface = {
  userData: {
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    userImage: "",
  },
  isUserLoading: false,
  error: null,
  token: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userData.userId = action.payload;
    },
    setFirstName: (state, action) => {
      state.userData.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.userData.lastName = action.payload;
    },
    setEmail: (state, action) => {
      state.userData.email = action.payload;
    },
    setUserImage: (state, action) => {
      state.userData.userImage = action.payload
    },
    setIsUserLoading: (state, action) => {
      state.isUserLoading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    logout: (state) => {
      state.token = null;
      state.userData = {
        userId: "",
        email: "",
        firstName: "",
        lastName: "",
        userImage: ""
      };
      localStorage.removeItem("token");
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(loginUser.pending, (state) => {
      state.isUserLoading = true;
      state.error = null;
    }). addCase(loginUser.fulfilled, (state, action) => {
      state.isUserLoading = false;
      state.token = action.payload;
      state.error = null;
    }).addCase(loginUser.rejected, (state, action) => {
      state.isUserLoading = false;
      state.error = action.payload as string;
    })
      .addCase(getUser.pending, (state) => {
        state.isUserLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isUserLoading = false;
        const { id, firstName, lastName, email, userImage } =
          action.payload ?? {};
        state.userData.userId = id;
        state.userData.firstName = firstName;
        state.userData.lastName = lastName;
        state.userData.email = email;
        state.userData.userImage = userImage;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isUserLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isUserLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isUserLoading = false;
        state.userData = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isUserLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUserId, setFirstName, setLastName, setEmail, setUserImage, setIsUserLoading, setError, logout } =
  userSlice.actions;

export default userSlice.reducer;
