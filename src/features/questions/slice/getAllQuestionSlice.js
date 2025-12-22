import { createSlice } from "@reduxjs/toolkit";
import { getAllQuestions } from "../api/getAllQuestions";

const allQuestionsSlice = createSlice({
  name: "questions",
  initialState: {
    questions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllQuestions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(getAllQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default allQuestionsSlice.reducer