import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/slice/authSlice";
import lessonReducer from "./features/Lessons/slice/lessonSlice";
import userSlice from "./features/user/slice/userSlice.js";
import examsReducer from "./features/exams/slice/examSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    exams: examsReducer,
    lessons: lessonReducer,
    user:userSlice,

  },
});
