import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const register = createAsyncThunk("auth/register", async (data) => {
    const res = await fetch("https://edu-master-psi.vercel.app/auth/signup", {
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
            });
    },
});

export default authSlice.reducer;
