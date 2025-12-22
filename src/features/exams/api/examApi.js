// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const fetchExams = createAsyncThunk(
//     "exams/fetchExams",
//     async (token, thunkAPI) => {
//         try {
//             const res = await axios.get(
//                 "https://edu-master-psi.vercel.app/exam",
//                 { headers: { token } }
//             );
//             return res.data.data || res.data;
//         } catch (err) {
//             return thunkAPI.rejectWithValue("Failed to fetch exams");
//         }
//     }
// );

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://edu-master-psi.vercel.app/exam";

/* ================= FETCH ================= */
export const fetchExams = createAsyncThunk(
    "exams/fetchExams",
    async (token, { rejectWithValue, signal }) => {
        try {
            const res = await axios.get(BASE_URL, {
                headers: { token },
                signal,
            });
            return res.data.data || res.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch exams"
            );
        }
    }
);

/* ================= CREATE ================= */
export const createExam = createAsyncThunk(
    "exams/createExam",
    async ({ data, token }, { rejectWithValue, signal }) => {
        try {
            const res = await axios.post(BASE_URL, data, {
                headers: { token },
                signal,
            });
            return res.data.data || res.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to create exam"
            );
        }
    }
);

/* ================= UPDATE ================= */
export const updateExam = createAsyncThunk(
    "exams/updateExam",
    async ({ id, data, token }, { rejectWithValue, signal }) => {
        try {
            const res = await axios.put(`${BASE_URL}/${id}`, data, {
                headers: { token },
                signal,
            });
            return res.data.data || res.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to update exam"
            );
        }
    }
);

/* ================= DELETE ================= */
export const deleteExam = createAsyncThunk(
    "exams/deleteExam",
    async ({ id, token }, { rejectWithValue, signal }) => {
        try {
            await axios.delete(`${BASE_URL}/${id}`, {
                headers: { token },
                signal,
            });
            return id;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to delete exam"
            );
        }
    }
);
