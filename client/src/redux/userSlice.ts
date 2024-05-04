import { User } from "@/types/user";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


type UserState = {
	currentUser: User | null;
	error: string | null;
	loading: boolean;
};

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
		loginSuccess: (state, action: PayloadAction<User>) => {
			state.currentUser = action.payload;
			state.loading = false;
			state.error = null;
		},
		loginError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
			state.loading = false;
		},
		logoutSuccess: (state) => {
			state.currentUser = null;
			state.error = null;
			state.loading = false;
		},
	},
});

export const { loginStart, loginSuccess, loginError, logoutSuccess } =
	userSlice.actions;

export default userSlice.reducer;
