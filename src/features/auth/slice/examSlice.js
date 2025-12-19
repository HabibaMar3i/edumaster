import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchExams = createAsyncThunk(
    "exams/fetchExams",
    async (token, thunkAPI) => {
        try {
            const res = await axios.get(
                "https://edu-master-psi.vercel.app/exam",
                { headers: { token } }
            );
            return res.data.data || res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue("Failed to fetch exams");
        }
    }
);

const examsSlice = createSlice({
    name: "exams",
    initialState: {
        exams: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchExams.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchExams.fulfilled, (state, action) => {
                state.loading = false;
                state.exams = action.payload;
            })
            .addCase(fetchExams.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default examsSlice.reducer;
