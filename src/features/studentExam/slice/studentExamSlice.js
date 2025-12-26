import { createSlice } from "@reduxjs/toolkit";
import { getAllExams, getSpecificExam, getStudentExam, getExamScore, submitExamAnswers, startExam, getRemainingTime } from "../api/studentExamApi";

const studentExamSlice = createSlice({
  name: "studentExam",
  initialState: {
    loading: false,
    submitting: false,
    starting: false,
    exams: [],
    exam: null,
    score: null,
    answers: {},
    message: null,
    success: false,
    timeRemaining: null,
    examStarted: false,
  },
  reducers: {
    setAnswer: (state, action) => {
      const { questionId, answer } = action.payload;
      state.answers[questionId] = answer;
    },
    clearAnswers: (state) => {
      state.answers = {};
    },
    setTimeRemaining: (state, action) => {
      state.timeRemaining = action.payload;
    },
    clearMessage: (state) => {
      state.message = null;
      state.success = false;
    },
    setMockScore: (state, action) => {
      state.score = action.payload;
      state.submitting = false;
      state.success = true;
    },
    setExamStarted: (state, action) => {
      state.examStarted = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Exams
      .addCase(getAllExams.pending, (state) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(getAllExams.fulfilled, (state, action) => {
        state.loading = false;
        state.exams = action.payload.data || action.payload;
        state.success = true;
      })
      .addCase(getAllExams.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || "Failed to load exams";
        state.success = false;
      })

      // Get Specific Exam
      .addCase(getSpecificExam.pending, (state) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(getSpecificExam.fulfilled, (state, action) => {
        state.loading = false;
        state.exam = action.payload.data || action.payload;
        state.success = true;
      })
      .addCase(getSpecificExam.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || "Failed to load exam";
        state.success = false;
      })

      // Get Student Exam
      .addCase(getStudentExam.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.success = false;
      })
      .addCase(getStudentExam.fulfilled, (state, action) => {
        state.loading = false;
        state.exam = action.payload.data || action.payload;
        state.success = true;
      })
      .addCase(getStudentExam.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || "Failed to load exam";
        state.success = false;
      })

      // Get Exam Score
      .addCase(getExamScore.pending, (state) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(getExamScore.fulfilled, (state, action) => {
        state.loading = false;
        state.score = action.payload.data;
        state.success = true;
      })
      .addCase(getExamScore.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || "Failed to load score";
        state.success = false;
      })

      // Submit Exam Answers
      .addCase(submitExamAnswers.pending, (state) => {
        state.submitting = true;
        state.message = null;
      })
      .addCase(submitExamAnswers.fulfilled, (state, action) => {
        state.submitting = false;
        state.message = "Exam submitted successfully";
        state.success = true;
        state.score = action.payload.data;
      })
      .addCase(submitExamAnswers.rejected, (state, action) => {
        state.submitting = false;
        state.message = action.payload?.message || "Failed to submit exam";
        state.success = false;
      })

      // Start Exam
      .addCase(startExam.pending, (state) => {
        state.starting = true;
        state.message = null;
      })
      .addCase(startExam.fulfilled, (state, action) => {
        state.starting = false;
        state.examStarted = true;
        state.timeRemaining = action.payload.timeRemaining;
        state.success = true;
      })
      .addCase(startExam.rejected, (state, action) => {
        state.starting = false;
        state.message = action.payload?.message || "Failed to start exam";
        state.success = false;
      })

      // Get Remaining Time
      .addCase(getRemainingTime.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRemainingTime.fulfilled, (state, action) => {
        state.loading = false;
        state.timeRemaining = action.payload.timeRemaining;
      })
      .addCase(getRemainingTime.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || "Failed to get remaining time";
      });
  },
});

export const { setAnswer, clearAnswers, setTimeRemaining, clearMessage, setMockScore, setExamStarted } = studentExamSlice.actions;
export default studentExamSlice.reducer;