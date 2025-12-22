import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/slice/authSlice";
import examsReducer from "./features/auth/slice/examSlice";
import questionsReducer from "./features/questions/slice/getAllQuestionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    exams: examsReducer,
    questions: questionsReducer,
  },
});
