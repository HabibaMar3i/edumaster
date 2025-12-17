import { createSlice } from "@reduxjs/toolkit";
import { register, login } from "../api/authApi";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        message: null,
        success: false,
        token: localStorage.getItem('token') || null,
        role: localStorage.getItem('role') || null,
        isAuthenticated: !!localStorage.getItem('token'),
    },
    reducers: {
        logout: (state) => {
            state.token = null;
            state.role = null;
            state.isAuthenticated = false;
            state.message = null;
            state.success = false;
            localStorage.removeItem('token');
            localStorage.removeItem('role');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.success = false;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.success = action.payload.message?.toLowerCase().includes('successfully') || false;
            })
            .addCase(register.rejected, (state) => {
                state.loading = false;
                state.message = "Something went wrong";
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.success = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                if (action.payload.success && action.payload.token) {
                    state.token = action.payload.token;
                    state.role = action.payload.role;
                    state.isAuthenticated = true;
                    state.success = true;
                    localStorage.setItem('token', action.payload.token);
                    localStorage.setItem('role', action.payload.role);
                }
            })
            .addCase(login.rejected, (state) => {
                state.loading = false;
                state.message = "Login failed";
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
