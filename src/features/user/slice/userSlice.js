import { createSlice } from "@reduxjs/toolkit";
import {getProfile} from "../api/userApi.js";

const initialState = {
    data: null,
    isLoading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // You can add synchronous actions here, like logout
        clearUser: (state) => {
            state.data = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload; // Updates 'state.user.data'
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;