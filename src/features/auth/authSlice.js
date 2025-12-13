import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const register = createAsyncThunk("auth/register", async (data) => {
    const res = await fetch("https://edu-master-psi.vercel.app/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
});

export const login = createAsyncThunk("auth/login", async (data) => {
    const res = await fetch("https://edu-master-psi.vercel.app/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
});

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
    reducers: {},
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

export default authSlice.reducer;
