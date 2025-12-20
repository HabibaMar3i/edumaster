import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "https://edu-master-psi.vercel.app";

export const getProfile = createAsyncThunk(
    'user/getProfile',
    async (_, { rejectWithValue, getState }) => {
        try {

            const token = getState().auth.token;
            console.log(token);
            const response = await axios.get(`${baseUrl}/user/`, {
                headers: {
                    token: `${token}`
                }
            });
            console.log(response);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "error");
        }
    }
);