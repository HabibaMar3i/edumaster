import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const register = createAsyncThunk("auth/register", async (data) => {
    const res = await axios.post("https://edu-master-psi.vercel.app/auth/signup", data);
    return res.data;
});

export const login = createAsyncThunk("auth/login", async (data) => {
    const res = await axios.post("https://edu-master-psi.vercel.app/auth/login", data);
    return res.data;
});
