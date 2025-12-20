import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/slice/authSlice";
import examsReducer from "./features/exams/slice/examSlice";
import lessonReducer from "./features/Lessons/slice/lessonSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    exams: examsReducer,
    lessons: lessonReducer, 
  },
});
