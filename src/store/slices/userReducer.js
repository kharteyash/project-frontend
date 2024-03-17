import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { dispatch } from "../index";

const initialState = {
  error: null,
  userRegistration: {},
};

const slice = createSlice({
  name: "user_actions",
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },

    // POST API

    addUserData(state, action) {
      state.userRegistration = action.payload;
    },
  },
});

export default slice.reducer;

export const registerUser = (payload) => {
  return async () => {
    try {
      const response = await axios.post(`api`, payload);
      dispatch(slice.actions.addUserData(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
};
