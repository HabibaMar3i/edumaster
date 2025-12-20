import { createSlice } from "@reduxjs/toolkit";
import { fetchExams, createExam, updateExam, deleteExam } from "../api/examApi";

const examsSlice = createSlice({
    name: "exams",
    initialState: {
        exams: [],
        loading: false,
        creating: false,
        updatingId: null,
        deletingId: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            /* ========== FETCH ========== */
            .addCase(fetchExams.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchExams.fulfilled, (state, action) => {
                state.loading = false;
                state.exams = action.payload;
            })
            .addCase(fetchExams.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            /* ========== CREATE ========== */
            .addCase(createExam.pending, (state) => {
                state.creating = true;
                state.error = null;
            })
            .addCase(createExam.fulfilled, (state, action) => {
                state.creating = false;
                state.exams.unshift(action.payload);
            })
            .addCase(createExam.rejected, (state, action) => {
                state.creating = false;
                state.error = action.payload;
            })

            /* ========== UPDATE ========== */
            .addCase(updateExam.pending, (state, action) => {
                state.updatingId = action.meta.arg.id;
                state.error = null;
            })
            .addCase(updateExam.fulfilled, (state, action) => {
                state.updatingId = null;
                const index = state.exams.findIndex(
                    (e) => e._id === action.payload._id
                );
                if (index !== -1) {
                    state.exams[index] = action.payload;
                }
            })
            .addCase(updateExam.rejected, (state, action) => {
                state.updatingId = null;
                state.error = action.payload;
            })

            /* ========== DELETE ========== */
            .addCase(deleteExam.pending, (state, action) => {
                state.deletingId = action.meta.arg.id;
                state.error = null;
            })
            .addCase(deleteExam.fulfilled, (state, action) => {
                state.deletingId = null;
                state.exams = state.exams.filter(
                    (e) => e._id !== action.payload
                );
            })
            .addCase(deleteExam.rejected, (state, action) => {
                state.deletingId = null;
                state.error = action.payload;
            });
    },
});

export default examsSlice.reducer;
