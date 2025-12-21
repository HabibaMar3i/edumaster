import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "https://edu-master-psi.vercel.app";

export const getProfile = createAsyncThunk(
    'user/getProfile',
    async (_, { rejectWithValue, getState }) => {
        try {

            const token = getState().auth.token;
            const response = await axios.get(`${baseUrl}/user/`, {
                headers: {
                    token: `${token}`
                }
            });
            localStorage.setItem("userId", response.data.data._id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "error");
        }
    }
);


export const updateProfile = createAsyncThunk(
    'user/updateProfile',
    async ({ userData, userId }, { rejectWithValue, getState }) => {
        try {
            const { fullName, email, phoneNumber, classLevel } = userData;
            const token = getState().auth.token;

            const response = await axios.put(`${baseUrl}/user/${userId}`, {
                fullName,
                email,
                phoneNumber,
                classLevel,
            }, {
                headers: {
                    token: `${token}`
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "error");
        }
    }
);

export const forgotPassword = createAsyncThunk(
    'user/forgotPassword',
    async (email, { rejectWithValue, getState }) => {
        try {
            const response = await axios.post(`${baseUrl}/user/forgot-password`, {
                email
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "error");
        }
    }
);

export const resetPassword = createAsyncThunk(
    'user/resetPassword',
    async ({ email, otp, newPassword, cpassword }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${baseUrl}/user/reset-password`, {
                email,
                otp,
                newPassword,
                cpassword
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "error");
        }
    }
);