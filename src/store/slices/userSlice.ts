import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { logIn, User, UserData, UserType } from "../../types/user";

export const auth = createAsyncThunk("user/logIn", async (props: logIn) => {
  try {
    const response = await axios.get<UserType[]>(`http://localhost:3001/users?_login=${props.login}`);

    if (response.data[0].password === props.password) {
      return new Promise<UserData>((res, _) => setTimeout(() => res(response.data[0]), 1000))
    } else {
      return new Promise((_, rej) => setTimeout(() => rej(new Error()), 1000));
    }

  } catch (e) {
    console.log(e);
  }
});

const initialState: User = {
  user: {
    first_name: "",
    last_name: "",
    login: ''
  },
  isLoading: false,
  isError: false,
  isLogged: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut(state, action) {
      state.isLogged = false;
      state.user = initialState.user;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(auth.pending, (state, action) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(auth.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;

        if (action.payload?.first_name) {
          state.user.first_name = action.payload.first_name;
          state.user.last_name = action.payload.last_name;
          state.user.login = action.payload.login;
          state.isLogged = true;
        }
      })
      .addCase(auth.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isLogged = false;
        state.user = {
          first_name: '',
          last_name: '',
          login: ''
        };
      });
  },
});

export default userSlice;
