import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/slice/authSlice";
import examsReducer from "./features/auth/slice/examSlice";
import lessonReducer from "./features/Lessons/slice/lessonSlice";
import userSlice from "./features/user/slice/userSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    exams: examsReducer,
    lessons: lessonReducer,
      user:userSlice,

  },
});
