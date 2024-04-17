import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";


type currentUserType = {
  userId: string
}


type UserState = {
  currentUser: currentUserType | null;
  error: string | null;
  loading: boolean;
}

const initialState: UserState = {
  currentUser: null,
  error: null,
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<currentUserType>) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    loginError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginError,
} = userSlice.actions;

export default userSlice.reducer;